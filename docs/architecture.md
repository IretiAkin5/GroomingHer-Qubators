# GroomingHer Architecture (local-first, Phase 3)

PWA web app, self-hosted. No Supabase/Vercel in the loop.

```
browser/PWA -> Next.js (web, :3000) -> local Postgres (:5432, Drizzle)
                                      -> MinIO/R2 (files, S3 API)
                                      -> Resend (email) / stub AI until Phase 5
```

## ADRs
- ADR-001: Next.js PWA self-hosted in Docker (one codebase, API routes, offline cache).
- ADR-002: Local Postgres 16 + Drizzle; privacy enforced in app code (profileId-scoped queries, parents read shares only) instead of DB RLS.
- ADR-003: Rules engine decides triage band; LLM only rephrases; disclaimer + escalation on every output.

## Run locally (needs Node 20 + Docker)
```bash
cp app/.env.example app/.env.local
docker compose up --build
# web http://localhost:3000, health: /api/health
```
