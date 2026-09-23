'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { QUOTE } from '@/lib/company'
import { AboutModal } from '@/components/about-modal'

/** Gancho compacto "Conócenos": reemplaza la antigua sección larga de misión/visión. */
export function AboutTeaser() {
  const [open, setOpen] = useState(false)

  return (
    <section id="nosotros" className="scroll-mt-16 border-y border-border/60 bg-[#0d0e12] py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-4">
          <BopeLogo className="h-10 w-auto shrink-0" />
          <p className="text-pretty font-sans text-sm italic leading-snug text-muted-foreground sm:text-base">
            “{QUOTE}”
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex shrink-0 items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
        >
          Conócenos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
