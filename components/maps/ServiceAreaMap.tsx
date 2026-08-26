"use client";

import dynamic from "next/dynamic";

const ServiceAreaLeaflet = dynamic(
  () => import("./ServiceAreaLeaflet").then((module) => module.ServiceAreaLeaflet),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[23rem] animate-pulse border border-charcoal/15 bg-[#e8f2f2] sm:h-[29rem]"
        aria-label="Loading interactive service map"
      />
    ),
  },
);

export function ServiceAreaMap() {
  return <ServiceAreaLeaflet />;
}
