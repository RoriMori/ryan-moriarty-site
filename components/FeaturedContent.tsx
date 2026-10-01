import Link from 'next/link'
import type { FeaturedItem } from '@/sanity/lib/types'

export default function FeaturedContent({ item }: { item: FeaturedItem | null }) {
  if (!item) return null

  const date = item.date
    ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  let label: string
  let cta: string
  let href: string

  if (item._type === 'essay') {
    const typeLabel = item.contentType ?? 'Essay'
    label = `Featured ${typeLabel}`
    cta = `Read ${typeLabel.toLowerCase()} →`
    href = `/writing/${item.slug}`
  } else if (item._type === 'video') {
    label = item.series ? `Featured — ${item.series}` : 'Featured Video'
    cta = 'Watch episode →'
    href = '/video'
  } else {
    label = 'Featured Track'
    cta = 'Listen →'
    href = '/music'
  }

  const blurb =
    item._type === 'essay'
      ? (item.excerpt ?? (item.estimatedReadTime ? `~${item.estimatedReadTime} min read` : null))
      : item.description

  return (
    <section id="featured" className="bg-bg pt-2xl pb-xl md:pt-3xl md:pb-2xl">
      <div className="max-w-5xl mx-auto px-sm md:px-2xl">

        <p className="font-sans text-caption uppercase tracking-[0.18em] text-text-primary/40">
          {label}
        </p>

        <h2 className="font-serif font-normal text-text-primary mt-md leading-tight text-[clamp(2rem,4.5vw,3.5rem)]">
          {item.title}
        </h2>

        {item._type === 'essay' && item.subhead && (
          <p className="font-serif font-normal text-text-primary/60 mt-sm leading-snug text-[clamp(1.1rem,1.8vw,1.375rem)]">
            {item.subhead}
          </p>
        )}

        {blurb && (
          <p className="font-sans text-p2 text-text-primary/40 mt-md">
            {blurb}
          </p>
        )}

        {date && (
          <p className="font-sans text-p2 text-text-primary/30 mt-xs">
            {date}
          </p>
        )}

        <Link
          href={href}
          className="inline-block font-sans text-p1 text-text-primary mt-lg underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
        >
          {cta}
        </Link>

      </div>
    </section>
  )
}
