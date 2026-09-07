import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, Clock4, MapPin } from 'lucide-react'
import { AREA, OWNER, aboutParagraphs, aboutStats, advantages, anre, services, trustBadges, workSteps } from './data.js'
import {
  CallButton,
  ContactActions,
  IconBadge,
  ProfileFrame,
  SectionLabel,
  WhatsAppButton,
  fadeUp,
  icons,
  inView,
  stagger,
} from './components.jsx'

/* -------------------------------------------------------------------------- */
/*  Antetul paginilor interioare                                              */
/* -------------------------------------------------------------------------- */

export function PageHeader({ label, title, children }) {
  return (
    <section className="relative overflow-hidden pb-4 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-mesh-hero opacity-70" aria-hidden="true" />
      <div className="grid-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>{label}</SectionLabel>
        <motion.h1
          variants={fadeUp}
          className="mt-5 max-w-3xl font-display text-[2.1rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[3rem]"
        >
          {title}
        </motion.h1>
        {children && (
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            {children}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}

/** Legătură discretă către altă pagină, folosită la finalul secțiunilor. */
export function PageLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 font-semibold text-volt-200 transition hover:text-volt-100"
    >
      {children}
      <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*  Hero (doar pe pagina principală)                                          */
/* -------------------------------------------------------------------------- */

export function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '18%'])

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-28 sm:pt-36 lg:pb-24">
      <motion.div style={{ y: backgroundY }} className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-mesh-hero" />
        <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-volt-600/20 blur-[140px]" />
        <div className="absolute bottom-10 right-0 h-[320px] w-[320px] rounded-full bg-ember-500/[0.07] blur-[120px]" />
      </motion.div>
      <div className="grid-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
          >
            <MapPin size={15} className="text-volt-300" aria-hidden="true" />
            {AREA}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[3.2rem] lg:text-[3.5rem]"
          >
            Ai ceva de montat
            <br />
            sau de reparat?
          </motion.h1>

          {/* Subtitlul poartă cuvintele-cheie pe care le caută oamenii în Google. */}
          <motion.p variants={fadeUp} className="mt-4 font-display text-lg font-semibold text-volt-200 sm:text-xl">
            Electrician și om bun la toate în Timișoara și împrejurimi
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            Montez prize, întrerupătoare, lustre, benzi LED și spoturi, pun suporturi de televizor pe perete și rezolv
            reparațiile din casă. Ajung la ora stabilită, iar când plec nu rămâne nicio urmă de șantier.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map(({ icon, label }) => {
              const Icon = icons[icon]
              return (
                <span key={label} className="flex items-center gap-2 text-[15px] text-slate-300">
                  <Icon size={16} className="text-volt-300" aria-hidden="true" />
                  {label}
                </span>
              )
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9">
            <ContactActions size="lg" />
            <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
              Spune-mi ce ai de făcut și îți zic din prima cum se rezolvă.
            </p>
          </motion.div>
        </motion.div>

        <div className="mx-auto w-full max-w-[380px] lg:justify-self-end">
          <ProfileFrame />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Servicii                                                                  */
/* -------------------------------------------------------------------------- */

function ServiceCard({ service }) {
  const { icon, title, description, points, accent, wide } = service
  const Icon = icons[icon]
  const isEmber = accent === 'ember'

  return (
    <motion.div variants={fadeUp} className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>
      <div className="glass card-lift group flex h-full flex-col rounded-[1.75rem] p-7 sm:p-8">
        <IconBadge icon={Icon} accent={accent} size="lg" />

        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-3 max-w-lg leading-relaxed text-slate-300">{description}</p>

        <ul className={`mt-6 grid gap-x-6 gap-y-2.5 ${wide ? 'sm:grid-cols-2' : ''}`}>
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-[15px] text-slate-300">
              <span
                aria-hidden="true"
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  isEmber ? 'bg-ember-400/15 text-ember-300' : 'bg-volt-400/15 text-volt-200'
                }`}
              >
                <icons.Check size={12} strokeWidth={3} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/** Varianta scurtă pentru pagina principală — fără liste, ca să nu repete /servicii. */
function ServiceTeaser({ service }) {
  const { icon, title, teaser, description, accent } = service
  const Icon = icons[icon]

  return (
    <motion.div variants={fadeUp}>
      <div className="glass card-lift group flex h-full flex-col rounded-[1.5rem] p-6">
        <IconBadge icon={Icon} accent={accent} />
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">{title}</h3>
        {/* Text scurt, diferit de descrierea completă de pe /servicii. */}
        <p className="mt-2.5 leading-relaxed text-slate-300">{teaser ?? description}</p>
      </div>
    </motion.div>
  )
}

export function Services({
  heading = 'Cu ce te pot ajuta',
  intro = 'Lucrările din casă, duse până la capăt: măsor, montez, verific că merge și las totul în ordine.',
  showLabel = true,
  compact = false,
}) {
  return (
    <section className="py-16 sm:py-20">
      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {showLabel && <SectionLabel>Servicii</SectionLabel>}
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.6rem]"
            >
              {heading}
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-sm leading-relaxed text-slate-300">
            {intro}
          </motion.p>
        </div>

        {compact ? (
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <ServiceTeaser key={service.title} service={service} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}

          {/* Cardul de contact închide grila: restul detaliilor se lămuresc la telefon. */}
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[1.75rem] border border-volt-300/20 bg-gradient-to-br from-volt-500/[0.14] to-ink-800/40 p-7 sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-volt-400/20 blur-[70px]"
                aria-hidden="true"
              />
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                Ai altceva de rezolvat prin casă?
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-slate-300">
                Sună-mă și îmi spui despre ce e vorba. Detaliile le lămurim în două minute, la telefon.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CallButton />
                <WhatsAppButton />
              </div>
            </div>
          </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Cum decurge                                                               */
/* -------------------------------------------------------------------------- */

export function Steps({ framed = true, showLabel = true, compact = false }) {
  return (
    <section className={`relative py-16 sm:py-20 ${framed ? '' : 'pt-8'}`}>
      {framed && <div className="pointer-events-none absolute inset-0 -z-10 border-y border-white/[0.06] bg-ink-900/50" />}

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        {showLabel && <SectionLabel>Cum decurge</SectionLabel>}
        <motion.h2
          variants={fadeUp}
          className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.6rem]"
        >
          Trei pași și gata
        </motion.h2>

        <div className={`grid gap-10 lg:grid-cols-3 lg:gap-8 ${compact ? 'mt-9' : 'mt-12'}`}>
          {workSteps.map(({ title, text }, index) => (
            <motion.div key={title} variants={fadeUp}>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-volt-300/30 bg-volt-400/10 font-display text-lg font-bold text-volt-200">
                  {index + 1}
                </span>
                {index < workSteps.length - 1 && (
                  <span
                    className="hidden h-px flex-1 bg-gradient-to-r from-volt-400/40 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className={`font-display font-bold text-white ${compact ? 'mt-4 text-lg' : 'mt-5 text-xl'}`}>
                {title}
              </h3>
              {/* Pe pagina principală arătăm doar pașii; detaliul e pe /cum-decurge. */}
              {!compact && <p className="mt-2.5 max-w-sm leading-relaxed text-slate-300">{text}</p>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Despre mine                                                               */
/* -------------------------------------------------------------------------- */

export function About({ showLabel = true, withPhoto = false, heading = 'Cine vine la tine acasă' }) {
  return (
    <section className="py-16 sm:py-20">
      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            {showLabel && <SectionLabel>Despre mine</SectionLabel>}
            {heading && (
              <motion.h2
                variants={fadeUp}
                className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.6rem]"
              >
                {heading}
              </motion.h2>
            )}

            <div className={heading ? 'mt-6 flex flex-col gap-4' : 'flex flex-col gap-4'}>
              {aboutParagraphs.map((paragraph) => (
                <motion.p
                  key={paragraph.slice(0, 32)}
                  variants={fadeUp}
                  className="max-w-xl leading-relaxed text-slate-300"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Se afișează doar când autorizarea e confirmată în `data.js`. */}
            {anre && (
              <motion.div
                variants={fadeUp}
                className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-ember-300/25 bg-ember-400/[0.08] px-5 py-3.5"
              >
                <BadgeCheck size={20} className="shrink-0 text-ember-300" aria-hidden="true" />
                <span className="text-[15px] text-slate-200">
                  Electrician autorizat ANRE
                  {anre.grade && <span className="text-slate-400"> · gradul {anre.grade}</span>}
                </span>
              </motion.div>
            )}

            {aboutStats.length > 0 && (
            <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutStats.map(({ value, label }) => (
                <div key={label} className="glass rounded-[1.5rem] p-5 text-center">
                  <p className="text-gradient-volt font-display text-3xl font-bold tracking-tight">{value}</p>
                  <p className="mt-2 text-sm leading-snug text-slate-400">{label}</p>
                </div>
              ))}
            </motion.div>
            )}
          </div>

          {withPhoto && (
            <motion.div variants={fadeUp} className="mx-auto w-full max-w-[360px] lg:justify-self-end">
              <ProfileFrame />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  De ce eu                                                                  */
/* -------------------------------------------------------------------------- */

export function Advantages({ showLabel = true }) {
  return (
    <section className="py-16 sm:py-20">
      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            {showLabel && <SectionLabel>De ce eu</SectionLabel>}
            <motion.h2
              variants={fadeUp}
              className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-[2.6rem]"
            >
              Treaba făcută o dată, bine
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-md leading-relaxed text-slate-300">
              Iau fiecare lucrare în serios, de la prima măsurătoare până la ultima verificare. Restul se vede la final,
              când te uiți la treaba gata făcută.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3">
              <p className="flex items-center gap-2.5 text-slate-300">
                <MapPin size={16} className="shrink-0 text-volt-300" aria-hidden="true" />
                Mă deplasez în oraș și în localitățile din jur
              </p>
              <p className="flex items-center gap-2.5 text-slate-300">
                <Clock4 size={16} className="shrink-0 text-volt-300" aria-hidden="true" />
                Stabilim din timp ziua și intervalul orar
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map(({ icon, title, text }) => (
              <motion.div key={title} variants={fadeUp}>
                <div className="glass card-lift group h-full rounded-[1.5rem] p-6">
                  <IconBadge icon={icons[icon]} />
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2.5 leading-relaxed text-slate-300">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Îndemn final                                                              */
/* -------------------------------------------------------------------------- */

export function FinalCta({ title, children }) {
  return (
    <section className="pb-20 pt-8 sm:pb-24">
      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div variants={fadeUp}>
          <div className="glass relative rounded-[1.75rem] px-7 py-14 text-center sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-hero opacity-80" aria-hidden="true" />

            <h2 className="mx-auto max-w-2xl font-display text-[2.1rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[3rem]">
              {title ?? (
                <>
                  Sună-mă și vedem <span className="text-gradient-volt">ce e de făcut</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-slate-300">
              {children ??
                'Îmi spui pe scurt despre ce e vorba și fixăm ziua și ora. Fără formulare de completat și fără să aștepți zile întregi un răspuns pe e-mail.'}
            </p>

            <div className="mt-9 flex flex-col items-center gap-5">
              <ContactActions size="lg" align="center" />
              <p className="flex items-center gap-2 text-[15px] text-slate-400">
                <MapPin size={15} className="text-volt-300" aria-hidden="true" />
                {OWNER} · {AREA}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
