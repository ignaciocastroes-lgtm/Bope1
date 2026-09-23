'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import { VALUES } from '@/lib/company'

const RADIUS = 150
const CENTER = 190
const NODE_R = 38

/** Ángulo de cada valor, repartido en círculo, empezando arriba. */
function pos(i: number, n: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) }
}

export function ValuesWheel() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const play = reduce ? true : inView

  return (
    <svg
      ref={ref}
      viewBox="0 0 380 380"
      role="img"
      aria-label={`Valores de BOPE Security: ${VALUES.join(', ')}`}
      className="mx-auto h-auto w-full max-w-md"
    >
      {/* Rayos hacia cada valor */}
      {VALUES.map((v, i) => {
        const p = pos(i, VALUES.length)
        return (
          <motion.line
            key={`spoke-${v}`}
            x1={CENTER}
            y1={CENTER}
            x2={p.x}
            y2={p.y}
            stroke="var(--gold)"
            strokeOpacity={0.35}
            strokeWidth={1.5}
            strokeDasharray="3 5"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 + i * 0.06 }}
          />
        )
      })}

      {/* Centro */}
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={44}
        fill="rgba(212,175,55,0.12)"
        stroke="var(--gold)"
        strokeWidth={2.5}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      />
      <foreignObject x={CENTER - 16} y={CENTER - 16} width={32} height={32}>
        <Handshake className="h-8 w-8 text-gold" />
      </foreignObject>

      {/* Valores */}
      {VALUES.map((v, i) => {
        const p = pos(i, VALUES.length)
        return (
          <motion.g
            key={v}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={play ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : 0.3 + i * 0.06 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <circle cx={p.x} cy={p.y} r={NODE_R} fill="#15161b" stroke="var(--gold)" strokeWidth={2} />
            <text
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11.5}
              fontWeight={700}
              fill="#f4f4f5"
              className="uppercase"
            >
              {v}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
