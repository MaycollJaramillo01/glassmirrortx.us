import { Plus } from "lucide-react";
import type { FAQ } from "@/types";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils/cn";

interface Props {
  faqs: FAQ[];
  eyebrow?: string;
  heading?: string;
  lead?: string;
  className?: string;
  headingId?: string;
}

/**
 * Built on native <details>/<summary>.
 *
 * That gives correct semantics, keyboard operation, screen-reader announcement
 * and in-page find for free, with no JavaScript and no ARIA to get wrong.
 */
export function FAQSection({
  faqs,
  eyebrow = "Common Questions",
  heading = "Answers before you call",
  lead,
  className,
  headingId = "faq-heading",
}: Props) {
  if (faqs.length === 0) return null;

  return (
    <Section className={cn("bg-bone", className)} aria-labelledby={headingId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id={headingId} className="t-h2 mt-6 text-charcoal">
                {heading}
              </h2>
            </Reveal>
            {lead && (
              <Reveal delay={120}>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">{lead}</p>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-charcoal/15">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 50}>
                  <details className="group border-b border-charcoal/12">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-[1.02rem] leading-snug font-bold tracking-tight text-charcoal transition-colors group-hover:text-forest sm:text-[1.1rem]">
                        {faq.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-charcoal/20 text-charcoal transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold"
                      >
                        <Plus className="size-3.5" strokeWidth={2.5} />
                      </span>
                    </summary>
                    <p className="measure pr-10 pb-6 text-[0.95rem] leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
