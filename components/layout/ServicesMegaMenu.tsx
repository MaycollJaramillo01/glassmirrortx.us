"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { servicesNavGroups } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

const rail = [
  { label: "View all services", href: "/services" },
  { label: "Our gallery", href: "/gallery" },
  { label: "Book a free estimate", href: "/contact" },
] as const;

/**
 * Services dropdown. There are fourteen services across two families, which is
 * too many for a single column, so the panel is a full-width grid.
 *
 * Opens on hover and on focus, closes on Escape, on outside click and when the
 * pointer leaves — so it works with a mouse, a keyboard and a screen reader
 * rather than only the first of those.
 */
export function ServicesMegaMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * The trigger sits in the 72px nav row and the panel starts below the whole
   * header, so the pointer crosses header space that belongs to neither on the
   * way down. Closing immediately on mouseleave made the menu impossible to
   * reach — this holds it open across that gap.
   */
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="static"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href="/services"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-colors",
          active || open ? "text-gold" : "text-bone/72 hover:text-bone",
        )}
      >
        Services
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
          strokeWidth={2.4}
        />
      </Link>

      <div
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-bone/10 bg-charcoal/98 text-bone shadow-[0_24px_48px_rgba(8,12,9,0.45)] backdrop-blur-md"
      >
        <Container
          width="wide"
          className="grid max-h-[calc(100dvh-var(--header-h,120px))] gap-10 overflow-y-auto py-9 lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-9">
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-bone/45 uppercase">
              Solutions &amp; services
            </p>

            {/* Names only. With summaries the panel ran past the fold and the
                last services could not be reached. */}
            <div className="mt-6 grid gap-x-12 gap-y-8 border-t border-bone/10 pt-7 md:grid-cols-2">
              {servicesNavGroups.map(({ group, items }) => (
                <div key={group.id}>
                  <p className="font-display text-[0.72rem] font-extrabold tracking-[0.14em] text-gold uppercase">
                    {group.name}
                  </p>
                  <ul className="mt-3.5">
                    {items.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-3 py-[7px] font-display text-[0.92rem] font-bold tracking-[-0.01em] text-bone/85 transition-colors hover:text-gold"
                        >
                          <span
                            aria-hidden="true"
                            className="h-px w-0 bg-gold transition-all duration-200 group-hover:w-4"
                          />
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <ul className="space-y-1 lg:border-l lg:border-bone/10 lg:pl-10">
              {rail.map(({ label, href }) => (
                <li key={href} className="border-b border-bone/10 last:border-b-0">
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between gap-4 py-4 font-display text-[0.95rem] font-bold tracking-[-0.01em] text-bone transition-colors hover:text-gold"
                  >
                    {label}
                    <ArrowRight className="arrow-shift size-4 shrink-0" aria-hidden="true" strokeWidth={2.2} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </div>
  );
}
