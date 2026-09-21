import type { MetadataRoute } from 'next'

import { INDEXABLE, SITE_URL as BASE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!INDEXABLE) return []
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/arquitectura-legal`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
