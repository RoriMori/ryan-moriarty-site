import Link from 'next/link'
import type { EssayListItem } from '@/sanity/lib/types'

interface Props {
  essay: EssayListItem | null
}

export default function FeaturedEssay({ essay }: Props) {
  if (!essay) return null

  const date = essay.publishedAt
    ? new Date(essay.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  const meta = [
    essay.estimatedReadTime ? `~${essay.estimatedReadTime} min read` : null,
    date ? `Published ${date}` : null,
  ].filter(Boolean).join('. ')

  return (
    <section className="bg-bg pt-2xl pb-xl md:pt-3xl md:pb-2xl">
      <div className="max-w-5xl mx-auto px-sm md:px-2xl">

        <p className="font-sans text-caption uppercase tracking-[0.18em] text-text-primary/40">
          Featured Essay
        </p>

        <h2 className="font-serif font-normal text-text-primary mt-md leading-tight text-[clamp(2rem,4.5vw,3.5rem)]">
          {essay.title}
        </h2>

        {essay.subhead && (
          <p className="font-serif font-normal text-text-primary/60 mt-sm leading-snug text-[clamp(1.1rem,1.8vw,1.375rem)]">
            {essay.subhead}
          </p>
        )}

        <p className="font-sans text-p2 text-text-primary/40 mt-md">
          {essay.excerpt ?? meta}
        </p>

        <Link
          href={`/writing/${essay.slug}`}
          className="inline-block font-sans text-p1 text-text-primary mt-lg underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
        >
          Read essay →
        </Link>

      </div>
    </section>
  )
}
