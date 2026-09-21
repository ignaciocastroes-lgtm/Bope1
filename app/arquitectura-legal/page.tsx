import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Scale,
  FileLock,
  Users,
  TriangleAlert,
  ShieldCheck,
  Fingerprint,
  Gavel,
} from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { ClauseGenerator } from '@/components/legal/clause-generator'
import { FloatingContact } from '@/components/floating-contact'
import { MESSAGES, leadProps } from '@/lib/contact'

export const metadata: Metadata = {
  alternates: { canonical: '/arquitectura-legal' },
  title: 'Arquitectura Legal y Cumplimiento Normativo | BOPE Fleet Ops',
  description:
    'Marco legal y de cumplimiento de BOPE Fleet Ops: evidencia forense (Ley 21.720), protección de datos (Ley 21.719) y uso operativo conforme al Art. 25 bis del Código del Trabajo.',
}

const pillars = [
  {
    id: 'I',
    icon: Scale,
    law: 'Ley 21.720',
    tag: 'Inhibidores de Señal',
    title: 'Evidencia Penal Inmutable',
    body: 'El registro append-only —donde nada se edita ni se borra— y la recuperación de búfer tras un ataque de jamming aportan respaldo técnico de un posible delito para la denuncia. Cada evento queda sellado con integridad verificable, lo que permite entregar un expediente técnico que documenta lo ocurrido.',
  },
  {
    id: 'II',
    icon: FileLock,
    law: 'Ley 21.719',
    tag: 'Protección de Datos',
    title: 'Trazabilidad de Accesos',
    body: 'Diseñamos el registro para dejar constancia de quién consultó la ubicación de qué conductor identificable y en qué momento. Cada consulta a datos personales queda trazada y atribuible, en línea con el control de acceso y la rendición de cuentas de la nueva ley de protección de datos personales (vigente desde el 1 de diciembre de 2026).',
  },
  {
    id: 'III',
    icon: Users,
    law: 'Art. 25 bis',
    tag: 'Código del Trabajo',
    title: 'Herramienta Operativa, no Disciplinaria',
    body: 'El sistema se diseñó para rastrear vehículos y carga, no para castigar conductores. No generamos rankings, puntajes de desempeño individual ni métricas comparativas del trabajador. La finalidad es la seguridad y la trazabilidad logística, nunca el control sancionatorio.',
  },
]

export default function ArquitecturaLegalPage() {
  return (
    <main id="contenido" className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <BopeLogo className="h-10 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-sans text-sm font-semibold tracking-[0.18em] text-foreground">
                BOPE FLEET OPS
              </span>
              <span className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                Arquitectura Legal
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              {...leadProps(MESSAGES.expert, '/#contacto')}
              className="hidden items-center gap-2 rounded-md bg-gold px-3 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar con un experto
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
              <span className="sm:hidden">Inicio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero / Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="tactical-grid absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,0.12), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-gold">
            <Gavel className="h-3.5 w-3.5" />
            Manifiesto de Cumplimiento
          </span>
          <h1 className="mt-6 text-balance font-sans text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
            Arquitectura Legal y Cumplimiento Normativo
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Diseñamos tecnología para que el monitoreo GPS y la evidencia se
            ajusten a la normativa penal y laboral en Chile.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Los 3 Pilares
          </span>
          <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Fundamento normativo del sistema
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-8 transition-colors hover:border-gold/40"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                  <p.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm text-border transition-colors group-hover:text-gold/40">
                  {p.id}
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-sans text-lg font-bold text-gold">
                  {p.law}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-2 text-balance font-sans text-xl font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* No engine cut-off policy */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-destructive/40 bg-destructive/5 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 100% at 0% 0%, rgba(239,68,68,0.10), transparent 60%)',
            }}
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-destructive/50 bg-destructive/10 text-destructive">
              <TriangleAlert className="h-7 w-7" />
            </div>
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-destructive">
                Política de Seguridad Vial
              </span>
              <h2 className="mt-3 text-balance font-sans text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
                Por qué NUNCA inmovilizamos camiones en marcha
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                Cortar la energía o el motor de un camión de 40 toneladas en
                movimiento genera una responsabilidad civil y penal
                inmanejable: pérdida de dirección asistida, frenos y control,
                con riesgo de accidentes fatales en carretera. Por eso lo
                consideramos una práctica inaceptable.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                En su lugar aplicamos{' '}
                <span className="font-semibold text-foreground">
                  Inhibición de Partida en Reposo
                </span>{' '}
                (Modo Estacionamiento Seguro): el vehículo detenido bloquea su
                arranque para prevenir el robo, sin jamás detener una unidad en
                ruta. Prevención de robo en reposo, cero riesgo de siniestro
                vial.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Inhibición solo en reposo.
                    </span>{' '}
                    El relé opera con el vehículo detenido y estacionado.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-4">
                  <Fingerprint className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Autorización trazable.
                    </span>{' '}
                    Toda acción crítica queda registrada con firma y hora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Clause generator */}
      <section
        id="contacto-legal"
        className="border-t border-border bg-card/30"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Herramienta Interactiva
            </span>
            <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              Generador de Cláusula para Reglamento Interno
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Genera la cláusula exacta que tus clientes deben incorporar a su
              Reglamento Interno de Orden, Higiene y Seguridad para cumplir con
              la Dirección del Trabajo (ORD. N°1310) al instalar monitoreo GPS
              en su flota.
            </p>
            <a
              href="#generador"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Ir al Generador de Cláusula
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <ClauseGenerator />
        </div>
      </section>
      <FloatingContact fallback="/#contacto" alwaysVisible />
    </main>
  )
}
