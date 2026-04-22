import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        'text-primary': 'var(--color-text-primary)',
        accent: 'var(--color-accent)',
        'accent-mid': 'var(--color-accent-mid)',
      },
      spacing: {
        // 8px grid scale from design system
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '72px',
        '3xl': '128px',
      },
      fontSize: {
        // Major thirds scale, 1.25 ratio, 16px base
        'p2':    ['12.8px',  { lineHeight: '19.2px', letterSpacing: '0px' }],
        'caption': ['12.8px', { lineHeight: '16px',   letterSpacing: '0.4px' }],
        'p1':    ['16px',    { lineHeight: '24px',    letterSpacing: '0.5px' }],
        'link':  ['16px',    { lineHeight: '24px',    letterSpacing: '0.5px' }],
        'btn':   ['16px',    { lineHeight: '24px',    letterSpacing: '1.25px' }],
        'sub2':  ['16px',    { lineHeight: '24px',    letterSpacing: '0px' }],
        'sub1':  ['25px',    { lineHeight: '25px',    letterSpacing: '0px' }],
        'h6':    ['20px',    { lineHeight: '20px',    letterSpacing: '0px' }],
        'h5':    ['25px',    { lineHeight: '25px',    letterSpacing: '-0.18px' }],
        'h4':    ['31.25px', { lineHeight: '31.25px', letterSpacing: '0.25px' }],
        'h3':    ['39.063px',{ lineHeight: '39.063px',letterSpacing: '0px' }],
        'h2':    ['61.035px',{ lineHeight: '61.035px',letterSpacing: '-0.5px' }],
        'h1':    ['76.294px',{ lineHeight: '76.294px',letterSpacing: '-1.5px' }],
      },
      maxWidth: {
        // Essay reading line length: 65–75 characters ≈ ~68ch
        prose: '68ch',
      },
    },
  },
  plugins: [],
}

export default config
