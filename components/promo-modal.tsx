'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  Rocket,
  ShieldAlert,
  FileCode,
  Users,
  MessageCircle,
  ArrowRight,
} from 'lucide-react'
import { MESSAGES, hasWhatsApp, leadProps } from '@/lib/contact'

const STORAGE_KEY = 'bope-promo-dismissed'
export const OPEN_PROMO_EVENT = 'open-promo-modal'

// La ventana emergente al cargar la página compite con el gancho del hero y
// el producto aún no está abierto: solo se abre a pedido (navbar / teaser).
const AUTO_OPEN = false

const features = [
  {
    icon: ShieldAlert,
    title: 'Detección Nativa de Jamming',
    text: 'Con Teltonika FMC920 el equipo registra la interferencia 4G/GPS y reconstruimos el recorrido cuando recupera señal. Alertas automáticas: en desarrollo.',
  },
  {
    icon: FileCode,
    title: 'Expediente de Evidencia Inmutable',
    text: 'Bitácora de auditoría sin edición ni borrado, para respaldar denuncias y liquidaciones con aseguradoras.',
  },
  {
    icon: Users,
    title: 'Equipo en terreno',
    text: 'La plataforma no trabaja sola: el equipo BOPE está presente en la ruta para coordinar la respuesta cuando algo no cuadra.',
  },
]

// Simulated forensic audit-log lines shown blurred behind the dialog.
const forensicLog = [
  '2026-08-25 03:14:07Z  EVT#A91  GEOFENCE_ENTER  ruta=RM-05  lat=-33.4569 lon=-70.6483',
  '2026-08-25 03:14:39Z  EVT#A92  JAMMING_DETECT  4G_LOSS=true  gps_snr=8dB  ALERT>WhatsApp',
  '2026-08-25 03:14:41Z  EVT#A93  HASH  sha256=9f2c…e71a  signed=OK  immutable=true',
  '2026-08-25 03:15:02Z  EVT#A94  CHECKIN  driver=OK  unit=TRK-118',
  '2026-08-25 03:15:58Z  EVT#A95  ROUTE_RECONSTRUCT  segments=42  gap_filled=3  conf=0.98',
  '2026-08-25 03:16:20Z  EVT#A96  EXPORT  format=PDF/A  dest=Aseguradora  ley=21.720',
  '2026-08-25 03:17:11Z  EVT#A97  SPEED=0km/h  ign=OFF  perimeter=SECURE  seal=INTACT',
  '2026-08-25 03:18:04Z  EVT#A98  HANDSHAKE  central=BOPE-OPS  latency=142ms  link=UP',
]

export function PromoModal() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [])

  // Auto open 4s after load, unless previously dismissed.
  useEffect(() => {
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      dismissed = false
    }
    if (dismissed || !AUTO_OPEN) return

    const timer = window.setTimeout(() => setOpen(true), 4000)
    return () => window.clearTimeout(timer)
  }, [])

  // Manual open via navbar / teaser buttons.
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(OPEN_PROMO_EVENT, handler)
    return () => window.removeEventListener(OPEN_PROMO_EVENT, handler)
  }, [])

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
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
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          <motion.div
            className="relative my-auto w-full max-w-2xl rounded-2xl bg-gradient-to-br from-amber-500/40 via-zinc-800 to-amber-500/40 p-[1.5px] shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gold-glow relative overflow-hidden rounded-2xl bg-[#121216]">
              {/* Blurred forensic audit-log backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.14] blur-[3px]"
              >
                <pre className="whitespace-pre-wrap p-6 font-mono text-[11px] leading-5 text-gold">
                  {forensicLog.concat(forensicLog).join('\n')}
                </pre>
                <div className="absolute inset-0 bg-gradient-to-b from-[#121216]/40 via-[#121216]/70 to-[#121216]" />
              </div>
              <div className="tactical-grid pointer-events-none absolute inset-0 opacity-30" />

              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar promoción"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:border-gold/40 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative max-h-[85vh] overflow-y-auto p-6 sm:p-8">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold gold-glow">
                  <Rocket className="h-3.5 w-3.5" />
                  Próximamente · Piloto de flota
                </span>

                {/* Title */}
                <h2
                  id="promo-title"
                  className="mt-4 text-balance font-sans text-2xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-3xl"
                >
                  Convertimos el silencio en{' '}
                  <span className="text-gold">evidencia legal</span>
                </h2>

                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Plataforma de trazabilidad forense para flotas de carga, con
                  equipos Teltonika FMC920 4G.
                </p>

                {/* Aviso: app en construcción */}
                <p className="mt-4 rounded-lg border border-amber/30 bg-amber/10 px-4 py-3 text-xs leading-relaxed text-warning-foreground sm:text-sm">
                  <span className="font-semibold text-amber">En construcción.</span>{' '}
                  BOPE Fleet Ops todavía no tiene portal de acceso. Estamos
                  abriendo cupos limitados para flotas piloto.
                </p>

                {/* Features 3-step */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {features.map((f) => (
                    <div
                      key={f.title}
                      className="rounded-xl border border-border bg-card/70 p-4 transition-colors hover:border-gold/30"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/10 text-gold">
                          <f.icon className="h-4 w-4" />
                        </span>
                        <h3 className="font-sans text-sm font-semibold leading-tight text-foreground">
                          {f.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {f.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Hardware banner */}
                <div className="mt-5 rounded-xl border border-gold/20 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    Kit Corporativo
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    GPS Teltonika FMC920 (4G Cat-1) + segundo rastreador oculto
                    (opcional) + sellos disuasivos.
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    {...leadProps(MESSAGES.fleetOps)}
                    onClick={close}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-transform hover:scale-[1.02]"
                  >
                    Postular a piloto de flota
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/arquitectura-legal"
                    className="inline-flex flex-1 items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    Ver Arquitectura Legal
                  </a>
                </div>

                {/* WhatsApp quick link */}
                {hasWhatsApp && (
                  <a
                    {...leadProps(MESSAGES.fleetOps)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-gold"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    Escríbenos por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
