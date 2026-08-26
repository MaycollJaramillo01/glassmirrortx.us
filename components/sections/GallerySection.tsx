import Image from "next/image";
import { galleryItems } from "@/data/gallery";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils/cn";

/**
 * Bento of real company job photos — not stock. Full set lives on /gallery.
 */
const picks = [
  { photo: galleryItems[0]!, span: "md:col-span-3 md:row-span-2" },
  { photo: galleryItems[2]!, span: "md:col-span-5" },
  { photo: galleryItems[5]!, span: "md:col-span-4" },
  { photo: galleryItems[3]!, span: "md:col-span-4" },
  { photo: galleryItems[9]!, span: "md:col-span-5" },
] as const;

export function GallerySection() {
  return (
    <Section className="bg-sand/60" aria-labelledby="gallery-heading">
      <Container>
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Recent Work</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="gallery-heading" className="t-h2 mt-6 text-charcoal">
                Real jobs, real properties
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="t-lead measure mt-5 text-muted">
                Photographs from glass and mirror projects around Houston and the surrounding
                communities.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160} className="shrink-0">
            <Button href="/gallery" variant="outline" withArrow>
              View Our Work
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-8 lg:mt-16 lg:auto-rows-[17rem]">
          {picks.map((item, i) => (
            <Reveal
              key={item.photo.src}
              kind="scale"
              delay={i * 80}
              className={cn("group relative overflow-hidden bg-charcoal", item.span)}
            >
              <Image
                src={item.photo.src}
                alt={item.photo.alt}
                fill
                quality={74}
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, 42vw"
                className="img-zoom object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p className="absolute inset-x-0 bottom-0 p-5 text-[0.82rem] leading-snug font-medium text-bone">
                {item.photo.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
