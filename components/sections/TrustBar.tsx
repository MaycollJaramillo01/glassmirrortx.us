import { BadgeCheck, Building2, CalendarClock, Ruler, ShieldCheck, Wrench } from "lucide-react";
import { business } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

const items = [
  { icon: BadgeCheck, label: business.experienceLabel },
  { icon: CalendarClock, label: "By Appointment" },
  { icon: Ruler, label: "Custom Fabrication" },
  { icon: Building2, label: "Residential & Commercial" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Wrench, label: "Install & Repair" },
];

export function TrustBar() {
  return (
    <section aria-label={`Why customers choose ${business.name}`} className="bg-forest">
      <Container width="wide">
        <ul className="scrollbar-none -mx-5 flex snap-x gap-0 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
          {items.map(({ icon: Icon, label }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 60}
              className="flex min-w-[13.5rem] shrink-0 snap-start items-center gap-3 border-bone/12 px-5 py-6 sm:min-w-0 sm:border-l sm:first:border-l-0 lg:justify-center lg:px-4"
            >
              <Icon className="size-5 shrink-0 text-gold" aria-hidden="true" strokeWidth={2} />
              <span className="font-display text-[0.78rem] leading-tight font-bold tracking-[0.06em] text-bone uppercase">
                {label}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
