'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { OPEN_QUOTE_EVENT, hasWhatsApp, sendLead, type QuotePreset } from '@/lib/contact'
import Image from 'next/image'
import { CATEGORIES, PRODUCTS, productName, type CategoryId } from '@/lib/catalog'

type Step = 'catalog' | 'form' | 'sent'

const vehicleTypes = ['Auto', 'Camioneta / SUV', 'Moto', 'Camión o flota', 'Otro']
const installOptions = ['Con instalación profesional', 'Solo el equipo']

const inputClass =
  'w-full rounded-md border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'
const labelClass =
  'mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground'

export function QuoteModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('catalog')
  const [category, setCategory] = useState<CategoryId>('vehiculo')
  const [selected, setSelected] = useState<string[]>([])
  const [nivel, setNivel] = useState<string | null>(null)
  const [sentVia, setSentVia] = useState<'whatsapp' | 'correo' | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const handler = (e: Event) => {
      const preset = (e as CustomEvent<QuotePreset | undefined>).detail
      returnFocusRef.current = document.activeElement as HTMLElement | null
      setSelected(preset?.productIds ?? [])
      setNivel(preset?.nivel ?? null)
      // Con un equipo o un nivel ya elegido se salta directo a los datos.
      setStep(preset?.productIds?.length || preset?.nivel ? 'form' : 'catalog')
      setSentVia(null)
      setOpen(true)
    }
    window.addEventListener(OPEN_QUOTE_EVENT, handler)
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, handler)
  }, [])

  // Escape, bloqueo de scroll y atrapa-foco.
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const focusables = (): HTMLElement[] =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, select, textarea',
            ),
          )
        : []

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
      returnFocusRef.current?.focus()
    }
  }, [open, close])

  // Al cambiar de paso, el foco va al primer control del paso.
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }, 60)
    return () => window.clearTimeout(t)
  }, [open, step])

  function toggle(id: string) {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()

    const parts: string[] = [`Nombre: ${get('nombre')}`]
    if (nivel) parts.push(`Nivel de protección: ${nivel}`)
    parts.push(
      selected.length > 0
        ? `Equipos de interés: ${selected.map(productName).join(', ')}`
        : 'Equipos de interés: necesito ayuda para elegir',
    )
    parts.push(
      `Vehículo: ${get('tipo')}${get('vehiculo') ? ` (${get('vehiculo')})` : ''} × ${get('cantidad') || '1'}`,
      `Instalación: ${get('instalacion')}`,
      `Ciudad o región: ${get('ciudad')}`,
    )
    if (get('telefono')) parts.push(`Teléfono: ${get('telefono')}`)
    if (get('comentario')) parts.push(`Comentario: ${get('comentario')}`)

    const message = ['Hola BOPE Security, quiero cotizar equipos GPS.', '', ...parts].join('\n')
    setSentVia(sendLead(message, 'Cotización de equipos GPS'))
    setStep('sent')
  }

  const visible = PRODUCTS.filter((p) => p.category === category)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/80 backdrop-blur-md sm:items-center sm:p-6"
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
            aria-labelledby="quote-title"
            className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-2xl border border-gold/30 bg-[#121216] shadow-2xl sm:rounded-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado fijo */}
            <div className="flex items-start justify-between gap-4 border-b border-border/60 p-5 sm:p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Equipos GPS · BOPE Security
                </p>
                <h2
                  id="quote-title"
                  className="mt-2 font-sans text-xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-2xl"
                >
                  {step === 'catalog' && 'Elige tus equipos'}
                  {step === 'form' && 'Cotiza con nosotros'}
                  {step === 'sent' && 'Solicitud lista'}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Paso 1: catálogo */}
            {step === 'catalog' && (
              <>
                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                  {CATEGORIES.length > 1 && (
                  <div role="tablist" aria-label="Categorías" className="flex gap-2">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        role="tab"
                        aria-selected={category === c.id}
                        onClick={() => setCategory(c.id)}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                          category === c.id
                            ? 'border-gold bg-gold/15 text-gold'
                            : 'border-border text-muted-foreground hover:border-gold/40 hover:text-gold'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  )}

                  <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {visible.map((p, i) => {
                      const on = selected.includes(p.id)
                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            data-autofocus={i === 0 ? '' : undefined}
                            aria-pressed={on}
                            onClick={() => toggle(p.id)}
                            className={`flex h-full w-full flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                              on
                                ? 'border-gold bg-gold/10'
                                : 'border-border bg-card hover:border-gold/40'
                            }`}
                          >
                            {p.image && (
                              <span className="relative mb-3 block aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/95">
                                <Image src={p.image} alt="" fill sizes="(min-width: 640px) 200px, 45vw" className="object-contain p-2" />
                              </span>
                            )}
                            <span className="flex w-full items-start justify-between gap-2">
                              <span className="font-sans text-base font-semibold leading-tight text-foreground">
                                {p.name}
                              </span>
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                  on ? 'border-gold bg-gold text-primary-foreground' : 'border-border'
                                }`}
                              >
                                {on && <Check className="h-3 w-3" />}
                              </span>
                            </span>
                            <span className="mt-2 text-xs leading-snug text-muted-foreground">
                              {p.spec}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>

                  <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                    Sin precios de vitrina: cotizamos equipo e instalación según lo que elijas.
                    Las funciones y la aplicación compatible dependen de cada modelo; te lo
                    explicamos al cotizar. También te asesoramos con el plan de datos de cada
                    equipo.
                  </p>
                </div>

                {/* Pie fijo */}
                <div className="flex flex-col gap-3 border-t border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="text-left text-xs font-medium text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
                  >
                    No sé cuál elegir, ayúdenme
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    disabled={selected.length === 0}
                    className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continuar{selected.length > 0 ? ` (${selected.length})` : ''}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}

            {/* Paso 2: datos */}
            {step === 'form' && (
              <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {nivel && (
                      <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                        {nivel}
                      </span>
                    )}
                    {selected.length > 0 ? (
                      selected.map((id) => (
                        <span
                          key={id}
                          className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
                        >
                          {productName(id)}
                        </span>
                      ))
                    ) : (
                      !nivel && (
                        <span className="text-xs text-muted-foreground">
                          Sin equipo elegido: te ayudamos a escoger.
                        </span>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => setStep('catalog')}
                      className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gold"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      Cambiar
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="q-nombre" className={labelClass}>Nombre</label>
                      <input id="q-nombre" name="nombre" required data-autofocus autoComplete="name" className={inputClass} placeholder="Tu nombre" />
                    </div>

                    <div>
                      <label htmlFor="q-tipo" className={labelClass}>Tipo de vehículo</label>
                      <select id="q-tipo" name="tipo" className={inputClass}>
                        {vehicleTypes.map((v) => (
                          <option key={v} value={v} className="bg-card">{v}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="q-cantidad" className={labelClass}>Cantidad</label>
                      <input id="q-cantidad" name="cantidad" type="number" min={1} defaultValue={1} required inputMode="numeric" className={inputClass} />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="q-vehiculo" className={labelClass}>Marca y modelo (opcional)</label>
                      <input id="q-vehiculo" name="vehiculo" className={inputClass} placeholder="Ej.: Toyota Hilux 2020" />
                    </div>

                    <div>
                      <label htmlFor="q-instalacion" className={labelClass}>Instalación</label>
                      <select id="q-instalacion" name="instalacion" className={inputClass}>
                        {installOptions.map((v) => (
                          <option key={v} value={v} className="bg-card">{v}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="q-ciudad" className={labelClass}>Ciudad o región</label>
                      <input id="q-ciudad" name="ciudad" required className={inputClass} placeholder="Santiago" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="q-telefono" className={labelClass}>Teléfono (opcional)</label>
                      <input id="q-telefono" name="telefono" type="tel" autoComplete="tel" className={inputClass} placeholder="+56 9 0000 0000" />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="q-comentario" className={labelClass}>Comentario (opcional)</label>
                      <textarea id="q-comentario" name="comentario" rows={2} className={inputClass} placeholder="Ej.: lo necesito instalado esta semana" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 p-5 sm:p-6">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
                  >
                    {hasWhatsApp ? 'Enviar por WhatsApp' : 'Enviar por correo'}
                    <Send className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    No guardamos estos datos en el sitio: se envían por{' '}
                    {hasWhatsApp ? 'WhatsApp' : 'correo'} directamente a nuestro equipo.
                  </p>
                </div>
              </form>
            )}

            {/* Paso 3: enviado */}
            {step === 'sent' && (
              <div className="p-5 sm:p-6">
                <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
                  <p className="flex items-center gap-2 font-semibold text-gold">
                    <Check className="h-4 w-4" />
                    {sentVia === 'whatsapp'
                      ? 'Abrimos WhatsApp con tu solicitud'
                      : 'Abrimos tu correo con tu solicitud'}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {sentVia === 'whatsapp'
                      ? 'Envía el mensaje desde WhatsApp para que lo recibamos. Si no se abrió, revisa que la app esté instalada.'
                      : 'Envía el correo para que lo recibamos. Si no se abrió, escríbenos a Bope.Security@gmail.com.'}
                  </p>
                  <button
                    type="button"
                    data-autofocus
                    onClick={close}
                    className="mt-5 inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
