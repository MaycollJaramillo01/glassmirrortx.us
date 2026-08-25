import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by
 * the page alongside this, so the markup and the structured data agree.
 */
export function Breadcrumbs({
  trail,
  tone = "light",
  className,
}: {
  trail: Crumb[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const last = trail[trail.length - 1];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.78rem] tracking-wide",
          tone === "light" ? "text-bone/55" : "text-muted",
        )}
      >
        {trail.map((crumb, i) => {
          const isLast = crumb === last;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="size-3 shrink-0 opacity-50" aria-hidden="true" />
              )}
              {isLast ? (
                <span aria-current="page" className={tone === "light" ? "text-bone" : "text-charcoal"}>
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "link-underline transition-colors",
                    tone === "light" ? "hover:text-bone" : "hover:text-charcoal",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
