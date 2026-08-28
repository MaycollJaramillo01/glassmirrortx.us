#!/usr/bin/env python3
"""Generate gallery.ts, service-media.ts, and photos.ts from classified imports."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GALLERY = ROOT / "public/images/gallery"

ITEMS = [
    {"file": "raw-002.webp", "category": "custom-mirrors", "quality": 5, "description": "Two dark-framed vanity mirrors flanking tiled wall"},
    {"file": "raw-003.webp", "category": "custom-mirrors", "quality": 4, "description": "Large frameless vanity mirror above double sink"},
    {"file": "raw-006.webp", "category": "glass-installation-repair", "quality": 4, "description": "Built-in bar with glass cabinet doors and shelves"},
    {"file": "raw-007.webp", "category": "glass-installation-repair", "quality": 4, "description": "Kitchen cabinets with glass doors and glass shelves"},
    {"file": "raw-008.webp", "category": "glass-installation-repair", "quality": 4, "description": "Kitchen upper cabinets with decorative frosted glass"},
    {"file": "raw-010.webp", "category": "custom-mirrors", "quality": 4, "description": "Large frameless vanity mirror above blue cabinets"},
    {"file": "raw-011.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower and ornate framed vanity mirror"},
    {"file": "raw-012.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with black-framed vanity mirrors"},
    {"file": "raw-013.webp", "category": "custom-mirrors", "quality": 5, "description": "Large beveled vanity mirror over double sink"},
    {"file": "raw-014.webp", "category": "glass-installation-repair", "quality": 5, "description": "Custom glass shelves on brass pipe bar rack"},
    {"file": "raw-015.webp", "category": "custom-mirrors", "quality": 5, "description": "Multi-panel angled vanity mirrors over granite counter"},
    {"file": "raw-016.webp", "category": "custom-showers", "quality": 5, "description": "Frameless corner shower with chrome hardware"},
    {"file": "raw-017.webp", "category": "custom-showers", "quality": 4, "description": "Neo-angle frameless shower beside vanity mirror"},
    {"file": "raw-018.webp", "category": "custom-showers", "quality": 5, "description": "Frameless neo-angle shower with marble tile interior"},
    {"file": "raw-021.webp", "category": "windows-and-doors", "quality": 4, "description": "Black-framed bifold glass garage doors on barn"},
    {"file": "raw-022.webp", "category": "glass-installation-repair", "quality": 4, "description": "Commercial transaction window with pass-through slots"},
    {"file": "raw-023.webp", "category": "windows-and-doors", "quality": 4, "description": "Large black-framed multi-pane exterior window"},
    {"file": "raw-024.webp", "category": "windows-and-doors", "quality": 4, "description": "Two-story residential exterior windows with brown trim"},
    {"file": "raw-025.webp", "category": "windows-and-doors", "quality": 5, "description": "Black-framed sliding patio doors to modern kitchen"},
    {"file": "raw-026.webp", "category": "windows-and-doors", "quality": 5, "description": "Black entry doors with textured privacy glass"},
    {"file": "raw-027.webp", "category": "windows-and-doors", "quality": 5, "description": "Black-framed sliding balcony doors with ocean view"},
    {"file": "raw-029.webp", "category": "windows-and-doors", "quality": 5, "description": "French doors and large grid window in modern room"},
    {"file": "raw-030.webp", "category": "windows-and-doors", "quality": 5, "description": "Floor-to-ceiling windows and black patio doors"},
    {"file": "raw-031.webp", "category": "windows-and-doors", "quality": 4, "description": "Arched-top window installed in brick exterior wall"},
    {"file": "raw-032.webp", "category": "windows-and-doors", "quality": 4, "description": "Arched kitchen window above sink with yard view"},
    {"file": "raw-033.webp", "category": "solar-screens", "quality": 4, "description": "Three windows with exterior solar screens on brick"},
    {"file": "raw-035.webp", "category": "windows-and-doors", "quality": 5, "description": "Three large vertical fixed windows overlooking backyard"},
    {"file": "raw-039.webp", "category": "glass-installation-repair", "quality": 3, "description": "Commercial corner storefront glass wall installation"},
    {"file": "raw-043.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with chrome hardware and gray tile"},
    {"file": "raw-044.webp", "category": "shower-doors", "quality": 5, "description": "Sliding glass shower door with gold hardware track"},
    {"file": "raw-045.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with pony wall glass panel"},
    {"file": "raw-048.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with bronze hardware and marble tile"},
    {"file": "raw-049.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with gold hardware and marble bench"},
    {"file": "raw-051.webp", "category": "custom-showers", "quality": 5, "description": "Frameless glass shower enclosure over bathtub"},
    {"file": "raw-055.webp", "category": "custom-showers", "quality": 4, "description": "Frameless shower with brushed nickel hardware"},
    {"file": "raw-056.webp", "category": "custom-showers", "quality": 4, "description": "Frameless corner shower with gold hardware"},
    {"file": "raw-057.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with herringbone tile walls"},
    {"file": "raw-058.webp", "category": "shower-doors", "quality": 5, "description": "Black-framed sliding tub shower doors with gold fixtures"},
    {"file": "raw-061.webp", "category": "custom-showers", "quality": 4, "description": "Frameless shower with matte black hardware and pony wall"},
    {"file": "raw-062.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with brass hardware and window"},
    {"file": "raw-064.webp", "category": "shower-doors", "quality": 5, "description": "Frameless shower door with marble tile interior"},
    {"file": "raw-065.webp", "category": "glass-installation-repair", "quality": 4, "description": "Closet cabinet doors with clear glass inserts"},
    {"file": "raw-066.webp", "category": "glass-installation-repair", "quality": 4, "description": "Built-in cabinet with tall clear glass doors"},
    {"file": "raw-068.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with matte black hardware"},
    {"file": "raw-070.webp", "category": "windows-and-doors", "quality": 5, "description": "Black-framed sliding patio door reflecting pool"},
    {"file": "raw-071.webp", "category": "windows-and-doors", "quality": 5, "description": "Large black sliding patio doors on covered porch"},
    {"file": "raw-073.webp", "category": "custom-showers", "quality": 5, "description": "Frameless shower with glass cut around marble bench"},
    {"file": "raw-075.webp", "category": "custom-showers", "quality": 4, "description": "Frameless bathtub glass enclosure with marble tile"},
    {"file": "raw-076.webp", "category": "solar-screens", "quality": 4, "description": "Double window with solar screens and shutters"},
    {"file": "raw-077.webp", "category": "double-pane-windows", "quality": 4, "description": "White double-pane window in red brick wall"},
    {"file": "raw-078.webp", "category": "solar-screens", "quality": 4, "description": "Window with solar screen on left pane only"},
    {"file": "raw-079.webp", "category": "double-pane-windows", "quality": 4, "description": "White vinyl double-pane window in brick wall"},
    {"file": "raw-080.webp", "category": "windows-and-doors", "quality": 4, "description": "Single white-framed window with louvered shutters"},
    {"file": "raw-082.webp", "category": "shower-doors", "quality": 5, "description": "Matte black barn-style sliding shower door system"},
    {"file": "raw-083.webp", "category": "shower-doors", "quality": 5, "description": "Sliding glass shower doors with matte black hardware"},
    {"file": "raw-084.webp", "category": "glass-installation-repair", "quality": 5, "description": "Commercial storefront glass for law firm building"},
]

CAT_LABEL = {
    "custom-showers": "Custom Showers",
    "shower-doors": "Shower Doors",
    "custom-mirrors": "Mirrors",
    "mirrored-walls": "Mirrors",
    "windows-and-doors": "Windows & Glass",
    "double-pane-windows": "Windows & Glass",
    "solar-screens": "Solar Screens",
    "glass-installation-repair": "Glass Services",
    "reglazing": "Glass Services",
}

GROUP = {
    "custom-showers": "bathroom-glass",
    "shower-doors": "bathroom-glass",
    "custom-mirrors": "mirrors-glass",
    "mirrored-walls": "mirrors-glass",
    "windows-and-doors": "windows-doors",
    "double-pane-windows": "windows-doors",
    "solar-screens": "windows-doors",
    "glass-installation-repair": "glass-services",
    "reglazing": "glass-services",
}

SERVICE_FOR = {
    "custom-showers": "custom-shower-enclosures",
    "shower-doors": "shower-doors",
    "custom-mirrors": "custom-mirrors",
    "mirrored-walls": "mirrored-walls",
    "windows-and-doors": "windows-and-doors",
    "double-pane-windows": "double-pane-windows",
    "solar-screens": "solar-screens",
    "glass-installation-repair": "glass-installation-repair",
    "reglazing": "reglazing",
}

ORDER = [
    "Custom Showers",
    "Shower Doors",
    "Mirrors",
    "Windows & Glass",
    "Solar Screens",
    "Glass Services",
]

HERO_BY_SERVICE = {
    "custom-shower-enclosures": "custom-showers-057.webp",
    "shower-doors": "shower-doors-082.webp",
    "custom-mirrors": "custom-mirrors-013.webp",
    "mirrored-walls": "custom-mirrors-015.webp",
    "windows-and-doors": "windows-and-doors-030.webp",
    "double-pane-windows": "double-pane-windows-077.webp",
    "solar-screens": "solar-screens-033.webp",
    "glass-installation-repair": "glass-installation-repair-084.webp",
    "reglazing": "double-pane-windows-079.webp",
}

SITE_PHOTOS = {
    "heroGlass": "windows-and-doors-030.webp",
    "aboutShop": "glass-installation-repair-084.webp",
    "showerEnclosure": "custom-showers-057.webp",
    "showerDoor": "shower-doors-082.webp",
    "showerEnclosureAlt": "shower-doors-082.webp",
    "mirrorInstall": "custom-mirrors-015.webp",
    "mirrorInstallAlt": "custom-mirrors-002.webp",
    "mirrorWall": "custom-mirrors-015.webp",
    "howWeWork": "custom-mirrors-010.webp",
    "windowGlass": "windows-and-doors-025.webp",
    "windowGlassAlt": "double-pane-windows-077.webp",
    "solarScreen": "solar-screens-033.webp",
    "glassWork": "glass-installation-repair-084.webp",
    "glassWorkAlt": "glass-installation-repair-014.webp",
    "reglazing": "double-pane-windows-079.webp",
}


def path_for(item: dict) -> str:
    num = item["file"].replace("raw-", "").replace(".webp", "")
    return f"/images/gallery/{item['category']}-{num}.webp"


def dims(path: str) -> tuple[int, int]:
    from PIL import Image

    im = Image.open(ROOT / "public" / path.lstrip("/"))
    return im.size


def ts_string(s: str) -> str:
    return json.dumps(s)


def main() -> None:
    selected = [i for i in ITEMS if i["quality"] >= 4]
    for item in selected:
        item["src"] = path_for(item)
        item["galleryCategory"] = CAT_LABEL[item["category"]]
        w, h = dims(item["src"])
        item["width"], item["height"] = w, h

    selected.sort(
        key=lambda x: (ORDER.index(x["galleryCategory"]), -x["quality"], x["file"])
    )

    # gallery.ts
    gallery_lines = [
        'import type { BeforeAfterItem, GalleryItem } from "@/types";',
        "",
        "/** Gallery filters follow work type, in display order. */",
        "export const galleryCategories = [",
        '  "All",',
    ]
    for cat in ORDER:
        gallery_lines.append(f'  "{cat}",')
    gallery_lines += [
        "] as const;",
        "",
        "/**",
        " * Company job photos from the previous glassmirrortx.us gallery.",
        " * Ordered by work type: showers, shower doors, mirrors, windows, solar screens, glass services.",
        " */",
        "export const galleryItems: GalleryItem[] = [",
    ]
    for item in selected:
        gallery_lines.append("  {")
        gallery_lines.append(f'    src: {ts_string(item["src"])},')
        gallery_lines.append(
            f'    alt: {ts_string("Martinez Orlyn Glass & Mirror — " + item["description"])},'
        )
        gallery_lines.append(f'    width: {item["width"]},')
        gallery_lines.append(f'    height: {item["height"]},')
        gallery_lines.append(f'    category: {ts_string(item["galleryCategory"])},')
        gallery_lines.append(f'    caption: {ts_string(item["description"])},')
        gallery_lines.append(f'    serviceSlug: {ts_string(SERVICE_FOR[item["category"]])},')
        gallery_lines.append("  },")
    gallery_lines += [
        "];",
        "",
        "/** Before/after pairs — add real pairs when documented photos are available. */",
        "export const beforeAfterItems: BeforeAfterItem[] = [];",
        "",
    ]
    (ROOT / "data/gallery.ts").write_text("\n".join(gallery_lines))

    # service-media.ts
    media_lines = [
        'import type { ServiceMedia } from "@/types";',
        "",
        "/** Per-service job photos sourced from the company gallery. */",
        "export const serviceMedia: ServiceMedia[] = [",
    ]
    for item in selected:
        media_lines.append("  {")
        media_lines.append(f'    src: {ts_string(item["src"])},')
        media_lines.append(f'    group: {ts_string(GROUP[item["category"]])},')
        media_lines.append(f'    service: {ts_string(SERVICE_FOR[item["category"]])},')
        media_lines.append(f'    width: {item["width"]},')
        media_lines.append(f'    height: {item["height"]},')
        media_lines.append("  },")
    media_lines += ["];", ""]
    (ROOT / "data/service-media.ts").write_text("\n".join(media_lines))

    # photos.ts lookup table
    by_file = {Path(p).name: item for item in selected for p in [item["src"]]}
    photo_lines = [
        'import type { Photo } from "@/types";',
        "",
        "/**",
        " * Site-wide photography: real Martinez Orlyn Glass & Mirror job photos",
        " * selected from the previous website gallery.",
        " */",
        "export const photos = {",
    ]
    for key, fname in SITE_PHOTOS.items():
        item = by_file.get(fname)
        if not item:
            raise SystemExit(f"missing site photo {fname}")
        photo_lines.append(f"  {key}: {{")
        photo_lines.append(f'    src: {ts_string(item["src"])},')
        photo_lines.append(
            f'    alt: {ts_string("Martinez Orlyn Glass & Mirror — " + item["description"])},'
        )
        photo_lines.append(f"    width: {item['width']},")
        photo_lines.append(f"    height: {item['height']},")
        photo_lines.append("  },")
    photo_lines += ["} as const satisfies Record<string, Photo>;", ""]
    (ROOT / "data/photos.ts").write_text("\n".join(photo_lines))

    print(f"Generated {len(selected)} gallery items")


if __name__ == "__main__":
    main()
