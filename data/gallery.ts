import type { BeforeAfterItem, GalleryItem, Testimonial } from "@/types";
import { photos } from "./photos";

export const galleryCategories = [
  "All",
  "Custom Showers",
  "Mirrors",
  "Windows & Glass",
  "Projects",
] as const;

/** Real job photographs. Captions describe the work shown, nothing more. */
export const galleryItems: GalleryItem[] = [
  {
    ...photos.showerEnclosure,
    category: "Custom Showers",
    caption: "Custom frameless shower enclosure in a finished bathroom",
  },
  {
    ...photos.showerEnclosureAlt,
    category: "Custom Showers",
    caption: "Glass shower enclosure with chrome hardware",
  },
  {
    ...photos.mirrorWall,
    category: "Mirrors",
    caption: "Large mirrored wall panels in a residential interior",
  },
  {
    ...photos.mirrorInstall,
    category: "Mirrors",
    caption: "Custom mirror installation in a finished interior",
  },
  {
    ...photos.mirrorInstallAlt,
    category: "Mirrors",
    caption: "Installed mirror panel on an interior wall",
  },
  {
    ...photos.windowGlass,
    category: "Windows & Glass",
    caption: "Window glass work on a residential property",
  },
  {
    ...photos.windowGlassAlt,
    category: "Windows & Glass",
    caption: "Installed residential window glass",
  },
  {
    ...photos.glassWork,
    category: "Projects",
    caption: "Residential glass installation work in progress",
  },
  {
    ...photos.glassWorkAlt,
    category: "Projects",
    caption: "Finished glass and mirror project in a Houston-area home",
  },
  {
    ...photos.heroGlass,
    category: "Windows & Glass",
    caption: "Interior view through residential glass to an outdoor space",
  },
  {
    ...photos.aboutShop,
    category: "Projects",
    caption: "Martinez Orlyn Glass & Mirror truck and shop exterior",
  },
];

/** Before/after pairs — add real pairs when documented photos are available. */
export const beforeAfterItems: BeforeAfterItem[] = [];

/**
 * Customer reviews.
 *
 * Deliberately empty. Publishing invented testimonials is fraud, and the
 * company's real reviews live on its Google Business Profile and Facebook.
 * The section renders nothing while this array is empty.
 */
export const testimonials: Testimonial[] = [];
