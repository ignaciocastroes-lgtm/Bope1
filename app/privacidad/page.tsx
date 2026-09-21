import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { FloatingContact } from '@/components/floating-contact'
import { BUSINESS_EMAIL, MESSAGES, leadProps } from '@/lib/contact'

export const metadata: Metadata = {
  alternates: { canonical: '/privacidad' },
  title: 'Privacidad | BOPE Security',
  description: 'Qué datos recibe este sitio, para qué se usan y cómo ejercer tus derechos.',
}

const sections = [
  {
    title: 'Qué datos recibimos',
    body: 'Solo los que tú escribes en los formularios de cotización: nombre, empresa, teléfono, correo, ruta o tramo, tipo de carga, vehículos, ciudad y comentarios. También recibimos el mensaje que nos envías por WhatsApp o correo.',
  },
  {
    title: 'Cómo viajan',
    body: 'Los formularios de este sitio no guardan tus datos en una base de datos. Al enviarlos se abre WhatsApp o tu correo con el mensaje ya armado, y es ese mensaje el que llega a nuestro equipo. WhatsApp y tu proveedor de correo tienen sus propias políticas de privacidad.',
  },
  {
    title: 'Para qué los usamos',
    body: 'Para responder tu consulta y preparar una cotización de escolta, monitoreo GPS o equipos. No vendemos ni compartimos estos datos con terceros para publicidad.',
  },
  {
    title: 'Métricas del sitio',
    body: 'Usamos Vercel Web Analytics para contar visitas de forma agregada y saber qué secciones se leen. No usamos publicidad ni perfiles de usuarios.',
  },
  {
    title: 'Tus derechos',
    body: `Puedes pedir acceso, rectificación o eliminación de los datos que nos hayas enviado, y oponerte a que los usemos. Escríbenos a ${BUSINESS_EMAIL}. La Ley 21.719 de protección de datos personales entra en plena vigencia el 1 de diciembre de 2026 y estos derechos se ajustarán a ella.`,
  },
  {
    title: 'La plataforma BOPE Fleet Ops',
    body: 'La plataforma para flotas está en desarrollo. Cuando abra, tratará ubicación de vehículos y, por lo tanto, datos personales de conductores; esta página se ampliará con ese tratamiento antes de que empiece a operar con clientes.',
  },
]

export default function PrivacidadPage() {
  return (
    <main id="contenido" className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <BopeLogo className="h-10 w-auto" />
            <span className="font-sans text-sm font-semibold tracking-[0.18em] text-foreground">
              BOPE SECURITY
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              {...leadProps(MESSAGES.expert, '/#contacto')}
              className="hidden items-center gap-2 rounded-md bg-gold px-3 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Hablar con un experto
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
              <span className="sm:hidden">Inicio</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
          Privacidad
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Actualizado el 20 de septiembre de 2026</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-sans text-lg font-semibold text-foreground">{s.title}</h2>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
      <FloatingContact fallback="/#contacto" alwaysVisible />
    </main>
  )
}
