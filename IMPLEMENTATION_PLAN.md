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
| Web | Next.js (React) + TypeScript + Tailwind, PWA installable, offline cache for Learn + logs | One codebase for all phones, fast on low-end Android, <200KB initial JS target, easy PWA install without Play Store |
| DB | Supabase Postgres with Row Level Security (RLS) | Postgres reliability + RLS enforces privacy: girl sees only her data, parent sees only explicitly shared summaries; Firebase as fallback only |
| Auth | Supabase Auth (phone/email + PIN app-lock + session timeout) | Handles minors/shared phones safely; PIN app-lock + short sessions prevent sibling/parent snooping; no custom auth to maintain |
| Files | Supabase Storage + CDN, compressed images (<100KB), no video in MVP | Low-data Nigeria context; Learn illustrations only, cached offline; keeps hosting simple in one vendor |
| Payments | None in MVP; later Paystack (Nigeria-first), Flutterwave fallback | MVP is free/educational; Paystack fits Naira, bank transfer, USSD when monetization needed |
| Email | Supabase built-in auth emails for MVP; Resend if custom templates needed | Zero extra vendor for MVP; Resend adds simple templating for parent invites/reports later |
| SMS/WhatsApp | MVP: in-app + push reminders only; later Termii (SMS/WhatsApp Nigeria) | Termii has Nigerian routes/pricing; SMS only if reminders prove valuable — avoids cost/complexity now |
| Hosting | Vercel (frontend) + Supabase (EU/US + CDN) | Free-tier start, fast deploys, global CDN for low bandwidth; keeps frontend/backend decoupled |
| AI | Rules engine first (`/lib/triage.ts` versioned) + provider-agnostic LLM layer (`/lib/ai.ts`) for tone/explanation, strict system prompt, disclaimer + escalation check on every output | Safety: deterministic red-flag outcomes (heavy flow, severe pain, fever+discharge, <21d/>45d recurring) can't drift; LLM only rephrases age-appropriately; easy to swap OpenAI/Groq/OpenRouter |
| CI/CD | GitHub Actions: lint + typecheck + tests + RLS policy tests → preview deploy → main deploy | Free, tied to repo, blocks broken/unsafe triage changes from shipping |

- Data model v1:
  - `profiles(id, age_band, menarche_status, language, pin_hash)`
  - `cycles(id, profile_id, start_date, end_date, flow)`
  - `symptoms(id, profile_id, cycle_id, date, pain, discharge, acne, bloating, mood, school_missed)`
  - `assessments(id, profile_id, inputs_snapshot, outcome[monitor|adult|professional], explanation, red_flags, created_at)`
  - `shares(id, profile_id, assessment_id, summary_text, shared_at, recipient_type)`
  - `learn_articles(id, slug, age_band, title, body, reviewed_by, locale)`
- Privacy/safety: PIN + session timeout, discreet app name/icon option, no fertile-window fields anywhere, audit log without storing chat verbatim beyond 30 days (configurable), consent ledger for shares
- Output: `/docs/architecture.md` + `.env.example`, repo scaffold
- Exit: ADR-001 (stack), ADR-002 (data + RLS), ADR-003 (AI safety) recorded

## Phase 4 — Build Slices (vertical, each shippable)
- **Slice 1 — Shell + Auth + Profile:** onboarding, PIN, age/stage personalization. Acceptance: new user completes onboarding <3 min, data in `profiles`.
- **Slice 2 — Calendar Basic:** log start/end/flow, history, cycle length, regularity badge, next-period range. No ovulation code. Acceptance: 2 cycles logged → regularity shown.
- **Slice 3 — Symptom Tracker:** daily chips + severity, linked to cycle day. Acceptance: log <60 sec, appears on calendar day.
- **Slice 4 — Is This Normal? (rules + LLM tone):** rules engine for red flags (e.g. severe pain + missed school, heavy flow soaking <2h, foul discharge + fever, <21d or >45d cycles recurring) → outcome + self-care + watch-for list + disclaimer. Acceptance: 10 test cases return correct outcome band.
- **Slice 5 — Ask Her:** private Q&A with guardrails, safe-completion, suggested follow-ups, "check Is This Normal?" handoff. Acceptance: red-flag query escalates, benign query stays educational.
- **Slice 6 — Tell My Parent:** summary card generator + script + copy/share to parent view. Acceptance: share creates consent-logged `shares` row, parent sees only that card.
- **Slice 7 — Learn Basics:** 15 articles from PRD §7.7, age-filtered, plain language. Acceptance: readable offline, reviewed stamp.
- **Slice 8 — Parent Interface v1:** 6 tabs per PRD §9, consent-only shared inbox. Acceptance: parent cannot query daughter's raw logs.

Each slice: UI + API + RLS + tests + content review.

## Phase 5 — Content, AI Safety, Localization
- Triage rules table versioned (`/content/triage-rules.v1.csv`) + clinician review sign-off
- Ask Her system prompt v1: age-adaptive, Nigerian context, no diagnosis language, always next-step + trusted-adult nudge on flags
- Learn content review log; Pidgin starter + Hausa/Yoruba/Igbo glossary (Could-have)
- Output: `/content/` + review checklist

## Phase 6 — Quality, Safeguarding, UAT
- Unit + RLS policy tests, PWA offline test, low-end Android (2GB RAM, 3G) perf test
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
