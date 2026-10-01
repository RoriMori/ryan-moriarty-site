import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeaturedContent from '@/components/FeaturedContent'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { featuredContentQuery } from '@/sanity/lib/queries'
import type { FeaturedItem } from '@/sanity/lib/types'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Home() {
  const featured = isSanityConfigured
    ? await client.fetch<FeaturedItem | null>(featuredContentQuery).catch(() => null)
    : null

  return (
    <main>
      <Hero />
      <FeaturedContent item={featured} />
    </main>
  )
}
