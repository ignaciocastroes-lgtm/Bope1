/**
 * Catálogo de equipos de la alianza BOPE × NovaSat GPS (venta a clientes
 * particulares, B2C). NO forma parte de los servicios B2B de BOPE.
 *
 * REGLA DE PUBLICACIÓN: un equipo entra aquí solo si tiene ficha técnica
 * verificada Y opera en red 4G. Sin ficha, no se publica. Los equipos que
 * solo funcionan en 2G tampoco: en Chile las redes 2G y 3G se están apagando
 * y esos aparatos quedan sin conexión.
 *
 * Los precios NO se publican: BOPE fija su propio precio (equipo +
 * instalación) al cotizar. Tampoco se publican los planes de datos (SIM);
 * basta con decir que se asesora.
 *
 * Para agregar un equipo: completar `name`, `category` y `spec` (la ficha,
 * con la red indicada). Para quitarlo, borrar su línea.
 */

export type CategoryId = 'vehiculo'

export type Product = {
  id: string
  name: string
  category: CategoryId
  /** Ficha corta verificada, con la red. Obligatoria. */
  spec: string
}

export const SUPPLIER_NAME = 'NovaSat GPS'

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'vehiculo', label: 'GPS para vehículo' },
]

export const PRODUCTS: Product[] = [
  { id: 'gps-r12l', name: 'GPS R12L', category: 'vehiculo', spec: '4G Cat-1 · GPS/BDS · IP65' },
  { id: 'gps-ik121-4g', name: 'GPS IK121 4G', category: 'vehiculo', spec: '4G' },
]

export function productName(id: string): string {
  return PRODUCTS.find((p) => p.id === id)?.name ?? id
}
