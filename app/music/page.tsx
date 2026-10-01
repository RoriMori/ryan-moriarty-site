export const revalidate = 60

import { client, isSanityConfigured } from '@/sanity/lib/client'
import { trackListQuery } from '@/sanity/lib/queries'
import type { Track } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata = {
  title: 'Music — RoriMori',
  description: 'Original music by RoriMori.',
  alternates: { canonical: '/music' },
}

const PLATFORMS = [
  {
    name: 'SoundCloud',
    href: 'https://soundcloud.com/rorimori',
    description: 'RoriMori on SoundCloud',
  },
  {
    name: 'Bandcamp',
    href: 'https://rorimori.bandcamp.com',
    description: 'RoriMori on Bandcamp',
  },
]

export default async function Music() {
  const tracks: Track[] = isSanityConfigured
    ? await client.fetch<Track[]>(trackListQuery).catch(() => [])
    : []

  return (
    <main className="min-h-screen bg-bg px-sm pt-3xl pb-2xl md:px-2xl md:pb-3xl">
      <div className="max-w-[68ch] mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary mb-2xl">
          Music
        </h1>

        <div className="essay-body mb-2xl">
          <p>
            Music was the first thing. Before the career, before the professional framing.
            I&rsquo;m making tracks again now, releasing them under the name RoriMori, and
            they live here before they go anywhere else.
          </p>
        </div>

        {/* Track list */}
        {tracks.length === 0 ? (
          <p className="font-serif text-p1 text-text-primary/50 italic mb-3xl">
            First tracks coming soon.
          </p>
        ) : (
          <div className="flex flex-col gap-md mb-3xl">
            {tracks.map(track => (
              <AudioPlayer
                key={track._id}
                title={track.title}
                audioUrl={track.audioUrl}
                description={track.description}
                releasedAt={track.releasedAt}
                coverArtUrl={
                  track.coverArt
                    ? urlFor(track.coverArt).width(128).height(128).url()
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {/* Platform links */}
        <div className="border-t border-text-primary/10 pt-xl">
          <p className="font-sans text-caption text-text-primary/40 mb-md tracking-widest uppercase">
            Also on
          </p>
          <div className="flex flex-col gap-xs">
            {PLATFORMS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-p1 text-text-primary underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent transition-all duration-200 w-fit"
              >
                {name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
