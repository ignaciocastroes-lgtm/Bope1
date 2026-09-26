/**
 * Niveles de protección del vehículo (usados por la animación del camión).
 *
 * El auto escolta (afuera de este archivo, es una categoría aparte) es la
 * base que siempre está y la que de verdad reporta; no depende de estos
 * niveles ni interviene contra quien roba. Estos 4 niveles son la
 * tecnología que SÍ se despliega contra eso, y se dosifican según el valor
 * de la carga: no es "más de lo mismo" nivel a nivel, es más cobertura.
 *
 * Los puntos numerados replican la instalación de referencia. Los niveles son
 * acumulativos: cada uno incluye los anteriores. El nivel 4 (satelital) se
 * cotiza siempre a medida, porque depende de la ruta, el equipo y el plan.
 *
 * Las descripciones evitan prometer funciones que dependen del modelo de
 * equipo, del plan o de la cobertura: eso se confirma al cotizar.
 */

export type PointId = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type LevelId = 1 | 2 | 3 | 4

export const POINT_IDS: PointId[] = [1, 2, 3, 4, 5, 6, 7]

export const POINTS: Record<PointId, { name: string; where: string }> = {
  1: { name: 'Unidad GPS principal', where: 'Tablero' },
  2: { name: 'Rastreador oculto', where: 'Bajo el tablero' },
  3: { name: 'Antena GPS exterior', where: 'Techo de la caja' },
  4: { name: 'GPS de seguimiento de carga', where: 'Interior de la caja' },
  5: { name: 'Rastreador de chasis', where: 'Ubicación discreta' },
  6: { name: 'Sensor de puerta trasera', where: 'Puerta de la caja' },
  7: { name: 'Antena satelital', where: 'Techo de la caja' },
}

/**
 * Lo que va incluido desde el nivel 1, en todos los niveles: es la base del
 * negocio. BOPE entrega tecnología, monitoreo, protocolo de respuesta y
 * evidencia; NO es un seguro ni cubre el valor del vehículo o de la carga.
 */
export const BASE_INCLUDED = [
  {
    id: 'auditoria',
    name: 'Sistema de auditoría',
    text: 'Cada evento queda en una bitácora que nadie puede editar ni borrar. Es el respaldo de lo que pasó.',
  },
  {
    id: 'jamming',
    name: 'Protocolo ante inhibidores',
    text: 'Los ladrones usan inhibidores de señal (jamming). Nosotros no los usamos: tenemos un protocolo para responder cuando ocurre.',
  },
] as const

export const NOT_INSURANCE =
  'BOPE entrega tecnología, monitoreo, protocolo de respuesta y evidencia. No es un seguro: no cubre el valor del vehículo ni de la carga.'

/** Elemento sin número que se suma en el nivel 4. */
export const SAT_PLAN = {
  name: 'Plan de datos satelital',
  where: 'SIM satelital, intervalo a tu medida',
}

export const LEVELS: {
  id: LevelId
  short: string
  name: string
  text: string
  /** Puntos que se suman en este nivel (los de niveles anteriores se conservan). */
  adds: PointId[]
  /** Cierre de la animación (solo el último nivel). */
  closing?: string
  /** Eventos que este nivel suma a la bitácora de auditoría. */
  audit: string[]
  /** Se cotiza siempre a medida. */
  tailored?: boolean
}[] = [
  {
    id: 1,
    short: 'Base',
    name: 'Nivel 1 · Base',
    text: 'Ubicación y recorrido del vehículo, siempre a la vista en tu celular.',
    adds: [1, 3],
    audit: ['Posición del vehículo registrada', 'Recorrido guardado, sin edición ni borrado'],
  },
  {
    id: 2,
    short: 'Reforzado',
    name: 'Nivel 2 · Reforzado',
    text: 'Suma respaldo oculto: si alguien manipula o retira la unidad principal, otros equipos pueden seguir reportando.',
    adds: [2, 5],
    audit: ['Respaldo oculto reportando'],
  },
  {
    id: 3,
    short: 'Carga vigilada',
    name: 'Nivel 3 · Carga vigilada',
    text: 'Cierra la caja: suma la ubicación de la carga y un sensor que registra cuándo se abre la puerta trasera.',
    adds: [4, 6],
    audit: ['Puerta trasera cerrada · cada apertura queda registrada'],
  },
  {
    id: 4,
    short: 'Satelital',
    name: 'Nivel 4 · Satelital',
    text: 'Modo fuera de bloqueos: antena y plan de datos satelital para seguir reportando cuando la red celular falla o está bloqueada. La idoneidad del equipo, de la SIM y de la cobertura se evalúa según tu ruta.',
    closing: 'Con una configuración propia (no la de fábrica) se puede subir la frecuencia de reporte y consultar la posición por satélite, una y otra vez, hasta ubicar el vehículo. Depende del equipo y del plan: algunos solo transmiten y no reciben órdenes.',
    adds: [7],
    audit: ['Red celular bloqueada · reporte por satélite'],
    tailored: true,
  },
]

/** Puntos activos en un nivel (acumulativo). */
export function activePoints(level: LevelId): PointId[] {
  return LEVELS.filter((l) => l.id <= level).flatMap((l) => l.adds)
}
