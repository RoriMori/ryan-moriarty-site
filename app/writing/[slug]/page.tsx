import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { client, isSanityConfigured } from '@/sanity/lib/client'
import { essaySlugsQuery, essayBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Essay } from '@/sanity/lib/types'
import ShareIcons from '@/components/ShareRow'

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
  if (!isSanityConfigured) return { title: 'Essay — RoriMori' }

  const essay = await client
    .fetch<Essay | null>(essayBySlugQuery, { slug })
    .catch(() => null)

  return {
    title: essay ? `${essay.title} — RoriMori` : 'Essay — RoriMori',
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
      <h3 className="font-sans font-normal text-[18px] text-text-primary mt-xl mb-sm leading-tight">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p>{children}</p>,
    sectionOpener: ({ children }) => <p className="section-opener">{children}</p>,
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
    ? urlFor(essay.heroImage).width(1400).url()
    : null

  const title = essay?.title ?? 'Essay'
  const subhead = essay?.subhead ?? null

  return (
    <main>
      <div className="bg-bg py-2xl md:py-3xl px-sm">
        <div className="max-w-[68ch] mx-auto">

          {/* Hero image — constrained, above title */}
          {heroImageUrl && (
            <div className="mb-xl">
              <img
                src={heroImageUrl}
                alt={essay?.heroImage?.alt ?? ''}
                className="w-full rounded-sm"
              />
              {essay?.heroCaption && (
                <p className="font-serif italic text-[12px] text-right mt-sm leading-relaxed"
                   style={{ color: 'rgba(40, 38, 26, 0.5)' }}>
                  {essay.heroCaption}
                </p>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="font-sans font-normal text-[clamp(1.75rem,4vw,3rem)] text-text-primary leading-tight mb-sm">
            {title}
          </h1>

          {/* Subhead */}
          {subhead && (
            <p className="font-serif italic text-text-primary/60 text-[clamp(0.95rem,1.8vw,1.125rem)] mb-xl">
              {subhead}
            </p>
          )}

          {/* Metadata + Share icons */}
          <div className="flex items-center justify-between flex-wrap gap-y-sm font-sans text-caption text-text-primary/50 mb-xl border-b border-divider pb-lg">
            <div className="flex flex-wrap items-center gap-x-md gap-y-xs">
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
            <ShareIcons
              title={title}
              url={`https://rorimori.com/writing/${slug}`}
            />
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

        </div>
      </div>
    </main>
  )
}
