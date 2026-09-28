/**
 * Canales de contacto y captación de leads.
 *
 * El número de WhatsApp NO está en el código: se configura en Vercel con la
 * variable NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos,
 * ej. 569XXXXXXXX). Así los dueños no exponen un número personal en el
 * repositorio, y se puede cambiar sin tocar código (hay que volver a
 * desplegar, porque Next.js incrusta la variable al compilar).
 *
 * Sin la variable, los botones de WhatsApp degradan a lo que sí funciona:
 * los CTA llevan al formulario de contacto y los formularios abren un correo.
 */

export const BUSINESS_EMAIL = 'Bope.Security@gmail.com'

export const BUSINESS_ADDRESS_PARTS = {
  street: 'Moneda 812, of. 601',
  city: 'Santiago',
  country: 'Chile',
} as const

export const BUSINESS_ADDRESS = `${BUSINESS_ADDRESS_PARTS.street}, ${BUSINESS_ADDRESS_PARTS.city}, ${BUSINESS_ADDRESS_PARTS.country}`

/** Perfil de LinkedIn de BOPE Security, sin parámetros de seguimiento. */
export const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/bope-security-53a42040b'

/** Publicación de LinkedIn, sin parámetros de seguimiento. */
export const LINKEDIN_POST_URL =
  'https://www.linkedin.com/posts/bope-security-53a42040b_monitoreogps-seguridadlogistica-gestiondeflotas-share-7493661698738819073-0X_e'

const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

/** Un número chileno con código de país tiene 11 dígitos (569XXXXXXXX). */
export const hasWhatsApp = digits.length >= 10

/** Solo dígitos, tal como viene de la variable (sirve para armar enlaces y la tarjeta de contacto). */
export const WHATSAPP_DIGITS = digits

/**
 * El mismo número del WhatsApp de la empresa, listo para mostrarse en pantalla:
 * "569XXXXXXXX" -> "+56 9 XXXX XXXX". Si no es un celular chileno, "+" y los dígitos.
 * Vacío mientras la variable no esté configurada.
 */
export const phoneDisplay = !hasWhatsApp
  ? ''
  : /^569\d{8}$/.test(digits)
    ? `+56 9 ${digits.slice(3, 7)} ${digits.slice(7)}`
    : `+${digits}`

export const phoneHref = hasWhatsApp ? `tel:+${digits}` : ''

/** Tarjeta de contacto (.vcf): al tocarla el teléfono ofrece agregar el contacto. */
export const VCARD_PATH = '/bope-security.vcf'
export const VCARD_FILENAME = 'BOPE-Security.vcf'

export const OPEN_QUOTE_EVENT = 'open-quote-modal'

export type QuotePreset = {
  /** Equipos del catálogo ya elegidos. */
  productIds?: string[]
  /** Nivel de protección elegido en la animación del camión. */
  nivel?: string
}

/** Abre el modal de cotización, opcionalmente con equipos o nivel ya elegidos. */
export function openQuote(preset?: QuotePreset) {
  window.dispatchEvent(new CustomEvent<QuotePreset | undefined>(OPEN_QUOTE_EVENT, { detail: preset }))
}

export const MESSAGES = {
  pain: 'Hola BOPE Security, mi camión dejó de reportar y necesito ayuda ahora.\n\nPatente:\nÚltima ubicación conocida:\nEmpresa:',
  escort:
    'Hola BOPE Security, quiero cotizar escolta para una carga.\n\nRuta:\nFecha:\nTipo de carga:',
  expert: 'Hola BOPE Security, quiero hablar con un experto.',
  monitoring:
    'Hola BOPE Security, quiero conversar sobre monitoreo GPS y asistencia en ruta para mi flota.',
  fleetOps: 'Hola BOPE Security, quiero postular a un piloto de flota de BOPE Fleet Ops.',
  legalReview:
    'Hola BOPE Security, quiero una revisión jurídica de la cláusula de monitoreo GPS para mi reglamento interno.',
} as const

export function whatsappUrl(message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(subject: string, body: string): string {
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Propiedades para un <a> de captación: WhatsApp con mensaje prellenado si
 * hay número configurado; si no, ancla al formulario de contacto.
 */
export function leadProps(
  message: string,
  fallback = '#contacto',
): {
  href: string
  target?: '_blank'
  rel?: string
} {
  if (!hasWhatsApp) return { href: fallback }
  return { href: whatsappUrl(message), target: '_blank', rel: 'noopener noreferrer' }
}

/**
 * Envía un formulario: abre WhatsApp con el mensaje armado o, sin número
 * configurado, el correo del negocio. Devuelve el canal usado.
 */
export function sendLead(message: string, subject: string): 'whatsapp' | 'correo' {
  if (hasWhatsApp) {
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    return 'whatsapp'
  }
  window.location.href = mailtoUrl(subject, message)
  return 'correo'
}
