import type { NavItem } from "@/types";
import { serviceGroups, services } from "./services";
import { primaryAreaSlugs, serviceAreas } from "./service-areas";

export const areasNav: NavItem[] = primaryAreaSlugs.map((slug) => {
  const area = serviceAreas.find((a) => a.slug === slug);
  return {
    label: area ? area.city : slug,
    href: `/service-areas/${slug}`,
  };
});

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  { label: "Service Areas", href: "/service-areas", children: areasNav },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/** Services listed in the footer — the ones people search for most. */
export const footerServiceSlugs = [
  "custom-shower-enclosures",
  "custom-mirrors",
  "windows-and-doors",
  "glass-installation-repair",
  "mirrored-walls",
  "shower-doors",
] as const;

/** Services grouped by family, for the header mega menu and the services hub. */
export const servicesNavGroups = serviceGroups.map((group) => ({
  group,
  items: services.filter((s) => s.group === group.id),
}));

export const footerAreaSlugs = [
  "houston-tx",
  "katy-tx",
  "sugar-land-tx",
  "cypress-tx",
  "spring-tx",
  "conroe-tx",
] as const;
