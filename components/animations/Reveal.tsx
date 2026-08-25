import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RevealKind = "up" | "left" | "right" | "scale" | "mask" | "rule";

interface RevealProps {
  children: ReactNode;
  /** Motion applied on entry. Defaults to a short upward fade. */
  kind?: RevealKind;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Server component. Emits the markup and the delay; RevealEngine (one small
 * client component mounted in the root layout) flips these to visible as they
 * enter the viewport.
 *
 * Content is visible by default and only hidden once the engine has confirmed
 * it is running, so nothing disappears if JavaScript fails.
 */
export function Reveal({
  children,
  kind = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      data-reveal={kind}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

interface StaggerProps {
  children: ReactNode[];
  /** Milliseconds between each child. Kept short — content should not wait. */
  step?: number;
  kind?: RevealKind;
  className?: string;
  itemClassName?: string;
}

/** Reveals children in sequence. */
export function Stagger({
  children,
  step = 80,
  kind = "up",
  className,
  itemClassName,
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} kind={kind} delay={i * step} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
