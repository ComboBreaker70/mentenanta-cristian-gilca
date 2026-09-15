/**
 * Optimizează imaginile din `assets-src/` și le scrie în `public/`.
 *
 *   npm run images
 *
 * Sursele rămân neatinse, deci scriptul se poate rula oricând din nou.
 */
import { existsSync } from 'node:fs'
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-src'
const OUT = 'public'

/* Portret 4:5 — raportul ramei din Hero. Înălțimea maximă acoperă ecranele 2x;
   o sursă mai mică nu se mărește, ca să nu iasă neclară. */
const PROFILE = { file: 'cristian_gilca_2.png', maxHeight: 950, ratio: 4 / 5, quality: 84 }

/* Galeria de lucrări (Etapa 2): pune pozele în assets-src/lucrari/ */
const GALLERY = { width: 1200, height: 900, quality: 78 }
const THUMB = { width: 640, height: 480, quality: 72 }

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function report(label, from, to) {
  const a = (await stat(from)).size
  const b = (await stat(to)).size
  const saved = (((a - b) / a) * 100).toFixed(0)
  console.log(`  ${label.padEnd(34)} ${kb(a).padStart(8)} → ${kb(b).padStart(8)}  (−${saved}%)`)
}

async function profile() {
  const src = path.join(SRC, PROFILE.file)
  if (!existsSync(src)) return console.log('  (fără poză de profil în assets-src/)')

  const meta = await sharp(src).metadata()
  const height = Math.min(PROFILE.maxHeight, meta.height, Math.floor(meta.width / PROFILE.ratio))
  const width = Math.round(height * PROFILE.ratio)

  const out = path.join(OUT, 'cristian-gilca.webp')
  await sharp(src)
    /* `attention` centrează decupajul pe zona cu cel mai mult contrast — fața. */
    .resize(width, height, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: PROFILE.quality, effort: 6 })
    .toFile(out)

  await report(`cristian-gilca.webp (${width}×${height})`, src, out)
}

async function gallery() {
  const dir = path.join(SRC, 'lucrari')
  if (!existsSync(dir)) return

  const outDir = path.join(OUT, 'lucrari')
  await mkdir(outDir, { recursive: true })

  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  if (!files.length) return

  console.log(`\n  Lucrări (${files.length}):`)
  for (const file of files) {
    const base = path.parse(file).name
    const src = path.join(dir, file)

    const full = path.join(outDir, `${base}.webp`)
    await sharp(src).resize(GALLERY.width, GALLERY.height, { fit: 'cover' }).webp({ quality: GALLERY.quality }).toFile(full)

    const thumb = path.join(outDir, `${base}-thumb.webp`)
    await sharp(src).resize(THUMB.width, THUMB.height, { fit: 'cover' }).webp({ quality: THUMB.quality }).toFile(thumb)

    await report(`lucrari/${base}.webp`, src, full)
  }
}

console.log('\nOptimizare imagini\n')
await profile()
await gallery()
console.log('\nGata.\n')
