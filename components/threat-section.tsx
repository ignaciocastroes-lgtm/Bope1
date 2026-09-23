'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowRight, Radio, ShieldOff, Fingerprint } from 'lucide-react'
import { ThreatModal } from '@/components/threat-modal'

const teaser = [
  { icon: Fingerprint, text: 'Buscan el rastreador y lo anulan' },
  { icon: Radio, text: 'Bloquean la señal con un inhibidor' },
  { icon: ShieldOff, text: 'Presionan al conductor para desactivarlo' },
]

export function ThreatSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="amenazas" className="relative scroll-mt-16 border-y border-border/60 bg-[#0d0e12] py-20 sm:py-28">
      <div className="tactical-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-amber">
          <AlertTriangle className="h-3.5 w-3.5" />
          Quienes roban también se preparan
        </span>

        <h2 className="mt-5 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
          Un GPS solo no detiene a nadie
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Los que roban carga saben que existe el GPS, y tienen formas de lidiar con él. Nuestro
          sistema está diseñado pensando en eso, no solo en mostrar un punto en el mapa.
        </p>

        <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
          {teaser.map((t) => (
            <li
              key={t.text}
              className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4"
            >
              <t.icon className="h-5 w-5 text-amber" />
              <span className="text-pretty text-sm leading-snug text-foreground/90">{t.text}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
        >
          Así operan, y qué hacemos nosotros
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <ThreatModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
