import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photos } from "@/data/photos";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

const capabilities = [
  { name: "Custom Shower Enclosures", href: "/services/custom-shower-enclosures" },
  { name: "Shower Doors", href: "/services/shower-doors" },
  { name: "Custom Mirrors", href: "/services/custom-mirrors" },
  { name: "Mirrored Walls", href: "/services/mirrored-walls" },
];

/**
 * Featured glass highlight (legacy land-clearing slot). Not used on RedesignedHome;
 * kept glass-branded so unused paths never reintroduce tree copy.
 */
export function LandClearingHighlight() {
  return (
    <Section space="none" className="relative isolate bg-charcoal" aria-labelledby="glass-highlight-heading">
      <div className="grid lg:grid-cols-2">
        <Reveal kind="mask" className="relative min-h-[22rem] lg:min-h-[42rem]">
          <Image
            src={photos.showerEnclosure.src}
            alt={photos.showerEnclosure.alt}
            fill
            quality={78}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-charcoal/40"
          />
        </Reveal>

        <div className="flex items-center py-16 md:py-24 lg:py-28">
          <Container width="narrow" className="lg:pr-14 lg:pl-14">
            <Reveal>
              <Eyebrow tone="light">Showers &amp; Mirrors</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h2 id="glass-highlight-heading" className="t-h2 mt-6 text-bone">
                Glass that fits
                <br />
                <span className="text-gold">the opening.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 text-[1.02rem] leading-relaxed text-bone/75">
                Custom shower enclosures and mirrors are measured to the stall or wall, fabricated
                to fit, and installed with hardware matched to the finish. Catalog sizes that almost
                work are not the job.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-bone/75">
                From frameless showers to mirrored walls, we walk the space with you and set the
                scope before fabrication starts.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-9 grid grid-cols-1 gap-x-8 border-t border-bone/15 pt-2 sm:grid-cols-2">
                {capabilities.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between gap-3 border-b border-bone/10 py-3.5 text-[0.92rem] text-bone/80 transition-colors hover:text-gold"
                    >
                      {item.name}
                      <ArrowUpRight
                        className="size-4 shrink-0 text-bone/30 transition-colors group-hover:text-gold"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-9">
                <Button href="/services/custom-shower-enclosures" variant="primary" withArrow>
                  Explore Shower Enclosures
                </Button>
              </div>
            </Reveal>
          </Container>
        </div>
      </div>
    </Section>
  );
}
