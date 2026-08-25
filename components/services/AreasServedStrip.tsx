import Link from "next/link";
import { MapPin } from "lucide-react";
import { business } from "@/data/business";
import { serviceAreas } from "@/data/service-areas";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Compact areas strip for service pages. Links every service page into the
 * location pages, which is the internal linking that makes the local pages
 * worth having in the first place.
 */
export function AreasServedStrip({ serviceName }: { serviceName: string }) {
  return (
    <Section className="bg-charcoal" space="tight" aria-labelledby="areas-served-heading">
      <Container>
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="light">Where We Work</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="areas-served-heading" className="t-h3 mt-5 text-bone">
                {serviceName} across {business.radiusMiles} miles of Houston
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 flex items-start gap-2.5 text-[0.92rem] leading-relaxed text-bone/65">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                Serving communities in Harris, Fort Bend, Montgomery, Brazoria and Galveston counties across{" "}
                {business.radiusLabel}.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <ul className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="inline-flex items-center border border-bone/20 px-4 py-2.5 text-[0.85rem] text-bone/75 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
                    >
                      {area.city}, {area.stateCode}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/service-areas"
                    className="inline-flex items-center border border-gold bg-gold/10 px-4 py-2.5 font-display text-[0.78rem] font-bold tracking-[0.1em] text-gold uppercase transition-colors hover:bg-gold hover:text-charcoal"
                  >
                    All areas →
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
