"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Phone, X } from "lucide-react";

import { business, cta } from "@/data/business";
import { servicesNavGroups } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  // Collapse the services list again once the drawer is dismissed.
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] overflow-y-auto bg-charcoal text-bone transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      aria-hidden={!open}
    >
      <Container width="wide" className="flex min-h-full flex-col py-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-[0.7rem] font-bold tracking-[0.16em] text-gold uppercase">Navigation</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex size-11 items-center justify-center text-bone hover:text-gold">
            <X className="size-6" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mt-12">
          <ul className="divide-y divide-bone/12 border-y border-bone/12">
            {links.map((link) => {
              // Services has fourteen children, so on mobile it expands in
              // place instead of being a dead end at the hub page.
              if (link.href === "/services") {
                return (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      className="flex w-full items-center justify-between py-5 font-display text-[1.55rem] font-extrabold tracking-[-0.035em] text-bone transition-colors hover:text-gold"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "size-6 shrink-0 text-gold transition-transform duration-200",
                          servicesOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                    </button>

                    <div id="mobile-services" hidden={!servicesOpen} className="pb-6">
                      <Link
                        href="/services"
                        onClick={onClose}
                        className="mb-5 inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase"
                      >
                        View all services
                        <ArrowRight className="size-3.5" aria-hidden="true" strokeWidth={2.4} />
                      </Link>

                      {servicesNavGroups.map(({ group, items }) => (
                        <div key={group.id} className="mt-5 first:mt-0">
                          <p className="font-display text-[0.68rem] font-extrabold tracking-[0.14em] text-bone/45 uppercase">
                            {group.name}
                          </p>
                          <ul className="mt-1">
                            {items.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={onClose}
                                  className="flex min-h-[44px] items-center font-display text-[1.02rem] font-bold tracking-[-0.01em] text-bone/85 transition-colors hover:text-gold"
                                >
                                  {service.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose} className="flex items-center justify-between py-5 font-display text-[1.55rem] font-extrabold tracking-[-0.035em] text-bone transition-colors hover:text-gold">
                    {link.label}
                    <ArrowRight className="size-5 text-gold" aria-hidden="true" strokeWidth={2} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-bone/12 pt-7">
          <p className="text-[0.82rem] text-bone/55">Need help now?</p>
          <a href={`tel:${business.phoneHref}`} data-cta="phone" data-location="mobile_menu" className="mt-3 flex items-center gap-3 font-display text-[1.25rem] font-extrabold text-bone hover:text-gold">
            <Phone className="size-5 text-gold" aria-hidden="true" strokeWidth={2.3} />
            {business.phone}
          </a>
          <Link href="/contact" onClick={onClose} className="mt-6 inline-flex min-h-[48px] items-center gap-3 bg-gold px-5 py-3 font-display text-[0.72rem] font-extrabold tracking-[0.1em] text-charcoal uppercase hover:bg-gold-bright">
            {cta.estimate}
            <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.3} />
          </Link>
        </div>
      </Container>
    </div>
  );
}
