# GroomingHer architecture — fictional demonstration

## Current build
Next.js 15 App Router and TypeScript serve a responsive public website and fictional Girl, Parent and School spaces. Public pages use server rendering; short demo flows use a client context. No live database, email, AI or authentication service is used. The selected demo role is a tab-scoped session marker; fictional diary and message state stays in memory. Exit/reset removes demo state. Refresh resets fictional records.

Legacy symptom collection, triage, predictions and automatic alerts have been removed. `/api/health` identifies demo mode; every other API request returns HTTP 410 without reading a request body. No form sends personal information. Demo health inputs are fixed scenarios, not free text. Separate role layouts and a client guard demonstrate intended visibility, not production authorisation. No genuine private records exist.

## Intended later architecture
Follow [the implementation plan](../GroomingHer_Implementation_Plan.md): Better Auth for identity; PostgreSQL (Supabase hosting proposed); server-enforced invitation, role, permission and pairing checks; Groq for approved-content explanation only; Resend for account actions without health details. Vendor selection is not clinical or privacy approval. The child-account/recovery approach remains a pre-live decision.

The former Drizzle schema, migrations and auth files are archived outside the active app at `docs/archive/legacy-backend`; they are legacy development references, not the new data model or an approved privacy design. The Better Auth adapter from the former build has a known schema-discovery problem and must be replaced/validated during the live-account stage. No current route imports it.

## Run and check
From `app`: `npm ci`, `npm run dev -- --hostname 0.0.0.0`. No Docker or secrets are required. Run `npm run typecheck`, `npm run build` and `npm run test:e2e` (with the app running). Stop development before building because both use `.next`.

No Netlify configuration or connected-host account was present in the inspected checkout. `netlify.toml` declares the proposed app base/build settings only; deployment and account ownership are unverified. Do not claim a live deployment.
