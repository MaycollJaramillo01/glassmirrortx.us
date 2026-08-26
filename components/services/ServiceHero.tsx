import { Phone } from "lucide-react";
import type { Service } from "@/types";
import { business, cta } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/utils/cn";

const trust = [
  business.experienceLabel,
  "Licensed & Insured",
  "By Appointment",
  "Residential & Commercial",
];

/**
 * Hero treatments, chosen per service.
 *
 * Which one a service gets is driven by the photography that actually exists
 * for it — a service with no job photograph gets the typographic treatment
 * rather than an empty grey box. That constraint is also what keeps the pages
 * from reading as one template.
 */
export function ServiceHero({ service, trail }: { service: Service; trail: Crumb[] }) {
  const { heroVariant: variant } = service;

  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <div
        aria-hidden="true"
        className="glass-facet pointer-events-none absolute -top-40 -right-24 size-[44rem] text-bone/[0.05]"
      />

      <Container width="wide" className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-28">
        <Breadcrumbs trail={trail} tone="light" className="mb-9" />

        <div className="grid lg:grid-cols-12">
          <div className="min-w-0 max-w-4xl lg:col-span-9">
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {service.eyebrow}
            </p>

            <h1
              className={cn(
                "mt-6 text-bone",
                variant === "typographic" ? "t-display" : "t-h1",
              )}
            >
              {service.h1}
            </h1>

            <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-bone/80 sm:text-[1.0625rem]">
              {service.intro}
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                withArrow
                className="shrink-0"
                data-cta="estimate"
                data-location="service_hero"
              >
                {cta.estimate}
              </Button>
              <Button
                href={`tel:${business.phoneHref}`}
                variant="onDark"
                size="lg"
                className="shrink-0"
                data-cta="phone"
                data-location="service_hero"
              >
                <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.6} />
                  {business.phone}
                </span>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-bone/15 pt-7">
              {trust.map((item) => (
                <li
                  key={item}
                  className="font-display text-[0.72rem] font-bold tracking-[0.12em] text-bone/70 uppercase"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
