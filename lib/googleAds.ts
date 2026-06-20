/**
 * Google Ads Conversion Tracking Helper
 * 
 * Similar to Meta Pixel tracking, this provides helper functions
 * to track Google Ads conversion events throughout the application.
 * 
 * Required: Set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID in your environment variables
 * Format: AW-XXXXXXXXX (e.g., AW-1234567890)
 */

// Google Ads Conversion ID - Set NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID in .env
// Format: AW-XXXXXXXXX (e.g. AW-17779402210)
// Next.js inlines this at build time in the client bundle
export const GOOGLE_ADS_CONVERSION_ID =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID) || '';

/** GA4 property ID (same as `layout.tsx`); override with NEXT_PUBLIC_GA_MEASUREMENT_ID */
export const GA4_MEASUREMENT_ID =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
  'G-4P890VGD8D';

/**
 * Track a page view event
 */
export const pageview = () => {
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    window.gtag('event', 'page_view', {
      send_to: GOOGLE_ADS_CONVERSION_ID,
    });
  }
};

/**
 * Track a conversion event
 * 
 * @param eventName - Google Ads event name (e.g., 'conversion', 'schedule', 'lead')
 * @param options - Event parameters (value, currency, transaction_id, etc.)
 */
export const event = (eventName: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    window.gtag('event', eventName, {
      send_to: GOOGLE_ADS_CONVERSION_ID,
      ...options,
    });
  }
};

/**
 * Track a conversion with conversion label
 * This is the standard way to track Google Ads conversions
 * 
 * @param conversionLabel - Your Google Ads conversion label (e.g., 'schedule_meeting', 'lead_form')
 * @param options - Additional event parameters
 */
export const conversion = (conversionLabel: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_CONVERSION_ID) {
    const sendTo = `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`;
    window.gtag('event', 'conversion', {
      send_to: sendTo,
      ...options,
    });
  }
};

/**
 * Track Schedule event (meeting booking)
 * Maps to Meta Pixel's "Schedule" event
 */
export const trackSchedule = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: any;
} = {}) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  if (typeof window !== 'undefined' && window.gtag && (email || firstName || lastName)) {
    window.gtag('set', 'user_data', {
      ...(email && { email: email.toLowerCase() }),
      ...(firstName && { first_name: firstName }),
      ...(lastName && { last_name: lastName }),
    });
  }

  conversion('LSPpCLKsj5AcEOLL8J1C', {
    value,
    currency,
    transaction_id: transactionId,
    ...rest,
  });
};

/**
 * One-shot Google tracking when a meeting is booked: GA4 custom event + Google Ads schedule conversion.
 * In GA4: Admin → Events → mark `meeting_booked` as a conversion (after it appears once).
 */
export const trackMeetingBooked = (
  options: Parameters<typeof trackSchedule>[0] = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'meeting_booked', {
      send_to: GA4_MEASUREMENT_ID,
      page_path: '/meeting-booked',
    });
  }
  trackSchedule(options);
};

/**
 * Track Lead event
 * Maps to Meta Pixel's "Lead" event
 */
export const trackLead = (options: {
  value?: number;
  currency?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  transactionId?: string;
  [key: string]: any;
} = {}) => {
  const {
    value = 0,
    currency = 'USD',
    email,
    firstName,
    lastName,
    transactionId,
    ...rest
  } = options;

  conversion('lead_form', {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};

/**
 * Track Purchase event
 * Maps to Meta Pixel's "Purchase" event
 */
export const trackPurchase = (options: {
  value: number;
  currency?: string;
  transactionId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}) => {
  const {
    value,
    currency = 'USD',
    transactionId,
    email,
    firstName,
    lastName,
    ...rest
  } = options;

  conversion('purchase', {
    value,
    currency,
    transaction_id: transactionId,
    ...(email && { email_address: email.toLowerCase() }),
    ...(firstName && { first_name: firstName }),
    ...(lastName && { last_name: lastName }),
    ...rest,
  });
};
