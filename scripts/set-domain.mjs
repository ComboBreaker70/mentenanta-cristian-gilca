/**
 * Schimbă domeniul site-ului peste tot, dintr-o singură comandă.
 *
 *   npm run domain -- https://exemplu.ro
 *
 * Domeniul apare în `index.html` (canonical, og:url, og:image, twitter:image,
 * JSON-LD), în `public/robots.txt` și în `public/sitemap.xml`. Fiind în fișiere
 * statice, nu poate fi citit dintr-o constantă — de aceea scriptul ăsta.
 *
 * Rulează-l din nou oricând se schimbă domeniul; e idempotent.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILES = ['index.html', 'public/robots.txt', 'public/sitemap.xml']

/* Orice domeniu deja prezent e înlocuit, deci scriptul se poate rula de câte ori e nevoie. */
const ANY_DOMAIN = /https:\/\/[a-z0-9.-]+\.[a-z]{2,}/gi

const raw = process.argv[2]

if (!raw) {
  console.error('\nLipsește domeniul.\n\n  npm run domain -- https://exemplu.ro\n')
  process.exit(1)
}

let domain
try {
  const url = new URL(raw)
  if (url.protocol !== 'https:') throw new Error('folosește https://')
  domain = `https://${url.host}`
} catch (error) {
  console.error(`\nDomeniu invalid: ${raw}\n  ${error.message}\n`)
  process.exit(1)
}

console.log(`\nSetez domeniul: ${domain}\n`)

for (const file of FILES) {
  const before = readFileSync(file, 'utf8')

  const found = new Set(before.match(ANY_DOMAIN) ?? [])
  /* Fonturile Google și schema.org nu au legătură cu domeniul site-ului. */
  const skip = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://schema.org']
  const targets = [...found].filter((d) => !skip.includes(d))

  let after = before
  for (const target of targets) {
    after = after.split(target).join(domain)
  }

  if (after === before) {
    console.log(`  ${file.padEnd(20)} nimic de schimbat`)
    continue
  }

  writeFileSync(file, after)
  console.log(`  ${file.padEnd(20)} ${targets.join(', ')} → ${domain}`)
}

console.log('\nGata. Nu uita de `npm run build` și de commit.\n')
