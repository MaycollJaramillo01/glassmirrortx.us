import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { homePageFaqs, RedesignedHome } from "@/components/sections/RedesignedHome";

const TITLE =
  "Glass & Mirror in Houston, TX | Showers, Mirrors & Windows | Martinez Orlyn Glass & Mirror";
const DESCRIPTION =
  "Professional glass and mirror service in Houston, TX. Custom shower enclosures, mirrors, windows, solar screens and glass repair for residential and commercial properties. Licensed & insured. Call (832) 253-2925.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <RedesignedHome />

      <JsonLd
        data={graph(
          buildWebPageSchema("/", TITLE, DESCRIPTION),
          buildFaqSchema(homePageFaqs),
        )}
      />
    </>
  );
}
