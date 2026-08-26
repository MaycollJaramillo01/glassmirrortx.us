import Image from "next/image";
import Link from "next/link";

import { business } from "@/data/business";
import { cn } from "@/lib/utils/cn";

export function Logo({
  tone = "dark",
  className,
}: {
  /** dark = charcoal/dark surfaces; light = unused reserved tone for light bands. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${business.legalName} home`}
      className={cn(
        "group inline-flex shrink-0 items-center transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {/* Transparent PNG from the client — no white/black plate behind it. */}
      <span
        className={cn(
          "relative block h-[3rem] w-[9.75rem] sm:h-[3.35rem] sm:w-[10.9rem]",
          tone === "light" && "drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
        )}
      >
        <Image
          src="/logo.png"
          alt={`${business.legalName} logo`}
          width={1440}
          height={763}
          priority
          sizes="(max-width: 640px) 156px, 174px"
          className="h-full w-full object-contain object-left"
        />
      </span>
    </Link>
  );
}
