import type { Photo } from "@/types";

/**
 * Site-wide photography: real Martinez Orlyn Glass & Mirror job photos
 * selected from the previous website gallery.
 */
export const photos = {
  heroGlass: {
    src: "/images/gallery/windows-and-doors-030.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Floor-to-ceiling windows and black patio doors",
    width: 960,
    height: 640,
  },
  aboutShop: {
    src: "/images/gallery/glass-installation-repair-084.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Commercial storefront glass for law firm building",
    width: 2560,
    height: 1244,
  },
  showerEnclosure: {
    src: "/images/gallery/custom-showers-057.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Frameless shower with herringbone tile walls",
    width: 1200,
    height: 1600,
  },
  showerDoor: {
    src: "/images/gallery/shower-doors-082.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Matte black barn-style sliding shower door system",
    width: 1200,
    height: 1600,
  },
  showerEnclosureAlt: {
    src: "/images/gallery/shower-doors-082.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Matte black barn-style sliding shower door system",
    width: 1200,
    height: 1600,
  },
  mirrorInstall: {
    src: "/images/gallery/custom-mirrors-015.webp",
    alt: "Martinez Orlyn Glass & Mirror — Multi-panel angled vanity mirrors over granite counter",
    width: 1500,
    height: 2000,
  },
  mirrorInstallAlt: {
    src: "/images/gallery/custom-mirrors-002.webp",
    alt: "Martinez Orlyn Glass & Mirror — Two dark-framed vanity mirrors flanking tiled wall",
    width: 960,
    height: 540,
  },
  mirrorWall: {
    src: "/images/gallery/custom-mirrors-015.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Multi-panel angled vanity mirrors over granite counter",
    width: 1500,
    height: 2000,
  },
  howWeWork: {
    src: "/images/gallery/custom-mirrors-010.webp",
    alt: "Martinez Orlyn Glass & Mirror — Large frameless vanity mirror above blue cabinets",
    width: 1316,
    height: 640,
  },
  windowGlass: {
    src: "/images/gallery/windows-and-doors-025.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Black-framed sliding patio doors to modern kitchen",
    width: 960,
    height: 640,
  },
  windowGlassAlt: {
    src: "/images/gallery/double-pane-windows-077.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 White double-pane window in red brick wall",
    width: 1200,
    height: 1600,
  },
  solarScreen: {
    src: "/images/gallery/solar-screens-033.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Three windows with exterior solar screens on brick",
    width: 720,
    height: 960,
  },
  glassWork: {
    src: "/images/gallery/glass-installation-repair-084.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Commercial storefront glass for law firm building",
    width: 2560,
    height: 1244,
  },
  glassWorkAlt: {
    src: "/images/gallery/glass-installation-repair-014.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 Custom glass shelves on brass pipe bar rack",
    width: 1536,
    height: 2048,
  },
  reglazing: {
    src: "/images/gallery/double-pane-windows-079.webp",
    alt: "Martinez Orlyn Glass & Mirror \u2014 White vinyl double-pane window in brick wall",
    width: 1200,
    height: 1600,
  },
} as const satisfies Record<string, Photo>;
