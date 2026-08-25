import { Phone } from "lucide-react";
import { business, cta } from "@/data/business";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

interface Props {
  /** Overrides for service and location pages, so the closing line fits the page. */
  title?: React.ReactNode;
  lead?: string;
  eyebrow?: string;
}

export function FinalCTA({
  title = (
    <>
      Your space.
      <br />
      <span className="text-gold">Our craftsmanship.</span>
    </>
  ),
  lead = "Professional glass and mirror work when you need it. Tell us what you need and we will come out, measure the opening and help you schedule.",
  eyebrow = `${cta.estimate} · Houston, TX`,
}: Props) {
  return (
    <Section
      space="loose"
      className="relative isolate overflow-hidden bg-charcoal"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -top-64 -right-40 size-[52rem] text-bone/[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
      />

      <Container className="relative">
        <div className="max-w-4xl">
          <Reveal>
            <p className="t-eyebrow flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="final-cta-heading" className="t-display mt-7 text-bone">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-bone/75">{lead}</p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                withArrow
                data-cta="estimate"
                data-location="final_cta"
              >
                {cta.estimate}
              </Button>

              <a
                href={`tel:${business.phoneHref}`}
                data-cta="phone"
                data-location="final_cta"
                className="group inline-flex items-center gap-3 font-display text-[1.5rem] leading-none font-extrabold tracking-tight text-bone transition-colors hover:text-gold sm:ml-4 sm:text-[1.75rem]"
              >
                <Phone className="size-5 text-gold" aria-hidden="true" strokeWidth={2.5} />
                {business.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
