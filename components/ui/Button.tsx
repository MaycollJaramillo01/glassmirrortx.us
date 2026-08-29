import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline" | "onDark" | "text";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Appends a nudging arrow. */
  withArrow?: boolean;
  /** Tracking hooks read by lib/tracking. */
  "data-cta"?: string;
  "data-location"?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  disabled?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
}

type Props = LinkProps | ButtonProps;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-display font-bold uppercase tracking-[0.08em] " +
  "transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-55 disabled:pointer-events-none " +
  "min-h-[44px] text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-bright active:bg-gold-deep shadow-[0_1px_0_0_rgba(23,28,25,0.12)]",
  secondary: "bg-forest text-bone hover:bg-forest-soft active:bg-forest-deep",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-bone",
  onDark: "border border-bone/30 text-bone hover:bg-bone hover:text-charcoal hover:border-bone",
  text: "text-charcoal hover:text-forest px-0 min-h-0 tracking-[0.1em]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[0.78rem]",
  lg: "px-8 py-4.5 text-[0.85rem]",
};

export function Button(props: Props) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    withArrow = false,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], variant !== "text" && sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="arrow-shift size-4 shrink-0" aria-hidden="true" strokeWidth={2.5} />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as Omit<LinkProps, keyof BaseProps> & {
      href: string;
    };
    const isExternal = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");

    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }

    // Plain anchors load reliably in mobile in-app browsers (WhatsApp, Messenger).
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { type = "button", disabled, ...buttonRest } = rest as Omit<ButtonProps, keyof BaseProps>;

  return (
    <button type={type} disabled={disabled} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
