/**
 * Toate datele editabile ale site-ului, într-un singur loc.
 *
 * Elementele marcate cu TODO trebuie confirmate de Cristian înainte de lansare.
 */

/* -------------------------------------------------------------------------- */
/*  Identitate și contact                                                     */
/* -------------------------------------------------------------------------- */

export const OWNER = 'Cristian Gilca'
export const AREA = 'Timișoara și împrejurimi'

/** Forma afișată pe ecran. */
export const PHONE = '0725 715 596'
/** Forma pentru `tel:` — format internațional, fără spații. */
export const PHONE_TEL = '+40725715596'
/** Forma pentru wa.me — fără `+` și fără spații. */
export const PHONE_WHATSAPP = '40725715596'

export const WHATSAPP_TEXT = 'Bună ziua! V-am găsit pe site și aș avea nevoie de ajutor cu '

export const WHATSAPP_URL = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`
export const TEL_URL = `tel:${PHONE_TEL}`

export const PROFILE_PHOTO = '/cristian-gilca.webp'
/** Dimensiunile reale ale fișierului — previn saltul de layout la încărcare. */
export const PROFILE_PHOTO_SIZE = { width: 388, height: 485 }

/* -------------------------------------------------------------------------- */
/*  Meniu                                                                     */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: 'Acasă', to: '/' },
  { label: 'Servicii', to: '/servicii' },
  { label: 'Cum decurge', to: '/cum-decurge' },
  { label: 'Despre mine', to: '/despre-mine' },
  { label: 'Contact', to: '/contact' },
]

/* -------------------------------------------------------------------------- */
/*  Conținut                                                                  */
/* -------------------------------------------------------------------------- */

export const trustBadges = [
  { icon: 'Clock4', label: 'Ajung la ora stabilită' },
  { icon: 'Sparkle', label: 'Curat la final' },
  { icon: 'Wrench', label: 'Scule profesionale' },
]

export const services = [
  {
    icon: 'Plug',
    title: 'Instalații electrice',
    description:
      'Montez prize și întrerupătoare noi, le înlocuiesc pe cele vechi și le mut acolo unde ai nevoie de ele. Am grijă la traseu, la fixare și la cum arată peretele când plec.',
    teaser: 'Prize, întrerupătoare și comutatoare: montate, înlocuite sau mutate acolo unde ai nevoie de ele.',
    points: ['Prize noi și dubluri', 'Întrerupătoare și comutatoare', 'Mutare în alt loc pe perete', 'Înlocuiri rapide'],
    accent: 'ember',
    wide: true,
  },
  {
    icon: 'Lightbulb',
    title: 'Corpuri de iluminat',
    description:
      'Lustre, aplice, benzi LED și spoturi, la interior sau la exterior. Le montez drept, le leg cum trebuie și le las aprinse, ca să vezi că totul merge.',
    teaser: 'Lustre, aplice, benzi LED și spoturi, montate la interior și la exterior.',
    points: ['Lustre și aplice', 'Benzi LED', 'Spoturi interior și exterior'],
    accent: 'volt',
  },
  {
    icon: 'Wrench',
    title: 'Reparații și montaje în casă',
    description:
      'Suporturi de televizor pe perete, montaje și lucruri de reparat prin casă. Îmi spui ce ai de pus sau ce s-a stricat și mă ocup.',
    teaser: 'Suporturi de televizor pe perete, montaje și lucrurile mărunte de reparat prin casă.',
    points: ['Suporturi de televizor', 'Mici reparații prin casă', 'Montaje diverse'],
    accent: 'volt',
  },
]

export const workSteps = [
  {
    title: 'Vorbim la telefon',
    text: 'Îmi spui ce ai de făcut, îți zic cum se rezolvă și cam cât durează.',
  },
  {
    title: 'Stabilim ziua și ora',
    text: 'Alegem o zi și un interval orar care îți convin, iar eu ajung atunci.',
  },
  {
    title: 'Montez și verific',
    text: 'Montez, verific că totul funcționează și îți las locuința exact cum am găsit-o.',
  },
]

export const advantages = [
  {
    icon: 'Zap',
    title: 'Vin când am spus că vin',
    text: 'Răspund la telefon, stabilim ziua și intervalul orar, apoi ajung. Dacă intervine ceva, te anunț din timp, nu te las să aștepți.',
  },
  {
    icon: 'Check',
    title: 'Prețul se știe de la început',
    text: 'Îți spun cât costă înainte să încep lucrarea. Nu apar costuri pe parcurs și nu se schimbă suma la final.',
  },
  {
    icon: 'Sparkle',
    title: 'Curățenie la final',
    text: 'Acopăr mobila și pardoseala înainte să încep, așa că nu rămâne praf sau moloz prin casă. Când plec, camera arată ca înainte de lucrare.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Lucrez ca la mine acasă',
    text: 'Opresc curentul înainte să încep, verific totul la final și montez temeinic, ca să nu mai fie nevoie să revii asupra lucrării.',
  },
]

/* -------------------------------------------------------------------------- */
/*  Despre mine                                                               */
/* -------------------------------------------------------------------------- */

/*  ⚠️  TEXT PROVIZORIU — de înlocuit cu povestea reală a lui Cristian.
 *      Structura rămâne aceeași, se schimbă doar cuvintele.
 */
export const aboutParagraphs = [
  'Mă numesc Cristian Gilca și lucrez de ani buni la instalații electrice și la lucrările mărunte care se adună prin case și apartamente, în Timișoara și în localitățile din jur.',
  'Cele mai multe lucrări îmi vin din recomandări. Pentru mine ăsta e semnul că am făcut treaba bine: omul la care am fost mă cheamă înapoi și dă numărul meu mai departe.',
  'Lucrez pe cont propriu. Nu trimit pe altcineva în locul meu, nu las lucrarea la jumătate și nu plec până nu văd că totul merge.',
]

/**
 * Cifrele afișate în „Despre mine".
 *
 * Lista e goală intenționat: cifrele inventate despre o firmă sunt o practică
 * comercială înșelătoare, la fel ca recenziile false. Când ai numerele reale,
 * decomentează rândurile de mai jos și secțiunea apare singură.
 */
export const aboutStats = [
  // { value: '10+', label: 'ani de experiență' },
  // { value: '500+', label: 'lucrări finalizate' },
  // { value: '15+', label: 'localități acoperite' },
]

/**
 * Autorizarea ANRE — argument de încredere important în România.
 *
 * Lasă `null` cât timp nu e confirmată: secțiunea pur și simplu nu se afișează,
 * ca să nu apară pe site o afirmație neadevărată.
 *
 * Când o ai, pune de exemplu: { grade: 'IIIB', number: '12345' }
 */
export const anre = null
