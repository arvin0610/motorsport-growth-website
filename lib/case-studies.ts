export interface Stat {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  discipline: ("Growth" | "Web" | "Brand")[];
  year: string;
  hero: string;
  gallery: string[];
  excerpt: string;
  problem: string;
  approach: string;
  result: string;
  stats: Stat[];
  /** Layout span for the asymmetric editorial grid on /work and homepage. */
  span: "tall-left" | "short-right" | "mid-center" | "tall-right";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "destined-industries",
    client: "Destined Industries",
    title: "A Drift Program, Productised.",
    discipline: ["Growth", "Brand"],
    year: "2025",
    hero: "/assets/work/destined/hero.jpg",
    gallery: [
      "/assets/work/destined/01.jpg",
      "/assets/work/destined/02.jpg",
      "/assets/work/destined/03.jpg",
      "/assets/work/destined/04.jpg",
    ],
    excerpt:
      "From a single Formula Drift entry to a year-round retail engine — paid media, content, and a livery system that travels.",
    problem:
      "A privateer Formula Drift program with high on-track equity and zero off-track conversion. The merch was an afterthought, the audience uncaptured, the sponsor deck a screenshot.",
    approach:
      "Built a paddock-first content model: every event yields a release, a film, and a drop. Paired short-form retargeting with a Shopify storefront engineered around the run order.",
    result:
      "Cracked retail revenue inside 90 days, scaled to a top-10 driver storefront in the series, and turned event days into the highest-converting traffic windows of the month.",
    stats: [
      { label: "ROAS",         value: "+312%" },
      { label: "Impressions",  value: "2.4M" },
      { label: "Email list",   value: "0 → 18k" },
      { label: "Drop sell-out",value: "<6h" },
    ],
    span: "tall-left",
  },
  {
    slug: "961-motorsport",
    client: "961 Motorsport",
    title: "A Workshop With a Waiting List.",
    discipline: ["Growth", "Web"],
    year: "2025",
    hero: "/assets/work/961/hero.jpg",
    gallery: [
      "/assets/work/961/01.jpg",
      "/assets/work/961/02.jpg",
      "/assets/work/961/03.jpg",
    ],
    excerpt:
      "Repositioned a high-end Porsche specialist from Yelp commodity to appointment-only — a website that filters, not sells.",
    problem:
      "A boutique Porsche shop with master-tech work and tourist-tier inquiries. The website read like a directory listing. Quote requests were a tax, not a pipeline.",
    approach:
      "Stripped the site to one job: qualify. Built a build-spec intake that scores leads before they hit the inbox, paired with a paid program that targets owners by VIN cohort.",
    result:
      "Cut unqualified leads by 64%. Service bay booked nine months out. Average ticket size doubled inside two quarters.",
    stats: [
      { label: "Avg ticket", value: "+108%" },
      { label: "Unqualified leads", value: "−64%" },
      { label: "Booked out", value: "9 mo" },
      { label: "CPL",        value: "−41%" },
    ],
    span: "short-right",
  },
  {
    slug: "stage-4-tuning",
    client: "Stage 4 Tuning",
    title: "Headless Storefront, Real Horsepower.",
    discipline: ["Web", "Brand"],
    year: "2024",
    hero: "/assets/work/stage4/hero.jpg",
    gallery: [
      "/assets/work/stage4/01.jpg",
      "/assets/work/stage4/02.jpg",
      "/assets/work/stage4/03.jpg",
    ],
    excerpt:
      "Turn14 catalogue, headless Shopify, fitment-aware product pages — the parts site customers actually finish a build on.",
    problem:
      "A 40k-SKU Turn14 reseller stuck on a generic theme. PDPs returned the wrong fitments. The cart abandoned at 81%.",
    approach:
      "Headless Shopify on Next.js. Year-make-model gating that lives in the URL. Real-time stock from Turn14 surfaced as a confidence signal, not a footnote.",
    result:
      "Mobile checkout time halved. Repeat-purchase window tightened from 47 days to 22. Catalogue depth finally indexable.",
    stats: [
      { label: "Mobile CVR", value: "+186%" },
      { label: "TTI mobile", value: "1.6s" },
      { label: "Lighthouse", value: "98 / 100 / 100" },
      { label: "AOV",        value: "+34%" },
    ],
    span: "mid-center",
  },
  {
    slug: "limitless-auto-collision",
    client: "Limitless Auto Collision",
    title: "Identity For The Body Shop That Builds Show Cars.",
    discipline: ["Brand"],
    year: "2024",
    hero: "/assets/work/limitless/hero.jpg",
    gallery: [
      "/assets/work/limitless/01.jpg",
      "/assets/work/limitless/02.jpg",
      "/assets/work/limitless/03.jpg",
    ],
    excerpt:
      "A new identity system for a paint-and-body shop that gets shipped six-figure widebody projects from across the country.",
    problem:
      "A nationally-respected paint shop hidden behind a logo that read 'insurance estimate.' Showcased work was top 1%; the brand looked top 50%.",
    approach:
      "Wordmark, livery, photographic system, and a content cadence built around the work itself — paint codes, build sheets, time-lapse process plates.",
    result:
      "Inbound from out-of-state owners tripled. Featured in two print titles. The brand finally matches what comes out of the booth.",
    stats: [
      { label: "Out-of-state inquiries", value: "3.2×" },
      { label: "Print features",  value: "2" },
      { label: "Booking lead",    value: "5 mo" },
      { label: "IG growth",       value: "+62%" },
    ],
    span: "tall-right",
  },
];

export const featuredCaseStudies = caseStudies;

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
