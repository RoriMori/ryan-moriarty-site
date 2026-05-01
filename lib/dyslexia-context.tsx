'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface DyslexiaCtx {
  isDyslexia: boolean
  toggle: () => void
}

const DyslexiaContext = createContext<DyslexiaCtx>({ isDyslexia: false, toggle: () => {} })

export function useDyslexia() {
  return useContext(DyslexiaContext)
}

export default function DyslexiaProvider({ children }: { children: React.ReactNode }) {
  const [isDyslexia, setIsDyslexia] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('dyslexia-mode') === 'true'
    setIsDyslexia(stored)
    if (stored) {
      document.documentElement.setAttribute('data-dyslexia', 'true')
    } else {
      document.documentElement.removeAttribute('data-dyslexia')
    }
  }, [])

  const toggle = useCallback(() => {
    setIsDyslexia(prev => {
      const next = !prev
      localStorage.setItem('dyslexia-mode', String(next))
      if (next) {
        document.documentElement.setAttribute('data-dyslexia', 'true')
      } else {
        document.documentElement.removeAttribute('data-dyslexia')
      }
      return next
    })
  }, [])

  return (
    <DyslexiaContext.Provider value={{ isDyslexia, toggle }}>
      {children}
    </DyslexiaContext.Provider>
  )
}
