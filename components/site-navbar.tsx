'use client'

import { MessageCircle } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { MESSAGES, leadProps } from '@/lib/contact'

/**
 * Header mínimo, a propósito: sin menú de secciones (eso vive en el scroll
 * mismo y en el pie de página). Solo marca y un camino directo a WhatsApp.
 * El logo aquí es un enlace normal a "#inicio", no abre el modal de
 * Nosotros — ese botón vive en la franja del hero y en el pie de página.
 */
export function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="BOPE Security, volver al inicio" className="flex items-center gap-2.5">
          <BopeLogo className="h-10 w-auto" priority />
          <span className="font-sans text-sm font-semibold tracking-[0.18em] text-foreground">
            BOPE SECURITY
          </span>
        </a>

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
  )
}
