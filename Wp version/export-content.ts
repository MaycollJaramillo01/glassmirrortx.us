/**
 * Exports the site content in data/*.ts to the WordPress theme as JSON, so the
 * theme renders the same copy the Next.js site does. Run from the repo root:
 *
 *   npx tsx "Wp version/export-content.ts"
 */
import { writeFileSync } from "node:fs";

import { business, cta, principles } from "../data/business";
import { galleryCategories, galleryItems } from "../data/gallery";
import { footerAreaSlugs, footerServiceSlugs } from "../data/navigation";
import { photos } from "../data/photos";
import { googleReviews, testimonials } from "../data/reviews";
import { additionalCommunities, primaryAreaSlugs, serviceAreas } from "../data/service-areas";
import { serviceGroups, services } from "../data/services";

const content = {
  business,
  principles,
  cta,
  photos,
  serviceGroups,
  services,
  serviceAreas,
  primaryAreaSlugs,
  additionalCommunities,
  galleryCategories,
  galleryItems,
  googleReviews,
  testimonials,
  footerServiceSlugs,
  footerAreaSlugs,
};

writeFileSync("Wp version/glassmirror/inc/content.json", `${JSON.stringify(content, null, 2)}\n`);
