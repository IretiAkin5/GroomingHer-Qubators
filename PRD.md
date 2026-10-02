# Product Requirements Document: GroomingHer

## 1. Introduction of GroomingHer

**Overview:** GroomingHer is a trusted, age-appropriate, culturally relevant health companion for adolescent girls aged 12–19 in Nigeria navigating puberty, menstruation, body changes, and early reproductive health.

**Purpose:** She logs what she feels, learns whether it is within normal range, and gets help telling a parent or trusted adult — through one steady voice instead of conflicting advice from friends and social media. Educational information only; never a diagnosis.

**Target users:** Primary — girls 12–19. Secondary — parents/guardians. Future — schools/NGOs (Phase 7, paid dashboards).

**Scope (MVP):** Signup + PIN-secured profiles, basic period calendar (no fertile window), symptom tracker, "Is This Normal?" triage with infection self-check, private "Ask Her" companion, "Tell Parents/Guardian" helper, parent interface, tiered Learn paths (First Period Ready, PCOS, nutrition), reminders. English only.

**Age tiers (distinct experiences, not one 12–19 bucket):**

| Tier | Ages | Guiding question | Device & independence |
|---|---|---|---|
| Early Puberty Girl | 12–14 | "What is happening to my body?" | Often shared/parent device; high parent involvement expected |
| Health-Literate Teen | 15–17 | "How do I manage or recognize a condition?" | Growing independence; some privacy + connected parent |
| Near-Adult / Tertiary | 18–19 | "How do I take ownership of my health?" | Own device, autonomy-first; parent involvement optional |
| Parent/Guardian | Adult | "What should I watch for, and how do I approach it?" | Wants to help; often lacks accurate info and language |

**Guiding principles:** (1) Educate, never diagnose — every health tool informs and directs toward a professional; all content referenced to recognised health practitioners. (2) Parent as partner, not monitor — parents get education by default; cycle data is shared only by the girl's choice, while the product actively encourages sharing so parents can spot trends early (irregular, late, or infection patterns). (3) Localize, don't translate — Nigerian foods, resources, and language, not adapted Western copy.

**Key objectives:**
1. Every user can complete log → understand → next step → who to tell.
2. 70% onboarding completion; 80% triage completion; ≥30% two-cycle retention.
3. Zero teen private data visible to parents without explicit consent.
4. Build-verified, self-hosted, <200KB first load.

## 2. Problem Statement

**The problem:** Adolescent girls experience first periods, irregular cycles, pain, acne, discharge, and early signs of PCOS, endometriosis, and infections without trusted guidance. 3 of 5 surveyed teens felt "not prepared at all" for their first period; most felt embarrassed or confused.

**Who experiences it:** Girls 12–19 (especially those with no one to talk to — 1 in 5 surveyed), and their parents, who are mostly willing to talk (4–5/5 comfort) but only medium-confident (3–4/5) spotting real conditions, blocked by awkwardness, shyness, and "no specific guide for young girls."

**Impact:** Girls rely on friends and social media — sources our survey showed are simultaneously the *most* and *least* helpful. Result: confusion, worry, missed school, late care. Schools report shame, bullying, and one-off programs that don't stick.

**Why solving it matters:** A consistent, private, medically-careful guide catches patterns early (irregularity, infection signs), keeps girls in school, and gives parents words and checklists instead of awkwardness.

**Priority (MoSCoW):**

**Must (MVP):** Signup/login + PIN · Onboarding/profile · Calendar basic · Symptom tracker · Is This Normal? triage (infection self-check hero) · Ask Her · Tell Parents/Guardian · Parent interface · Safety/disclaimer/discreet mode · Learn basics + First Period Ready + PCOS section + nutrition mini-hub · Reminders (period + log nudges).

**Should (v1.1, English only):** Mood & emotions check-in · Full offline mode.

**Could:** Pidgin/Hausa/Yoruba/Igbo · Gamification badges · Mood/cycle charts · Data export.

**Won't (MVP):** Community Q&A (safety) · Supplements Guide (needs clinician) · Fertile window, diagnosis, doctor chat (out of scope/risky) · School portal (Phase 7).

## 3. Proposed Solution

A mobile-first PWA where the core loop is: **log → understand → next step → who to tell.**

| Feature | How it solves the problem |
|---|---|
| Calendar basic + regularity badge | Answers "is my cycle normal?" with her own data; 3-day prediction window helps her prepare (pads, school) |
| Symptom tracker (pain, discharge, mood, missed school) | Teaches her what to observe; structured input the triage needs |
| Is This Normal? (rules-first triage) | Deterministic bands (monitor / adult / professional / urgent); infection self-check front and center — the #1 teen pick |
| Ask Her | Private answers for questions she's embarrassed to ask aloud |
| Tell Parents/Guardian | Summary card + direct/gentle scripts; turns "how do I tell mum?" into one tap |
| Parent interface | Alerts, what-to-watch guides, conversation openers — fixes the 3–4/5 confidence gap |
| Learn basics + First Period Ready + PCOS + nutrition | Attacks the 3/5 "not prepared" rate and top-requested topics |
| Reminders | Period + log nudges; drives the retention metric |

**Key components:** Next.js PWA · local Postgres + Drizzle · Better Auth + PIN · versioned triage rules · provider-agnostic AI tone layer · consent-logged sharing.

**How it improves today:** replaces scattered, contradictory sources with one consistent, private, clinician-reviewable path that always ends in a next step and a person to talk to.

**Alternatives considered:** Supabase Auth/DB/storage (rejected: subscription cost + lock-in) → local Postgres + Better Auth + R2; peer community (rejected: moderation risk) → expert-reviewed content + private AI; native apps (rejected: install friction, storage) → PWA.

## 4. Product Positioning

- **Target customer:** Nigerian families with daughters 12–19; later, schools/NGOs.
- **Feature category:** Adolescent menstrual & puberty health companion.
- **Core benefit:** She always knows what's normal, what to do next, and who to tell — privately.
- **Key differentiators:** (1) rules-first medical safety, never diagnosis; (2) consent-only parent sharing — no spying; (3) built for shared phones, low data, Nigerian context; (4) greenfield — survey found zero known alternatives.
- **Competitive positioning:** General period trackers (fertility-focused, adult, foreign) vs GroomingHer (teen-first, education-first, parent-inclusive, local).
- **Positioning statement:** *For Nigerian girls growing up and the parents who love them, GroomingHer is the private companion that explains body changes and guides next steps — because growing up shouldn't be confusing.*

## 5. Features & Functionality

| Name | Description | Purpose | User benefit | Role |
|---|---|---|---|---|
| Signup + Login + PIN | Get Started → I'm a girl / I'm a parent. Girl signs up via phone number (OTP code), email + password (email code), or Google (auto-verified) → tiered onboarding; plus 4-digit app PIN | Private, verified access on shared phones | Siblings can't snoop | Teen, Parent |
| Onboarding/Profile | Tier by age (12–14 / 15–17 / 18–19); menarche status; language | Personalize content depth + independence per tier | A 12-year-old never sees 19-year-old content | Teen |
| Calendar | Log start/end/flow; history; regularity badge; 3-day prediction | Track + spot irregularity early | Knows when period comes; sees Regular/Irregular | Teen |
| Symptom Tracker | Pain 1–5, discharge, acne, bloating, mood, missed school | Structured observation | <60s logging; patterns visible on calendar | Teen |
| Is This Normal? | Rules engine → band + explanation + watch-for + disclaimer | Triage worry into action | Knows: monitor / tell adult / clinic + checklist | Teen |
| Ask Her | Guardrailed private Q&A with follow-ups | Answer embarrassing questions | Judgment-free answers + handoff to triage on flags | Teen |
| Tell Parents/Guardian | Shareable summary card + 2 scripts (direct/gentle) | Start the conversation | One tap instead of fear | Teen |
| Parent Interface | Home, Guides, Shared inbox, Learn, Find Help, Settings | Equip the adult | Watches, words, clinic prep; sees shared cards only | Parent |
| Learn Hub | 15+ short articles: periods, hygiene, myths, PCOS, nutrition, First Period Ready | Trusted education | Replaces TikTok myths | Teen, Parent |
| Age-Tiered Learning Paths | Same topics, three depths: 12–14 basics ("what is happening"), 15–17 management ("how do I handle/recognize"), 18–19 ownership ("how do I own my health") | Right content at the right age | Never overwhelmed, never babied | Teen |
| Referenced Education | Every health article cites recognised practitioners/sources; practitioners review hub each release | Ethical trust for a minor audience | Parents and girls trust it; tools direct to professionals, never self-diagnose | All |
| Reminders | Period-likely + log nudges (in-app/push) | Preparation + retention | Never caught off guard | Teen |
| Safety Suite | Discreet mode, disclaimers, 30-day chat retention, delete-my-data | Trust + compliance | Control over her data | All |

## 6. User Personas (from Sep 2025 survey)

**P1 — Amara, 16, Aso Maraba (the unsupported teen).** No one to talk to; learned from social media; felt "confident managing" but wants tracker + infection info + reminders. Goals: know what's normal privately. Pain: isolation. Tech: shared phone, low data. Expects: privacy, simple words.

**P2 — Zainab, 14, Bwari (the embarrassed beginner).** Parent available but too embarrassed to be noticed; somewhat prepared; parents most helpful, websites least. Goals: understand body changes without shame. Needs: age-specific paths, gentle tone. Tech: parent's phone.

**P3 — Mrs. E., 39, Bwari (the willing parent).** Comfort 5/5 talking, confidence 3/5 spotting conditions; first move is talk + hospital; blocked by "no specific guide for young girls." Goals: identify issues early, know how to help. Wants: alerts, infection self-check, parent education. Pays ₦1–3k/month subscription.

**P4 — Mr. M., 31, Nnewi (the uncomfortable parent).** Comfort 1/5; would google or ask friends; "talking about it" is the challenge. Goals: a dashboard that tells him what matters. Wants: alerts, parent education, community answers. Tech: smartphone, prefers subscription.

**P5 — Kaduna private school (the institution).** Girls struggle with toilets/water/disposal, shame, bullying; parents avoid the talk; programs are one-off. Goals: continuous, stigma-free support. Wants: age paths, tracker, infection check, parent dashboard. Pays ₦1–3k; Phase-7 customer.

## 7. User Roles, JTBD, Stories & Acceptance Criteria

**Roles:** Teen (account owner, logger, asker, sharer) · Parent (guide-reader, share-receiver) · System/Clinician-reviewer (content approver, future).

**JTBD:**
- Teen: "When something changes in my body, help me know if it's normal and what to do, without anyone judging me."
- Parent: "When my daughter might have a problem, show me what to watch for and how to talk about it."

**Stories (see `specs/user-stories.md` for full US-1…US-7):**
- As a teen, I want 4-step onboarding so I see only content for my stage. *AC: <3 min on 3G; menarche=no hides cycle questions; profiles row created.*
- As a teen, I want PIN lock so siblings can't open my data. *AC: 5-min timeout; 5 wrong tries → cooldown.*
- As a teen, I want to log a period in <30s so tracking sticks. *AC: saved + visible same day; no fertility field exists in UI/API/DB.*
- As a teen with 2+ cycles, I want a regularity badge + 3-day window so I can prepare. *AC: badge only with ≥2 cycles; never a single exact day.*
- As a teen, I want one-tap symptom logging so I learn what to observe. *AC: <60s; linked to cycle day; dots on calendar.*
- As a worried teen, I want one clear band + next step so I stop spiraling. *AC: 10 golden tests pass; red flags → clinic checklist; never a diagnosis label.*
- As a teen, I want a summary + scripts so telling mum is easy. *AC: consent-logged share; copy/show/send options.*
- As a parent, I want shared-cards-only access so I help without snooping. *AC: raw logs/chats return 403.*
- As any user, I want discreet mode + disclaimers so I'm safe. *AC: one-tap toggle; disclaimer on onboarding + every AI/triage output; delete-my-data wipes all.*

## 8. User Interface (UI)

Full visual system: `design.html` (canonical). Flows F1–F7: `design/user-flows.md`. Wireframes W1–W8: `design/wireframes.md`.

**Key screens:** Onboarding (4 steps) · Home (greeting, next-range card, shortcuts) · Calendar (month grid, bottom-sheet logger, history) · Symptoms (chip groups) · Triage result (band banner + watch-for + disclaimer) · Ask Her (chat + follow-ups) · Tell Parents/Guardian (card preview + scripts) · Parent Space (6 tabs, solid plum header).

**Navigation:** teen bottom nav (Home, Calendar, Ask Her, Learn, Parent-side entry separate); parent tab pills. No dead ends — every button mapped in flows.

**Layout:** mobile 390px first, max-width 480px column, 16px base, 48px targets, 10/14/20px radii. Flat colors, zero gradients.

**Interaction patterns:** one-tap chips, bottom sheets for logging, skeleton loading, retry banners, offline "will sync" notes, consent preview before any share.

**Accessibility:** WCAG 2.1 AA contrast, icon + text labels, plain language, discreet grey palette mode, keyboard-reachable actions.

## 9. Technical Requirements (from implementation plan)

- **Platforms:** Mobile-first responsive PWA (installable, offline cache); desktop works.
- **Stack:** Next.js 15 + React 19 + TypeScript + Tailwind v4.
- **Languages:** TypeScript throughout; SQL via Drizzle.
- **Frameworks/libs:** Better Auth (auth), Drizzle ORM (data), Resend (email), `pg` driver.
- **APIs (built):** `/api/health`, `/api/profile` (scrypt PIN hash), `/api/cycles` (log + stats), `/api/symptoms`. Planned: assessments, shares, Ask Her (SSE streaming).
- **Third-party:** Cloudflare R2 (files), Resend (mail), Termii later (SMS), LLM provider-agnostic (stub default).
- **Database:** Local PostgreSQL 16 (Docker) + Drizzle; 6 tables (profiles, cycles, symptoms, assessments, shares, learn_articles); migration in `app/drizzle/`.
- **Authentication:** Better Auth (Postgres adapter, 7-day sessions) + app PIN (scrypt) + timeouts.
- **Hosting/infra:** Docker Compose (web + db + minio) + Caddy + Cloudflare Tunnel; `docker compose up --build`.
- **Hardware:** Runs on developer PC; verified targets: 2GB-RAM Android + 3G for UAT.
- **Dependencies:** Node 20 + Docker; `npm run build` verified (103KB first load).

## 10. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | First load <200KB JS; log period <30s; symptoms <60s; onboarding <3 min |
| Security | scrypt PIN hashes; profile-scoped queries; parent 403-tested; no secrets in repo |
| Scalability | Same compose file moves to VPS; stateless web tier |
| Availability | Local device must be on (known limit); offline logging always works |
| Reliability | Offline-first logging/Learn; sync later; graceful AI-offline states |
| Accessibility | WCAG 2.1 AA; 48px targets; plain language |
| Usability | <60s core tasks; no dead ends; discreet mode |
| Compatibility | Modern Android Chrome, iOS Safari; low-end devices in UAT |
| Maintainability | Versioned triage rules; ADRs in `docs/`; CI lint/type/test/docker build |
| Data privacy | Consent ledger; 30-day chat retention; delete-my-data; cookieless analytics; zero teen PII in events |

---

## Appendix D: Roadmap (now vs next, updated 28 Sep 2026)

| When | What | Status |
|---|---|---|
| Done | Phases 0–3: research guides, stories, design system, scaffold, DB running | ✅ Complete |
| Done | Slices 1–3: onboarding + PIN, calendar, symptom tracker | ✅ Complete |
| **Now** | Slice 4: Is This Normal? (rules + static answers) | ▶️ Next build |
| Next | Slices 5–6: Ask Her, Tell Parents/Guardian | Planned |
| After | Slices 7–8: Learn hub, Parent interface | Planned |
| Then | Phase 5: content + clinician review pack | Planned |
| Last | Phase 6 testing (Android + iPhone) → Phase 7 school launch | Planned |

Install paths (no public store): PWA add-to-homescreen (Android + iPhone) and Android APK sideload.

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

## Appendix B: Survey Findings (Sep–Oct 2025, n=11)

Teens: 3/5 unprepared for first period; sources inconsistent (proves need for one trusted voice); hardest = school balance, emotions, appearance; 0/5 know any platform; likelihood 4–5/5; top = Infection Self-Check 5/5, Tracker 4/5, Community 3/5, Age Paths 3/5, PCOS/Supplements/Reminders/Gamification 2/5 each.
Parents: comfort 4–5 (one 1/5), confidence 3–4; top = Alerts, Infection, Parent education, Dashboard; pay mostly ₦1–3k/month subscription.
School (Kaduna): toilets/water, bullying, one-off programs; wants age paths, tracker, infection check, dashboard.
Coverage: tracker, age learning, infection check, alerts, parent dashboard, Ask Her all validated. New: pre-menarche prep, mood support, nutrition hub, PCOS section, reminders bump. Parked: Supplements (Change 9), Community (Change 10). Caveats: small sample; owner email twice (likely self-test); 2 UK diaspora; satisfaction Q N/A.

---

## Appendix C: Change Log (owner decisions)

### Change 1: Auth — Better Auth instead of Supabase Auth (25 Sep 2026)
Free, open-source, in-app; sessions in our own DB. PIN lock on top for shared phones.

### Change 2: Database — local PostgreSQL, no Supabase subscription (25 Sep 2026)
Postgres 16 in Docker + Drizzle. Free, moves anywhere later.

### Change 3: Files — Cloudflare R2 instead of Supabase Storage (25 Sep 2026)
R2 (prod) + MinIO (local). ~10GB free, zero egress fees, S3-compatible.

### Change 4: Email — Resend (25 Sep 2026)
React templates, free tier; SMTP fallback locally.

### Change 5: Hosting — own machine, not Vercel/Supabase (25 Sep 2026)
Docker Compose + Tunnel. Zero cost; same files to VPS later. Docker Desktop installed 27 Sep; engine running 28 Sep.

### Change 6: Calendar — no fertile window (25 Sep 2026)
Basics only. Fertility tracking out of scope for teens.

### Change 7: Design — all gradients removed (27 Sep 2026)
Parent header → solid plum; teen preview gradients → flat fills. `design.html` verified zero gradients.

### Change 8: Repo restructured on sample (27 Sep 2026)
Root `PRD.md` + `design.html` + `index.html`; app in `app/`.

### Change 9: Supplements Guide parked (28 Sep 2026)
Popular but unsafe to advise minors without a clinician partner.

### Change 10: Community Q&A stays out (28 Sep 2026)
High demand, but no moderation capacity; private Ask Her only.

### Change 11: Pricing — free families, schools/NGOs pay (28 Sep 2026)
Survey: ₦1–3k/month acceptable; launch free for access, institutions pay.

### Change 12: School portal is Phase 7 (28 Sep 2026)
Families first; schools via paid dashboards later.

### Change 13: Should-have = English only; Tell Parents/Guardian rename (28 Sep 2026)
Locales moved to Could. "Tell My Parent helper" renamed "Tell Parents/Guardian" everywhere.

### Change 14: Survey-driven scope adds (28 Sep 2026)
First Period Ready track, mood & emotions check-in (Should), nutrition mini-hub, PCOS section, reminders → Must-lite.

### Change 15: Slice 4 rules-first, both install paths, clinician outreach (28 Sep 2026)
Triage ships with static rules text first; live AI later. Phone testing on cheap Android AND iPhone via PWA install + Android APK sideload (no public store release). No clinician contact yet — review pack to be drafted.

### Change 16: Age tiers, educate-not-diagnose, parent-as-partner, localize (29 Sep 2026)Three girl tiers (12–14 basics, 15–17 management, 18–19 ownership) + parent tier, each with distinct content and independence. All health content referenced to recognised practitioners and built to direct toward professionals, never self-diagnose. Parents get education by default; cycle data shared only by girl's choice, with sharing actively encouraged so parents spot trends early. Content localized to Nigerian context, not translated Western copy. Onboarding: Get Started → I'm a girl / I'm a parent → girl signs up via phone OTP, email + code, or Google → tiered onboarding.

### Change 17: PIN-first auth, phone/Google parked (29 Sep 2026)
Start with PIN lock only (set at onboarding + unlock gate + timeout). Phone OTP and Google signup held for later — specced, not built.

### Change 18: AI integration planned, safety gates first (29 Sep 2026)
Owner will integrate live AI only after safety is assured. Gates: rules engine decides all triage bands (LLM rephrases only); system prompt with no-diagnosis + escalation + disclaimer on every output; red-flag auto-handoff to triage/adult; 30-day chat retention with delete; clinician review of prompts + golden test suite passing; provider-agnostic layer so models can be swapped. Slice 5 ships stubbed (reviewed answer library).

### Change 19: Termii deferred — needs custom domain email (2 Oct 2026)
Termii signup requires a work email on our own domain; we have Gmail only. Decided: buy groomingher domain + free Zoho work email later, then Termii. Phone OTP stays in free console test mode until then. Google signup proceeds now (Gmail works).Owner will integrate live AI only after safety is assured. Gates: rules engine decides all triage bands (LLM rephrases only) · system prompt with no-diagnosis + escalation + disclaimer on every output · red-flag auto-handoff to triage/adult · 30-day chat retention with delete · clinician review of prompts + golden test suite passing · provider-agnostic layer so models can be swapped. Slice 5 ships stubbed (reviewed answer library).