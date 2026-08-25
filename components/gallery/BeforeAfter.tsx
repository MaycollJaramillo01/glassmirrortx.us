import Image from "next/image";

import { beforeAfterItems } from "@/data/gallery";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import type { Photo } from "@/types";

/**
 * Before and after pairs from real jobs.
 *
 * Shown side by side rather than behind a drag slider: these are handheld job
 * photographs, so the two frames are the same property from a different angle
 * and distance. A slider only reads correctly when both frames register, and
 * these do not.
 */
export function BeforeAfter() {
  if (beforeAfterItems.length === 0) return null;

  return (
    <Section className="bg-bone" aria-labelledby="before-after-heading">
      <Container>
        <div className="max-w-[46rem]">
          <Reveal>
            <Eyebrow>Before &amp; after</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="before-after-heading" className="home-h2 mt-6 text-charcoal">
              The same opening, twice.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
              Every pair below is one project, photographed before the install and again when the
              work was finished.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-20">
          {beforeAfterItems.map((item, index) => (
            <Reveal
              as="article"
              key={item.id}
              delay={index * 60}
              className="grid gap-8 border-t border-charcoal/15 pt-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-3">
                <p className="font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-forest uppercase tabular-nums">
                  {String(index + 1).padStart(2, "0")} · {item.category}
                </p>
                <h3 className="mt-4 font-display text-[1.35rem] leading-tight font-extrabold tracking-[-0.03em] text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">{item.caption}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
                <Frame photo={item.before} label="Before" tone="before" />
                <Frame photo={item.after} label="After" tone="after" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Frame({
  photo,
  label,
  tone,
}: {
  photo: Photo;
  label: string;
  tone: "before" | "after";
}) {
  return (
    <figure className="group relative aspect-[4/3] overflow-hidden bg-sand">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 38vw"
        className="img-zoom object-cover"
      />
      <figcaption
        className={
          tone === "after"
            ? "absolute top-0 left-0 bg-forest px-3.5 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-bone uppercase"
            : "absolute top-0 left-0 bg-charcoal px-3.5 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-bone/80 uppercase"
        }
      >
        {label}
      </figcaption>
    </figure>
  );
}
