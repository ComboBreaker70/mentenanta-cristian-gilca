import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks.js'
import { fadeUp, inView, stagger } from '../components.jsx'
import { FinalCta, PageHeader, PageLink, Services } from '../sections.jsx'

export default function Servicii() {
  usePageMeta({
    title: 'Servicii',
    description:
      'Instalații electrice, corpuri de iluminat, montaje și reparații în locuințe, în Timișoara și împrejurimi.',
  })

  return (
    <>
      <PageHeader label="Servicii" title="Cu ce te pot ajuta">
        Cele mai multe lucrări intră în categoriile de mai jos, dar lista nu se oprește aici. Dacă ai ceva care nu
        apare, sună-mă și îți spun sincer dacă mă pricep.
      </PageHeader>

      <Services
        heading="Cele trei lucruri pe care le fac cel mai des"
        intro="Fiecare lucrare începe cu o măsurătoare și se termină cu o verificare, ca să nu fie nevoie să revii asupra ei."
        showLabel={false}
      />

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <motion.div variants={fadeUp}>
          <PageLink to="/cum-decurge">Vezi cum decurge o lucrare, pas cu pas</PageLink>
        </motion.div>
      </motion.div>

      <FinalCta />
    </>
  )
}
