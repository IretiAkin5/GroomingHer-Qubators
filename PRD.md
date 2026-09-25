# GroomingHer — Product Requirements Document (PRD v0.2)

## 1. Overview
GroomingHer is a trusted, age-appropriate, and culturally relevant health companion for adolescent girls aged 12–19 in Nigeria navigating puberty, menstruation, body changes, and early reproductive health.

Educational information only. No medical diagnosis or treatment.

## 2. Users
- **Primary:** Adolescent girl 12–19. May have questions about period/body but uncomfortable asking parent, teacher, or health professional.
- **Secondary:** Parents/guardians who want reliable guidance to support their daughters.

## 3. Problem
Adolescent girls experience first period, irregular cycles, period pain, acne, discharge, and early signs of PCOS, endometriosis, and common infections without trusted guidance.

They rely on friends, social media, or unreliable online sources. They often don't know if something is normal, what to do, or when to seek help. Parents want to help but don't know what to watch for or how to start the conversation.

Result: confusion, worry, feeling unsupported.

## 4. Goals / Non-Goals
**Goals (MVP):**
- Help her log periods + symptoms simply.
- Help her understand if what she experiences is within normal range for her age/stage.
- Flag patterns early that warrant talking to a trusted adult / healthcare professional.
- Help her tell a parent/trusted adult.

**Non-Goals (MVP):**
- No diagnosis, no fertile window/ovulation tracking, no community/forum, no direct doctor chat.

## 5. Core User Journey (MVP)
> I have a question → I ask GroomingHer → I understand what may be happening → I know what to do next → I know who to talk to.

1. **Log in:** PIN-secured, discreet, personalized by age/stage.
2. **Document:** Logs period (start/end/flow) in Calendar + symptoms (pain, discharge, acne, bloating, mood, missed school) in Symptom Tracker.
3. **AI assesses (Is This Normal?):** Compares input to age-appropriate health standards. Outputs one of:
   - Monitor at home + self-care + what to watch for, OR
   - Talk to trusted adult, OR
   - See healthcare professional soon + how to prepare.
4. **Tell parent:** Generates simple shareable summary + script. She controls what is shared.

## 6. Scope Decisions
- **Calendar = basics only.** Period start/end, flow, cycle length, regularity view. **No fertile window/ovulation.** Aim is regularity awareness and early flagging of reproductive issues, not fertility tracking.
- **Symptom Tracker is structured.** Required inputs for AI triage, not free-text only.

## 7. Features (MVP)

### 7.1 Profile / Onboarding
- Age, menarche status (yes/no), cycle history, language preference, PIN.
- Drives personalization of content and normal ranges.

### 7.2 Calendar (Basic)
- Log period start/end, flow level.
- View history, cycle length, predicted next period range, regularity indicator.
- Explicitly out: fertile window, ovulation, conception-related content.

### 7.3 Symptom Tracker
- Log: pain level + location, flow heaviness, discharge, acne, bloating, mood, school missed.
- Timestamped, linked to cycle day.

### 7.4 Is This Normal? (Triage)
- Input: age/stage + calendar + symptoms.
- Output: educational explanation + next step (monitor / talk to adult / see professional) + red-flag list.
- Always includes medical disclaimer and encourages trusted adult for concerning symptoms.

### 7.5 Ask Her (AI Companion)
- Private Q&A about body, periods, puberty.
- Age-appropriate tone, culturally relevant, safe completion to adult/professional on red flags.

### 7.6 Tell My Parent Helper
- Generates summary card + conversation script.
- Share via in-app parent view, copy text, or guided talk. Consent-based.

### 7.7 Learn Basics (v1: 15–20 topics)
- Periods, hygiene, pain management, myths vs facts, discharge basics, PCOS/endometriosis/infection awareness in plain language.

### 7.8 Safety, Privacy, Medical
- PIN/biometric, discreet naming/icon, no diagnosis language, consent-based parent sharing, audit-safe logging.

## 8. MoSCoW Prioritization (MVP)

**Must Have — journey breaks without these:**
- Profile/onboarding — personalizes normal ranges and language.
- Calendar (basic) — core data to detect irregularity.
- Symptom Tracker — structured input for AI; teaches what to observe.
- Is This Normal? — core value; early flagging.
- Ask Her — removes embarrassment barrier.
- Tell My Parent helper — closes loop to adult support.
- Safety + disclaimer — trust, safeguarding, shared phones.

**Should Have — v1.1 if time:**
- Reminders (period likely, log nudge) — improves data + preparation.
- Learn basics full set — reduces misinformation.
- Parent Interface v1 — supports secondary user.

**Could Have — if easy:**
- Mood/body journal lite, offline Learn + logging, Pidgin/Hausa/Yoruba/Igbo starter pack.

**Won't Have (MVP):**
- Fertile window/ovulation, community/forum, direct doctor chat, diagnosis labels. Reason: not needed by teens, high safeguarding/medical risk, distracts from regularity + early-flag goal.

## 9. Parent Interface Draft (v1)

**Principles:** No spying. Parent only sees what daughter explicitly shares. Separate login.

**Tabs:**
1. **Home:** What GroomingHer is, how to support without judgment, what daughter may share.
2. **Guides:** How to start the conversation; what to watch for by age (first period, irregular cycles, severe pain, heavy flow, discharge with odor/fever); when to seek care.
3. **Shared from Daughter (consent-only):** Summary card she sends, e.g. "3 irregular cycles + severe pain — suggested: talk to trusted adult" + suggested next steps.
4. **Learn for Parents:** Hygiene products, school support, myths, PCOS/endometriosis basics in plain language.
5. **Find Help:** How to prepare for clinic visit, what to tell doctor, emergency signs.
6. **Settings:** Language, privacy, disclaimers.

No access to daughter's calendar details, journal, or Ask Her chats unless shared.

## 10. Success Metrics (MVP)
- % users completing onboarding + first period log.
- % users logging ≥2 cycles.
- % Is This Normal? sessions ending with clear next step.
- % Tell My Parent summaries shared.
- Reduction in "I don't know what to do next" (survey).

## 11. Open Questions
- Tech stack: web / mobile?
- Languages for v1 beyond English?
- Offline scope for low-data areas?
- Clinical review process for content and triage rules?

## Source
Original brief: `GroomingHer - Qubators.md` / `.docx`.
