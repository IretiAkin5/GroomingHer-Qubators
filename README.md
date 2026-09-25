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

Phase 3: app scaffold live in `app/` (Next.js PWA + local Postgres + Better Auth + triage rules). Feature routes land per slice in Phase 4.

## Repo Contents

- `README.md` — this file
- `GroomingHer - Qubators.md` — original product brief (markdown)
- `GroomingHer - Qubators.docx` — original product brief (Word)

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

- [ ] Finalize MVP scope and user stories
- [ ] Choose tech stack (web / mobile)
- [ ] Prototype Learn + Track + Ask Her
- [ ] Safeguarding, privacy, and medical-disclaimer review

## License

TBD
