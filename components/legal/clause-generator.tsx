'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MESSAGES, leadProps } from '@/lib/contact'
import {
  Copy,
  Check,
  FileText,
  ArrowRight,
  Download,
  TriangleAlert,
  CircleCheck,
  CircleX,
} from 'lucide-react'

/* ---------- RUT · Módulo 11 ---------- */

function cleanRut(raw: string) {
  return raw.replace(/[^0-9kK]/g, '').toUpperCase()
}

function formatRut(raw: string) {
  const clean = cleanRut(raw)
  if (clean.length <= 1) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${withDots}-${dv}`
}

function isValidRut(raw: string) {
  const clean = cleanRut(raw)
  if (clean.length < 2) return false
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  if (!/^\d+$/.test(body)) return false

  let sum = 0
  let mul = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * mul
    mul = mul === 7 ? 2 : mul + 1
  }
  const res = 11 - (sum % 11)
  const expected = res === 11 ? '0' : res === 10 ? 'K' : String(res)
  return expected === dv
}

/* ---------- Document builder ---------- */

function buildClause(opts: {
  empresa: string
  rut: string
  cargo: string
  releInhibicion: boolean
}) {
  const nombre = opts.empresa.trim() || '[RAZÓN SOCIAL DE LA EMPRESA]'
  const rut = opts.rut.trim() || '[RUT DE LA EMPRESA]'
  const cargo =
    opts.cargo.trim() || '[CARGO DEL RESPONSABLE DE DATOS PERSONALES]'

  const releClause = opts.releInhibicion
    ? `4. INHIBICIÓN DE PARTIDA EN REPOSO. Determinados vehículos incorporan un relé de inhibición de partida que impide el encendido del motor únicamente cuando la unidad se encuentra detenida y estacionada ("Modo Estacionamiento Seguro"). La empresa declara expresamente que el sistema NO ejecuta cortes de energía ni inmovilización de vehículos en movimiento, por constituir un riesgo vial inaceptable.`
    : `4. NO INMOVILIZACIÓN EN MARCHA. La empresa declara que el sistema NO ejecuta cortes de energía ni inmovilización de vehículos, ni en marcha ni en reposo. El dispositivo cumple funciones exclusivas de posicionamiento y telemetría.`

  const body = `CLÁUSULA DE MONITOREO GPS Y TELEMETRÍA DE FLOTA

En cumplimiento del artículo 25 bis del Código del Trabajo y del ORD. N°1310 de la Dirección del Trabajo, ${nombre}, RUT ${rut}, declara e informa a sus trabajadores lo siguiente:

1. FINALIDAD OPERATIVA. Los vehículos de la empresa cuentan con dispositivos de posicionamiento satelital (GPS) y telemetría cuyo único objetivo es la seguridad de la carga, la protección del trabajador y la trazabilidad logística de las rutas. El sistema NO constituye un mecanismo de control disciplinario ni de evaluación individual de desempeño.

2. DATOS TRATADOS. El sistema registra ubicación del vehículo, velocidad, geocercas, eventos de detención y alertas de seguridad (incluida la detección de inhibidores de señal). El tratamiento se limita al vehículo y a la operación de transporte, en conformidad con la Ley N°21.719 sobre Protección de Datos Personales.

3. ACCESO Y CONFIDENCIALIDAD. El acceso a la información se encuentra restringido a personal autorizado mediante registro de auditoría (quién accede y cuándo). El responsable del tratamiento de datos personales dentro de la empresa es quien ejerce el cargo de ${cargo}. La información no será utilizada para sanciones fundadas exclusivamente en datos automatizados sin verificación humana previa.

${releClause}

5. CONSERVACIÓN COMO EVIDENCIA. Los registros se conservan de forma íntegra e inalterable, pudiendo ser aportados como medio de prueba ante aseguradoras, fiscalías o tribunales en caso de siniestro o delito, conforme a la Ley N°21.720.

El trabajador declara conocer y aceptar la existencia de este sistema, el cual forma parte del Reglamento Interno de Orden, Higiene y Seguridad de ${nombre}.`

  const notaAbogado = `———————————————————————————————
NOTA PARA EL ABOGADO REVISOR
———————————————————————————————
Este borrador debe ser visado antes de su incorporación formal. Verifique:

[ ] 1. Concordancia con el Reglamento Interno vigente y su procedimiento de modificación (Art. 156 Código del Trabajo).
[ ] 2. Individualización correcta del responsable de datos y del encargado de tratamiento conforme a la Ley N°21.719.
[ ] 3. Constancia de información previa y toma de conocimiento del trabajador (firma o acuse).
[ ] 4. Coherencia entre la finalidad declarada y el uso efectivo de los datos (principio de finalidad y minimización).
[ ] 5. Registro del depósito del Reglamento ante la Inspección del Trabajo y la Seremi de Salud según corresponda.`

  return `${body}\n\n${notaAbogado}`
}

/* ---------- Component ---------- */

export function ClauseGenerator() {
  const [empresa, setEmpresa] = useState('')
  const [rut, setRut] = useState('')
  const [cargo, setCargo] = useState('')
  const [releInhibicion, setReleInhibicion] = useState(false)
  const [copied, setCopied] = useState(false)

  const rutTouched = rut.trim().length > 0
  const rutValid = useMemo(() => isValidRut(rut), [rut])

  const clause = useMemo(
    () => buildClause({ empresa, rut: formatRut(rut), cargo, releInhibicion }),
    [empresa, rut, cargo, releInhibicion],
  )

  async function copy() {
    try {
      await navigator.clipboard.writeText(clause)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function download() {
    const blob = new Blob([clause], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'borrador-clausula-reglamento-interno.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      id="generador"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="border-b border-border bg-secondary/40 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-semibold uppercase tracking-wide text-foreground">
              Generador de Cláusula
            </h3>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Reglamento Interno · ORD. N°1310
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Form */}
        <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
          {/* Legal disclaimer */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <p className="text-xs leading-relaxed text-warning-foreground">
              <span className="font-semibold uppercase tracking-wide">
                Aviso Legal:
              </span>{' '}
              Genera un borrador técnico basado en el ORD. N°1310. NO es asesoría
              legal. Debe ser visado por el abogado de su empresa.
            </p>
          </div>

          {/* Razón social */}
          <label
            htmlFor="empresa"
            className="font-mono text-xs uppercase tracking-[0.2em] text-gold"
          >
            Razón social
          </label>
          <input
            id="empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Ej: Transportes del Sur SpA"
            className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-1 focus:ring-gold/40"
          />

          {/* RUT with Módulo 11 indicator */}
          <div className="mt-5 flex items-center justify-between">
            <label
              htmlFor="rut"
              className="font-mono text-xs uppercase tracking-[0.2em] text-gold"
            >
              RUT
            </label>
            {rutTouched && (
              <span
                className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest ${
                  rutValid ? 'text-success' : 'text-destructive'
                }`}
              >
                {rutValid ? (
                  <>
                    <CircleCheck className="h-3.5 w-3.5" />
                    Módulo 11 válido
                  </>
                ) : (
                  <>
                    <CircleX className="h-3.5 w-3.5" />
                    Dígito verificador inválido
                  </>
                )}
              </span>
            )}
          </div>
          <input
            id="rut"
            type="text"
            inputMode="text"
            value={formatRut(rut)}
            onChange={(e) => setRut(e.target.value)}
            placeholder="Ej: 76.123.456-7"
            aria-invalid={rutTouched && !rutValid}
            className={`mt-3 w-full rounded-lg border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-1 ${
              rutTouched && !rutValid
                ? 'border-destructive/60 focus:border-destructive/70 focus:ring-destructive/40'
                : 'border-input focus:border-gold/60 focus:ring-gold/40'
            }`}
          />

          {/* Cargo del responsable */}
          <label
            htmlFor="cargo"
            className="mt-5 block font-mono text-xs uppercase tracking-[0.2em] text-gold"
          >
            Cargo del responsable de datos
          </label>
          <input
            id="cargo"
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Ej: Gerente de Operaciones"
            className="mt-3 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-1 focus:ring-gold/40"
          />
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/70">
            Indique el cargo, no el nombre de la persona.
          </p>

          {/* Relé toggle */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-border bg-background/60 p-4">
            <label
              htmlFor="rele"
              className="text-sm leading-snug text-foreground"
            >
              ¿Incluye sistema de inhibición de partida (relé)?
            </label>
            <button
              id="rele"
              type="button"
              role="switch"
              aria-checked={releInhibicion}
              onClick={() => setReleInhibicion((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                releInhibicion ? 'bg-gold' : 'bg-input'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-background transition-transform ${
                  releInhibicion ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={copy}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.01] active:scale-100"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Borrador copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar borrador
              </>
            )}
          </button>

          <button
            type="button"
            onClick={download}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Download className="h-4 w-4" />
            Descargar Borrador (.txt)
          </button>

          <a
            {...leadProps(MESSAGES.legalReview, '/#contacto')}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            Solicitar revisión jurídica
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Preview */}
        <div className="relative p-6 sm:p-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-warning/50 bg-warning/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-warning">
              <TriangleAlert className="h-3 w-3" />
              Borrador para revisión legal
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Vista previa
            </span>
          </div>
          <motion.pre
            key={`${empresa}-${rut}-${cargo}-${releInhibicion}`}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-h-[440px] overflow-auto whitespace-pre-wrap rounded-lg border border-border/60 bg-background/60 p-5 font-mono text-[11px] leading-relaxed text-muted-foreground"
          >
            {clause}
          </motion.pre>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/70">
            Documento referencial. Recomendamos validación por su asesor
            laboral antes de su incorporación formal.
          </p>
        </div>
      </div>
    </div>
  )
}
