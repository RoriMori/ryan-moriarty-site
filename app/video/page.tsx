import { client, isSanityConfigured } from '@/sanity/lib/client'
import { videoListQuery } from '@/sanity/lib/queries'
import type { VideoItem } from '@/sanity/lib/types'

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

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

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
            I&rsquo;m making a show. It&rsquo;s called <em>It&rsquo;s Oona</em> and it features
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
              const embedUrl = getYouTubeEmbedUrl(v.youtubeUrl)
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
                  {embedUrl ? (
                    <div className="relative w-full mb-md" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={embedUrl}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-sm border border-text-primary/10"
                      />
                    </div>
                  ) : null}
                  {v.description && (
                    <p className="font-serif text-p1 text-text-primary/70 leading-relaxed mb-xs">
                      {v.description}
                    </p>
                  )}
                  {date && (
                    <p className="font-sans text-caption text-text-primary/35">{date}</p>
                  )}
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
