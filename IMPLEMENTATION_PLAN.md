# GroomingHer — Implementation Plan (v0.1)

Source of truth: `PRD.md` v0.2 (journey: log → document symptoms → Is This Normal? → tell parent; calendar = basics only, no fertile window).

Current repo: `README.md`, `GroomingHer - Qubators.md/.docx` (brief), `PRD.md` (v0.2), untracked `PRD.docx` (to be reconciled).

## Phase 0 — Ideation & Validation (Done / Confirm)
- [x] Product brief, users, problem, core journey
- [ ] 5–8 teen interviews + 3–5 parent interviews in Nigeria: language used, phone sharing, data constraints, what "normal" questions they have
- Output: validated vocabulary list, red-flag list v1, content tone guide
- Exit: interview notes in `/research/`

## Phase 1 — Product Definition (Mostly Done)
- [x] PRD v0.2, MoSCoW, parent interface draft
- [ ] User stories + acceptance criteria for Must-Haves (profile, calendar, symptom tracker, Is This Normal?, Ask Her, Tell Parent, safety/disclaimer)
- [ ] Success metrics instrumentation plan (onboarding completion, 2-cycle retention, triage completion, share rate)
- Output: `PRD.md` v1.0 + `/specs/user-stories.md`

## Phase 2 — UX & Design System
1. User flows: onboarding → log period → log symptoms → triage result → tell parent; Ask Her; parent view.
2. Wireframes (low-fi) for 8 screens: onboarding, home, calendar, log symptoms, triage result, Ask Her, Tell Parent, parent home.
3. Design system (mobile-first, low-data, discreet):
   - Principles: calm, private, non-sexualized, age 12-readable, high contrast, large touch targets
   - Tokens: colors (primary plum/rose + neutral, discreet mode palette), typography (1 sans family, 16px base), spacing, radius
   - Components: button, input, PIN pad, calendar cell, symptom chip, card, disclaimer banner, bottom nav
   - States: empty, loading (skeleton), error, offline
   - Accessibility: WCAG AA, plain language, icon + text labels
- Output: Figma link + `/design/tokens.json`, `/design/components.md`
- Exit: clickable prototype tested with 3 teens

## Phase 3 — Architecture Decisions
**Default: responsive Web App PWA first.** Shared Android phones, low storage, no install friction, fast iteration. Native later if retention warrants.

| Concern | Recommendation | Reason |
|---|---|---|
| Web | Next.js (React) + TypeScript + Tailwind PWA, self-hosted with `next start` in Docker. Free/OSS, no Vercel needed | I chose it for one codebase, App Router API routes (no separate backend), PWA install without Play Store, <200KB JS target. Better free option if you want lighter: Vite + React SPA PWA (simpler local hosting, smaller build) — but you lose API routes/SSR, so keep Next.js unless bundle size becomes a problem |
| DB | Local PostgreSQL 16 in Docker + Drizzle ORM (Prisma alternative). SQLite fallback for zero-setup dev | Full Postgres with zero subscription: `docker compose up db`, data stays on your device, pg_dump backups. Drizzle is light + SQL-like; migrate to managed Postgres later without code change |
| Auth | Better Auth with Postgres adapter + app-level PIN lock + short sessions | Free OSS, Next.js-native, sessions/users stored in your local Postgres — no Supabase dependency. PIN lock + timeout handles shared phones/minors |
| Files | Cloudflare R2 (S3-compatible) for prod + MinIO or local filesystem for dev. Compressed images <100KB, no video in MVP | R2 free tier ~10GB + zero egress fees beats Supabase Storage lock-in; S3 API means MinIO locally mirrors prod exactly. Low-data friendly |
| Payments | None in MVP; later Paystack, Flutterwave fallback | MVP free/educational; Paystack fits Naira/bank/USSD when needed |
| Email | Resend (free ~100/day) + Nodemailer SMTP fallback for local dev | React templates, simple API for parent invites/verification; SMTP fallback works fully offline on your device |
| SMS/WhatsApp | MVP: in-app + Web Push only; later Termii (Nigerian SMS/WhatsApp routes) | Avoids cost now; Termii added only if reminders prove valuable |
| Hosting | Local device: Docker Compose (web + db + minio + umami) + Caddy reverse proxy + Cloudflare Tunnel for public URL | Zero hosting cost, mirrors prod containers, HTTPS via Caddy/Tunnel. Limit: your PC must be on; move to VPS later with same compose file |
| Realtime MVP | Server-Sent Events (SSE) for share delivery + streaming Ask Her; polling fallback. Socket.io only if two-way needed | No vendor needed: SSE runs on same Next.js server, works over Tunnel, enough for parent shared-inbox update + AI token streaming |
| AI | Rules engine first (`/lib/triage.ts` versioned) + provider-agnostic LLM layer (`/lib/ai.ts`), disclaimer + escalation every output | Deterministic red-flags (heavy flow, severe pain + missed school, fever+discharge, <21d/>45d recurring) can't drift; LLM only rephrases age-appropriately; swap OpenAI/Groq/OpenRouter via env |
| Analytics/Errors | Umami (self-hosted analytics) + GlitchTip/Sentry self-hosted (errors), privacy-friendly, no cookies for teens | Free, runs in same compose stack, no third-party teen tracking; Sentry free cloud also OK if you don't want to self-host errors yet |
| CI/CD | GitHub Actions: lint + typecheck + tests + `docker build` check → push image | Free, blocks broken triage/auth changes; deploys = `docker compose pull/up` on your device for now |

- Data model v1 (local Postgres):
  - `profiles(id, age_band, menarche_status, language, pin_hash)`
  - `cycles(id, profile_id, start_date, end_date, flow)`
  - `symptoms(id, profile_id, cycle_id, date, pain, discharge, acne, bloating, mood, school_missed)`
  - `assessments(id, profile_id, inputs_snapshot, outcome[monitor|adult|professional], explanation, red_flags, created_at)`
  - `shares(id, profile_id, assessment_id, summary_text, shared_at, recipient_type)`
  - `learn_articles(id, slug, age_band, title, body, reviewed_by, locale)`
- Privacy/safety: Better Auth sessions + app-layer ownership checks (every query scoped by `profile_id`), PIN + session timeout, discreet mode, no fertile-window fields, 30-day chat retention default, consent ledger for shares
- Output: `/docs/architecture.md` + `.env.example` + `docker-compose.yml`, repo scaffold
- Exit: ADR-001 (stack), ADR-002 (local Postgres + access rules), ADR-003 (AI safety) recorded

## Phase 4 — Build Slices (vertical, each shippable)
- **Slice 1 — Shell + Auth + Profile:** onboarding, PIN, age/stage personalization. Acceptance: new user completes onboarding <3 min, data in `profiles`.
- **Slice 2 — Calendar Basic:** log start/end/flow, history, cycle length, regularity badge, next-period range. No ovulation code. Acceptance: 2 cycles logged → regularity shown.
- **Slice 3 — Symptom Tracker:** daily chips + severity, linked to cycle day. Acceptance: log <60 sec, appears on calendar day.
- **Slice 4 — Is This Normal? (rules + LLM tone):** rules engine for red flags (e.g. severe pain + missed school, heavy flow soaking <2h, foul discharge + fever, <21d or >45d cycles recurring) → outcome + self-care + watch-for list + disclaimer. Acceptance: 10 test cases return correct outcome band.
- **Slice 5 — Ask Her:** private Q&A with guardrails, safe-completion, suggested follow-ups, "check Is This Normal?" handoff. Acceptance: red-flag query escalates, benign query stays educational.
- **Slice 6 — Tell My Parent:** summary card generator + script + copy/share to parent view. Acceptance: share creates consent-logged `shares` row, parent sees only that card.
- **Slice 7 — Learn Basics:** 15 articles from PRD §7.7, age-filtered, plain language. Acceptance: readable offline, reviewed stamp.
- **Slice 8 — Parent Interface v1:** 6 tabs per PRD §9, consent-only shared inbox. Acceptance: parent cannot query daughter's raw logs.

Each slice: UI + API + access-check tests + content review.

## Phase 5 — Content, AI Safety, Localization
- Triage rules table versioned (`/content/triage-rules.v1.csv`) + clinician review sign-off
- Ask Her system prompt v1: age-adaptive, Nigerian context, no diagnosis language, always next-step + trusted-adult nudge on flags
- Learn content review log; Pidgin starter + Hausa/Yoruba/Igbo glossary (Could-have)
- Output: `/content/` + review checklist

## Phase 6 — Quality, Safeguarding, UAT
- Unit + access-control tests, PWA offline test, low-end Android (2GB RAM, 3G) perf test
- Safeguarding review: shared-phone scenario, PIN bypass attempt, screenshot/discreet mode, data deletion request
- UAT with 5 teens + 3 parents; fix P0/P1 only
- Exit: go/no-go checklist signed

## Phase 7 — Launch & Iterate (Should/Could)
- Soft launch (1 school/community), analytics per PRD §10, feedback form
- Then: reminders, journal lite, offline full, additional locales

## Repo Target Structure
```
/app (Next.js routes: onboarding, home, calendar, symptoms, normal, ask, tell, parent, learn)
/lib (ai.ts, triage.ts, supabase.ts)
/components (design system)
/content (articles, triage-rules, prompts)
/specs, /design, /docs (ADRs), /research
/supabase (migrations, rls.sql)
```

## Immediate Next Steps (pick one)
1. Lock stack (default: Next.js + Supabase PWA) → I scaffold repo
2. Draft user stories + triage rules v1 → then scaffold
3. Start Figma wireframes spec → then scaffold

Open items: `PRD.docx` untracked — confirm if it matches `PRD.md` v0.2 or needs merge.
