import type { Photo } from "@/types";

/**
 * Site-wide photography: licensed stock that matches each subject
 * (shower glass, mirrors, windows, solar screens, commercial glass).
 *
 * The company’s own job photos live in data/gallery.ts only — do not reuse
 * them here as service heroes when the frame does not match the service.
 */
export const photos = {
  heroGlass: {
    src: "/images/stock/hero-glass.webp",
    alt: "Modern home with large glass windows and sliding doors",
    width: 1400,
    height: 933,
  },
  aboutShop: {
    src: "/images/stock/about-workspace.webp",
    alt: "Bright living space with floor-to-ceiling residential glass",
    width: 1800,
    height: 1200,
  },
  showerEnclosure: {
    src: "/images/stock/shower-enclosure.webp",
    alt: "Frameless glass shower enclosure in a luxury bathroom",
    width: 1024,
    height: 717,
  },
  showerDoor: {
    src: "/images/stock/shower-door.webp",
    alt: "Curved sliding glass shower door with chrome hardware",
    width: 683,
    height: 1024,
  },
  /** @deprecated Prefer showerDoor — kept for older section imports. */
  showerEnclosureAlt: {
    src: "/images/stock/shower-door.webp",
    alt: "Curved sliding glass shower door with chrome hardware",
    width: 683,
    height: 1024,
  },
  mirrorInstall: {
    src: "/images/stock/mirror-vanity.webp",
    alt: "Full-width vanity mirror that opens up a bathroom",
    width: 1024,
    height: 768,
  },
  mirrorInstallAlt: {
    src: "/images/stock/mirror-vanity.webp",
    alt: "Full-width vanity mirror that opens up a bathroom",
    width: 1024,
    height: 768,
  },
  mirrorWall: {
    src: "/images/stock/mirror-wall.webp",
    alt: "Floor-to-ceiling mirrored walls in a commercial fitness space",
    width: 1600,
    height: 1067,
  },
  windowGlass: {
    src: "/images/stock/window-glass.webp",
    alt: "Residential sliding glass doors and window walls on a modern home",
    width: 1400,
    height: 933,
  },
  windowGlassAlt: {
    src: "/images/stock/double-pane.webp",
    alt: "Multi-story residence with large insulated window glass",
    width: 1400,
    height: 933,
  },
  solarScreen: {
    src: "/images/stock/solar-screen.webp",
    alt: "Exterior solar screens mounted on residential windows",
    width: 1024,
    height: 768,
  },
  glassWork: {
    src: "/images/stock/glass-install.webp",
    alt: "Commercial glass partition wall and door installation",
    width: 766,
    height: 1024,
  },
  glassWorkAlt: {
    src: "/images/stock/glass-repair.webp",
    alt: "Glass shower door and bathtub enclosure detail",
    width: 768,
    height: 1024,
  },
  reglazing: {
    src: "/images/stock/reglazing.webp",
    alt: "Office interior with large commercial window glass",
    width: 1400,
    height: 935,
  },
} as const satisfies Record<string, Photo>;
