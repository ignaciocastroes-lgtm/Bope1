'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Radar, ShieldCheck } from 'lucide-react'
import { TruckArt } from '@/components/truck-art'
import {
  BASE_INCLUDED,
  LEVELS,
  NOT_INSURANCE,
  POINTS,
  POINT_IDS,
  SAT_PLAN,
  activePoints,
  type LevelId,
  type PointId,
} from '@/lib/security-levels'
import { openQuote } from '@/lib/contact'

const STEP_MS = 2400 // tiempo en cada nivel durante la demostración automática

/**
 * Camión con los niveles de protección. Al entrar en pantalla recorre solo los
 * niveles 1 → 2 → 3 → 4 (una vez); si la persona toca un nivel, se detiene y manda ella.
 */
export function SecurityTruck({
  jumpTo,
}: {
  /** Cambia (nuevo token) para forzar el camión a un nivel desde fuera, ej. un botón del modal. */
  jumpTo?: { level: LevelId; token: number } | null
}) {
  const [level, setLevel] = useState<LevelId>(1)
  const [interacted, setInteracted] = useState(false)
  const [consultas, setConsultas] = useState(0) // consultas de posición por satélite (nivel 4)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || interacted) return
    if (reduce) {
      setLevel(4)
      return
    }
    const timers = [2, 3, 4].map((n, i) =>
      window.setTimeout(() => setLevel(n as LevelId), STEP_MS * (i + 1)),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [inView, interacted, reduce])

  // Nivel 4: la consulta de posición se repite y cada respuesta queda en la bitácora.
  useEffect(() => {
    setConsultas(0)
    if (level !== 4 || !inView) return
    if (reduce) {
      setConsultas(1)
      return
    }
    let id: number | undefined
    const first = window.setTimeout(() => {
      setConsultas(1)
      id = window.setInterval(() => setConsultas((c) => (c < 5 ? c + 1 : c)), 4400)
    }, 3800)
    return () => {
      window.clearTimeout(first)
      if (id) window.clearInterval(id)
    }
  }, [level, inView, reduce])

  const current = LEVELS[level - 1]
  const on = new Set(activePoints(level))
  const fresh: PointId[] = inView ? current.adds : []

  function choose(id: LevelId) {
    setInteracted(true)
    setLevel(id)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!jumpTo) return
    choose(jumpTo.level)
    // Solo debe correr cuando cambia el "token" (cada clic), no en cada render.
  }, [jumpTo?.token])

  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      {/* Selector de nivel */}
      <div role="tablist" aria-label="Niveles de protección" className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {LEVELS.map((l) => {
          const selected = l.id === level
          return (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => choose(l.id)}
              className={`rounded-lg border px-1 py-3 text-center transition-colors sm:px-4 ${
                selected
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-border text-muted-foreground hover:border-gold/40 hover:text-gold'
              }`}
            >
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.25em]">
                Nivel {l.id}
              </span>
              <span className="mt-1 block font-sans text-xs font-semibold leading-tight sm:text-sm">
                {l.short}
              </span>
              <span className="mx-auto mt-2 flex h-1 w-full max-w-[64px] gap-0.5 px-1 sm:gap-1 sm:px-0" aria-hidden="true">
                {LEVELS.map((seg) => (
                  <span
                    key={seg.id}
                    className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                      seg.id <= l.id ? (selected ? 'bg-gold' : 'bg-gold/40') : 'bg-border'
                    }`}
                  />
                ))}
              </span>
            </button>
          )
        })}
      </div>

      {/* Camión */}
      <TruckArt level={level} fresh={fresh} pings={level === 4 && !reduce} className="mt-5 h-auto w-full" />

      {/* Detalle del nivel */}
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-foreground">
            {current.name}
          </h3>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{current.text}</p>
          {current.closing && (
            <p className="mt-3 rounded-lg border border-gold/40 bg-gold/5 p-3 text-pretty text-sm leading-relaxed text-foreground">
              <span className="font-semibold text-gold">Insistimos hasta ubicarlo. </span>
              {current.closing}
            </p>
          )}
          <button
            type="button"
            onClick={() =>
              openQuote({ nivel: current.tailored ? `${current.name} (a tu medida)` : current.name })
            }
            className="group mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
          >
            {current.tailored ? 'Cotizar a tu medida' : `Cotizar ${current.name.split(' · ')[0]}`}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Cada instalación se cotiza a tu medida, según tu necesidad. Ilustración referencial:
            los equipos y su ubicación se definen según tu vehículo.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{NOT_INSURANCE}</p>
        </div>

        <ul className="grid gap-2 sm:grid-cols-2">
          {POINT_IDS.map((id) => {
            const active = on.has(id)
            const isNew = active && current.adds.includes(id)
            return (
              <li
                key={id}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-500 ${
                  active ? 'border-gold/40 bg-gold/5' : 'border-border/60 opacity-50'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-500 ${
                    active ? 'bg-gold text-primary-foreground' : 'border border-border text-muted-foreground'
                  }`}
                >
                  {id}
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-sm font-medium text-foreground">{POINTS[id].name}</span>
                  <span className="block text-xs text-muted-foreground">{POINTS[id].where}</span>
                </span>
                {isNew && (
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gold">
                    Nuevo
                  </span>
                )}
              </li>
            )
          })}
          <li
            className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-500 sm:col-span-2 ${
              level >= 4 ? 'border-gold/40 bg-gold/5' : 'border-border/60 opacity-50'
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-500 ${
                level >= 4 ? 'bg-gold text-primary-foreground' : 'border border-border text-muted-foreground'
              }`}
            >
              SIM
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-sm font-medium text-foreground">{SAT_PLAN.name}</span>
              <span className="block text-xs text-muted-foreground">{SAT_PLAN.where}</span>
            </span>
            {level === 4 && (
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gold">
                Nuevo
              </span>
            )}
          </li>
        </ul>
      </div>

      {/* Base incluida desde el nivel 1 + bitácora que crece con cada nivel */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gold/40 bg-gold/5 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
            Incluido desde el Nivel 1
          </p>
          <ul className="mt-4 space-y-4">
            {BASE_INCLUDED.map((b) => (
              <li key={b.id} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                  {b.id === 'auditoria' ? <ShieldCheck className="h-4 w-4" /> : <Radar className="h-4 w-4" />}
                </span>
                <span>
                  <span className="block font-sans text-base font-semibold text-foreground">{b.name}</span>
                  <span className="mt-1 block text-pretty text-sm leading-relaxed text-muted-foreground">
                    {b.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-background/60 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Bitácora de auditoría · ejemplo
          </p>
          <ol className="mt-4 space-y-2 font-mono text-xs">
            {LEVELS.filter((l) => l.id <= level).flatMap((l) =>
              l.audit.map((entry) => (
                <li
                  key={`${l.id}-${entry}`}
                  className={`flex items-start gap-2 rounded-md border px-3 py-2 leading-snug ${
                    l.id === level ? 'border-gold/40 bg-gold/5 text-foreground' : 'border-border/60 text-muted-foreground'
                  }`}
                >
                  <span className="mt-0.5 text-gold">▸</span>
                  <span className="flex-1">{entry}</span>
                  {l.id === level && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gold">
                      Nuevo
                    </span>
                  )}
                </li>
              )),
            )}
            {Array.from({ length: consultas }, (_, i) => (
              <li
                key={`consulta-${i}`}
                className={`flex items-start gap-2 rounded-md border px-3 py-2 leading-snug ${
                  i === consultas - 1 ? 'border-gold/40 bg-gold/5 text-foreground' : 'border-border/60 text-muted-foreground'
                }`}
              >
                <span className="mt-0.5 text-gold">▸</span>
                <span className="flex-1">{`Consulta por satélite #${i + 1} · posición recibida`}</span>
                {i === consultas - 1 && (
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gold">
                    Nuevo
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            La bitácora empieza en el Nivel 1 y crece con cada nivel. Nada se edita ni se borra.
          </p>
        </div>
      </div>
    </div>
  )
}
