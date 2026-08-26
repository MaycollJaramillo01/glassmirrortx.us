import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page Not Found | Martinez Orlyn Glass & Mirror",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[78dvh] items-center overflow-hidden bg-charcoal pb-20 pt-32 text-bone sm:pt-40">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-glass-grid pointer-events-none absolute inset-y-0 right-0 w-1/2" />
      <Container width="wide" className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow-line text-gold">404 · page not found</p>
          <h1 className="home-display mt-7 text-bone">This opening does not fit the site.</h1>
          <p className="mt-6 max-w-[38rem] text-[1.02rem] leading-relaxed text-bone/68">
            The page may have moved or the address may be incomplete. Start from our services, or tell us what glass and mirror work you need.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/" className="inline-flex min-h-[44px] items-center gap-2 font-display text-[0.76rem] font-bold tracking-[0.12em] text-bone uppercase transition-colors hover:text-gold">
              <ArrowLeft className="size-4" aria-hidden="true" /> Back home
            </Link>
            <Link href="/services" className="inline-flex min-h-[44px] items-center gap-2 bg-gold px-6 py-3 font-display text-[0.72rem] font-extrabold tracking-[0.12em] text-charcoal uppercase transition-colors hover:bg-gold-bright">
              View services <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className="hidden border-l border-bone/18 pl-8 font-display text-[clamp(5rem,12vw,10rem)] font-extrabold leading-none tracking-[-0.08em] text-bone/[0.08] lg:col-span-4 lg:col-start-9 lg:block">
          404
        </p>
      </Container>
    </section>
  );
}
