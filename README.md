# GroomingHer

> **Current build:** public website and fictional Girl, Parent and School demonstrations. No live enrolment or real children’s health collection. [Run, preview and check the stages](docs/BUILD_STAGES.md). The founder product brief below describes the intended service.

## Netlify deployment

The repository's `netlify.toml` sets base directory `app`, build command `npm run build`, publish directory `.next`, Node 24 and the explicit `@netlify/plugin-nextjs` adapter. The adapter is pinned in the app lockfile and generates Netlify routing and server functions. Uploading the raw `.next` folder without the adapter produces a Netlify 404.

Deploy the linked GitHub `main` branch. Successful deployment should serve `/`, `/about`, `/onboarding/girl` and `/api/health`; the health endpoint must report fictional-demo mode and `healthCollection: false`. No database or child-health credentials are needed for this demonstration. If an older configuration remains cached, use Netlify **Deploys → Trigger deploy → Clear cache and deploy site**. Local adapter validation: run `netlify build --offline` from the repository root using Netlify CLI.

**Christian teenage health education for Nigerian girls and the adults who support them.**

GroomingHer is a planned web app that helps girls understand their changing bodies, ask questions with confidence and know when to seek support. Health education leads the experience, with Bible verses and reflections reinforcing dignity, compassion, healthy boundaries and care for the body.

The first audience is girls aged **13–15**, including girls who have not started menstruating. Parents and guardians have a separate, connected learning space. Authorised school staff have tools for delivering guided sessions. A mobile app and learning paths for older teenagers are longer-term plans.

## Product status

GroomingHer is in planning and discovery. The first-version features have been approved by the founder; the school, healthcare reviewer, delivery partners and funding have not yet been secured. This README describes the intended product, not a live or clinically approved service.

**Founder and product owner:** Ireti Ogunmola.

## Product brief

### User

Nigerian girls aged 13–15 who need clear, respectful information about puberty and reproductive health. Supporting users are parents/guardians and authorised staff at participating schools. Girls can participate through guided sessions and printed materials even without their own phone.

### Problem

Girls may have questions about periods, discharge, hygiene, pain and body changes but lack reliable explanations or feel embarrassed asking adults. Parents may need guidance on responding calmly. Schools need reviewed learning materials and a clear route for supporting concerns. These are working assumptions to validate with girls, parents and staff.

### Main journey

A participating school introduces GroomingHer → families receive programme information → the required guardian permission and the girl’s own agreement are completed → girls attend guided lessons and optionally revisit them online → girls may keep a private diary → a girl chooses whether to share a concern with a trusted adult → appropriate human support is available.

Public learning resources can be explored without creating an account.

## Purpose and promise

**Understand your body. Ask questions with confidence. Get support when you need it.**

GroomingHer aims to improve understanding, confidence and help-seeking. Its wider ambition is to reduce missed or dismissed health concerns through better awareness. The first version does not identify diseases from symptom entries or promise prevention of future reproductive conditions.

## Christian foundation

GroomingHer is clearly Christian throughout, while health education remains its main purpose. Reflections encourage girls to recognise their worth and seek support without shame. Medical explanations are evidence-based and professionally reviewed; faith reflections are clearly distinguished from them.

Menstruation, discharge and illness are not presented as impurity, punishment or spiritual failure. Prayer accompanies practical action and healthcare. Assistance is not conditional on a girl’s religious commitment.

## First-version experiences

| Space | Main features |
| --- | --- |
| Public website | Home, About, Solutions for Girls/Parents/Schools, How it works, Learning Resources, Contact Us, Get Started and Log In; safety information and FAQs. |
| Girl | Six-week lessons, reviewed resources, AI lesson explanations, fictional learning checks, optional diary, diary history, chosen messages, support contacts and learning progress. |
| Parent/guardian | Reviewed guides, conversation starters, Christian reflections, daughter-chosen messages, school programme, support, permissions and settings. |
| School | Session planning, facilitator guides, printable materials, invitations, participation/attendance, support contacts, anonymous-question guidance and combined feedback. |
| Management | Content drafting and approval, school/programme coordination, content and AI reports, combined results and privacy requests. |

The website starts with this navbar: **Home · About · Solutions · How it works · Learning Resources · Contact Us · Get Started**, with **Log In** as a secondary action. Solutions contains Girls, Parents and Guardians, and Schools.

## Joining and onboarding

Personal accounts are invitation-based during the first school pilot. Girls and parents receive invitations through an approved school. Schools first register interest and complete readiness discussions; submitting interest does not automatically approve participation.

Brief role-based onboarding asks about learning preferences and access, rather than personal medical history. Required permissions are separate from optional preferences, diary use and feedback. Account connection does not give parents access to the girl’s private diary.

## AI’s role

Ask GroomingHer explains approved lessons in simpler language and points to the relevant resource. It can clarify a term or help a girl understand a topic.

It does not read the diary, detect irregularities, diagnose conditions, prescribe medicines, request intimate images or automatically alert parents. Unsupported or personal medical questions are directed to appropriate human support. AI access begins only after content and safety review.

## Optional diary and chosen sharing

Girls may record period dates, flow, pain, impact on activities and optional symptoms or notes. They can edit or delete entries. Daily logging is not compulsory and diary use is not a school assessment.

A girl can use **Help Me Tell Someone** to choose a verified recipient, draft a message, review its exact wording and confirm sending. Nothing is sent automatically. The first version supports selected concern messages, rather than a full chat service.

## Privacy and support

Parents and schools cannot browse diaries, unshared symptoms or private AI questions. School staff see only the information needed to run the programme. Reports use combined results with protections against identifying girls.

Each pilot school needs a trained female support contact, a backup and a route to qualified healthcare. Support must also be available offline. Shared devices and paper diaries have privacy limitations that must be explained honestly. Urgent guidance must not depend on waiting for an app response.

Health, child-protection, consent and privacy arrangements require appropriate professional review before children participate or personal health information is collected.

## First pilot

The agreed pilot lasts **six weeks** at one Christian school, with guided sessions and optional home learning. Families participate free; sponsorship or founder funding still needs to be secured. Approximately 15–20 girls is a proposed manageable starting group, not a confirmed commitment.

| Week | Focus |
| --- | --- |
| 1 | My changing body, dignity and how GroomingHer works. |
| 2 | Periods, menstrual products and the optional diary. |
| 3 | Hygiene, discharge and questions about changes. |
| 4 | Pain, daily activities and asking for help. |
| 5 | Personal boundaries, consent and trusted adults. |
| 6 | Review, anonymous questions and feedback. |

The initial preparation deliverable is a sample lesson pack: **Understanding my period and asking for help**, containing a girl lesson, facilitator notes and a parent guide.

## What success means

The pilot measures understanding and confidence: whether girls can answer reviewed fictional scenarios, identify a safe support contact and feel more comfortable asking for help. Attendance, parent feedback, access barriers and safety concerns also inform improvements.

The pilot does not establish diagnostic accuracy or long-term clinical benefit. Proposed targets and readiness requirements are detailed in the PRD.

## Later phases

Potential later work includes a mobile app, adapted content for ages 16–19, local-language editions, regular reviewed updates and wider school partnerships. Automated pattern alerts would require separate clinical evaluation, permissions and regulatory review. Peer community features are excluded from the first version.

## Project documents

- [GroomingHer PRD](GroomingHer_PRD.md): approved scope, feature breakdowns, user stories, acceptance criteria and pilot planning.
- [GroomingHer Implementation Plan](GroomingHer_Implementation_Plan.md): staged delivery, selected providers, privacy boundaries and readiness requirements.
- [GroomingHer Design Plan](GroomingHer_Design_Plan.md): proposed visual direction, page layouts, navigation, flows and design validation.

The PRD governs product scope. The design plan translates it into a proposed experience; it does not add approved medical functions. Visual choices remain recommendations until reviewed with the founder and users.

## Immediate next steps

1. Prepare the sample lesson and low-detail screen layouts.
2. Find a suitable school and healthcare reviewer.
3. Gather voluntary feedback from girls, parents and school staff.
4. Confirm protection, privacy, support and permission procedures.
5. Obtain realistic cost estimates and delivery support.
6. Design and build the essential web-app experience, alongside printable learning materials.

GroomingHer aims to align with relevant WHO adolescent-care and health-AI guidance. This is not WHO approval or certification. Primary references and remaining approvals are recorded in the PRD.

## Demonstration build — October 2026

This repository is being rebuilt against the attached PRD 3.1. The source documents above describe the intended service; the current software is a fictional demonstration, not an approved pilot.

```bash
cd app
npm ci
npm run dev -- --hostname 0.0.0.0
```

No database, Docker, account credentials, Groq or Resend key is needed for this demonstration. See [build stages](docs/BUILD_STAGES.md) for preview routes and validation. Node 24 is validated in the cloud; Next.js supports Node 20 or newer.

All health samples await professional review. Personal health inputs and the legacy collection APIs are disabled. Forms use fixed fictional details; no enquiry, account, diary or message is sent to a server. Demo state is temporary. Real invitation-based accounts, permissions, approved content, vendor integrations and management belong to later stages.

Canonical founder documents are preserved in `GroomingHer_PRD.md`, `GroomingHer_Implementation_Plan.md` and `GroomingHer_Design_Plan.md`; `PRD.md` and `IMPLEMENTATION_PLAN.md` mirror their respective sources. Superseded Word files are kept in `docs/archive` for history.
