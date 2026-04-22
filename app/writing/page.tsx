import Link from 'next/link'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { essayListQuery } from '@/sanity/lib/queries'
import type { EssayListItem } from '@/sanity/lib/types'

export default async function Writing() {
  const essays: EssayListItem[] = isSanityConfigured
    ? await client.fetch<EssayListItem[]>(essayListQuery).catch(() => [])
    : []

  return (
    <main className="min-h-screen bg-bg px-sm py-2xl md:px-2xl">
      <div className="max-w-5xl mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary">Writing</h1>

        {essays.length === 0 ? (
          <p className="font-serif text-text-primary/50 mt-xl text-p1">
            No essays published yet.
          </p>
        ) : (
          <ul className="mt-xl divide-y divide-surface list-none">
            {essays.map(essay => {
              const date = essay.publishedAt
                ? new Date(essay.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null

              return (
                <li key={essay._id} className="py-lg group">
                  <Link href={`/writing/${essay.slug}`} className="block">
                    {date && (
                      <p className="font-sans text-caption uppercase tracking-[0.12em] text-text-primary/40 mb-xs">
                        {date}
                      </p>
                    )}
                    <h2 className="font-serif font-normal text-[1.5rem] text-text-primary leading-snug group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4 transition-all">
                      {essay.title}
                    </h2>
                    {essay.subhead && (
                      <p className="font-serif text-text-primary/60 mt-xs text-p1 leading-snug">
                        {essay.subhead}
                      </p>
                    )}
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
