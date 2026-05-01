'use client'

import { useState, useEffect } from 'react'
import { Type } from 'react-feather'
import { useDyslexia } from '@/lib/dyslexia-context'

export default function DyslexiaToggle({ transparent = false }: { transparent?: boolean }) {
  const { isDyslexia, toggle } = useDyslexia()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-[22px] h-[22px]" />

  return (
    <button
      onClick={toggle}
      aria-pressed={isDyslexia}
      aria-label="Toggle dyslexia-friendly reading mode"
      className={[
        'flex flex-row items-center gap-[5px] whitespace-nowrap font-sans text-[13px] px-[6px] py-[3px] rounded transition-colors duration-200',
        isDyslexia
          ? 'bg-accent text-[#28261A]'
          : transparent
          ? 'text-white/70 hover:text-white'
          : 'text-text-primary/50 hover:text-text-primary',
      ].join(' ')}
    >
      <Type size={15} strokeWidth={1.5} />
      <span className="hidden md:inline">Dyslexia friendly</span>
    </button>
  )
}
