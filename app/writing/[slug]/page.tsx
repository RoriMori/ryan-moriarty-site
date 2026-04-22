import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { essaySlugsQuery, essayBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Essay } from '@/sanity/lib/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return [{ slug: 'the-long-way-in' }]
  const slugs = await client.fetch<string[]>(essaySlugsQuery).catch(() => [])
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!isSanityConfigured) return { title: 'Essay — Rori Mori' }

  const essay = await client
    .fetch<Essay | null>(essayBySlugQuery, { slug })
    .catch(() => null)

  return {
    title: essay ? `${essay.title} — Rori Mori` : 'Essay — Rori Mori',
    description: essay?.subhead ?? undefined,
  }
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      const src = urlFor(value).width(1200).url()
      return (
        <figure className="essay-figure my-xl">
          <img
            src={src}
            alt={value.alt ?? ''}
            className="w-full rounded-sm"
          />
          {value.caption && (
            <figcaption>{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    pullQuote: ({ value }) => (
      <blockquote className="pull-quote">{value.text}</blockquote>
    ),
    externalEmbed: ({ value }) => {
      if (!value?.url) return null
      return (
        <figure className="essay-figure my-xl">
          <iframe
            src={value.url}
            className="w-full rounded-sm"
            style={{ height: '166px', border: 'none' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={value.caption ?? 'Embedded content'}
          />
          {value.caption && (
            <figcaption>{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-sans font-normal text-h5 text-text-primary mt-2xl mb-md leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans font-normal text-h6 text-text-primary mt-xl mb-sm leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          className="underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-lg mb-[1.75rem] space-y-xs">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-lg mb-[1.75rem] space-y-xs">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params

  const essay: Essay | null = isSanityConfigured
    ? await client.fetch<Essay | null>(essayBySlugQuery, { slug }).catch(() => null)
    : null

  const date = essay?.publishedAt
    ? new Date(essay.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null

  const heroImageUrl = essay?.heroImage
    ? urlFor(essay.heroImage).width(2400).url()
    : null

  const title = essay?.title ?? 'Essay'
  const subhead = essay?.subhead ?? null

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#28261A]"
        style={{ height: '60vh', minHeight: '360px' }}
      >
        {heroImageUrl ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        ) : (
          <>
            <div
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: 'url(/images/hero/home-hero-mobile.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            />
            <div
              className="absolute inset-0 hidden md:block"
              style={{
                backgroundImage: 'url(/images/hero/home-hero-desktop.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            />
          </>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.65) 100%)' }}
        />
        <div className="absolute bottom-0 left-0 z-10 px-sm pb-xl md:px-2xl md:pb-2xl" style={{ maxWidth: '48rem' }}>
          <h1 className="font-sans font-normal text-white leading-tight text-[clamp(1.75rem,4vw,3rem)]">
            {title}
          </h1>
          {subhead && (
            <p className="font-serif italic text-white/80 mt-xs text-[clamp(0.95rem,1.8vw,1.125rem)]">
              {subhead}
            </p>
          )}
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="bg-bg py-2xl md:py-3xl px-sm">
        <div className="max-w-[68ch] mx-auto">

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-md gap-y-xs font-sans text-caption text-text-primary/50 mb-xl border-b border-surface pb-lg">
            <span>Ryan Moriarty</span>
            {date && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={essay?.publishedAt}>{date}</time>
              </>
            )}
            {essay?.estimatedReadTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>~{essay.estimatedReadTime} min read</span>
              </>
            )}
          </div>

          {/* Body */}
          <article className="essay-body">
            {essay?.body ? (
              <PortableText
                value={essay.body as Parameters<typeof PortableText>[0]['value']}
                components={ptComponents}
                onMissingComponent={false}
              />
            ) : (
              <p className="text-text-primary/40 italic">Content coming soon.</p>
            )}
          </article>

          {/* Attribution */}
          <footer className="mt-3xl pt-lg border-t border-surface">
            <p className="font-sans text-caption text-text-primary/40 leading-relaxed">
              Written by Ryan Moriarty with Claude. Ryan drives everything: the material, memories,
              corrections, voice, ending. Claude shapes sentences and holds architecture. The work is
              Ryan&rsquo;s in every way that matters.
            </p>
          </footer>

        </div>
      </div>

    </main>
  )
}
