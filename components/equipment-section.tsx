'use client'

import { useState } from 'react'
import { ArrowRight, Wrench } from 'lucide-react'
import { EquipmentModal } from '@/components/equipment-modal'

/** Gancho compacto "Equipos GPS": el catálogo y la instalación viven en el modal. */
export function EquipmentSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="equipos" className="relative scroll-mt-16 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
            <Wrench className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-sans text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl">
              ¿Necesitas equipos GPS?
            </h2>
            <p className="mt-1 text-pretty text-sm text-muted-foreground">
              Rastreadores 4G con instalación profesional. Sin precios de vitrina.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group inline-flex shrink-0 items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
        >
          Ver equipos y cotizar
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <EquipmentModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
