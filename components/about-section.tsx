'use client'

import { useState } from 'react'
import { Target, Eye, ListChecks } from 'lucide-react'
import { ValuesWheel } from '@/components/values-wheel'
import { MISSION, OBJECTIVES, POLICY_PARAGRAPHS, QUOTE, VISION } from '@/lib/company'

export function AboutSection() {
  const [showPolicy, setShowPolicy] = useState(false)

  return (
    <section id="nosotros" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Quiénes somos
          </span>
          <p className="mx-auto mt-4 max-w-xl text-balance font-sans text-2xl font-bold italic leading-snug text-foreground sm:text-3xl">
            “{QUOTE}”
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-foreground">
              Misión
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {MISSION}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-foreground">
              Visión
            </h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {VISION}
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-14 text-center">
          <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
            Nuestros valores
          </h3>
          <div className="mt-8">
            <ValuesWheel />
          </div>
        </div>

        {/* Objetivos + Política */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
              <ListChecks className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-sans text-lg font-bold uppercase tracking-tight text-foreground">
              Objetivos
            </h3>
            <ol className="mt-4 space-y-2.5">
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

          <div className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8">
            <h3 className="font-sans text-lg font-bold uppercase tracking-tight text-foreground">
              Política de seguridad
            </h3>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              {POLICY_PARAGRAPHS[0].slice(0, 160)}…
            </p>
            {showPolicy && (
              <div className="mt-3 space-y-3">
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
              className="mt-4 text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold/80"
            >
              {showPolicy ? 'Ver menos' : 'Ver política completa'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
