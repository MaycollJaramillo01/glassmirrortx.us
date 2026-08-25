import type { Photo } from "@/types";

/**
 * Job photographs pulled from the company's published site (glassmirrortx.us).
 * Dimensions are approximate file pixel sizes so next/image can reserve space.
 * Alt text describes what is visible; do not invent keyword phrases the frame
 * does not show.
 */
export const photos = {
  heroGlass: {
    src: "/images/hero/houston-glass-hero.webp",
    alt: "Interior view through residential glass looking out to a Houston-area backyard",
    width: 2040,
    height: 1148,
  },
  aboutShop: {
    src: "/images/company/about-martinez-orlyn.webp",
    alt: "Martinez Orlyn Glass & Mirror branded truck and shop exterior",
    width: 2560,
    height: 1244,
  },
  showerEnclosure: {
    src: "/images/showers/shower-enclosure-1.webp",
    alt: "Custom frameless shower enclosure installed in a residential bathroom",
    width: 1500,
    height: 2000,
  },
  showerEnclosureAlt: {
    src: "/images/showers/shower-enclosure-2.webp",
    alt: "Glass shower enclosure with chrome hardware in a finished bathroom",
    width: 1500,
    height: 2000,
  },
  mirrorWall: {
    src: "/images/mirrors/mirror-wall-1.webp",
    alt: "Large mirrored wall panels installed in a residential interior",
    width: 1500,
    height: 2000,
  },
  mirrorInstall: {
    src: "/images/mirrors/mirror-install-1.webp",
    alt: "Custom mirror installation in a finished interior space",
    width: 1500,
    height: 2000,
  },
  mirrorInstallAlt: {
    src: "/images/mirrors/mirror-install-2.webp",
    alt: "Installed mirror panel on an interior wall",
    width: 514,
    height: 960,
  },
  glassWork: {
    src: "/images/glass/glass-work-1.webp",
    alt: "Residential glass installation work in progress",
    width: 720,
    height: 960,
  },
  glassWorkAlt: {
    src: "/images/glass/glass-work-2.webp",
    alt: "Finished glass and mirror project in a Houston-area home",
    width: 1200,
    height: 1600,
  },
  windowGlass: {
    src: "/images/windows/window-glass-1.webp",
    alt: "Window glass work on a residential property",
    width: 720,
    height: 960,
  },
  windowGlassAlt: {
    src: "/images/windows/window-glass-2.webp",
    alt: "Installed residential window glass",
    width: 720,
    height: 960,
  },
} as const satisfies Record<string, Photo>;
