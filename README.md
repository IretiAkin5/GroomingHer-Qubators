# GroomingHer

GroomingHer is a trusted, age-appropriate, and culturally relevant health companion for adolescent girls aged 12–19 in Nigeria navigating puberty, menstruation, body changes, and early reproductive health.

## Who It's For

- **Primary:** Adolescent girls (12–19) with questions about periods, body changes, and reproductive health who may not feel comfortable asking a parent, teacher, or healthcare professional.
- **Secondary:** Parents and guardians who need reliable guidance to support their daughters.

## Problem

Adolescent girls often experience first periods, irregular cycles, period pain, acne, discharge, and early signs of conditions like PCOS, endometriosis, and common infections — without trusted guidance.

They may rely on friends, social media, or unreliable online sources, leaving them confused, worried, and unsupported. Parents often want to help but don't know what to watch for or how to start the conversation.

## Core Journey

> I have a question → I ask GroomingHer → I understand what may be happening → I know what to do next → I know who to talk to if I need help.

## Planned Features (v0.1 vision)

1. **Personalized onboarding** — experience tailored to age and developmental stage.
2. **Learn hub** — puberty and menstrual health education.
3. **Period tracking** — track and better understand cycles.
4. **Ask Her** — private AI companion for body questions.
5. **Is This Normal?** — educational guidance on whether to monitor or speak with a trusted adult / healthcare professional.
6. **Conversation starters** — help starting a conversation with a parent or trusted adult.

> Note: GroomingHer provides educational information only, not medical diagnosis or treatment.

## Project Status

Slices 1–3 live (onboarding + PIN, calendar, symptoms). Slice 4 (Is This Normal?) is next. Full plan in `PRD.md`, roadmap in `PRD.md` Appendix D.

## Roadmap

| When | What | Status |
|---|---|---|
| Done | Phases 0–3: research, stories, design, scaffold, DB running | ✅ |
| Done | Slices 1–3: onboarding, calendar, symptoms | ✅ |
| **Now** | Slice 4: Is This Normal? (rules + static answers) | ▶️ |
| Next | Slices 5–6: Ask Her, Tell Parents/Guardian | Planned |
| After | Slices 7–8: Learn hub, Parent interface | Planned |
| Then | Content review → testing → school launch | Planned |

## Repo Contents

- `README.md` — this file (status + roadmap)
- `PRD.md` — full product doc: 10-section template, phased plan, roadmap (Appendix D), decisions (Appendix C)
- `design.html` — visual design system (teen + parent, no gradients)
- `index.html` — static landing page
- `app/` — working Next.js app (Slices 1–3)

## Getting Started

Clone the repo and read the product brief:

```bash
git clone https://github.com/IretiAkin5/GroomingHer-Qubators.git
cd GroomingHer-Qubators
```

## Run the app (needs Node 20 + Docker)

```bash
cp app/.env.example app/.env.local
docker compose up --build
# open http://localhost:3000, health at /api/health
```

## Roadmap

| When | What | Status |
|---|---|---|
| Done | Phases 0–3: research, stories, design, scaffold, DB running | ✅ |
| Done | Slices 1–3: onboarding, calendar, symptoms | ✅ |
| **Now** | Slice 4: Is This Normal? (rules + static answers) | ▶️ |
| Next | Slices 5–6: Ask Her, Tell Parents/Guardian | Planned |
| After | Slices 7–8: Learn hub, Parent interface | Planned |
| Then | Content review → testing → school launch | Planned |

Details: `PRD.md` Appendix D. Old v0.1 checklist retired — scope is now in `PRD.md` §2 (MoSCoW).

## License

TBD
