import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';
const SIG_TOLERANCE_SECONDS = 300;

function verifyStripeSignature(payload: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(
    header.split(',').map((p) => {
      const [k, ...rest] = p.split('=');
      return [k, rest.join('=')];
    })
  );
  const t = parts['t'];
  const v1 = parts['v1'];
  if (!t || !v1) return false;

  const age = Math.floor(Date.now() / 1000) - Number(t);
  if (!Number.isFinite(age) || age > SIG_TOLERANCE_SECONDS) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${t}.${payload}`, 'utf8')
    .digest('hex');

  const a = Buffer.from(expected, 'hex');
  const b = Buffer.from(v1, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function fmtAmount(amount: number | null | undefined, currency: string | null | undefined): string {
  if (amount == null || !currency) return 'n/a';
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

async function stripeGet(path: string): Promise<any | null> {
  if (!STRIPE_SECRET_KEY) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/${path}`, {
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchLineItems(sessionId: string): Promise<string> {
  const data = await stripeGet(`checkout/sessions/${sessionId}/line_items?limit=10`);
  if (!data?.data?.length) return 'n/a';
  return data.data
    .map((li: any) => `${li.quantity}× ${li.description || li.price?.nickname || 'item'} — ${fmtAmount(li.amount_total, li.currency)}`)
    .join('\n');
}

function metadataFields(meta: Record<string, string> | null | undefined): { name: string; value: string; inline?: boolean }[] {
  if (!meta || Object.keys(meta).length === 0) return [];
  const value = Object.entries(meta)
    .map(([k, v]) => `**${k}**: ${v}`)
    .join('\n');
  return [{ name: 'Metadata', value: value.slice(0, 1024), inline: false }];
}

async function postDiscord(content: string, embeds: unknown[]): Promise<void> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('[stripe-webhook] DISCORD_WEBHOOK_URL not set');
    return;
  }
  const res = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, embeds, username: 'Flashfire Stripe' }),
  });
  if (!res.ok) console.error('[stripe-webhook] discord failed', res.status, await res.text());
}

type Field = { name: string; value: string; inline?: boolean };

async function handleCheckoutSession(obj: any): Promise<void> {
  const email = obj.customer_details?.email || obj.customer_email || 'unknown';
  const name = obj.customer_details?.name || 'unknown';
  const phone = obj.customer_details?.phone || '';
  const country = obj.customer_details?.address?.country || '';
  const amount = fmtAmount(obj.amount_total, obj.currency);
  const subtotal = fmtAmount(obj.amount_subtotal, obj.currency);
  const discount = obj.total_details?.amount_discount
    ? fmtAmount(obj.total_details.amount_discount, obj.currency)
    : null;
  const lineItems = await fetchLineItems(obj.id);

  const fields: Field[] = [
    { name: 'Customer', value: `${name}\n${email}${phone ? `\n${phone}` : ''}${country ? ` (${country})` : ''}`, inline: false },
    { name: 'Amount Paid', value: amount, inline: true },
    { name: 'Subtotal', value: subtotal, inline: true },
  ];
  if (discount) fields.push({ name: 'Discount', value: `-${discount}`, inline: true });
  fields.push({ name: 'Items', value: lineItems.slice(0, 1024), inline: false });
  fields.push({ name: 'Source', value: obj.payment_link ? `Payment Link (${obj.payment_link})` : 'Checkout', inline: true });
  fields.push({ name: 'Session', value: obj.id, inline: true });
  fields.push(...metadataFields(obj.metadata));

  await postDiscord(`✅ **New Payment** — ${amount}`, [
    {
      title: 'Checkout completed',
      color: 0x22c55e,
      fields,
      timestamp: new Date().toISOString(),
    },
  ]);
}

async function handleInvoicePaid(obj: any): Promise<void> {
  const email = obj.customer_email || 'unknown';
  const name = obj.customer_name || 'unknown';
  const amount = fmtAmount(obj.amount_paid, obj.currency);
  const subtotal = fmtAmount(obj.subtotal, obj.currency);
  const discount = obj.total_discount_amounts?.reduce((s: number, d: any) => s + (d.amount || 0), 0) || 0;
  const lines = (obj.lines?.data || [])
    .map((li: any) => `${li.quantity}× ${li.description || 'item'} — ${fmtAmount(li.amount, li.currency)}`)
    .join('\n') || 'n/a';

  const fields: Field[] = [
    { name: 'Customer', value: `${name}\n${email}`, inline: false },
    { name: 'Amount Paid', value: amount, inline: true },
    { name: 'Subtotal', value: subtotal, inline: true },
  ];
  if (discount > 0) fields.push({ name: 'Discount', value: `-${fmtAmount(discount, obj.currency)}`, inline: true });
  fields.push({ name: 'Items', value: lines.slice(0, 1024), inline: false });
  fields.push({ name: 'Invoice', value: obj.number || obj.id, inline: true });
  if (obj.hosted_invoice_url) fields.push({ name: 'Link', value: obj.hosted_invoice_url, inline: false });
  fields.push(...metadataFields(obj.metadata));

  await postDiscord(`🧾 **Invoice Paid** — ${amount}`, [
    {
      title: 'Invoice payment received',
      color: 0x0ea5e9,
      fields,
      timestamp: new Date().toISOString(),
    },
  ]);
}

async function handleChargeSucceeded(obj: any): Promise<void> {
  // Skip if this charge belongs to a checkout session or invoice — those events fire separately.
  if (obj.invoice) return;
  const pi = obj.payment_intent ? await stripeGet(`payment_intents/${obj.payment_intent}`) : null;
  if (pi?.metadata?.checkout_session_id || pi?.latest_charge === undefined) {
    // best-effort skip; continue anyway
  }
  // If PI is tied to a checkout session, skip (checkout.session.completed will handle).
  const sessions = obj.payment_intent
    ? await stripeGet(`checkout/sessions?payment_intent=${obj.payment_intent}&limit=1`)
    : null;
  if (sessions?.data?.length) return;

  const email = obj.billing_details?.email || obj.receipt_email || 'unknown';
  const name = obj.billing_details?.name || 'unknown';
  const amount = fmtAmount(obj.amount, obj.currency);
  const meta = { ...(obj.metadata || {}), ...(pi?.metadata || {}) };

  const fields: Field[] = [
    { name: 'Customer', value: `${name}\n${email}`, inline: false },
    { name: 'Amount', value: amount, inline: true },
    { name: 'Charge', value: obj.id, inline: true },
    { name: 'Source', value: obj.payment_method_details?.type || 'n/a', inline: true },
  ];
  if (obj.description) fields.push({ name: 'Description', value: obj.description, inline: false });
  if (obj.receipt_url) fields.push({ name: 'Receipt', value: obj.receipt_url, inline: false });
  fields.push(...metadataFields(meta));

  await postDiscord(`💳 **Payment Received** — ${amount}`, [
    {
      title: 'Charge succeeded',
      color: 0x22c55e,
      fields,
      timestamp: new Date().toISOString(),
    },
  ]);
}

async function handleChargeRefunded(obj: any): Promise<void> {
  const amount = fmtAmount(obj.amount_refunded, obj.currency);
  const email = obj.billing_details?.email || obj.receipt_email || 'unknown';
  const fields: Field[] = [
    { name: 'Customer', value: email, inline: false },
    { name: 'Refunded', value: amount, inline: true },
    { name: 'Charge', value: obj.id, inline: true },
  ];
  fields.push(...metadataFields(obj.metadata));
  await postDiscord(`↩️ **Refund** — ${amount}`, [
    { title: 'Charge refunded', color: 0xf59e0b, fields, timestamp: new Date().toISOString() },
  ]);
}

async function handlePaymentFailed(obj: any): Promise<void> {
  const email =
    obj.receipt_email ||
    obj.charges?.data?.[0]?.billing_details?.email ||
    obj.last_payment_error?.payment_method?.billing_details?.email ||
    'unknown';
  const amount = fmtAmount(obj.amount, obj.currency);
  const reason = obj.last_payment_error?.message || 'unknown';
  const fields: Field[] = [
    { name: 'Customer', value: email, inline: false },
    { name: 'Amount', value: amount, inline: true },
    { name: 'Reason', value: reason.slice(0, 1024), inline: false },
  ];
  fields.push(...metadataFields(obj.metadata));
  await postDiscord(`⚠️ **Payment Failed** — ${amount}`, [
    { title: 'Payment intent failed', color: 0xef4444, fields, timestamp: new Date().toISOString() },
  ]);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!verifyStripeSignature(raw, sig, STRIPE_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const type: string = event.type;
  const obj: any = event.data?.object || {};

  try {
    switch (type) {
      case 'checkout.session.completed':
        if (obj.payment_status === 'paid') await handleCheckoutSession(obj);
        break;
      case 'invoice.payment_succeeded':
      case 'invoice.paid':
        await handleInvoicePaid(obj);
        break;
      case 'charge.succeeded':
        await handleChargeSucceeded(obj);
        break;
      case 'charge.refunded':
        await handleChargeRefunded(obj);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(obj);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error('[stripe-webhook] handler failed', type, err);
  }

  return NextResponse.json({ received: true });
}
