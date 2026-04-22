type Props = {
  params: Promise<{ slug: string }>
}

// Placeholder — replace with Sanity fetch once CMS is wired up
const ESSAY = {
  title:    'The Long Way In',
  subhead:  'On the parts of a career that metrics can\'t capture',
  author:   'Ryan Moriarty',
  date:     'April 2026',
  readTime: '~16 min read',
}

export function generateStaticParams() {
  return [{ slug: 'the-long-way-in' }]
}

export async function generateMetadata({ params }: Props) {
  const { slug: _slug } = await params
  return {
    title:       `${ESSAY.title} — Rori Mori`,
    description: ESSAY.subhead,
  }
}

export default async function EssayPage({ params }: Props) {
  await params

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#28261A]"
        style={{ height: '60vh', minHeight: '360px' }}
      >
        <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: 'url(/images/hero/home-hero-mobile.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: 'url(/images/hero/home-hero-desktop.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.65) 100%)' }}
        />
        <div className="absolute bottom-0 left-0 z-10 px-sm pb-xl md:px-2xl md:pb-2xl" style={{ maxWidth: '48rem' }}>
          <h1 className="font-sans font-normal text-white leading-tight text-[clamp(1.75rem,4vw,3rem)]">
            {ESSAY.title}
          </h1>
          <p className="font-serif italic text-white/80 mt-xs text-[clamp(0.95rem,1.8vw,1.125rem)]">
            {ESSAY.subhead}
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="bg-bg py-2xl md:py-3xl px-sm">
        <div className="max-w-[68ch] mx-auto">

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-md gap-y-xs font-sans text-caption text-text-primary/50 mb-xl border-b border-surface pb-lg">
            <span>{ESSAY.author}</span>
            <span aria-hidden="true">·</span>
            <time>{ESSAY.date}</time>
            <span aria-hidden="true">·</span>
            <span>{ESSAY.readTime}</span>
          </div>

          {/* Body */}
          <article className="essay-body">

            <p className="drop-cap">
              There is a version of this essay that starts with a job title and ends with a lesson
              learned. That version is easier to write. It has a clear shape — a before, a during,
              an after. It knows where it's going before it starts. This is not that version.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
              voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab
              illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <blockquote className="pull-quote">
              The parts of a career worth keeping are rarely the parts you planned for.
            </blockquote>

            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
              quisquam est qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit, sed
              quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam.
            </p>

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga.
            </p>

            <figure className="essay-figure">
              <div className="w-full bg-surface rounded-sm" style={{ aspectRatio: '3/2' }} />
              <figcaption>
                Placeholder caption — a short description of what the image shows and why it matters.
              </figcaption>
            </figure>

            <div className="section-break" aria-hidden="true">* * *</div>

            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
              eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum
              rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </p>

            <p>
              Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus
              id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus. Et harum quidem rerum facilis est et expedita distinctio.
            </p>

            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
              molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
            </p>

          </article>
        </div>
      </div>

    </main>
  )
}
