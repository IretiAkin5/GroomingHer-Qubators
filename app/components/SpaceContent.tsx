"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type Role, lessons, roleNames, programme } from "@/lib/content";
import { useDemo } from "./DemoProvider";
import { Icon } from "./Icons";
import { ReviewNotice, ResourceCards } from "./Public";
import ResourceLibrary from "./ResourceLibrary";
import DiaryDemo from "./DiaryDemo";
import SharingDemo from "./SharingDemo";
import LessonDemo from "./LessonDemo";
function Heading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="space-page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
function Support({ role }: { role: Role }) {
  return (
    <>
      <Heading
        eyebrow="Human care comes first"
        title="Get Support"
        text="Learning and support do not depend on a diary, AI or completed lessons."
      />
      <div className="notice warning">
        <strong>If you need urgent help, act now.</strong>
        <p>
          Seek immediate assistance from a safe adult or local emergency
          service. Do not wait for an app response. For personal health
          concerns, speak to a qualified healthcare professional.
        </p>
      </div>
      <div className="two-columns">
        <section className="panel">
          <span className="icon-tile">
            <Icon name="people" size={26} />
          </span>
          <h2>School support example</h2>
          <p>
            <strong>Mrs Bello — fictional female contact</strong>
          </p>
          <p>
            Sample hours: weekday guided-session time. No live phone, office or
            verified availability is configured.
          </p>
          <span className="badge pending">Fictional · not a live contact</span>
          <p className="section-note">
            A pilot must verify a trained female contact, available hours,
            backup and healthcare referral route before participation.
          </p>
        </section>
        <section className="panel">
          <span className="icon-tile">
            <Icon name="heart" size={26} />
          </span>
          <h2>Another safe route</h2>
          <p>
            <strong>Mrs Okafor — fictional backup</strong>
          </p>
          <p>
            If one adult feels unsafe or is unavailable, speak to another safe
            adult or qualified healthcare professional. Outside school hours,
            use direct human support.
          </p>
          <p>
            No clinician availability or free care is promised. School-specific
            referral and urgent guidance await professional review.
          </p>
        </section>
      </div>
      <section className="panel" style={{ marginTop: 24 }}>
        <h3>Questions and privacy</h3>
        <p>
          This app is not monitored. A physical anonymous-question box is for
          lesson questions, never urgent help. Sensitive disclosures need
          private follow-up under a reviewed school procedure; they should not
          be read aloud or stored in ordinary programme dashboards.
        </p>
        {role === "girl" && (
          <Link className="text-link" href="/demo/girl/share">
            Explore Help Me Tell Someone →
          </Link>
        )}
        <Link
          className="text-link"
          href="/child-safety"
          style={{ marginLeft: role === "girl" ? 24 : 0 }}
        >
          Child Safety →
        </Link>
      </section>
    </>
  );
}
function Messages({ role }: { role: Role }) {
  const demo = useDemo();
  const messages =
    role === "parent"
      ? demo.messages.filter((m) => m.recipient === "parent")
      : demo.messages;
  return (
    <>
      <Heading
        eyebrow="Individually chosen, never automatic"
        title={role === "girl" ? "My Shared Messages" : "Shared Messages"}
        text={
          role === "girl"
            ? "Review exactly what you confirmed in this fictional demo."
            : "Only the exact messages Ada chose and confirmed for this recipient appear here."
        }
      />
      <div className="notice">
        Demo confirmations are not real sending, delivery, reading or a
        response. No diary or AI history is attached. Follow up directly in the
        planned service.
      </div>
      {messages.length === 0 ? (
        <div className="empty-panel">
          <Icon name="heart" size={32} />
          <h2>No confirmed sample messages.</h2>
          <p>
            {role === "parent"
              ? "That’s okay. Explore a guide without asking for her private records."
              : "Drafts and cancelled messages do not appear here."}
          </p>
          <Link
            className="button secondary"
            href={
              role === "parent" ? "/demo/parent/guides" : "/demo/girl/share"
            }
          >
            {role === "parent"
              ? "Explore Parent Guides"
              : "Help Me Tell Someone"}
          </Link>
        </div>
      ) : (
        messages.map((m) => (
          <article className="panel" key={m.id}>
            <div className="panel-heading">
              <h3>
                {role === "parent"
                  ? "From Ada — fictional learner"
                  : `To ${m.recipient === "parent" ? "Mrs Adeyemi — fictional guardian" : "Mrs Bello — fictional support contact"}`}
              </h3>
              <span className="badge">Demo-confirmed only</span>
            </div>
            <p className="status-line">{m.time} · Lagos time</p>
            <blockquote className="exact-message">{m.text}</blockquote>
            <p className="section-note">
              Attachments: none. No delivery or read receipt; no full chat.
            </p>
            <Link className="text-link" href={`/demo/${role}/support`}>
              Get Support →
            </Link>
          </article>
        ))
      )}
    </>
  );
}
function Account({ role }: { role: Role }) {
  const demo = useDemo();
  const [status, setStatus] = useState("");
  const router = useRouter();
  return (
    <>
      <Heading
        eyebrow="Your choices, clearly explained"
        title="Account & Privacy"
        text="Fictional connections and permissions demonstrate intended boundaries. They are not verified live access."
      />
      <div className="two-columns">
        <section className="panel">
          <h2>Connections</h2>
          <p>
            {role === "girl"
              ? "Ada ↔ Mrs Adeyemi · fictional guardian connection"
              : role === "parent"
                ? "Mrs Adeyemi ↔ Ada · fictional girl connection"
                : "Mrs Bello · fictional Gracefield School coordinator"}
          </p>
          <p>
            Actual invitations, pairing, authority and duties must be verified
            before live accounts. Parents and schools cannot browse diary or AI
            history.
          </p>
          <button
            className="button secondary"
            onClick={() => {
              if (role === "girl") demo.setPaused(true);
              setStatus(
                "Demo connection concern recorded on this screen only. Nothing was sent. New sample sharing is paused for the Girl demo. A live correction route must verify identities before making changes.",
              );
            }}
          >
            Preview wrong-connection report
          </button>
        </section>
        <section className="panel">
          <h2>Separate permissions</h2>
          {role === "parent" && (
            <Link className="text-link" href="/demo/parent/feedback">
              Programme feedback →
            </Link>
          )}
          <p>
            Required participation permission and the girl’s agreement are
            separate from optional diary use and feedback. The onboarding checks
            were simulations, not legal consent.
          </p>
          {role === "girl" && (
            <label className="check-row">
              <input
                type="checkbox"
                checked={demo.paused}
                onChange={(e) => demo.setPaused(e.target.checked)}
              />
              Pause future sample sharing
            </label>
          )}
          <p>
            Pausing new messages cannot promise to remove a copy someone already
            received. Education and support stay available.
          </p>
        </section>
        <section className="panel">
          <h2>Access and recovery</h2>
          <p>
            No live credentials are stored in this preview. Demo role selection
            is a browser-only journey, not authentication. A future guardian
            recovery process must not open a girl’s diary.
          </p>
          <Link className="text-link" href="/recovery">
            Recovery information →
          </Link>
          {role === "school" && (
            <button
              className="button secondary"
              onClick={() => {
                demo.exit();
                router.replace("/demo/school");
              }}
            >
              Simulate staff access withdrawn
            </button>
          )}
        </section>
        <section className="panel">
          <h2>Reset or leave</h2>
          <p>
            Fictional records stay in memory and reset on refresh or exit. The
            selected demo role is stored only as a browser-tab marker.
            Screenshots and browser history can remain on shared devices.
          </p>
          <button
            className="button secondary"
            onClick={() => {
              demo.exit();
              router.replace("/");
            }}
          >
            Reset demo data and exit
          </button>
        </section>
      </div>
      <div aria-live="polite">
        {status && (
          <div className="notice warning" style={{ marginTop: 24 }}>
            {status}
          </div>
        )}
      </div>
    </>
  );
}
function GirlHome() {
  const demo = useDemo();
  const next =
    lessons.find((l) => !demo.completed.includes(l.slug)) ?? lessons[0];
  return (
    <>
      <Heading
        eyebrow="A little learning, at your pace"
        title="Welcome, Ada."
        text="There’s room for your questions. Start with a lesson, revisit a resource or find a caring adult."
      />
      <div className="learning-hero">
        <div>
          <p className="eyebrow">Your next sample lesson · Week {next.week}</p>
          <h2>{next.title}</h2>
          <p>{next.summary}</p>
          <Link
            className="button primary"
            href={`/demo/girl/lessons/${next.slug}`}
          >
            Explore sample lesson
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <span className="lesson-hero-art">
          <Icon name={next.icon} size={80} />
          <span>Learn. Reflect. Grow.</span>
        </span>
      </div>
      <div className="quick-grid">
        <Link href="/demo/girl/resources">
          <Icon name="leaf" size={24} />
          <h3>Follow your curiosity</h3>
          <p>Explore sample learning resources.</p>
          <span className="text-link">Find a topic →</span>
        </Link>
        <Link href="/demo/girl/support">
          <Icon name="heart" size={24} />
          <h3>You can ask for help</h3>
          <p>Human support without a diary or AI.</p>
          <span className="text-link">Get Support →</span>
        </Link>
        <Link href="/demo/girl/diary">
          <Icon name="lock" size={24} />
          <h3>Diary? Your choice.</h3>
          <p>Try a fictional entry or keep learning.</p>
          <span className="text-link">Explore optional diary →</span>
        </Link>
      </div>
      <div className="two-columns">
        <section className="panel">
          <p className="eyebrow">Learning progress</p>
          <h2>{demo.completed.length} of 6 samples explored</h2>
          <div className="step-progress">
            <span style={{ width: `${(demo.completed.length / 6) * 100}%` }} />
          </div>
          <p>One step at a time. No grades, ranking or diary streaks.</p>
          <Link className="text-link" href="/demo/girl/progress">
            My Progress →
          </Link>
        </section>
        <section className="faith-panel">
          <p className="eyebrow">Christian reflection · Psalm 139:14</p>
          <h2>Your worth is constant.</h2>
          <p>
            You are wonderfully made. Asking a question or accepting help is a
            way of caring for yourself.
          </p>
          <small>
            Original sample reflection, awaiting faith review. Prayer
            accompanies practical care.
          </small>
        </section>
      </div>
    </>
  );
}
function GirlLessons() {
  const demo = useDemo();
  return (
    <>
      <Heading
        eyebrow="The six-week learning journey"
        title="My Lessons"
        text="Short explanations, separate Christian reflections and fictional activities. Pause, revisit or skip a check."
      />
      <ReviewNotice />
      <div className="lesson-grid">
        {lessons.map((l) => (
          <Link
            className="lesson-card"
            href={`/demo/girl/lessons/${l.slug}`}
            key={l.slug}
          >
            <div className="lesson-card-top">
              <span className="icon-tile">
                <Icon name={l.icon} size={27} />
              </span>
              <span
                className={`badge ${demo.completed.includes(l.slug) ? "" : "pending"}`}
              >
                {demo.completed.includes(l.slug)
                  ? "Sample explored"
                  : "Ready to explore sample"}
              </span>
            </div>
            <p className="eyebrow">
              Week {l.week} · {l.topic}
            </p>
            <h2>{l.title}</h2>
            <p>{l.summary}</p>
            <span className="text-link">Open sample lesson →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
function Ask() {
  const [selected, setSelected] = useState("");
  const [reported, setReported] = useState(false);
  return (
    <>
      <Heading
        eyebrow="Education helper, not a symptom checker"
        title="Ask GroomingHer"
        text="AI will explain approved lessons only, with a source link. It never reads the diary or diagnoses a condition."
      />
      <div className="notice warning">
        <strong>AI unavailable — professional review comes first.</strong>
        <p>
          No lessons are approved yet. Groq is not connected, no questions are
          sent to an AI service and no personal question entry is enabled.
        </p>
      </div>
      <section className="panel">
        <h2>Preview the question routes</h2>
        <p>
          Choose a fixed example to see the intended education or human-help
          route. These are boundary demonstrations, not AI answers.
        </p>
        <div className="ask-prompts">
          {[
            "Explain the word period from the lesson",
            "Do I have PCOS?",
            "I am in severe pain now",
            "I feel unsafe with an adult",
          ].map((q) => (
            <button
              key={q}
              className="answer-option"
              onClick={() => {
                setSelected(q);
                setReported(false);
              }}
              aria-pressed={selected === q}
            >
              {q}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {selected && (
            <div className="notice">
              <strong>
                {selected.includes("period")
                  ? "Lesson explanation is unavailable pending review."
                  : selected.includes("PCOS")
                    ? "AI cannot determine whether someone has a condition."
                    : "Use immediate human support, not AI."}
              </strong>
              <p>
                {selected.includes("period")
                  ? "Explore the labelled sample period lesson while the exact content version is reviewed. No generated answer is shown."
                  : selected.includes("PCOS")
                    ? "A qualified healthcare professional can assess a personal concern. An approved lesson may explain a term later, but cannot diagnose."
                    : "Seek immediate assistance from a safe adult or local emergency service. If one adult feels unsafe, choose another safe route. Do not wait for an app reply."}
              </p>
              <Link
                className="text-link"
                href={
                  selected.includes("period")
                    ? "/resources/getting-to-know-your-period"
                    : "/demo/girl/support"
                }
              >
                {selected.includes("period")
                  ? "Sample lesson and review record →"
                  : "Get Support →"}
              </Link>
            </div>
          )}
        </div>
        <button className="text-button" onClick={() => setReported(true)}>
          Preview a content concern report
        </button>
        {reported && (
          <p className="status-line" role="status">
            Demo report shown locally only; nothing was submitted. A reviewed,
            staffed report process is required before AI is enabled.
          </p>
        )}
      </section>
      <div className="actions">
        <Link className="button secondary" href="/demo/girl/lessons">
          Keep learning without AI
        </Link>
        <Link className="text-link" href="/demo/girl/support">
          Get Support →
        </Link>
      </div>
    </>
  );
}
function Progress() {
  const demo = useDemo();
  return (
    <>
      <Heading
        eyebrow="Growth, without comparison"
        title="My Progress"
        text={`${demo.completed.length} of 6 sample lessons explored. Optional diary use and skipped checks never affect your access.`}
      />
      <div className="panel">
        <div className="step-progress">
          <span style={{ width: `${(demo.completed.length / 6) * 100}%` }} />
        </div>
        {lessons.map((l) => (
          <div className="progress-item" key={l.slug}>
            <span className="step-number">{l.week}</span>
            <Link href={`/demo/girl/lessons/${l.slug}`}>{l.title}</Link>
            <span className="badge">
              {demo.completed.includes(l.slug)
                ? "Explored"
                : "Not yet explored"}
            </span>
          </div>
        ))}
      </div>
      <Link className="text-link" href="/demo/girl/support">
        Get Support, at any point →
      </Link>
    </>
  );
}
function ParentHome() {
  const demo = useDemo();
  return (
    <>
      <Heading
        eyebrow="A caring adult alongside her"
        title="Support her with understanding."
        text="Welcome, Mrs Adeyemi. Start with a guide, a gentle conversation or the programme overview."
      />
      <div className="learning-hero peach">
        <div>
          <p className="eyebrow">Start with a conversation</p>
          <h2>
            Listen first.
            <br />
            Make room for her questions.
          </h2>
          <p>
            “Is there anything from your lesson you would like us to discuss?”
          </p>
          <Link className="button primary" href="/demo/parent/guides">
            Explore Parent Guides
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <span className="lesson-hero-art">
          <Icon name="people" size={75} />
          <span>Understanding, without pressure.</span>
        </span>
      </div>
      <div className="quick-grid">
        <Link href="/demo/parent/messages">
          <Icon name="heart" size={24} />
          <h3>
            {demo.messages.filter((m) => m.recipient === "parent").length}{" "}
            confirmed sample messages
          </h3>
          <p>Only what Ada chose for this recipient.</p>
          <span className="text-link">Shared Messages →</span>
        </Link>
        <Link href="/demo/parent/programme">
          <Icon name="school" size={24} />
          <h3>Learning together</h3>
          <p>See six topics and take-home activities.</p>
          <span className="text-link">School Programme →</span>
        </Link>
        <Link href="/demo/parent/support">
          <Icon name="people" size={24} />
          <h3>Find human support</h3>
          <p>Understand school and healthcare routes.</p>
          <span className="text-link">Get Support →</span>
        </Link>
      </div>
      <div className="notice">
        <strong>Respecting her private learning space.</strong>
        <p>
          Connecting accounts does not reveal her diary, unshared symptoms or
          private AI questions. No diary metrics or health scores appear here.
        </p>
      </div>
    </>
  );
}
function ParentGuides() {
  const [topic, setTopic] = useState("Listening with care");
  return (
    <>
      <Heading
        eyebrow="Practical understanding, compassionate support"
        title="Parent Guides"
        text="Sample guides and conversation starters. All health guidance awaits professional review; faith reflections are reviewed separately."
      />
      <ReviewNotice />
      <div className="filter-row">
        {[
          "Listening with care",
          "Periods and hygiene",
          "Seeking qualified help",
        ].map((t) => (
          <button
            key={t}
            className="filter-button"
            aria-pressed={topic === t}
            onClick={() => setTopic(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="two-columns">
        <section className="panel">
          <h2>{topic}</h2>
          <p>
            {topic === "Listening with care"
              ? "Begin with curiosity rather than assumptions. Give her room to ask about a lesson, and respect her choice if she is not ready to talk."
              : topic === "Periods and hygiene"
                ? "Use the sample lesson to discuss the vocabulary of periods and menstrual products. Do not infer a diagnosis or demand a diary from her. Individual health questions belong with a qualified healthcare professional."
                : "Listen calmly to a concern. A qualified healthcare professional can assess personal health questions; an app message or lesson is not a diagnosis."}
          </p>
          <h3 className="subheading">A gentle conversation starter</h3>
          <blockquote className="exact-message">
            {topic === "Listening with care"
              ? "“Is there anything from your lesson you would like us to discuss?”"
              : topic === "Periods and hygiene"
                ? "“Would you like us to look at the printed lesson together?”"
                : "“Would it help if I supported you in speaking with a qualified healthcare professional?”"}
          </blockquote>
          <p>
            If she is not ready, let her know she can return later. Do not
            pressure her to show diary entries or explain private questions.
          </p>
          <Link
            className="text-link"
            href={
              topic === "Periods and hygiene"
                ? "/resources/getting-to-know-your-period"
                : "/demo/parent/support"
            }
          >
            {topic === "Periods and hygiene"
              ? "Related sample lesson & review record →"
              : "Get Support →"}
          </Link>
        </section>
        <aside className="faith-panel">
          <p className="eyebrow">Christian reflection · Psalm 139:14</p>
          <h2>Compassion in the everyday.</h2>
          <p>
            An original reflection: recognising her dignity includes listening
            without blame and offering practical help. Periods and illness are
            not impurity, punishment or spiritual failure.
          </p>
          <p>
            Prayer can accompany a conversation and healthcare. It must not
            replace needed medical care.
          </p>
          <small>
            Sample reflection and guide v0.1 · 6 October 2026. Health/faith
            reviewers not assigned. Approval date: none.
          </small>
        </aside>
      </div>
      <div className="actions">
        <Link className="button secondary" href="/sample-pack">
          Sample one-page parent guide / print pack
        </Link>
      </div>
    </>
  );
}
function Programme({ role }: { role: Role }) {
  const demo = useDemo();
  return (
    <>
      <Heading
        eyebrow="Gracefield School · fictional"
        title={role === "school" ? "Sessions" : "School Programme"}
        text="Six weekly topics with optional home learning and printed core materials. Dates are pending unless explicitly shown as fictional draft dates."
      />
      <div className="programme-table">
        {lessons.map((l, i) => (
          <article className="programme-table-row" key={l.slug}>
            <span className="week-number">0{l.week}</span>
            <div>
              <h3>{programme[i]}</h3>
              <p>
                {
                  [
                    "Identify a safe support contact and a backup.",
                    "Practise with fictional entries; diary remains optional.",
                    "Revisit a sample lesson and question prompts.",
                    "Practise a chosen concern message using fictional wording.",
                    "Practise respectful choices and asking for help.",
                    "Revisit fictional checks; give optional programme feedback.",
                  ][i]
                }
              </p>
              <span className="status-line">
                Facilitator: Mrs Bello (fictional) · 30–45 min proposed
              </span>
            </div>
            <div>
              {role === "school" ? (
                <label className="field">
                  <span>Week {l.week} sample date</span>
                  <select
                    aria-label={`Week ${l.week} sample date`}
                    value={demo.dates[i]}
                    onChange={(e) => demo.setDate(i, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>
                      {new Date(
                        Date.UTC(2026, 9, 12 + i * 7),
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Africa/Lagos",
                      }) + " (fictional draft)"}
                    </option>
                  </select>
                </label>
              ) : (
                <span className="badge pending">{demo.dates[i]}</span>
              )}
            </div>
          </article>
        ))}
      </div>
      {role === "school" && (
        <div className="notice" style={{ marginTop: 24 }}>
          Draft schedule choices update this in-memory demonstration’s Parent
          programme view. No dates are published or emailed. Dates, staff and
          programme readiness need confirmation.
        </div>
      )}
      <div className="actions">
        <Link className="button secondary" href="/sample-pack">
          Explore sample print pack
        </Link>
        <Link className="text-link" href={`/demo/${role}/support`}>
          School support information →
        </Link>
      </div>
    </>
  );
}
const readiness = [
  "Healthcare content review",
  "Christian reflection review",
  "Child-protection and privacy review",
  "School participation and funding",
  "Female support contact, hours and backup",
  "Qualified healthcare referral route",
  "Family permission and girl agreement",
];
function SchoolHome() {
  return (
    <>
      <Heading
        eyebrow="School programme · fictional staff"
        title="Prepare a thoughtful first chapter."
        text="Welcome, Mrs Bello. Coordinate learning, practical access and the people who make a programme safe."
      />
      <div className="learning-hero sage">
        <div>
          <p className="eyebrow">Proposed six-week pilot</p>
          <h2>
            Education first.
            <br />
            Readiness before participation.
          </h2>
          <p>
            Gracefield School is fictional. No school approval, funding, content
            review or live support arrangement is implied.
          </p>
          <Link className="button primary" href="/demo/school/sessions">
            Explore the six sessions
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <span className="lesson-hero-art">
          <Icon name="school" size={78} />
          <span>A programme, not a health dashboard.</span>
        </span>
      </div>
      <div className="two-columns">
        <section className="panel">
          <div className="panel-heading">
            <h2>Readiness checklist</h2>
            <span className="badge pending">Not ready</span>
          </div>
          {readiness.map((t) => (
            <div className="readiness-item" key={t}>
              <span className="pending-circle" />
              <span>{t}</span>
              <span className="badge pending">Pending</span>
            </div>
          ))}
          <p className="section-note">
            Required items cannot be completed by clicking through a demo. There
            is no “approve pilot” action.
          </p>
        </section>
        <aside>
          <section className="panel">
            <p className="eyebrow">Proposed responsibilities</p>
            <h3>Named people. Clear duties.</h3>
            <p>
              Mrs Bello — fictional programme coordinator. Facilitator and
              trained female support duties need suitability checks. A backup
              and qualified healthcare route are not confirmed.
            </p>
            <Link className="text-link" href="/demo/school/support">
              Review support requirements →
            </Link>
          </section>
          <section className="panel">
            <p className="eyebrow">Access for every learner</p>
            <h3>Print is part of the programme.</h3>
            <p>
              Girls can participate in core learning without phones. Personal
              diary use is not tracked, collected or graded.
            </p>
            <Link className="text-link" href="/demo/school/materials">
              Find sample materials →
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
function Materials() {
  return (
    <>
      <Heading
        eyebrow="Learn on screen, or on paper"
        title="Materials"
        text="A sample pack for product review. No material is approved for use with children yet."
      />
      <ReviewNotice />
      <div className="lesson-grid">
        {[
          [
            "book",
            "Girl lesson",
            "Understanding my period and asking for help",
          ],
          [
            "people",
            "Parent guide",
            "Listening, respectful conversations and practical support",
          ],
          [
            "school",
            "Facilitator notes",
            "Objectives, a fictional activity and question-box guidance",
          ],
          [
            "lock",
            "Blank diary example",
            "Optional, private and never collected or graded",
          ],
        ].map(([icon, title, desc]) => (
          <article className="lesson-card" key={title}>
            <span className="icon-tile">
              <Icon name={icon} size={26} />
            </span>
            <h2>{title}</h2>
            <p>{desc}</p>
            <p className="status-line">
              Sample v0.1 · 6 October 2026 · health/faith review pending
            </p>
            <Link
              className="text-link"
              href={`/sample-pack${title === "Blank diary example" ? "#blank-diary" : ""}`}
            >
              Open sample / print to PDF →
            </Link>
          </article>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 24 }}>
        <h2>Anonymous-question guidance</h2>
        <p>
          A physical question box is for general lesson questions, not urgent
          concerns. Do not request names or health histories. A trained
          facilitator must review suitable questions at a stated time;
          identifying personal disclosures must not be read aloud.
        </p>
        <p>
          Before a pilot, a reviewed child-protection procedure must define
          private follow-up and immediate human-help routes. There is no
          unstaffed digital question queue in this preview.
        </p>
      </div>
    </>
  );
}
function Participation() {
  const [attendance, setAttendance] = useState([
    "Present",
    "Present",
    "Not recorded",
  ]);
  const [status, setStatus] = useState("");
  const [fail, setFail] = useState(false);
  const rows = [
    ["Ada", "Accepted (fictional)", "Complete (sample)"],
    ["Bisi", "Accepted (fictional)", "Complete (sample)"],
    ["Zainab", "Pending (fictional)", "Pending"],
  ];
  return (
    <>
      <Heading
        eyebrow="Participation, not health monitoring"
        title="Participation & attendance"
        text="Minimal fictional joining and attendance information. No diary use, symptoms or health-related absence reasons are recorded."
      />
      <div className="panel">
        <div className="panel-heading">
          <h2>Fictional Week 1 roster</h2>
          <span className="badge">
            {attendance.filter((x) => x === "Present").length} / 3 present ·
            sample
          </span>
        </div>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">
              Fictional invitations, required permission and attendance
            </caption>
            <thead>
              <tr>
                <th scope="col">Learner</th>
                <th scope="col">Invitation</th>
                <th scope="col">Required steps</th>
                <th scope="col">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([name, inv, perm], i) => (
                <tr key={name}>
                  <th scope="row">
                    {name} <span className="small-text">(fictional)</span>
                  </th>
                  <td>{inv}</td>
                  <td>{perm}</td>
                  <td>
                    <select
                      aria-label={`${name} sample attendance`}
                      value={attendance[i]}
                      onChange={(e) => {
                        setAttendance((xs) =>
                          xs.map((x, j) => (i === j ? e.target.value : x)),
                        );
                        setStatus(
                          "Fictional attendance updated in this screen only. No health reason is requested.",
                        );
                      }}
                    >
                      <option>Not recorded</option>
                      <option>Present</option>
                      <option>Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <label className="check-row">
          <input
            type="checkbox"
            checked={fail}
            onChange={(e) => setFail(e.target.checked)}
          />
          Simulate invitation resend failure
        </label>
        <button
          className="button secondary"
          onClick={() =>
            setStatus(
              fail
                ? "Demo resend failed. No invitation was sent. A verified contact route is needed for live support."
                : "Resend preview only. No invitation or email was sent; the fictional pending status is unchanged.",
            )
          }
        >
          Preview pending invitation resend
        </button>
        <p className="section-note">
          Only approved named staff will have school-specific access in the live
          service. Optional diary use stays private.
        </p>
        <div aria-live="polite">
          {status && (
            <div className="notice" style={{ marginTop: 20 }}>
              {status}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function Feedback({ role }: { role: Role }) {
  const [small, setSmall] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [fail, setFail] = useState(false);
  return (
    <>
      <Heading
        eyebrow="Understanding and confidence"
        title={
          role === "school" ? "Feedback & group learning" : "Programme feedback"
        }
        text="Combined education feedback, never individual health records. These figures and responses are fictional examples."
      />
      {role === "school" && (
        <section className="panel">
          <h2>Fictional group results</h2>
          <label className="check-row">
            <input
              type="checkbox"
              checked={small}
              onChange={(e) => setSmall(e.target.checked)}
            />
            Preview a small group with only 3 responses
          </label>
          {small ? (
            <div className="notice warning">
              Results withheld: this fictional group is too small. No individual
              or identifying combinations are shown.
            </div>
          ) : (
            <div className="metric-grid">
              <div>
                <strong>12 / 15</strong>
                <span>Fictional respondents identify a safe support route</span>
              </div>
              <div>
                <strong>11 / 15</strong>
                <span>Fictional respondents feel more confident asking</span>
              </div>
              <div>
                <strong>15 / 18</strong>
                <span>Fictional response count / invited participants</span>
              </div>
            </div>
          )}
          <p className="section-note">
            Example small-group rule: withhold results for fewer than 5
            responses; the live privacy threshold needs professional approval.
            These samples do not establish clinical benefit or actual pilot
            outcomes.
          </p>
        </section>
      )}
      <form
        className="panel"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        style={{ marginTop: 24 }}
      >
        <h2>Preview a programme comment</h2>
        <div className="field">
          <label htmlFor="feedback-topic">Feedback category</label>
          <select id="feedback-topic">
            <option>Content clarity</option>
            <option>Access and printing</option>
            <option>Session scheduling</option>
            <option>Programme suggestions</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="feedback-sample">Fictional feedback</label>
          <select id="feedback-sample">
            <option>
              The printed sample could use more space for reading.
            </option>
            <option>The demonstration navigation was clear.</option>
            <option>The sample session timing needs discussion.</option>
          </select>
          <small>
            No free text, health details or child records are accepted.
          </small>
        </div>
        <label className="check-row">
          <input
            type="checkbox"
            checked={fail}
            onChange={(e) => setFail(e.target.checked)}
          />
          Simulate a feedback submission failure
        </label>
        <button className="button primary" type="submit">
          Preview feedback submission
        </button>
        <div aria-live="polite">
          {submitted && (
            <div
              className={`notice ${fail ? "error" : "success"}`}
              style={{ marginTop: 20 }}
            >
              {fail
                ? "Demo feedback failed. Nothing was submitted. Use the public information pages while live contact routes are prepared."
                : "Demo feedback preview only. No report was sent, stored or published."}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
export default function SpaceContent({
  role,
  section,
}: {
  role: Role;
  section: string[];
}) {
  const page = section[0] ?? "";
  if (page === "support") return <Support role={role} />;
  if (page === "account") return <Account role={role} />;
  if (page === "messages") return <Messages role={role} />;
  if (role === "girl") {
    if (page === "lessons" && section[1])
      return <LessonDemo slug={section[1]} />;
    if (page === "lessons") return <GirlLessons />;
    if (page === "resources")
      return (
        <>
          <Heading
            eyebrow="Follow your curiosity"
            title="Resources"
            text="The same sample content as the public library. No diary entries are needed."
          />
          <ResourceLibrary />
        </>
      );
    if (page === "ask") return <Ask />;
    if (page === "diary") return <DiaryDemo />;
    if (page === "share") return <SharingDemo />;
    if (page === "progress") return <Progress />;
    return <GirlHome />;
  }
  if (role === "parent") {
    if (page === "guides") return <ParentGuides />;
    if (page === "programme") return <Programme role={role} />;
    if (page === "feedback") return <Feedback role={role} />;
    return <ParentHome />;
  }
  if (page === "sessions") return <Programme role={role} />;
  if (page === "materials") return <Materials />;
  if (page === "participation") return <Participation />;
  if (page === "feedback") return <Feedback role={role} />;
  return <SchoolHome />;
}
