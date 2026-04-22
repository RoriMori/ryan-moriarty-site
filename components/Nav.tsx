'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'react-feather'

const NAV_LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/about',   label: 'About'   },
  { href: '/links',   label: 'Links'   },
] as const

// Routes where the nav starts transparent and overlays a hero image.
// Individual essay pages (/writing/[slug]) are also hero routes.
function isHeroRoute(pathname: string) {
  return pathname === '/' || /^\/writing\/.+/.test(pathname)
}

export default function Nav() {
  const pathname   = usePathname()
  const heroRoute  = isHeroRoute(pathname)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  // Re-check scroll on every route change — scroll state persists across
  // navigations because Nav never unmounts from the root layout.
  useEffect(() => {
    setScrolled(window.scrollY > 40)
  }, [pathname])

  // Continuous scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const transparent = heroRoute && !scrolled

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          transparent
            ? 'bg-transparent'
            : 'bg-bg border-b border-surface',
        ].join(' ')}
      >
        <nav className="max-w-5xl mx-auto px-sm flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className={[
              'font-sans font-bold transition-colors duration-300',
              'text-[20px] tracking-wide',
              transparent ? 'text-white' : 'text-text-primary',
            ].join(' ')}
          >
            Rori Mori
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-lg list-none">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'font-sans text-[18px] transition-colors duration-200',
                      active && 'underline underline-offset-4',
                      active
                        ? transparent ? 'text-white font-medium'           : 'text-text-primary font-medium'
                        : transparent ? 'text-white/75 hover:text-white'   : 'text-text-primary/60 hover:text-text-primary',
                    ].filter(Boolean).join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile menu button */}
          <button
            className={[
              'md:hidden p-xs rounded transition-colors duration-300',
              transparent ? 'text-white' : 'text-text-primary',
            ].join(' ')}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg flex flex-col md:hidden">
          {/* Overlay header row */}
          <div className="flex items-center justify-between px-sm h-16 border-b border-surface shrink-0">
            <Link
              href="/"
              className="font-sans font-bold text-[20px] text-text-primary tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              Rori Mori
            </Link>
            <button
              className="p-xs text-text-primary"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Overlay links */}
          <ul className="flex flex-col px-sm pt-xl gap-lg list-none">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'font-sans text-h4 block transition-colors duration-200',
                      active
                        ? 'text-text-primary font-medium'
                        : 'text-text-primary/60 hover:text-text-primary',
                    ].join(' ')}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
