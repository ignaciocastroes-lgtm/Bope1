/**
 * Tácticas de robo que el sitio explica en el modal de "cómo operan" (gancho
 * de dolor). Se describen a nivel de patrón, sin pasos ni detalles técnicos
 * de cómo ejecutarlas: el objetivo es que el cliente entienda el riesgo y
 * qué nivel de nuestro sistema responde a cada una, no enseñar el método.
 *
 * Cada táctica apunta al nivel (LevelId) de `security-levels.ts` que la
 * neutraliza, para que el modal pueda abrir el camión directo en ese nivel.
 */

import type { LevelId } from '@/lib/security-levels'

export type Threat = {
  id: string
  title: string
  text: string
  /** Nivel del camión que responde a esta táctica. */
  level: LevelId
  response: string
}

export const THREATS: Threat[] = [
  {
    id: 'ubicar-anular',
    title: 'Ubican el rastreador y lo anulan',
    text: 'Revisan el tablero, encuentran la unidad principal y la desconectan o la retiran. Si esa es la única unidad, el camión queda ciego desde ese momento.',
    level: 2,
    response: 'Un segundo equipo, oculto en otro punto, sigue reportando aunque encuentren y anulen el principal.',
  },
  {
    id: 'jamming',
    title: 'Bloquean la señal con un inhibidor',
    text: 'Un inhibidor corta la señal celular y GPS del vehículo. El camión deja de aparecer en la pantalla, y nadie sabe si es una zona sin cobertura o un ataque en curso.',
    level: 4,
    response: 'El plan satelital sigue reportando cuando la red celular está bloqueada, y cada corte y cada recuperación queda en la bitácora.',
  },
  {
    id: 'carga-directa',
    title: 'Van directo a la carga, sin tocar la cabina',
    text: 'Abren la puerta trasera del contenedor sin acercarse al tablero ni a los equipos del conductor, para no activar ninguna alerta pensada solo para la cabina.',
    level: 3,
    response: 'Un sensor en la puerta y un equipo dentro de la caja registran la apertura y la ubicación de la carga, aparte del vehículo.',
  },
  {
    id: 'presion-conductor',
    title: 'Presionan al conductor para que él mismo lo desactive',
    text: 'Si el sistema puede cortar el motor a distancia con solo un botón, ese botón también es un blanco: presionar al conductor para que lo use, o intentar entrar a la cuenta que lo controla.',
    level: 1,
    response: 'Por eso nuestro sistema nunca corta el motor con el camión en marcha, y cada intento de uso queda registrado en una bitácora que nadie puede editar ni borrar.',
  },
]
