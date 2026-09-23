'use client'

import { useState } from 'react'
import { ChevronDown, ShieldCheck, Radar, ScrollText, Search, Gem, Warehouse, ClipboardCheck, Lock } from 'lucide-react'
import { MESSAGES, leadProps } from '@/lib/contact'

type Cta = { label: string; message: string }

const services: {
  id: string
  icon: typeof ShieldCheck
  title: string
  desc: string
  points: string[]
  status?: string
  cta: Cta
}[] = [
  {
    id: 'escolta',
    icon: ShieldCheck,
    title: 'Escolta preventiva de carga',
    desc: 'Un equipo BOPE acompaña la carga en los tramos donde más se necesita. Presencia real en la ruta, coordinada con tu operación.',
    points: [
      'Tramos, horarios y nivel de acompañamiento según el valor de la carga.',
      'Protocolo definido antes de salir: quién llama a quién y en qué orden.',
    ],
    cta: { label: 'Cotizar escolta', message: MESSAGES.escort },
  },
  {
    id: 'monitoreo',
    icon: Radar,
    title: 'Monitoreo GPS y asistencia en ruta',
    desc: 'Seguimos tu flota y actuamos cuando algo no cuadra: un desvío, una detención larga, un equipo que deja de reportar. Coordinamos la respuesta contigo.',
    points: [
      'Seguimiento de tus unidades durante el viaje.',
      'Asistencia cuando un vehículo deja de reportar.',
    ],
    cta: { label: 'Hablar del monitoreo', message: MESSAGES.monitoring },
  },
  {
    id: 'recuperacion',
    icon: Search,
    title: 'Recuperación de transporte',
    desc: 'Ante un robo, coordinamos la localización del vehículo con la ubicación que entrega el GPS y activamos protocolo junto a las autoridades competentes.',
    points: [
      'Requiere que el vehículo cuente con nuestro rastreo activo.',
      'La denuncia y la acción policial siempre corren por la autoridad competente; nosotros aportamos ubicación y antecedentes.',
    ],
    cta: { label: 'Consultar por este servicio', message: MESSAGES.monitoring },
  },
  {
    id: 'valores',
    icon: Gem,
    title: 'Traslado de objetos de valor',
    desc: 'Custodia de dinero, joyas y documentos confidenciales durante el traslado, con protocolo y seguimiento propios.',
    points: ['A la medida de lo que trasladas: valor, ruta y frecuencia.'],
    cta: { label: 'Cotizar traslado de valores', message: MESSAGES.escort },
  },
  {
    id: 'custodia',
    icon: Warehouse,
    title: 'Custodia de bodegas y centros de almacenamiento',
    desc: 'Resguardo del recinto con personal propio, dentro o fuera de las instalaciones, según lo que necesite tu operación.',
    points: ['Se define en terreno: horario, puntos críticos y nivel de presencia.'],
    cta: { label: 'Cotizar custodia', message: MESSAGES.monitoring },
  },
  {
    id: 'asesoria',
    icon: ClipboardCheck,
    title: 'Asesoría, consultoría e investigación',
    desc: 'Análisis de rutas, evaluación de riesgos y de vulnerabilidad, estudios de seguridad y apoyo para cierres perimetrales y CCTV.',
    points: [
      'Incluye, si lo necesitas, verificación con dron del punto de salida antes de despachar.',
    ],
    cta: { label: 'Agendar una asesoría', message: MESSAGES.expert },
  },
  {
    id: 'ppi',
    icon: Lock,
    title: 'Protección integral (PPI)',
    desc: 'Para operaciones de mayor riesgo, un esquema de protección más completo que el de escolta estándar. Es un servicio a la medida: el detalle se define en una conversación directa, no en el sitio.',
    points: [],
    cta: { label: 'Conversar en privado', message: MESSAGES.expert },
  },
  {
    id: 'evidencia',
    icon: ScrollText,
    title: 'Evidencia para denuncias y aseguradoras',
    desc: 'Cuando una señal se corta, guardamos el recorrido para reconstruir lo ocurrido y armar un expediente. Bitácora sin edición ni borrado.',
    points: [
      'Documentación pensada para la Ley 21.720 (inhibidores) y la Ley 21.719 (datos personales, vigente desde el 1 de diciembre de 2026).',
    ],
    status: 'En piloto',
    cta: { label: 'Conocer la plataforma', message: MESSAGES.fleetOps },
  },
]

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(services[0].id)

  return (
    <section id="servicios" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Servicios
          </span>
          <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Presencia en la ruta, no solo una pantalla
          </h2>
        </div>

        <div className="space-y-3">
          {services.map((s) => {
            const isOpen = openId === s.id
            return (
              <div
                key={s.id}
                className={`rounded-xl border bg-card transition-colors ${
                  isOpen ? 'border-gold/50' : 'border-border hover:border-gold/30'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`svc-btn-${s.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`svc-panel-${s.id}`}
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-sans text-lg font-semibold text-foreground sm:text-xl">
                        {s.title}
                      </span>
                      {s.status && (
                        <span className="mt-1 inline-flex rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
                          {s.status}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${
                        isOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`svc-panel-${s.id}`}
                  role="region"
                  aria-labelledby={`svc-btn-${s.id}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pl-[5.25rem]">
                      <p className="text-pretty leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-foreground/90">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                            <span className="text-pretty">{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        {...leadProps(s.cta.message)}
                        className="mt-6 inline-flex items-center justify-center rounded-md border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/20"
                      >
                        {s.cta.label}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
