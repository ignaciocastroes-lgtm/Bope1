'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { BopeLogo, LinkedInIcon } from '@/components/brand'
import { BUSINESS_EMAIL, LINKEDIN_POST_URL, LINKEDIN_PROFILE_URL } from '@/lib/contact'

export function LinkedInSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Channel card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
              Canal Oficial y Novedades
            </span>
            <h2 className="mt-4 text-balance font-sans text-3xl font-bold uppercase tracking-tight text-foreground">
              Síguenos en LinkedIn
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Novedades operativas, protocolos de seguridad y cobertura en ruta
              directamente desde el equipo de{' '}
              <span className="text-foreground">
                BOPE SECURITY — Asistencia y Monitoreo GPS
              </span>
              .
            </p>

            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
            >
              <LinkedInIcon className="h-4 w-4" />
              Seguirnos en LinkedIn
            </a>

            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-md border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" />
              {BUSINESS_EMAIL}
            </a>
          </motion.div>

          {/* Mock LinkedIn post */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <BopeLogo className="h-8 w-auto" />
              </div>
              <div className="flex-1 leading-tight">
                <p className="font-sans text-sm font-semibold text-foreground">
                  BOPE SECURITY — Asistencia y Monitoreo GPS
                </p>
                <p className="text-xs text-muted-foreground">
                  Seguridad Logística
                </p>
                              </div>
              <LinkedInIcon className="h-5 w-5 text-[#0a66c2]" />
            </div>

            <p className="px-5 pb-4 text-pretty leading-relaxed text-foreground/90">
              Monitoreo GPS, seguridad logística y gestión de flotas: lo que
              hacemos en la ruta, contado por el equipo.
            </p>
            <p className="px-5 pb-4 text-sm text-gold">
              #MonitoreoGPS #SeguridadLogística #GestiónDeFlotas
            </p>

            <div className="relative aspect-[16/9] w-full border-y border-border">
              <Image
                src="/monitoring-still.webp"
                alt="Captura de cámara de monitoreo de carretera mostrando un camión de carga bajo vigilancia nocturna"
                fill
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded border border-gold/40 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                CAM · RUTA 78
              </span>
            </div>

            <a
              href={LINKEDIN_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-t border-border py-3.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-gold"
            >
              Ver esta publicación
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
