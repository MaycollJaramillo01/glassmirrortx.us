import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { ServiceArea } from "@/types";
import { business, cta } from "@/data/business";
import { getService, services } from "@/data/services";
import { getServiceArea } from "@/data/service-areas";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";

export function LocationHero({ area, trail }: { area: ServiceArea; trail: Crumb[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-56 -right-40 size-[46rem] text-bone/[0.05]"
      />

      <Container width="wide" className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <Breadcrumbs trail={trail} tone="light" className="mb-9" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {area.eyebrow}
            </p>

            <h1 className="t-h1 mt-6 text-bone">{area.h1}</h1>

            <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-bone/80 sm:text-[1.0625rem]">
              {area.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                withArrow
                data-cta="estimate"
                data-location="location_hero"
              >
                {cta.estimate}
              </Button>
              <Button
                href={`tel:${business.phoneHref}`}
                variant="onDark"
                size="lg"
                data-cta="phone"
                data-location="location_hero"
              >
                <Phone className="mr-1 size-4 text-gold" aria-hidden="true" strokeWidth={2.6} />
                {business.phone}
              </Button>
            </div>
          </div>

          {/* Area facts. Only verifiable data: county, distance, availability. */}
          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-bone/20">
              <div className="flex items-baseline justify-between gap-4 border-b border-bone/12 py-4">
                <dt className="t-eyebrow text-bone/50">County</dt>
                <dd className="font-display text-[0.95rem] font-bold text-bone">{area.county}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-bone/12 py-4">
                <dt className="t-eyebrow text-bone/50">From Houston</dt>
                <dd className="font-display text-[0.95rem] font-bold text-bone">
                  {area.distanceMiles === 0 ? "Our base" : `~${area.distanceMiles} mi`}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-bone/12 py-4">
                <dt className="t-eyebrow text-bone/50">Availability</dt>
                <dd className="font-display text-[0.95rem] font-bold text-gold">By appointment</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-bone/12 py-4">
                <dt className="t-eyebrow text-bone/50">Scheduling</dt>
                <dd className="font-display text-[0.95rem] font-bold text-bone">Call to book</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function LocationContext({ area }: { area: ServiceArea }) {
  return (
    <Section className="bg-bone" aria-labelledby="location-context">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Local Knowledge</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="location-context" className="t-h3 mt-5 text-charcoal">
                {area.context.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted">
                {area.context.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function LocationServices({ area }: { area: ServiceArea }) {
  const featured = area.featuredServices
    .map((entry) => {
      const service = getService(entry.slug);
      return service ? { service, note: entry.note } : null;
    })
    .filter((item) => item !== null);

  const featuredSlugs = new Set(featured.map((f) => f.service.slug));
  const rest = services.filter((s) => !featuredSlugs.has(s.slug));

  return (
    <Section className="bg-sand/60" aria-labelledby="location-services">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Services in {area.city}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="location-services" className="t-h2 mt-6 text-charcoal">
              What we are called for most here
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {featured.map(({ service, note }, i) => (
            <Reveal as="li" key={service.slug} delay={i * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col border border-charcoal/12 bg-bone p-7 transition-all hover:border-charcoal/30 hover:shadow-lg"
              >
                <span className="font-display text-[0.72rem] font-extrabold tracking-[0.14em] text-gold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4 mt-4 text-charcoal uppercase transition-colors group-hover:text-forest">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-muted">{note}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.68rem] font-bold tracking-[0.14em] text-forest uppercase">
                  {service.name} details
                  <ArrowRight className="arrow-shift size-3.5" aria-hidden="true" strokeWidth={2.6} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={160}>
          <p className="mt-10 text-[0.9rem] font-semibold tracking-wide text-charcoal uppercase">
            Also available in {area.city}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {rest.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center border border-charcoal/20 px-4 py-2.5 text-[0.85rem] text-muted transition-colors hover:border-charcoal hover:bg-charcoal hover:text-bone"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

export function NearbyAreas({ area }: { area: ServiceArea }) {
  const nearby = area.nearbyAreas
    .map(getServiceArea)
    .filter((a): a is ServiceArea => a !== undefined && a.slug !== area.slug);

  if (nearby.length === 0) return null;

  return (
    <Section className="bg-charcoal" space="tight" aria-labelledby="nearby-heading">
      <Container>
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="light">Nearby</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="nearby-heading" className="t-h3 mt-5 text-bone">
                We also work around {area.city}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 flex items-start gap-2.5 text-[0.92rem] leading-relaxed text-bone/65">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                Covering {business.radiusLabel} from Houston, TX across Harris, Fort Bend,
                Montgomery, Brazoria and Galveston counties.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-bone/20">
              {nearby.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 70}>
                  <Link
                    href={`/service-areas/${item.slug}`}
                    className="group flex items-baseline justify-between gap-4 border-b border-bone/12 py-4 transition-colors hover:text-gold"
                  >
                    <span className="font-display text-[1.05rem] font-bold tracking-tight text-bone transition-colors group-hover:text-gold">
                      {item.city}, {item.stateCode}
                    </span>
                    <span className="flex items-center gap-2.5 text-[0.8rem] whitespace-nowrap text-bone/50">
                      {item.county}
                      <ArrowUpRight
                        className="size-3.5 transition-colors group-hover:text-gold"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={240}>
              <Link
                href="/service-areas"
                className="t-eyebrow mt-7 inline-flex items-center gap-2.5 text-bone transition-colors hover:text-gold"
              >
                All service areas
                <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
