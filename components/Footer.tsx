import Link from 'next/link'

const NAV_LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/about',   label: 'About'   },
  { href: '/links',   label: 'Links'   },
]

export default function Footer() {
  return (
    <footer className="bg-bg border-t-2 border-accent px-sm py-2xl md:px-2xl">
      <div className="max-w-5xl mx-auto flex flex-col gap-xl md:flex-row md:items-center md:justify-between">

        <p className="font-sans text-p2 text-text-primary text-center md:text-left">
          &copy; 2026 Ryan Moriarty
        </p>

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
