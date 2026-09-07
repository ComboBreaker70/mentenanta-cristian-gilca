/**
 * Generează `public/og-image.jpg` (1200×630) — imaginea care apare
 * când linkul e trimis pe WhatsApp, Facebook sau iMessage.
 *
 *   npm run og
 */
import { Buffer } from 'node:buffer'
import sharp from 'sharp'

const W = 1200
const H = 630

const OWNER = 'Cristian Gilca'
const PHONE = '0725 715 596'
const TAGLINE = 'Instalații electrice · Iluminat · Reparații'
const AREA = 'Timișoara și împrejurimi'

const FONT = 'Segoe UI, Trebuchet MS, DejaVu Sans, Arial, sans-serif'

/* Fotografia, decupată circular printr-o mască alfa. */
const PHOTO = 340
const mask = Buffer.from(
  `<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`,
)

const photo = await sharp('public/cristian-gilca.webp')
  .resize(PHOTO, PHOTO, { fit: 'cover', position: 'top' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="volt" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#93e9ff"/>
      <stop offset="100%" stop-color="#06a5ec"/>
    </linearGradient>
    <radialGradient id="glowA" cx="12%" cy="8%" r="62%">
      <stop offset="0%" stop-color="#06a5ec" stop-opacity=".38"/>
      <stop offset="100%" stop-color="#06a5ec" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="88%" cy="96%" r="58%">
      <stop offset="0%" stop-color="#f8b83c" stop-opacity=".16"/>
      <stop offset="100%" stop-color="#f8b83c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#94beff" stroke-opacity=".07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#04070f"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>

  <!-- Zona ariei deservite -->
  <rect x="72" y="86" width="330" height="46" rx="23" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".12"/>
  <circle cx="99" cy="109" r="5" fill="#54d8ff"/>
  <text x="118" y="116" font-family="${FONT}" font-size="20" fill="#cbd5e1">${AREA}</text>

  <!-- Nume -->
  <text x="72" y="222" font-family="${FONT}" font-size="72" font-weight="700" fill="#ffffff">${OWNER}</text>

  <!-- Servicii -->
  <text x="72" y="280" font-family="${FONT}" font-size="30" fill="#93e9ff">${TAGLINE}</text>

  <!-- Promisiune -->
  <text x="72" y="342" font-family="${FONT}" font-size="24" fill="#94a3b8">Ajung la ora stabilită, iar la final locuința rămâne curată.</text>

  <!-- Telefon -->
  <rect x="72" y="404" width="436" height="104" rx="26" fill="#ffffff" fill-opacity=".05" stroke="#54d8ff" stroke-opacity=".32"/>
  <rect x="100" y="432" width="48" height="48" rx="15" fill="url(#volt)"/>
  <path d="M117 445c-1 0-2 1-2 2 0 9 7 16 16 16 1 0 2-1 2-2v-5c0-1-1-2-2-2l-4 1-4-5 1-4c0-1-1-2-2-2h-5z" fill="#04070f"/>
  <text x="168" y="452" font-family="${FONT}" font-size="17" fill="#94a3b8">Sună-mă</text>
  <text x="168" y="490" font-family="${FONT}" font-size="40" font-weight="700" fill="#ffffff">${PHONE}</text>

  <!-- Halou + inel în spatele fotografiei -->
  <circle cx="930" cy="315" r="205" fill="#06a5ec" fill-opacity=".14"/>
  <circle cx="930" cy="315" r="${PHOTO / 2 + 12}" fill="none" stroke="url(#volt)" stroke-opacity=".55" stroke-width="3"/>
</svg>`)

await sharp(background)
  .composite([{ input: photo, left: Math.round(930 - PHOTO / 2), top: Math.round(315 - PHOTO / 2) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-image.jpg')

console.log('public/og-image.jpg — 1200×630 generat.')
