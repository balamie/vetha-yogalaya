# Vetha Yogalaya — Audit Report & Fix Changelog

**Site:** Vetha Yogalaya — Kids Yoga Studio in OMR, Chennai (Vite / React 19 / Tailwind 4 / GSAP / Lenis / Framer Motion)
**Repo:** `github.com/balamie/vetha-yogalaya` · branch `main`
**Production target:** `https://vethayogalaya.in` (Cloudflare Pages)
**Preview host:** `https://vetha-yogalaya.pages.dev`
**Report date:** 14 August 2026
**Audit method:** source review (`src/`, `public/`, `dist/`) + local lint/build + live HTTP inspection

---

## Executive Summary

The site is technically sound: fully componentised, route-split, webp-compressed, security-hardened
via `_headers`, with Formspree integration and complete SEO/social meta. The animation performance
batch (GSAP reveals, hero/about video compression, lazy media) and the storage batch (JPEG→WebP,
posters, icons, manifest) are **implemented and committed** but **not yet deployed to production**.

**Two deployment items block "live" status:**

1. **Deployment of commit `0104ab5` is unconfirmed** — `vetha-yogalaya.pages.dev` still serves the
   previous build (`index-C5sVbhrE.js`); the new build (`index-DJ6czRYo.js`) is only in `dist/`.
   The push succeeded (`4d4665a..0104ab5 main -> main`); the Cloudflare Pages Git build either has not
   run yet, failed, or needs a manual trigger on the dashboard.
2. **`vethayogalaya.in` is not pointed at Cloudflare Pages** — it still serves the legacy GoDaddy /
   WebsiteBuilder site. DNS must be repointed (CNAME to `vetha-yogalaya.pages.dev`, or Cloudflare
   proxy on the name servers) before the custom domain can serve this build.

Severity legend: **High** = blocks launch/live · **Medium** = fix in first revision · **Low** = polish.

---

## Scope of this audit

Hats covered: **Security Reviewer**, **Storage / Asset Engineer**, **Quality / QA (build + deploy)**,
**Motion / Performance**, **Mobile & Tablet**. The animation batch (Hat: Motion/Performance) was reviewed
and shipped in the same commit; the mobile batch (Hat 10) shipped in a follow-up edit (pending commit).

---

## Security Reviewer

| # | Finding | Evidence | Severity |
|---|---------|----------|----------|
| SEC-1 | **Security headers present and strong.** CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, and `Permissions-Policy` (camera/mic/geolocation/interest-cohort disabled). | `public/_headers` | ✓ pass |
| SEC-2 | **CSP matches runtime needs.** `connect-src` allows `formspree.io`, Google Analytics, DoubleClick, Facebook — no console-blocked requests. `frame-src` allows Google (Maps). `frame-ancestors 'none'` blocks clickjacking. | `public/_headers:2` | ✓ pass |
| SEC-3 | **Forms submit via `fetch` (XHR), so `form-action 'self'` is correct** — Formspree posts are network requests, not navigations. No external navigation from forms. | `src/lib/forms.ts:15-52` | ✓ pass |
| SEC-4 | **No secrets in bundle or repo.** `.env` (gitignored) holds only the two Formspree endpoints; `.env.example` documents them. No API keys/tokens anywhere in `src/` or `public/`. | `.gitignore`, `.env.example`, grep | ✓ pass |
| SEC-5 | **Preview cannot be indexed.** `scripts/preview-noindex.mjs` + inline `index.html` robots override put `noindex, nofollow` on any `.pages.dev` host. | `scripts/preview-noindex.mjs`, `index.html:15-23` | ✓ pass |
| SEC-6 | **`robots.txt` + `sitemap.xml` exist** and are real files (not SPA-fallback HTML). | `public/robots.txt`, `public/sitemap.xml` | ✓ pass |
| SEC-7 | **Analytics are placeholders only.** GTM + Meta Pixel blocks are commented out in `index.html` with dummy IDs; nothing loads, no tracking runs. CSP already whitelists their domains for later enablement. | `index.html:152-173` | ✓ pass (note: Medium when enabling) |
| SEC-8 | Legal pages exist (`/privacy`, `/terms`) with real content; referenced icons/favicon resolve. | `src/pages/PrivacyPolicy.tsx`, `TermsAndConditions.tsx` | ✓ pass |

**Verdict: no security findings requiring action.**

---

## Storage / Asset Engineer

| # | Finding | Evidence | Severity |
|---|---------|----------|----------|
| STO-1 | **All imagery converted to WebP** — zero `.jpe?g` references remain in `src/`. Mentors, programs, gallery, blog, senior citizens, heroes, achievements, international yoga day all ship WebP. | grep `src/`; `public/**/*.webp` | ✓ pass |
| STO-2 | **Videos compressed + poster-fallback.** Hero: 1280×720 WebM (`hero-video.webm`) with `hero-poster.webp`; About: 1080×1920 WebM (`about/About_Video02.webm`) with `about-poster.webp`. Legacy MP4 kept for fallback. | `public/hero-video.*`, `public/about/About_Video02.*` | ✓ pass |
| STO-3 | **Media load-gated.** About video lazy-mounts via `useInView`; hero video uses poster-first with `preload`. | `src/components/AboutInstructor.tsx`, `HeroSection.tsx` | ✓ pass |
| STO-4 | **Blog images** get explicit `width`/`height` (CLS-safe) and `fetchPriority="high"` for the first card. | `src/components/BlogPost.tsx` | ✓ pass |
| STO-5 | **Icons + manifest complete.** `icon-192.png`, `icon-512.png` (maskable), `site.webmanifest`, `favicon.svg`, `apple-touch-icon`. | `public/`, `public/site.webmanifest` | ✓ pass |
| STO-6 | **Cache policy layered correctly.** `/assets/*` immutable (content-hashed); videos/posters/icons/logo 1-day; section dirs 1-day. SPA fallback on all routes via `_redirects`. | `public/_headers`, `public/_redirects` | ✓ pass |
| STO-7 | **All referenced assets exist.** The 47 media files referenced in `src/` were verified present under `public/`. | file-existence check | ✓ pass |

**Verdict: no storage findings requiring action.**

---

## QA / Quality Engineer (build + deploy)

Local verification (reproducible):

| Check | Expected | Result | Verdict |
|-------|----------|--------|---------|
| `npm run lint` (oxlint) | 0 issues | 0 warnings / 0 errors | ✓ |
| `npm run build` (`tsc -b && vite build && preview-noindex`) | clean | clean; route-split chunks emitted | ✓ |
| Main bundle | hashed, gzip-sized | `index-C-rEc6JQ.js` (658.25 kB / 209.16 kB gzip) | ✓ |
| Route splitting | all non-home routes lazy | `App.tsx:29-34` lazy() for privacy/terms/3 blogs/404 | ✓ |
| `dist/` completeness | `_headers`, `_redirects`, webm/webp/poster/icons/manifest | 67 files present | ✓ |
| Commit pushed | `origin/main` updated | `4d4665a..0104ab5` pushed | ✓ |

Deployment checks (live):

| Check | Expected | Live result | Verdict |
|-------|----------|-------------|---------|
| `vetha-yogalaya.pages.dev/` | new build (`index-C-rEc6JQ.js`) | **still `index-C5sVbhrE.js` (old build)** | ✗ **not deployed** |
| `vethayogalaya.in` | this site | **legacy GoDaddy/WebsiteBuilder site** | ✗ **DNS not repointed** |

| # | Finding | Severity |
|---|---------|----------|
| QA-1 | **Deployment pending / unconfirmed.** `pages.dev` serves the old bundle; the pushed commit's build has not surfaced after ~10 min of polling. Chosen path: manual upload of fresh `dist/` (bundle `index-C-rEc6JQ.js`) to Cloudflare Pages, then verify the preview host. | **High** (process) |
| QA-2 | **Custom domain still legacy.** `vethayogalaya.in` is the old WebsiteBuilder site; `og:image`, canonical, sitemap, JSON-LD all reference the `.in` domain, so it must be repointed before launch. | **High** (process) |

---

## Motion / Performance Reviewer (batch shipped)

| # | Finding | Evidence | Verdict |
|---|---------|----------|---------|
| PERF-1 | **GSAP reveal tuned for the device class** — `y:16`, `stagger:0.012`, `0.4s`, `power2.out`, trigger `top 92%`. Reduced-motion respected (gated on `prefers-reduced-motion`). | `src/components/GsapReveal.tsx` | ✓ |
| PERF-2 | **Navbar scroll-spy constraints honoured** — only five non-nav sections are deferrable; `#programs, #about, #free-session, #gallery, #blog, #testimonials, #faq, #contact` stay eager for the IntersectionObserver. | `src/components/Navbar.tsx`, `App.tsx` | ✓ |
| PERF-3 | Hero text readability: white-on-dark copy over a 16:9 720p WebM — lighter than the prior asset. | `src/components/HeroSection.tsx` | ✓ |
| PERF-4 | Route-split chunks verified; gallery lightbox cleanup included. | `dist/assets/` | ✓ |

---

## Mobile & Tablet Reviewer (Hat 10 — code-level)

Caveat: the audit's auto-browser cannot resize its viewport, so these are **code-level findings only**;
real-device visual verification is still required (see Action list, Low).

| # | Finding | Evidence | Verdict |
|---|---------|----------|---------|
| MOB-1 | **Hero video is poster-only on phones + data-saver.** Below 640px, or with `navigator.connection.saveData`, the hero `<video>` is not rendered — the Hat 9 Ken Burns poster (`.hero-poster-zoom`) fills the block instead. No heavy WebM fetch on mobile data. | `src/components/HeroSection.tsx` | ✓ fixed |
| MOB-2 | **About video honors data-saver.** Still lazy-mounted (`useInView` + `preload="none"` until in view), but on `saveData` it is swapped for the `about-poster.webp` still. | `src/components/AboutInstructor.tsx` | ✓ fixed |
| MOB-3 | **Nav scroll-lock + tap targets.** Mobile menu now locks page scroll while open; links bumped `py-2→py-3` (~44px) and social icons `h-10→h-11` (44px). Hamburger hit area ~48px already. | `src/components/Navbar.tsx` | ✓ fixed |
| MOB-4 | **Program-modal close button** enlarged `h-8→h-10` (40px) for touch. | `src/components/ProgramsSection.tsx` | ✓ fixed |
| MOB-5 | **Google Maps is inert-until-tap.** Iframe keeps `pointer-events:none` behind a "Tap to view map" overlay until tapped — prevents the mobile scroll-capture/touch-trap of embedded maps. | `src/components/ContactSection.tsx` | ✓ fixed |
| MOB-6 | **Floating buttons don't collide.** WhatsApp `h-14` (56px, bottom-right); BackToTop `h-12` (48px) is `hidden md:inline-flex` — no mobile overlap. | `BackToTop.tsx`, `WhatsAppButton.tsx` | ✓ pass |
| MOB-7 | **Program-card challenge bullets** are one-line `text-ellipsis` by design (uniform cards); full detail lives in the modal. Acceptable on mobile. | `src/components/ProgramsSection.tsx:536-542` | ✓ pass (note) |

---

## Master-Prompt Re-Verification (10-item pass, 14 Aug 2026)

| # | Item | Result | Evidence / Notes |
|---|------|--------|------------------|
| 1 | **Mobile videos must not autoplay <768px** | **fixed** | `HeroSection.tsx:13` media query `639px` → `767px` (poster-only/no-autoplay below tablet). Caveat: CF Pages ignores `Range:` requests for static assets (live probe: `Range: bytes=0-100` → HTTP 200, full 923,632-byte body, no `Accept-Ranges`/`Content-Range`/206), so the master prompt's 206 check cannot pass on this host; the poster + `saveData` rule is the mitigation. Impact negligible (hero.webm 0.33MB). |
| 2 | **No contradictory cache headers** | **pass** | `public/_headers`: media `Cache-Control: public, max-age=86400`; `/assets/*` `public, max-age=31536000, immutable`. Live response matches. No `no-cache, no-store` anywhere. |
| 3 | **Hero/footer copy must not concatenate words** | **pass** | `Footer.tsx:73` "lifelong wellness through yoga"; `HeroSection` has no `wellnessthrough`. |
| 4 | **No `.jpg`/`.jpeg`; logo URL identical in nav + footer; lazy images; CLS** | **pass** | All `src/` images WebP/PNG; program cards WebP + `loading="lazy"`; logo `/vetha_Yogalaya_Logo.png` identical at `Navbar.tsx:80` + `Footer.tsx:69`; `BlogPost.tsx:41` has `width/height` + `fetchPriority="high"`. |
| 5 | **Forms: honeypot, maxlength, server-side validation** | **pass** | Contact form + footer newsletter both have honeypot state; `Footer.tsx:48` rejects on filled honeypot; newsletter email `maxLength={254}`; Formspree reCAPTCHA still dashboard-side (Action list). |
| 6 | **GSAP trigger ~15% into viewport, 300-400ms, 8-15px** | **fixed** | `GsapReveal.tsx:32` `top 92%` → `top 85%` (~15% into viewport); `duration: 0.35`, `y: 12`, `power2.out`, `once: true`, `prefers-reduced-motion` respected. |
| 7 | **Every image has `alt`** | **pass** | 14 `<img>` in `src/`; all carry meaningful `alt` or `alt=""` (decorative: hero poster, senior-citizen lightbox thumb). All photo grids + program cards `loading="lazy"`. |
| 8 | **CTAs: pick one trial label + reuse; wire all buttons** | **fixed** | Unified to **"Book a Free Trial Class"** (Navbar desktop+mobile, Hero, FreeSession, MentorSection). "Enquire Now" / "Enquire for Senior Programs" untouched. "View Details" → program modal (wired). Hours corrected: `ContactSection.tsx:25` `8:30 AM – 5:00 PM` → `8:00 AM – 8:00 PM`. |
| 9 | **Route-level code splitting** | **pass** | `App.tsx` `React.lazy` + `Suspense` for Privacy, Terms, all 3 blog posts, 404; build emits separate chunks. Main bundle 658.29 kB (209.17 kB gzip). |
| 10 | **Security headers** | **pass** | `_headers`: CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, `Permissions-Policy`; verified live on `vetha-yogalaya.pages.dev`. |

---

## Fix Changelog

Running log of fixes landed since the audit began. Add rows here when work ships (per Hat 8 housekeeping).

| Date | Commit | What shipped |
|------|--------|--------------|
| 14 Aug 2026 | *(uncommitted)* | master-prompt pass: hero video no-autoplay <768px (was 640px), GsapReveal trigger `top 85%` (~15% into viewport), unified CTA "Book a Free Trial Class" (5 buttons), studio hours `8:00 AM – 8:00 PM`, alt/lazy/logo/honeypot/headers/code-split verified |
| 14 Aug 2026 | *(uncommitted)* | perf(mobile): hero video poster-only <640px + `saveData`, about video `saveData` still, nav scroll-lock, nav link/social tap targets →44px, modal close 40px, map inert-until-tap overlay |
| 14 Aug 2026 | `0104ab5` | perf: webp assets, compressed hero (720p) + about (1080×1920) videos + posters, GsapReveal timing, blog CLS/priority, icon manifest, layered cache headers, gallery cleanup |
| earlier | `4d4665a` | fix `_headers` (one rule block per path); remove empty Leads dir |
| earlier | `b8843fa` | add v2 sections, blog, forms, security/SEO hardening |
| earlier | `f0ff3a1` | add logo, Google Maps embed, fix navbar/footer logo |
| earlier | `7a5db8d` | trigger redeploy |

---

## Consolidated Action List (by priority)

### Before launch (High)
1. **Upload fresh `dist/` to Cloudflare Pages (manual)** — bundle `index-BdrH60Es.js` (master-prompt pass included). Then verify `vetha-yogalaya.pages.dev` serves that hash.
2. **Repoint DNS for `vethayogalaya.in`** to Cloudflare Pages (CNAME `vetha-yogalaya.pages.dev` or move nameservers to Cloudflare) so the custom domain, `og:image`, canonical, sitemap, and JSON-LD resolve to this site.
3. **Post-deploy smoke test** against `vethayogalaya.in`: headers, `/`, routes, forms (Formspree endpoints are live), 404 fallback.

### First revision (Medium)
4. When analytics are wanted, replace placeholder GTM / Meta Pixel IDs in `index.html` with real ones (CSP already allows them). Re-check `robots.txt`/`sitemap.xml` after going live on the custom domain.
5. Consider IntersectionObserver-gating the five deferrable sections (Mentor, Achievements, YogaForEverydayHeroes, International Yoga Day, Senior Citizen) for further initial-load reduction — keep Navbar observer IDs eager.

### Polish (Low)
6. **On-device mobile/4G spot-check** — confirm the hero shows the Ken Burns poster (no video) on a phone, the About still holds on `saveData`, the map overlay tap-to-enable works, and nav scroll-lock feels right. Cannot be done from this environment (no resizable viewport).
7. Keep this changelog updated as fixes ship.

---

## Re-audit checklist (run before major relaunch or hosting migration)

Per Hat 8 housekeeping, re-run the lighter audit before any relaunch or hosting change:

- [ ] **Security** — verify `_headers` CSP/X-Frame/nosniff/referrer/HSTS/permissions still served on the new host; re-grep `src/` + `public/` for secrets; confirm preview-noindex still applies.
- [ ] **Storage** — re-check for regressions to JPEG/oversized assets; confirm posters + webm variants still referenced; verify all assets exist.
- [ ] **QA/QC** — `npm run lint`, `npm run build`, verify `dist/` completeness, poll the live host for the current bundle hash, and smoke-test forms + routes on the new URL.

---

*End of report. Evidence: `src/`, `public/`, `dist/` inspection; `npm run lint`/`build` output; live HTTP probes of `vetha-yogalaya.pages.dev` and `vethayogalaya.in` (14 Aug 2026); `git log`. All reproducible from the workspace.*
