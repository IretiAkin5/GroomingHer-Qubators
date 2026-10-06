"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { roleNames, type Role } from "@/lib/content";
import { useDemo } from "./DemoProvider";
import { Icon } from "./Icons";
type Draft = {
  step: number;
  invitation: string;
  age: string;
  relationship: string;
  topics: string[];
  device: string;
  permission: boolean;
  agreement: boolean;
  connection: string;
  confirmed: boolean;
};
const initial: Draft = {
  step: 0,
  invitation: "valid",
  age: "14",
  relationship: "Parent",
  topics: [],
  device: "Not sure",
  permission: false,
  agreement: false,
  connection: "correct",
  confirmed: false,
};
const stepNames = [
  "Invitation",
  "A little about this role",
  "Learning preferences",
  "Permissions",
  "Connection",
  "Welcome",
];
export default function Onboarding({ role }: { role: Role }) {
  const [d, setD] = useState<Draft>(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const demo = useDemo();
  const key = `groomingher-onboarding-${role}`;
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Number.isInteger(parsed.step) &&
          parsed.step >= 0 &&
          parsed.step <= 5
        )
          setD({ ...initial, ...parsed });
      }
    } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready)
      try {
        sessionStorage.setItem(key, JSON.stringify(d));
      } catch {}
  }, [ready, key, d]);
  function update(fields: Partial<Draft>) {
    setD((prev) => ({ ...prev, ...fields }));
    setError("");
  }
  function next() {
    setError("");
    if (d.step === 0 && d.invitation !== "valid") {
      setError(
        "This sample invitation is invalid or withdrawn. No connection was made. Explore public resources or get help.",
      );
      return;
    }
    if (
      d.step === 1 &&
      role === "girl" &&
      !["13", "14", "15"].includes(d.age)
    ) {
      setError(
        "The planned first pilot is for ages 13–15. Public learning remains available; no pilot account will be activated.",
      );
      return;
    }
    if (
      d.step === 1 &&
      role === "parent" &&
      d.relationship === "Other caregiver"
    ) {
      setError(
        "This relationship needs authority verification before a connection. The demo remains unconnected; public resources and support are available.",
      );
      return;
    }
    if (d.step === 3 && (!d.permission || !d.agreement)) {
      setError(
        "Permission steps are pending. Complete each separate sample choice to continue, or explore public learning without joining.",
      );
      return;
    }
    if (d.step === 4 && (d.connection !== "correct" || !d.confirmed)) {
      setError(
        "Connection not confirmed. A wrong or disputed pairing must stay unconnected. No private records have been exposed.",
      );
      return;
    }
    update({ step: d.step + 1 });
  }
  if (!ready)
    return (
      <main className="container section">
        <p>Loading demonstration steps…</p>
      </main>
    );
  return (
    <>
      <header className="onboarding-header container">
        <Link className="brand" href="/">
          <Icon size={28} />
          GroomingHer.
        </Link>
        <Link className="text-link" href="/get-started">
          ← Change role
        </Link>
      </header>
      <div className="demo-strip">
        Fictional onboarding · No live account, permission or connection is
        created
      </div>
      <main className="onboarding-layout container" id="main-content">
        <aside className="onboarding-aside">
          <p className="eyebrow">Your {roleNames[role]} journey</p>
          <h2>
            A thoughtful
            <br />
            first step.
          </h2>
          <p>
            Learn with confidence. Keep your choices separate. There is no need
            to share personal health information.
          </p>
          <ol className="onboarding-steps">
            {stepNames.map((s, i) => (
              <li
                key={s}
                aria-current={d.step === i ? "step" : undefined}
                className={i < d.step ? "done" : i === d.step ? "current" : ""}
              >
                <span>{i < d.step ? "✓" : i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <Link className="text-link" href="/support">
            Get Support →
          </Link>
        </aside>
        <section className="onboarding-card">
          <p className="eyebrow">
            Step {d.step + 1} of 6 · {roleNames[role]}
          </p>
          <div
            className="step-progress"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={1}
            aria-valuemax={6}
            aria-valuenow={d.step + 1}
          >
            <span style={{ width: `${((d.step + 1) / 6) * 100}%` }} />
          </div>
          {d.step === 0 && (
            <>
              <h1>
                {role === "school"
                  ? "An approved staff invitation"
                  : "A welcome, through your school"}
              </h1>
              <p className="lead">
                {role === "school"
                  ? "School interest is not approval. This journey demonstrates a separately approved, named staff invitation."
                  : "In the planned pilot, girls and parents receive invitations through an approved school."}
              </p>
              <div className="notice">
                <strong>Try a fictional invitation.</strong>
                <p>
                  No real school, staff account or family connection is
                  approved. Personal invitation-code entry is disabled.
                </p>
              </div>
              <div className="field">
                <label htmlFor="invitation">Sample invitation</label>
                <select
                  id="invitation"
                  value={d.invitation}
                  onChange={(e) => update({ invitation: e.target.value })}
                >
                  <option value="valid">
                    DEMO-{role.toUpperCase()} — valid fictional invitation
                  </option>
                  <option value="invalid">Invalid sample invitation</option>
                  <option value="withdrawn">Withdrawn sample invitation</option>
                </select>
              </div>
              {role === "school" && (
                <Link href="/solutions/schools#interest" className="text-link">
                  No approved invitation? Preview school interest →
                </Link>
              )}
            </>
          )}
          {d.step === 1 && (
            <>
              <h1>
                {role === "girl"
                  ? "Meet Ada, our fictional learner."
                  : role === "parent"
                    ? "Meet a fictional supporting adult."
                    : "Meet a fictional school team."}
              </h1>
              <p className="lead">
                Use the supplied fictional details to explore. No real names or
                health histories are requested.
              </p>
              <div className="field">
                <label htmlFor="sample-name">
                  {role === "girl"
                    ? "Preferred name"
                    : role === "parent"
                      ? "Adult name"
                      : "Staff representative"}
                </label>
                <input
                  id="sample-name"
                  readOnly
                  value={
                    role === "girl"
                      ? "Ada (fictional)"
                      : role === "parent"
                        ? "Mrs Adeyemi (fictional)"
                        : "Mrs Bello — coordinator (fictional)"
                  }
                />
                <small>
                  {role === "girl"
                    ? "A future preferred name is shown in her own space and necessary programme records."
                    : "A future account needs a verified invitation and appropriate authority."}
                </small>
              </div>
              {role === "girl" ? (
                <div className="field">
                  <label htmlFor="age">Sample age</label>
                  <select
                    id="age"
                    value={d.age}
                    onChange={(e) => update({ age: e.target.value })}
                  >
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option value="16">16 — outside first-pilot age</option>
                  </select>
                </div>
              ) : role === "parent" ? (
                <div className="field">
                  <label htmlFor="relationship">Sample relationship</label>
                  <select
                    id="relationship"
                    value={d.relationship}
                    onChange={(e) => update({ relationship: e.target.value })}
                  >
                    <option>Parent</option>
                    <option>Legal guardian</option>
                    <option>Other caregiver</option>
                  </select>
                  <small>
                    The answer alone does not establish permission authority.
                  </small>
                </div>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="sample-school">School</label>
                    <input
                      id="sample-school"
                      readOnly
                      value="Gracefield School — fictional, Ibadan / Oyo"
                    />
                  </div>
                  <p>
                    Named staff accounts will have access based on duties. There
                    is no student health-data upload.
                  </p>
                </>
              )}
            </>
          )}
          {d.step === 2 && (
            <>
              <h1>
                {role === "school"
                  ? "How might sessions work?"
                  : "What would you like to explore?"}
              </h1>
              <p className="lead">
                These learning preferences are optional. Skip them without
                losing learning or support.
              </p>
              <fieldset className="choice-fieldset">
                <legend>
                  {role === "school"
                    ? "Programme priorities"
                    : "Sample learning interests"}
                </legend>
                {(role === "school"
                  ? ["Guided sessions", "Printed lessons", "Parent engagement"]
                  : role === "parent"
                    ? [
                        "Puberty",
                        "Periods and hygiene",
                        "Having conversations",
                        "Knowing when to seek care",
                      ]
                    : [
                        "Body changes",
                        "Periods",
                        "Hygiene and discharge",
                        "Asking for help",
                      ]
                ).map((t) => (
                  <label className="check-row" key={t}>
                    <input
                      type="checkbox"
                      checked={d.topics.includes(t)}
                      onChange={(e) =>
                        update({
                          topics: e.target.checked
                            ? [...d.topics, t]
                            : d.topics.filter((x) => x !== t),
                        })
                      }
                    />
                    {t}
                  </label>
                ))}
              </fieldset>
              <div className="field">
                <label htmlFor="device">
                  Sample access preference (optional)
                </label>
                <select
                  id="device"
                  value={d.device}
                  onChange={(e) => update({ device: e.target.value })}
                >
                  <option>Not sure</option>
                  <option>Own device</option>
                  <option>Shared device</option>
                  <option>School sessions / printed lessons</option>
                </select>
              </div>
              {d.device === "Shared device" && (
                <div className="notice">
                  Sign out after use. Screenshots, browser history and saved
                  credentials can expose information. Choose learning without a
                  diary if private tracking is unsafe.
                </div>
              )}
              {d.device === "School sessions / printed lessons" && (
                <div className="notice">
                  Printed core materials and guided sessions support
                  participation without a personal phone.
                </div>
              )}
            </>
          )}
          {d.step === 3 && (
            <>
              <h1>
                {role === "school"
                  ? "Responsibilities before readiness."
                  : "Understand each choice."}
              </h1>
              <p className="lead">
                {role === "school"
                  ? "A staff invitation does not make a programme ready. Required reviews and human-support arrangements remain outstanding."
                  : "Learning preferences, required participation permission, the girl’s agreement and optional diary use are separate."}
              </p>
              <div className="notice">
                <strong>
                  {role === "girl"
                    ? "Her diary stays private."
                    : role === "parent"
                      ? "A connection does not unlock her diary."
                      : "School staff coordinate learning, not health monitoring."}
                </strong>
                <p>
                  {role === "school"
                    ? "No diaries, private AI questions or parent messages belong in this space."
                    : "Parents and schools cannot browse diaries, unshared symptoms or private AI questions. Each message requires the girl’s confirmation."}
                </p>
              </div>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={d.permission}
                  onChange={(e) => update({ permission: e.target.checked })}
                />
                {role === "girl"
                  ? "Simulate required guardian permission being verified"
                  : role === "parent"
                    ? "Simulate verified authority and required guardian permission"
                    : "Simulate a separately approved named staff invitation"}
              </label>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={d.agreement}
                  onChange={(e) => update({ agreement: e.target.checked })}
                />
                {role === "girl"
                  ? "Simulate Ada’s own agreement to participate"
                  : role === "parent"
                    ? "Acknowledge the girl must separately agree to participate"
                    : "Acknowledge pending content reviews, support contact, backup and funding"}
              </label>
              <p className="section-note">
                Nothing is preselected. These are product-review simulations,
                not legally effective permissions. Optional diary and feedback
                choices are not bundled here.
              </p>
              <Link className="text-link" href="/privacy">
                Read Safety and Privacy →
              </Link>
            </>
          )}
          {d.step === 4 && (
            <>
              <h1>Check the connection.</h1>
              <p className="lead">
                Confirm the intended fictional{" "}
                {role === "girl"
                  ? "guardian"
                  : role === "parent"
                    ? "girl"
                    : "school and staff role"}
                . Wrong connections must not reveal any records.
              </p>
              <div className="field">
                <label htmlFor="connection">Sample connection</label>
                <select
                  id="connection"
                  value={d.connection}
                  onChange={(e) =>
                    update({ connection: e.target.value, confirmed: false })
                  }
                >
                  <option value="correct">
                    {role === "girl"
                      ? "Mrs Adeyemi — fictional guardian"
                      : role === "parent"
                        ? "Ada — fictional learner, Gracefield School"
                        : "Mrs Bello — Gracefield School, programme coordinator (fictional)"}
                  </option>
                  <option value="wrong">
                    Wrong connection — needs correction
                  </option>
                </select>
              </div>
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={d.confirmed}
                  onChange={(e) => update({ confirmed: e.target.checked })}
                />
                Confirm this is the intended fictional connection
              </label>
              <p className="section-note">
                Real accounts will require the agreed verification process from
                both sides. This screen is not identity verification.
              </p>
            </>
          )}
          {d.step === 5 && (
            <>
              <span className="icon-tile">
                <Icon name="check" size={27} />
              </span>
              <h1>You’re ready to explore the demo.</h1>
              <p className="lead">
                {role === "girl"
                  ? "Welcome, Ada. Learning and support come first."
                  : role === "parent"
                    ? "Welcome. Start with a guide and a gentle conversation."
                    : "Welcome. Start with the outstanding readiness tasks."}
              </p>
              <div className="panel summary-panel">
                <p>
                  <strong>Role:</strong> {roleNames[role]} · fictional
                </p>
                <p>
                  <strong>Starting topic:</strong>{" "}
                  {d.topics[0] ?? "Explore the first lesson"}
                </p>
                <p>
                  <strong>Access:</strong> {d.device}
                </p>
                <p>
                  <strong>Diary:</strong> optional; no entry has been created
                </p>
                <p>
                  <strong>Live participation:</strong> unavailable
                </p>
              </div>
              <p className="section-note">
                Sample health content awaits professional review. Demo records
                reset on refresh or exit.
              </p>
            </>
          )}
          <div aria-live="polite">
            {error && (
              <div
                className="notice error"
                role="alert"
                style={{ marginTop: 20 }}
              >
                {error}
                <div>
                  <Link className="text-link" href="/resources">
                    Explore public resources →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="actions onboarding-actions">
            {d.step > 0 && (
              <button
                type="button"
                className="button secondary"
                onClick={() => update({ step: d.step - 1 })}
              >
                Back
              </button>
            )}
            {d.step === 2 && (
              <button
                type="button"
                className="button secondary"
                onClick={() =>
                  update({ topics: [], device: "Not sure", step: 3 })
                }
              >
                Skip preferences
              </button>
            )}
            {d.step < 5 ? (
              <button className="button primary" onClick={next}>
                Continue
                <Icon name="arrow" size={18} />
              </button>
            ) : (
              <button
                className="button primary"
                onClick={() => {
                  demo.start(role);
                  try {
                    sessionStorage.removeItem(key);
                  } catch {}
                  router.push(`/demo/${role}`);
                }}
              >
                Enter {roleNames[role]} demo
                <Icon name="arrow" size={18} />
              </button>
            )}
          </div>
          <Link className="onboarding-public-link" href="/resources">
            Prefer not to join? Public learning is always available.
          </Link>
        </section>
      </main>
    </>
  );
}
