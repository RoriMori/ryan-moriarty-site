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
    alternates: { canonical: `/writing/${slug}` },
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
      <h2 className="font-sans font-normal text-h5 text-text-primary mt-2xl mb-md leading-tight">{children}</h2>
    ),
    h2Center: ({ children }) => (
      <h2 className="font-sans font-normal text-h5 text-text-primary mt-2xl mb-md leading-tight text-center">{children}</h2>
    ),
    h2Right: ({ children }) => (
      <h2 className="font-sans font-normal text-h5 text-text-primary mt-2xl mb-md leading-tight text-right">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans font-normal text-[18px] text-text-primary mt-xl mb-sm leading-tight">{children}</h3>
    ),
    h3Center: ({ children }) => (
      <h3 className="font-sans font-normal text-[18px] text-text-primary mt-xl mb-sm leading-tight text-center">{children}</h3>
    ),
    h3Right: ({ children }) => (
      <h3 className="font-sans font-normal text-[18px] text-text-primary mt-xl mb-sm leading-tight text-right">{children}</h3>
    ),
    normal: ({ children }) => <p>{children}</p>,
    sectionOpener: ({ children }) => <p className="drop-cap">{children}</p>,
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

const poemPtComponents: PortableTextComponents = {
  types: {
    image: ptComponents.types!.image,
    pullQuote: ptComponents.types!.pullQuote,
    externalEmbed: ptComponents.types!.externalEmbed,
  },
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: ptComponents.marks,
}

function AttributionBlock({ essay }: { essay: Essay }) {
  const text =
    essay.attribution === 'ai'
      ? 'Ryan develops all source material, strategy, and structure through conversation and outlined direction. Claude takes a first pass at shaping that raw material into draft form. From there Ryan directs a collaborative refinement process, section by section and sentence by sentence, until the voice, tone, and content are entirely his. The thinking, the memories, the instincts, and all editorial decisions belong to Ryan throughout.'
      : essay.attribution === 'custom' && essay.customAttributionText
      ? essay.customAttributionText
      : 'Written by Ryan Moriarty. All views and memories his own.'

  return (
    <div className="mt-2xl pt-md border-t border-divider">
      <p className="font-serif italic text-[13px] text-text-primary/50 leading-relaxed">
        {text}
      </p>
    </div>
  )
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

  const title = essay?.title ?? 'Writing'

  // ── Poem template ────────────────────────────────────────────
  if (essay?.contentType === 'Poem') {
    return (
      <main>
        <div className="bg-bg pt-16 pb-3xl">
          <div className="max-w-[52ch] mx-auto px-sm pt-2xl">

            <h1 className="font-sans font-normal text-h3 text-text-primary leading-tight mb-xl">
              {title}
            </h1>

            {essay.audioEmbed && (
              <div className="mb-lg">
                <iframe
                  src={essay.audioEmbed}
                  className="w-full rounded-sm"
                  style={{ height: '166px', border: 'none' }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Listen"
                />
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-y-sm font-sans text-caption text-text-primary/50 mb-2xl border-b border-divider pb-sm">
              <div className="flex flex-wrap items-center gap-x-md gap-y-xs">
                <span>Ryan Moriarty</span>
                {date && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={essay.publishedAt}>{date}</time>
                  </>
                )}
              </div>
              <ShareIcons
                title={title}
                url={`https://rorimori.com/writing/${slug}`}
              />
            </div>

            <article className="poem-body">
              {essay.body ? (
                <PortableText
                  value={essay.body as Parameters<typeof PortableText>[0]['value']}
                  components={poemPtComponents}
                  onMissingComponent={false}
                />
              ) : (
                <p className="font-serif text-text-primary/40 italic">Content coming soon.</p>
              )}
            </article>

            <AttributionBlock essay={essay} />

          </div>
        </div>
      </main>
    )
  }

  // ── Essay template (default) ──────────────────────────────────
  const heroImageUrl = essay?.heroImage
    ? urlFor(essay.heroImage).width(1400).url()
    : null

  const subhead = essay?.subhead ?? null

  return (
    <main>
      {/* pt-16 = nav height (64px), no gap between nav and hero */}
      <div className="bg-bg pt-16 pb-3xl">

        {/* Hero image — full width on mobile, capped at 1000px on desktop */}
        {heroImageUrl && (
          <div className="mb-md">
            <div className="w-full max-w-[1000px] mx-auto">
              <img
                src={heroImageUrl}
                alt={essay?.heroImage?.alt ?? ''}
                className="block w-full md:rounded-sm"
              />
            </div>
            {essay?.heroCaption && (
              <p className="font-serif italic text-[12px] text-right mt-xs leading-relaxed max-w-[1000px] mx-auto px-sm"
                 style={{ color: 'rgba(40, 38, 26, 0.5)' }}>
                {essay.heroCaption}
              </p>
            )}
          </div>
        )}

        {/* Content column */}
        <div className="max-w-[68ch] mx-auto px-sm">

          {/* Title */}
          <h1 className="font-sans font-normal text-[clamp(1.75rem,4vw,3rem)] text-text-primary leading-tight mb-xs">
            {title}
          </h1>

          {/* Subhead */}
          {subhead && (
            <p className="font-serif italic text-text-primary/60 text-[clamp(0.95rem,1.8vw,1.125rem)] mb-md">
              {subhead}
            </p>
          )}

          {/* Metadata + Share icons */}
          <div className="flex items-center justify-between flex-wrap gap-y-sm font-sans text-caption text-text-primary/50 mb-lg border-b border-divider pb-sm">
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

          {/* Attribution */}
          {essay && <AttributionBlock essay={essay} />}

        </div>
      </div>
    </main>
  )
}
