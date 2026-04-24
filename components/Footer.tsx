import Link from 'next/link'

const NAV_LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/about',   label: 'About'   },
  { href: '/links',   label: 'Links'   },
]

export default function Footer() {
  return (
    <footer className="bg-bg px-sm py-2xl md:px-2xl">
      <div className="max-w-5xl mx-auto flex flex-col gap-xl md:flex-row md:gap-0 md:items-start">

        {/* Left column: attribution + copyright */}
        <div className="flex-1 flex flex-col gap-sm text-center md:text-left">
          <p className="font-serif text-p2 text-text-primary/60 leading-relaxed">
            Ryan Moriarty owns the content and drives the work. Claude edits and organizes. For a neuro-spicy brain, AI lifts the constraints of linear thinking. Like a door finally unlocked. The puzzle pieces just move.
          </p>
          <p className="font-sans text-p2 text-text-primary">
            &copy; 2026 Ryan Moriarty
          </p>
        </div>

        {/* Vertical divider — desktop only */}
        <div className="hidden md:block w-px bg-accent mx-2xl self-stretch" />

        {/* Right column: nav links */}
        <nav>
          <ul className="flex flex-col items-center md:items-end gap-xs list-none">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-sans text-p2 text-text-primary underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent transition-all duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </footer>
  )
}
