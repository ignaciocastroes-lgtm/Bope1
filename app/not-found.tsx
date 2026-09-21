import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { BopeLogo } from '@/components/brand'
import { MESSAGES, leadProps } from '@/lib/contact'

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <BopeLogo className="h-24 w-auto" />
      <h1 className="mt-8 font-sans text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
        El enlace puede estar mal escrito o la página se movió. Vuelve al inicio o
        habla directamente con nuestro equipo.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:gold-glow"
        >
          Volver al inicio
        </Link>
        <a
          {...leadProps(MESSAGES.expert, '/#contacto')}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/50 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold/10"
        >
          <MessageCircle className="h-4 w-4" />
          Hablar con un experto
        </a>
      </div>
    </main>
  )
}
