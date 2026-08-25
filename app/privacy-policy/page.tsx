import type { Metadata } from "next";

import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";

const title = `Privacy Policy | ${business.name}`;
const description = `Privacy policy for ${business.legalName}.`;

export const metadata: Metadata = buildMetadata({ title, description, path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-bone pb-24 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <p className="eyebrow-line text-forest">Legal</p>
        <h1 className="home-h2 mt-7 text-charcoal">Privacy policy</h1>
        <div className="mt-10 space-y-6 text-[0.98rem] leading-relaxed text-muted">
          <p>{business.legalName} uses the information you submit through this site to respond to appointment requests, schedule service and answer questions. We do not sell submitted contact information.</p>
          <p>Information may include your name, phone number, email address, property city and the details you provide about the work. We keep it only as long as needed for the business purpose for which it was submitted.</p>
          <p>To ask about your information, contact <a className="text-forest underline decoration-gold underline-offset-4" href={`mailto:${business.email}`}>{business.email}</a> or call <a className="text-forest underline decoration-gold underline-offset-4" href={`tel:${business.phoneHref}`}>{business.phone}</a>.</p>
        </div>
      </Container>
    </section>
  );
}
