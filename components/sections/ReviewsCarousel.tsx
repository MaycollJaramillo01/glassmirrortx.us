"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import type { Testimonial } from "@/types";
import { googleReviews } from "@/data/reviews";
import { cn } from "@/lib/utils/cn";

const AUTO_MS = 6500;

type ReviewsCarouselProps = {
  items: Testimonial[];
};

/**
 * Auto-advancing Google reviews carousel.
 * Skips ticks while the tab is hidden; respects prefers-reduced-motion.
 */
export function ReviewsCarousel({ items }: ReviewsCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const total = items.length;
  const active = items[index]!;

  function goTo(next: number) {
    if (total < 1) return;
    setIndex(((next % total) + total) % total);
  }

  useEffect(() => {
    if (total < 2 || reduceMotion) return;

    const tick = () => {
      if (document.visibilityState === "hidden") return;
      setIndex((current) => (current + 1) % total);
    };

    const id = window.setInterval(tick, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  if (total === 0) return null;

  return (
    <div className="mt-10">
      <div className="relative grid gap-6 lg:grid-cols-12 lg:items-stretch">
        <figure
          key={active.author + index}
          className="flex min-h-[18rem] flex-col border border-charcoal-line bg-charcoal-soft/80 p-7 sm:p-9 lg:col-span-8"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex items-center justify-between gap-4">
            <StarRow rating={active.rating ?? 5} />
            <span className="font-display text-[0.68rem] font-bold tracking-[0.14em] text-bone/45 uppercase">
              {index + 1} / {total}
            </span>
          </div>
          <blockquote className="mt-6 flex-1 text-[1.05rem] leading-relaxed text-bone/90 sm:text-[1.12rem]">
            “{active.quote}”
          </blockquote>
          <figcaption className="mt-8 border-t border-bone/12 pt-5">
            <span className="block font-display text-[1rem] font-bold text-bone">
              {active.author}
            </span>
            <span className="mt-1 block text-[0.8rem] text-bone/55">
              {active.location} · {active.source}
            </span>
          </figcaption>
        </figure>

        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[14rem] flex-col justify-between border border-bone/15 bg-forest/40 p-7 transition-colors hover:border-gold sm:p-8 lg:col-span-4"
        >
          <div>
            <p className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-gold uppercase">
              More on Google
            </p>
            <p className="mt-4 font-display text-[1.35rem] font-extrabold tracking-tight text-bone">
              {googleReviews.count.toLocaleString("en-US")} reviews from Houston-area
              customers.
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-bone/70">
              Window replacement, shower glass, mirrors and more — read the full set on Google.
            </p>
          </div>
          <span className="mt-8 font-display text-[0.72rem] font-bold tracking-[0.12em] text-gold uppercase">
            Open Google reviews →
          </span>
        </a>
      </div>

      {total > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Review slides">
            {items.map((item, i) => (
              <button
                key={`${item.author}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show review by ${item.author}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-gold" : "w-2 bg-bone/25 hover:bg-bone/45",
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CarouselButton
              label="Previous review"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="size-5" strokeWidth={2.2} aria-hidden="true" />
            </CarouselButton>
            <CarouselButton label="Next review" onClick={() => goTo(index + 1)}>
              <ChevronRight className="size-5" strokeWidth={2.2} aria-hidden="true" />
            </CarouselButton>
          </div>
        </div>
      )}
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </button>
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (mounted.current) setReduced(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mounted.current = false;
      mq.removeEventListener("change", update);
    };
  }, []);

  return reduced;
}
