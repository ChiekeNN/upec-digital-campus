import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://upecuniport.com.ng";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/programmes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entrepreneur-training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/incubation`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/admissions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/portal`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
