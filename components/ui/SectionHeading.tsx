import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Reveal } from "@/components/animations/Reveal";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

/** Small uppercase label with a leading rule. Used deliberately, not everywhere. */
export function Eyebrow({ children, className, tone = "dark" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "t-eyebrow inline-flex items-center gap-3",
        tone === "dark" ? "text-forest" : "text-gold",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", tone === "dark" ? "bg-forest/50" : "bg-gold/60")}
      />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  /** Heading level. Sections use h2; this never renders an h1. */
  as?: "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal kind="up">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <Reveal kind="up" delay={eyebrow ? 60 : 0}>
        <Tag
          id={id}
          className={cn("t-h2", tone === "dark" ? "text-charcoal" : "text-bone")}
        >
          {title}
        </Tag>
      </Reveal>

      {lead && (
        <Reveal kind="up" delay={120}>
          <p
            className={cn(
              "t-lead measure",
              align === "center" && "mx-auto",
              tone === "dark" ? "text-muted" : "text-bone/70",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
