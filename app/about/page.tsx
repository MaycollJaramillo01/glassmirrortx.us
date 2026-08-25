import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, Phone, ShieldCheck, Target } from "lucide-react";

import { business, cta, principles } from "@/data/business";
import { photos } from "@/data/photos";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { AreasServedStrip } from "@/components/services/AreasServedStrip";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

const TITLE = "About Martinez Orlyn Glass & Mirror | Houston Glass & Mirror Company";
const DESCRIPTION =
  "Martinez Orlyn Glass & Mirror is a Houston, Texas glass and mirror company for custom showers, mirrors, windows and glass repair. Licensed & insured. Serving Houston and surrounding communities.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

/** Icons are presentation, so they map onto the shared copy in data/business. */
const principleIcons = { mission: Target, vision: Compass } as const;

const heroStats = [
  { value: business.experienceValue, label: business.experienceLabel },
  { value: "Licensed", label: `License ${business.license}` },
  { value: `${business.radiusMiles} miles`, label: "Houston coverage" },
  { value: String(services.length), label: "Services offered" },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${business.name}`}
        title={
          <>
            A Houston shop for glass{" "}
            <span className="text-gold">that fits the room.</span>
          </>
        }
        lead={`${business.name} is a glass and mirror company based in Houston, Texas, working across Harris, Fort Bend, Montgomery, Brazoria and Galveston counties. ${business.experience} of hands-on work, licensed and insured, scheduled by appointment.`}
        trail={trail}
        image={photos.aboutShop}
      >
        <dl className="mt-14 grid gap-x-8 gap-y-8 border-t border-bone/15 pt-9 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map(({ value, label }, index) => (
            <Reveal
              key={label}
              delay={index * 70}
              className="lg:border-l lg:border-bone/15 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="sr-only">{label}</dt>
              <dd>
                <p className="font-display text-[2.25rem] leading-none font-extrabold tracking-[-0.04em] text-bone">
                  {value}
                </p>
                <p className="mt-2.5 text-[0.72rem] font-bold tracking-[0.14em] text-bone/55 uppercase">
                  {label}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </PageHero>

      <Section className="bg-bone" aria-labelledby="story-heading">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal kind="scale" className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={photos.showerEnclosure.src}
                alt={photos.showerEnclosure.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={90} className="mt-5 flex items-start gap-3 text-[0.85rem] leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" strokeWidth={2} />
              <span>
                Licensed &amp; insured. Appointments for residential and commercial glass work.
              </span>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="story-heading" className="home-h2 mt-6 max-w-[18ch] text-charcoal">
                Houston is home base, not a pin on a map.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted">
                <p>
                  Houston homes and businesses ask for different kinds of glass. Bathrooms need
                  shower enclosures that fit the stall. Interiors need mirrors that open the room.
                  Windows and doors need glass that matches the frame — and when a pane fails,
                  reglazing has to leave the opening clean.
                </p>
                <p>
                  Those are different jobs, and pricing one like the other is how people end up
                  with an estimate that does not match the opening. So we come out, measure it, and
                  price the work that is actually in front of us before anyone commits.
                </p>
                <p>
                  {business.experience} in, the range of work covers custom shower enclosures and
                  doors, mirrors and mirrored walls, windows, double-pane glass, solar screens, and
                  installation, repair and reglazing for homes and commercial spaces.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <Button href="/gallery" variant="outline" withArrow className="mt-9">
                {cta.viewWork}
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section
        className="relative isolate overflow-hidden bg-charcoal"
        aria-labelledby="principles-heading"
      >
        <div
          aria-hidden="true"
          className="rings pointer-events-none absolute -top-56 -left-40 size-[46rem] text-bone/[0.045]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <Container className="relative z-10">
          <div className="max-w-[46rem]">
            <Reveal>
              <Eyebrow tone="light">Mission &amp; vision</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="principles-heading" className="home-h2 mt-6 text-bone">
                What the shop is <span className="text-gold">actually for.</span>
              </h2>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-x-14 gap-y-12 border-t border-charcoal-line pt-12 lg:grid-cols-2">
            {principles.map(({ id, label, statement, copy }, index) => {
              const Icon = principleIcons[id];
              return (
                <Reveal
                  as="li"
                  key={id}
                  delay={index * 90}
                  className="lg:border-l lg:border-charcoal-line lg:pl-14 lg:first:border-l-0 lg:first:pl-0"
                >
                  <p className="flex items-center gap-3 font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-gold uppercase">
                    <Icon className="size-5 shrink-0" aria-hidden="true" strokeWidth={1.8} />
                    {label}
                  </p>
                  <h3 className="mt-5 max-w-[22ch] font-display text-[1.5rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-bone sm:text-[1.8rem]">
                    {statement}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-bone/65">
                    {copy}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section className="bg-sand/60" space="tight" aria-labelledby="what-we-do-heading">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[36rem]">
              <Reveal>
                <Eyebrow>What we do</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <h2 id="what-we-do-heading" className="home-h2 mt-6 text-charcoal">
                  {services.length} services, one shop.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={110}>
              <Link href="/services" className="link-arrow shrink-0 text-charcoal">
                {cta.viewServices} <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.4} />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-px border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                as="li"
                key={service.slug}
                delay={index * 60}
                className="border-b border-charcoal/15 sm:border-r sm:last:border-r-0"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-bone"
                >
                  <p className="font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-forest uppercase tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 flex items-start justify-between gap-4 font-display text-[1.3rem] font-extrabold tracking-[-0.025em] text-charcoal">
                    {service.name}
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-muted-light transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest"
                      aria-hidden="true"
                      strokeWidth={2.2}
                    />
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{service.cardSummary}</p>
                </Link>
              </Reveal>
            ))}

            <Reveal as="li" delay={services.length * 60} className="border-b border-charcoal/15">
              <div className="flex h-full flex-col justify-center gap-4 bg-charcoal p-7 text-bone">
                <p className="font-display text-[1.05rem] font-extrabold tracking-tight">
                  Not sure which one you need?
                </p>
                <a
                  href={`tel:${business.phoneHref}`}
                  data-cta="phone"
                  data-location="about_services"
                  className="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[1.15rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.4} />
                  {business.phone}
                </a>
              </div>
            </Reveal>
          </ul>
        </Container>
      </Section>

      <ProcessSection
        tone="dark"
        className="bg-bone"
        eyebrow="How we work"
        heading="Four steps, start to finish"
      />

      <AreasServedStrip serviceName="Glass and mirror work" />

      <ContactCTA
        location="about_cta"
        title={
          <>
            Talk to the shop{" "}
            <span className="text-gold">that does the work.</span>
          </>
        }
      />

      <JsonLd
        data={graph(
          buildWebPageSchema("/about", TITLE, DESCRIPTION),
          buildBreadcrumbSchema(trail),
        )}
      />
    </>
  );
}
