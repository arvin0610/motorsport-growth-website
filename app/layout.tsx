import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, body, editorial, mono } from "./fonts";
import { Cursor } from "@/lib/cursor";
import { LenisProvider } from "@/components/lenis-provider";
import { PageTransition } from "@/components/page-transition";
import { Preloader } from "@/components/preloader";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const SITE_URL = "https://motorsportgrowth.com";

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Motorsport Growth — Performance marketing for performance brands",
    template: "%s — Motorsport Growth",
  },
  description:
    "A performance marketing agency for the motorsport, automotive, and enthusiast aftermarket industries. We turn horsepower into pipeline.",
  keywords: [
    "motorsport marketing",
    "automotive performance marketing",
    "performance parts marketing",
    "Formula Drift marketing",
    "Shopify automotive",
    "Turn14 e-commerce",
    "Agoura Hills agency",
  ],
  authors: [{ name: "Motorsport Growth" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Motorsport Growth — Performance marketing for performance brands",
    description:
      "A performance marketing agency for the motorsport, automotive, and enthusiast aftermarket industries.",
    images: [{ url: "/assets/og/og-default.jpg", width: 1200, height: 630, alt: "Motorsport Growth" }],
    locale: "en_US",
    siteName: "Motorsport Growth",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motorsport Growth",
    description: "Performance marketing for performance brands.",
    images: ["/assets/og/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Motorsport Growth",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/mg-mark-white.png`,
  email: "info@motorsportgrowth.com",
  foundingDate: "2024-01-01",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Agoura Hills",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [
    "https://instagram.com/motorsportgrowth",
    "https://www.linkedin.com/company/motorsportgrowth",
    "https://youtube.com/@motorsportgrowth",
  ],
  description:
    "Performance marketing agency for the motorsport, automotive, and enthusiast aftermarket industries.",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Performance Marketing",
  provider: { "@type": "Organization", name: "Motorsport Growth", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Worldwide" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Motorsport, automotive performance, enthusiast aftermarket",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Motorsport Growth Service Menu",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Advertising" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation & Funnels" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Creative & AI Ad Production" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website & E-Commerce Builds" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand & Positioning" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[display.variable, body.variable, editorial.variable, mono.variable].join(" ")}
    >
      <body>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <Preloader />
        <Cursor />
        <LenisProvider>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
