'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BopeLogo } from '@/components/brand'

/**
 * Intro de entrada: amanecer en la ruta → cae la noche → aparece el águila →
 * el overlay se disuelve y queda el sitio.
 *
 * Reglas:
 * - Dura 7 segundos como máximo. La secuencia dura 6,4 s (amanecer, noche,
 *   águila, disolución); antes de arrancar espera hasta 0,5 s a que las fotos
 *   estén decodificadas para que el fundido no se corte. Un techo duro cierra
 *   todo a los 7 s pase lo que pase.
 * - Arranca sola, sin esperar gestos. Un toque en cualquier parte, el botón
 *   “Saltar” o la tecla Escape la cierran al instante.
 * - Solo se animan opacidad y transform (baratos para la GPU); no hay
 *   filtros animados.
 * - Una sola vez por sesión y respeta prefers-reduced-motion.
 * - El contenido del sitio ya está en el HTML (SEO) y queda `inert` mientras
 *   dura la intro; un script en <head> evita el parpadeo en visitas repetidas.
 */

const STORAGE_KEY = 'bope-intro'
const MAX_TOTAL_MS = 7000 // techo absoluto desde que carga la página
const PRELOAD_WAIT_MS = 500 // espera máxima a que decodifiquen las fotos

// Secuencia (ms) desde que arranca. El amanecer se ve solo, cae la noche, entra
// el águila y todo se disuelve. Total: 2600 + 1200 + 1700 + 900 = 6400.
const NIGHT_AT = 800 // el día se sostiene antes de oscurecer
const NIGHT_MS = 2200 // fundido día → noche
const LOGO_AT = 2600 // el águila entra cuando la noche ya casi cae
const LOGO_MS = 1200 // duración del fundido del águila
const HOLD_MS = 1700 // el águila se queda antes de disolver
const OUT_MS = 900 // disolución del overlay

type Phase = 'wait' | 'day' | 'night' | 'logo' | 'out' | 'done'

const imgClass =
  'absolute inset-0 h-full w-full object-cover [object-position:56%_50%] landscape:[object-position:56%_58%]'

export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>('wait')
  const [outMs, setOutMs] = useState(OUT_MS)
  const startedRef = useRef(false)
  const reducedRef = useRef(false)
  const timers = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const finish = useCallback(() => {
    startedRef.current = true
    clearTimers()
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // modo privado u otro bloqueo de almacenamiento: no es grave
    }
    document.documentElement.dataset.intro = 'done'
    document.getElementById('site-root')?.removeAttribute('inert')
    setPhase('done')
  }, [clearTimers])

  const start = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    const f = reducedRef.current ? 0.3 : 1
    setOutMs(OUT_MS * f)
    setPhase('day')
    timers.current.push(
      window.setTimeout(() => setPhase('night'), NIGHT_AT * f),
      window.setTimeout(() => setPhase('logo'), LOGO_AT * f),
      window.setTimeout(() => setPhase('out'), (LOGO_AT + LOGO_MS + HOLD_MS) * f),
      window.setTimeout(finish, (LOGO_AT + LOGO_MS + HOLD_MS + OUT_MS) * f),
    )
  }, [finish])

  const skip = useCallback(() => {
    startedRef.current = true
    clearTimers()
    setOutMs(300)
    setPhase('out')
    timers.current.push(window.setTimeout(finish, 300))
  }, [clearTimers, finish])

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.documentElement.dataset.intro === 'seen') {
      setPhase('done')
      return
    }
    document.documentElement.dataset.intro = 'playing'
    document.getElementById('site-root')?.setAttribute('inert', '')

    // Espera (poco) a que las fotos de día y noche estén decodificadas.
    const portrait = window.matchMedia('(orientation: portrait)').matches
    const sources = portrait
      ? ['/intro-port-day.webp', '/intro-port-night.webp']
      : ['/intro-land-day.webp', '/intro-land-night.webp']
    const decoded = Promise.all(
      sources.map((src) => {
        const img = new window.Image()
        img.src = src
        return img.decode ? img.decode().catch(() => undefined) : Promise.resolve()
      }),
    )
    const limit = new Promise<void>((resolve) => {
      timers.current.push(window.setTimeout(resolve, PRELOAD_WAIT_MS))
    })
    void Promise.race([decoded, limit]).then(start)

    // Techo duro: a los 4 s no queda nada en pantalla.
    timers.current.push(window.setTimeout(skip, MAX_TOTAL_MS - 300))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skip()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimers()
      document.getElementById('site-root')?.removeAttribute('inert')
    }
  }, [clearTimers, skip, start])

  if (phase === 'done') return null

  const f = reducedRef.current ? 0.3 : 1
  const nightOn = phase === 'night' || phase === 'logo' || phase === 'out'
  const logoOn = phase === 'logo' || phase === 'out'

  return (
    <div
      id="intro"
      onPointerDown={skip}
      style={{
        opacity: phase === 'out' ? 0 : 1,
        transition: `opacity ${outMs}ms ease-in`,
      }}
      className="fixed inset-0 z-[200] select-none overflow-hidden bg-[#05070d]"
    >
      {/* Escena: día y noche apilados, con una deriva lenta de cámara */}
      <div className="intro-drift absolute inset-0">
        <picture>
          <source media="(orientation: portrait)" srcSet="/intro-port-day.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intro-land-day.webp"
            alt="Camión de carga en una autopista al amanecer"
            fetchPriority="high"
            decoding="async"
            onError={finish}
            className={imgClass}
          />
        </picture>
        <picture>
          <source media="(orientation: portrait)" srcSet="/intro-port-night.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/intro-land-night.webp"
            alt=""
            decoding="async"
            className={imgClass}
            style={{
              opacity: nightOn ? 1 : 0,
              transition: `opacity ${NIGHT_MS * f}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />
        </picture>
      </div>

      {/* Viñeta para dar profundidad y legibilidad */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,13,0.55)_100%)]"
      />

      {/* Águila: aparece con la noche (sin filtros animados: brillo con degradado) */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: logoOn ? 1 : 0,
          transform: logoOn ? 'scale(1)' : 'scale(0.96)',
          transition: `opacity ${LOGO_MS * f}ms ease-out, transform ${LOGO_MS * f}ms ease-out`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute h-[70vw] max-h-[560px] w-[70vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.26),transparent_65%)]"
        />
        <BopeLogo variant="lg" priority className="relative h-auto w-[68vw] max-w-[460px]" />
      </div>

      {/* Saltar */}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={skip}
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur transition-colors hover:border-gold/60 hover:text-gold"
      >
        Saltar
      </button>
    </div>
  )
}
