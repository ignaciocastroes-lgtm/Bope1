/**
 * Catálogo de equipos GPS de BOPE Security (venta a clientes particulares).
 *
 * REGLA DE PUBLICACIÓN: un equipo entra aquí solo si tiene ficha técnica
 * verificada Y opera en red 4G. Sin ficha, no se publica. Los equipos que
 * solo funcionan en 2G tampoco: en Chile las redes 2G y 3G se están apagando
 * y esos aparatos quedan sin conexión.
 *
 * No se publica el nombre del proveedor. Tampoco los precios: BOPE fija su
 * propio precio (equipo + instalación) al cotizar. Los planes de datos (SIM)
 * tampoco se publican; basta decir que se asesora.
 *
 * Fotos: guardar el archivo en `public/catalog/` (idealmente .webp, cuadrado o
 * 4:3, fondo blanco o transparente, unos 800 px) y completar `image` con su
 * ruta. Si `image` no está, la tarjeta muestra un ícono en su lugar.
 *
 * Para agregar un equipo: completar `id`, `name`, `category` y `spec` (la
 * ficha, con la red indicada). Para quitarlo, borrar su línea.
 */

export type CategoryId = 'vehiculo'

export type Product = {
  id: string
  name: string
  category: CategoryId
  /** Ficha corta verificada, con la red. Obligatoria. */
  spec: string
  /** Foto opcional, ej. '/catalog/gps-r12l.webp'. */
  image?: string
}

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
