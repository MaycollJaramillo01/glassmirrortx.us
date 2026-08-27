import type { BeforeAfterItem, GalleryItem } from "@/types";

export const galleryCategories = [
  "All",
  "Custom Showers",
  "Mirrors",
  "Windows & Glass",
  "Projects",
] as const;

/**
 * Real job photographs from Martinez Orlyn’s published work (previous site).
 * These stay on the Gallery page only — service heroes use stock in photos.ts.
 */
export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/job-shower-1.webp",
    alt: "Custom frameless shower enclosure installed for a Houston-area bathroom",
    width: 1500,
    height: 2000,
    category: "Custom Showers",
    caption: "Custom frameless shower enclosure",
  },
  {
    src: "/images/gallery/job-shower-2.webp",
    alt: "Glass shower enclosure with chrome hardware",
    width: 1500,
    height: 2000,
    category: "Custom Showers",
    caption: "Glass shower enclosure with chrome hardware",
  },
  {
    src: "/images/gallery/job-mirror-wall.webp",
    alt: "Large mirrored wall panels in a residential interior",
    width: 1500,
    height: 2000,
    category: "Mirrors",
    caption: "Mirrored wall panels",
  },
  {
    src: "/images/gallery/job-mirror-1.webp",
    alt: "Custom mirror installation in a finished interior",
    width: 1500,
    height: 2000,
    category: "Mirrors",
    caption: "Custom mirror installation",
  },
  {
    src: "/images/gallery/job-mirror-2.webp",
    alt: "Installed mirror panel on an interior wall",
    width: 514,
    height: 960,
    category: "Mirrors",
    caption: "Installed mirror panel",
  },
  {
    src: "/images/gallery/job-window-1.webp",
    alt: "Window glass work on a residential property",
    width: 720,
    height: 960,
    category: "Windows & Glass",
    caption: "Residential window glass",
  },
  {
    src: "/images/gallery/job-window-2.webp",
    alt: "Installed residential window glass",
    width: 720,
    height: 960,
    category: "Windows & Glass",
    caption: "Installed window glass",
  },
  {
    src: "/images/gallery/job-interior-glass.webp",
    alt: "Interior view through residential glass to an outdoor space",
    width: 2040,
    height: 1148,
    category: "Windows & Glass",
    caption: "Interior view through residential glass",
  },
  {
    src: "/images/gallery/job-glass-1.webp",
    alt: "Residential glass installation work in progress",
    width: 720,
    height: 960,
    category: "Projects",
    caption: "Glass installation in progress",
  },
  {
    src: "/images/gallery/job-glass-2.webp",
    alt: "Finished glass and mirror project in a Houston-area home",
    width: 1200,
    height: 1600,
    category: "Projects",
    caption: "Finished glass and mirror project",
  },
  {
    src: "/images/gallery/job-company-truck.webp",
    alt: "Martinez Orlyn Glass & Mirror branded truck and shop exterior",
    width: 2560,
    height: 1244,
    category: "Projects",
    caption: "Martinez Orlyn Glass & Mirror truck",
  },
];

/** Before/after pairs — add real pairs when documented photos are available. */
export const beforeAfterItems: BeforeAfterItem[] = [];
