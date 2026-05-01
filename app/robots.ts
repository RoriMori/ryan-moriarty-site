// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const staticPages: MetadataRoute.Sitemap = [
  {
    url: 'https://www.rorimori.com',
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: 'https://www.rorimori.com/writing',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: 'https://www.rorimori.com/about',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: 'https://www.rorimori.com/links',
    changeFrequency: 'monthly',
    priority: 0.4,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: { current: string }; publishedAt: string }[] =
    await client.fetch(
      `*[_type == "essay" && defined(slug.current) && !(_id in path("drafts.**"))] {
        slug,
        publishedAt
      }`
    )

  const essayPages: MetadataRoute.Sitemap = slugs.map(({ slug, publishedAt }) => ({
    url: `https://www.rorimori.com/writing/${slug.current}`,
    lastModified: publishedAt ? new Date(publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticPages, ...essayPages]
}