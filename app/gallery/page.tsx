import type { Metadata } from "next";

import { business } from "@/data/business";
import { beforeAfterItems, galleryItems } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { ContactCTA } from "@/components/sections/ContactCTA";

const TITLE = "Glass & Mirror Gallery | Project Photos | Martinez Orlyn Glass & Mirror";
const DESCRIPTION =
  "Project photographs from Martinez Orlyn Glass & Mirror in Houston, TX: shower enclosures, mirrors, windows and glass installation work.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/gallery",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
];

/** First company job photo — gallery hero stays real work, not stock. */
const galleryHero = galleryItems[0];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Recent work"
        title={
          <>
            The work should <span className="text-gold">speak for itself.</span>
          </>
        }
        lead={`Photographs from real ${business.name} projects across Houston and the surrounding communities${
          beforeAfterItems.length > 0 ? ` — plus ${beforeAfterItems.length} before and after pairs` : ""
        }.`}
        trail={trail}
        image={galleryHero}
      />

      <BeforeAfter />

      <Section className="bg-white" aria-labelledby="gallery-heading">
        <Container>
          <div className="max-w-[46rem]">
            <h2 id="gallery-heading" className="home-h2 text-charcoal">
              Every job, filed by service.
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
              {galleryItems.length} photographs from Martinez Orlyn Glass & Mirror projects,
              organized by work type. Filter by showers, mirrors, windows and more.
            </p>
          </div>
          <div className="mt-12">
            <GalleryGrid />
          </div>
        </Container>
      </Section>

      <ContactCTA
        location="gallery_cta"
        title={
          <>
            Want your project{" "}
            <span className="text-gold">on this page?</span>
          </>
        }
        lead={`Tell us what you need and we will come out, measure the opening and help you schedule — across ${business.radiusLabel}.`}
      />

      <JsonLd
        data={graph(
          buildWebPageSchema("/gallery", TITLE, DESCRIPTION),
          buildBreadcrumbSchema(trail),
        )}
      />
    </>
  );
}
