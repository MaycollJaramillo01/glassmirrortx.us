import { Phone } from "lucide-react";

import { business } from "@/data/business";
import { MessengerIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

/**
 * Floating chat and call bubbles.
 *
 * Server component — there is nothing to open or toggle, so no client bundle.
 * A channel with no link configured simply does not render, which is what
 * keeps a dead WhatsApp or Messenger link off the page.
 *
 * On phones the stack sits above MobileStickyCTA (58px + safe area) so the two
 * never overlap.
 */
export function ContactBubbles() {
  const channels = [
    business.whatsapp && {
      key: "whatsapp",
      href: business.whatsapp,
      label: "Chat on WhatsApp",
      icon: <WhatsAppIcon className="size-6" />,
      className: "bg-[#25D366] text-white hover:bg-[#1ebe5b]",
      external: true,
    },
    business.messenger && {
      key: "messenger",
      href: business.messenger,
      label: "Chat on Messenger",
      icon: <MessengerIcon className="size-6" />,
      className: "bg-[#0084FF] text-white hover:bg-[#0072db]",
      external: true,
    },
    {
      key: "phone",
      href: `tel:${business.phoneHref}`,
      label: `Call ${business.phone}`,
      icon: <Phone className="size-5" strokeWidth={2.6} aria-hidden="true" />,
      className: "bg-forest text-bone hover:bg-forest-soft",
      external: false,
    },
  ].filter(Boolean) as {
    key: string;
    href: string;
    label: string;
    icon: React.ReactNode;
    className: string;
    external: boolean;
  }[];

  if (channels.length === 0) return null;

  return (
    <div className="safe-bottom fixed right-4 bottom-[70px] z-40 flex flex-col gap-3 lg:right-6 lg:bottom-6">
      {channels.map(({ key, href, label, icon, className, external }) => (
        <a
          key={key}
          href={href}
          aria-label={label}
          title={label}
          data-cta={key}
          data-location="contact_bubble"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`group flex size-12 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(8,12,9,0.28)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 lg:size-[52px] ${className}`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
