'use client'

import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Target, Eye, ListChecks, ArrowRight, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { ValuesWheel } from '@/components/values-wheel'
import { MISSION, OBJECTIVES, POLICY_PARAGRAPHS, QUOTE, VISION } from '@/lib/company'
import { MESSAGES, leadProps } from '@/lib/contact'

/** Modal "Nosotros": misión, visión, valores y objetivos, fuera del scroll del index. */
export function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const [showPolicy, setShowPolicy] = useState(false)

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
            aria-labelledby="about-title"
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
                Quiénes somos
              </span>
              <h2
                id="about-title"
                className="mt-3 text-balance font-sans text-2xl font-bold italic leading-snug text-foreground sm:text-3xl"
              >
                “{QUOTE}”
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                    <Target className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase tracking-tight text-foreground">
                    Misión
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {MISSION}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                    <Eye className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase tracking-tight text-foreground">
                    Visión
                  </h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {VISION}
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight text-foreground">
                  Nuestros valores
                </h3>
                <div className="mt-5">
                  <ValuesWheel />
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-xl border border-border bg-card p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                    <ListChecks className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-sans text-base font-bold uppercase tracking-tight text-foreground">
                    Objetivos
                  </h3>
                  <ol className="mt-3 space-y-2">
                    {OBJECTIVES.map((o, i) => (
                      <li key={o} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 font-mono text-[10px] font-bold text-gold">
                          {i + 1}
                        </span>
                        <span className="text-pretty">{o}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-border bg-background/60 p-5">
                  <h3 className="font-sans text-base font-bold uppercase tracking-tight text-foreground">
                    Política de seguridad
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {POLICY_PARAGRAPHS[0].slice(0, 140)}…
                  </p>
                  {showPolicy && (
                    <div className="mt-2 space-y-3">
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {POLICY_PARAGRAPHS[0]}
                      </p>
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {POLICY_PARAGRAPHS[1]}
                      </p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPolicy((v) => !v)}
                    aria-expanded={showPolicy}
                    className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold/80"
                  >
                    {showPolicy ? 'Ver menos' : 'Ver política completa'}
                  </button>
                </div>
              </div>

              {/* De "quiénes somos" a hablar con alguien, sin tener que cerrar y buscar el botón */}
              <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
                <p className="text-pretty text-sm leading-relaxed text-foreground/90">
                  ¿Quieres contarnos tu caso? Hablamos directo, sin formularios largos.
                </p>
                <a
                  {...leadProps(MESSAGES.expert, '/#contacto')}
                  className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar con un experto
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
