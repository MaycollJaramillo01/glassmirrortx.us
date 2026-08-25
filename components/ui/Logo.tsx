import Image from "next/image";
import Link from "next/link";

import { business } from "@/data/business";
import { cn } from "@/lib/utils/cn";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${business.legalName} home`}
      className={cn(
        "group inline-flex shrink-0 items-center bg-white p-1 transition-transform duration-300 hover:-translate-y-0.5",
        tone === "light"
          ? "shadow-[0_8px_24px_rgba(0,0,0,0.24)]"
          : "shadow-[0_6px_18px_rgba(10,22,12,0.12)]",
        className,
      )}
    >
      <span className="relative block h-[3.25rem] w-[4.45rem] sm:h-[3.75rem] sm:w-[5.1rem]">
        <Image
          src="/logo.png"
          alt={`${business.legalName} logo`}
          width={1024}
          height={768}
          priority
          sizes="(max-width: 640px) 72px, 82px"
          className="h-full w-full object-contain"
        />
      </span>
    </Link>
  );
}
