import type { Metadata } from 'next'
import { Work_Sans, Merriweather, Atkinson_Hyperlegible } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import DyslexiaProvider from '@/lib/dyslexia-context'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
})

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
  weight: ['400', '700'],
})

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-atkinson',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Ryan Moriarty',
  description: 'Writing and whatever else.',
  metadataBase: new URL('https://www.rorimori.com'),
  alternates: { canonical: '/' },
  verification: {
    google: '9vVZ4QtaEooSRiTv1EGISN3sYyZGTbGswMR5_wyQqwc',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${merriweather.variable} ${atkinsonHyperlegible.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <DyslexiaProvider>
            <Nav />
            {children}
            <Footer />
          </DyslexiaProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
