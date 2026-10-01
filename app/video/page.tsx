import { client, isSanityConfigured } from '@/sanity/lib/client'
import { videoListQuery } from '@/sanity/lib/queries'
import type { VideoItem } from '@/sanity/lib/types'
import VideoPlayer from './VideoPlayer'

export const metadata = {
  title: 'Video — RoriMori',
  description: 'Videos by RoriMori.',
  alternates: { canonical: '/video' },
}

const SOCIALS = [
  { name: 'YouTube',    href: 'https://www.youtube.com/@HelloRoriMori' },
  { name: 'Instagram',  href: 'https://www.instagram.com/hello.rorimori/' },
  { name: 'TikTok',     href: 'https://www.tiktok.com/@_rorimori' },
]

export default async function Video() {
  const videos: VideoItem[] = isSanityConfigured
    ? await client.fetch<VideoItem[]>(videoListQuery).catch(() => [])
    : []

  return (
    <main className="min-h-screen bg-bg px-sm pt-3xl pb-2xl md:px-2xl md:pb-3xl">
      <div className="max-w-[68ch] mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary mb-2xl">
          Video
        </h1>

        <div className="essay-body mb-2xl">
          <p>
            I&rsquo;m making a show. It&rsquo;s called <em>It&rsquo;s Oona</em>{' '}and it features
            my dog. There&rsquo;s more to it than that, but she is genuinely very compelling on
            camera. Episodes go here first.
          </p>
        </div>

        {/* Video list */}
        {videos.length === 0 ? (
          <p className="font-serif text-p1 text-text-primary/50 italic mb-3xl">
            First episode coming soon.
          </p>
        ) : (
          <div className="flex flex-col gap-2xl mb-3xl">
            {videos.map(v => {
              const date = v.publishedAt
                ? new Date(v.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null

              return (
                <div key={v._id}>
                  {v.series && (
                    <p className="font-sans text-caption text-text-primary/40 mb-xs tracking-widest uppercase">
                      {v.series}
                    </p>
                  )}
                  <h2 className="font-sans font-medium text-h5 text-text-primary mb-md leading-snug">
                    {v.title}
                  </h2>
                  <VideoPlayer url={v.youtubeUrl} title={v.title} />
                  {v.description && (
                    <p className="font-serif text-p1 text-text-primary/70 leading-relaxed mb-xs">
                      {v.description}
                    </p>
                  )}
                  <div className="flex items-center gap-md mt-xs flex-wrap">
                    {date && (
                      <p className="font-sans text-caption text-text-primary/35">{date}</p>
                    )}
                    <div className="flex items-center gap-sm">
                      <a
                        href={v.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Watch on YouTube"
                        className="text-text-primary/30 hover:text-text-primary transition-colors duration-200"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="5" width="20" height="14" rx="3"/>
                          <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
                        </svg>
                      </a>
                      {v.instagramUrl && (
                        <a
                          href={v.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Watch on Instagram"
                          className="text-text-primary/30 hover:text-text-primary transition-colors duration-200"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5"/>
                            <circle cx="12" cy="12" r="5"/>
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                          </svg>
                        </a>
                      )}
                      {v.tiktokUrl && (
                        <a
                          href={v.tiktokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Watch on TikTok"
                          className="text-text-primary/30 hover:text-text-primary transition-colors duration-200"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Social callout */}
        <div className="border-t border-text-primary/10 pt-xl">
          <p className="font-sans text-caption text-text-primary/40 mb-md tracking-widest uppercase">
            More on
          </p>
          <div className="flex flex-col gap-xs">
            {SOCIALS.map(({ name, href }) => (
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
