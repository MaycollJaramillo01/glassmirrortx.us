import type { Photo, Service, ServiceGroup } from "@/types";
import { photos } from "./photos";
import { serviceMedia } from "./service-media";

/**
 * Service families for nav, hub pages and Ads landing grouping.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "bathroom-glass",
    name: "Bathroom Glass",
    summary: "Custom shower enclosures and shower doors measured and installed to the opening.",
  },
  {
    id: "mirrors-glass",
    name: "Mirrors & Glass",
    summary: "Custom mirrors and mirrored walls for homes, offices and commercial interiors.",
  },
  {
    id: "windows-doors",
    name: "Windows & Doors",
    summary: "Window and door glass, double-pane units and solar screens for Houston properties.",
  },
  {
    id: "glass-services",
    name: "Glass Services",
    summary: "Glass installation, repair and reglazing for residential and commercial openings.",
  },
];

const groupAlt: Record<string, string> = {
  "bathroom-glass": "Job photograph from Martinez Orlyn Glass & Mirror bathroom glass work in the Houston area",
  "mirrors-glass": "Job photograph from Martinez Orlyn Glass & Mirror mirror work in the Houston area",
  "windows-doors": "Job photograph from Martinez Orlyn Glass & Mirror window and door glass work in the Houston area",
  "glass-services": "Job photograph from Martinez Orlyn Glass & Mirror glass installation or repair in the Houston area",
};

/** Every imported photograph filed under a service, as next/image Photos. */
export function mediaFor(slug: string): Photo[] {
  return serviceMedia
    .filter((m) => m.service === slug)
    .map((m) => ({
      src: m.src,
      alt: groupAlt[m.group] ?? "Martinez Orlyn Glass & Mirror job photograph",
      width: m.width,
      height: m.height,
    }));
}

/** Company photo heroes when a service has no dedicated gallery folder yet. */
const companyHero: Record<string, Photo> = {
  "custom-shower-enclosures": photos.showerEnclosure,
  "shower-doors": photos.showerDoor,
  "custom-mirrors": photos.mirrorInstall,
  "mirrored-walls": photos.mirrorWall,
  "windows-and-doors": photos.windowGlass,
  "double-pane-windows": photos.windowGlassAlt,
  "solar-screens": photos.solarScreen,
  "glass-installation-repair": photos.glassWork,
  reglazing: photos.reglazing,
};

/**
 * Hero and inline gallery come from imported company job photos only.
 */
function heroFor(slug: string): Photo | null {
  return mediaFor(slug)[0] ?? companyHero[slug] ?? null;
}

type Draft = Omit<Service, "heroImage" | "gallery">;

const drafts: Draft[] = [
  // =========================================================================
  // BATHROOM GLASS
  // =========================================================================
  {
    slug: "custom-shower-enclosures",
    name: "Custom Shower Enclosures",
    group: "bathroom-glass",
    seoTitle: "Custom Shower Enclosures in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Custom shower enclosures in Houston, TX. Frameless and framed glass measured to your opening, fabricated and installed. Licensed & insured. Get an appointment: (832) 253-2925.",
    h1: "Custom Shower Enclosures in Houston, TX",
    eyebrow: "Bathroom Glass",
    cardSummary: "Frameless and framed shower glass fabricated to your bathroom opening.",
    intro:
      "A custom shower enclosure is cut to the curb, walls and drain layout you actually have — not forced into a stock kit size. Martinez Orlyn Glass & Mirror measures on site, fabricates the panels, and installs hardware that matches the bath finish so the enclosure seals, swings and looks finished.",
    aeo: {
      question: "How much does a custom shower enclosure cost in Houston, TX?",
      answer:
        "Price follows the opening size, glass thickness, edge work, hardware and whether the design is frameless or framed. A simple two-panel door on a standard curb costs less than a multi-panel enclosure with heavy glass and specialty clamps. Martinez Orlyn Glass & Mirror quotes after measuring the space so the number matches the glass that will be built.",
      facts: [
        { label: "Priced on", value: "Opening size, glass type, edge finish and hardware" },
        { label: "Process", value: "Measure on site, fabricate, then install" },
        { label: "Schedule", value: "Request an appointment at (832) 253-2925" },
      ],
    },
    heroVariant: "image-full",
    signals: {
      heading: "When a custom enclosure is the right call",
      items: [
        "A bath remodel needs glass that fits a non-standard curb or wall layout",
        "You want frameless panels instead of a framed kit from a big-box aisle",
        "An older enclosure is cloudy, leaking or out of square with the tile",
        "Hardware finishes need to match new fixtures in the same bathroom",
        "A neo-angle, corner or walk-in opening will not take an off-the-shelf door",
      ],
    },
    benefits: [
      {
        title: "Measured to the opening",
        body: "Field measurements drive the cut list, so panels land plumb on the curb and walls you have.",
      },
      {
        title: "Frameless or framed",
        body: "Choose the look and seal that fit the bath — heavy clear glass or a framed system with matching metal.",
      },
      {
        title: "Hardware that belongs",
        body: "Hinges, clamps, handles and channels are selected to the finish already in the room.",
      },
      {
        title: "Residential bath experience",
        body: "Years of hands-on shower glass work across Houston homes, from small baths to full gut remodels.",
      },
    ],
    process: [
      {
        title: "Appointment and measure",
        body: "We walk the bathroom, confirm the opening, note tile and curb conditions, and lock the glass and hardware choices.",
      },
      {
        title: "Fabrication",
        body: "Panels are cut and edged to the measurements, with holes and notches placed for the hardware you selected.",
      },
      {
        title: "Install",
        body: "Glass is set, hardware tightened, and seals checked so the enclosure swings cleanly and stays watertight where designed.",
      },
      {
        title: "Walk-through",
        body: "You see the finished enclosure in place and we cover care for the glass and hardware before we leave.",
      },
    ],
    content: [
      {
        heading: "Frameless versus framed shower glass",
        paragraphs: [
          "Frameless enclosures use thicker tempered glass with minimal metal — clamps, hinges and a handle — so the tile and stone read as the main finish. Framed systems use channels and a lighter glass thickness, which can be the better match for certain openings or budgets.",
          "Neither is automatically better. The right choice follows the look of the bath, how the curb is built, and how much metal you want visible. We walk that decision on site rather than selling one style for every remodel.",
        ],
      },
      {
        heading: "Houston bath remodels and new glass",
        paragraphs: [
          "Houston and the west and north corridors see a steady run of bath remodels — Katy, Cypress, Spring and inside the Loop alike. Custom glass is usually the last major piece after tile and fixtures are set, which is why accurate measuring waits until the opening is finished.",
          "If walls are still in progress, we can discuss the design early and schedule the measure once the curb and walls are ready. That sequencing avoids re-cutting glass because a wall landed a quarter-inch off the plan.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I need finished walls before you measure for a shower enclosure?",
        answer:
          "Yes for final measurements. Tile, stone and the curb should be set so the glass is cut to the finished opening. We can discuss design earlier, then schedule the measure when the bath is ready.",
      },
      {
        question: "Can you replace only the glass on an existing enclosure?",
        answer:
          "Often yes, if the hardware and channels are sound and the new glass can use the same holes and layout. If the metal is corroded or the opening has changed, a full custom enclosure is the cleaner path.",
      },
      {
        question: "How do I get an appointment?",
        answer:
          "Call (832) 253-2925 or request an appointment through the site. We will confirm the bathroom details and set a time to measure or discuss the project.",
      },
    ],
    related: ["shower-doors", "custom-mirrors", "glass-installation-repair"],
    adsLanding: true,
  },

  {
    slug: "shower-doors",
    name: "Shower Doors",
    group: "bathroom-glass",
    seoTitle: "Shower Doors in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Shower doors in Houston, TX. Bypass, pivot and hinged glass doors measured and installed for residential baths. Licensed & insured. Call (832) 253-2925.",
    h1: "Shower Doors in Houston, TX",
    eyebrow: "Bathroom Glass",
    cardSummary: "Bypass, pivot and hinged shower doors fitted to the opening.",
    intro:
      "A shower door is the moving piece of the enclosure — the panel that has to clear the curb, clear the towel bar, and close without binding. We size and install bypass, pivot and hinged doors so they track smoothly and match the glass already in the bath.",
    aeo: {
      question: "What types of shower doors can you install in Houston?",
      answer:
        "Martinez Orlyn Glass & Mirror installs bypass sliding doors, hinged doors and pivot doors sized to the shower opening. The right type depends on how much clearance the bathroom has, whether the curb is level, and whether you want a frameless look or a framed track system.",
      facts: [
        { label: "Door types", value: "Bypass, hinged and pivot" },
        { label: "Fit", value: "Measured to the finished opening" },
        { label: "Contact", value: "(832) 253-2925 for an appointment" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "When a new shower door is needed",
      items: [
        "The existing door scrapes the curb, jumps the track or will not close",
        "Rollers and guides are worn out and replacement parts no longer fit",
        "You are converting a tub opening to a shower and need a door only",
        "A framed kit door does not match the new tile or fixtures",
        "Glass is etched, cloudy or cracked and the hardware can stay",
      ],
    },
    benefits: [
      {
        title: "Door style matched to the room",
        body: "Bypass doors save swing space; hinged and pivot doors give a cleaner frameless look when the bath allows it.",
      },
      {
        title: "Smooth operation",
        body: "Tracks, rollers and hinges are set so the door moves without dragging tile or leaking at the strike.",
      },
      {
        title: "Coordinated with enclosure glass",
        body: "When fixed panels are part of the same job, thickness and hardware stay consistent across the opening.",
      },
      {
        title: "Clear appointment process",
        body: "Measure, fabricate and install on a schedule that fits the remodel — call (832) 253-2925 to start.",
      },
    ],
    process: [
      {
        title: "Assess the opening",
        body: "We check curb level, wall plumb and clearance for swing or bypass travel.",
      },
      {
        title: "Select door type and hardware",
        body: "You choose the door style and finish that fit the bath layout and existing fixtures.",
      },
      {
        title: "Fabricate and install",
        body: "Glass is cut, hardware mounted, and the door adjusted for a clean close.",
      },
      {
        title: "Final check",
        body: "We confirm seals, soft stops and clearance, then leave the bath ready to use.",
      },
    ],
    content: [
      {
        heading: "Bypass doors in smaller Houston baths",
        paragraphs: [
          "Many Houston and apartment-style baths do not have room for a door that swings into the room. Bypass doors keep the glass in the track, which is why they remain common on tub-to-shower conversions and compact primary baths.",
          "The trade-off is more visible metal. If you want less frame, a hinged or pivot door works when there is clear floor space and a square opening. We will say which option the room actually supports.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you install a shower door on a tub?",
        answer:
          "Yes, when the tub deck and walls are suitable for glass and the door type fits the opening. We measure the tub and walls before fabricating so the door clears the fixtures and closes cleanly.",
      },
      {
        question: "How long does shower door installation take?",
        answer:
          "Install time depends on the door type and whether fixed panels are included. Many single-door installs finish in a single visit once the glass is fabricated; complex openings may need more time on site.",
      },
      {
        question: "Do you replace broken shower door glass only?",
        answer:
          "When the track and hardware are still sound, replacement glass is often possible. If the metal is damaged or obsolete, replacing the full door assembly is usually the better long-term result.",
      },
    ],
    related: ["custom-shower-enclosures", "custom-mirrors", "reglazing"],
    adsLanding: false,
  },

  // =========================================================================
  // MIRRORS & GLASS
  // =========================================================================
  {
    slug: "custom-mirrors",
    name: "Custom Mirrors",
    group: "mirrors-glass",
    seoTitle: "Custom Mirrors in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Custom mirrors in Houston, TX. Vanity, wall and specialty mirrors cut and installed for homes and businesses. Licensed & insured. Get an appointment: (832) 253-2925.",
    h1: "Custom Mirrors in Houston, TX",
    eyebrow: "Mirrors & Glass",
    cardSummary: "Vanity, wall and specialty mirrors cut to size and installed.",
    intro:
      "A custom mirror is cut to the wall or vanity span you actually have, with edges finished the way the room needs — polished, beveled or as specified. Martinez Orlyn Glass & Mirror fabricates and installs residential and commercial mirrors so the glass hangs level, secure and sized to the space.",
    aeo: {
      question: "Can you make a custom-sized bathroom vanity mirror in Houston?",
      answer:
        "Yes. We measure the vanity wall, cut the mirror to the width and height you want, finish the edges, and install it securely. Custom sizing is how you get a continuous look over a double vanity or an exact fit between sconces instead of settling for a stock rectangle.",
      facts: [
        { label: "Common uses", value: "Vanities, entries, closets, gyms, salons" },
        { label: "Edges", value: "Polished, beveled or as specified" },
        { label: "Appointment", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "When a custom mirror is the right call",
      items: [
        "A double vanity needs one continuous mirror instead of two stock pieces",
        "Sconces or outlets force a specific width and height",
        "You want a beveled or polished edge that stock mirrors do not offer",
        "An old mirror is damaged, silvered poorly or the wrong proportion for the wall",
        "A commercial space needs matching mirrors across multiple rooms",
      ],
    },
    benefits: [
      {
        title: "Cut to the wall",
        body: "Width and height follow your measurements, not the nearest size on a shelf.",
      },
      {
        title: "Edge finishes that read as finished work",
        body: "Polished and beveled edges keep the perimeter looking intentional instead of raw.",
      },
      {
        title: "Secure mounting",
        body: "Mirrors are hung with the correct hardware for the wall type and panel weight.",
      },
      {
        title: "Home and commercial",
        body: "The same fabrication approach covers baths, offices, salons and retail interiors.",
      },
    ],
    process: [
      {
        title: "Discuss size and finish",
        body: "We confirm the wall span, edge style and any cutouts around outlets or sconces.",
      },
      {
        title: "Measure on site",
        body: "Final measurements come from the wall itself so the glass lands where planned.",
      },
      {
        title: "Fabricate",
        body: "The mirror is cut, edged and prepared for the mounting method chosen.",
      },
      {
        title: "Install",
        body: "Panels go up level and secure; we clean the glass and confirm the fit before leaving.",
      },
    ],
    content: [
      {
        heading: "Vanity mirrors that fit Houston baths",
        paragraphs: [
          "Primary baths in newer west-side and north-side homes often run wide vanities with sconces that leave a narrow band for glass. A stock mirror either leaves gaps or covers the fixtures. Custom cutting solves that by sizing the glass to the clear wall between the lights and the cabinet top.",
          "If you are still selecting sconces, share the plan early. Outlet and fixture locations change the cut list, and it is easier to plan around them before the glass is fabricated.",
        ],
      },
      {
        heading: "Commercial and multi-unit mirrors",
        paragraphs: [
          "Offices, salons and multi-family units often need matching mirrors across several rooms. We can fabricate a consistent size and edge so each install matches the next without shopping for identical stock pieces that may not exist.",
        ],
      },
    ],
    faq: [
      {
        question: "Do you install mirrors with beveled edges?",
        answer:
          "Yes. Beveled and polished edges are common finish options on custom mirrors. We confirm the edge style when we take the order so fabrication matches what you expect.",
      },
      {
        question: "Can you cut around outlets or light fixtures?",
        answer:
          "Often yes, when the layout allows a clean notch or cutout. Share fixture locations at the measure so the glass is fabricated correctly the first time.",
      },
      {
        question: "How do I schedule a custom mirror appointment?",
        answer:
          "Call (832) 253-2925 or request an appointment online. We will set a time to measure the wall and discuss size, edge finish and install.",
      },
    ],
    related: ["mirrored-walls", "custom-shower-enclosures", "glass-installation-repair"],
    adsLanding: true,
  },

  {
    slug: "mirrored-walls",
    name: "Mirrored Walls",
    group: "mirrors-glass",
    seoTitle: "Mirrored Walls in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Mirrored walls in Houston, TX. Wall-to-wall mirror panels for homes, studios and commercial interiors. Licensed & insured. Call (832) 253-2925.",
    h1: "Mirrored Walls in Houston, TX",
    eyebrow: "Mirrors & Glass",
    cardSummary: "Wall-to-wall mirror panels that open up a room with light and depth.",
    intro:
      "A mirrored wall is a series of panels cut to the wall height and width, jointed cleanly and mounted so the surface reads as one plane. Martinez Orlyn Glass & Mirror installs mirrored walls for residential rooms, dance and fitness studios, and commercial interiors across Houston.",
    aeo: {
      question: "How are mirrored walls installed?",
      answer:
        "Mirrored walls are built from panels cut to the wall dimensions, with edges finished and joints aligned so the surface looks continuous. Panels are mounted securely to the wall structure; the exact method depends on panel size, wall type and whether seams are centered on a design line.",
      facts: [
        { label: "Uses", value: "Living rooms, gyms, studios, retail, offices" },
        { label: "Approach", value: "Custom-cut panels, aligned joints, secure mount" },
        { label: "Contact", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "image-full",
    signals: {
      heading: "When a mirrored wall makes sense",
      items: [
        "A room needs more light and perceived space without a remodel",
        "A home gym or studio needs a full-height reflection wall",
        "Retail or salon design calls for a continuous mirror plane",
        "An older mirrored wall has failed silvering or uneven seams",
        "You want panels sized to the wall rather than a patchwork of small mirrors",
      ],
    },
    benefits: [
      {
        title: "Continuous visual plane",
        body: "Panels are sized and jointed so the wall reads as one surface, not a collage of leftover pieces.",
      },
      {
        title: "Residential and commercial installs",
        body: "The same fabrication approach covers homes, studios and storefront interiors.",
      },
      {
        title: "Secure mounting",
        body: "Heavy panels need the right hardware and wall prep — that is planned at the measure, not improvised on install day.",
      },
      {
        title: "Clean seams",
        body: "Joint placement follows the wall layout so seams land where they look intentional.",
      },
    ],
    process: [
      {
        title: "Wall assessment",
        body: "We check flatness, height, obstacles and how seams should break across the wall.",
      },
      {
        title: "Panel layout",
        body: "The wall is divided into fabricable panel widths with joint lines you approve.",
      },
      {
        title: "Fabrication",
        body: "Mirrors are cut and edged to the layout.",
      },
      {
        title: "Install and align",
        body: "Panels go up level, seams align, and the finished wall is cleaned and checked.",
      },
    ],
    content: [
      {
        heading: "Mirrored walls in Houston interiors",
        paragraphs: [
          "Houston homes and studios use mirrored walls to bounce daylight in deep rooms and to give fitness or dance spaces a full reflection. Commercial interiors — salons, boutiques, offices — use the same approach for brand look and perceived square footage.",
          "Wall prep matters. Uneven drywall, soft plaster or hidden wiring change how panels mount. We flag those conditions at the appointment so the install method matches the wall you have.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you mirror an entire wall?",
        answer:
          "Yes. Full-height and full-width mirrored walls are built from custom panels sized to the opening. We plan seam locations so the finished wall looks continuous.",
      },
      {
        question: "Are mirrored walls only for gyms?",
        answer:
          "No. Homes use them in living rooms, dining areas and entries; commercial spaces use them in salons, retail and offices. The fabrication is the same idea — panels cut to the wall.",
      },
      {
        question: "How do I get started?",
        answer:
          "Request an appointment at (832) 253-2925. We will look at the wall, discuss panel layout and schedule measure and install.",
      },
    ],
    related: ["custom-mirrors", "glass-installation-repair", "custom-shower-enclosures"],
    adsLanding: false,
  },

  // =========================================================================
  // WINDOWS & DOORS
  // =========================================================================
  {
    slug: "windows-and-doors",
    name: "Windows & Doors",
    group: "windows-doors",
    seoTitle: "Window & Door Glass in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Window and door glass in Houston, TX. Replacement panes, door glass and new installs for homes and businesses. Licensed & insured. Get an appointment: (832) 253-2925.",
    h1: "Window & Door Glass in Houston, TX",
    eyebrow: "Windows & Doors",
    cardSummary: "Replacement and new glass for residential and commercial windows and doors.",
    intro:
      "Broken, fogged or outdated window and door glass is everyday work in Houston’s heat and storm seasons. Martinez Orlyn Glass & Mirror replaces panes and insulated units, installs door glass, and handles new openings when a remodel or commercial update needs fresh glass.",
    aeo: {
      question: "Can you replace broken window glass in Houston?",
      answer:
        "Yes. We replace single panes and insulated glass units in residential and commercial windows, and we install glass in doors when the frame and hardware allow. Call (832) 253-2925 to describe the opening and schedule an appointment for measure and replacement.",
      facts: [
        { label: "Work includes", value: "Window panes, IGUs, door glass, new openings" },
        { label: "Property types", value: "Residential and commercial" },
        { label: "Next step", value: "Appointment at (832) 253-2925" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "When to call for window and door glass",
      items: [
        "A pane is cracked, shattered or missing after impact or storm weather",
        "An insulated unit is fogged between the panes",
        "Door glass is damaged and the door slab is otherwise sound",
        "A remodel needs new glass in existing frames",
        "A storefront or office opening needs glass replaced on a schedule",
      ],
    },
    benefits: [
      {
        title: "Right glass for the opening",
        body: "Single pane, tempered or insulated — the unit matches what the frame and code situation require.",
      },
      {
        title: "Residential and commercial",
        body: "Homes, offices and storefronts are all in scope, with scheduling that respects how the space is used.",
      },
      {
        title: "Clean replacement",
        body: "Old glass is removed carefully, the opening prepped, and new glass set and sealed.",
      },
      {
        title: "Tied to related upgrades",
        body: "Double-pane units and solar screens can be discussed in the same appointment when they fit the project.",
      },
    ],
    process: [
      {
        title: "Inspect the opening",
        body: "We identify glass type, frame condition and whether the unit is single or insulated.",
      },
      {
        title: "Measure and specify",
        body: "Exact sizes and glass type are confirmed before fabrication or ordering.",
      },
      {
        title: "Remove and install",
        body: "Damaged glass comes out, the opening is cleaned, and the new glass is set and sealed.",
      },
      {
        title: "Final check",
        body: "We confirm fit, seals and operation of any operable sash or door before closing out.",
      },
    ],
    content: [
      {
        heading: "Houston heat, storms and glass failure",
        paragraphs: [
          "Insulated units in Houston often fail as a fogged airspace long before the frame itself is done. UV, temperature swing and seal age all play a part. Replacing the glass unit restores clarity without replacing the whole window when the frame is still sound.",
          "Impact damage from debris, sports or forced entry is the other common call. Tempered glass in doors and some window locations is a safety requirement — we match the glass type the opening needs rather than substituting a cheaper pane that does not belong there.",
        ],
      },
      {
        heading: "Door glass that keeps the door",
        paragraphs: [
          "When a door slab is fine and only the glass is broken, replacing the glass is usually faster and less disruptive than replacing the entire door. We assess the frame, stops and whether the glass is tempered before quoting the replacement.",
        ],
      },
    ],
    faq: [
      {
        question: "Can you replace just one pane in a double-pane window?",
        answer:
          "Insulated glass is a sealed unit. When the seal fails or one lite breaks, the whole insulated unit is typically replaced rather than a single pane inside the airspace. We will confirm what your window needs on site.",
      },
      {
        question: "Do you work on commercial storefront glass?",
        answer:
          "Yes. Commercial window and door glass — including storefront openings — is part of our glass services. Call (832) 253-2925 to schedule an appointment around business hours when needed.",
      },
      {
        question: "How soon can you replace broken glass?",
        answer:
          "Timing depends on glass type and size. Some common replacements move quickly once measured; specialty tempered or insulated units need fabrication time. We give a realistic schedule at the appointment.",
      },
    ],
    related: ["double-pane-windows", "solar-screens", "glass-installation-repair"],
    adsLanding: true,
  },

  {
    slug: "double-pane-windows",
    name: "Double-Pane Windows",
    group: "windows-doors",
    seoTitle: "Double-Pane Window Glass in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Double-pane window glass in Houston, TX. Insulated glass unit replacement for fogged or failed windows. Licensed & insured. Call (832) 253-2925.",
    h1: "Double-Pane Window Glass in Houston, TX",
    eyebrow: "Windows & Doors",
    cardSummary: "Insulated glass unit replacement when seals fail or panes fog.",
    intro:
      "Double-pane (insulated) glass fails from the inside out — moisture between the lites, a cloudy film, or a broken seal. We replace insulated glass units so the window looks clear again without a full frame replacement when the sash and frame are still sound.",
    aeo: {
      question: "Why is my double-pane window foggy?",
      answer:
        "Fog between the panes means the sealed airspace has failed and moisture has entered the insulated unit. Cleaning the glass faces will not fix it — the insulated glass unit needs to be replaced. Martinez Orlyn Glass & Mirror measures the unit and installs a new double-pane glass package in the existing frame when the frame allows.",
      facts: [
        { label: "Symptom", value: "Fog, haze or moisture between panes" },
        { label: "Fix", value: "Replace the insulated glass unit" },
        { label: "Appointment", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "Signs the insulated unit has failed",
      items: [
        "Persistent fog or haze between the two panes",
        "Water beads or mineral film inside the airspace",
        "One lite cracked while the other is intact",
        "You can see the seal looking collapsed or stained at the edge",
        "The room feels draftier at that window than at matching ones",
      ],
    },
    benefits: [
      {
        title: "Clarity restored",
        body: "A new sealed unit clears the view without replacing the entire window when the frame is good.",
      },
      {
        title: "Matched to the sash",
        body: "Thickness and overall size follow the existing opening so the glass seats correctly.",
      },
      {
        title: "Houston-appropriate glass",
        body: "We specify insulated glass suited to the opening and how the window is used.",
      },
      {
        title: "Less disruption than a full window swap",
        body: "When frames are sound, unit replacement is usually faster and cleaner than tearing out the whole window.",
      },
    ],
    process: [
      {
        title: "Confirm failure type",
        body: "We verify seal failure versus surface dirt and check whether the frame can take a new unit.",
      },
      {
        title: "Measure the IGU",
        body: "Overall size and thickness are taken from the existing unit or opening.",
      },
      {
        title: "Fabricate or order",
        body: "The insulated unit is built to those dimensions.",
      },
      {
        title: "Install and seal",
        body: "The old unit comes out, the new one is set, and glazing is finished cleanly.",
      },
    ],
    content: [
      {
        heading: "When to replace the unit versus the whole window",
        paragraphs: [
          "If the sash operates, the frame is square and rot-free, and only the glass has failed, replacing the insulated unit is usually the practical fix. If the frame is warped, the sash will not lock, or multiple units in the same elevation are failing together, a broader window project may make more sense.",
          "We will tell you which path fits what we see — unit replacement is not pushed when the frame itself is the problem.",
        ],
      },
    ],
    faq: [
      {
        question: "Will cleaning remove fog between double panes?",
        answer:
          "No. Moisture between the panes is inside a sealed unit. The glass package has to be replaced; surface cleaning only helps dirt on the room or exterior faces.",
      },
      {
        question: "Do you replace double-pane glass in older aluminum windows?",
        answer:
          "Often yes, when the sash still accepts an insulated unit of the correct size. We confirm fit and glass type at the appointment.",
      },
      {
        question: "How do I schedule double-pane replacement?",
        answer:
          "Call (832) 253-2925 to request an appointment. We will look at the failed unit, measure, and schedule replacement.",
      },
    ],
    related: ["windows-and-doors", "solar-screens", "reglazing"],
    adsLanding: false,
  },

  {
    slug: "solar-screens",
    name: "Solar Screens",
    group: "windows-doors",
    seoTitle: "Solar Screens in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Solar screens in Houston, TX. Window screens that cut glare and heat while keeping the view. Licensed & insured. Call (832) 253-2925.",
    h1: "Solar Screens in Houston, TX",
    eyebrow: "Windows & Doors",
    cardSummary: "Screens that reduce glare and solar heat on Houston-facing windows.",
    intro:
      "Houston sun loads west- and south-facing glass hard for much of the year. Solar screens cut glare and heat gain while still letting you see out — a practical add-on for homes and offices that already have good windows but need relief from direct sun.",
    aeo: {
      question: "Do solar screens help with Houston heat and glare?",
      answer:
        "Yes. Solar screens are designed to reduce solar heat and glare through windows while maintaining outward visibility. They are a common upgrade on west- and south-facing elevations in Houston where afternoon sun drives up interior temperatures and washes out screens and furniture.",
      facts: [
        { label: "Benefit", value: "Less glare and solar heat at the glass" },
        { label: "Fit", value: "Sized to the window opening" },
        { label: "Contact", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "typographic",
    signals: {
      heading: "When solar screens are worth adding",
      items: [
        "Afternoon sun overheats a room even with the AC running",
        "Glare makes TVs or desks hard to use near the windows",
        "You want heat control without heavy tint that darkens the room at night",
        "Existing insect screens are worn and due for replacement anyway",
        "A commercial office needs comfort on a sun-facing elevation",
      ],
    },
    benefits: [
      {
        title: "Comfort at the glass",
        body: "Screens reduce the solar load that turns a sunny room into a heat trap.",
      },
      {
        title: "View preserved",
        body: "You keep an outward view — solar screens are not blackout treatments.",
      },
      {
        title: "Sized to each opening",
        body: "Frames and mesh are matched to the window so the screen sits correctly.",
      },
      {
        title: "Pairs with glass work",
        body: "Screens can be discussed alongside window glass replacement in the same visit.",
      },
    ],
    process: [
      {
        title: "Identify problem elevations",
        body: "We note which windows take the worst sun and how the openings are framed.",
      },
      {
        title: "Measure openings",
        body: "Each screen is sized to the window it will cover.",
      },
      {
        title: "Build and install",
        body: "Screens are fabricated and set so they seat securely and operate as designed.",
      },
      {
        title: "Confirm fit",
        body: "We check seating and appearance from inside and outside before closing out.",
      },
    ],
    content: [
      {
        heading: "Solar screens versus window tint",
        paragraphs: [
          "Tint films live on the glass; solar screens sit in front of it. Screens are removable for cleaning and do not permanently change the look of the glass at night the way some dark tints do. For many Houston homes, screens are the simpler comfort upgrade on a few hot elevations.",
          "If you are already replacing insulated glass, ask about screens in the same appointment so sun control and glass work are planned together.",
        ],
      },
    ],
    faq: [
      {
        question: "Will solar screens make my rooms too dark?",
        answer:
          "They reduce glare and heat; they do not black out a room like heavy shades. The interior still receives daylight, with less harsh sun on the glass.",
      },
      {
        question: "Can you put solar screens on only some windows?",
        answer:
          "Yes. Many customers screen only the west or south elevations that cause the problem, not every window on the house.",
      },
      {
        question: "How do I request solar screen work?",
        answer:
          "Call (832) 253-2925 to get an appointment. We will look at the openings and discuss screen options for those elevations.",
      },
    ],
    related: ["windows-and-doors", "double-pane-windows", "glass-installation-repair"],
    adsLanding: false,
  },

  // =========================================================================
  // GLASS SERVICES
  // =========================================================================
  {
    slug: "glass-installation-repair",
    name: "Glass Installation & Repair",
    group: "glass-services",
    seoTitle: "Glass Installation & Repair in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass installation and repair in Houston, TX. Residential and commercial glass set, replaced and repaired. Licensed & insured. Get an appointment: (832) 253-2925.",
    h1: "Glass Installation & Repair in Houston, TX",
    eyebrow: "Glass Services",
    cardSummary: "Install new glass and repair damaged glass across homes and businesses.",
    intro:
      "Glass installation and repair covers the jobs that do not fit neatly into one product line — new panels in an existing opening, damaged lite replacement, hardware-related glass fixes, and commercial glass that has to go back in on a schedule. Martinez Orlyn Glass & Mirror handles residential and commercial work across Houston with years of hands-on experience.",
    aeo: {
      question: "Who installs and repairs glass in Houston, TX?",
      answer:
        "Martinez Orlyn Glass & Mirror installs and repairs residential and commercial glass in Houston and nearby communities. Work ranges from replacement panes and custom panels to shower glass, mirrors and storefront openings. Call (832) 253-2925 to request an appointment.",
      facts: [
        { label: "Scope", value: "Install and repair, residential and commercial" },
        { label: "License", value: "Licensed & insured — T189489" },
        { label: "Contact", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "When to call for installation or repair",
      items: [
        "Glass is cracked, shattered or loose in the frame",
        "A remodel needs new glass set into finished openings",
        "Commercial glass has to be replaced with minimal downtime",
        "Hardware failed and the glass needs to be re-hung or re-set",
        "You are unsure whether the job is repair, reglazing or full replacement",
      ],
    },
    benefits: [
      {
        title: "One crew for many glass types",
        body: "Windows, doors, mirrors and bath glass are all within the same hands-on skill set.",
      },
      {
        title: "Repair when repair is enough",
        body: "We will not push a full replacement when a sound repair or single-panel swap solves it.",
      },
      {
        title: "Licensed and insured",
        body: "Family-owned Houston company, license T189489, working residential and commercial properties.",
      },
      {
        title: "Clear scheduling",
        body: "Appointments are set around the property — call (832) 253-2925 to start.",
      },
    ],
    process: [
      {
        title: "Describe the problem",
        body: "Phone or form intake covers what failed, where it is, and whether the space is home or business.",
      },
      {
        title: "On-site assessment",
        body: "We inspect the glass, frame and hardware and explain repair versus replacement.",
      },
      {
        title: "Fabricate or source",
        body: "Glass is cut or ordered to the opening with the correct type and thickness.",
      },
      {
        title: "Install or repair",
        body: "Work is completed, cleaned up, and checked with you before we leave.",
      },
    ],
    content: [
      {
        heading: "Residential glass repair across the metro",
        paragraphs: [
          "Houston homes see the full range — storm impact, accidental breakage, failed insulated units and remodel installs. Repair starts with identifying what is actually wrong: the glass, the seal, or the frame. That diagnosis is what keeps a small repair from turning into an unnecessary full tear-out.",
        ],
      },
      {
        heading: "Commercial glass on a schedule",
        paragraphs: [
          "Storefronts and offices often need glass work outside peak customer hours. We plan the appointment around access, safety and how long an opening can stay boarded or closed. Tell us the constraints up front so the schedule matches the business.",
        ],
      },
    ],
    faq: [
      {
        question: "Do you repair glass or only replace it?",
        answer:
          "Both. When a repair will hold and looks correct, we repair. When the glass is failed, unsafe or the wrong type for the opening, we replace it with the proper unit.",
      },
      {
        question: "Are you insured for commercial sites?",
        answer:
          "Yes. Martinez Orlyn Glass & Mirror is licensed and insured (T189489) and works residential and commercial properties.",
      },
      {
        question: "How do I request glass installation or repair?",
        answer:
          "Call (832) 253-2925, use WhatsApp, or request an appointment on the site. Describe the opening and we will schedule the next step.",
      },
    ],
    related: ["reglazing", "windows-and-doors", "custom-shower-enclosures"],
    adsLanding: true,
  },

  {
    slug: "reglazing",
    name: "Reglazing",
    group: "glass-services",
    seoTitle: "Window Reglazing in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Window and door reglazing in Houston, TX. Failed glazing compound and loose panes reset with fresh glass or seals. Call (832) 253-2925.",
    h1: "Window & Door Reglazing in Houston, TX",
    eyebrow: "Glass Services",
    cardSummary: "Reset loose panes and failed glazing so openings seal and look finished again.",
    intro:
      "Reglazing is the work of removing failed putty or stops, seating glass correctly, and sealing the perimeter so the pane is secure and weather-tight. It is the right path when the glass is still good but the glazing that holds it has dried, cracked or pulled away.",
    aeo: {
      question: "What does window reglazing mean?",
      answer:
        "Reglazing means removing failed glazing compound or stops, resetting the glass in the opening, and resealing the perimeter so the pane is secure and weather-tight. It is used when the glass itself is still sound but the material that holds it has failed — common on older wood and some metal windows in Houston.",
      facts: [
        { label: "Goal", value: "Secure, sealed glass in an existing sash or frame" },
        { label: "Often paired with", value: "Pane replacement when glass is also damaged" },
        { label: "Contact", value: "(832) 253-2925" },
      ],
    },
    heroVariant: "image-right",
    signals: {
      heading: "When reglazing is the job",
      items: [
        "Putty or glazing compound is cracked, missing or pulling away from the glass",
        "A pane rattles or has shifted in the sash",
        "Water is getting in at the glass edge while the pane itself is intact",
        "Stops are loose and the glass needs to be re-set",
        "An older window needs glass secured before paint or frame work continues",
      ],
    },
    benefits: [
      {
        title: "Keep good glass when it is still good",
        body: "Reglazing saves a sound pane instead of replacing glass that has not failed.",
      },
      {
        title: "Weather seal restored",
        body: "Fresh glazing closes the path water and air were using at the edge of the glass.",
      },
      {
        title: "Honest scope",
        body: "If the pane is cracked, we switch to replacement rather than reglazing failed glass.",
      },
      {
        title: "Fits older Houston stock",
        body: "Many older wood and metal windows need this work more than a full modern window swap.",
      },
    ],
    process: [
      {
        title: "Inspect glazing and glass",
        body: "We check whether the pane is intact and how the existing glazing has failed.",
      },
      {
        title: "Remove failed material",
        body: "Old putty, stops or sealant come out carefully so the opening is clean.",
      },
      {
        title: "Re-seat and seal",
        body: "Glass is set correctly and new glazing is applied to secure and weather the edge.",
      },
      {
        title: "Finish",
        body: "Surfaces are cleaned and the opening is left ready for paint if the project includes it.",
      },
    ],
    content: [
      {
        heading: "Reglazing versus insulated unit replacement",
        paragraphs: [
          "Reglazing addresses how glass is held and sealed in a sash. Replacing a fogged double-pane unit is a different job — the sealed insulated package comes out as one piece. Older single-pane windows are the usual candidates for classic reglazing; modern insulated windows more often need unit replacement.",
          "On site we will say which problem you actually have so you are not paying for the wrong fix.",
        ],
      },
    ],
    faq: [
      {
        question: "Is reglazing the same as replacing the window?",
        answer:
          "No. Reglazing keeps the sash or frame and resets the glass and seal. Full window replacement removes the entire unit. We recommend reglazing when the frame is sound and only the glazing has failed.",
      },
      {
        question: "Can you reglaze if the glass is cracked?",
        answer:
          "If the glass is cracked, it should be replaced, then glazed into the opening. Reglazing alone does not make damaged glass safe or weather-tight.",
      },
      {
        question: "How do I schedule reglazing?",
        answer:
          "Call (832) 253-2925 to request an appointment. We will inspect the opening and confirm whether reglazing, glass replacement or both are needed.",
      },
    ],
    related: ["glass-installation-repair", "windows-and-doors", "double-pane-windows"],
    adsLanding: false,
  },
];

/** Hero image and gallery come from imported company job photos. */
export const services: Service[] = drafts.map((draft) => ({
  ...draft,
  heroImage: heroFor(draft.slug),
  gallery: mediaFor(draft.slug).slice(0, 8),
}));

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByGroup(id: Service["group"]): Service[] {
  return services.filter((s) => s.group === id);
}

/** Options for the estimate / appointment form's service dropdown. */
export const serviceOptions = [...services.map((s) => s.name), "Other"];
