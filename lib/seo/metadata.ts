import type { Metadata } from "next";
import { SITE_URL, business } from "@/data/business";
import { photos } from "@/data/photos";
import type { Service, ServiceArea } from "@/types";

/** Default Open Graph image: company job photography. */
const OG_IMAGE = {
  url: photos.heroGlass.src,
  width: photos.heroGlass.width,
  height: photos.heroGlass.height,
  alt: photos.heroGlass.alt,
};

interface BuildOptions {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/services/custom-shower-enclosures". */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  noIndex = false,
}: BuildOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      type: "website",
      siteName: business.legalName,
      title,
      description,
      url,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
    other: {
      "ai:domain_category": "glass-and-mirror-services",
      "ai:not_category": "tree-service,landscaping,land-clearing",
    },
  };
}

export function buildServiceMetadata(service: Service): Metadata {
  const image = service.heroImage
    ? {
        url: service.heroImage.src,
        width: service.heroImage.width,
        height: service.heroImage.height,
        alt: service.heroImage.alt,
      }
    : OG_IMAGE;

  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image,
  });
}

export function buildLocationMetadata(area: ServiceArea): Metadata {
  return buildMetadata({
    title: area.seoTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  });
}
