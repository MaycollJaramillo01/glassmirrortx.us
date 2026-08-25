import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

export function CompanyIntro() {
  return (
    <Section className="bg-bone" aria-labelledby="intro-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <Eyebrow>Experience That Shows In The Work</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h2 id="intro-heading" className="t-h2 mt-6 text-charcoal">
                Professional glass &amp; mirror for Houston &amp; surrounding communities
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-muted">
                <p>
                  {business.name} serves Houston-area homes and businesses with custom shower
                  enclosures, mirrors, windows and glass repair — measured to the opening and
                  finished clean.
                </p>
                <p>
                  That work covers showers and doors, custom mirrors and mirrored walls, window
                  glass, double-pane units, solar screens, and installation, repair and reglazing
                  for residential and commercial customers.
                </p>
                <p>
                  When the job is finished, the hardware is checked and the area is cleaned. The
                  company is licensed and insured, and appointments are scheduled around the
                  project.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button href="/about" variant="outline" withArrow>
                  About {business.name}
                </Button>
                <Button href="/services" variant="text" withArrow>
                  View All Services
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <Reveal kind="mask">
              <div className="relative aspect-4/3 overflow-hidden lg:aspect-[5/4]">
                <Image
                  src={photos.aboutShop.src}
                  alt={photos.aboutShop.alt}
                  fill
                  quality={80}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <Reveal
              kind="scale"
              delay={220}
              className="absolute -bottom-8 left-0 sm:-bottom-10 lg:-left-14"
            >
              <div className="relative overflow-hidden bg-charcoal px-8 py-7 sm:px-10 sm:py-8">
                <div
                  aria-hidden="true"
                  className="rings pointer-events-none absolute -top-16 -right-16 size-56 text-bone/[0.06]"
                />
                <p className="t-stat relative text-gold">{business.experienceValue}</p>
                <p className="relative mt-2.5 font-display text-[0.7rem] leading-tight font-bold tracking-[0.2em] text-bone uppercase">
                  Years of
                  <br />
                  Experience
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="h-10 sm:h-12" aria-hidden="true" />
      </Container>
    </Section>
  );
}
