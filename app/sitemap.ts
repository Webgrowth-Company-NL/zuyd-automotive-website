import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/inventory";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.baseUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/occasions`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/over-ons`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/inkoop`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const slugs = await getAllSlugs();
  const carRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/occasions/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...carRoutes];
}
