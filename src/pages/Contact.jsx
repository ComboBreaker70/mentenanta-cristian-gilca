import { motion } from 'framer-motion'
import { Clock4, MapPin, Phone } from 'lucide-react'
import { AREA, OWNER, PHONE, TEL_URL, WHATSAPP_URL } from '../data.js'
import { usePageMeta } from '../hooks.js'
import { CallButton, WhatsAppButton, WhatsAppIcon, fadeUp, inView, stagger } from '../components.jsx'
import { PageHeader } from '../sections.jsx'

/* Localitățile din jurul Timișoarei în care mă deplasez — contează și pentru
   căutările locale din Google. */
const localities = [
  'Timișoara',
  'Dumbrăvița',
  'Giroc',
  'Chișoda',
  'Ghiroda',
  'Moșnița Nouă',
  'Săcălaz',
  'Sânmihaiu Român',
]

function InfoCard({ icon: Icon, title, children }) {
  return (
    <motion.div variants={fadeUp} className="glass rounded-[1.5rem] p-6">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-2xl border border-volt-300/25 bg-volt-400/[0.12] text-volt-200"
      >
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <h2 className="mt-5 font-display text-lg font-bold text-white">{title}</h2>
      <div className="mt-2.5 leading-relaxed text-slate-300">{children}</div>
    </motion.div>
  )
}

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description: `Sună-l pe ${OWNER} la ${PHONE} sau scrie-i pe WhatsApp. Instalații electrice și reparații în ${AREA}.`,
  })

  return (
    <>
      <PageHeader label="Contact" title="Sună-mă și vedem ce e de făcut">
        Cel mai repede mă prinzi la telefon. Dacă e mai simplu să scrii, trimite-mi un mesaj pe WhatsApp și îți
        răspund cât pot de repede.
      </PageHeader>

      <section className="py-12 sm:py-16">
        <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[1.75rem] border border-volt-300/20 bg-gradient-to-br from-volt-500/[0.14] to-ink-800/40 p-7 text-center sm:p-12"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-volt-400/20 blur-[80px]"
              aria-hidden="true"
            />
            <p className="text-slate-300">Cel mai simplu e la telefon</p>
            <a
              href={TEL_URL}
              className="mt-3 inline-block font-display text-[2.4rem] font-bold tracking-tight text-white transition hover:text-volt-100 sm:text-[3.4rem]"
            >
              {PHONE}
            </a>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <CallButton size="lg" />
              <WhatsAppButton size="lg" />
            </div>
          </motion.div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard icon={MapPin} title="Unde mă deplasez">
              <p>{AREA}.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {localities.map((locality) => (
                  <li key={locality} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-slate-300">
                    {locality}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                Nu e localitatea ta pe listă? Sună-mă oricum și vedem dacă ajung.
              </p>
            </InfoCard>

            <InfoCard icon={Clock4} title="Când mă poți găsi">
              {/* TODO: înlocuiește cu programul real de lucru. */}
              <p>
                Răspund la telefon în timpul zilei. Dacă nu prind apelul pentru că sunt la o lucrare, te sun eu înapoi
                cât pot de repede.
              </p>
              <p className="mt-3">Ziua și intervalul orar le stabilim din timp, la telefon.</p>
            </InfoCard>

            <InfoCard icon={Phone} title="Cum luăm legătura">
              <p>Sună-mă direct dacă e ceva urgent sau vrei să lămurim repede.</p>
              <p className="mt-3">
                Dacă preferi să scrii, trimite-mi un mesaj pe WhatsApp cu ce ai de făcut — poți atașa și o poză.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-volt-200 transition hover:text-volt-100"
              >
                <WhatsAppIcon size={17} className="text-[#25D366]" />
                Deschide WhatsApp
              </a>
            </InfoCard>
          </div>
        </motion.div>
      </section>
    </>
  )
}
