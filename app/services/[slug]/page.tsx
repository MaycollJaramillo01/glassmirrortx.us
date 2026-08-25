import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getService, services } from "@/data/services";
import { business } from "@/data/business";
import { buildServiceMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
  graph,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

import { ServiceHero } from "@/components/services/ServiceHero";
import {
  RelatedServices,
  ServiceAnswer,
  ServiceBenefits,
  ServiceContent,
  ServiceGallery,
  ServiceSignals,
} from "@/components/services/ServiceBody";
import { WhyUsCompact } from "@/components/services/WhyUsCompact";
import { AreasServedStrip } from "@/components/services/AreasServedStrip";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const trail = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
  ];

  const urgent = service.heroVariant === "urgent";

  return (
    <>
      <ServiceHero service={service} trail={trail} />

      <ServiceSignals signals={service.signals} image={service.heroImage} serviceName={service.name} />
      <ServiceAnswer aeo={service.aeo} />
      <ServiceBenefits benefits={service.benefits} />
      <ServiceContent blocks={service.content} />

      <ProcessSection
        steps={service.process}
        eyebrow="Our Process"
        heading={`How we handle ${service.name.toLowerCase()}`}
        tone={urgent ? "light" : "dark"}
        className={urgent ? undefined : "bg-bone"}
      />

      <WhyUsCompact />
      <ServiceGallery photos={service.gallery} serviceName={service.name} />
      <AreasServedStrip serviceName={service.name} />

      <FAQSection
        faqs={service.faq}
        eyebrow={`${service.name} FAQs`}
        heading={`Questions about ${service.name.toLowerCase()}`}
        headingId="service-faq-heading"
      />

      <RelatedServices slugs={service.related} />

      <FinalCTA
        eyebrow={`Free Estimates · ${business.city}, ${business.stateCode}`}
        title={
          <>
            Need {service.name.toLowerCase()}
            <br />
            <span className="text-gold">in {business.city}?</span>
          </>
        }
        lead={`Tell us what you are looking at and we will come out, walk the job and price it at no charge. Serving ${business.city} and surrounding communities within ${business.radiusLabel}.`}
      />

      <JsonLd
        data={graph(
          buildWebPageSchema(
            `/services/${service.slug}`,
            service.seoTitle,
            service.metaDescription,
          ),
          buildServiceSchema(service),
          buildBreadcrumbSchema(trail),
          // The direct answer leads the FAQPage entity. Any FAQ that asks the
          // same thing is dropped, so the schema never repeats a question.
          buildFaqSchema([
            { question: service.aeo.question, answer: service.aeo.answer },
            ...service.faq.filter((f) => f.question !== service.aeo.question),
          ]),
        )}
      />
    </>
  );
}
