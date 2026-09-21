'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'
import { hasWhatsApp, leadProps, openQuote } from '@/lib/contact'
import { SUPPLIER_NAME } from '@/lib/catalog'

const steps = [
  { title: 'Elige tus equipos', text: 'Mira el catálogo y marca los que te interesan, o cuéntanos tu caso y te ayudamos a escoger.' },
  { title: 'Te cotizamos equipo e instalación', text: 'Recibes el precio total, con o sin instalación profesional.' },
  { title: 'Un técnico lo instala', text: 'Queda instalado y confirmamos que el equipo está reportando.' },
]

export function EquipmentSection() {
  return (
    <section id="equipos" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="tactical-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Alianza BOPE × {SUPPLIER_NAME}
            </span>
            <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              GPS para tu vehículo, instalado por un técnico
            </h2>
            <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Rastreadores GPS 4G para autos y camionetas, con instalación
              profesional. Este servicio es independiente de nuestras soluciones
              para empresas: lo ofrecemos junto a {SUPPLIER_NAME} para que
              cualquier persona pueda proteger su vehículo.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Solo mostramos equipos con ficha técnica verificada. Sin precios
              de vitrina: cotizamos equipo e instalación, y te asesoramos con
              el plan de datos de cada equipo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openQuote}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
              >
                Ver catálogo y cotizar
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

          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-5 rounded-xl border border-border bg-card p-5 sm:p-6"
              >
                <span className="font-sans text-3xl font-bold text-gold/60">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
