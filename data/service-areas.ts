import type { ServiceArea } from "@/types";

/**
 * Location pages.
 *
 * Each entry is written individually. No string here is a template with a city
 * name substituted in — that is a doorway page and it is exactly what this file
 * exists to avoid.
 *
 * Geographic context is limited to facts that are stable and verifiable
 * (county, highway corridors, relative position). No page claims a completed
 * job, a customer or a review in a specific city.
 */

export const serviceAreas: ServiceArea[] = [
  {
    slug: "houston-tx",
    city: "Houston",
    state: "Texas",
    stateCode: "TX",
    county: "Harris County",
    distanceMiles: 0,
    seoTitle: "Glass & Mirror Company in Houston, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror company in Houston, TX. Custom showers, mirrors, windows and glass repair for homes and businesses. Licensed & insured. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Houston, TX",
    eyebrow: "Harris County • Our Home Base",
    intro:
      "Houston is where Martinez Orlyn Glass & Mirror is based, and it is the ground we work most. From inside the Loop to the energy corridors and neighborhood remodels across Harris County, we fabricate and install shower glass, custom mirrors, window glass and commercial glass for residential and commercial properties.",
    context: {
      heading: "Working in Houston",
      paragraphs: [
        "Houston’s glass work follows how the city grows. Inside the Loop and in established neighborhoods, bath remodels and custom vanity mirrors are constant — older homes getting new tile and glass that has to fit openings that were never standard. Along the west and north corridors, newer construction and commercial fit-outs call for shower enclosures, storefront glass and mirrored walls sized to the plan.",
        "Heat and storm seasons matter here. Insulated window units fog, door glass takes impact, and west-facing rooms need solar screens as often as they need new panes. Being based in Houston means appointments are local work, not a long drive from another metro.",
        "We are a family-owned company, licensed and insured (T189489), with years of hands-on experience. Call (832) 253-2925 to get an appointment for glass or mirror work anywhere in the city.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "Bath remodels across Houston’s older and newer housing stock need glass cut to the finished curb and walls, not a kit from the aisle.",
      },
      {
        slug: "custom-mirrors",
        note: "Vanity and wall mirrors sized to sconces and double vanities are a steady residential request inside the city.",
      },
      {
        slug: "glass-installation-repair",
        note: "Broken panes, failed insulated units and commercial glass repair are everyday Houston calls — residential and storefront alike.",
      },
    ],
    nearbyAreas: ["katy-tx", "sugar-land-tx", "cypress-tx", "spring-tx", "humble-tx"],
    faq: [
      {
        question: "Are you based in Houston?",
        answer:
          "Yes. Martinez Orlyn Glass & Mirror is based in Houston, TX, and works outward across the metro. Houston jobs are local appointments for us.",
      },
      {
        question: "Do you serve both homes and businesses in Houston?",
        answer:
          "Yes. We install and repair glass and mirrors for residential and commercial properties — showers, mirrors, windows, doors and storefront openings.",
      },
      {
        question: "How do I get an appointment in Houston?",
        answer:
          "Call (832) 253-2925 or request an appointment through the site. We will confirm the project details and set a time to measure or discuss the work.",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes. We are licensed and insured (license T189489), family-owned, with years of hands-on glass and mirror experience.",
      },
    ],
  },

  {
    slug: "katy-tx",
    city: "Katy",
    state: "Texas",
    stateCode: "TX",
    county: "Harris / Fort Bend County",
    distanceMiles: 30,
    seoTitle: "Glass & Mirror Services in Katy, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Katy, TX. Custom showers, mirrors and window glass for west Houston corridor homes and businesses. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Katy, TX",
    eyebrow: "Harris / Fort Bend • ~30 miles",
    intro:
      "Katy sits on Houston’s western growth edge along I-10, where master-planned neighborhoods and commercial strips keep bath remodels and new glass installs in steady demand. Martinez Orlyn Glass & Mirror serves Katy from our Houston base with custom shower enclosures, mirrors, window glass and glass repair.",
    context: {
      heading: "Working in Katy",
      paragraphs: [
        "Katy’s housing stock mixes newer subdivisions with established west-side neighborhoods. Primary baths in recent builds often need frameless shower glass once tile is finished; older homes along the I-10 corridor more often call for vanity mirrors, door glass and insulated unit replacement when seals fail in the heat.",
        "Commercial glass follows the same corridor — retail and office fronts along the freeway and town-center areas need storefront and interior glass that can be scheduled around business hours. Drive time from Houston is practical for appointments across Katy and nearby Fort Bend edges.",
        "Whether the job is a custom enclosure in a new primary bath or a fogged double-pane on a west-facing elevation, call (832) 253-2925 to request an appointment.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "New and remodeled primary baths in Katy’s planned communities are a frequent fit for custom frameless and framed enclosures.",
      },
      {
        slug: "windows-and-doors",
        note: "West-facing glass and storm-season breakage keep window and door glass replacement active along the I-10 corridor.",
      },
      {
        slug: "custom-mirrors",
        note: "Wide vanities and designer baths need mirrors cut to the wall between sconces rather than stock sizes.",
      },
    ],
    nearbyAreas: ["houston-tx", "sugar-land-tx", "cypress-tx"],
    faq: [
      {
        question: "Do you serve Katy from Houston?",
        answer:
          "Yes. Katy is roughly thirty miles west of our Houston base along the I-10 corridor and is a regular service area for shower glass, mirrors and window work.",
      },
      {
        question: "Can you install frameless shower glass in Katy homes?",
        answer:
          "Yes. We measure finished openings, fabricate custom enclosures and install frameless or framed systems. Call (832) 253-2925 to schedule.",
      },
      {
        question: "Do you work on commercial glass in Katy?",
        answer:
          "Yes. Commercial window, door and interior glass are part of what we do for businesses along the west Houston corridor.",
      },
      {
        question: "How do I book an appointment in Katy?",
        answer:
          "Call (832) 253-2925 or request an appointment online. We will confirm the address and project type, then set a measure or consult time.",
      },
    ],
  },

  {
    slug: "sugar-land-tx",
    city: "Sugar Land",
    state: "Texas",
    stateCode: "TX",
    county: "Fort Bend County",
    distanceMiles: 20,
    seoTitle: "Glass & Mirror Services in Sugar Land, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Sugar Land, TX. Custom showers, mirrors and glass repair for Fort Bend homes and businesses. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Sugar Land, TX",
    eyebrow: "Fort Bend County • ~20 miles",
    intro:
      "Sugar Land sits southwest of Houston in Fort Bend County, close enough for straightforward appointments and established enough that bath upgrades, custom mirrors and window glass replacement are regular work. Martinez Orlyn Glass & Mirror serves Sugar Land residential and commercial properties from our Houston base.",
    context: {
      heading: "Working in Sugar Land",
      paragraphs: [
        "Sugar Land’s neighborhoods — from Town Square–adjacent areas to the planned communities farther west — see a lot of interior remodeling. Glass follows tile: once a shower curb and walls are finished, custom enclosure glass has to fit openings that rarely match a stock kit. Vanity mirrors sized to furniture-style baths are another frequent Fort Bend request.",
        "US-59 / I-69 and Highway 6 put Sugar Land within a practical drive from Houston. That proximity matters for measure-and-install sequences where fabrication depends on accurate field dimensions after the bath or window opening is ready.",
        "Commercial interiors and storefront glass in Sugar Land’s business districts are also in scope. Call (832) 253-2925 to get an appointment for glass or mirror work.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "Finished primary baths in Sugar Land remodels need enclosure glass measured to the curb after tile is set.",
      },
      {
        slug: "mirrored-walls",
        note: "Home gyms, studios and feature walls in larger Fort Bend homes often call for full mirrored panels.",
      },
      {
        slug: "double-pane-windows",
        note: "Failed insulated units — fog between the panes — are a common heat-related call on established Sugar Land elevations.",
      },
    ],
    nearbyAreas: ["houston-tx", "katy-tx", "alvin-tx"],
    faq: [
      {
        question: "Is Sugar Land in your service area?",
        answer:
          "Yes. Sugar Land is about twenty miles from our Houston base in Fort Bend County and is a regular area for glass and mirror appointments.",
      },
      {
        question: "Do you fabricate custom shower enclosures for Sugar Land homes?",
        answer:
          "Yes. We measure on site, fabricate to the opening and install frameless or framed enclosures. Call (832) 253-2925 to schedule.",
      },
      {
        question: "Can you replace fogged double-pane windows in Sugar Land?",
        answer:
          "Yes. When the frame is sound, we replace the insulated glass unit so the window clears without a full window replacement.",
      },
      {
        question: "How do I request an appointment?",
        answer:
          "Call (832) 253-2925 or use the appointment request on the site. We will confirm the Sugar Land address and what glass or mirror work you need.",
      },
    ],
  },

  {
    slug: "cypress-tx",
    city: "Cypress",
    state: "Texas",
    stateCode: "TX",
    county: "Harris County",
    distanceMiles: 25,
    seoTitle: "Glass & Mirror Services in Cypress, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Cypress, TX. Shower glass, mirrors and window work for northwest Houston corridor homes. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Cypress, TX",
    eyebrow: "Harris County • ~25 miles",
    intro:
      "Cypress sits northwest of Houston along the US-290 corridor, where growth has piled newer subdivisions onto ground that still includes older acreage homes. Martinez Orlyn Glass & Mirror serves Cypress with custom shower glass, mirrors, window and door glass, and glass repair.",
    context: {
      heading: "Working in Cypress",
      paragraphs: [
        "Northwest Harris County builds fast. New primary baths need custom enclosures once stone and tile are finished; older Cypress homes more often need door glass, vanity mirrors and insulated units that have fogged after years of Houston heat. Both show up on the same week’s schedule.",
        "US-290 and the Beltway put Cypress within a workable drive from Houston for measure appointments and installs. Solar screens on west-facing elevations are a practical add-on in this corridor, where afternoon sun loads glass hard through the long warm season.",
        "Residential is the bulk of Cypress work, with commercial glass for local offices and storefronts as needed. Call (832) 253-2925 to get an appointment.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "New northwest Harris County builds and remodels need shower glass cut after the curb and walls are finished.",
      },
      {
        slug: "solar-screens",
        note: "West-facing rooms along the 290 corridor often need solar screens for glare and heat as much as they need new glass.",
      },
      {
        slug: "glass-installation-repair",
        note: "Broken panes and loose glazing on established Cypress homes are routine repair appointments from Houston.",
      },
    ],
    nearbyAreas: ["houston-tx", "spring-tx", "tomball-tx", "katy-tx"],
    faq: [
      {
        question: "Do you serve Cypress, TX?",
        answer:
          "Yes. Cypress is about twenty-five miles northwest of Houston along the US-290 corridor and is part of our regular service area.",
      },
      {
        question: "Can you install custom mirrors in Cypress homes?",
        answer:
          "Yes. Vanity and wall mirrors are cut to size and installed. Call (832) 253-2925 to schedule a measure.",
      },
      {
        question: "Do you offer solar screens in Cypress?",
        answer:
          "Yes. Solar screens sized to the opening help with glare and heat on sun-facing elevations common in northwest Houston.",
      },
      {
        question: "How do I book glass work in Cypress?",
        answer:
          "Request an appointment at (832) 253-2925. We will confirm the address and set a time that works for the property.",
      },
    ],
  },

  {
    slug: "spring-tx",
    city: "Spring",
    state: "Texas",
    stateCode: "TX",
    county: "Harris / Montgomery County",
    distanceMiles: 25,
    seoTitle: "Glass & Mirror Services in Spring, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Spring, TX. Custom showers, mirrors and glass repair for north Houston and southern Montgomery County. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Spring, TX",
    eyebrow: "Harris / Montgomery • ~25 miles",
    intro:
      "Spring sits north of Houston where Harris County meets Montgomery County along I-45. Martinez Orlyn Glass & Mirror serves Spring homes and businesses with shower enclosures, custom mirrors, window glass and glass installation and repair.",
    context: {
      heading: "Working in Spring",
      paragraphs: [
        "Spring’s mix of older neighborhoods and newer north-corridor subdivisions drives two kinds of glass work. Remodels in established streets need vanity mirrors and shower doors that fit non-standard openings; newer builds need frameless enclosures and large mirrors once the bath is tiled.",
        "I-45 North makes Spring a practical run from Houston for appointments. Commercial glass for offices and retail along the freeway and FM corridors is also in scope when a storefront or interior needs replacement glass on a schedule.",
        "If you are renovating a bath or replacing failed window glass in Spring, call (832) 253-2925 to request an appointment.",
      ],
    },
    featuredServices: [
      {
        slug: "shower-doors",
        note: "Tub-to-shower conversions and compact baths in Spring often need bypass or hinged doors that fit the opening.",
      },
      {
        slug: "custom-mirrors",
        note: "Bath and entry mirrors cut to the wall are a frequent residential request north of Houston.",
      },
      {
        slug: "windows-and-doors",
        note: "Impact damage and fogged insulated units keep window and door glass replacement active along the I-45 corridor.",
      },
    ],
    nearbyAreas: ["houston-tx", "cypress-tx", "tomball-tx", "conroe-tx", "humble-tx"],
    faq: [
      {
        question: "Is Spring in your coverage area?",
        answer:
          "Yes. Spring is roughly twenty-five miles north of Houston on the Harris–Montgomery line and is a regular area for glass and mirror appointments.",
      },
      {
        question: "Do you install shower doors in Spring?",
        answer:
          "Yes. Bypass, hinged and pivot shower doors are measured and installed to the finished opening. Call (832) 253-2925 to schedule.",
      },
      {
        question: "Can you repair commercial glass in Spring?",
        answer:
          "Yes. Commercial window, door and interior glass repair and replacement are part of our glass services.",
      },
      {
        question: "How do I get an appointment in Spring?",
        answer:
          "Call (832) 253-2925 or request an appointment through the site with your Spring address and project details.",
      },
    ],
  },

  {
    slug: "tomball-tx",
    city: "Tomball",
    state: "Texas",
    stateCode: "TX",
    county: "Harris County",
    distanceMiles: 30,
    seoTitle: "Glass & Mirror Services in Tomball, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Tomball, TX. Shower glass, mirrors and window work for northwest Harris County. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Tomball, TX",
    eyebrow: "Harris County • ~30 miles",
    intro:
      "Tomball sits on Houston’s northwest edge along SH-249, with a historic downtown core and surrounding neighborhoods that keep bath glass, mirrors and window work in demand. Martinez Orlyn Glass & Mirror serves Tomball from Houston with residential and commercial glass and mirror services.",
    context: {
      heading: "Working in Tomball",
      paragraphs: [
        "Tomball’s older downtown and mid-century homes often need reglazing, door glass and vanity mirrors that fit rooms built before stock sizes became the default. Newer neighborhoods toward the SH-249 corridor lean toward custom shower enclosures and larger mirrored walls in remodeled primaries.",
        "Thirty miles from Houston is still a practical appointment distance for measure-and-install work. Commercial interiors and storefront glass along Main Street and the highway commercial strips are included when businesses need glass replaced with limited downtime.",
        "Call (832) 253-2925 to request an appointment for shower glass, mirrors or window work in Tomball.",
      ],
    },
    featuredServices: [
      {
        slug: "reglazing",
        note: "Older Tomball windows often need panes re-set and sealed when putty has failed but the glass is still sound.",
      },
      {
        slug: "custom-shower-enclosures",
        note: "Remodeled baths in newer Tomball neighborhoods need enclosure glass fabricated to the finished opening.",
      },
      {
        slug: "custom-mirrors",
        note: "Custom vanity and wall mirrors are a natural fit for both historic-core updates and new primary baths.",
      },
    ],
    nearbyAreas: ["cypress-tx", "spring-tx", "houston-tx", "conroe-tx"],
    faq: [
      {
        question: "Do you travel to Tomball for glass work?",
        answer:
          "Yes. Tomball is about thirty miles northwest of Houston along SH-249 and is within our service area for residential and commercial glass.",
      },
      {
        question: "Can you reglaze older windows in Tomball?",
        answer:
          "Yes, when the glass is intact and the frame can take new glazing. If the pane is cracked, we replace the glass and glaze it into the opening.",
      },
      {
        question: "Do you install mirrored walls in Tomball?",
        answer:
          "Yes. Full mirrored wall panels for homes and studios are fabricated and installed. Call (832) 253-2925 to schedule.",
      },
      {
        question: "How do I book an appointment in Tomball?",
        answer:
          "Call (832) 253-2925 or request an appointment online. We will confirm the project and set a measure or consult time.",
      },
    ],
  },

  {
    slug: "humble-tx",
    city: "Humble",
    state: "Texas",
    stateCode: "TX",
    county: "Harris County",
    distanceMiles: 20,
    seoTitle: "Glass & Mirror Services in Humble, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Humble, TX. Custom showers, mirrors and glass repair near US-59 and Bush Intercontinental. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Humble, TX",
    eyebrow: "Harris County • ~20 miles",
    intro:
      "Humble sits northeast of Houston near US-59 / I-69 and Beltway 8, close to Bush Intercontinental and the Lake Houston communities. Martinez Orlyn Glass & Mirror serves Humble with shower glass, custom mirrors, window and door glass, and glass repair.",
    context: {
      heading: "Working in Humble",
      paragraphs: [
        "Northeast Harris County combines older Humble neighborhoods with newer housing toward Atascocita and the Lake Houston edge. Bath remodels drive custom shower doors and enclosures; established homes more often need insulated glass replacement and door glass after impact or seal failure.",
        "US-59 makes Humble a short run from Houston for appointments. Commercial glass for local retail and office spaces along the freeway and FM corridors is also in scope when a business needs glass installed or repaired around operating hours.",
        "Request an appointment at (832) 253-2925 for residential or commercial glass and mirror work in Humble.",
      ],
    },
    featuredServices: [
      {
        slug: "glass-installation-repair",
        note: "Broken panes and commercial glass repair are common calls in the US-59 / Beltway 8 northeast corridor.",
      },
      {
        slug: "custom-shower-enclosures",
        note: "Remodeled baths in Humble and nearby Lake Houston communities need glass measured to the finished curb.",
      },
      {
        slug: "double-pane-windows",
        note: "Fogged insulated units on established northeast Harris County homes are a frequent replacement job.",
      },
    ],
    nearbyAreas: ["houston-tx", "spring-tx", "conroe-tx", "league-city-tx"],
    faq: [
      {
        question: "Do you serve Humble, TX?",
        answer:
          "Yes. Humble is about twenty miles northeast of Houston near US-59 and Beltway 8 and is a regular service area.",
      },
      {
        question: "Can you replace insulated window glass in Humble?",
        answer:
          "Yes. When seals fail and the frame is sound, we replace the double-pane unit. Call (832) 253-2925 to schedule an appointment.",
      },
      {
        question: "Do you work on commercial properties in Humble?",
        answer:
          "Yes. Storefront and commercial interior glass installation and repair are part of our glass services.",
      },
      {
        question: "How do I get an appointment in Humble?",
        answer:
          "Call (832) 253-2925 or request an appointment through the site with your address and what needs repair or install.",
      },
    ],
  },

  {
    slug: "conroe-tx",
    city: "Conroe",
    state: "Texas",
    stateCode: "TX",
    county: "Montgomery County",
    distanceMiles: 40,
    seoTitle: "Glass & Mirror Services in Conroe, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Conroe, TX. Custom showers, mirrors and window glass for Montgomery County. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Conroe, TX",
    eyebrow: "Montgomery County • ~40 miles",
    intro:
      "Conroe is Montgomery County’s hub on I-45 North, far enough from Houston to feel like its own market and close enough for scheduled glass and mirror appointments. Martinez Orlyn Glass & Mirror serves Conroe residential and commercial properties with custom showers, mirrors, windows and glass repair.",
    context: {
      heading: "Working in Conroe",
      paragraphs: [
        "Conroe’s growth along I-45 and around Lake Conroe has added a large stock of newer homes that need custom shower enclosures and mirrors once baths are finished. Downtown and older neighborhoods still generate reglazing, door glass and insulated unit replacement on stock that has been through decades of Texas heat.",
        "Forty miles from Houston is still workable for measure-and-install sequences when appointments are planned. Commercial glass for offices and storefronts in Conroe’s business districts can be scheduled to limit downtime for open businesses.",
        "Call (832) 253-2925 to request an appointment for glass or mirror work in Conroe and nearby Montgomery County communities.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "Newer Conroe and Lake Conroe–area homes frequently need frameless or framed enclosures after primary bath tile is complete.",
      },
      {
        slug: "windows-and-doors",
        note: "Window and door glass replacement covers both storm damage and failed insulated units across Montgomery County stock.",
      },
      {
        slug: "mirrored-walls",
        note: "Studios, home gyms and feature walls in larger Conroe properties are a natural fit for full mirrored panels.",
      },
    ],
    nearbyAreas: ["spring-tx", "tomball-tx", "humble-tx", "houston-tx"],
    faq: [
      {
        question: "Do you come to Conroe for glass and mirror work?",
        answer:
          "Yes. Conroe is about forty miles north of Houston on I-45 and is within our service area for residential and commercial appointments.",
      },
      {
        question: "Can you install custom shower enclosures in Conroe?",
        answer:
          "Yes. We measure finished openings, fabricate and install. Call (832) 253-2925 to schedule.",
      },
      {
        question: "Do you serve commercial buildings in Conroe?",
        answer:
          "Yes. Commercial window, door and interior glass are included. Tell us about access and hours when you book so we can plan the visit.",
      },
      {
        question: "How do I request an appointment in Conroe?",
        answer:
          "Call (832) 253-2925 or use the appointment request on the site. We will confirm the address and project details.",
      },
    ],
  },

  {
    slug: "alvin-tx",
    city: "Alvin",
    state: "Texas",
    stateCode: "TX",
    county: "Brazoria County",
    distanceMiles: 25,
    seoTitle: "Glass & Mirror Services in Alvin, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in Alvin, TX. Shower glass, mirrors and window repair for Brazoria County. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in Alvin, TX",
    eyebrow: "Brazoria County • ~25 miles",
    intro:
      "Alvin sits south of Houston in Brazoria County along SH-35 and SH-6, a smaller city where residential bath glass, mirrors and window repair make up most of the work. Martinez Orlyn Glass & Mirror serves Alvin from Houston with the same fabrication and install approach we use across the metro.",
    context: {
      heading: "Working in Alvin",
      paragraphs: [
        "Alvin’s housing includes older in-town homes and newer subdivisions toward the SH-6 / SH-35 corridors. Older stock often needs door glass, reglazing and vanity mirrors; newer baths need custom shower doors and enclosures once tile is finished.",
        "About twenty-five miles from Houston keeps Alvin inside a practical appointment range. Humidity and storm weather in Brazoria County are hard on insulated glass seals and exterior door glass — fogged units and impact damage are regular reasons to call.",
        "Commercial glass for local storefronts and offices is available when needed. Call (832) 253-2925 to get an appointment in Alvin.",
      ],
    },
    featuredServices: [
      {
        slug: "shower-doors",
        note: "Residential baths in Alvin often need a correctly sized shower door rather than a full multi-panel enclosure.",
      },
      {
        slug: "windows-and-doors",
        note: "Storm-season impact and failed seals keep window and door glass replacement active in Brazoria County.",
      },
      {
        slug: "glass-installation-repair",
        note: "General glass repair — cracked panes, loose stops, commercial lite replacement — is handled from our Houston base.",
      },
    ],
    nearbyAreas: ["houston-tx", "sugar-land-tx", "league-city-tx"],
    faq: [
      {
        question: "Do you serve Alvin in Brazoria County?",
        answer:
          "Yes. Alvin is about twenty-five miles south of Houston and is within our glass and mirror service area.",
      },
      {
        question: "Can you install shower doors in Alvin homes?",
        answer:
          "Yes. We measure the opening and install bypass, hinged or pivot doors as the bath allows. Call (832) 253-2925 to schedule.",
      },
      {
        question: "Do you replace broken door glass in Alvin?",
        answer:
          "Yes. When the door slab is sound, we replace the glass with the correct type — including tempered where required.",
      },
      {
        question: "How do I book an appointment in Alvin?",
        answer:
          "Call (832) 253-2925 or request an appointment online with your Alvin address and a short description of the work.",
      },
    ],
  },

  {
    slug: "league-city-tx",
    city: "League City",
    state: "Texas",
    stateCode: "TX",
    county: "Galveston County",
    distanceMiles: 30,
    seoTitle: "Glass & Mirror Services in League City, TX | Martinez Orlyn Glass & Mirror",
    metaDescription:
      "Glass and mirror services in League City, TX. Custom showers, mirrors and window glass for the Clear Lake / Galveston County area. Call (832) 253-2925.",
    h1: "Glass & Mirror Services in League City, TX",
    eyebrow: "Galveston County • ~30 miles",
    intro:
      "League City sits southeast of Houston in Galveston County near the Clear Lake area, where coastal humidity and steady residential growth keep shower glass, mirrors and window work in demand. Martinez Orlyn Glass & Mirror serves League City from our Houston base.",
    context: {
      heading: "Working in League City",
      paragraphs: [
        "League City and the Clear Lake corridor have a large stock of newer homes with primary baths that need custom enclosures, plus established neighborhoods where insulated units fail and door glass takes storm or impact damage. I-45 South and FM corridors make the drive from Houston practical for scheduled appointments.",
        "Humidity near the bay is hard on window seals. Fogged double-pane glass is a frequent call long before the frame itself is finished. Solar screens on sun-facing elevations also matter here, where glare off water-adjacent light and summer heat load interiors.",
        "Residential work dominates, with commercial glass for local offices and retail as needed. Call (832) 253-2925 to request an appointment in League City.",
      ],
    },
    featuredServices: [
      {
        slug: "custom-shower-enclosures",
        note: "Clear Lake–area primary baths commonly need frameless or framed glass fabricated after tile is complete.",
      },
      {
        slug: "double-pane-windows",
        note: "Coastal humidity accelerates insulated unit seal failure — fogged panes are a regular League City replacement.",
      },
      {
        slug: "custom-mirrors",
        note: "Custom vanity and wall mirrors fit both new builds and remodeled baths across Galveston County suburbs.",
      },
    ],
    nearbyAreas: ["houston-tx", "alvin-tx", "humble-tx"],
    faq: [
      {
        question: "Do you serve League City and the Clear Lake area?",
        answer:
          "Yes. League City is about thirty miles southeast of Houston in Galveston County and is within our service area for glass and mirror work.",
      },
      {
        question: "Can you replace fogged windows in League City?",
        answer:
          "Yes. We replace failed insulated glass units when the frame is still sound. Call (832) 253-2925 to schedule an appointment.",
      },
      {
        question: "Do you install custom shower enclosures in League City?",
        answer:
          "Yes. Enclosures are measured to the finished opening, fabricated and installed — frameless or framed.",
      },
      {
        question: "How do I get an appointment in League City?",
        answer:
          "Call (832) 253-2925 or request an appointment through the site. We will confirm the address and set a time for measure or consult.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export const serviceAreaSlugs = serviceAreas.map((a) => a.slug);

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}

/** Areas surfaced in the header dropdown and on the home page. */
export const primaryAreaSlugs = [
  "houston-tx",
  "katy-tx",
  "sugar-land-tx",
  "cypress-tx",
  "spring-tx",
  "tomball-tx",
  "humble-tx",
  "conroe-tx",
  "alvin-tx",
  "league-city-tx",
] as const;

/**
 * Communities we serve that do not have a dedicated page. Listed by name only
 * on the service areas hub so coverage is honest without generating thin pages.
 */
export const additionalCommunities = [
  "Pasadena",
  "Pearland",
  "The Woodlands",
  "Missouri City",
  "Richmond",
  "Rosenberg",
  "Friendswood",
  "Baytown",
  "Deer Park",
  "Stafford",
];
