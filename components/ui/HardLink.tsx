import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type HardLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: ReactNode;
};

/** Internal link that forces a full document navigation (reliable in in-app browsers). */
export function HardLink({ href, className, children, ...rest }: HardLinkProps) {
  return (
    <a href={href} className={cn(className)} {...rest}>
      {children}
    </a>
  );
}
