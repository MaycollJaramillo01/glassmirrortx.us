import type { ProcessStep } from "@/types";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils/cn";

const defaultSteps: ProcessStep[] = [
  {
    title: "Request your appointment",
    body: "Call or send the form. Tell us what glass or mirror work you need and where the property is.",
  },
  {
    title: "On-site measure",
    body: "We come out, measure the opening, check access and finishes, and price the work before anything is scheduled.",
  },
  {
    title: "Fabrication & install",
    body: "Glass is cut, tempered or sourced as needed, then installed with care for the surrounding finishes.",
  },
  {
    title: "Clean finish",
    body: "Hardware is checked, the area is cleaned, and the space is ready to use when we leave.",
  },
];

interface Props {
  steps?: ProcessStep[];
  eyebrow?: string;
  heading?: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Numbered process with a connecting rule that draws itself in on entry.
 * Shared by the home page and every service page (each passes its own steps).
 */
export function ProcessSection({
  steps = defaultSteps,
  eyebrow = "How It Works",
  heading = "Four steps, start to finish",
  tone = "dark",
  className,
}: Props) {
  const light = tone === "light";

  return (
    <Section
      className={cn(light ? "bg-forest" : "bg-bone", className)}
      aria-labelledby="process-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow tone={light ? "light" : "dark"}>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2
              id="process-heading"
              className={cn("t-h2 mt-6", light ? "text-bone" : "text-charcoal")}
            >
              {heading}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 110}
              className={cn(
                "relative pt-7",
                // Each step carries its own rule, so the row reads as four
                // columns instead of one thin line floating across the band.
                light ? "border-t border-bone/25" : "border-t border-charcoal/15",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-px left-0 h-0.5 w-10",
                  light ? "bg-gold" : "bg-forest",
                )}
              />

              <span
                className={cn(
                  "t-numeral block tabular-nums",
                  light ? "text-bone/25" : "text-charcoal/15",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className={cn("t-h4 mt-5 uppercase", light ? "text-bone" : "text-charcoal")}>
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-[38ch] text-[0.92rem] leading-relaxed",
                  light ? "text-bone/70" : "text-muted",
                )}
              >
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
