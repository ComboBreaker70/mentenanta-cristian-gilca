import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks.js'
import { fadeUp, inView, stagger } from '../components.jsx'
import { FinalCta, Hero, PageLink, Services, Steps } from '../sections.jsx'

export default function Home() {
  usePageMeta({
    title: 'Electrician în Timișoara — prize, lustre, LED-uri, reparații',
    description:
      'Electrician în Timișoara și împrejurimi. Montez prize, întrerupătoare, lustre, benzi LED, spoturi și suporturi de televizor și rezolv reparațiile din casă.',
  })

  return (
    <>
      <Hero />

      {/* Pe pagina principală, secțiunile sunt scurte: detaliul e pe paginile lor,
          ca să nu existe același text pe două adrese. */}
      <Services compact />

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div variants={fadeUp}>
          <PageLink to="/servicii">Vezi toate serviciile în detaliu</PageLink>
        </motion.div>
      </motion.div>

      <Steps compact />

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
        <motion.div variants={fadeUp}>
          <PageLink to="/cum-decurge">Vezi cum decurge o lucrare, pas cu pas</PageLink>
        </motion.div>
      </motion.div>

      <FinalCta />
    </>
  )
}
