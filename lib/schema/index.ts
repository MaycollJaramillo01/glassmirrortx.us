import { SITE_URL, business } from "@/data/business";
import type { FAQ, Service, ServiceArea } from "@/types";

/**
 * JSON-LD builders.
 *
 * Only confirmed facts are emitted. There is deliberately no streetAddress,
 * no geo coordinates, no aggregateRating and no review markup, because none of
 * that is verified. Inventing them would be schema spam and a policy violation.
 */

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildLocalBusinessSchema() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    telephone: business.phone,
    email: business.email,
    identifier: {
      "@type": "PropertyValue",
      name: "License",
      value: business.license,
    },
    sameAs: Object.values(business.social).filter(Boolean),
    description:
      "Glass and mirror services for residential and commercial properties in Houston, Texas and surrounding communities — custom shower enclosures, mirrors, windows, solar screens and glass repair.",
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.stateCode,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: `${business.city}, ${business.stateCode}` },
      ...business.counties.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county}, ${business.stateCode}`,
      })),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phoneHref,
      contactType: "appointments and estimates",
      areaServed: "US-TX",
    },
    knowsAbout: [
      "Custom shower enclosures",
      "Shower doors",
      "Custom mirrors",
      "Mirrored walls",
      "Window glass",
      "Door glass",
      "Double-pane glass",
      "Glass repair and reglazing",
      "Solar screens",
    ],
    image: `${SITE_URL}/images/hero/houston-glass-hero.webp`,
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.legalName,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function buildWebPageSchema(path: string, name: string, description: string) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function buildServiceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: `${business.city}, ${business.stateCode}`,
    },
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

export function buildAreaServiceSchema(area: ServiceArea) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/service-areas/${area.slug}#service`,
    name: `Glass & Mirror Service in ${area.city}, ${area.stateCode}`,
    serviceType: "Glass & Mirror Service",
    description: area.metaDescription,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: `${area.city}, ${area.stateCode}`,
      containedInPlace: { "@type": "AdministrativeArea", name: area.county },
    },
    url: `${SITE_URL}/service-areas/${area.slug}`,
  };
}

/**
 * FAQPage markup. Only ever emitted on pages where the same questions and
 * answers are visible to the user, which is what the guidelines require.
 */
export function buildFaqSchema(faqs: readonly FAQ[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Wraps a set of nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
