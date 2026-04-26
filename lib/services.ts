export interface Service {
  index: string;
  slug: string;
  name: string;
  channels: string;
  preview: string; // image path used in the row hover preview
  description: string;
  outcome: string; // single real outcome metric, mono-friendly
  caseSlug?: string;
}

export const services: Service[] = [
  {
    index: "01",
    slug: "performance-advertising",
    name: "Performance Advertising",
    channels: "META · TIKTOK · YT",
    preview: "/assets/work/destined/01.jpg",
    description:
      "Paid acquisition for performance brands. We don't run ads — we run race programs: creative testing pipelines, audience cohorts, server-side tracking, and a weekly read built around what actually moved.",
    outcome: "ROAS 6.2× — DESTINED INDUSTRIES, Q3 2025",
    caseSlug: "destined-industries",
  },
  {
    index: "02",
    slug: "lead-generation",
    name: "Lead Generation & Funnels",
    channels: "QUALIFIED PIPELINE",
    preview: "/assets/work/961/01.jpg",
    description:
      "End-to-end pipelines for shops, dealerships, and program operators. VIN-aware intake, build-spec qualifiers, lifecycle email — calibrated so the inbox fills with work you actually want.",
    outcome: "CPL −41% — 961 MOTORSPORT, 2025",
    caseSlug: "961-motorsport",
  },
  {
    index: "03",
    slug: "creative-and-ai-production",
    name: "Creative & AI Ad Production",
    channels: "STILLS · MOTION · UGC",
    preview: "/assets/work/destined/03.jpg",
    description:
      "Stills, motion, and AI-assisted production engineered for a calendar — events, drops, and releases. Race-pace volume without the agency-tier per-asset cost.",
    outcome: "300+ ASSETS / QUARTER — 4 RETAINER CLIENTS",
  },
  {
    index: "04",
    slug: "website-and-ecommerce",
    name: "Website & E-Comm Builds",
    channels: "SHOPIFY · NEXT.JS",
    preview: "/assets/work/stage4/hero.jpg",
    description:
      "Headless Shopify, custom Next.js, and Turn14/WPS-aware product pages. Built for parts catalogues, build sheets, and the way enthusiasts actually finish a build.",
    outcome: "MOBILE CVR +186% — STAGE 4 TUNING",
    caseSlug: "stage-4-tuning",
  },
  {
    index: "05",
    slug: "brand-and-positioning",
    name: "Brand & Positioning",
    channels: "STRATEGY · IDENTITY",
    preview: "/assets/work/limitless/hero.jpg",
    description:
      "Identity systems, livery, and positioning for shops whose work is top 1% but whose brand is reading top 50%. Wordmarks, palettes, and a content cadence that travels.",
    outcome: "OUT-OF-STATE INQUIRIES 3.2× — LIMITLESS",
    caseSlug: "limitless-auto-collision",
  },
];
