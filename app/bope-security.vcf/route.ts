import {
  BUSINESS_ADDRESS_PARTS,
  BUSINESS_EMAIL,
  VCARD_FILENAME,
  WHATSAPP_DIGITS,
  hasWhatsApp,
} from '@/lib/contact'
import { SITE_URL } from '@/lib/site'

/**
 * Tarjeta de contacto de BOPE Security. Al abrirla en el celular, el teléfono
 * ofrece "agregar contacto" con nombre, WhatsApp, correo, dirección y sitio ya
 * completos. El número sale de la misma variable que usan los botones de
 * WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER): no está escrito en el código.
 */
/** En una tarjeta de contacto la coma y el punto y coma separan valores: hay que escaparlos. */
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;')

export function GET() {
  if (!hasWhatsApp) return new Response('No disponible', { status: 404 })

  const a = BUSINESS_ADDRESS_PARTS
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;BOPE Security;;;',
    'FN:BOPE Security',
    'ORG:BOPE Security SpA',
    'TITLE:Asistencia y Monitoreo GPS',
    `TEL;TYPE=CELL,VOICE:+${WHATSAPP_DIGITS}`,
    `EMAIL;TYPE=WORK:${BUSINESS_EMAIL}`,
    `ADR;TYPE=WORK:;;${esc(a.street)};${esc(a.city)};;;${esc(a.country)}`,
    `URL:${SITE_URL}`,
    'NOTE:WhatsApp de la empresa',
    'END:VCARD',
  ]

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${VCARD_FILENAME}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
