'use client'

import { ArrowRight, Radio } from 'lucide-react'
import { MESSAGES, leadProps } from '@/lib/contact'
import { OPEN_PROMO_EVENT } from '@/components/promo-modal'

function openPromo() {
  window.dispatchEvent(new Event(OPEN_PROMO_EVENT))
}

const beats = [
  {
    when: 'Minuto 0',
    title: 'El camión deja de reportar',
    text: 'La pantalla se queda con el último punto conocido. El conductor no contesta.',
  },
  {
    when: 'Minuto 2',
    title: '¿Zona sin cobertura o inhibidor?',
    text: 'Desde un escritorio no se distingue. Y cada minuto de duda le sirve a quien te está robando.',
  },
  {
    when: 'Minuto 5',
    title: 'Alguien tiene que decidir',
    text: 'Llamar al conductor, avisar a Carabineros, mover a quien esté más cerca. Con protocolo se decide rápido; sin protocolo se pierde el tiempo.',
  },
  {
    when: 'Después',
    title: 'Lo que el GPS guardó mientras nadie miraba',
    text: 'El equipo sigue midiendo aun sin señal y, al recuperarla, entrega el recorrido. Ese tramo es la base del expediente para la denuncia y la aseguradora.',
    status: 'En piloto',
  },
]

export function StorySection() {
  return (
    <section id="historia" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Lo que pasa en la ruta
            </span>
            <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              Un camión que deja de reportar no es un dato. Es una decisión.
            </h2>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Nuestro equipo tiene experiencia operativa en terreno y sabe qué
              hacer en el minuto 5: qué mirar, a quién llamar y cómo dejar todo
              documentado.
            </p>
            <a
              {...leadProps(MESSAGES.monitoring)}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
            >
              Cuéntanos tu ruta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <ol className="relative space-y-8 border-l border-border pl-8">
            {beats.map((b) => (
              <li key={b.when} className="relative">
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-background" />
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
                  {b.when}
                  {b.status && (
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest">
                      {b.status}
                    </span>
                  )}
                </p>
                <h3 className="mt-2 font-sans text-xl font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 max-w-lg text-pretty leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Noticia: la plataforma que viene, contada como un anuncio corto, no como otra sección */}
        <div id="tecnologia" className="mt-16 scroll-mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-start gap-4 rounded-xl border border-gold/30 bg-gold/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                <Radio className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Próximamente
                </p>
                <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground/90">
                  <span className="font-semibold">BOPE Fleet Ops</span>, el panel de control en
                  vivo para operadores de flota, está en desarrollo. Hoy lo probamos con equipos
                  propios.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={openPromo}
              className="group inline-flex shrink-0 items-center gap-2 rounded-md border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
            >
              Ver qué viene
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
