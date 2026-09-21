'use client'

import { useEffect, useState } from 'react'
import { ChevronUp, MessageCircle } from 'lucide-react'
import { MESSAGES, leadProps } from '@/lib/contact'

/**
 * Accesos fijos: hablar con un experto y volver al inicio de la página.
 *
 * - En la portada aparecen al pasar el hero (que ya trae sus propios botones).
 * - En las demás páginas (`alwaysVisible`) están siempre.
 * - `fallback` es a dónde lleva "experto" si aún no hay número de WhatsApp
 *   configurado: '#contacto' en la portada, '/#contacto' en las demás.
 */
export function FloatingContact({
  fallback = '#contacto',
  alwaysVisible = false,
}: {
  fallback?: string
  alwaysVisible?: boolean
}) {
  const [scrolled, setScrolled] = useState(alwaysVisible)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(alwaysVisible || window.scrollY > window.innerHeight * 0.6)
      setShowTop(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysVisible])

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  if (!scrolled && !showTop) return null

  return (
    <div
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      className="fixed right-4 z-40 flex items-center gap-2 sm:right-6"
    >
      {showTop && (
        <button
          type="button"
          onClick={toTop}
          aria-label="Volver al inicio de la página"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
      {scrolled && (
        <a
          {...leadProps(MESSAGES.expert, fallback)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-gold/60 bg-background/90 px-4 text-xs font-semibold uppercase tracking-widest text-gold shadow-lg backdrop-blur-md transition-colors hover:bg-gold/15"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="sm:hidden">Experto</span>
          <span className="hidden sm:inline">Hablar con un experto</span>
        </a>
      )}
    </div>
  )
}
