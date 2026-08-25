"use client";

import { useState } from "react";
import Image from "next/image";

import { serviceMedia } from "@/data/service-media";
import { serviceGroups, services } from "@/data/services";
import { cn } from "@/lib/utils/cn";

/**
 * Job gallery, built from the imported photographs rather than a hand-written
 * list — every file under assets/img/services appears here automatically once
 * scripts/import-service-media.ps1 has been run.
 *
 * Filters are the services that actually have photographs, so a service with an
 * empty folder never produces an empty tab.
 *
 * Laid out in CSS columns: the photographs mix portrait and landscape, and a
 * fixed-ratio grid would crop half of them to the wrong shape.
 */

const serviceName = new Map(services.map((s) => [s.slug, s.name]));
const groupName = new Map<string, string>(serviceGroups.map((g) => [g.id, g.name]));

/** Only the folders that produced photographs, in service order. */
const filters = services
  .filter((s) => serviceMedia.some((m) => m.service === s.slug))
  .map((s) => ({ slug: s.slug, name: s.name, count: serviceMedia.filter((m) => m.service === s.slug).length }));

export function GalleryGrid() {
  const [active, setActive] = useState<string>("all");

  const visible = active === "all" ? serviceMedia : serviceMedia.filter((m) => m.service === active);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by service">
        <FilterButton
          label="All work"
          count={serviceMedia.length}
          selected={active === "all"}
          onSelect={() => setActive("all")}
        />
        {filters.map((f) => (
          <FilterButton
            key={f.slug}
            label={f.name}
            count={f.count}
            selected={active === f.slug}
            onSelect={() => setActive(f.slug)}
          />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {serviceMedia.length} photographs.
      </p>

      <div className="mt-10 gap-5 sm:columns-2 lg:columns-3">
        {visible.map((item) => (
          <figure key={item.src} className="group mb-5 break-inside-avoid">
            <div className="relative overflow-hidden bg-sand">
              <Image
                src={item.src}
                alt={`${groupName.get(item.group) ?? "Job"} photograph from Martinez Orlyn Glass & Mirror in the Houston, Texas area`}
                width={item.width}
                height={item.height}
                loading="lazy"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="img-zoom h-auto w-full"
              />
            </div>
            <figcaption className="mt-2.5 font-display text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">
              {serviceName.get(item.service) ?? item.service}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

function FilterButton({
  label,
  count,
  selected,
  onSelect,
}: {
  label: string;
  count: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 border px-4 py-2 font-display text-[0.7rem] font-bold tracking-[0.1em] uppercase transition-colors",
        selected
          ? "border-charcoal bg-charcoal text-bone"
          : "border-charcoal/20 text-charcoal hover:border-charcoal/50",
      )}
    >
      {label}
      <span className={cn("text-[0.66rem] tabular-nums", selected ? "text-gold" : "text-muted")}>
        {count}
      </span>
    </button>
  );
}
