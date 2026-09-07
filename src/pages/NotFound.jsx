import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks.js'
import { navLinks } from '../data.js'
import { CallButton } from '../components.jsx'

export default function NotFound() {
  usePageMeta({ title: 'Pagina nu există', description: 'Pagina căutată nu există.' })

  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-mesh-hero opacity-60" aria-hidden="true" />
      <div className="grid-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl font-bold tracking-tight text-gradient-volt">404</p>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Pagina asta nu există
        </h1>
        <p className="mt-4 leading-relaxed text-slate-300">
          Probabil linkul e greșit sau pagina a fost mutată. Mai jos ai tot ce e pe site.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[15px] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <CallButton size="lg" />
        </div>
      </div>
    </section>
  )
}
