import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { business } from "@/data/business";
import { services } from "@/data/services";
import { servicesNavGroups } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { AreasServedStrip } from "@/components/services/AreasServedStrip";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactCTA } from "@/components/sections/ContactCTA";

const TITLE = "Glass & Mirror Services in Houston, TX | Martinez Orlyn Glass & Mirror";
const DESCRIPTION =
  "Glass and mirror services in Houston, TX: custom shower enclosures, shower doors, mirrors, mirrored walls, windows, double-pane glass, solar screens, installation, repair and reglazing.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

const trail = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export default function ServicesHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            {services.length} services.{" "}
            <span className="text-gold">One shop that does all of it.</span>
          </>
        }
        lead={`Glass and mirror work for residential and commercial properties across ${business.radiusLabel}. Licensed & insured, scheduled by appointment.`}
        trail={trail}
      />

      {servicesNavGroups.map(({ group, items }, groupIndex) => (
        <Section
          key={group.id}
          className={groupIndex % 2 === 1 ? "bg-sand/50" : "bg-bone"}
          aria-labelledby={`group-${group.id}`}
        >
        <Container>
          <div className="max-w-[44rem]">
            <Reveal>
              <p className="font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-forest uppercase tabular-nums">
                {String(groupIndex + 1).padStart(2, "0")} · {items.length} services
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 id={`group-${group.id}`} className="home-h2 mt-5 text-charcoal">
                {group.name}
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">{group.summary}</p>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 90}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-charcoal/12 bg-white transition-colors hover:border-charcoal/30"
                >
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-charcoal">
                    {service.heroImage && (
                      <Image
                        src={service.heroImage.src}
                        alt=""
                        fill
                        quality={74}
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="img-zoom object-cover"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 bg-charcoal px-3 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-gold tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[1.4rem] leading-tight font-extrabold tracking-[-0.03em] text-charcoal transition-colors group-hover:text-forest">
                      {service.name}
                    </h3>
                    <p className="mt-3 text-[0.94rem] leading-relaxed text-muted">
                      {service.cardSummary}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[0.7rem] font-extrabold tracking-[0.14em] text-forest uppercase">
                      Explore
                      <ArrowRight className="arrow-shift size-3.5" aria-hidden="true" strokeWidth={2.6} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
        </Section>
      ))}

      <ProcessSection tone="light" />
      <AreasServedStrip serviceName="Glass & mirror services" />

      <ContactCTA
        location="services_cta"
        title={
          <>
            Not sure which one{" "}
            <span className="text-gold">you need?</span>
          </>
        }
        lead="Describe the opening and we will tell you what the job actually is. Appointments are scheduled after we understand the glass, the access and the finish you want."
      />

      <JsonLd
        data={graph(
          buildWebPageSchema("/services", TITLE, DESCRIPTION),
          buildBreadcrumbSchema(trail),
        )}
      />
    </>
  );
}
