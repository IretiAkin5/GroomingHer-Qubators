# Build validation — 6 October 2026

## Netlify routing correction — 7 October 2026

The published deployment `6ac524a1a341550008c30eed` used commit `2fb95e3` but returned Netlify 404 for both `/` and `/api/health`. Its public deployment summary reported raw paths such as `server/app/index.html`, no redirect rules and no deployed functions. This establishes that the raw Next.js build was published without the required adapter output.

Pinned `@netlify/plugin-nextjs` 5.16.2 and configured it explicitly in `netlify.toml`, with Node 24. `netlify build --offline` completed successfully: all 41 pages compiled and Netlify packaged `___netlify-server-handler`.

Corrective commit `b1aa67f` was pushed to GitHub `main`. The linked Netlify build published deployment `6ac65d4b64c6a30008dab514` at 14:55:59 UTC on 7 October 2026. Its summary confirms three redirect rules, one header rule and one deployed function. Live HTTPS checks returned 200 for `/`, `/about`, `/solutions/girls`, `/get-started`, `/login`, `/onboarding/girl`, `/demo/girl` and `/api/health`. Health reports fictional-demo mode and `healthCollection: false`.

The existing 13-journey browser suite passed against the live deployment: **13 passed, 0 failed, 0 skipped**, including desktop/phone navigation, all onboarding roles, optional diary, confirmed sharing, learning, Parent/School tools and accessibility checks. Requests were relayed through a temporary local proxy that verified upstream HTTPS certificates: direct Playwright requests could not use this cloud environment's DNS/certificate configuration. A prior local `netlify serve --offline` check also stopped during CLI edge-runtime setup (`fetch failed`); neither setup failure was an app assertion failure, and neither TLS verification nor test assertions were disabled. The successful suite exercised the deployed app and assets through the verified relay. Screenshots and sample PDF were saved under `/workspace/artifacts/groomingher-live`.

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

The initial 6 October validation preceded commit and deployment. GitHub push and Netlify publication have since been verified as recorded above. No clinical, child-protection or legal approval is claimed by these checks. GitHub Actions execution, Docker image build and restoration in a fresh cloud task remain unverified.
