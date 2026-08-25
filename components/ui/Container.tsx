import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** "wide" relaxes the 1280px limit for full-bleed compositions. */
  width?: "default" | "narrow" | "wide";
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-[80rem]",
  wide: "max-w-[92rem]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", widths[width], className)}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm. Sections breathe; they are not stacked edge to edge. */
  space?: "default" | "tight" | "loose" | "none";
  as?: ElementType;
  "aria-labelledby"?: string;
}

const spacing = {
  none: "",
  tight: "py-14 md:py-20 lg:py-24",
  default: "py-16 md:py-24 lg:py-32",
  loose: "py-20 md:py-28 lg:py-40",
} as const;

export function Section({
  children,
  className,
  id,
  space = "default",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={cn(spacing[space], className)} {...rest}>
      {children}
    </Tag>
  );
}
