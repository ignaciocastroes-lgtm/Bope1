'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { AboutModal } from '@/components/about-modal'
import { MESSAGES, leadProps } from '@/lib/contact'

/**
 * Header mínimo, a propósito: sin menú de secciones (eso vive en el scroll
 * mismo y en el pie de página). El logo + nombre es el mismo botón que en el
 * hero: abre "Quiénes somos". Es el único punto fijo mientras se hace
 * scroll, así que es donde más sentido tiene mantenerlo alcanzable.
 *
 * El modal se renderiza FUERA de <header> a propósito: el header lleva
 * backdrop-blur, y un modal de posición fija anidado dentro de un ancestro
 * con blur queda atrapado dentro de esa caja en vez de cubrir la pantalla.
 */
export function SiteNavbar() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            aria-haspopup="dialog"
            aria-label="Quiénes somos: misión, visión y valores de BOPE Security"
            className="group flex items-center gap-2.5 rounded-md transition-colors"
          >
            <BopeLogo className="h-10 w-auto" priority />
            <span className="font-sans text-sm font-semibold tracking-[0.18em] text-foreground transition-colors group-hover:text-gold">
              BOPE SECURITY
            </span>
          </button>

          <a
            {...leadProps(MESSAGES.expert)}
            className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="sm:hidden">Experto</span>
            <span className="hidden sm:inline">Hablar con un experto</span>
          </a>
        </div>
      </header>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
