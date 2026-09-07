import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks.js'
import { fadeUp, inView, stagger } from '../components.jsx'
import { FinalCta, PageHeader, PageLink, Steps } from '../sections.jsx'

export default function CumDecurge() {
  usePageMeta({
    title: 'Cum decurge o lucrare',
    description:
      'De la primul telefon până la verificarea finală: cum se desfășoară o lucrare, în trei pași simpli.',
  })

  return (
    <>
      <PageHeader label="Cum decurge" title="De la telefon până la treaba gata">
        Fără drumuri inutile și fără surprize pe parcurs. Vorbim, stabilim, vin și rezolv.
      </PageHeader>

      <Steps framed={false} showLabel={false} />

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <motion.div variants={fadeUp}>
          <PageLink to="/despre-mine">Vezi cine vine la tine acasă</PageLink>
        </motion.div>
      </motion.div>

      <FinalCta />
    </>
  )
}
