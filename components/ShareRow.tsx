'use client'

import { useState } from 'react'

interface Props {
  title: string
  url: string
}

interface ShareLink {
  label: string
  href: string
}

export default function ShareRow({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links: ShareLink[] = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'Threads',
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'Bluesky',
      href: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
    },
  ]

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-3xl pt-lg border-t border-surface">
      <p className="font-sans text-caption uppercase tracking-[0.18em] text-text-primary/40 mb-md">
        Share
      </p>
      <div className="flex flex-wrap gap-x-lg gap-y-sm items-center">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-p2 text-text-primary/60 hover:text-text-primary transition-colors duration-150"
          >
            {label}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="font-sans text-p2 text-text-primary/60 hover:text-text-primary transition-colors duration-150"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}
