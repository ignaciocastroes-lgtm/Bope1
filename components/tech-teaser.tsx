'use client'

import { motion } from 'framer-motion'
import { MapPin, CircleAlert, Users, Gauge, ArrowRight } from 'lucide-react'
import { OPEN_PROMO_EVENT } from '@/components/promo-modal'

const logs = [
  { time: '05:12', text: 'Unidad SCL-042 ingresa a geocerca Melipilla', ok: true },
  { time: '05:29', text: 'Check-in de conductor confirmado', ok: true },
  { time: '05:47', text: 'Reducción de velocidad detectada — Km 61', ok: true },
  { time: '06:03', text: 'Parada no programada · verificación en curso', ok: false },
]

const coverage = [
  'San Antonio',
  'Melipilla',
  'Talagante',
  'Maipú',
  'Santiago Centro',
  'Ruta 78',
  'Ruta 68',
  'Autopista del Sol',
]

export function TechTeaser() {
  return (
    <section id="tecnologia" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Próximamente · En desarrollo
            </span>
            <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              Ecosistema Tecnológico BOPE Fleet Ops
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Estamos construyendo un panel de control en vivo para operadores
              de flota: registros de telemetría, feed de alertas en tiempo real
              y confirmación de conductores en ruta. Aún no está abierto al
              público: hoy lo probamos con equipos propios.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Gauge, label: 'Telemetría', value: 'En piloto' },
                { icon: CircleAlert, label: 'Alertas', value: 'En desarrollo' },
                { icon: Users, label: 'Check-in', value: 'Próximamente' },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <k.icon className="h-5 w-5 text-gold" />
                  <p className="mt-3 font-sans text-base font-bold leading-tight text-foreground">
                    {k.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k.label}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event(OPEN_PROMO_EVENT))
              }
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-transform hover:scale-[1.02]"
            >
              Ver qué viene en Fleet Ops
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card/60 p-1 backdrop-blur-xl gold-glow"
          >
            <div className="tactical-grid absolute inset-0 opacity-40" />
            <div className="relative rounded-xl bg-background/60 p-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
                  <span className="font-sans text-sm uppercase tracking-widest text-foreground">
                    Control en Vivo
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Vista de ejemplo
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                <MapPin className="h-5 w-5 text-gold" />
                <div className="flex-1">
                  <p className="font-sans text-sm text-foreground">
                    Ruta 78 · San Antonio → Santiago
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-gold-muted to-amber" />
                  </div>
                </div>
                <span className="font-mono text-xs text-amber">68%</span>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Feed de eventos
              </p>
              <ul className="mt-3 space-y-2">
                {logs.map((l) => (
                  <li
                    key={l.time}
                    className="flex items-center gap-3 rounded-md border border-border/70 bg-secondary/40 px-3 py-2"
                  >
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {l.time}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        l.ok ? 'bg-emerald-500' : 'bg-amber'
                      }`}
                    />
                    <span className="text-xs leading-tight text-foreground/90">
                      {l.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Coverage */}
        <div id="cobertura" className="mt-24 scroll-mt-24">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gold" />
            <h3 className="font-sans text-xl font-semibold uppercase tracking-wide text-foreground">
              Cobertura Operativa
            </h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {coverage.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
