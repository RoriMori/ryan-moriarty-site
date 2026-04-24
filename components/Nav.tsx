'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'react-feather'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/about',   label: 'About'   },
  { href: '/links',   label: 'Links'   },
] as const

function isHeroRoute(pathname: string) {
  return pathname === '/'
}

function ThemeToggle({ transparent }: { transparent: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-[22px] h-[22px]" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'p-xs rounded transition-colors duration-300',
        transparent ? 'text-white/70 hover:text-white' : 'text-text-primary/50 hover:text-text-primary',
      ].join(' ')}
    >
      {isDark
        ? <Sun size={18} strokeWidth={1.5} />
        : <Moon size={18} strokeWidth={1.5} />
      }
    </button>
  )
}

export default function Nav() {
  const pathname   = usePathname()
  const heroRoute  = isHeroRoute(pathname)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    setScrolled(window.scrollY > 40)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

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
          transparent ? 'bg-transparent' : 'bg-bg',
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
            RoriMori
          </Link>

          {/* Desktop: links + theme toggle */}
          <div className="hidden md:flex items-center gap-lg">
            <ul className="flex items-center gap-lg list-none">
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
            <ThemeToggle transparent={transparent} />
          </div>

          {/* Mobile: theme toggle + menu button */}
          <div className="md:hidden flex items-center gap-xs">
            <ThemeToggle transparent={transparent} />
            <button
              className={[
                'p-xs rounded transition-colors duration-300',
                transparent ? 'text-white' : 'text-text-primary',
              ].join(' ')}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg flex flex-col md:hidden">
          {/* Overlay header row */}
          <div className="flex items-center justify-between px-sm h-16 shrink-0">
            <Link
              href="/"
              className="font-sans font-bold text-[20px] text-text-primary tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              RoriMori
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
