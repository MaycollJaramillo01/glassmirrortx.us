import { getService } from "@/data/services";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { ServiceFeatureCard, ServiceRow } from "@/components/services/ServiceCard";

/** Two image-led features, then the rest as a typographic list. */
const FEATURED = ["custom-shower-enclosures", "custom-mirrors"] as const;
const SECONDARY = [
  "shower-doors",
  "mirrored-walls",
  "windows-and-doors",
  "glass-installation-repair",
] as const;

export function FeaturedServices() {
  const featured = FEATURED.map(getService).filter((s) => s !== undefined);
  const secondary = SECONDARY.map(getService).filter((s) => s !== undefined);

  return (
    <Section className="bg-sand/60" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our Services</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="services-heading" className="t-h2 mt-6 text-charcoal">
                Complete glass &amp; mirror services
              </h2>
            </Reveal>
          </div>

          <Reveal delay={120} className="shrink-0">
            <Button href="/services" variant="outline" withArrow>
              All Services
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16">
          {featured.map((service, i) => (
            <Reveal key={service.slug} kind="up" delay={i * 100}>
              <ServiceFeatureCard service={service} index={i + 1} className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-4">
          {secondary.map((service, i) => (
            <Reveal key={service.slug} kind="up" delay={i * 70}>
              <ServiceRow service={service} index={i + 3} />
            </Reveal>
          ))}
          <div className="border-t border-charcoal/12" />
        </div>
      </Container>
    </Section>
  );
}
