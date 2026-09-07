import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Phone, Zap } from 'lucide-react'
import { OWNER, PHONE, TEL_URL, WHATSAPP_URL, navLinks } from './data.js'
import { useScrollLock, useScrolled } from './hooks.js'
import { CallButton, EASE, WhatsAppButton, WhatsAppIcon } from './components.jsx'

/* -------------------------------------------------------------------------- */
/*  Meniul mobil                                                              */
/* -------------------------------------------------------------------------- */

function MobileMenu({ open, onClose, triggerRef }) {
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
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-semibold transition ${
                  isActive ? 'bg-volt-400/[0.12] text-volt-200' : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-volt-300" aria-hidden="true" />}
                </>
              )}
            </NavLink>
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

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function Header({ onOpenMenu, menuOpen, triggerRef }) {
  const scrolled = useScrolled()

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${OWNER} — pagina principală`}>
          <span
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-volt-300 to-volt-600 text-ink-950"
            aria-hidden="true"
          >
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-base font-bold text-white">{OWNER}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigare principală">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-3.5 py-2 text-sm transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: 0.3, ease: EASE }}
                      className="absolute inset-0 -z-10 rounded-full border border-volt-300/25 bg-volt-400/[0.12]"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={TEL_URL}
            className="hidden items-center gap-2.5 rounded-full bg-gradient-to-br from-volt-300 to-volt-600 px-4 py-2.5 text-ink-950 transition hover:from-volt-200 hover:to-volt-500 sm:flex"
          >
            <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
            <span className="font-display text-[15px] font-bold tracking-tight">{PHONE}</span>
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-label="Deschide meniul"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Subsol                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-volt-300 to-volt-600 text-ink-950"
                aria-hidden="true"
              >
                <Zap size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-base font-bold text-white">{OWNER}</span>
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate-400">
              Instalații electrice, corpuri de iluminat, montaje și reparații în Timișoara și împrejurimi.
            </p>
          </div>

          <nav aria-label="Navigare subsol">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-slate-400">Pagini</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-10">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="inline-block py-1 text-[15px] text-slate-400 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-slate-400">Contact</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a href={TEL_URL} className="font-display text-lg font-bold text-white transition hover:text-volt-200">
                {PHONE}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[15px] text-slate-400 transition hover:text-white"
              >
                <WhatsAppIcon size={16} className="text-[#25D366]" />
                Scrie-mi pe WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/[0.07] pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} {OWNER}
        </p>
      </div>
    </footer>
  )
}

/** Bară fixă pe mobil, ca apelul să fie mereu la un tap distanță. */
function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink-900/90 px-4 py-3 backdrop-blur-xl sm:hidden">
      <div className="flex items-center gap-2.5">
        <a
          href={TEL_URL}
          className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-volt-300 to-volt-600 py-3 text-ink-950"
        >
          <Phone size={18} strokeWidth={2.5} aria-hidden="true" />
          <span className="font-display text-[17px] font-bold tracking-tight">Sună acum</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrie-mi pe WhatsApp"
          className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#25D366]"
        >
          <WhatsAppIcon size={22} />
        </a>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Layout                                                                    */
/* -------------------------------------------------------------------------- */

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuTriggerRef = useRef(null)
  const { pathname } = useLocation()

  useScrollLock(menuOpen)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /* La schimbarea paginii pornim de sus, ca la o navigare normală. */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950 pb-24 sm:pb-0">
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-volt-400 focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ink-950"
      >
        Sari la conținut
      </a>

      <Header menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} triggerRef={menuTriggerRef} />
      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={menuTriggerRef} />

      <main id="continut" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MobileCallBar />
    </div>
  )
}
