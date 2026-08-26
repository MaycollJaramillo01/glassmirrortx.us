import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Phone,
  Plus,
  ShieldCheck,
  Target,
} from "lucide-react";

import { business, cta, principles } from "@/data/business";
import { galleryItems } from "@/data/gallery";
import { photos } from "@/data/photos";
import { additionalCommunities, getServiceArea, primaryAreaSlugs } from "@/data/service-areas";
import { getService } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ServiceAreaMap } from "@/components/maps/ServiceAreaMap";
import { HeroBackgroundVideo } from "@/components/sections/HeroBackgroundVideo";

const serviceHighlights = [
  {
    slug: "custom-shower-enclosures",
    image: photos.showerEnclosure,
    eyebrow: "Shower enclosures",
    title: "Glass that fits the opening",
    copy: "Custom shower enclosures and doors measured to the stall, finished clean, and installed for everyday use.",
    className: "md:col-span-7 md:row-span-2",
    imageClassName: "aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1",
  },
  {
    slug: "custom-mirrors",
    image: photos.mirrorInstall,
    eyebrow: "Mirrors & walls",
    title: "Mirrors that open the room",
    copy: "Custom mirrors and mirrored walls sized for vanities, entries, gyms and commercial interiors.",
    className: "md:col-span-5",
    imageClassName: "aspect-[16/10]",
  },
  {
    slug: "windows-and-doors",
    image: photos.windowGlass,
    eyebrow: "Windows & glass",
    title: "Windows, doors and repair",
    copy: "Window glass, double-pane work, solar screens and reglazing when a pane fails or a frame needs fresh glass.",
    className: "md:col-span-5",
    imageClassName: "aspect-[16/10]",
  },
] as const;

export const homePageFaqs = [
  {
    question: "How do I get a price?",
    answer:
      "Call or use the appointment form. We look at the opening, glass type and access on site, then price the actual job. Appointments are easy to schedule.",
  },
  {
    question: "Do you fabricate custom shower enclosures?",
    answer:
      "Yes. Shower enclosures and doors are measured to the stall, fabricated to fit, and installed with hardware matched to the opening.",
  },
  {
    question: "Can you replace a broken window pane?",
    answer:
      `Call ${business.phone}. We handle glass installation, repair and reglazing for homes and businesses across Houston and nearby cities.`,
  },
  {
    question: "Do you serve outside Houston?",
    answer:
      "Yes. Martinez Orlyn Glass & Mirror works across Katy, Sugar Land, Cypress, Spring, Tomball, Humble, Conroe, Alvin, League City and nearby communities.",
  },
] as const;

/** Copy lives in data/business.ts; the icon is presentation and stays here. */
const principleIcons = { mission: Target, vision: Compass } as const;

const workflow = [
  ["01", "We measure", "We look at the opening, access, glass type and how the finished piece has to sit."],
  ["02", "We set the plan", "You get a clear scope, a price and a schedule before fabrication or install starts."],
  ["03", "We do the work", "Glass is cut, tempered or sourced as needed, then installed with care for the surrounding finishes."],
  ["04", "We leave it clean", "Hardware is checked, the area is cleaned, and the space is ready to use."],
] as const;

export function RedesignedHome() {
  const featuredServices = serviceHighlights.map((item) => ({
    ...item,
    service: getService(item.slug),
  }));

  return (
    <div className="home-redesign">
      <section className="relative isolate min-h-[min(760px,88dvh)] overflow-hidden bg-charcoal text-bone">
        <Image
          src={photos.showerEnclosure.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
          aria-hidden="true"
        />
        <HeroBackgroundVideo />
        <div aria-hidden="true" className="absolute inset-0 bg-charcoal/40" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,17,0.98)_0%,rgba(5,12,17,0.91)_42%,rgba(5,12,17,0.35)_76%,rgba(5,12,17,0.58)_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(20,196,196,0.18),transparent_28%)]" />
        <div aria-hidden="true" className="hero-glass-grid pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] lg:block" />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <Container
          width="wide"
          className="relative z-10 grid min-h-[min(760px,88dvh)] items-end gap-12 pb-12 pt-28 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-18"
        >
          <div className="max-w-[42rem] lg:col-span-7">
            <Reveal kind="right">
              <p className="eyebrow-line text-gold">Martinez Orlyn · Houston, Texas</p>
            </Reveal>
            <Reveal kind="up" delay={80}>
              <h1 className="hero-hook mt-7 text-bone">
                Houston glass, mirrors &amp; showers.{" "}
                <span className="text-gold">Measured to fit.</span>
              </h1>
            </Reveal>
            <Reveal kind="up" delay={150}>
              <p className="mt-6 max-w-[38rem] text-[1rem] leading-relaxed text-bone/78 sm:text-[1.08rem]">
                Custom shower enclosures, mirrors, window glass and repair for Houston-area homes and commercial spaces—planned around the opening, finish and everyday use.
              </p>
            </Reveal>
            <Reveal kind="up" delay={230}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  withArrow
                  data-cta="estimate"
                  data-location="home_hero"
                >
                  {cta.estimate}
                </Button>
                <a
                  href={`tel:${business.phoneHref}`}
                  data-cta="phone"
                  data-location="home_hero"
                  className="inline-flex min-h-[44px] items-center gap-2 px-3 font-display text-[0.9rem] font-bold tracking-[0.08em] text-bone transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" aria-hidden="true" strokeWidth={2.5} />
                  {business.phone}
                </a>
              </div>
            </Reveal>

            <Reveal kind="up" delay={300}>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-bone/18 pt-5 text-[0.78rem] font-semibold tracking-[0.04em] text-bone/72">
                <li>Licensed &amp; insured</li>
                <li>Family-owned</li>
                <li>Residential + commercial</li>
              </ul>
            </Reveal>
          </div>

          <Reveal kind="left" delay={180} className="hero-glass-panel hidden p-7 lg:col-span-4 lg:col-start-9 lg:block xl:p-9">
            <p className="font-display text-[0.68rem] font-bold tracking-[0.16em] text-gold uppercase">From measure to install</p>
            <p className="mt-5 max-w-[16ch] font-display text-[1.7rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-bone">
              The opening leads. The glass follows.
            </p>
            <ol className="mt-8 border-t border-bone/20">
              {[
                ["01", "Site measure", "Opening, access and finish"],
                ["02", "Clear scope", "Glass, hardware and schedule"],
                ["03", "Clean install", "Fit checked before handoff"],
              ].map(([number, title, detail]) => (
                <li key={number} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-bone/14 py-4">
                  <span className="font-display text-[0.68rem] font-bold text-gold">{number}</span>
                  <span>
                    <strong className="block font-display text-[0.9rem] font-bold text-bone">{title}</strong>
                    <span className="mt-1 block text-[0.78rem] leading-relaxed text-bone/58">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section id="about" className="bg-bone py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal kind="scale" className="relative min-h-[23rem] overflow-hidden sm:min-h-[31rem] lg:col-span-6">
            <Image
              src={photos.aboutShop.src}
              alt={photos.aboutShop.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-forest px-5 py-4 text-bone sm:px-7 sm:py-5">
              <p className="font-display text-[1.8rem] font-extrabold tracking-[-0.04em]">{business.experience}</p>
              <p className="text-[0.7rem] font-bold tracking-[0.14em] text-bone/70 uppercase">{business.experienceLabel}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow-line text-forest">About {business.name}</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="home-h2 mt-6 max-w-[18rem] text-charcoal">Local shop. Clear work.</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">
                {business.name} is a Houston glass and mirror company for custom showers, mirrors, windows and glass repair. We measure the opening, match the glass to the use, and leave the space ready.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 grid gap-3 border-t border-charcoal/15 pt-6 text-[0.9rem] text-charcoal sm:grid-cols-2">
                <span className="inline-flex items-center gap-2"><Plus className="size-4 text-forest" aria-hidden="true" strokeWidth={3} /> Houston-based shop</span>
                <span className="inline-flex items-center gap-2"><Plus className="size-4 text-forest" aria-hidden="true" strokeWidth={3} /> Appointment scheduling</span>
                <span className="inline-flex items-center gap-2"><Plus className="size-4 text-forest" aria-hidden="true" strokeWidth={3} /> Residential + commercial</span>
                <span className="inline-flex items-center gap-2"><Plus className="size-4 text-forest" aria-hidden="true" strokeWidth={3} /> Licensed &amp; insured</span>
              </div>
            </Reveal>
            <Button href="/about" variant="outline" withArrow className="mt-9">Meet the company</Button>
          </div>
        </Container>
      </section>

      <section aria-label={`${business.name} at a glance`} className="border-b border-charcoal-line bg-charcoal text-bone">
        <Container width="wide" className="grid gap-0 md:grid-cols-4">
          <Proof value={business.experience} label="Hands-on experience" />
          <Proof value="Licensed" label={`License ${business.license}`} />
          <Proof value={`${business.radiusMiles} mi`} label="Houston coverage" />
          <div className="flex items-center border-forest-soft px-0 py-6 md:justify-end md:border-l md:px-8">
            <div className="flex items-center gap-3 text-[0.9rem] text-bone/75">
              <ShieldCheck className="size-5 text-gold" aria-hidden="true" strokeWidth={1.8} />
              <span>Licensed &amp; insured. By appointment.</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="glass-facet pointer-events-none absolute -top-64 -right-40 size-[48rem] text-bone/[0.045]"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow-line text-gold">Mission &amp; vision</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="home-h2 mt-6 max-w-[16ch] text-bone">
                  Why the work is <span className="text-gold">done this way.</span>
                </h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-7 max-w-[54ch] text-[1.05rem] leading-relaxed text-bone/72">
                  Most glass work does not fit a catalog size. The opening that matters is the one with tile on three sides, a threshold that is not square, and a finish the homeowner expects to keep. That is the work this shop is set up for.
                </p>
              </Reveal>
              <Reveal delay={190}>
                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    href="/contact"
                    variant="primary"
                    withArrow
                    data-cta="estimate"
                    data-location="home_mission_vision"
                  >
                    {cta.estimate}
                  </Button>
                  <a
                    href={`tel:${business.phoneHref}`}
                    data-cta="phone"
                    data-location="home_mission_vision"
                    className="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[1.02rem] font-bold tracking-tight text-bone transition-colors hover:text-gold"
                  >
                    <Phone className="size-4 text-gold" aria-hidden="true" strokeWidth={2.4} />
                    {business.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal
              kind="scale"
              delay={150}
              className="group relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:col-span-4 lg:col-start-9 lg:aspect-[4/5]"
            >
              <Image
                src={photos.showerEnclosureAlt.src}
                alt={photos.showerEnclosureAlt.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 34vw"
                className="img-zoom object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/5 to-transparent"
              />
              <p className="absolute right-5 bottom-5 left-5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-bone/85 uppercase">
                Custom shower · measured to the opening
              </p>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-14 gap-y-12 border-t border-charcoal-line pt-12 lg:mt-20 lg:grid-cols-2">
            {principles.map(({ id, label, statement, copy }, index) => {
              const Icon = principleIcons[id];
              return (
              <Reveal
                as="li"
                key={id}
                delay={index * 90}
                className="lg:border-l lg:border-charcoal-line lg:pl-14 lg:first:border-l-0 lg:first:pl-0"
              >
                <p className="flex items-center gap-3 font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-gold uppercase">
                  <Icon className="size-5 shrink-0" aria-hidden="true" strokeWidth={1.8} />
                  {label}
                </p>
                <h3 className="mt-5 max-w-[22ch] font-display text-[1.5rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-bone sm:text-[1.8rem]">
                  {statement}
                </h3>
                <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-bone/65">{copy}</p>
              </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      <section id="services" className="bg-white py-20 sm:py-28 lg:py-32">
        <Container>
          <Reveal>
            <p className="eyebrow-line text-forest">What we handle</p>
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <h2 className="home-h2 max-w-[42rem] text-charcoal">Services for the jobs that matter.</h2>
              <Link href="/services" className="link-arrow shrink-0 text-charcoal">
                See every service <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.4} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-[minmax(13rem,auto)_minmax(13rem,auto)]">
            {featuredServices.map(({ service, image, eyebrow, title, copy, className, imageClassName }, index) => (
              <Reveal key={eyebrow} delay={index * 90} className={className}>
                <Link href={`/services/${service?.slug ?? "services"}`} className="group flex h-full flex-col overflow-hidden bg-charcoal text-bone">
                  <div className={`relative overflow-hidden ${imageClassName}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={index === 0 ? "(max-width: 767px) 100vw, 58vw" : "(max-width: 767px) 100vw, 42vw"}
                      className="img-zoom object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
                  </div>
                  <div className="relative -mt-20 p-6 sm:p-8">
                    <p className="text-[0.7rem] font-bold tracking-[0.16em] text-gold uppercase">{eyebrow}</p>
                    <h3 className="mt-3 font-display text-[1.65rem] font-extrabold tracking-[-0.03em] text-bone sm:text-[2rem]">{title}</h3>
                    <p className="mt-3 max-w-[35rem] text-[0.94rem] leading-relaxed text-bone/72">{copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase">View service <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" strokeWidth={2.2} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-charcoal py-20 text-bone sm:py-28 lg:py-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative min-h-[24rem] overflow-hidden lg:col-span-7 lg:min-h-[34rem]">
            <Image
              src={photos.glassWork.src}
              alt={photos.glassWork.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
            <Reveal>
              <p className="eyebrow-line text-gold">{cta.emergency}</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="home-h2 mt-6 text-bone">Need glass work scheduled? Call us.</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 text-[1rem] leading-relaxed text-bone/72">
                Whether it is a shower, a mirror wall, a window pane or reglazing, we will help you set an appointment and explain what the job needs.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <div className="mt-9 flex flex-col items-start gap-5">
                <a href={`tel:${business.phoneHref}`} data-cta="phone" data-location="home_support" className="inline-flex items-center gap-3 font-display text-[1.45rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold">
                  <Phone className="size-5 text-gold" aria-hidden="true" strokeWidth={2.4} />
                  {business.phone}
                </a>
                <Button href="/contact" variant="onDark" withArrow data-cta="estimate" data-location="home_support">{cta.estimate}</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="how-we-work" className="bg-bone py-20 sm:py-24 lg:py-28">
        <Container>
          {/* Intro + steps share one top edge; the photo sits under both as a shared base. */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow-line text-forest">How we work</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="home-h2 mt-6 text-charcoal">A clear plan before the first cut.</h2>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-6 max-w-[28rem] text-[1rem] leading-relaxed text-muted">
                  Good glass work starts before fabrication. We measure the site, set the sequence and keep
                  the install part of a clean finish.
                </p>
              </Reveal>
            </div>
            <ol className="lg:col-span-7">
              {workflow.map(([number, title, body], index) => (
                <Reveal
                  as="li"
                  key={number}
                  delay={index * 70}
                  className="grid gap-4 border-t border-charcoal/15 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_minmax(0,10.5rem)_1fr] sm:gap-6 sm:py-7 sm:first:pt-0"
                >
                  <span className="font-display text-[0.72rem] font-bold tracking-[0.16em] text-gold">
                    {number}
                  </span>
                  <h3 className="font-display text-[1.1rem] font-extrabold tracking-tight text-charcoal">
                    {title}
                  </h3>
                  <p className="max-w-[34rem] text-[0.94rem] leading-relaxed text-muted">{body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal kind="scale" delay={180} className="relative mt-12 aspect-[21/9] min-h-[14rem] overflow-hidden sm:mt-14 lg:mt-16">
            <Image
              src={photos.mirrorInstall.src}
              alt={photos.mirrorInstall.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 1120px"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section id="selected-work" className="bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col gap-6 border-b border-charcoal-line pb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[42rem]">
              <Reveal>
                <p className="eyebrow-line text-gold">Selected work</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="home-h2 mt-6 text-bone">The work is in the details.</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link href="/gallery" className="link-arrow shrink-0 text-bone hover:text-gold">View the full gallery <ArrowRight className="size-4" aria-hidden="true" strokeWidth={2.4} /></Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <WorkPhoto
              photo={galleryItems[0]!}
              caption={galleryItems[0]!.caption}
              aspect="aspect-[3/4] sm:aspect-[16/10] lg:aspect-[3/4]"
              sizes="(max-width: 1023px) 100vw, 41vw"
              className="lg:col-span-5 lg:h-full"
            />

            <div className="grid gap-4 lg:col-span-7">
              <WorkPhoto
                photo={galleryItems[2]!}
                caption={galleryItems[2]!.caption}
                aspect="aspect-[16/10] lg:aspect-[16/9]"
                sizes="(max-width: 1023px) 100vw, 57vw"
                delay={70}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <WorkPhoto
                  photo={galleryItems[5]!}
                  caption={galleryItems[5]!.caption}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 28vw"
                  delay={140}
                />
                <WorkPhoto
                  photo={galleryItems[9]!}
                  caption={galleryItems[9]!.caption}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 28vw"
                  delay={210}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="where-we-work" className="bg-white py-20 sm:py-28 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow-line text-forest">Where we work</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="home-h2 mt-6 text-charcoal">Houston and surrounding cities.</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 max-w-[28rem] text-[1rem] leading-relaxed text-muted">Houston is home base. The marked cities show the normal service area for showers, mirrors, windows and glass repair.</p>
            </Reveal>
            <div className="mt-7 flex items-center gap-3 text-[0.82rem] font-bold tracking-[0.08em] text-charcoal uppercase">
              <span className="size-3 rounded-full bg-gold" aria-hidden="true" />
              <span>Home base</span>
              <span className="ml-3 size-3 rounded-full border-2 border-gold" aria-hidden="true" />
              <span>{business.radiusMiles}-mile range</span>
            </div>
            <Button href="/service-areas" className="mt-8" variant="outline" withArrow>See all service areas</Button>
            <p className="mt-7 text-[0.82rem] leading-relaxed text-muted">Also serving {additionalCommunities.slice(0, 4).join(", ")} and nearby communities.</p>
          </div>
          <div className="lg:col-span-8">
            <ServiceAreaMap />
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-charcoal/15 pt-5 text-[0.86rem] text-charcoal">
              {primaryAreaSlugs.slice(0, 6).map((slug) => {
                const area = getServiceArea(slug);
                if (!area) return null;
                return <Link key={slug} href={`/service-areas/${slug}`} className="transition-colors hover:text-forest">{area.city}</Link>;
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bone py-20 sm:py-28 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow-line text-forest">Questions, answered</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="home-h2 mt-6 text-charcoal">Before you book the job.</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {homePageFaqs.map(({ question, answer }, index) => (
              <Reveal key={question} delay={index * 50}>
                <details className="group border-t border-charcoal/15 py-5 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.05rem] font-bold tracking-tight text-charcoal [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="text-2xl font-normal leading-none text-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="measure mt-4 text-[0.96rem] leading-relaxed text-muted">{answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="final-cta" className="bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal kind="scale" className="relative min-h-[15rem] overflow-hidden lg:col-span-4">
            <Image src={photos.mirrorInstallAlt.src} alt={photos.mirrorInstallAlt.alt} fill sizes="(max-width: 1023px) 100vw, 34vw" className="object-cover" />
            <div className="absolute inset-0 bg-charcoal/30" aria-hidden="true" />
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow-line text-gold">{cta.estimate} · Houston, TX</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="home-h2 mt-6 max-w-[38rem] text-bone">Make the space clearer.</h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 max-w-[35rem] text-[1rem] leading-relaxed text-bone/72">Tell us what glass or mirror work you need. We will help you decide the next move and give you a clear way to start.</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href="/contact" variant="primary" size="lg" withArrow data-cta="estimate" data-location="home_final_cta">{cta.estimate}</Button>
                <a href={`tel:${business.phoneHref}`} data-cta="phone" data-location="home_final_cta" className="inline-flex items-center gap-3 font-display text-[1.05rem] font-bold text-bone transition-colors hover:text-gold">
                  <Phone className="size-4 text-gold" aria-hidden="true" strokeWidth={2.4} />
                  {business.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Proof({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-forest-soft py-6 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
      <p className="font-display text-[2rem] font-extrabold tracking-[-0.04em] text-bone">{value}</p>
      <p className="mt-1 text-[0.78rem] font-bold tracking-[0.1em] text-bone/55 uppercase">{label}</p>
    </div>
  );
}

function WorkPhoto({
  photo,
  caption,
  className,
  /** Matched to the source photo so nothing gets cropped into the wrong shape. */
  aspect = "aspect-[4/3]",
  sizes,
  delay = 0,
}: {
  photo: { src: string; alt: string; width: number; height: number };
  caption: string;
  className?: string;
  aspect?: string;
  sizes: string;
  delay?: number;
}) {
  return (
    <Reveal
      as="figure"
      kind="scale"
      delay={delay}
      className={`group relative overflow-hidden ${aspect} ${className ?? ""}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="img-zoom object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent"
      />
      <figcaption className="absolute right-4 bottom-4 left-4 font-display text-[0.72rem] font-bold tracking-[0.13em] text-bone uppercase">
        {caption}
      </figcaption>
    </Reveal>
  );
}
