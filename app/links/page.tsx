export const metadata = {
  title: 'Links — RoriMori',
  description: 'Where else to find Ryan Moriarty.',
}

const links = [
  {
    name: 'opscraft',
    description: 'The professional work',
    href: 'https://opscraft.notion.site/Home-1c0b2fb5d158805e82dbc8eb18968a71?pvs=74',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="40" cy="40" r="18" fill="none" stroke="#EDD543" strokeWidth="3"/>
        <circle cx="40" cy="40" r="5" fill="currentColor"/>
        <line x1="4" y1="40" x2="22" y2="40" stroke="currentColor" strokeWidth="2"/>
        <line x1="58" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="2"/>
        <line x1="40" y1="4" x2="40" y2="22" stroke="currentColor" strokeWidth="2"/>
        <line x1="40" y1="58" x2="40" y2="76" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    description: 'Career and contact',
    href: 'http://www.linkedin.com/in/rmoriarty',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <line x1="12" y1="60" x2="68" y2="60" stroke="#EDD543" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="40" y1="18" x2="12" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>
        <line x1="40" y1="18" x2="68" y2="60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>
        <circle cx="40" cy="18" r="10" fill="currentColor"/>
        <circle cx="12" cy="60" r="10" fill="currentColor"/>
        <circle cx="68" cy="60" r="10" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'SoundCloud',
    description: 'The music',
    href: 'https://soundcloud.com/ryan-moriarty-1',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <rect x="8" y="46" width="8" height="26" rx="4" fill="currentColor"/>
        <rect x="22" y="32" width="8" height="40" rx="4" fill="#EDD543"/>
        <rect x="36" y="20" width="8" height="52" rx="4" fill="currentColor"/>
        <rect x="50" y="28" width="8" height="44" rx="4" fill="#EDD543"/>
        <rect x="64" y="40" width="8" height="32" rx="4" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function Links() {
  return (
    <main className="min-h-screen bg-bg px-sm pt-3xl pb-2xl md:px-2xl md:pb-3xl">
      <div className="max-w-[68ch] mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary mb-2xl">
          Links
        </h1>

        <div className="flex flex-col gap-[48px] md:flex-row md:gap-0 md:justify-around">
          {links.map(({ name, description, href, icon }) => (
            <div key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group py-xl flex flex-col items-center text-center block"
              >
                <div className="mb-md">{icon}</div>
                <span className="font-sans font-medium text-h5 text-text-primary underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-accent transition-all duration-200">
                  {name}
                </span>
                <p className="font-serif text-p1 text-text-primary/50 mt-xs leading-snug">
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-3xl">
          <p className="font-sans text-p2 text-text-primary/50 mb-sm tracking-wide uppercase">
            Now playing
          </p>
          <iframe
            width="100%"
            height="166"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ryan-moriarty-1&color=%23EDD543&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&visual=false"
            style={{ border: 'none' }}
          />
        </div>

      </div>
    </main>
  )
}
