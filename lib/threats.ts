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
    text: 'Un inhibidor no apunta a un solo equipo: corta la señal celular y GPS en todo su radio, así que afecta por igual a la antena visible, a un GPS escondido y a los radios del conductor. En Chile, además, portarlo y usarlo ya es delito (Ley 21.720).',
    level: 4,
    response: 'Esconder más antenas no basta si todas caen dentro del mismo radio. Por eso el respaldo real está en el satélite, que usa una banda distinta y mucho más difícil de bloquear, y en un equipo que llega a terreno, que no depende de radiofrecuencia.',
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
