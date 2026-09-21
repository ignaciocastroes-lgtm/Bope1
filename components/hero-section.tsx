'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Navigation, Signal, Gauge, Radar } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { MESSAGES, leadProps, openQuote } from '@/lib/contact'

const telemetry = [
  { icon: Signal, label: 'GPS', value: 'LOCK 97°E' },
  { icon: Navigation, label: 'Ruta', value: '78 · Autopista del Sol' },
  { icon: Gauge, label: 'Velocidad', value: '92.9 km/h' },
  { icon: Radar, label: 'Status', value: 'EN RUTA · MONITOREADA' },
]

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3])
  const hudY = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])
  const hudOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
    >
      {/* Background layer */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-truck.webp"
          alt="Camión de carga en autopista al atardecer bajo escolta preventiva"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/50" />
      </motion.div>

      {/* Tactical grid overlay */}
      <div className="tactical-grid absolute inset-0 opacity-60" />

      {/* HUD telemetry layer */}
      <motion.div
        style={{ y: hudY, opacity: hudOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-4 top-24 hidden max-w-xs flex-col gap-3 sm:right-8 sm:flex lg:top-28">
          {telemetry.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-3 rounded-md border border-gold/25 bg-background/60 px-3 py-2 backdrop-blur-md"
            >
              <t.icon className="h-4 w-4 shrink-0 text-gold" />
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  {t.label}
                </span>
                <span className="font-sans text-sm tracking-wider text-foreground">
                  {t.value}
                </span>
              </div>
              <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            </motion.div>
          ))}
          <p className="text-right text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Datos de ejemplo
          </p>
        </div>

        {/* HUD corner brackets */}
        <div className="absolute left-6 top-24 h-16 w-16 border-l-2 border-t-2 border-gold/40 lg:top-28" />
        <div className="absolute bottom-10 right-6 h-16 w-16 border-b-2 border-r-2 border-gold/40" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <BopeLogo variant="lg" priority className="mb-4 h-20 w-auto sm:h-28 lg:h-32" />
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            Escolta · Monitoreo GPS · Equipos
          </span>

          <h1 className="mt-5 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Cuando tu camión deja de responder,{' '}
            <span className="text-gradient-gold">¿quién sale a buscarlo?</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nosotros. BOPE Security acompaña tu carga en la ruta y sigue tu
            flota por GPS, con un equipo que responde en terreno y no solo
            desde una pantalla.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              {...leadProps(MESSAGES.escort)}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
            >
              Cotizar escolta de carga
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              {...leadProps(MESSAGES.pain)}
              className="inline-flex items-center justify-center gap-2.5 rounded-md border border-amber/50 bg-amber/10 px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-amber backdrop-blur-md transition-colors hover:bg-amber/20"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
              Mi camión dejó de reportar
            </a>
          </div>

          <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground">
            ¿Buscas un GPS para tu auto?{' '}
            <button
              type="button"
              onClick={() => openQuote()}
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              Ver catálogo y cotizar
            </button>
            . Si hay un delito en curso, llama primero al 133 (Carabineros).
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
