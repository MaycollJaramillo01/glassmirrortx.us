import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/data/business";
import { footerAreaSlugs, footerServiceSlugs } from "@/data/navigation";
import { getService } from "@/data/services";
import { getServiceArea } from "@/data/service-areas";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();

  // Only the profiles that are actually configured get an icon.
  const social = business.social as Partial<Record<"facebook" | "tiktok" | "youtube", string>>;
  const socials = [
    { name: "Facebook", href: social.facebook, icon: FacebookIcon },
    { name: "TikTok", href: social.tiktok, icon: TikTokIcon },
    { name: "YouTube", href: social.youtube, icon: YouTubeIcon },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="relative overflow-hidden bg-charcoal text-bone">
      {/* Soft glass-facet motif — pane lattice, not an illustration. */}
      <div
        aria-hidden="true"
        className="glass-facet pointer-events-none absolute -top-24 -right-20 size-[30rem] text-bone/[0.04]"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-4 lg:gap-10">
          {/* Company */}
          <div>
            <Logo tone="light" />
            <p className="measure mt-6 text-[0.95rem] leading-relaxed text-bone/65">
              Custom shower enclosures, mirrors, windows and glass repair for residential and
              commercial customers across Houston, Texas and surrounding communities.
            </p>

            <ul className="mt-7 space-y-2.5 text-[0.9rem]">
              <li className="flex items-center gap-2.5 text-bone/70">
                <MapPin className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {business.googleMaps ? (
                  <a
                    href={business.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {business.addressLine}
                  </a>
                ) : (
                  business.addressLine
                )}
              </li>
              <li className="flex items-center gap-2.5 text-bone/70">
                <Clock className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {business.hoursLabel}
              </li>
              <li className="flex items-center gap-2.5 text-bone/70">
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${business.phoneHref}`} className="transition-colors hover:text-gold">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-bone/70">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-gold">
                  {business.email}
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <div className="mt-7">
                <p className="text-[0.72rem] font-bold tracking-[0.14em] text-bone/45 uppercase">
                  Follow the work
                </p>
                <ul className="mt-3.5 flex gap-2.5">
                  {socials.map(({ name, href, icon: Icon }) => (
                    <li key={name}>
                      <a
                        href={href}
                        aria-label={`${business.name} on ${name}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
                      >
                        <Icon className="size-[1.15rem]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Company links */}
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="t-eyebrow mb-5 text-gold">
              Company
            </h2>
            <ul className="space-y-2.5 text-[0.92rem]">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/service-areas">Service Areas</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="t-eyebrow mb-5 text-gold">
              Services
            </h2>
            <ul className="space-y-2.5 text-[0.92rem]">
              {footerServiceSlugs.map((slug) => {
                const service = getService(slug);
                if (!service) return null;
                return (
                  <FooterLink key={slug} href={`/services/${slug}`}>
                    {service.name}
                  </FooterLink>
                );
              })}
            </ul>
          </nav>

          {/* Areas + contact */}
          <div>
            <h2 className="t-eyebrow mb-5 text-gold">Service Areas</h2>
            <ul className="mb-8 grid w-fit grid-cols-2 gap-x-8 gap-y-2.5 text-[0.92rem]">
              {footerAreaSlugs.map((slug) => {
                const area = getServiceArea(slug);
                if (!area) return null;
                return (
                  <FooterLink key={slug} href={`/service-areas/${slug}`}>
                    {area.city}
                  </FooterLink>
                );
              })}
            </ul>

            <h2 className="t-eyebrow mb-4 text-gold">Contact</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${business.phoneHref}`}
                  data-cta="phone"
                  data-location="footer"
                  className="inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-bone transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.5} />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  data-cta="email"
                  data-location="footer"
                  className="inline-flex items-start gap-2.5 text-[0.88rem] break-all text-bone/70 transition-colors hover:text-bone"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  {business.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-charcoal-line py-7 text-[0.8rem] text-bone/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.legalName}. All Rights Reserved.
          </p>
          <p>
            Serving Houston, TX and surrounding communities — {business.radiusLabel}.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-underline text-bone/70 transition-colors hover:text-bone">
        {children}
      </Link>
    </li>
  );
}
