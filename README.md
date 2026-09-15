# Cristian Gilca — Mentenanță & Asistență Tehnică Casnică

Landing page pentru servicii de instalații electrice, corpuri de iluminat și reparații în casă, în
**Timișoara și împrejurimi**.

Stack: **React 18 + Vite 5**, **React Router 7**, **Tailwind CSS 3**, **Framer Motion**,
**lucide-react**, **sharp** (optimizarea imaginilor, doar la build).

## Paginile site-ului

| Rută | Conținut |
| --- | --- |
| `/` | Hero + rezumate scurte ale serviciilor și pașilor |
| `/servicii` | Serviciile în detaliu |
| `/cum-decurge` | Cei trei pași ai unei lucrări |
| `/despre-mine` | Despre Cristian, fotografie, „de ce eu” |
| `/contact` | Telefon, WhatsApp, localități, program |
| orice altceva | Pagina 404 |

Fiecare pagină are titlu și descriere proprii. **`vercel.json` e obligatoriu la deploy** —
fără rewrite-ul de acolo, un refresh direct pe `/servicii` întoarce 404.

Planul de lucru pe etape e în [`ROADMAP.md`](ROADMAP.md).

---

## Rulare locală

```bash
npm install     # instalează dependențele
npm run dev     # server de dezvoltare -> http://localhost:5173
npm run build   # build de producție în /dist
npm run preview # verifică build-ul de producție local
npm run assets  # regenerează pozele optimizate + imaginea de preview
npm run domain -- https://exemplu.ro   # schimbă domeniul peste tot
```

Node.js 18+ recomandat.

---

## Structura proiectului

```
├── index.html                 # meta SEO/OG, date structurate JSON-LD, fonturi
├── vercel.json                # rewrite SPA — OBLIGATORIU pentru rutele paginilor
├── tailwind.config.js         # design system: culori, fonturi, umbre, animații
├── ROADMAP.md                 # planul de lucru pe etape
├── assets-src/                # imaginile SURSĂ, la rezoluție mare (nu se publică)
│   └── cristian_gilca_2.png
├── scripts/
│   ├── optimize-images.mjs    # assets-src/ -> public/, WebP redimensionat
│   ├── generate-og.mjs        # generează public/og-image.jpg (1200×630)
│   └── set-domain.mjs         # schimbă domeniul în index.html, robots.txt, sitemap.xml
├── public/                    # ce ajunge ca atare pe site
│   ├── cristian-gilca.webp    # poza optimizată (generată)
│   ├── og-image.jpg           # preview pentru WhatsApp / Facebook (generat)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── data.js                # TOT conținutul editabil, într-un singur loc
    ├── App.jsx                # rutele site-ului
    ├── Layout.jsx             # header, meniu, subsol, bara mobilă
    ├── sections.jsx           # secțiunile refolosite între pagini
    ├── components.jsx         # butoane, fotografie, iconițe
    ├── hooks.js               # header la scroll, blocare scroll, meta per pagină
    ├── pages/                 # câte un fișier per pagină
    │   ├── Home.jsx
    │   ├── Servicii.jsx
    │   ├── CumDecurge.jsx
    │   ├── DespreMine.jsx
    │   ├── Contact.jsx
    │   └── NotFound.jsx
    ├── index.css              # clase de design: glass, grid-mask, focus
    └── main.jsx
```

---

## Ce se editează și unde

**Tot conținutul e în [`src/data.js`](src/data.js).** Nu e nevoie să umbli prin JSX.

| Constantă / listă | Rol |
| --- | --- |
| `OWNER`, `AREA` | numele și zona de acoperire |
| `PHONE` | numărul **afișat** pe ecran |
| `PHONE_TEL` | forma pentru `tel:` — internațională, fără spații |
| `PHONE_WHATSAPP` | forma pentru wa.me — fără `+` și fără spații |
| `WHATSAPP_TEXT` | mesajul precompletat la deschiderea WhatsApp |
| `navLinks` | **elementele din meniu** — o linie adăugată aici apare peste tot |
| `services` | cardurile din grila de servicii (`wide: true` ocupă 7/12 coloane) |
| `workSteps` | pașii din „Cum decurge" |
| `advantages` | cardurile din „De ce eu" |
| `aboutParagraphs` | textul din „Despre mine" |
| `aboutStats` | cifrele afișate lângă „Despre mine" |
| `anre` | autorizarea ANRE — vezi mai jos |

### Adăugarea unei pagini noi

1. Creează `src/pages/Preturi.jsx` (copiază `Servicii.jsx` ca model)
2. Adaugă ruta în `src/App.jsx`: `<Route path="preturi" element={<Preturi />} />`
3. Adaugă intrarea în `navLinks` din `data.js`: `{ label: 'Prețuri', to: '/preturi' }`
4. Adaugă ruta în `public/sitemap.xml`

Meniul de desktop, meniul mobil, subsolul și evidențierea paginii curente se actualizează
singure din `navLinks`.

### Fotografia de profil

1. Pune poza în `assets-src/`
2. Trece numele fișierului în `PROFILE.file` din `scripts/optimize-images.mjs`
3. Rulează `npm run assets`

Scriptul o decupează la 4:5 și o convertește în WebP, apoi regenerează imaginea de preview
(`og-image.jpg`). O poză mai mică de 760×950 nu se mărește, ca să nu iasă neclară, deci
dimensiunile rezultate depind de sursă. Dacă se schimbă, actualizează și `PROFILE_PHOTO_SIZE`
din `data.js` (scriptul le afișează la final). Dacă fișierul lipsește, rama afișează un
placeholder, deci pagina nu se strică.

### Autorizarea ANRE

În `data.js`, `anre` e `null`, iar secțiunea **nu se afișează deloc**, ca să nu apară pe site o
afirmație neconfirmată. Când autorizarea e confirmată:

```js
export const anre = { grade: 'IIIB' }
```

---

## Contact

Numărul de telefon e **link `tel:`** peste tot (header, hero, carduri, footer, bara mobilă),
plus buton **WhatsApp** cu mesaj precompletat. Toate URL-urile se construiesc din constantele
din `data.js` — numărul se schimbă într-un singur loc.

---

## Înainte de lansare

- [x] Domeniul e setat (`https://mentenanta-cristian-gilca.vercel.app`). Dacă iei unul propriu:
      `npm run domain -- https://domeniul-nou.ro`, apoi commit — atât.
- [ ] Înlocuiește textul provizoriu din `aboutParagraphs`
- [ ] Completează `aboutStats` cu cifre reale (acum lista e goală, deci secțiunea nu apare)
- [ ] Confirmă sau șterge `anre`
- [ ] Completează programul de lucru în JSON-LD (`openingHoursSpecification`)
- [x] Poză nouă de profil (`cristian_gilca_2.png`). Are doar 485×485 px, deci o variantă la rezoluție mai mare ar ieși mai clară pe ecranele retina

---

## Publicare pe GitHub

```bash
git init
git add .
git commit -m "Landing page mentenanță & asistență tehnică"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## Deploy pe Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importă repo-ul.
2. Vercel detectează automat Vite:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Deploy**. Domeniul propriu se adaugă din **Settings → Domains**.

Alternativ, din terminal:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # producție
```
