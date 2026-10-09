# Build validation — 6 October 2026

## Android APK — 9 October 2026

A signed demonstration APK was built with Android SDK 35, JDK 21 and Gradle 8.11.1. Assembly and lint passed after correcting an Android 8.0 navigation-bar attribute and adding explicit Android 12+ backup exclusions. Signature, alignment and manifest checks passed. Website build, three PWA tests and the Android-user-agent Girl entry check passed. Native device/emulator testing remains unperformed; see `android/README.md` for the build and artifact checksum. The verified artifact is staged at `app/public/downloads/GroomingHer.apk` for Netlify publication.

## PWA validation — 7 October 2026

- Production build and TypeScript checks passed with the install controls, manifest and offline worker.
- Existing production journey suite: **13 passed, 0 failed, 0 skipped**, including checked accessibility and phone layouts.
- New PWA suite against the final production build: **3 passed, 0 failed, 0 skipped**. Chromium's installability audit reported no errors using a disposable regular profile. PNG dimensions, maskable icon, Apple touch icon and noncached worker headers passed. Offline role navigation showed the reconnect screen, with only offline HTML/icons in Cache Storage. A simulated second deployment waited for explicit activation, preserved the current page until confirmation, then reloaded and removed the old cache.
- The initial installability test used an incognito context, which Chromium correctly rejected for installation; the test was corrected to a normal disposable profile. No installability assertions were disabled.
- Each production build stamps the worker with the Next.js build ID. Installation does not change the fictional-data or no-health-collection boundaries.

The combined production `npm run test:e2e` suite passed **16 tests, 0 failed, 0 skipped**. PNG icons are generated reproducibly by the build script with pinned Sharp; the PWA checks passed again after that change.

The first PWA publication attempt was blocked by GitHub remote `Internal Server Error`; local repository integrity checks passed. Retrying on 7 October succeeded: commit `ca67644` reached `main`, and Netlify deployment `6ac668ae1d17ce00084f9a19` published at 15:44:31 UTC. Live HTTPS checks returned 200 for the home page, manifest, versioned worker, offline screen, all four PNG icons and health endpoint. The health endpoint still reports fictional-demo mode with collection disabled.

The live PWA suite initially passed offline privacy and confirmed update activation but found that Netlify served the static worker with its default cache header instead of Next.js's configured `no-store` header. Explicit Netlify static-file headers were added for the worker and manifest in commit `a4732be`. Deployment `6ac6694a91c2e80008c7b109` published at 15:47:13 UTC on 7 October, and the live worker served `Cache-Control: no-store,max-age=0`. The full live PWA suite then passed **3 tests, 0 failed, 0 skipped**, including Chromium installability, icon dimensions, offline privacy and confirmed update activation. Live tests use a local same-origin relay with upstream HTTPS verification and the cloud proxy/system CA settings; no TLS checks or test assertions are disabled.

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
