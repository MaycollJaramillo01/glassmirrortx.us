import { SITE_URL, business } from "@/data/business";
import { photos } from "@/data/photos";
import type { FAQ, Service, ServiceArea } from "@/types";

/**
 * JSON-LD builders.
 *
 * Only confirmed facts are emitted. Aggregate rating comes from the public
 * Google Business Profile (see data/business.ts). Individual Review markup is
 * omitted until more quotes are stored in data/reviews.ts.
 */

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildLocalBusinessSchema() {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: business.legalName,
    alternateName: ["Martinez Orlyn", "Martinez Orlyn Glass Mirror"],
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}${photos.heroGlass.src}`,
    telephone: business.phone,
    email: business.email,
    slogan: business.tagline,
    description:
      "Glass and mirror services for residential and commercial properties in Houston, Texas and surrounding communities — custom shower enclosures, mirrors, windows, solar screens and glass repair.",
    disambiguatingDescription:
      "Glass and mirror installation and repair only. Not a tree service, landscaping company, land-clearing contractor or arborist.",
    identifier: {
      "@type": "PropertyValue",
      name: "License",
      value: business.license,
    },
    sameAs: [
      ...Object.values(business.social).filter(Boolean),
      business.googleMaps,
      business.whatsapp,
    ].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.googleRating,
      reviewCount: business.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    openingHours: [...business.openingHours],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.stateCode,
      postalCode: business.zip,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: `${business.city}, ${business.stateCode}` },
      ...business.counties.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county}, ${business.stateCode}`,
      })),
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phoneHref,
        contactType: "customer service",
        areaServed: "US-TX",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: business.phoneHref,
        contactType: "appointments",
        areaServed: "US-TX",
        availableLanguage: ["English", "Spanish"],
      },
    ],
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Glass and mirror services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Bathroom glass",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom shower enclosures", url: `${SITE_URL}/services/custom-shower-enclosures` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shower doors", url: `${SITE_URL}/services/shower-doors` } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Mirrors",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom mirrors", url: `${SITE_URL}/services/custom-mirrors` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mirrored walls", url: `${SITE_URL}/services/mirrored-walls` } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Windows, doors and screens",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Windows and doors", url: `${SITE_URL}/services/windows-and-doors` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Double-pane windows", url: `${SITE_URL}/services/double-pane-windows` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar screens", url: `${SITE_URL}/services/solar-screens` } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Glass services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Glass installation and repair", url: `${SITE_URL}/services/glass-installation-repair` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reglazing", url: `${SITE_URL}/services/reglazing` } },
          ],
        },
      ],
    },
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.legalName,
    description:
      "Official website for Martinez Orlyn Glass & Mirror — Houston glass and mirror services for showers, mirrors, windows and glass repair.",
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
    about: { "@id": BUSINESS_ID },
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
