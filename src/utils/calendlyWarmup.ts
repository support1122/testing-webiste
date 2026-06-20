const CALENDLY_JS_ID = "calendly-widget-js";
const CALENDLY_CSS_ID = "calendly-widget-css";
const CALENDLY_JS_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

let hasWarmedCalendly = false;

function ensureCalendlyCss() {
  if (typeof document === "undefined") return;
  if (document.getElementById(CALENDLY_CSS_ID)) return;

  const existing = document.querySelector<HTMLLinkElement>(
    `link[href="${CALENDLY_CSS_HREF}"]`
  );
  if (existing) {
    existing.id = CALENDLY_CSS_ID;
    return;
  }

  const link = document.createElement("link");
  link.id = CALENDLY_CSS_ID;
  link.rel = "stylesheet";
  link.href = CALENDLY_CSS_HREF;
  document.head.appendChild(link);
}

function ensureCalendlyScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(CALENDLY_JS_ID)) return;

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_JS_SRC}"]`
  );
  if (existing) {
    existing.id = CALENDLY_JS_ID;
    return;
  }

  const script = document.createElement("script");
  script.id = CALENDLY_JS_ID;
  script.src = CALENDLY_JS_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function warmCalendly() {
  if (typeof window === "undefined") return;
  if (hasWarmedCalendly) return;

  ensureCalendlyCss();
  ensureCalendlyScript();
  hasWarmedCalendly = true;
}

