/**
 * Single source of truth for company facts.
 *
 * Everything here is taken from the company's own published information
 * (glassmirrortx.us, logo, Google Maps profile link) plus the street address
 * published across business directories that match this phone number.
 * Nothing else may be invented: no awards, review counts, crew size,
 * founding year or response times.
 */

export const business = {
  legalName: "Martinez Orlyn Glass & Mirror",
  name: "Martinez Orlyn Glass & Mirror",

  phone: "(832) 253-2925",
  phoneHref: "+18322532925",
  email: "martinezorlyn@yahoo.com",

  /** Street address from public business listings matching this phone. */
  streetAddress: "9215 Solon Rd, Suite B4",
  city: "Houston",
  state: "Texas",
  stateCode: "TX",
  zip: "77064",
  addressLocality: "Houston, TX",
  /** Full line for footer, contact and schema. */
  addressLine: "9215 Solon Rd, Suite B4, Houston, TX 77064",

  /** Published on the company logo. */
  license: "T189489",
  tagline: "Experience and Professionalism",

  /**
   * Hours confirmed by the client (Mon–Sun 07:00–21:00).
   * Appointments are still scheduled by phone / WhatsApp / email.
   */
  availability: "By appointment",
  hoursLabel: "Monday – Sunday, 7:00 AM – 9:00 PM",
  /** Shorter label for the crowded header utility bar. */
  hoursLabelShort: "Mon – Sun, 7 AM – 9 PM",
  openingHours: ["Mo-Su 07:00-21:00"],

  /**
   * The site says "years of hands-on experience" without a specific number.
   * Do not invent a year count.
   */
  experience: "Years of Experience",
  experienceValue: "Years",
  experienceLabel: "Hands-On Experience",

  /** Approximate coverage of published service areas around Houston. */
  radiusMiles: 100,
  radiusLabel: "within 100 miles of Houston",

  counties: ["Harris County", "Fort Bend County", "Montgomery County", "Brazoria County", "Galveston County"],

  trustPoints: [
    "Family-Owned",
    "Licensed & Insured",
    "Residential & Commercial",
    "Custom Fabrication",
    "Houston & Surrounding Areas",
    "Appointment Scheduling",
  ],

  /**
   * Profiles confirmed on the previous live site (real hrefs, not decorative icons).
   * Instagram / X logos appeared on the old site without profile URLs — do not invent them.
   */
  social: {
    facebook: "https://www.facebook.com/MartinezOrlyn",
  },

  /** Google Maps short link published on the previous site embed. */
  googleMaps: "https://maps.app.goo.gl/DzruyyJ2gzJxSssC6",

  /**
   * Google Business Profile rating (Knowledge Panel, Aug 2026).
   * Featured quotes live in data/reviews.ts.
   */
  googleRating: 4.9,
  googleReviewCount: 158,

  messenger: "https://m.me/MartinezOrlyn",
  whatsapp: "https://wa.me/18322532925",

  /**
   * Invoices / estimates are sent to WhatsApp and email per owner (Orlando Garcia).
   */
  invoiceChannels: ["whatsapp", "email"] as const,
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://glassmirrortx.us"
).replace(/\/$/, "");

/**
 * Mission and vision. Positioning statements that restate what the company
 * already publishes — family-owned craftsmanship, residential and commercial
 * glass work, and service across Houston and nearby cities.
 */
export const principles = [
  {
    id: "mission",
    label: "Our mission",
    statement: "Install glass that fits the room, the light and the way you live.",
    copy: "From custom shower enclosures to mirrors, windows and reglazing, every job starts with the space in front of us — measurements that match the opening, glass that suits the use, and an install that leaves the property clean.",
  },
  {
    id: "vision",
    label: "Our vision",
    statement: "Houston’s go-to glass and mirror shop for homes and businesses.",
    copy: "To be the crew homeowners and property managers in Houston, Katy, Sugar Land, Cypress and nearby cities call first for showers, mirrors, windows and glass repair — clear communication, dependable scheduling and work that holds up.",
  },
] as const;

/** Canonical CTA wording. Used everywhere so labels never drift. */
export const cta = {
  estimate: "Get an Appointment",
  estimateShort: "Appointment",
  estimateSubmit: "Request My Appointment",
  call: `Call ${business.phone}`,
  callShort: "Call Now",
  emergency: "Customer Support",
  viewServices: "View Our Services",
  viewWork: "View Our Work",
} as const;
