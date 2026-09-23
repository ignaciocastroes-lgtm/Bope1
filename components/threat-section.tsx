'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Radio, ShieldOff, Fingerprint } from 'lucide-react'
import { ActionPlanModal } from '@/components/threat-modal'

const teaser = [
  { icon: Fingerprint, text: 'Buscan el rastreador y lo anulan' },
  { icon: Radio, text: 'Bloquean la señal con un inhibidor' },
  { icon: ShieldOff, text: 'Presionan al conductor para desactivarlo' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const pop = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function ThreatSection() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <section id="amenazas" className="relative scroll-mt-16 overflow-hidden border-y border-border/60 bg-[#0d0e12] py-20 sm:py-28">
      <motion.div
        aria-hidden="true"
        className="tactical-grid pointer-events-none absolute inset-0 opacity-20"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'show'}
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.span
          variants={reduce ? undefined : rise}
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber/40 bg-amber/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-amber"
        >
          <motion.span
            aria-hidden="true"
            className="text-amber"
            animate={reduce ? undefined : { opacity: [1, 0.4, 1] }}
            transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
          </motion.span>
          Quienes roban también se preparan
        </motion.span>

        <motion.h2
          variants={reduce ? undefined : rise}
          className="mt-5 text-balance font-sans text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl"
        >
          Un GPS solo no detiene a nadie
        </motion.h2>
        <motion.p
          variants={reduce ? undefined : rise}
          className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          Los que roban carga saben que existe el GPS, y tienen formas de lidiar con él. Nuestro
          sistema está diseñado pensando en eso, no solo en mostrar un punto en el mapa.
        </motion.p>

        <ul className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
          {teaser.map((t) => (
            <motion.li
              key={t.text}
              variants={reduce ? undefined : pop}
              whileHover={reduce ? undefined : { y: -3, borderColor: 'rgba(212,175,55,0.5)' }}
              className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-4 transition-colors"
            >
              <t.icon className="h-5 w-5 text-amber" />
              <span className="text-pretty text-sm leading-snug text-foreground/90">{t.text}</span>
            </motion.li>
          ))}
        </ul>

        {/* Efecto que guía la mirada de las tarjetas hacia el botón */}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 56"
          preserveAspectRatio="none"
          className="mx-auto -mb-2 mt-2 h-12 w-full max-w-lg text-gold"
        >
          {[50, 150, 250].map((x, i) => (
            <motion.path
              key={x}
              d={`M ${x} 0 Q ${x} 30 150 30 T 150 56`}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={1.5}
              strokeDasharray="3 5"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
            />
          ))}
          {!reduce &&
            [50, 150, 250].map((x, i) => (
              <circle key={`dot-${x}`} r={2.6} fill="var(--gold)">
                <animateMotion
                  dur="2.4s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${x} 0 Q ${x} 30 150 30 T 150 56`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.8;1"
                  dur="2.4s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          <circle cx={150} cy={54} r={3} fill="var(--gold)" opacity={0.6} />
        </svg>

        <motion.button
          variants={reduce ? undefined : rise}
          type="button"
          onClick={() => setOpen(true)}
          whileHover={reduce ? undefined : { scale: 1.03 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="group mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
        >
          Así operan, y qué hacemos nosotros
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      <ActionPlanModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
