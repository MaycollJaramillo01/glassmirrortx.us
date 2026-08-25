/**
 * Single source of truth for company facts.
 *
 * Everything here is taken from the company's own published information
 * (glassmirrortx.us and the published logo). Nothing in this file may be
 * invented: no awards, review counts, crew size, founding year, street
 * address or response times. If a fact is not confirmed it does not belong here.
 */

export const business = {
  legalName: "Martinez Orlyn Glass & Mirror",
  name: "Martinez Orlyn Glass & Mirror",

  phone: "(832) 253-2925",
  phoneHref: "+18322532925",
  email: "martinezorlyn@yahoo.com",

  city: "Houston",
  state: "Texas",
  stateCode: "TX",
  /** No street address is published on the current site, so none is claimed. */
  zip: "",
  addressLocality: "Houston, TX",

  /** Published on the company logo. */
  license: "T189489",
  tagline: "Experience and Professionalism",

  /**
   * Hours are not published as a fixed schedule on the current site.
   * Customer support is reachable by phone during business contact.
   */
  availability: "By appointment",
  hoursLabel: "Call to schedule an appointment",

  /**
   * The site says "years of hands-on experience" without a specific number.
   * Do not invent a year count.
   */
  experience: "Years of Experience",
  experienceValue: "Years",
  experienceLabel: "Hands-On Experience",

  /** Approximate coverage of published service areas around Houston. */
  radiusMiles: 40,
  radiusLabel: "Houston and surrounding communities",

  counties: ["Harris County", "Fort Bend County", "Montgomery County", "Brazoria County", "Galveston County"],

  trustPoints: [
    "Family-Owned",
    "Licensed & Insured",
    "Residential & Commercial",
    "Custom Fabrication",
    "Houston & Surrounding Areas",
    "Appointment Scheduling",
  ],

  social: {
    facebook: "https://www.facebook.com/MartinezOrlyn",
  },

  messenger: "https://m.me/MartinezOrlyn",
  whatsapp: "https://wa.me/18322532925",
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
