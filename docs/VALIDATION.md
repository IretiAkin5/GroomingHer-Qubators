# Build validation — 6 October 2026

## Checks completed during staged development

Public-stage desktop/mobile navigation, resource filtering/detail and enquiry preview/failure passed. TypeScript passed after source changes. The 13-journey suite's first development run passed 10 and identified three checks needing attention: onboarding progress needed a semantic progressbar role; the resource check needed to wait for Next.js streamed document metadata; and the schedule test needed client navigation because a full reload deliberately resets memory-only demo drafts. All three corrected checks passed a targeted rerun.

## Final production validation

- `npm run build`: passed on Node 24.19.0, Next.js 15.5.26; 41 generated pages, all route compilation/type validation completed.
- `npm run typecheck`: passed.
- `npm run test:e2e` against `npm run start`: **13 passed, 0 failed, 0 cancelled, 0 skipped**. All intended journeys executed.
- Automated WCAG A/AA checks in the suite: no violations on the checked public, article, contact, onboarding, role-home, diary, message, guide, support and feedback screens.
- Phone checks at 390×844: no horizontal overflow on the checked home/onboarding/role/diary screens; public and role menus functioned.
- Collection boundary: legacy health, auth, sharing and learning API paths returned HTTP 410 for read/write checks; the health endpoint reported fictional demo mode with collection disabled. Browser diary/sharing/contact journeys generated no POST requests.
- Fictional message confirmation matched the exact Parent-recipient view; cancellation and simulated failure left no message. Exit/revocation blocked reopening a demo role.
- Generated screenshots: public desktop/phone; Girl, Parent and School desktop/phone; onboarding/diary phone; confirmed parent message. Print-to-PDF generated the labelled unreviewed sample lesson pack.
- Frozen `npm ci` installation: passed with the final lockfile.
- Final URL-validation hardening: unknown page/solution/role names, including inherited object names, returned HTTP 404; both affected journey checks passed after rebuilding. The Parent Account → Programme feedback link also passed a browser check.
- `git diff --check`: passed.

The production server is running on the environment's application port 3000. Files are local changes for review; no deployment, publication, commit or push was performed. No clinical, child-protection or legal approval is claimed by these checks. GitHub Actions execution, Docker image build, external deployment/publication and restoration in a fresh cloud task are unverified.
