import Image from "next/image";
import { Phone } from "lucide-react";
import { business, cta } from "@/data/business";
import { photos } from "@/data/photos";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

const situations = ["Need a shower measured?", "Broken pane?", "Custom mirror?"];

/** Customer support / call strip — not a storm-emergency banner. */
export function EmergencySection() {
  return (
    <Section
      space="loose"
      className="relative isolate overflow-hidden bg-charcoal"
      aria-labelledby="support-heading"
    >
      <Image
        src={photos.glassWork.src}
        alt=""
        fill
        quality={72}
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,20,17,0.97) 0%, rgba(15,20,17,0.92) 42%, rgba(15,20,17,0.62) 100%)",
        }}
      />

      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <span className="t-eyebrow inline-flex items-center gap-2.5 bg-gold px-4 py-2 text-charcoal">
              {cta.emergency}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 id="support-heading" className="t-h2 mt-7 text-bone">
              {situations.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-bone/75">
              Whether you need a custom shower enclosure, a mirrored wall, window glass or
              reglazing, call {business.name}. We serve Houston and nearby communities and schedule
              appointments around the project.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10">
              <a
                href={`tel:${business.phoneHref}`}
                data-cta="phone"
                data-location="home_support"
                className="group inline-flex flex-col gap-1 border-l-4 border-gold bg-charcoal/60 py-4 pr-8 pl-6 backdrop-blur-sm transition-colors hover:bg-charcoal/85"
              >
                <span className="t-eyebrow text-gold">Call to Schedule</span>
                <span className="flex items-center gap-3 font-display text-[2rem] leading-none font-extrabold tracking-tight text-bone sm:text-[2.6rem]">
                  <Phone className="size-6 shrink-0 text-gold sm:size-7" aria-hidden="true" strokeWidth={2.4} />
                  {business.phone}
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" variant="onDark" withArrow>
                {cta.estimate}
              </Button>
              <Button href="/services" variant="onDark" withArrow>
                View Services
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
