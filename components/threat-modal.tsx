'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight, ChevronDown, Users } from 'lucide-react'
import { THREATS } from '@/lib/threats'
import { MESSAGES, leadProps } from '@/lib/contact'
import { SecurityTruck } from '@/components/security-truck'
import type { LevelId } from '@/lib/security-levels'

/**
 * Modal único "Plan de acción". El orden encierra la lógica real del
 * negocio, no solo una jerarquía visual:
 *
 * 1. El auto escolta abre porque es la base que SIEMPRE está y la que de
 *    verdad reporta -- esté o no la carga asegurada con tecnología.
 * 2. El auto no interviene contra quien roba (solo observa y avisa). Por
 *    eso la tecnología (los 4 niveles) es lo que sí se despliega contra
 *    eso, y se dosifica según el valor de la carga: más nivel, más
 *    protección, no "más de lo mismo".
 * 3. Las tácticas de robo cierran como contexto: por qué hace falta todo
 *    lo anterior, no como la puerta de entrada al modal.
 */
export function ActionPlanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const truckRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [jumpTo, setJumpTo] = useState<{ level: LevelId; token: number } | null>(null)
  const [openThreat, setOpenThreat] = useState<string | null>(null)

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

  function goToLevel(level: LevelId) {
    setJumpTo({ level, token: Date.now() })
    truckRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
            aria-labelledby="plan-title"
            className="relative my-auto w-full max-w-3xl rounded-2xl border border-amber/30 bg-[#121216] shadow-2xl"
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
                Presencia real, no solo tecnología
              </p>
              <h2
                id="plan-title"
                className="mt-2 text-balance font-sans text-2xl font-bold uppercase leading-tight tracking-tight text-foreground"
              >
                Un auto escolta te sigue, siempre
              </h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                Sigue a distancia. No interviene: observa y avisa directo a 133 y al dueño.
                Actívalo o apágalo en el camión de abajo para ver la diferencia.
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                Contra quien roba, el auto no puede intervenir — para eso está la tecnología de
                abajo, que se agrega según el valor de tu carga.
              </p>

              {/* El camión: niveles de tecnología + auto escolta, todo en una sola escena */}
              <div ref={truckRef} className="mt-6 scroll-mt-4">
                <SecurityTruck jumpTo={jumpTo} />
              </div>

              {/* El argumento de fondo */}
              <div className="mt-8 rounded-xl border border-gold/40 bg-gold/5 p-5 sm:p-6">
                <p className="flex items-center gap-2 font-sans text-base font-semibold text-foreground">
                  <Users className="h-5 w-5 text-gold" />
                  Lo más sofisticado no reemplaza a un equipo
                </p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Ningún nivel de tecnología reacciona solo: alguien tiene que ver la alerta,
                  decidir y moverse. Por eso el sistema se apoya en un grupo de coordinación para
                  el transporte de un lado a otro, no solo en sensores y un mapa.
                </p>
                <a
                  {...leadProps(MESSAGES.escort)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
                >
                  Hablar de escolta y coordinación
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Las amenazas quedan como contexto: por qué hace falta todo lo anterior */}
              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-amber">
                Cómo operan quienes roban carga
              </p>
              <h3 className="mt-2 text-balance font-sans text-lg font-bold uppercase leading-tight tracking-tight text-foreground">
                Por qué hace falta todo esto
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                Sin manual ni pasos: toca cada táctica para ver qué hacemos.
              </p>

              <div className="mt-6 space-y-2.5">
                {THREATS.map((t) => {
                  const isOpen = openThreat === t.id
                  return (
                    <div
                      key={t.id}
                      className={`rounded-xl border bg-card transition-colors ${
                        isOpen ? 'border-gold/50' : 'border-border hover:border-gold/30'
                      }`}
                    >
                      <h3>
                        <button
                          type="button"
                          id={`threat-btn-${t.id}`}
                          aria-expanded={isOpen}
                          aria-controls={`threat-panel-${t.id}`}
                          onClick={() => setOpenThreat(isOpen ? null : t.id)}
                          className="flex w-full items-center gap-3 p-4 text-left sm:p-5"
                        >
                          <span className="flex-1 font-sans text-sm font-semibold text-foreground sm:text-base">
                            {t.title}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${
                              isOpen ? 'rotate-180 text-gold' : ''
                            }`}
                          />
                        </button>
                      </h3>
                      <div
                        id={`threat-panel-${t.id}`}
                        role="region"
                        aria-labelledby={`threat-btn-${t.id}`}
                        inert={!isOpen}
                        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

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
