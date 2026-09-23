import { activePoints, LEVELS, type LevelId, type PointId } from '@/lib/security-levels'

/**
 * Dibujo del camión con los 6 puntos de instalación. Es SVG puro (sin estado):
 * la animación la dan las clases `.truck-*` de globals.css, y el nivel activo
 * llega por props. Así se puede renderizar en servidor y probar aislado.
 */

const SLATE = '#3a3d47'

type Pt = { id: PointId; x: number; y: number; w: number; h: number; hidden?: boolean }

// Centro de cada equipo y tamaño de su carcasa.
const PTS: Pt[] = [
  { id: 1, x: 236, y: 212, w: 32, h: 18 },
  { id: 2, x: 258, y: 258, w: 28, h: 16, hidden: true },
  { id: 3, x: 520, y: 40, w: 0, h: 0 },
  { id: 4, x: 772, y: 232, w: 42, h: 54 },
  { id: 5, x: 470, y: 328, w: 36, h: 16, hidden: true },
  { id: 6, x: 824, y: 192, w: 12, h: 30 },
  { id: 7, x: 700, y: 40, w: 0, h: 0 },
]

export function TruckArt({
  level,
  fresh,
  pings = false,
  jammed = false,
  buffering = false,
  className,
}: {
  level: LevelId
  /** Puntos recién activados (llevan pulso). */
  fresh: PointId[]
  /** Nivel 4: muestra la consulta de posición yendo y viniendo por satélite. */
  pings?: boolean
  /** Simulación de robo: un inhibidor está cortando la señal celular ahora mismo. */
  jammed?: boolean
  /** Sin satélite (niveles 1-3) y bloqueado: el equipo sigue guardando el recorrido en local. */
  buffering?: boolean
  className?: string
}) {
  const on = new Set(activePoints(level))
  const isOn = (id: PointId) => on.has(id)
  const isFresh = (id: PointId) => fresh.includes(id)

  return (
    <svg
      viewBox="0 -84 900 484"
      role="img"
      aria-label={`Camión de carga con los puntos de instalación del ${LEVELS[level - 1].name}`}
      className={className}
    >
      {/* Campo del inhibidor: el bloqueo cubre un radio, no un solo punto */}
      <ellipse className="truck-jamfield" data-on={jammed} cx={430} cy={140} rx={380} ry={230} />

      {/* Suelo */}
      <ellipse cx={470} cy={368} rx={400} ry={9} fill="#000" opacity={0.4} />
      <line x1={40} y1={364} x2={860} y2={364} stroke={SLATE} strokeWidth={2} />

      {/* Caja de carga */}
      <rect
        className="truck-body truck-box"
        data-lit={level >= 3}
        x={326}
        y={70}
        width={520}
        height={226}
        rx={6}
        fill="#15161b"
        strokeWidth={3}
      />
      {/* Interior visible de la caja */}
      <rect
        className="truck-inner"
        data-lit={level >= 3}
        x={346}
        y={90}
        width={480}
        height={186}
        rx={4}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="5 6"
      />
      {/* Puerta trasera: abierta en los niveles 1-2, se cierra en el 3 */}
      <rect x={826} y={78} width={20} height={212} fill="#07070a" />
      <rect
        className="truck-door"
        data-closed={level >= 3}
        x={826}
        y={78}
        width={20}
        height={212}
        rx={2}
        fill="#1b1d24"
        strokeWidth={2}
      />
      <rect x={834} y={300} width={44} height={8} rx={2} fill="#1d1f26" stroke={SLATE} strokeWidth={1.5} />

      {/* Cabina */}
      <path
        className="truck-body truck-cab"
        data-lit={level >= 2}
        d="M 100 296 L 100 238 Q 100 224 114 220 L 176 202 L 214 134 Q 220 124 232 124 L 318 124 L 318 296 Z"
        fill="#15161b"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path d="M 196 198 L 224 144 L 302 144 L 302 198 Z" fill="#0f1a2b" stroke={SLATE} strokeWidth={1.5} />
      <path d="M 262 144 L 262 296" stroke={SLATE} strokeWidth={1.5} />
      <rect x={244} y={214} width={10} height={4} rx={1} fill={SLATE} />
      <rect x={176} y={176} width={8} height={24} rx={2} fill="#1d1f26" stroke={SLATE} strokeWidth={1.5} />
      <rect x={104} y={244} width={12} height={14} rx={2} fill="#f5e7a8" opacity={0.75} />

      {/* Chasis */}
      <rect x={100} y={296} width={740} height={14} rx={2} fill="#1d1f26" stroke={SLATE} strokeWidth={1.5} />

      {/* Ruedas */}
      {[196, 690, 712].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={324} r={46} fill="#09090b" />
          <circle cx={cx} cy={324} r={40} fill="#0d0e12" stroke={SLATE} strokeWidth={4} />
          <circle cx={cx} cy={324} r={18} fill="#1b1d24" stroke={SLATE} strokeWidth={2} />
          <circle cx={cx} cy={324} r={5} fill={SLATE} />
        </g>
      ))}

      {/* Cable antena → unidad principal (flujo de datos) */}
      <path
        className="truck-wire"
        data-on={isOn(1) && isOn(3)}
        d="M 520 64 L 346 64 Q 322 64 322 88 L 322 176 Q 322 196 300 200 L 250 208"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Antena en el techo + ondas */}
      <ellipse className="truck-dev" data-on={isOn(3)} cx={520} cy={66} rx={24} ry={9} strokeWidth={2} />
      <path className="truck-wave truck-wave-1" data-on={isOn(3) && !jammed} data-blocked={jammed} d="M 500 22 Q 520 8 540 22" fill="none" strokeWidth={2} strokeLinecap="round" />
      <path className="truck-wave truck-wave-2" data-on={isOn(3) && !jammed} data-blocked={jammed} d="M 490 12 Q 520 -8 550 12" fill="none" strokeWidth={2} strokeLinecap="round" />

      {/* Sistema de auditoría (incluido desde el nivel 1) y sus enlaces */}
      <path
        className="truck-link"
        data-on={!jammed}
        data-blocked={jammed}
        d="M 500 28 Q 330 -70 172 -36"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        className="truck-link"
        data-on={jammed && isOn(7)}
        d="M 726 -62 Q 460 -108 168 -48"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <g className="truck-audit" transform="translate(140 -42)">
        <path d="M 0 -26 L 22 -18 L 22 0 Q 22 14 0 24 Q -22 14 -22 0 L -22 -18 Z" strokeWidth={2.5} strokeLinejoin="round" />
        <path d="M -9 -1 L -2 7 L 10 -10" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Insistir: consulta de posición hacia el equipo y respuesta hasta la auditoría */}
      {pings && jammed && isOn(7) && (
        <>
          <circle r={5} fill="none" stroke="var(--gold)" strokeWidth={2} opacity={0}>
            <animateMotion
              dur="4.4s"
              repeatCount="indefinite"
              path="M 738 -34 L 706 44"
              keyPoints="0;1;1"
              keyTimes="0;0.3;1"
              calcMode="linear"
            />
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.29;0.3;1" dur="4.4s" repeatCount="indefinite" />
          </circle>
          <circle r={5} fill="var(--gold)" opacity={0}>
            <animateMotion
              dur="4.4s"
              repeatCount="indefinite"
              path="M 706 44 L 736 -34 L 726 -62 Q 460 -108 168 -48"
              keyPoints="0;0;1;1"
              keyTimes="0;0.36;0.86;1"
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              values="0;0;1;1;0;0"
              keyTimes="0;0.35;0.36;0.85;0.86;1"
              dur="4.4s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      {/* Bloqueo celular: la señal de la antena 3 queda tachada mientras dura la simulación */}
      <g className="truck-block" data-on={jammed}>
        <path d="M 550 4 L 566 20 M 566 4 L 550 20" strokeWidth={3} strokeLinecap="round" fill="none" />
      </g>

      {/* El inhibidor/jammer: el artefacto del atacante, en verde para diferenciarlo
          del equipo propio (dorado). Solo aparece durante la simulación de robo. */}
      {/* El "transform" de posición va en un <g> aparte: la animación CSS de
          aparición usa su propio "transform" (scale) y pisaría un translate
          puesto en el mismo elemento. */}
      <g transform="translate(646 -14)">
        <g className="truck-jammer" data-on={jammed}>
          <path
            className="truck-jammer-beam"
            d="M -5 13 Q -36 20 -78 38"
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <path d="M -6 -6 L -9 -17 M 0 -7 L 0 -19 M 6 -6 L 9 -17" strokeWidth={1.5} strokeLinecap="round" fill="none" />
          <rect x={-11} y={-6} width={22} height={15} rx={3} strokeWidth={1.5} />
        </g>
      </g>

      {/* Antena satelital (7), satélite y enlace */}
      <path className="truck-mast" data-on={isOn(7)} d="M 700 66 L 700 52" strokeWidth={2} />
      <ellipse className="truck-dev" data-on={isOn(7)} cx={700} cy={68} rx={32} ry={7} strokeWidth={2} />
      <path
        className="truck-beam"
        data-on={isOn(7)}
        d="M 738 -34 L 712 30"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <g className="truck-sat" data-on={isOn(7)} transform="translate(752 -50) rotate(28)">
        <rect x={-30} y={-6} width={22} height={12} rx={1} />
        <rect x={8} y={-6} width={22} height={12} rx={1} />
        <rect x={-8} y={-9} width={16} height={18} rx={3} />
      </g>

      {/* Sin satélite y bloqueado: sigue guardando el recorrido en local */}
      <g className="truck-buffer" data-on={buffering}>
        <circle cx={PTS[0].x + 26} cy={PTS[0].y - 22} r={9} strokeWidth={2} fill="#15161b" />
        <circle className="truck-buffer-pulse" cx={PTS[0].x + 26} cy={PTS[0].y - 22} r={9} />
        <text x={PTS[0].x + 26} y={PTS[0].y - 22} textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
          !
        </text>
      </g>

      {/* Carcasas de los equipos */}
      {PTS.filter((p) => p.w > 0).map((p) => (
        <rect
          key={p.id}
          className={`truck-dev${p.hidden ? ' truck-dev-hidden' : ''}`}
          data-on={isOn(p.id)}
          data-jammed={jammed && isOn(p.id) && p.id !== 7}
          x={p.x - p.w / 2}
          y={p.y - p.h / 2}
          width={p.w}
          height={p.h}
          rx={4}
          strokeWidth={2}
        />
      ))}

      {/* Marcadores numerados */}
      {PTS.map((p) => (
        <g
          key={p.id}
          className="truck-marker"
          data-on={isOn(p.id)}
          data-jammed={jammed && isOn(p.id) && p.id !== 7}
          data-fresh={isOn(p.id) && isFresh(p.id)}
          transform={`translate(${p.x} ${p.y})`}
        >
          {p.hidden && <circle className="truck-hid" r={22} fill="none" strokeWidth={1.5} strokeDasharray="3 4" />}
          <circle className="truck-pulse" r={13} />
          <circle className="truck-dot" r={13} strokeWidth={2} />
          <text className="truck-num" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}>
            {p.id}
          </text>
        </g>
      ))}
    </svg>
  )
}
