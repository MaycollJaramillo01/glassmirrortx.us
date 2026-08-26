"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Menu, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { business, cta } from "@/data/business";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-bone/10 bg-charcoal/94 text-bone backdrop-blur-md">
        {/* Utility bar. Desktop only — on phones this information is already
            one tap away in the header and the sticky call bar. */}
        <div className="hidden border-b border-bone/10 lg:block">
          <Container width="wide">
            <div className="flex h-[46px] items-center justify-between gap-6">
              <ul className="flex min-w-0 items-center gap-6 xl:gap-8">
                <UtilityItem icon={Mail} label="Email">
                  <a
                    href={`mailto:${business.email}`}
                    data-cta="email"
                    data-location="header_bar"
                    className="link-underline transition-colors hover:text-gold"
                  >
                    {business.email}
                  </a>
                </UtilityItem>

                <UtilityItem icon={Clock} label="Hours">
                  {business.hoursLabelShort}
                </UtilityItem>

                <UtilityItem icon={Phone} label="Call us">
                  <a
                    href={`tel:${business.phoneHref}`}
                    data-cta="phone"
                    data-location="header_bar"
                    className="link-underline whitespace-nowrap transition-colors hover:text-gold"
                  >
                    {business.phone}
                  </a>
                </UtilityItem>
              </ul>

              <a
                href={business.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-[16rem] shrink-0 items-center gap-2 bg-forest px-3 py-1.5 font-display text-[0.68rem] font-bold tracking-[0.04em] text-bone transition-colors hover:bg-forest-soft xl:max-w-none xl:px-4 xl:text-[0.72rem] xl:tracking-[0.06em]"
              >
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" strokeWidth={2.4} />
                <span className="truncate">{business.streetAddress}, {business.city}, {business.stateCode} {business.zip}</span>
              </a>
            </div>
          </Container>
        </div>

        <Container width="wide">
          <div className="flex h-[72px] items-center justify-between gap-6">
            <Logo tone="light" />

            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {links.map((link) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                  // Services has many entries, so it gets the mega menu.
                  if (link.href === "/services") {
                    return (
                      <li key={link.href}>
                        <ServicesMegaMenu active={active} />
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "font-display text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-colors",
                          active ? "text-gold" : "text-bone/72 hover:text-bone",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-5 lg:flex">
              <a
                href={`tel:${business.phoneHref}`}
                data-cta="phone"
                data-location="header"
                className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-bone/80 transition-colors hover:text-gold"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" strokeWidth={2.4} />
                {business.phone}
              </a>
              <Link
                href="/contact"
                data-cta="estimate"
                data-location="header"
                className="inline-flex min-h-[42px] items-center bg-gold px-5 py-3 font-display text-[0.7rem] font-extrabold tracking-[0.1em] text-charcoal uppercase transition-colors hover:bg-gold-bright active:bg-gold-deep"
              >
                {cta.estimateShort}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${business.phoneHref}`}
                data-cta="phone"
                data-location="header_mobile"
                aria-label={`Call ${business.phone}`}
                className="flex size-11 items-center justify-center text-gold transition-colors hover:text-bone"
              >
                <Phone className="size-[21px]" aria-hidden="true" strokeWidth={2.4} />
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="flex size-11 items-center justify-center text-bone transition-colors hover:text-gold"
              >
                <Menu className="size-6" aria-hidden="true" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/** One labelled entry in the utility bar. Each gets the icon that matches it. */
function UtilityItem({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-bone"
      >
        <Icon className="size-4" strokeWidth={2.2} />
      </span>
      <span className="leading-tight">
        <span className="block text-[0.72rem] text-bone/55">{label}</span>
        <span className="block text-[0.82rem] font-semibold text-bone/90">{children}</span>
      </span>
    </li>
  );
}
