import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[85vh] md:h-screen overflow-hidden bg-[#28261A]">

      {/* Mobile image */}
      <Image
        src="/images/hero/hero-mobile.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top md:hidden"
        priority
      />

      {/* Desktop image */}
      <Image
        src="/images/hero/hero-desktop.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top hidden md:block"
        priority
      />

      {/* Gradient: transparent → rgba(0,0,0,0.3) at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
      />

      {/* Text: lower-left */}
      <div className="absolute bottom-0 left-0 z-10 px-sm pb-xl md:px-2xl md:pb-2xl">
        <h1 className="font-sans font-bold text-white leading-none tracking-tight text-[clamp(2.75rem,8vw,5rem)]">
          Rori Mori
        </h1>
        <p className="font-serif italic text-white/90 mt-md text-[clamp(1rem,2vw,1.375rem)]">
          Writer. Creative. Taking the long way in.
        </p>
      </div>

    </section>
  )
}
