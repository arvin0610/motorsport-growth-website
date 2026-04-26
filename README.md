# Motorsport Growth — Website v2

A flagship marketing site for Motorsport Growth — a performance marketing agency for the motorsport, automotive, and enthusiast aftermarket industries. Black is dominant. White is the workhorse. Red is the scalpel.

> Built like a race car: every part is there for a reason, nothing is decorative, and it has to be fast.

---

## Stack

| Concern        | Choice |
| -------------- | --- |
| Framework      | Next.js 15 (App Router, RSC, TypeScript strict) |
| Styling        | Tailwind v4 + CSS variables, **no default colors** |
| Motion (macro) | GSAP + ScrollTrigger (lazy where used) |
| Motion (micro) | `motion/react` (formerly Framer Motion) |
| Smooth scroll  | `@studio-freight/lenis` |
| Forms          | React Hook Form + Zod, `/api/lead` POST |
| Icons          | lucide-react (1.4 stroke weight, mechanical) |
| Fonts          | Self-hosted via `next/font/local` (no Google API) |
| Hosting        | Vercel |

---

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run typecheck
npm run start        # production server (after build)
```

For Lighthouse:
```bash
npm run build
npm run start &
npx lighthouse http://localhost:3000 \
  --output=json --output-path=docs/lighthouse.json \
  --preset=desktop --quiet --chrome-flags="--headless=new"
```

---

## Brand tokens

Defined in [`app/globals.css`](app/globals.css) inside `@theme { ... }`:

```css
--mg-black:   #121212;   /* dominant background */
--mg-white:   #f6f6f6;   /* primary text & UI */
--mg-red:     #e11010;   /* SCALPEL — accent only, max 1 element/viewport */
--mg-ink-90:  #1a1a1a;   /* surface elevation */
--mg-ink-80:  #232323;   /* card / border (rare) */
--mg-ink-60:  #3a3a3a;   /* HAIRLINES (the only separator) */
--mg-bone:    #e5e5e3;   /* secondary text — AAA contrast on black */
--mg-ash:     #8a8a8a;   /* tertiary / labels */
```

Easings (the only ones used):

```css
--ease-mg:     cubic-bezier(0.6, 0.05, -0.01, 0.9);   /* type wipes */
--ease-mg-out: cubic-bezier(0.22, 1, 0.36, 1);        /* hover hairlines */
--ease-mg-in:  cubic-bezier(0.6, 0, 0.78, 0);         /* exits */
```

---

## Fonts

The brief specifies licensed faces (PP Neue Machina, Söhne, GT America, Migra, PP Editorial New). The site ships with self-hosted **OFL-licensed equivalents** loaded via `next/font/local` (NOT Google's API) from packages bundled in `node_modules`:

| Role       | Shipped (OFL)        | Loaded via                                                  |
| ---------- | -------------------- | ----------------------------------------------------------- |
| Display    | **Bebas Neue**       | `next/font/local` ← `node_modules/@fontsource/bebas-neue/`  |
| Body       | **Geist Sans**       | `next/font/local` ← `node_modules/geist/`                   |
| Editorial  | **Instrument Serif** | `next/font/local` ← `node_modules/@fontsource/instrument-serif/` |
| Mono       | **JetBrains Mono**   | `next/font/local` ← `node_modules/@fontsource/jetbrains-mono/` |

Bebas Neue is the explicit fallback the brief endorses ("If unavailable, fall back to Bebas Neue Pro for display"). The other three were not in the banlist (which excludes Inter, Poppins, Roboto, Montserrat, Open Sans).

### Swapping in PP Neue Machina / Söhne / Migra

1. Drop `.woff2` files into `public/fonts/` — see [`public/fonts/README.md`](public/fonts/README.md) for filenames.
2. Edit [`app/fonts.ts`](app/fonts.ts): change the `path:` fields from `node_modules/@fontsource/...` to `../public/fonts/...`.
3. Keep the `variable:` names intact (`--font-mg-display` etc.) — the rest of the codebase references them through CSS vars.

That's it. No CSS edits.

---

## Architecture

```
app/
  layout.tsx             — Fonts, JSON-LD (Organization + Service), Preloader,
                           Cursor, Lenis, Nav, PageTransition, Footer
  globals.css            — Tokens + hairlines + clip-path reveal + marquee
  fonts.ts               — Self-hosted next/font/local imports
  page.tsx               — Homepage
  services/page.tsx
  work/page.tsx
  work/[slug]/page.tsx   — generateStaticParams, OG per case
  about/page.tsx
  contact/page.tsx
  api/lead/route.ts      — POST, Zod-validated, Resend/HubSpot-ready
  sitemap.ts robots.ts
  not-found.tsx
components/
  preloader.tsx          — 1.2s, hairline draw + mono types + 3·2·1·GO
  nav.tsx                — Transparent over hero, solid past 80px, mobile overlay
  hero.tsx               — 45/55, race-underline-as-SVG, metadata strip
  client-marquee.tsx     — Dual-row counter-rotating, paused on hover
  who.tsx                — Sticky +412% stat, [ORIGIN]/[APPROACH]/[EDGE] paragraphs
  services-index.tsx     — 5-row accordion-table, red bar slide, image preview
  work-reel.tsx          — Full-viewport blocks, scale 1.05→1.0, pinned overlay
  process-timeline.tsx   — Horizontal timeline (desktop) / vertical (mobile)
  voices.tsx             — Single editorial pull-quote, prev/next, no auto-advance
  contact-block.tsx      — Oversized type + 6-col metadata + form
  contact-form.tsx       — RHF + Zod, hairline fields, floating mono labels
  footer.tsx             — Giant wordmark, HORSEPOWER → PIPELINE, three rows
  page-transition.tsx    — Single red bar wipe (100ms enter / 200ms hold / 100ms exit)
  lenis-provider.tsx     — Smooth scroll, killed on prefers-reduced-motion
  live-clock.tsx         — Pacific time, ticks every second
  counter.tsx            — 0 → target on first viewport entry, never re-triggers
lib/
  cursor.tsx             — 8px white dot, mix-blend-difference, text labels via data-cursor
  motion.ts              — easeMg / easeMgOut / easeMgIn + variants + cubicEaseMg
  use-reduced-motion.ts  — Live MQL watcher
  cn.ts clients.ts case-studies.ts services.ts
public/
  assets/hero/           — Tight crops (Z06 quarter-panel, no parking-lot wide shots)
  assets/work/<slug>/    — Case study imagery
  assets/process/        — Garage / paddock atmospherics
  assets/og/             — OpenGraph defaults
  clients/               — Client logos (kebab-case, monochrome on render)
  logos/                 — MG mark
  fonts/                 — Drop-in for PP Neue Machina / Söhne / etc
docs/
  lighthouse.json        — Placeholder, populated by `npx lighthouse ...`
```

---

## Hard rules — DO / DON'T

### DO

- Use **hairlines** (`hairline-t`, `hairline-b`) as the only separator
- Use **clip-path wipes** for type reveals (`reveal-wipe`, `wipeLR` variant in `lib/motion.ts`)
- Use **mono caps** for indices, ticker readouts, captions, button labels
- Use the **editorial italic** for one specific role per section (pull-quotes, oversized italic words like *race*, *programs*, *move?*)
- Use **red as a scalpel** — one element per viewport: a number, an arrow, an underline, a state indicator
- Always honour `prefers-reduced-motion`

### DON'T

- ❌ No `box-shadow` blur halos / glows / neon / auras
- ❌ No `linear-gradient` / `radial-gradient` in `bg-*` contexts. Run `grep -r "gradient" app/ components/ lib/` — there should be no gradient backgrounds.
- ❌ No Inter, Poppins, Roboto, Montserrat, Open Sans
- ❌ No 3-card "Our Services" grid (we ship the 5-row accordion-table instead)
- ❌ No fade-up-on-scroll (we ship clip-path wipes instead)
- ❌ No "Learn More" copy
- ❌ No rounded corners larger than 2px on UI

---

## Motion vocabulary

| Pattern              | Where                                  | Spec                                   |
| -------------------- | -------------------------------------- | -------------------------------------- |
| Type wipe            | All headlines                          | `clip-path inset(0 100% 0 0) → 0%`, 600ms, `--ease-mg` |
| Image reveal         | Case study heroes, plates              | `clip-path inset(100% 0 0 0) → 0`, 900ms, `--ease-mg`  |
| Hairline draw        | Link underlines, button arrows         | `scaleX 0 → 1`, 240ms, `--ease-mg-out` |
| Counter              | KPI numerals                           | 0 → target, 1.2s once, `cubicEaseMg`   |
| Marquee              | Client logos                           | 40s linear, paused on hover, dual-row counter-rotating |
| Page transition      | Route changes                          | Red bar wipe — 100ms in / 200ms hold / 100ms out |
| Cursor               | All interactive elements (fine pointer) | 8px → 56px disc with mono label via `data-cursor` |

To set a custom cursor label on any element:
```tsx
<button data-cursor="DRAG">…</button>
```

---

## Accessibility

- AAA contrast on body (`#e5e5e3` on `#121212` ≈ 13.7:1) — checked
- AA contrast on tertiary labels (`#8a8a8a` on `#121212` ≈ 5:1) — used at 11–12px only
- Focus rings always visible (red on links/buttons, white elsewhere)
- `prefers-reduced-motion` kills marquee, kinetic clip-path reveals, page wipe, custom cursor, and the preloader
- Mobile menu locks body scroll while open and is dismissable with `Esc` (TODO: keyboard event handler — easy add)
- Form fields use real `<label>` elements (positioned absolutely, but semantic)
- All marquee duplicate-track items carry `aria-hidden`

---

## What's deferred

- `/api/lead` validates and returns `200`, but currently `console.log`s. Wire it to **Resend** / **Postmark** / **HubSpot** before launch. The Zod schema is in [`app/api/lead/route.ts`](app/api/lead/route.ts).
- The hero **weather chip** shows a static `CloudFog 18°C`. Wire to a free weather API (e.g. open-meteo.com — no key required) if you want it live.
- `docs/lighthouse.json` is a placeholder — re-run after each significant change.
- OG images currently use a single default. Generate per-route OG images with `next/og` at `app/(...)/[route]/opengraph-image.tsx` if SEO matters for share cards.

---

## Voice

Operator-grade language. Short sentences. Race-paddock vocabulary used accurately, never coyly. Every CTA is a verb-led command.

✅ "We turn horsepower into pipeline."
✅ "Built by people who knew the lap times before they knew the CPMs."
✅ "Performance marketing for performance brands."

❌ "Unlock your brand's potential"
❌ "Cutting-edge tactics"
❌ "Synergy" / "leverage" / "passionate" / "dedicated"

---

— v2.0 / built for the paddock.
