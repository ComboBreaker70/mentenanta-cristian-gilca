import { motion } from 'framer-motion'
import { usePageMeta } from '../hooks.js'
import { fadeUp, inView, stagger } from '../components.jsx'
import { About, Advantages, FinalCta, PageHeader, PageLink } from '../sections.jsx'

export default function DespreMine() {
  usePageMeta({
    title: 'Despre mine',
    description:
      'Cine sunt, de cât timp lucrez și cum îmi fac treaba. Instalații electrice și reparații în Timișoara și împrejurimi.',
  })

  return (
    <>
      <PageHeader label="Despre mine" title="Cine vine la tine acasă">
        Vorbești direct cu omul care face lucrarea. Fără intermediari și fără echipe trimise în locul meu.
      </PageHeader>

      <About showLabel={false} withPhoto heading={null} />
      <Advantages />

      <motion.div variants={stagger} {...inView} className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <motion.div variants={fadeUp}>
          <PageLink to="/servicii">Vezi cu ce te pot ajuta</PageLink>
        </motion.div>
      </motion.div>

      <FinalCta />
    </>
  )
}
