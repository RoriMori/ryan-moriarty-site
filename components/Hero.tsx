export default function Hero() {
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

      {/* Gradient: transparent → rgba(0,0,0,0.3) at bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
      />

      {/* Text: lower-left */}
      <div className="absolute bottom-0 left-0 z-10 px-sm pb-xl md:px-2xl md:pb-2xl">
        <h1 className="font-sans font-normal text-white leading-none tracking-tight text-[clamp(2.75rem,8vw,5rem)]">
          Rori Mori
        </h1>
        <p className="font-serif italic text-white/90 mt-md text-[clamp(1rem,2vw,1.375rem)]">
          I write, make music, design, and build. Apparently that's unexpected.
        </p>
      </div>

    </section>
  )
}
