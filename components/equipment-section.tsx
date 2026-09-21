'use client'

import Image from 'next/image'
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { hasWhatsApp, leadProps, openQuote } from '@/lib/contact'
import { PRODUCTS } from '@/lib/catalog'
import { SecurityTruck } from '@/components/security-truck'

const steps = [
  { title: 'Elige tu nivel o tus equipos', text: 'Mira los niveles de protección y el catálogo, o cuéntanos tu caso y te ayudamos a escoger.' },
  { title: 'Te cotizamos equipo e instalación', text: 'Recibes el precio total, con o sin instalación profesional.' },
  { title: 'Un técnico lo instala', text: 'Queda instalado y confirmamos que el equipo está reportando.' },
]

export function EquipmentSection() {
  return (
    <section id="equipos" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="tactical-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Equipos GPS
          </span>
          <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            Seguimiento y auditoría por niveles
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Rastreadores GPS 4G con instalación profesional. Parte por una unidad principal y suma
            respaldo oculto, vigilancia de la carga y, si lo necesitas, un enlace satelital. Desde el primer nivel va incluido nuestro sistema de auditoría. Sin precios de vitrina: cotizamos equipo e
            instalación, y te asesoramos con el plan de datos de cada equipo.
          </p>
        </div>

        <div className="mt-10">
          <SecurityTruck />
        </div>

        {/* Catálogo */}
        <div className="mt-16">
          <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-foreground">
            Equipos disponibles
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Solo mostramos equipos con ficha técnica verificada, todos en red 4G.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <li key={p.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-[4/3] w-full bg-white/95">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <MapPin className="h-10 w-10 text-gold/60" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h4 className="font-sans text-lg font-semibold text-foreground">{p.name}</h4>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{p.spec}</p>
                  <button
                    type="button"
                    onClick={() => openQuote({ productIds: [p.id] })}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
                  >
                    Cotizar este equipo
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openQuote()}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
            >
              Cotiza con nosotros
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

        {/* Cómo funciona */}
        <ol className="mt-16 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
              <span className="font-sans text-3xl font-bold text-gold/60">{i + 1}</span>
              <div>
                <h4 className="font-sans text-lg font-semibold text-foreground">{s.title}</h4>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
