import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock4, Lightbulb, MapPin, Phone, Plug, ShieldCheck, Sparkle, User, Wrench, Zap } from 'lucide-react'
import { AREA, OWNER, PHONE, PROFILE_PHOTO, PROFILE_PHOTO_SIZE, TEL_URL, WHATSAPP_URL } from './data.js'

/** Iconițele se referă pe nume din `data.js`, ca datele să rămână fără JSX. */
export const icons = { Check, Clock4, Lightbulb, MapPin, Phone, Plug, ShieldCheck, Sparkle, User, Wrench, Zap }

/* -------------------------------------------------------------------------- */
/*  Animații                                                                  */
/* -------------------------------------------------------------------------- */

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } }

/* -------------------------------------------------------------------------- */
/*  Elemente mici                                                             */
/* -------------------------------------------------------------------------- */

/** Sigla WhatsApp — lucide nu include iconițe de brand. */
export function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.77-1.65-2.06-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.28.3-1.03 1.02-1.03 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42" />
    </svg>
  )
}

export function SectionLabel({ children }) {
  return (
    <motion.p variants={fadeUp} className="flex items-center gap-3 text-sm font-semibold text-volt-300">
      <span className="h-px w-8 bg-volt-400/50" aria-hidden="true" />
      {children}
    </motion.p>
  )
}

/** Pastila cu iconiță, folosită la servicii și avantaje. */
export function IconBadge({ icon: Icon, accent = 'volt', size = 'md' }) {
  const isEmber = accent === 'ember'
  const isLarge = size === 'lg'

  return (
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${
        isLarge ? 'h-14 w-14' : 'h-12 w-12'
      } ${
        isEmber
          ? 'border-ember-300/25 bg-ember-400/[0.12] text-ember-300'
          : 'border-volt-300/25 bg-volt-400/[0.12] text-volt-200'
      }`}
    >
      <span className={`absolute inset-0 -z-10 rounded-2xl blur-lg ${isEmber ? 'bg-ember-400/20' : 'bg-volt-400/20'}`} />
      <Icon size={isLarge ? 26 : 22} strokeWidth={1.8} />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Butoane de contact                                                        */
/* -------------------------------------------------------------------------- */

/** Butonul principal: un tap și pornește apelul. */
export function CallButton({ size = 'md', className = '' }) {
  const isLarge = size === 'lg'

  return (
    <a
      href={TEL_URL}
      className={`group inline-flex items-center gap-4 rounded-[1.25rem] bg-gradient-to-br from-volt-300 to-volt-600 text-ink-950 shadow-glow transition duration-300 hover:from-volt-200 hover:to-volt-500 hover:shadow-glow-lg ${
        isLarge ? 'px-6 py-4 sm:px-8 sm:py-5' : 'px-5 py-3.5'
      } ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-2xl bg-ink-950/15 ${isLarge ? 'h-12 w-12' : 'h-10 w-10'}`}
        aria-hidden="true"
      >
        <Phone size={isLarge ? 22 : 18} strokeWidth={2.4} />
      </span>
      <span className="flex flex-col text-left leading-tight">
        <span className={`font-medium text-ink-950 ${isLarge ? 'text-sm' : 'text-xs'}`}>Sună acum</span>
        <span
          className={`whitespace-nowrap font-display font-bold tracking-tight ${
            isLarge ? 'text-[26px] sm:text-[32px]' : 'text-lg'
          }`}
        >
          {PHONE}
        </span>
      </span>
    </a>
  )
}

/** Alternativa pentru cei care preferă să scrie înainte să sune. */
export function WhatsAppButton({ size = 'md', className = '' }) {
  const isLarge = size === 'lg'

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-[1.25rem] border border-white/[0.12] bg-white/[0.04] font-semibold text-white transition duration-300 hover:border-white/25 hover:bg-white/[0.08] ${
        isLarge ? 'px-6 py-4 sm:px-7 sm:py-5' : 'px-5 py-3.5'
      } ${className}`}
    >
      <WhatsAppIcon size={isLarge ? 24 : 20} className="text-[#25D366]" />
      <span className={isLarge ? 'text-base' : 'text-[15px]'}>Scrie-mi pe WhatsApp</span>
    </a>
  )
}

/** Perechea de butoane, folosită în Hero și în CTA-ul final. */
export function ContactActions({ size = 'lg', align = 'start' }) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        align === 'center' ? 'items-stretch sm:justify-center' : 'items-stretch'
      }`}
    >
      <CallButton size={size} className="justify-center sm:justify-start" />
      <WhatsAppButton size={size} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Fotografia                                                                */
/* -------------------------------------------------------------------------- */

export function ProfileFrame() {
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-full bg-volt-500/15 blur-[80px]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="glass relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] p-2.5"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-ink-700 to-ink-900">
          {hasPhoto ? (
            <img
              src={PROFILE_PHOTO}
              alt={`${OWNER}, electrician în ${AREA}`}
              width={PROFILE_PHOTO_SIZE.width}
              height={PROFILE_PHOTO_SIZE.height}
              fetchpriority="high"
              decoding="async"
              onError={() => setHasPhoto(false)}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            /* Placeholder — pune poza în assets-src/ și rulează `npm run images`. */
            <div className="grid h-full w-full place-items-center bg-grid-fine text-center">
              <div className="flex flex-col items-center gap-4 px-8">
                <span className="grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/5 text-volt-300">
                  <User size={34} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="font-display text-lg font-semibold text-white">Fotografie de profil</p>
                <p className="text-sm text-slate-400">assets-src/cristian-gilca.png</p>
              </div>
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-x-5 bottom-5">
            <p className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">{OWNER}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-300">
              <MapPin size={14} className="text-volt-300" aria-hidden="true" />
              {AREA}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Meniul mobil                                                              */
/* -------------------------------------------------------------------------- */

export function MobileMenu({ open, onClose, links, active, triggerRef }) {
  const panelRef = useRef(null)

  /* Escape închide meniul și redă focusul butonului care l-a deschis. */
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      onClose()
      triggerRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector('a')?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, triggerRef])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Închide meniul"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-950/80 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="absolute inset-x-3 top-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/95 p-3 shadow-glow-lg backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-display text-base font-bold text-white">Meniu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Închide meniul"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="mt-1 flex flex-col" aria-label="Navigare principală">
          {links.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={onClose}
              aria-current={active === id ? 'true' : undefined}
              className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold transition ${
                active === id ? 'bg-volt-400/[0.12] text-volt-200' : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {label}
              {active === id && <span className="h-1.5 w-1.5 rounded-full bg-volt-300" aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <div className="mt-3 flex flex-col gap-2.5 border-t border-white/[0.07] px-1 pt-4">
          <CallButton className="justify-center" />
          <WhatsAppButton className="justify-center" />
        </div>
      </motion.div>
    </div>
  )
}
