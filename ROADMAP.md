# Roadmap — Cristian Gilca · Mentenanță & Asistență Tehnică

> Plan de lucru pe etape, în ordinea raportului **impact / efort**.
> Legendă: 🔴 critic · 🟠 important · 🟢 polish · ⏳ estimare · 🙋 necesită input de la Cristian

---

## Etapa 1 — Navigare, conversie și fundamentele tehnice

*Scopul etapei: omul găsește repede ce caută, poate suna dintr-un gest, iar Google înțelege că ești firmă locală în Timișoara.*

### 1.1 🔴 Meniu de navigare complet — ⏳ ~2h
Meniul actual are doar 3 linkuri, e ascuns complet sub 768px, iar header-ul dispare la scroll.

- [x] Header **sticky** (rămâne sus la scroll, cu fundal blur când pagina e derulată)
- [x] Meniu complet: **Acasă · Servicii · Cum decurge · Despre mine · Întrebări · Contact**
- [x] **Meniu mobil (hamburger)** — panou full-screen, se închide după selecție
- [x] **Scroll-spy**: secțiunea curentă se evidențiază automat în meniu
- [x] Scroll lin cu `scroll-margin-top`, ca titlul să nu intre sub header
- [x] Buton de contact permanent în header, pe toate rezoluțiile
- [x] Navigare completă cu tastatura + `Escape` închide meniul mobil

### 1.2 🔴 Secțiunea „Despre mine" — ⏳ ~1h 🙋
Momentan nu există. E secțiunea unde omul decide dacă are încredere.

- [x] Cine ești, de câți ani lucrezi, ce te-a adus în meseria asta
- [x] Autorizare **ANRE** (dacă o ai — argument major în România)
- [x] Zona reală de deplasare
- [ ] Poză de lucru, nu selfie *(vezi 1.5)*

### 1.3 🔴 Telefonul — de la „text" la „un singur gest" — ⏳ ~1h 🙋
Cea mai mare pierdere de clienți din site. Variante, în ordinea eficienței:
1. Link `tel:` clasic — un tap și sună
2. Buton **„Copiază numărul"** cu confirmare vizuală — păstrează cerința inițială
3. Buton **WhatsApp** cu mesaj precompletat — pentru cei care preferă să scrie

- [x] Decizie asupra variantei — **`tel:` + WhatsApp**
- [x] Implementare în: header, hero, cardul de contact, CTA final, bara mobilă

### 1.4 🔴 SEO local — ⏳ ~1h
Cel mai mare câștig de vizibilitate disponibil, pentru cel mai mic efort.

- [x] **JSON-LD `LocalBusiness` / `Electrician`** — nume, zonă, telefon, servicii, program
- [x] **`og:image`** (1200×630) — fără ea, linkul trimis pe WhatsApp arată gol
- [x] `og:url`, `canonical`, `twitter:card` 🙋 *(necesită domeniul final)*
- [x] `robots.txt` + `sitemap.xml`
- [x] Subtitlu cu cuvinte-cheie sub H1 („Electrician în Timișoara și împrejurimi")

### 1.5 🔴 Fotografia — ⏳ ~30min 🙋
Poza actuală: 517 KB pentru afișare la ~380px, fundal mov artificial care se bate cu paleta site-ului.

- [ ] Poză nouă, la lucru, format portret 4:5
- [x] Conversie WebP + redimensionare → ~35 KB (economie de ~480 KB)
- [x] `width`/`height` explicite (elimină saltul de layout) + `fetchpriority="high"`

### 1.6 🟠 Accesibilitate — ⏳ ~45min
- [x] `text-slate-500` → `slate-400` (contrast 4.23:1 → 7.86:1, sub minimul legal acum)
- [x] Stiluri vizibile de `focus-visible` pe toate elementele interactive
- [x] Link „Sari la conținut"
- [x] `useReducedMotion()` aplicat pe animații (regula CSS actuală nu oprește framer-motion)

### 1.7 🟠 Curățenie în cod — ⏳ ~30min
- [x] `services.map()` în loc de `services[0..2]` hardcodat — acum al 4-lea serviciu adăugat nu apare
- [x] README sincronizat (documentează `AREA_TEXT`, o constantă care nu există)
- [x] Eliminat `overflow-x: hidden` duplicat de pe div-ul rădăcină
- [ ] Eliminat și cel de pe `body` — rămâne ca plasă de siguranță până la o verificare în browser real

---

## Etapa 1.5 — Pagini separate (gata)

*Site-ul a trecut de la o singură pagină cu scroll la pagini reale, cu URL propriu.*

- [x] Rutare cu `react-router-dom`: `/`, `/servicii`, `/cum-decurge`, `/despre-mine`, `/contact`
- [x] Pagină **404** cu toate linkurile site-ului
- [x] Meniul evidențiază pagina curentă (`NavLink`), pe desktop și pe mobil
- [x] Scroll la începutul paginii la fiecare navigare
- [x] Titlu și descriere **diferite pe fiecare pagină** (altfel toate apar la fel în Google și în taburi)
- [x] `vercel.json` cu rewrite SPA — fără el, un refresh pe `/servicii` dă 404
- [x] `sitemap.xml` cu toate rutele
- [x] Subsol cu navigare completă și date de contact
- [ ] 🟠 Meta `og:*` per pagină — acum sunt aceleași pe tot site-ul, pentru că sunt în `index.html`.
      Se rezolvă odată cu prerender-ul static din Etapa 3.

---

## Etapa 2 — Conținutul care vinde

*Designul e deja rezolvat. Aici se câștigă încrederea. Etapa asta depinde aproape integral de materiale de la Cristian.*

### 2.1 🔴 Galerie „Lucrări făcute" — ⏳ ~2h 🙋
- [ ] 6–9 poze reale, ideal perechi **înainte / după**
- [ ] Grilă cu lightbox, imagini lazy-loaded și optimizate
- [ ] O propoziție de context la fiecare lucrare

### 2.2 🔴 Recenzii — **amânată** (scoasă din site la cererea clientului)
- [ ] De reluat când există recenzii reale de la clienți 🙋
- [ ] Varianta recomandată: **Google Business Profile** — recenziile apar direct în Maps și în căutare

### 2.3 🟠 Prețuri orientative — ⏳ ~1h 🙋
Site-ul promite deja *„Prețul se știe de la început"*, dar nu afișează niciun preț.
- [ ] Tabel „de la X lei" pentru lucrările frecvente
- [ ] Mențiune clară despre deplasare și cum se calculează

### 2.4 🟠 Localități deservite — ⏳ ~30min 🙋
- [ ] Listă explicită: Timișoara, Dumbrăvița, Giroc, Chișoda, Ghiroda, Moșnița, Săcălaz, Sânmihaiu Român…
- [ ] SEO local pur — fiecare localitate e o căutare în plus pe care o prinzi

### 2.5 🟠 Întrebări frecvente — ⏳ ~1h
- [ ] 5–6 întrebări reale (cât durează, lucrezi în weekend, dai garanție, vii cu materiale)
- [ ] JSON-LD `FAQPage` → răspunsurile pot apărea direct în Google

### 2.6 🟢 Program de lucru — ⏳ ~20min 🙋
- [ ] Orar afișat + politica pentru urgențe

---

## Etapa 3 — Performanță și rafinare

- [ ] 🟠 **Fonturi self-hosted** (`@fontsource`) — elimină 200–400ms de blocare *și* problema GDPR cu Google Fonts — ⏳ ~30min
- [ ] 🟠 **Eliminare framer-motion** în favoarea CSS + IntersectionObserver — bundle-ul scade de la 91 KB la ~45 KB gzip — ⏳ ~2h
- [ ] 🟢 Prerender static al paginii (HTML complet pentru crawlere, nu doar `<div id="root">`) — ⏳ ~45min
- [ ] 🟠 `npm audit`: esbuild <=0.24.2 (moderate, afectează doar serverul de dev) — se rezolvă cu upgrade la Vite 6, care e breaking
- [ ] 🟢 Audit final Lighthouse — țintă 95+ pe toate cele 4 categorii — ⏳ ~30min

---

## Etapa 4 — Lansare și creștere

- [ ] 🔴 **Google Business Profile** — pentru un meseriaș local aduce mai mult trafic decât site-ul în sine 🙋
- [ ] 🟠 Git + deploy pe Vercel + **domeniu propriu** 🙋
- [ ] 🟠 **Analytics** respectuos (Plausible / Umami) — altfel nu știi câți intră și câți sună — ⏳ ~30min
- [ ] 🟢 Politică de confidențialitate + mențiune ANPC / SOL — ⏳ ~30min
- [ ] 🟢 Verificare în Google Search Console + trimitere sitemap

---

## Ce am nevoie de la Cristian (blocante 🙋)

| # | Ce | Pentru |
|---|---|---|
| 1 | Decizia despre telefon (`tel:` / copiere / WhatsApp) | 1.3 |
| 2 | Poză la lucru, portret | 1.5, 1.2 |
| 3 | Text „despre mine" + ani de experiență + autorizare ANRE | 1.2 |
| 4 | 6–9 poze cu lucrări făcute | 2.1 |
| 6 | Prețuri orientative | 2.3 |
| 7 | Lista de localități + program de lucru | 2.4, 2.6 |
| 8 | Domeniul final | 1.4, 4 |

**Nimic din Etapa 1 nu e blocat în întregime** — se poate începe imediat, iar elementele 🙋 se completează pe parcurs.
