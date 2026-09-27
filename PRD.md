# Product Requirements Document: GroomingHer

## 1. Overview

**Product Name:** GroomingHer
**Version:** 0.3 (scaffold + Slices 1–2 built)
**Platform:** Web (mobile-first PWA, self-hosted with Docker)
**Core Requirement:** Private period tracking + educational triage for teens; parents see only what is shared.

### 1.1 Purpose

A trusted, age-appropriate, culturally relevant health companion for adolescent girls aged 12–19 in Nigeria navigating puberty, menstruation, body changes, and early reproductive health. She logs what she feels, learns whether it is within normal range, and gets help telling a parent or trusted adult. Educational information only — never a diagnosis.

### 1.2 Target Audience

- Primary: adolescent girls 12–19 who may be embarrassed to ask parents, teachers, or health workers.
- Secondary: parents/guardians who want reliable guidance on what to watch for and how to start the conversation.

### 1.3 Design Principles

1. **Privacy by Default** — PIN lock, discreet mode, consent-only sharing, no teen PII in analytics.
2. **Age-appropriate** — age-12 reading level, no shame words, no diagnosis labels, no fertile window.
3. **Low-data, shared-phone reality** — <200KB first load, offline logging + Learn, 48px touch targets.
4. **Rules before AI** — deterministic triage bands; LLM only rephrases tone.
5. **Accessibility** — WCAG 2.1 AA, icon + text labels.

### 1.4 Architecture

- **Web:** Next.js (React) + TypeScript + Tailwind PWA, self-hosted `next start` in Docker.
- **DB:** Local PostgreSQL 16 in Docker + Drizzle ORM. Privacy enforced in app code (profileId-scoped queries).
- **Auth:** Better Auth with Postgres adapter + app-level 4-digit PIN lock.
- **Files:** Cloudflare R2 (prod) + MinIO local dev, S3 API.
- **Email:** Resend (+ SMTP fallback locally).
- **Realtime (MVP):** Server-Sent Events + polling fallback; no vendor.
- **Hosting:** Local device via Docker Compose (web + db + minio) + Caddy + Cloudflare Tunnel.
- **Analytics/Errors:** Umami + GlitchTip/Sentry self-hosted, cookieless.
- **CI/CD:** GitHub Actions (lint, typecheck, tests, docker build).

### 1.5 Technical Requirements

#### Data Model (local Postgres)

- `profiles(id, age_band, menarche_status, language, pin_hash)`
- `cycles(id, profile_id → profiles, start_date, end_date, flow)`
- `symptoms(id, profile_id, cycle_id, date, pain 0–5, discharge, acne, bloating, mood, school_missed)`
- `assessments(id, profile_id, inputs_snapshot, outcome[monitor|adult|professional|urgent], explanation, red_flags)`
- `shares(id, profile_id, assessment_id, summary_text, recipient_type)` — consent ledger
- `learn_articles(id, slug, age_band, title, body, locale)`

#### Triage Bands (rules engine, `app/lib/triage.ts`)

| Band | Meaning |
|---|---|
| monitor | Normal range — self-care + what to watch for |
| adult | Talk to a trusted adult |
| professional | See a healthcare professional soon + clinic checklist |
| urgent | Tell an adult now, clinic/emergency (R6: sudden severe pain, fainting) |

Red-flag inputs: soaking pad <2h, bleeding >7 days, pain 4–5 + missed school, fever + discharge, cycles <21d or >45d recurring, no period by 16. Draft status — requires clinician sign-off before launch.

### 1.6 Non-Functional Requirements

- **Performance:** First load <200KB JS; log a period <30s; log symptoms <60s; onboarding <3 min.
- **Reliability:** Offline logging + Learn work; sync later; graceful “needs connection” for AI features.
- **Privacy:** Parents read `shares` only (API 403-tested); chats retained 30 days, deletable; delete-my-data wipe.
- **Safety:** Disclaimer on onboarding, every triage/AI output, and parent view.

---

## 2. Phase 0 — Research (done: guides + drafts; fieldwork pending)

**Goal:** Validate vocabulary, phone/data reality, and top questions.
**Concrete outputs:** `research/teen-interview-guide.md`, `research/parent-interview-guide.md`, `research/vocabulary-v1.md`, `research/red-flags-v1.md` (draft).

| Feature | Description | Priority |
|---|---|---|
| Teen interviews (5–8) | Phone sharing, tracking habits, help-seeking, trust | P0 |
| Parent interviews (3–5) | Worry signs, conversation blockers, privacy lines | P0 |
| Vocabulary v1 | Approved vs mirror-only words, tone rules | P0 |
| Red-flag list v1 | 6 draft patterns mapped to bands | P0 |

Acceptance: anonymized notes in `research/notes/`; red flags clinician-reviewed before build use.

## 3. Phase 1 — Product Definition (done)

**Goal:** User stories + acceptance criteria for the 7 Must-Haves + metrics plan.
**Concrete output:** `specs/user-stories.md` (US-1…US-7, metrics table with MVP targets).

| Feature | Description | Priority |
|---|---|---|
| US-1 Profile/onboarding | Age band, menarche, language, PIN | P0 |
| US-2 Calendar basic | Log start/end/flow, regularity badge, 3-day prediction | P0 |
| US-3 Symptom tracker | One-tap chips linked to cycle day | P0 |
| US-4 Is This Normal? | One band + watch-for + disclaimer; 10 golden tests | P0 |
| US-5 Ask Her | Private Q&A, red-flag handoff to triage | P0 |
| US-6 Tell My Parent | Summary card + 2 scripts, consent-logged | P0 |
| US-7 Safety/disclaimer | Discreet mode, delete-my-data | P0 |

## 4. Phase 2 — UX & Design System (done, v1.0)

**Goal:** Flows, wireframes, tokens, visual preview for teen + parent.
**Concrete outputs:** `design.html` (canonical, root), `design/tokens.json`, `design/components.md`, `design/user-flows.md` (F1–F7), `design/wireframes.md` (W1–W8), `design/preview.html`, `design/parent-preview.html`.

| Feature | Description | Priority |
|---|---|---|
| User flows F1–F7 | Onboarding → log → triage → tell parent; Ask Her; parent view | P0 |
| 8 wireframes | Layout, components, states, no dead ends | P0 |
| Design tokens | Plum/rose palette, Nunito, radii, 48px targets | P0 |
| design.html | Colors, typography, buttons, inputs, teen + parent samples, flat (no gradients) | P0 |

Acceptance: every AI/triage screen has a disclaimer banner; offline/empty/error states specified; prototype tested with 3 teens.

## 5. Phase 3 — Architecture & Scaffold (done, build-verified)

**Goal:** Runnable skeleton: web + DB + auth + triage engine + Docker.
**Concrete outputs:** `app/` (Next.js), `app/lib/{db,schema,auth,triage,ai}.ts`, `app/drizzle/` migration, `docker-compose.yml`, `docs/architecture.md`, health endpoint.

| Feature | Description | Priority |
|---|---|---|
| Next.js PWA shell | Layout, home, manifest, /api/health | P0 |
| Drizzle schema + migration | 6 tables | P0 |
| Better Auth wiring | Postgres adapter, sessions | P0 |
| Triage engine | R1–R6 pure function + disclaimer | P0 |
| Docker Compose | web + Postgres 16 + MinIO | P0 |

Acceptance: `tsc` clean, `next build` passes (verified 71s, 103KB first load).

## 6. Phase 4 — Build Slices (in progress: Slices 1–2 done)

**Goal:** Ship Must-Haves one slice at a time, each with UI + API + tests.

| Slice | Output | Status |
|---|---|---|
| 1 — Shell + Auth + Profile | `app/onboarding`, `/api/profile` (scrypt PIN hash) | Done |
| 2 — Calendar Basic | `app/calendar`, `/api/cycles` (badge + 3-day range, no fertile window) | Done |
| 3 — Symptom Tracker | Daily chips <60s, linked to cycle day | Next |
| 4 — Is This Normal? | Rules + LLM tone, 10 golden tests | Planned |
| 5 — Ask Her | Guardrailed chat, safe-completion | Planned |
| 6 — Tell My Parent | Summary card + scripts + consent log | Planned |
| 7 — Learn Basics | 15 articles, age-filtered, offline | Planned |
| 8 — Parent Interface v1 | 6 tabs, shared-cards-only API | Planned |

Acceptance per slice: US criteria in `specs/user-stories.md` pass; parent API 403-tested against raw teen data.

## 7. Phase 5 — Content, AI Safety, Localization (planned)

| Feature | Description | Priority |
|---|---|---|
| Triage rules v1 + tests | Versioned CSV + 10 golden cases + clinician sign-off | P0 |
| Ask Her prompt v1 | Age-adaptive, Nigerian context, no-diagnosis | P0 |
| Learn review log | 15 articles reviewed + stamped | P0 |
| Pidgin + glossary | Pidgin starter, Hausa/Yoruba/Igbo glossary | P1 |

## 8. Phase 6 — Quality, Safeguarding, UAT (planned)

| Feature | Description | Priority |
|---|---|---|
| Access-control tests | Profile-scoped queries, parent 403s | P0 |
| Low-end Android test | 2GB RAM, 3G, offline flows | P0 |
| Safeguarding review | Shared-phone, PIN bypass, discreet, deletion | P0 |
| UAT 5 teens + 3 parents | P0/P1 fixes only, go/no-go checklist | P0 |

## 9. Phase 7 — Launch & Iterate (planned)

Soft launch (1 school/community) → metrics per §1.6 → reminders, journal lite, full offline, more locales.

---

## 10. index.html

`index.html` (repo root) is the static landing page: product intro, journey, feature list, links to `design.html` and the repo. It is the public face; the working app lives in `app/`. Section status: live, update copy at launch.

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation | Phase |
|---|---|---|---|---|
| Triage advice wrong/harmful | Medium | High | Rules-first engine, clinician sign-off, disclaimers, never diagnose | 5 |
| Parent sees private data | Low | High | Shares-only API, 403 tests, consent ledger | 4 |
| Shared-phone snooping | High | Medium | PIN + timeout + discreet mode | 4 |
| Low data/storage phones | High | Medium | <200KB JS, compressed images, offline-first | 3 |
| Docker/hosting downtime (local device) | Medium | Medium | Same compose file moves to VPS later | 3 |
| AI provider cost/drift | Medium | Medium | Provider-agnostic layer, stub default, rules decide bands | 5 |

---

## Appendix A: CSS Variables Reference

```
:root {
  --plum:#7C2D52; --plum-d:#5B1F3C; --rose:#E85D8A; --rose-l:#FBDCE6;
  --bg:#FFF7F9; --surface:#FFFFFF; --text:#3F2A33; --muted:#8A6B76; --border:#F1D9E0;
  --teal:#0D9488; --amber:#F59E0B; --danger:#DC2626; --ok:#15803D;
  --r-s:10px; --r-m:14px; --r-l:20px; --font-sans:'Nunito',system-ui,sans-serif;
}
```
Full tokens: `design/tokens.json`. Visual: `design.html`. Flat colors only — no gradients.

---

## Appendix B: Change Log (owner decisions)

### Change 1: Auth — Better Auth instead of Supabase Auth (25 Sep 2026)
**Asked about:** which login tool to use. **Decided:** Better Auth with local Postgres adapter. **Why:** free and open-source, lives in our Next.js app, needs no paid account; sessions stay in our own database. PIN lock added on top for shared phones.

### Change 2: Database — local PostgreSQL, no Supabase subscription (25 Sep 2026)
**Decided:** PostgreSQL 16 in Docker on our own machine + Drizzle ORM. **Why:** Supabase needs a paid subscription; local Postgres is free, full-featured, and moves to any host later unchanged.

### Change 3: Files — Cloudflare R2 instead of Supabase Storage (25 Sep 2026)
**Decided:** R2 (prod) + MinIO (local). **Why:** R2 free tier ~10GB with zero download fees; S3-compatible so local MinIO mirrors it exactly.

### Change 4: Email — Resend (25 Sep 2026)
**Decided:** Resend (+ SMTP fallback locally). **Why:** simple templates, free tier covers parent invites; works offline via fallback.

### Change 5: Hosting — own machine, not Vercel/Supabase (25 Sep 2026)
**Decided:** Docker Compose locally + Cloudflare Tunnel. **Why:** zero cost now; same files deploy to a server later. Noted 27 Sep: Docker Desktop installed successfully.

### Change 6: Calendar — no fertile window (25 Sep 2026)
**Decided:** period basics only (start/end, flow, regularity, 3-day prediction). **Why:** teens need to know if periods are regular and flag issues early — fertility tracking is out of scope and inappropriate.

### Change 7: Design — all gradients removed (27 Sep 2026)
**Requested:** remove gradients from parent interface. **Changed:** parent header gradient → solid plum `#7C2D52`; audit of all previews — logo/skeleton gradients in teen preview also replaced with flat fills. **Verified:** `design.html` (new canonical file) contains zero gradients; teen + parent samples included. Old `design/` previews kept for reference.

### Change 8: Repo restructured on sample (27 Sep 2026)
**Decided:** mirror KelvinOdems/income-tracker — root `PRD.md` (brief + implementation plan + change log), root `design.html` (visual system), root `index.html` (landing). Working app stays in `app/`.
