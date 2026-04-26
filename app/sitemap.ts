import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";

const BASE = "https://motorsportgrowth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const cases: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${BASE}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...cases];
}
