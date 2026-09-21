import Image from 'next/image'
import type { SVGProps } from 'react'

/**
 * Logo oficial BOPE Security (escudo dorado con águila).
 * `sm` (360px) para navbar/footer/avatar; `lg` (800px) para el hero.
 */
export function BopeLogo({
  variant = 'sm',
  className,
  priority = false,
}: {
  variant?: 'sm' | 'lg'
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src={variant === 'lg' ? '/logo-bope.webp' : '/logo-bope-sm.webp'}
      alt="BOPE Security — Asistencia y Monitoreo GPS"
      width={variant === 'lg' ? 800 : 360}
      height={variant === 'lg' ? 609 : 274}
      priority={priority}
      className={className}
    />
  )
}

export function BopeCrest({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 3 6 9v14c0 11 7.5 18.5 18 22 10.5-3.5 18-11 18-22V9L24 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="rgba(212,175,55,0.06)"
      />
      {/* eagle wings / chevron */}
      <path
        d="M24 15 13 22h5l-3 6 9-5 9 5-3-6h5L24 15Z"
        fill="currentColor"
      />
      <circle cx="24" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function LinkedInIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
