import { MessageCircle, Mail } from 'lucide-react'
import { BopeLogo, LinkedInIcon } from '@/components/brand'
import { BUSINESS_EMAIL, LINKEDIN_PROFILE_URL, MESSAGES, hasWhatsApp, leadProps } from '@/lib/contact'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pb-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BopeLogo className="h-14 w-auto" />
              <div className="leading-none">
                <p className="font-sans text-base font-semibold tracking-[0.18em] text-foreground">
                  BOPE SECURITY
                </p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Asistencia y Monitoreo GPS
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Servicios privados de asistencia logística y seguridad en ruta:
              escolta preventiva, monitoreo GPS y equipos con instalación
              profesional para el transporte de carga.
            </p>
          </div>

          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-foreground">
              Navegación
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#servicios" className="hover:text-gold">Servicios</a></li>
              <li><a href="#equipos" className="hover:text-gold">Equipos GPS</a></li>
              <li><a href="#tecnologia" className="hover:text-gold">Plataforma</a></li>
              <li><a href="#cobertura" className="hover:text-gold">Cobertura</a></li>
              <li><a href="#contacto" className="hover:text-gold">Contacto</a></li>
              <li><a href="/arquitectura-legal" className="hover:text-gold">Arquitectura legal</a></li>
              <li><a href="/privacidad" className="hover:text-gold">Privacidad</a></li>
              <li><a href="#inicio" className="hover:text-gold">Volver arriba</a></li>
            </ul>
          </div>

          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-widest text-foreground">
              Contacto
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold" />
                {BUSINESS_EMAIL}
              </a>
              <div className="mt-2 flex gap-3">
                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
                {hasWhatsApp && (
                  <a
                    {...leadProps(MESSAGES.monitoring)}
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} BOPE SECURITY — Asistencia y Monitoreo
            GPS. Todos los derechos reservados.{' '}
            <a href="/privacidad" className="underline-offset-4 hover:text-gold hover:underline">
              Privacidad
            </a>
          </p>
          <p className="max-w-md text-pretty sm:text-right">
            Servicios de asistencia logística y seguridad privada en rutas. No
            constituye servicio de seguridad pública ni fuerza policial.
          </p>
        </div>
      </div>
    </footer>
  )
}
