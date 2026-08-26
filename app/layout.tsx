import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import { SITE_URL, business } from "@/data/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { ContactBubbles } from "@/components/layout/ContactBubbles";
import { RevealEngine } from "@/components/animations/RevealEngine";
import { TrackingBridge } from "@/components/tracking/TrackingBridge";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLocalBusinessSchema, buildWebSiteSchema, graph } from "@/lib/schema";

/*
 * Two families, minimal weights, self-hosted.
 *
 * These were loaded through next/font/google, which fetches from
 * fonts.gstatic.com during the build. Google rotated the Archivo asset and the
 * URL pinned in the Next version started returning 404, which failed the
 * deploy. The latin-subset files now live in app/fonts, so a build no longer
 * depends on Google being reachable or on a URL staying valid.
 *
 * To refresh them: grab the latin `src: url(...)` from
 * https://fonts.googleapis.com/css2?family=... with a browser User-Agent
 * (without one Google serves ttf instead of woff2) and replace the files.
 */
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/archivo-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const plex = localFont({
  src: [
    { path: "./fonts/plex-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Glass & Mirror in Houston, TX | Showers, Mirrors & Windows | Martinez Orlyn Glass & Mirror",
    template: "%s",
  },
  description:
    "Professional glass and mirror service in Houston, TX. Custom shower enclosures, mirrors, windows, solar screens and glass repair for residential and commercial properties. Licensed & insured. Call (832) 253-2925.",
  applicationName: business.legalName,
  authors: [{ name: business.legalName }],
  creator: business.legalName,
  publisher: business.legalName,
  category: "Glass and Mirror Services",
  keywords: [
    "Martinez Orlyn Glass & Mirror",
    "Houston glass company",
    "custom shower enclosures Houston",
    "custom mirrors Houston",
    "window glass repair Houston",
    "glass installation Houston TX",
    "mirrored walls Houston",
    "solar screens Houston",
    "reglazing Houston",
  ],
  icons: { icon: "/logo.png" },
  formatDetection: { telephone: true, address: false, email: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.legalName,
    title:
      "Glass & Mirror in Houston, TX | Martinez Orlyn Glass & Mirror",
    description:
      "Custom shower enclosures, mirrors, windows and glass repair for Houston homes and businesses. Licensed & insured.",
    url: SITE_URL,
    images: [
      {
        url: "/images/stock/hero-glass.webp",
        width: 1400,
        height: 933,
        alt: "Modern home with large glass windows and sliding doors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass & Mirror in Houston, TX | Martinez Orlyn Glass & Mirror",
    description:
      "Custom shower enclosures, mirrors, windows and glass repair. Licensed & insured. Call (832) 253-2925.",
    images: ["/images/stock/hero-glass.webp"],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a1218",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${archivo.variable} ${plex.variable}`}>
      <head>
        {/* Maycoll: primary llms.txt discovery for agents. */}
        <link rel="describedby" href="/llms.txt" type="text/markdown" title="LLM site index" />
        <link rel="alternate" href="/llms-full.txt" type="text/plain" title="LLM full site context" />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-charcoal focus:uppercase"
        >
          Skip to main content
        </a>

        <Header />

        {/* Padding for the mobile conversion bar so it never covers content. */}
        <main id="main" className="pb-[58px] lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileStickyCTA />
        <ContactBubbles />

        <RevealEngine />
        <TrackingBridge />

        <JsonLd data={graph(buildLocalBusinessSchema(), buildWebSiteSchema())} />

        {/* Analytics stay out of the bundle entirely until an ID is configured.
            No placeholder IDs are invented. */}
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}

        {!gtmId && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
