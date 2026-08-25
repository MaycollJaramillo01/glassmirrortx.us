import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/types";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/utils/cn";

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  trail: Crumb[];
  image?: Photo;
  children?: ReactNode;
  className?: string;
}

/**
 * Shared hero for the secondary pages. Every page on the site opens on a dark
 * band, which is what lets the fixed header sit transparent over the top of it
 * without a per-page exception.
 */
export function PageHero({ eyebrow, title, lead, trail, image, children, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-charcoal", className)}>
      {image ? (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={78}
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="-z-10 absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(23,28,25,0.96) 0%, rgba(23,28,25,0.88) 45%, rgba(23,28,25,0.60) 100%)",
            }}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="rings pointer-events-none absolute -top-52 -right-32 size-[44rem] text-bone/[0.05]"
        />
      )}

      <Container width="wide" className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <Breadcrumbs trail={trail} tone="light" className="mb-9" />

        <p className="t-eyebrow flex items-center gap-3 text-gold">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {eyebrow}
        </p>

        <h1 className="t-h1 mt-6 max-w-4xl text-bone">{title}</h1>

        {lead && (
          <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-bone/80 sm:text-[1.0625rem]">
            {lead}
          </p>
        )}

        {children}
      </Container>
    </section>
  );
}
