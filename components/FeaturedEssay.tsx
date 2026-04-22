import Link from 'next/link'

export default function FeaturedEssay() {
  return (
    <section className="bg-bg py-2xl md:py-3xl">
      <div className="max-w-5xl mx-auto px-sm md:px-2xl">

        <p className="font-sans text-caption uppercase tracking-[0.18em] text-text-primary/40">
          Featured Essay
        </p>

        <h2 className="font-serif font-normal text-text-primary mt-md leading-tight text-[clamp(2rem,4.5vw,3.5rem)]">
          The Long Way In
        </h2>

        <p className="font-serif font-normal text-text-primary/60 mt-sm leading-snug text-[clamp(1.1rem,1.8vw,1.375rem)]">
          On the parts of a career that metrics can't capture
        </p>

        <p className="font-sans text-p2 text-text-primary/40 mt-md">
          Seven sections. Approximately 3,500 words. Published April 2026.
        </p>

        <Link
          href="/writing/the-long-way-in"
          className="inline-block font-sans text-p1 text-accent mt-lg hover:underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          Read essay →
        </Link>

      </div>
    </section>
  )
}
