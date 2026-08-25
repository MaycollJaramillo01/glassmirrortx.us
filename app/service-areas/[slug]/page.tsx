import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { business, cta } from "@/data/business";
import { photos } from "@/data/photos";
import { getServiceArea, serviceAreaSlugs } from "@/data/service-areas";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return serviceAreaSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};
  return buildMetadata({ title: area.seoTitle, description: area.metaDescription, path: `/service-areas/${area.slug}` });
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-charcoal pb-20 pt-32 text-bone sm:pb-28 sm:pt-40">
        <div className="absolute inset-0 lg:left-[50%]">
          <Image src={photos.heroGlass.src} alt={photos.heroGlass.alt} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover opacity-65" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-transparent" />
        </div>
        <Container width="wide" className="relative z-10">
          <Link href="/service-areas" className="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.12em] text-bone/60 uppercase hover:text-gold"><ArrowRight className="size-4 rotate-180" aria-hidden="true" strokeWidth={2.3} /> All service areas</Link>
          <div className="mt-10 max-w-[43rem]">
            <p className="eyebrow-line text-gold">{area.eyebrow}</p>
            <h1 className="home-h2 mt-7 text-bone">{area.h1}</h1>
            <p className="mt-6 text-[1.05rem] leading-relaxed text-bone/72">{area.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary" withArrow data-cta="estimate" data-location="service_area_hero">{cta.estimate}</Button>
              <a href={`tel:${business.phoneHref}`} data-cta="phone" data-location="service_area_hero" className="inline-flex min-h-[44px] items-center gap-2 px-1 font-display text-[0.9rem] font-bold text-bone hover:text-gold"><Phone className="size-4 text-gold" aria-hidden="true" strokeWidth={2.4} /> {business.phone}</a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bone py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow-line text-forest">{area.context.heading}</p>
            <h2 className="home-h2 mt-6 text-charcoal">The local conditions change the job.</h2>
          </div>
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {area.context.paragraphs.map((paragraph) => <p key={paragraph} className="text-[1rem] leading-relaxed text-muted">{paragraph}</p>)}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <p className="eyebrow-line text-forest">Common calls in {area.city}</p>
          <div className="mt-8 grid gap-0 border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
            {area.featuredServices.map((item) => <div key={item.slug} className="border-b border-charcoal/15 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"><h3 className="font-display text-[1.1rem] font-extrabold tracking-tight text-charcoal">{item.slug.replaceAll("-", " ")}</h3><p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{item.note}</p></div>)}
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3 text-[0.92rem] text-charcoal"><Plus className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={3} /> Appointments by request</li>
            <li className="flex items-start gap-3 text-[0.92rem] text-charcoal"><Plus className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" strokeWidth={3} /> Licensed &amp; insured</li>
          </ul>
        </Container>
      </section>

      <section className="bg-gold py-16 sm:py-20">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="font-display text-2xl font-extrabold tracking-tight text-charcoal">Need glass or mirror work in {area.city}?</p><p className="mt-2 text-[0.94rem] text-charcoal/70">Tell us what you need and we will help you schedule the job.</p></div><Button href="/contact" variant="secondary" withArrow data-cta="estimate" data-location="service_area_cta">{cta.estimate}</Button></Container>
      </section>
    </>
  );
}
