# GroomingHer Implementation Plan

Version 1.0 · 6 October 2026 · Product owner: Ireti Ogunmola

This plan turns the approved PRD into staged delivery. It describes decisions and checks without code-level specifications. It is a proposed implementation plan, not a claim that the app, accounts or services have already been configured.

## 1. Delivery direction

Build one responsive web app with public pages and separate Girl, Parent/Guardian, School and management spaces. Begin with fictional demonstration information. Introduce real accounts and health records only after permissions, access boundaries and operational support are ready.

The first audience is Nigerian girls aged 13–15, including girls who have not started menstruating. Clearly Christian reflections accompany accurate health education. Printed materials and school sessions provide core access without a personal phone. A mobile app is later work.

## 2. Selected tools and reasons

| Area | Choice | Why | Responsibility / limitation |
| --- | --- | --- | --- |
| Application | Next.js and TypeScript | Public pages and private experiences in one maintained project; clearer checks as features grow. | Inspect existing GroomingHer work before creating a replacement. |
| Styling | Tailwind CSS and reusable interface elements | Consistent forms, cards, actions and role layouts. | Follow the design plan; its proposed palette still needs founder review. |
| Accounts | Better Auth | Flexible signup, login, sessions, verification and recovery using a database. | Does not automatically provide guardian permission, safe pairing or correct role access. These are GroomingHer features. |
| Data | PostgreSQL; Supabase is a proposed host | Suits related records such as accounts, schools, invitations, permissions, lessons and messages. | Use Better Auth, not Supabase Auth. Database hosting choice remains subject to operational and privacy review. |
| AI | Groq API | Founder-selected service; free plan can support development and limited trial use. | Free usage is rate-limited. Select a model through testing; review terms and data handling before use by minors. |
| Email | Resend | Works with Better Auth email functions and sends invitations, verification and recovery messages. | Verify a sending domain; plan around email limits and delivery failures. |
| Hosting | Assess existing Netlify project first | Could preserve existing work and familiar deployment arrangements. | Final hosting depends on project compatibility, account ownership and costs. |
| Code | GitHub with Codex development | Reviewable changes, history and rollback. | Never commit private records, passwords or service keys. |
| Printed learning | PDFs matching approved lessons | Includes girls without devices and equips facilitators. | Show version/date and replace outdated materials. |
| Measurement | Combined learning and participation reports | Fits education, confidence and access goals. | No diary text, AI questions or selected messages in general analytics. |

## 3. Integration boundaries

Better Auth establishes who is signed in. GroomingHer determines which role, school and records that person can access. Supabase database hosting must not be assumed to understand Better Auth sessions automatically. Do not expose private database access to the browser without an explicitly verified authorisation design. Keep privileged database and service credentials outside client code.

Only approved content is published or used by the AI helper. Groq does not receive diaries, participant rosters or account connections. Email contains account actions and general information, not health details. The management space handles content approval and restricted operational tasks, not routine diary browsing.

## 4. Stage-by-stage implementation

| Stage | Work | Why now | Completion evidence |
| --- | --- | --- | --- |
| 1. Inspect and prepare | Inspect existing code, repository and host. Organise current README, PRD, design and implementation plans. Establish role visibility and reusable interface elements. | Avoid losing useful work or creating contradictory decisions. | Existing work assessed; build scope and demonstration mode documented. |
| 2. Public website | Implement exact navbar, landing body/footer, About, three Solutions pages, How it works, public resources, Contact and policies. Use PRD 3.1 proposed copy. | Founder can review identity and purpose early. | Phone/desktop preview; every navigation item and action has a correct destination. |
| 3. Demonstration flows | Role selection, brief onboarding, role homes and principal workflows using fictional data. | Test understanding before sensitive collection. | Clearly labelled demonstration; girl can cancel sharing, skip diary and find support. |
| 4. Accounts and permissions | Better Auth; invitations; verification/recovery; separate required permissions; girl agreement; school approval; pairing and staff roles. | Access must be reliable before private records exist. | Invalid invitations, pending permissions, incorrect pairings and revoked access tested. |
| 5. Education delivery | Reviewed lessons/resources, parent guides/reflections, fictional checks/progress, schedules, print packs and content approval. | Delivers the main product value. | Approved content has source/reviewer/version; drafts remain unpublished. |
| 6. Diary and chosen messages | Optional diary CRUD, history, exact message preview, confirmation, status, support and privacy requests. | Introduce health information after boundaries are demonstrated. | Owner-only diary access; no automatic sharing; failures are truthful; cancellation sends nothing. |
| 7. AI helper | Groq model evaluation, approved-content explanations, source links, safety responses, usage caps and unavailable state. | Requires approved lessons and human-support routes first. | Reviewer-approved evaluation; no diary access; human help remains available when AI is unavailable. |
| 8. Pilot readiness | Staff preparation, verified support/referral contacts, final permissions/privacy procedure, cost estimate, group reports and incident handling. | A pilot needs people and procedures as well as screens. | School and funding confirmed; reviews complete; six-week programme ready. |

No fixed delivery dates are promised until existing code, available support and costs are assessed. Each stage should be previewable before moving to the next.

## 5. Account and onboarding approach

- Girl: school invitation → explanation → brief age/name and optional learning/access questions → required guardian permission and her own agreement → verified connection → Girl home.
- Parent: invitation → account → programme/privacy explanation → optional preferences → required permissions → verified relationship/connection → Parent home.
- School: interest registration → readiness discussion/approval → named staff invitations → authorised accounts → readiness tasks.
- Management: approved named accounts with duties-based access. Public role selection never grants management access.

### Girls without email

This remains a design decision before live account implementation. Assess a Better Auth-compatible username or other child-account approach that does not require a personal phone/email. Do not store multiple girls as one parent account or use a shared login. A guardian may help request recovery, but must not receive access to the girl's private records by default. Document and test the ownership-verification and recovery process with privacy/child-protection advice.

Email-based signup can be used for adult accounts. Core printed participation does not require digital account creation.

## 6. Email implementation

| Email | Recipient | Contents |
| --- | --- | --- |
| Invitation | Approved adult recipient / permitted account contact | Joining instructions, expiring link and support route. |
| Verification | Account email owner | Verification action; no child health details. |
| Password recovery | Verified account recovery route | Time-limited recovery action; no diary information. |
| Programme update | Participating parent or staff, as applicable | General confirmed dates, topics and activities. |
| Optional new-message notice | Chosen message recipient | “You have a new message in GroomingHer.” Login link; no symptoms or message body. |
| Enquiry acknowledgement | Enquirer | Receipt confirmation; school approval remains pending. |

Resend's documented free allowance is 3,000 monthly emails with a 100-per-day limit. Recheck the account's actual plan before sending. Invitations must be paced; verification and recovery should take priority over bulk reminders. Track sending failures and bounces without claiming inbox delivery. Retries must avoid duplicate invitations. Keep sender/domain setup and DNS verification as a pre-live task; the domain itself can have a separate cost.

## 7. Groq AI implementation

1. Select a small set of reviewed lessons for the first trial.
2. Compare currently supported models on actual educational questions, Nigerian phrasing, confusing prompts and out-of-scope requests.
3. Supply only relevant approved content and the minimum question needed; do not send identifying account details or diary records.
4. Ask for short, age-appropriate explanations with the supporting lesson link.
5. Handle personal diagnosis, medicine, intimate-image and unsupported questions with limits and human support.
6. Show reviewed immediate-help guidance for urgent/safety concerns; do not depend solely on model output for that route.
7. Add per-user and overall usage caps, plus a clear unavailable response for provider limits or failure.
8. Allow unsafe-response reporting and a way to pause AI access while preserving ordinary learning.

Free access has model-specific rate limits; it is not unlimited or a permanent cost guarantee. Keep full conversations out of routine storage by default. Review Groq's applicable terms, model terms, data retention and minors-related requirements before children use it. Do not assume free access means approved handling of health information. Choose the model at implementation time after evaluation, not by price alone.

## 8. Data access and privacy

| Information | Intended access |
| --- | --- |
| Approved public education | Visitors and participating roles. |
| Private diary | Girl; no routine parent, school or management browsing. |
| Chosen concern message | Girl and verified intended recipient. |
| School invitations/attendance | Authorised staff for that school. |
| Content drafts and review decisions | Approved content managers/reviewers. |
| Combined pilot results | Appropriate school/management users with small-group protections. |
| Privacy requests | Designated authorised staff only. |

Enforce these boundaries for direct requests and saved links, not just visible screens. Treat access, consent history, retention, deletion and exception handling as deliberate requirements. Before live health records, confirm applicable Nigerian privacy/child-protection obligations and vendor data arrangements. Keep health details out of ordinary logs, email and analytics. Explain shared-device and paper-diary limitations honestly.

## 9. Verification before pilot

- Parent and staff cannot read a girl's diary through screens, saved links or altered requests.
- A girl cannot access another girl's records; staff cannot access another school's roster.
- Role changes selected during onboarding cannot grant privileged access.
- Required permissions and invitation status are checked before enabling personal records.
- Wrong pairing, withdrawn invitation and revoked staff access block further unauthorised access.
- Cancelled messages never send; failed saves/sends do not report success.
- Logging out and switching accounts do not reveal previous private content.
- Unreviewed lesson versions are absent from publication and AI sources.
- AI answers meet reviewed educational and safety cases; provider failure leaves support accessible.
- Print-only participants can complete core lessons and reach support.
- Recovery, correction and deletion requests have a documented safe process.

Use fictional records while verifying these behaviours. Professional health/privacy/child-protection review is separate from software testing.

## 10. Budget and operating readiness

Development begins locally with fictional data. Free plans may help, but calculate hosting, database, domain, email, AI, backups, printing and professional-review costs before promising the live pilot. Set limits and a spending review trigger. Confirm recovery/backups and incident responsibilities before storing real records.

The school, reviewer, female support contact/backup, healthcare route and funding remain outstanding. No provider choice creates WHO certification or resolves these responsibilities.

## 11. First-build exclusions

No native mobile app, SMS/WhatsApp integration, payments, peer feed, full chat, automatic health alerts, diagnosis, fertility prediction or diary-powered AI. These are not necessary for the agreed first education pilot.

## 12. Review and next step

The founder has selected Better Auth, Groq and Resend. Next.js/TypeScript and Tailwind remain recommended foundations. PostgreSQL host, final website host, child-account recovery approach and Groq model need implementation review. Inspect existing GroomingHer work before building Stage 1.

Implement the proposed landing-page copy in PRD 3.1 for preview. The founder will decide wording changes after seeing the experience. Preview approval does not replace professional approval of health/privacy/support statements.

## References

Provider documentation checked during planning on 6 October 2026; account-specific limits and current requirements must be rechecked before live use.

- Better Auth installation/database: https://better-auth.com/docs/installation
- Better Auth email: https://better-auth.com/docs/concepts/email
- Resend and Better Auth: https://resend.com/better-auth
- Resend free-plan allowance: https://resend.com/blog/new-free-tier
- Resend pricing: https://resend.com/pricing
- Groq rate limits: https://console.groq.com/docs/rate-limits
- Supabase database access rules: https://supabase.com/docs/guides/database/postgres/row-level-security
- Next.js application documentation: https://nextjs.org/docs/app
