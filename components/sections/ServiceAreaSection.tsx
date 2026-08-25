import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { business } from "@/data/business";
import { additionalCommunities, serviceAreas } from "@/data/service-areas";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

export function ServiceAreaSection() {
  return (
    <Section className="bg-bone" aria-labelledby="areas-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Serving Houston &amp; Beyond</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h2 id="areas-heading" className="t-h2 mt-6 text-charcoal">
                Glass &amp; mirror across {business.radiusMiles} miles of Houston, TX
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 text-[1.02rem] leading-relaxed text-muted">
                We work outward from Houston across {business.radiusLabel}, covering communities
                in Harris, Fort Bend, Montgomery, Brazoria and Galveston counties. Each area has
                its own page with the services that matter most there.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex items-start gap-3 border-l-2 border-gold py-1 pl-5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <p className="text-[0.92rem] leading-relaxed text-muted">
                  Not sure whether you are inside the area? Call{" "}
                  <a
                    href={`tel:${business.phoneHref}`}
                    data-cta="phone"
                    data-location="home_areas"
                    className="link-underline font-semibold text-charcoal"
                  >
                    {business.phone}
                  </a>{" "}
                  and ask — it takes a moment to check.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9">
                <Button href="/service-areas" variant="outline" withArrow>
                  All Service Areas
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ul className="grid grid-cols-1 gap-x-8 border-t border-charcoal/12 sm:grid-cols-2">
                {serviceAreas.map((area, i) => (
                  <li key={area.slug}>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="group flex items-baseline justify-between gap-4 border-b border-charcoal/10 py-4 transition-colors hover:text-forest"
                      style={{ ["--reveal-delay" as string]: `${i * 40}ms` }}
                    >
                      <span className="font-display text-[1.05rem] font-bold tracking-tight text-charcoal transition-colors group-hover:text-forest">
                        {area.city}
                        <span className="ml-1.5 text-[0.78rem] font-normal tracking-normal text-muted">
                          {area.stateCode}
                        </span>
                      </span>
                      <span className="flex items-center gap-2.5 text-[0.78rem] whitespace-nowrap text-muted">
                        {area.distanceMiles === 0 ? "Base" : `~${area.distanceMiles} mi`}
                        <ArrowUpRight
                          className="size-3.5 text-muted/50 transition-colors group-hover:text-forest"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 text-[0.88rem] leading-relaxed text-muted">
                <span className="font-semibold text-charcoal">Also serving:</span>{" "}
                {additionalCommunities.join(", ")} and surrounding communities across{" "}
                {business.radiusLabel}.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
