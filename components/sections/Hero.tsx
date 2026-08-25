import Image from "next/image";
import { Check, Phone } from "lucide-react";
import { business, cta } from "@/data/business";
import { photos } from "@/data/photos";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const trust = [
  business.experienceLabel,
  "Licensed & Insured",
  "Residential & Commercial",
  "By Appointment",
];

/**
 * Legacy home hero (superseded by RedesignedHome on the live home page).
 * Kept glass-branded so unused paths never reintroduce tree copy.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-charcoal pt-32 pb-14 lg:min-h-[94svh] lg:items-center lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[48%]">
        <div className="hero-media relative size-full">
          <Image
            src={photos.heroGlass.src}
            alt={photos.heroGlass.alt}
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-charcoal/78 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,28,25,0.92) 0%, rgba(23,28,25,0.72) 40%, rgba(23,28,25,0.90) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, #171C19 0%, rgba(23,28,25,0.86) 22%, rgba(23,28,25,0.10) 62%, rgba(23,28,25,0.28) 100%)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="rings pointer-events-none absolute -bottom-56 -left-52 size-[46rem] text-bone/[0.045]"
      />

      <Container width="wide" className="relative z-10">
        <div className="max-w-[36rem] xl:max-w-[42rem]">
          <p
            className="hero-in t-eyebrow flex items-center gap-3 text-gold"
            style={{ ["--d" as string]: "150ms" }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            Glass &amp; Mirror • Houston, Texas
          </p>

          <h1 className="t-display mt-6 text-bone">
            <span className="hero-in block" style={{ ["--d" as string]: "260ms" }}>
              Martinez Orlyn
            </span>
            <span className="hero-in block" style={{ ["--d" as string]: "360ms" }}>
              Glass &amp; Mirror Built Around{" "}
              <span className="text-gold">Fit &amp; Finish</span>
            </span>
          </h1>

          <p
            className="hero-in mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-bone/80 sm:text-lg"
            style={{ ["--d" as string]: "500ms" }}
          >
            Custom shower enclosures, mirrors, windows and glass repair for residential and
            commercial properties across Houston, TX and surrounding communities. Licensed,
            insured, and scheduled by appointment.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--d" as string]: "620ms" }}
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              withArrow
              data-cta="estimate"
              data-location="hero"
            >
              {cta.estimate}
            </Button>
            <Button
              href={`tel:${business.phoneHref}`}
              variant="onDark"
              size="lg"
              data-cta="phone"
              data-location="hero"
            >
              <Phone className="mr-1 size-4 text-gold" aria-hidden="true" strokeWidth={2.6} />
              {business.phone}
            </Button>
          </div>

          <ul
            className="hero-in mt-10 flex flex-wrap gap-x-6 gap-y-3"
            style={{ ["--d" as string]: "740ms" }}
          >
            {trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-[0.88rem] text-bone/75">
                <Check className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
