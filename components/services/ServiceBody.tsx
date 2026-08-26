import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Benefit, ContentBlock, Photo, Service } from "@/types";
import { getService } from "@/data/services";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

/** "When you need this" checklist beside the detailed prose. */
export function ServiceSignals({
  signals,
  image,
  serviceName,
}: {
  signals: Service["signals"];
  image: Photo | null;
  serviceName: string;
}) {
  return (
    <Section className="bg-bone" space="tight" aria-labelledby="signals-heading">
      <Container>
        {/*
          Both columns stretch to the same height and the photograph takes
          whatever is left under the heading, so the section has no dead corner
          however many signals a service lists.
        */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          <div className="flex flex-col lg:col-span-5">
            <Reveal>
              <Eyebrow>Is This Your Situation?</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="signals-heading" className="t-h3 mt-5 max-w-[20ch] text-charcoal">
                {signals.heading}
              </h2>
            </Reveal>

            {image && (
              <Reveal kind="scale" delay={120} className="mt-8 flex min-h-0 flex-1 flex-col">
                <figure className="relative min-h-[15rem] flex-1 overflow-hidden bg-sand max-lg:aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    fetchPriority="high"
                    quality={80}
                    sizes="(max-width: 1023px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  {/* A stock frame gets no caption — that line reads as a claim
                      that the photograph is one of this company's own jobs. */}
                  {!image.stock && (
                    <figcaption className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-charcoal/90 to-transparent px-5 pt-12 pb-4 font-display text-[0.68rem] font-bold tracking-[0.14em] text-bone uppercase">
                      {serviceName} · Houston, TX
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {/* No markers. The hairline between rows is the separator. */}
            <ul className="border-t border-charcoal/12">
              {signals.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 60}
                  className="flex gap-6 border-b border-charcoal/12 py-5"
                >
                  <span className="w-6 shrink-0 pt-1 font-display text-[0.72rem] font-bold text-forest tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1rem] leading-relaxed text-charcoal">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Direct answer block. The first two sentences stand alone so an answer engine
 * or a featured snippet can quote them without the rest of the page, and the
 * same text is emitted as FAQPage structured data.
 */
export function ServiceAnswer({ aeo }: { aeo: Service["aeo"] }) {
  return (
    <Section className="bg-white" space="tight" aria-labelledby="answer-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="answer-heading" className="t-h3 text-charcoal">
                {aeo.question}
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="mt-6 text-[1.05rem] leading-relaxed text-muted">{aeo.answer}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-charcoal/12 border-y border-charcoal/12">
              {aeo.facts.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 70} className="flex gap-5 py-4">
                  <dt className="w-[9rem] shrink-0 font-display text-[0.68rem] font-bold tracking-[0.14em] text-forest uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-[0.92rem] leading-relaxed text-charcoal">{fact.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ServiceBenefits({ benefits }: { benefits: Benefit[] }) {
  return (
    <Section
      className="relative isolate overflow-hidden bg-forest"
      aria-labelledby="benefits-heading"
    >
      <div
        aria-hidden="true"
        className="glass-facet pointer-events-none absolute -top-56 -right-40 size-[46rem] text-bone/[0.07]"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      {/*
        The heading used to sit alone across the top with the four points in a
        thin band under it, which left most of the band empty. It now anchors
        the left column and the points fill the right as a 2x2 grid, so the
        section is as tall as its content and no taller.
      */}
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="light">What You Get</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="benefits-heading" className="home-h2 mt-6 max-w-[12ch] text-bone">
                How the job is done
              </h2>
            </Reveal>
          </div>

          <ul className="grid gap-x-12 gap-y-11 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {benefits.map((benefit, i) => (
              <Reveal
                as="li"
                key={benefit.title}
                delay={i * 80}
                className="border-t border-bone/20 pt-6"
              >
                <span className="font-display text-[1.9rem] leading-none font-extrabold tracking-[-0.04em] text-bone/30 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 max-w-[22ch] font-display text-[1.02rem] leading-tight font-extrabold tracking-[0.01em] text-bone uppercase">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-bone/70">{benefit.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/** Long-form prose. Alternates left/right emphasis so it never reads as a wall. */
export function ServiceContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <Section className="bg-bone">
      <Container>
        <div className="space-y-16 lg:space-y-24">
          {blocks.map((block, i) => (
            <div key={block.heading} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[0.78rem] font-extrabold tracking-[0.14em] text-gold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="t-h3 text-charcoal">{block.heading}</h2>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <Reveal delay={80}>
                  <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted">
                    {block.paragraphs.map((paragraph, p) => (
                      <p key={p}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>

                {block.bullets && (
                  <Reveal delay={140}>
                    <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-charcoal/12 pt-7 sm:grid-cols-2">
                      {block.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1.5 shrink-0 bg-gold"
                          />
                          <span className="text-[0.92rem] leading-relaxed text-muted">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ServiceGallery({ photos, serviceName }: { photos: Photo[]; serviceName: string }) {
  if (photos.length === 0) return null;

  return (
    <Section className="bg-sand/60" space="tight" aria-labelledby="service-gallery-heading">
      <Container>
        <Reveal>
          <Eyebrow>Recent Work</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="service-gallery-heading" className="t-h2 mt-5 text-charcoal">
            {serviceName} on real properties
          </h2>
        </Reveal>

        <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo, i) => (
            <Reveal as="li" key={photo.src} kind="scale" delay={i * 80}>
              <div className="relative aspect-3/4 overflow-hidden bg-charcoal">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={74}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="img-zoom object-cover"
                />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <Link
            href="/gallery"
            className="t-eyebrow mt-8 inline-flex items-center gap-2.5 text-charcoal transition-colors hover:text-forest"
          >
            View the full gallery
            <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const related = slugs.map(getService).filter((s) => s !== undefined);
  if (related.length === 0) return null;

  return (
    <Section className="bg-bone" space="tight" aria-labelledby="related-heading">
      <Container>
        <Reveal>
          <Eyebrow>Related Services</Eyebrow>
        </Reveal>
        <Reveal delay={60}>
          <h2 id="related-heading" className="t-h2 mt-5 text-charcoal">
            Often needed alongside this
          </h2>
        </Reveal>

        <ul className="mt-11 grid gap-px border border-charcoal/12 bg-charcoal/12 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70} className="bg-bone">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-sand/70"
              >
                <h3 className="t-h4 text-charcoal uppercase transition-colors group-hover:text-forest">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">
                  {service.cardSummary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.14em] text-forest uppercase">
                  Learn more
                  <ArrowRight className="arrow-shift size-3.5" aria-hidden="true" strokeWidth={2.6} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
