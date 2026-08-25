import Image from "next/image";
import { business } from "@/data/business";
import { photos } from "@/data/photos";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

const stats = [
  { value: "Years", label: "Hands-On Experience" },
  { value: "Licensed", label: `License ${business.license}` },
  { value: "Custom", label: "Fabrication & Install" },
  { value: "Res. & Com.", label: "Residential & Commercial" },
];

const points = [
  {
    title: "Licensed & insured",
    body: "The shop carries licensing and insurance — the baseline for anyone cutting and installing glass in your home or business.",
  },
  {
    title: "Measured to the opening",
    body: "Showers, mirrors and windows are priced and fabricated from the actual opening, not a catalog size that almost fits.",
  },
  {
    title: "Residential & commercial",
    body: "From a single vanity mirror to a mirrored wall or storefront glass, the work matches how the space is used.",
  },
  {
    title: "Clean finish",
    body: "Hardware is checked, the area is cleaned, and the space is ready to use when we leave.",
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-bone" aria-labelledby="why-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal kind="mask">
              <div className="relative aspect-4/3 overflow-hidden lg:aspect-3/4">
                <Image
                  src={photos.aboutShop.src}
                  alt={photos.aboutShop.alt}
                  fill
                  quality={78}
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">
                {business.name} shop and truck, Houston, TX.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Why {business.name}</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h2 id="why-heading" className="t-h2 mt-6 text-charcoal">
                The reasons people call us back
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-charcoal/12 pt-10">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <p className="t-stat text-forest">{stat.value}</p>
                  <p className="mt-2.5 font-display text-[0.72rem] leading-tight font-bold tracking-[0.16em] text-muted uppercase">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {points.map((point, i) => (
                <Reveal key={point.title} delay={i * 70}>
                  <dt className="flex items-baseline gap-2.5 font-display text-[0.95rem] font-bold tracking-tight text-charcoal">
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold" />
                    {point.title}
                  </dt>
                  <dd className="mt-2 pl-[26px] text-[0.92rem] leading-relaxed text-muted">
                    {point.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
