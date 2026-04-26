export interface Stat {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  discipline: ("Performance Media" | "Shopify" | "Lifecycle" | "Brand" | "Race Program")[];
  year: string;
  hero: string;
  gallery: string[];
  excerpt: string;
  problem: string;
  approach: string;
  result: string;
  stats: Stat[];
  span: "tall-left" | "short-right" | "mid-center" | "tall-right";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "destined-industries",
    client: "Destined Industries",
    title: "From Privateer Program To Year-Round Retail Engine.",
    discipline: ["Performance Media", "Race Program"],
    year: "2025",
    hero: "/assets/work/destined/hero.jpg",
    gallery: [
      "/assets/work/destined/01.jpg",
      "/assets/work/destined/02.jpg",
      "/assets/work/destined/03.jpg",
      "/assets/work/destined/04.jpg",
    ],
    excerpt:
      "Paid media, content, and a livery system that travels — engineered around the run order so every event day is the highest-converting traffic window of the month.",
    problem:
      "A Formula Drift program with high on-track equity and zero off-track conversion. Merch was an afterthought, the audience uncaptured, the sponsor deck a screenshot.",
    approach:
      "Built a paddock-first content model: every event yields a release, a film, and a drop. Paired short-form retargeting with a Shopify storefront engineered around the run order and the season calendar.",
    result:
      "Cracked retail revenue inside 90 days. Top-10 driver storefront in the series. Event days now the highest-converting traffic windows of the month.",
    stats: [
      { label: "Blended ROAS",      value: "4.2×" },
      { label: "FD-attributed rev", value: "$840K" },
      { label: "Email list",        value: "0 → 18k" },
      { label: "Drop sell-out",     value: "<6h" },
    ],
    span: "tall-left",
  },
  {
    slug: "961-motorsport",
    client: "961 Motorsport",
    title: "A Workshop With A Waiting List.",
    discipline: ["Shopify", "Performance Media"],
    year: "2026",
    hero: "/assets/work/961/hero.jpg",
    gallery: [
      "/assets/work/961/01.jpg",
      "/assets/work/961/02.jpg",
      "/assets/work/961/03.jpg",
    ],
    excerpt:
      "Repositioned a high-end Porsche specialist from Yelp commodity to appointment-only. A site that filters, not sells.",
    problem:
      "A boutique Porsche shop with master-tech work and tourist-tier inquiries. The site read like a directory listing. Quote requests were a tax, not a pipeline.",
    approach:
      "Stripped the site to one job: qualify. Build-spec intake that scores leads before they hit the inbox, paired with a paid program that targets owners by VIN cohort.",
    result:
      "Service bay booked nine months out. Average ticket size doubled inside two quarters. The inbound that gets through is the work they actually want.",
    stats: [
      { label: "AOV",             value: "+38%" },
      { label: "Unqualified leads", value: "−64%" },
      { label: "Booked out",      value: "9 mo" },
      { label: "CPL",             value: "−41%" },
    ],
    span: "short-right",
  },
  {
    slug: "stage-4-tuning",
    client: "Stage 4 Tuning",
    title: "Headless Storefront. Real Horsepower.",
    discipline: ["Shopify", "Lifecycle"],
    year: "2025",
    hero: "/assets/work/stage4/hero.jpg",
    gallery: [
      "/assets/work/stage4/01.jpg",
      "/assets/work/stage4/02.jpg",
      "/assets/work/stage4/03.jpg",
    ],
    excerpt:
      "Turn14 catalogue, headless Shopify, fitment-aware PDPs, and a Klaviyo program that pays the rent between campaigns.",
    problem:
      "A 40k-SKU Turn14 reseller stuck on a generic theme. PDPs returned the wrong fitments. The cart abandoned at 81%. Email was a 3% revenue afterthought.",
    approach:
      "Headless Shopify on Next.js. Year-make-model gating in the URL. Real-time stock surfaced as a confidence signal. Klaviyo rebuilt around the aftermarket buying cycle — research-heavy, fitment-anxious, repeat-window long.",
    result:
      "Mobile checkout time halved. Repeat-purchase window tightened from 47 days to 22. Owned channels now a third of monthly revenue.",
    stats: [
      { label: "Owned-channel rev", value: "31%" },
      { label: "Mobile CVR",        value: "+186%" },
      { label: "TTI mobile",        value: "1.6s" },
      { label: "AOV",               value: "+34%" },
    ],
    span: "mid-center",
  },
  {
    slug: "limitless-auto-collision",
    client: "Limitless Auto Collision",
    title: "Identity For The Body Shop That Builds Show Cars.",
    discipline: ["Brand"],
    year: "2025",
    hero: "/assets/work/limitless/hero.jpg",
    gallery: [
      "/assets/work/limitless/01.jpg",
      "/assets/work/limitless/02.jpg",
      "/assets/work/limitless/03.jpg",
    ],
    excerpt:
      "A new identity for a paint-and-body shop that ships six-figure widebody projects to owners across the country.",
    problem:
      "Top 1% paint, top 50% brand. A nationally-respected shop hidden behind a logo that read 'insurance estimate.' The work was the proof; the wrapper undersold it.",
    approach:
      "Wordmark, livery, photographic system, and a content cadence built around the work itself — paint codes, build sheets, time-lapse process plates. Shot the booth like a studio, not a body shop.",
    result:
      "Inquiries from out-of-state owners up 52% inside 90 days. Featured in two print titles. The brand finally matches what comes out of the booth.",
    stats: [
      { label: "Inbound RO inquiries", value: "+52%" },
      { label: "Out-of-state inquiries", value: "3.2×" },
      { label: "Print features",       value: "2" },
      { label: "Booking lead",         value: "5 mo" },
    ],
    span: "tall-right",
  },
];

export const featuredCaseStudies = caseStudies;

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
