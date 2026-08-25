import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone, Plus, ShieldCheck } from "lucide-react";

import { business, cta } from "@/data/business";
import { getServiceArea, primaryAreaSlugs } from "@/data/service-areas";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

interface Props {
  title?: ReactNode;
  lead?: string;
  /** Tracking suffix, so each page's CTA reports separately. */
  location?: string;
}

const assurances = ["Licensed & insured", "By appointment", "Residential & commercial"] as const;

const areaCities = primaryAreaSlugs
  .slice(0, 6)
  .map((slug) => getServiceArea(slug)?.city)
  .filter(Boolean)
  .join(", ");

/**
 * Closing CTA with the contact details spelled out beside it. Every value is a
 * real link — a phone number the visitor has to retype is a phone number that
 * does not get dialled.
 */
export function ContactCTA({
  title = (
    <>
      Ready for glass work?{" "}
      <span className="text-gold">Let us come measure.</span>
    </>
  ),
  lead = "Tell us what you need — a shower enclosure, a mirrored wall, window glass or reglazing. We measure the opening, explain the work and help you schedule an appointment.",
  location = "contact_cta",
}: Props) {
  return (
    <Section
      space="loose"
      className="relative isolate overflow-hidden bg-charcoal"
      aria-labelledby="contact-cta-heading"
    >
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-72 -left-48 size-[54rem] text-bone/[0.045]"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
      />

      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* min-w-0: without it the grid track sizes to the widest button and
              pushes the whole column past the container on narrow screens. */}
          <div className="min-w-0 lg:col-span-6">
            <Reveal>
              <p className="inline-flex items-center gap-2.5 border border-bone/20 px-4 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-bone/85 uppercase">
                <ShieldCheck className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.2} />
                {business.experience} of experience
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h2 id="contact-cta-heading" className="home-h2 mt-7 max-w-[15ch] text-bone">
                {title}
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-7 max-w-[52ch] text-[1.02rem] leading-relaxed text-bone/72">{lead}</p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {assurances.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2.5 text-[0.9rem] text-bone/85">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-5 shrink-0 items-center justify-center border border-gold/40 bg-gold/10"
                    >
                      <Plus className="size-3 text-gold" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={230}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href={`tel:${business.phoneHref}`}
                  variant="primary"
                  size="lg"
                  data-cta="phone"
                  data-location={location}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Phone className="size-4 shrink-0" aria-hidden="true" strokeWidth={2.6} />
                    {/* "Call" stays in the accessible name but out of the layout,
                        so the button fits a 375px screen on one line. */}
                    <span className="sr-only">Call </span>
                    {business.phone}
                  </span>
                </Button>

                <Button
                  href="/contact"
                  variant="onDark"
                  size="lg"
                  withArrow
                  data-cta="estimate"
                  data-location={location}
                >
                  {cta.estimateShort}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal kind="left" delay={140} className="min-w-0 lg:col-span-5 lg:col-start-8">
            <div className="bg-bone p-2">
              <div className="h-full border border-charcoal/12 p-7 sm:p-9">
                <p className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-charcoal">
                  Quick contact
                </p>
                <span aria-hidden="true" className="mt-5 block h-px w-10 bg-forest" />

                <dl className="mt-7 space-y-6">
                  <ContactRow
                    icon={Phone}
                    label="Need glass or mirror work?"
                    value={business.phone}
                    href={`tel:${business.phoneHref}`}
                    dataCta="phone"
                    location={location}
                  />
                  <ContactRow
                    icon={Mail}
                    label="Send us the details"
                    value={business.email}
                    href={`mailto:${business.email}`}
                    dataCta="email"
                    location={location}
                  />
                  <ContactRow icon={Clock} label="When we answer" value={business.hoursLabel} />
                  <ContactRow
                    icon={MapPin}
                    label="Where we work"
                    value={`${areaCities} and nearby communities within ${business.radiusLabel} of ${business.city}.`}
                    note
                  />
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  dataCta,
  location,
  note = false,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  dataCta?: string;
  location?: string;
  /** Long prose value — reads as a sentence, not as a bold display line. */
  note?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center bg-forest/10"
      >
        <Icon className="size-[1.15rem] text-forest" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="text-[0.82rem] leading-snug text-muted">{label}</dt>
        <dd
          className={
            note
              ? "mt-1.5 text-[0.9rem] leading-relaxed text-charcoal"
              : "mt-1 font-display text-[1.02rem] leading-snug font-bold tracking-[-0.015em] break-words text-charcoal"
          }
        >
          {href ? (
            <a
              href={href}
              data-cta={dataCta}
              data-location={location}
              className="link-underline transition-colors hover:text-forest"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}
