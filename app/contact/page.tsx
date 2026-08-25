import type { Metadata } from "next";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { business, cta } from "@/data/business";
import { photos } from "@/data/photos";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { EstimateForm } from "@/components/contact/EstimateForm";

const title = "Get an Appointment | Martinez Orlyn Glass & Mirror";
const description = `Schedule glass and mirror work with Martinez Orlyn Glass & Mirror in Houston, TX and nearby communities. Call ${business.phone}.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/contact" });

const trail = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start with the actual job"
        title="Tell us what glass work you need."
        lead="Give us the useful details. We will look at the opening, explain the work and help you schedule an appointment."
        trail={trail}
        image={photos.mirrorInstall}
      >
        <div className="mt-11 flex flex-col gap-5 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:gap-10">
          <a
            href={`tel:${business.phoneHref}`}
            data-cta="phone"
            data-location="contact_hero"
            className="inline-flex min-h-[44px] items-center gap-3 font-display text-[1.35rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold"
          >
            <Phone className="size-5 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.4} />
            {business.phone}
          </a>
          <a
            href={`mailto:${business.email}`}
            data-cta="email"
            data-location="contact_hero"
            className="inline-flex min-h-[44px] items-center gap-3 text-[0.92rem] break-all text-bone/70 transition-colors hover:text-gold"
          >
            <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2} />
            {business.email}
          </a>
        </div>
      </PageHero>

      <section className="bg-sand py-16 sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow-line text-forest">{cta.estimate}</p>
            <h2 className="home-h2 mt-6 text-charcoal">A few details is enough to start.</h2>
            <div className="mt-8 space-y-5 border-t border-charcoal/15 pt-6 text-[0.92rem] leading-relaxed text-muted">
              <p>Tell us where the property is, what glass or mirror work you need and what surrounds the opening.</p>
              <p>Prefer to talk through it? Call {business.phone} and we will help you schedule.</p>
              <div className="flex items-start gap-3 text-charcoal"><ArrowRight className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={2.4} /> Serving Houston and nearby communities.</div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EstimateForm />
          </div>
        </Container>
      </section>
    </>
  );
}
