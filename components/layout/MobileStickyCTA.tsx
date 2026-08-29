"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, Phone, PencilRuler } from "lucide-react";
import { business, cta } from "@/data/business";

/**
 * Mobile conversion bar.
 *
 * Three equal actions: call, appointment, services.
 * Respects the iPhone home-indicator inset.
 */
export function MobileStickyCTA() {
  const pathname = usePathname();

  // The contact page is the form itself; a bar pointing at it is noise.
  if (pathname === "/contact") return null;

  return (
    <nav
      aria-label="Quick actions"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal-line bg-charcoal/97 backdrop-blur-md lg:hidden"
    >
      <a
        href={`tel:${business.phoneHref}`}
        data-cta="phone"
        data-location="sticky_bar"
        className="flex min-h-[58px] flex-col items-center justify-center gap-1 border-r border-charcoal-line text-bone transition-colors active:bg-charcoal-soft"
      >
        <Phone className="size-[18px] text-gold" aria-hidden="true" strokeWidth={2.4} />
        <span className="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase">
          Call
        </span>
      </a>

      <a
        href="/contact"
        data-cta="estimate"
        data-location="sticky_bar"
        className="flex min-h-[58px] flex-col items-center justify-center gap-1 bg-gold text-charcoal transition-colors active:bg-gold-bright"
      >
        <PencilRuler className="size-[18px]" aria-hidden="true" strokeWidth={2.4} />
        <span className="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase">
          {cta.estimateShort}
        </span>
      </a>

      <a
        href="/services"
        className="flex min-h-[58px] flex-col items-center justify-center gap-1 border-l border-charcoal-line text-bone transition-colors active:bg-charcoal-soft"
      >
        <LayoutGrid className="size-[18px] text-gold" aria-hidden="true" strokeWidth={2.4} />
        <span className="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase">
          Services
        </span>
      </a>
    </nav>
  );
}
