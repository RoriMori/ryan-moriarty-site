'use client'

import { useState } from 'react'

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

export default function VideoPlayer({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  const videoId = getYouTubeId(url)

  // Fallback: URL didn't match any known YouTube format — just link out
  if (!videoId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-sans text-p1 text-text-primary mb-md underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
      >
        Watch on YouTube →
      </a>
    )
  }

  if (playing) {
    return (
      <div className="relative w-full mb-md" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-sm border border-text-primary/10"
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full mb-md rounded-sm overflow-hidden border border-text-primary/10 cursor-pointer group block"
      style={{ paddingBottom: '56.25%' }}
      aria-label={`Play ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors duration-200">
        <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors duration-200">
          <svg
            className="w-6 h-6 text-text-primary ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
