export const metadata = {
  title: 'About — RoriMori',
  description: 'The human version of Ryan Moriarty.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <main className="min-h-screen bg-bg px-sm pt-3xl pb-2xl md:px-2xl md:pb-3xl">
      <div className="max-w-[68ch] mx-auto">

        <h1 className="font-sans font-normal text-h3 text-text-primary mb-2xl">
          About
        </h1>

        <article className="essay-body">
          <p>
            I took the long way in. Or around. Depends on the day.
          </p>
          <p>
            I&rsquo;ve spent most of my career in brand and creative operations, the work that
            makes other people&rsquo;s big ideas actually happen. Strategy that doesn&rsquo;t fall
            apart in execution. Systems that give creative people room to move. At the center of
            all of it, always, is people. The digital stuff is just how information travels. The
            point is always the person on the other end.
          </p>
          <p>
            Music came first. Then design found it, and for years they ran together, two sides of
            the same brain. The best moments were when what I made on the outside matched what I
            felt on the inside. That alignment. I&rsquo;ve been chasing it in every room I&rsquo;ve
            worked in since. I&rsquo;ve just learned to speak spreadsheet when I have to.
          </p>
          <p>
            I&rsquo;ve known I was neurodivergent since I was a kid. Spent most of my adult life
            treating it like a footnote. Grit and tenacity would cover it. They mostly did, until
            they didn&rsquo;t. The last few years I&rsquo;ve been slower about it. More curious.
            Giving myself some room to figure out what it actually means, now that I&rsquo;m not
            just trying to outrun it.
          </p>
          <p>
            I live in San Francisco. I&rsquo;m figuring out what comes next. I work with AI in
            ways I actually disclose, which turns out to be unusual enough to be a thing.
          </p>
          <p>
            Outside all of it: I&rsquo;m a dad. I have a partner who is genuinely too good for
            the situation. We hike, travel, stay silly, and generally try to make the whole thing
            feel like an adventure.
          </p>
          <p>
            The professional version of all this lives at{' '}
            <a
              href="https://opscraft.notion.site/Home-1c0b2fb5d158805e82dbc8eb18968a71?pvs=74"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-accent decoration-2 underline-offset-4 hover:decoration-[3px] transition-all"
            >
              opscraft
            </a>
            . That&rsquo;s the proof. This is the person.
          </p>
        </article>

      </div>
    </main>
  )
}
