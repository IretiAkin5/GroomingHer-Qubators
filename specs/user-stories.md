# Phase 1 — User Stories + Acceptance Criteria (GroomingHer MVP)

Scope: the 7 Must-Haves from `PRD.md` §8. Each story is teen (T) or parent (P) unless noted. Stack: Next.js PWA + local Postgres + Better Auth.

## US-1 — Profile / Onboarding
- **US-1.1 (T):** As a girl opening the app first time, I want quick setup (age band, period started yes/no, language) so I see only content for my stage.
  - AC: completes in <3 min on 3G Android; menarche=no hides cycle history; creates `profiles` row; skippable with defaults.
- **US-1.2 (T):** As a user on a shared phone, I want a 4-digit PIN lock so siblings can't open my data.
  - AC: PIN set at onboarding; app locks after 5 min background; 5 wrong tries → 1-min cooldown; PIN reset requires re-onboarding warning (data loss disclosed).

## US-2 — Calendar (Basic, no fertile window)
- **US-2.1 (T):** As a girl, I want to log period start/end + flow (light/medium/heavy) so I see my pattern.
  - AC: log in <30 sec; edit/delete past entries; history list; no ovulation/fertility field exists anywhere in UI, API, or DB.
- **US-2.2 (T):** As a girl with 2+ cycles logged, I want cycle length + regularity badge (Regular / Irregular — see why) + next-period range so I can prepare.
  - AC: badge appears only with ≥2 cycles; range shown as 3-day window, never a single "exact" day; first-year-irregular note for age 12–14.

## US-3 — Symptom Tracker
- **US-3.1 (T):** As a girl, I want one-tap daily logging (pain 1–5 + location, flow, discharge, acne, bloating, mood, missed school) so I learn what to observe.
  - AC: log in <60 sec; chips per design system; timestamped + linked to cycle day; entry editable same day.
- **US-3.2 (T):** As a girl, I want my symptoms visible on the calendar day so patterns are obvious.
  - AC: day cell shows symptom dots; tapping a day shows that day's entries.

## US-4 — Is This Normal? (Triage)
- **US-4.1 (T):** As a worried girl, I want to check my logged symptoms against normal standards so I know whether to monitor or talk to someone.
  - AC: uses age band + last 3 cycles + symptoms; returns exactly one band (monitor / talk to adult / see professional) + explanation + watch-for list + disclaimer; 10 golden test cases (in `content/triage-tests.md`) all pass.
- **US-4.2 (T):** As a girl with a red flag (per `research/red-flags-v1.md`), I want clear urgent wording + what to bring to a clinic so I act fast.
  - AC: R1/R2/R4/R6 trigger "see professional soon/now" + clinic checklist (3 dates, flow, pain 1–5); never shows a diagnosis label.

## US-5 — Ask Her (AI Companion)
- **US-5.1 (T):** As a girl too embarrassed to ask an adult, I want to ask body questions privately and get age-appropriate answers.
  - AC: answers in app language level (age-12 readable), Nigerian context; every answer ends with next step + disclaimer; red-flag queries auto-suggest "Check — Is This Normal?".
- **US-5.2 (T):** As a returning user, I want suggested follow-ups so I learn more without knowing what to ask.
  - AC: 2–3 follow-up chips after each answer; chat retained 30 days default, deletable anytime.

## US-6 — Tell My Parent Helper
- **US-6.1 (T):** As a girl told to talk to an adult, I want a short summary + words to say so starting is easy.
  - AC: generates summary card (symptoms pattern + suggested action, no raw chat) + 2 script options (direct / gentle); copy-text + show-on-screen; creates consent-logged `shares` row.
- **US-6.2 (P):** As a parent, I want to see only what she shares so I can help without snooping.
  - AC: parent view shows shared cards only; raw calendar/journal/chats unreachable by API (tested: 403 without share id).

## US-7 — Safety, Privacy, Medical Disclaimer
- **US-7.1 (All):** As a user, I want discreet mode (neutral name "GH Notes", muted palette) so others glancing at my phone see nothing sensitive.
  - AC: one-tap toggle; persists; screenshots show no medical terms on home screen.
- **US-7.2 (All):** As a user, I want plain-language disclaimers so I know this is learning, not a doctor.
  - AC: disclaimer on onboarding, every triage/AI output, and parent view; delete-my-data option wipes profile + cycles + symptoms + chats (confirmation logged).

## Metrics Instrumentation (per PRD §10)
| Metric | Event(s) | Target MVP |
|---|---|---|
| Onboarding completion | `onboarding_completed` / `onboarding_started` | ≥70% |
| First period log | `cycle_logged` within 7d of signup | ≥60% of onboarded |
| 2-cycle retention | users with ≥2 cycles in 90d | ≥30% |
| Triage completion | `assessment_completed` / `assessment_started` | ≥80% |
| Share rate | `share_created` / `assessment_completed` (flagged) | track baseline |
| "Know next step" | in-app 1-tap survey after triage | ≥75% yes |

Analytics: Umami self-hosted, cookieless, no teen PII in events (profile_id hashed).

## Out of scope (enforced)
Fertile window, diagnosis labels, community/forum, doctor chat — any PR adding these fails review.
