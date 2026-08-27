import { Star } from "lucide-react";

import { googleReviews, testimonials } from "@/data/reviews";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Google reviews strip for the home page.
 * Rating summary + auto-advancing carousel of curated recent Google quotes.
 */
export function TestimonialsSection() {
  if (!googleReviews.count && testimonials.length === 0) return null;

  return (
    <Section className="bg-charcoal text-bone" aria-labelledby="reviews-heading">
      <Container>
        <div className="flex flex-col gap-8 border-b border-charcoal-line pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow-line text-gold">Google reviews</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="reviews-heading" className="home-h2 mt-6 text-bone">
                Rated by Houston customers.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-5 max-w-[36rem] text-[1rem] leading-relaxed text-bone/70">
                Recent Google reviews for Martinez Orlyn Glass & Mirror — showers, mirrors,
                windows and glass repair.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col gap-3 border border-bone/20 bg-charcoal-soft px-6 py-5 transition-colors hover:border-gold"
            >
              <span className="flex items-center gap-3">
                <span className="font-display text-[2.5rem] leading-none font-extrabold tracking-tight text-bone">
                  {googleReviews.rating.toFixed(1)}
                </span>
                <StarRow rating={googleReviews.rating} />
              </span>
              <span className="text-[0.82rem] text-bone/65">
                Based on {googleReviews.count.toLocaleString("en-US")} {googleReviews.label} reviews
              </span>
              <span className="font-display text-[0.7rem] font-bold tracking-[0.12em] text-gold uppercase">
                Read reviews on Google →
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <ReviewsCarousel items={testimonials} />
        </Reveal>
      </Container>
    </Section>
  );
}

function StarRow({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={i < full ? "size-4 fill-gold text-gold" : "size-4 text-bone/25"}
          aria-hidden="true"
          strokeWidth={2}
        />
      ))}
    </span>
  );
}
