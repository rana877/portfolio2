import type { MetadataRoute } from "next"
import { projects } from "@/lib/projects-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arshmanshahid.dev"
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ]

  for (const p of projects) {
    routes.push({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    })
  }

  return routes
}
