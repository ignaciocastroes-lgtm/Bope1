'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { MapPin } from 'lucide-react'
import { BUSINESS_ADDRESS, hasWhatsApp, sendLead } from '@/lib/contact'

const services = [
  'Escolta de Carga',
  'Monitoreo GPS 24/7',
  'Asistencia en Ruta',
  'Asesoría de Riesgos',
]

const fields = [
  { id: 'empresa', label: 'Empresa / Transportista', type: 'text', ph: 'Transportes Ejemplo Ltda.' },
  { id: 'telefono', label: 'Teléfono de Contacto', type: 'tel', ph: '+56 9 0000 0000' },
  { id: 'correo', label: 'Correo Electrónico', type: 'email', ph: 'operaciones@empresa.cl' },
  { id: 'ruta', label: 'Tramo / Ruta', type: 'text', ph: 'San Antonio → Santiago' },
  { id: 'carga', label: 'Tipo de Carga', type: 'text', ph: 'Carga refrigerada / alto valor' },
]

export function ContactSection() {
  const [sentVia, setSentVia] = useState<'whatsapp' | 'correo' | null>(null)

  return (
    <section id="contacto" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="tactical-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Cotización Operativa
          </span>
          <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            Solicita tu escolta o monitoreo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Cuéntanos sobre tu operación y un especialista te contactará con un
            plan de seguridad a la medida.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            {BUSINESS_ADDRESS}
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            const v = (k: string) => String(f.get(k) ?? '').trim()
            const message = [
              'Hola BOPE Security, quiero una cotización.',
              '',
              `Servicio: ${v('servicio')}`,
              `Empresa: ${v('empresa')}`,
              `Tramo / ruta: ${v('ruta')}`,
              `Tipo de carga: ${v('carga')}`,
              `Teléfono: ${v('telefono')}`,
              `Correo: ${v('correo')}`,
            ].join('\n')
            setSentVia(sendLead(message, `Cotización: ${v('servicio')}`))
          }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.id} className={f.id === 'ruta' ? 'sm:col-span-2' : ''}>
                <label
                  htmlFor={f.id}
                  className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  placeholder={f.ph}
                  required
                  className="w-full rounded-md border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label
                htmlFor="servicio"
                className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
              >
                Servicio Solicitado
              </label>
              <select
                id="servicio"
                name="servicio"
                className="w-full rounded-md border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {services.map((s) => (
                  <option key={s} value={s} className="bg-card">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
          >
            {sentVia ? (
              <>
                <ShieldCheck className="h-4 w-4" />
                {sentVia === 'whatsapp'
                  ? 'Se abrió WhatsApp — envía el mensaje para completar'
                  : 'Se abrió tu correo — envíalo para completar'}
              </>
            ) : (
              <>
                {hasWhatsApp ? 'Enviar solicitud por WhatsApp' : 'Enviar solicitud por correo'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
