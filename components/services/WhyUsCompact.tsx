import { business } from "@/data/business";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";

const reasons = [
  { value: "Years", label: "Hands-On Experience" },
  { value: "Licensed", label: `License ${business.license}` },
  { value: "Custom", label: "Fabrication & Install" },
  { value: "Insured", label: "Company Coverage" },
];

const points = [
  "Family-owned glass and mirror shop serving Houston and nearby cities",
  "Custom shower enclosures, mirrors, windows and reglazing measured to the opening",
  "Residential and commercial work, from a single pane to a full mirrored wall",
  "Clear scheduling, careful install and a clean finish when the job is done",
];

/** Compact trust block used on every service page. */
export function WhyUsCompact() {
  return (
    <Section className="bg-sand/60" space="tight" aria-labelledby="why-us-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Why {business.name}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="why-us-heading" className="t-h3 mt-5 text-charcoal">
                Who is doing the work
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-7 space-y-3.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-gold" />
                    <span className="text-[0.93rem] leading-relaxed text-muted">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-px border border-charcoal/12 bg-charcoal/12">
              {reasons.map((reason, i) => (
                <Reveal key={reason.label} delay={i * 80} className="bg-bone px-6 py-8 sm:px-8">
                  <p className="font-display text-[2rem] leading-none font-extrabold tracking-tight text-forest sm:text-[2.5rem]">
                    {reason.value}
                  </p>
                  <p className="mt-2.5 font-display text-[0.68rem] leading-tight font-bold tracking-[0.16em] text-muted uppercase">
                    {reason.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** @deprecated Prefer WhyUsCompact */
export const WhyEGCompact = WhyUsCompact;
