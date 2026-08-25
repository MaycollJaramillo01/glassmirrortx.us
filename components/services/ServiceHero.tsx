import { Phone, ShieldAlert } from "lucide-react";
import type { Service } from "@/types";
import { business, cta } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/utils/cn";

const trust = ["15+ Years", "Insured", "Free Estimates", "Residential & Commercial"];

/**
 * Four hero treatments, chosen per service.
 *
 * Which one a service gets is driven by the photography that actually exists
 * for it — a service with no job photograph gets the typographic treatment
 * rather than an empty grey box. That constraint is also what keeps the pages
 * from reading as one template.
 */
export function ServiceHero({ service, trail }: { service: Service; trail: Crumb[] }) {
  const { heroVariant: variant } = service;
  const urgent = variant === "urgent";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        urgent ? "bg-forest-deep" : "bg-charcoal",
      )}
    >
      {/*
        The photograph used to sit full-bleed under a 0.88-0.93 dark gradient,
        which made it read as texture rather than as a picture of the work. It
        now gets its own frame beside the copy, so every service page actually
        shows the service.
      */}
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-40 -right-24 size-[44rem] text-bone/[0.05]"
      />

      {/* --- Content ------------------------------------------------------ */}
      <Container width="wide" className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-28">
        <Breadcrumbs trail={trail} tone="light" className="mb-9" />

        <div className="grid lg:grid-cols-12">
          <div className="min-w-0 max-w-4xl lg:col-span-9">
          {urgent ? (
            <p className="t-eyebrow inline-flex items-center gap-2.5 bg-gold px-4 py-2 text-charcoal">
              <ShieldAlert className="size-3.5" aria-hidden="true" />
              {service.eyebrow}
            </p>
          ) : (
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {service.eyebrow}
            </p>
          )}

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

          {/* Emergency pages lead with the phone number, not a form. */}
          {urgent ? (
            <div className="mt-10">
              <a
                href={`tel:${business.phoneHref}`}
                data-cta="emergency_phone"
                data-location="service_hero"
                className="group inline-flex flex-col gap-1 border-l-4 border-gold bg-charcoal/45 py-4 pr-8 pl-6 transition-colors hover:bg-charcoal/70"
              >
                <span className="t-eyebrow text-gold">Call Now — 24/7</span>
                <span className="flex items-center gap-3 font-display text-[2rem] leading-none font-extrabold tracking-tight text-bone sm:text-[2.6rem]">
                  <Phone className="size-6 shrink-0 text-gold sm:size-7" aria-hidden="true" strokeWidth={2.4} />
                  {business.phone}
                </span>
              </a>
              <div className="mt-5">
                <Button
                  href="/contact"
                  variant="onDark"
                  withArrow
                  data-cta="estimate"
                  data-location="service_hero"
                >
                  Request a Free Estimate
                </Button>
              </div>
            </div>
          ) : (
            // items-stretch keeps both buttons the same height; the nowrap span
            // stops the phone icon wrapping onto its own line when it is tight.
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
          )}

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
