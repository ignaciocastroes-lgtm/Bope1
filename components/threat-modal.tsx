'use client'

import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { THREATS } from '@/lib/threats'
import { focusLevel } from '@/lib/contact'

/**
 * Modal independiente: explica, a nivel de patrón (sin pasos ni detalles
 * técnicos), qué hacen quienes roban carga, y qué nivel del camión responde
 * a cada táctica. "Ver en el camión" cierra el modal, baja a la sección de
 * equipos y detiene la demostración en el nivel correspondiente.
 */
export function ThreatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

  function goToLevel(level: number) {
    close()
    // Espera a que el modal cierre y la sección exista antes de enfocar el nivel.
    window.setTimeout(() => focusLevel(level), 50)
  }

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
            aria-labelledby="threat-title"
            className="relative my-auto w-full max-w-2xl rounded-2xl border border-amber/30 bg-[#121216] shadow-2xl"
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
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber">
                Cómo operan quienes roban carga
              </p>
              <h2
                id="threat-title"
                className="mt-2 text-balance font-sans text-2xl font-bold uppercase leading-tight tracking-tight text-foreground"
              >
                Y lo que hace cada nivel al respecto
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                Sin manual ni pasos: solo lo que necesitas entender para elegir bien tu nivel de
                protección.
              </p>

              <ul className="mt-6 space-y-4">
                {THREATS.map((t) => (
                  <li key={t.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                    <h3 className="font-sans text-base font-semibold text-foreground sm:text-lg">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {t.text}
                    </p>
                    <div className="mt-3 rounded-lg border border-gold/30 bg-gold/5 p-3">
                      <p className="text-pretty text-sm leading-relaxed text-foreground/90">
                        <span className="font-semibold text-gold">Qué hacemos: </span>
                        {t.response}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToLevel(t.level)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold/80"
                    >
                      Ver Nivel {t.level} en el camión
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                No usamos inhibidores ni ninguna de estas tácticas: describimos el riesgo para que
                elijas mejor, no como instructivo.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
