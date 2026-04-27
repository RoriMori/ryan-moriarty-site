'use client'

import { useRef, useEffect } from 'react'

// SVG coordinate constants (viewBox 0 0 358 123)
// "R" left edge: x=39, "i" right edge: x=319, content width: 280
const SVG_LEFT_PAD  = 39  / 358  // 10.89%
const SVG_CONTENT_W = 280 / 358  // 78.21%

export default function Hero() {
  const imgRef     = useRef<HTMLImageElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    async function fit() {
      await document.fonts.ready
      const img = imgRef.current
      const p   = taglineRef.current
      if (!img || !p || img.offsetWidth === 0) return

      // Target width is just the letter span, not the full SVG width
      const targetWidth = img.offsetWidth * SVG_CONTENT_W
      const { fontFamily } = window.getComputedStyle(p)

      const probe = document.createElement('span')
      probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-family:${fontFamily};font-style:italic;font-size:16px`
      probe.textContent = p.textContent
      document.body.appendChild(probe)
      const naturalWidth = probe.offsetWidth
      document.body.removeChild(probe)

      p.style.fontSize = `${16 * (targetWidth / naturalWidth)}px`
    }

    const img = imgRef.current
    img?.addEventListener('load', fit)
    fit()

    const ro = new ResizeObserver(fit)
    if (img) ro.observe(img)

    return () => {
      ro.disconnect()
      img?.removeEventListener('load', fit)
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden bg-[#28261A] h-screen min-h-screen"
      style={{ height: '100vh', minHeight: '100vh' }}
    >

      {/* Mobile image */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: 'url(/images/hero/home-hero-mobile.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 0%',
        }}
      />

      {/* Desktop image */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: 'url(/images/hero/home-hero-desktop.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 0%',
        }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
      />

      {/* Text: lower-left */}
      <div className="absolute bottom-0 left-0 z-10 px-sm pb-xl md:px-2xl md:pb-2xl">
        <div style={{ width: 'clamp(200px, 38vw, 480px)' }}>
          <img
            ref={imgRef}
            src="/wordmark-nav.svg"
            alt="RoriMori"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <p
            ref={taglineRef}
            className="font-serif italic"
            style={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              // Align tagline to the actual letter bounds, not the SVG bounding box
              marginLeft:  `${SVG_LEFT_PAD  * 100}%`,
              width:       `${SVG_CONTENT_W * 100}%`,
              // Cancel the SVG's bottom whitespace (34.58/358 ≈ 9.66% of container width)
              marginTop: 'calc(-9.66% + 8px)',
              background: 'linear-gradient(to right, #F05555, #F57A7A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A spot for the thought, a rest for the note
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#featured-essay"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/70 transition-colors duration-200 animate-bounce"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>

    </section>
  )
}
