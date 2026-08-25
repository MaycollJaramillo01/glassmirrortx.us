/**
 * Analytics abstraction.
 *
 * Nothing here is wired to a specific vendor. Events are pushed to the
 * dataLayer (for GTM) and forwarded to gtag when a GA4 id is configured. With
 * no ID set, calls are inert — no network requests, no console noise.
 *
 * No measurement IDs are invented. Set NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_GTM_ID
 * in the environment to switch tracking on.
 */

export type TrackingEventName =
  | "phone_click"
  | "emergency_phone_click"
  | "email_click"
  | "estimate_form_start"
  | "estimate_form_submit"
  | "service_view"
  | "location_view";

export interface TrackingEvent {
  name: TrackingEventName;
  /** Where on the page the interaction happened, e.g. "hero", "sticky_bar". */
  location?: string;
  service?: string;
  city?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ name, ...params }: TrackingEvent): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });

  window.gtag?.("event", name, params);
}

// ---------------------------------------------------------------------------
// Ad attribution
// ---------------------------------------------------------------------------

const ATTRIBUTION_KEY = "eg_attribution";

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "fbclid",
] as const;

export interface Attribution {
  [key: string]: string;
}

/**
 * Captures ad click identifiers on the landing page and holds them for the
 * session, so a lead submitted three pages later still carries its source.
 * First touch wins: the original click is what produced the lead.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: Attribution = {};

    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) incoming[key] = value.slice(0, 200);
    }

    if (Object.keys(incoming).length === 0) return;
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;

    incoming.landing_page = window.location.pathname;
    if (document.referrer) incoming.referrer = document.referrer.slice(0, 300);

    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(incoming));
  } catch {
    // Private browsing can block sessionStorage. Attribution is a nice-to-have,
    // never a reason to break the page.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
