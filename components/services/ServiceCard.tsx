import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { cn } from "@/lib/utils/cn";

/** Large image-led card. Used sparingly — for featured services only. */
export function ServiceFeatureCard({
  service,
  index,
  className,
  priority = false,
}: {
  service: Service;
  index: number;
  className?: string;
  priority?: boolean;
}) {
  const image = service.heroImage;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden bg-charcoal p-7 sm:min-h-[30rem] sm:p-9",
        className,
      )}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            quality={78}
            priority={priority}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 42vw"
            className="img-zoom -z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="-z-10 absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(23,28,25,0.30) 0%, rgba(23,28,25,0.55) 45%, rgba(23,28,25,0.94) 100%)",
            }}
          />
        </>
      )}

      <span className="t-numeral absolute top-6 right-7 text-bone/25 transition-colors duration-300 group-hover:text-gold/70 sm:top-8 sm:right-9">
        {String(index).padStart(2, "0")}
      </span>

      <h3 className="t-h3 max-w-[16ch] text-bone uppercase">{service.name}</h3>

      <p className="mt-3.5 max-w-[38ch] text-[0.95rem] leading-relaxed text-bone/75">
        {service.cardSummary}
      </p>

      <span className="mt-6 inline-flex items-center gap-2.5 font-display text-[0.72rem] font-bold tracking-[0.16em] text-gold uppercase">
        Explore Service
        <ArrowRight className="arrow-shift size-4" aria-hidden="true" strokeWidth={2.6} />
      </span>
    </Link>
  );
}

/**
 * Compact row. Deliberately not a card — alternating the treatment is what
 * stops a services section reading as one repeated grid.
 */
export function ServiceRow({
  service,
  index,
  tone = "dark",
}: {
  service: Service;
  index: number;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex items-start gap-5 border-t py-7 transition-colors sm:gap-8 sm:py-8",
        light
          ? "border-bone/15 hover:bg-bone/[0.04]"
          : "border-charcoal/12 hover:bg-charcoal/[0.03]",
      )}
    >
      <span
        className={cn(
          "font-display text-[0.8rem] font-extrabold tracking-[0.1em] tabular-nums transition-colors",
          light ? "text-bone/35 group-hover:text-gold" : "text-muted/60 group-hover:text-forest",
        )}
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "t-h4 uppercase transition-colors",
            light ? "text-bone group-hover:text-gold" : "text-charcoal group-hover:text-forest",
          )}
        >
          {service.name}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-[52ch] text-[0.92rem] leading-relaxed",
            light ? "text-bone/60" : "text-muted",
          )}
        >
          {service.cardSummary}
        </p>
      </div>

      <ArrowRight
        className={cn(
          "arrow-shift mt-1 size-5 shrink-0 transition-colors",
          light ? "text-bone/40 group-hover:text-gold" : "text-muted/50 group-hover:text-forest",
        )}
        aria-hidden="true"
        strokeWidth={2.2}
      />
    </Link>
  );
}
