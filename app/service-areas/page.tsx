import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { business } from "@/data/business";
import { additionalCommunities, getServiceArea, primaryAreaSlugs } from "@/data/service-areas";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildWebPageSchema, graph } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";

const title = "Glass & Mirror Service Areas | Martinez Orlyn Glass & Mirror";
const description = `${business.name} serves Houston and nearby communities across Harris, Fort Bend, Montgomery, Brazoria and Galveston counties.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/service-areas" });

export default function ServiceAreasPage() {
  const trail = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
  ];

  return (
    <>
      <section className="bg-charcoal pb-16 pt-32 text-bone sm:pb-20 sm:pt-40">
        <Container width="wide">
          <p className="eyebrow-line text-gold">Where we work</p>
          <h1 className="home-h2 mt-7 max-w-[48rem] text-bone">Glass &amp; mirror across Greater Houston.</h1>
          <p className="mt-6 max-w-[38rem] text-[1.05rem] leading-relaxed text-bone/72">Based in Houston, we work across nearby communities. Each location page explains what local homes and businesses tend to call for.</p>
        </Container>
      </section>
      <section className="bg-sand py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-px border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
            {primaryAreaSlugs.map((slug) => {
              const area = getServiceArea(slug);
              if (!area) return null;
              return (
                <Link key={slug} href={`/service-areas/${slug}`} className="group flex min-h-[10rem] flex-col justify-between bg-bone p-6 transition-colors hover:bg-forest hover:text-bone sm:p-8">
                  <span className="font-display text-[1.35rem] font-extrabold tracking-tight">{area.city}, {area.stateCode}</span>
                  <span className="mt-8 flex items-center justify-between text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase group-hover:text-gold"><span>{area.county}</span><ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" strokeWidth={2.2} /></span>
                </Link>
              );
            })}
          </div>
          <div className="mt-14 max-w-[44rem]">
            <p className="eyebrow-line text-forest">Nearby communities</p>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-muted">We also take calls from {additionalCommunities.join(", ")}. If you are close to Houston and do not see your city above, call and ask.</p>
          </div>
        </Container>
      </section>

      <JsonLd
        data={graph(
          buildWebPageSchema("/service-areas", title, description),
          buildBreadcrumbSchema(trail),
        )}
      />
    </>
  );
}
