import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeaturedEssay from '@/components/FeaturedEssay'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { featuredEssayQuery } from '@/sanity/lib/queries'
import type { EssayListItem } from '@/sanity/lib/types'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Home() {
  const essay = isSanityConfigured
    ? await client.fetch<EssayListItem | null>(featuredEssayQuery).catch(() => null)
    : null

  return (
    <main>
      <Hero />
      <FeaturedEssay essay={essay} />
    </main>
  )
}
