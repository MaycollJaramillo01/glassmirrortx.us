import { Quote } from "lucide-react";
import { testimonials } from "@/data/gallery";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Renders nothing while data/gallery.ts `testimonials` is empty.
 *
 * That is deliberate. Inventing customer quotes, star ratings or review counts
 * would be fabricating evidence, so the section stays out of the page until
 * real, attributable reviews are added — at which point it appears on its own.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section className="bg-forest" aria-labelledby="reviews-heading">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone="light">What Customers Say</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="reviews-heading" className="t-h2 mt-6 text-bone">
              In their words
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={`${item.author}-${i}`} delay={i * 90}>
              <figure className="flex h-full flex-col bg-forest-deep/60 p-8">
                <Quote className="size-7 shrink-0 text-gold" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-bone/85">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-bone/15 pt-4">
                  <span className="block font-display text-[0.95rem] font-bold text-bone">
                    {item.author}
                  </span>
                  <span className="mt-0.5 block text-[0.8rem] text-bone/55">
                    {item.location} · {item.source}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
