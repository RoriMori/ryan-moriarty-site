import Link from 'next/link'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { essayListQuery } from '@/sanity/lib/queries'
import type { EssayListItem } from '@/sanity/lib/types'

export const metadata = {
  title: 'Writing — RoriMori',
  description: 'Essays by Ryan Moriarty.',
}

export default async function Writing() {
  const essays: EssayListItem[] = isSanityConfigured
    ? await client.fetch<EssayListItem[]>(essayListQuery).catch(() => [])
    : []

  return (
    <main className="min-h-screen bg-bg px-sm pt-3xl pb-2xl md:px-2xl md:pb-3xl">
      <div className="max-w-[68ch] mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary mb-2xl">
          Writing
        </h1>

        {essays.length === 0 ? (
          <p className="font-serif text-text-primary/50 text-p1">More coming soon.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-lg list-none">
            {essays.map(essay => {
              const isEssay = !essay.contentType || essay.contentType === 'Essay'
              const typeLabel = essay.contentType ?? 'Essay'
              const date = essay.publishedAt
                ? new Date(essay.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null
              const metaLine = [typeLabel, date].filter(Boolean).join(' · ')

              return (
                <li key={essay._id} className="flex">
                  <Link
                    href={`/writing/${essay.slug}`}
                    className="flex flex-col w-full bg-surface rounded-lg p-lg hover:-translate-y-1 hover:shadow-sm transition-all duration-200"
                  >
                    <h2 className="font-sans font-medium text-h6 text-text-primary leading-snug mb-xs">
                      {essay.title}
                    </h2>
                    {isEssay && essay.subhead && (
                      <p className="font-serif text-p1 text-text-primary/70 leading-relaxed mb-sm">
                        {essay.subhead}
                      </p>
                    )}
                    <p className="font-sans text-caption text-text-primary/40 mt-auto pt-xs">
                      {metaLine}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

      </div>
    </main>
  )
}
