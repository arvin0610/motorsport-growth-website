export interface Service {
  index: string;
  slug: string;
  name: string;
  channels: string;
  preview: string;
  description: string;
  outcome: string;
  caseSlug?: string;
}

export const services: Service[] = [
  {
    index: "01",
    slug: "performance-media",
    name: "Performance Media",
    channels: "META · GOOGLE · TIKTOK · YT",
    preview: "/assets/work/destined/01.jpg",
    description:
      "Demand capture and demand generation as one program, one MER target. Creative refreshes weekly, audiences resegment monthly, the report is one page and shows revenue first. CAPI and GA4 wired so the numbers match the bank.",
    outcome: "4.2× BLENDED ROAS — DESTINED INDUSTRIES, FY2025",
    caseSlug: "destined-industries",
  },
  {
    index: "02",
    slug: "shopify-and-conversion",
    name: "Shopify & Conversion",
    channels: "SHOPIFY PLUS · TURN14 · WPS · KEYSTONE",
    preview: "/assets/work/stage4/hero.jpg",
    description:
      "Shopify Plus stores built around fitment, not templates. VIN-aware PDPs, Turn14 / WPS / Keystone feeds that don't break, fitment guides that ship, CRO sprints that run year-round.",
    outcome: "AOV +38% — 961 MOTORSPORT, POST-REBUILD Q1 2026",
    caseSlug: "961-motorsport",
  },
  {
    index: "03",
    slug: "lifecycle-and-retention",
    name: "Lifecycle & Retention",
    channels: "KLAVIYO · SMS · LOYALTY",
    preview: "/assets/work/961/01.jpg",
    description:
      "Klaviyo and SMS programs that pay the rent between campaigns. Welcome, abandonment, post-purchase, win-back, VIP — built around the aftermarket buying cycle: research-heavy, fitment-anxious, repeat-window long.",
    outcome: "31% OF REVENUE FROM OWNED CHANNELS — STAGE 4 TUNING, Q4 2025",
    caseSlug: "stage-4-tuning",
  },
  {
    index: "04",
    slug: "brand-and-creative",
    name: "Brand & Creative",
    channels: "IDENTITY · LIVERY · PHOTO · FILM",
    preview: "/assets/work/limitless/hero.jpg",
    description:
      "Identity, livery, photo, and film at the level the client wants to be seen. Brand book, on-track and in-studio production, content that feeds every channel for a year. Shoot days are scoped as build sheets — you know what you're getting before the truck rolls.",
    outcome: "REBRAND → +52% INBOUND RO INQUIRIES IN 90 DAYS — LIMITLESS",
    caseSlug: "limitless-auto-collision",
  },
  {
    index: "05",
    slug: "race-program-activation",
    name: "Race Program Activation",
    channels: "SPONSORSHIP · DRIVER CONTENT · SKU TIE-IN",
    preview: "/assets/work/destined/03.jpg",
    description:
      "Sponsorship that returns dollars, not just impressions. For Formula Drift teams, time-attack programs, and the brands sponsoring them — we build the activation between the truck and the e-commerce site. Driver content, paddock UGC, retail tie-ins, attribution back to the SKU.",
    outcome: "$840K ACTIVATION-ATTRIBUTED REVENUE — FORMULA DRIFT, 2025",
    caseSlug: "destined-industries",
  },
];
