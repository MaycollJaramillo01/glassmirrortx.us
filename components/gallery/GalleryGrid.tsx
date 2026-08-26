"use client";

import { useState } from "react";
import Image from "next/image";

import { galleryCategories, galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils/cn";

/**
 * Company job gallery. Filters use the categories on each gallery item —
 * real Martinez Orlyn photographs, not stock.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<string>("All");

  const counts = Object.fromEntries(
    galleryCategories.map((category) => [
      category,
      category === "All"
        ? galleryItems.length
        : galleryItems.filter((item) => item.category === category).length,
    ]),
  ) as Record<(typeof galleryCategories)[number], number>;

  const visible =
    active === "All" ? galleryItems : galleryItems.filter((item) => item.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        {galleryCategories.map((category) => (
          <FilterButton
            key={category}
            label={category === "All" ? "All work" : category}
            count={counts[category]}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-muted">No photographs in this category yet.</p>
      ) : (
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((photo) => (
            <li key={photo.src} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden bg-charcoal/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/85 to-transparent px-4 pt-10 pb-4">
                  <p className="font-display text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase">
                    {photo.category}
                  </p>
                  <p className="mt-1 text-[0.9rem] font-semibold text-bone">{photo.caption}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  if (count === 0 && label !== "All work") return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[40px] items-center gap-2 border px-4 py-2 font-display text-[0.7rem] font-bold tracking-[0.1em] uppercase transition-colors",
        active
          ? "border-forest bg-forest text-bone"
          : "border-charcoal/15 bg-white text-charcoal hover:border-forest hover:text-forest",
      )}
    >
      {label}
      <span className={cn("tabular-nums", active ? "text-bone/70" : "text-muted")}>{count}</span>
    </button>
  );
}
