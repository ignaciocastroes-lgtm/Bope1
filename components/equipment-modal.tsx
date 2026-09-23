'use client'

import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight, MapPin, MessageCircle, TriangleAlert } from 'lucide-react'
import { hasWhatsApp, leadProps, openQuote } from '@/lib/contact'
import { PRODUCTS } from '@/lib/catalog'

const steps = [
  { title: 'Elige tu equipo', text: 'Del catálogo, o cuéntanos tu caso y te ayudamos a escoger.' },
  { title: 'Te cotizamos equipo e instalación', text: 'Recibes el precio total, con o sin instalación profesional.' },
  { title: 'Un técnico lo instala', text: 'Queda instalado y confirmamos que el equipo está reportando.' },
]

/**
 * Modal B2B de equipos GPS: catálogo, instalación, y la misma comparación
 * que hace el resto del mercado (corte de motor remoto) — con la salvedad
 * que nos separa de él.
 */
export function EquipmentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    onClose()
    returnFocusRef.current?.focus()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    returnFocusRef.current = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    const focusables = (): HTMLElement[] =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea'),
          )
        : []
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="equip-title"
            className="relative my-auto w-full max-w-3xl rounded-2xl border border-gold/30 bg-[#121216] shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                Equipos GPS
              </span>
              <h2
                id="equip-title"
                className="mt-2 text-balance font-sans text-2xl font-bold uppercase leading-tight tracking-tight text-foreground"
              >
                Lo mismo que ofrece cualquiera, con una salvedad
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                Rastreadores GPS 4G con instalación profesional, como toda empresa del rubro. Sin
                precios de vitrina: cotizamos equipo e instalación, y te asesoramos con el plan de
                datos de cada equipo.
              </p>

              {/* El sarcasmo con propósito: la salvedad que nos separa */}
              <div className="mt-4 flex gap-3 rounded-lg border border-amber/40 bg-amber/10 p-4">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <p className="text-pretty text-sm leading-relaxed text-foreground/90">
                  Casi todo el mercado vende también el corte de motor a control remoto, sin
                  condición de velocidad. Nosotros no lo activamos con el camión en marcha: cortarle
                  el motor a un camión de alto tonelaje a 90&nbsp;km/h no es una función más del
                  catálogo, es un accidente con responsabilidad civil — y esa responsabilidad no la
                  asume quien vendió el botón.
                </p>
              </div>

              {/* Catálogo */}
              <div className="mt-8">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight text-foreground">
                  Equipos disponibles
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Solo mostramos equipos con ficha técnica verificada, todos en red 4G.
                </p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {PRODUCTS.map((p) => (
                    <li key={p.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                      <div className="relative aspect-[4/3] w-full bg-white/95">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(min-width: 640px) 45vw, 90vw"
                            className="object-contain p-4"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-secondary">
                            <MapPin className="h-10 w-10 text-gold/60" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h4 className="font-sans text-base font-semibold text-foreground">{p.name}</h4>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">{p.spec}</p>
                        <button
                          type="button"
                          onClick={() => openQuote({ productIds: [p.id] })}
                          className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
                        >
                          Cotizar este equipo
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => openQuote()}
                    className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
                  >
                    Cotiza con nosotros
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  {hasWhatsApp && (
                    <a
                      {...leadProps('Hola BOPE Security, quiero cotizar un GPS para mi vehículo.')}
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-500" />
                      Prefiero escribir por WhatsApp
                    </a>
                  )}
                </div>
              </div>

              {/* Cómo funciona */}
              <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="font-sans text-2xl font-bold text-gold/60">{i + 1}</span>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-foreground">{s.title}</h4>
                      <p className="mt-1 text-pretty text-xs leading-relaxed text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
