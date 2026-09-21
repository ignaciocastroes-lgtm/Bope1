import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { INDEXABLE, SITE_URL } from '@/lib/site'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const TITLE = 'BOPE SECURITY — Asistencia y Monitoreo GPS'
const DESCRIPTION =
  'Escolta preventiva, monitoreo GPS y equipos GPS con instalación profesional para el transporte de carga en Chile.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: INDEXABLE ? undefined : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'BOPE Security',
    locale: 'es_CL',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og-bope.png', width: 1200, height: 630, alt: 'BOPE Security — Asistencia y Monitoreo GPS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-bope.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${oswald.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Visita repetida en la misma sesión: la intro no se muestra ni parpadea. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.intro=sessionStorage.getItem('bope-intro')?'seen':'playing'}catch(e){document.documentElement.dataset.intro='playing'}",
          }}
        />
        <noscript>
          <style>{`#intro{display:none!important}html[data-intro]{overflow:auto!important}`}</style>
        </noscript>
      </head>
      <body className="bg-background font-mono antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Saltar al contenido
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
