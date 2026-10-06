import { lessons } from "@/lib/content";
import { PageIntro, ReviewNotice } from "@/components/Public";
import PrintButton from "@/components/PrintButton";
export const metadata = { title: "Sample lesson pack" };
export default function Pack() {
  const l = lessons[1];
  return (
    <>
      <PageIntro
        eyebrow="Sample learning pack · v0.1 · 6 October 2026"
        title="Understanding my period and asking for help"
        text="Girl lesson, facilitator notes and a parent guide. Draft for product review, not approved for teaching children."
      />
      <article className="container content-section print-pack">
        <ReviewNotice />
        <PrintButton />
        <section className="prose">
          <h2>Girl lesson</h2>
          <p>
            <strong>Objective:</strong> {l.objective}
          </p>
          {l.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>Christian reflection — Psalm 139:14</h3>
          <p>{l.reflection}</p>
          <p>
            This is an original reflection, not a translation quotation. Faith
            review is pending.
          </p>
          <h3>Fictional activity</h3>
          <p>{l.action} No personal disclosure is required; you can skip.</p>
          <h3>Support beyond an app</h3>
          <p>
            For personal health concerns, speak to a qualified healthcare
            professional. For urgent help, seek immediate assistance from a safe
            adult or local emergency service. Do not wait for a website reply.
            School contacts, hours, backup and referral routes must be verified
            before delivery.
          </p>
        </section>
        <section className="prose print-page">
          <h2>Facilitator notes</h2>
          <p>
            <strong>Proposed session:</strong> 30–45 minutes, adapted to the
            school timetable.
          </p>
          <ol>
            <li>
              Explain the sample objective and distinguish health explanation
              from Christian reflection.
            </li>
            <li>
              Read the reviewed version with the group only after approval.
              Invite general lesson questions without requesting personal
              histories.
            </li>
            <li>
              Use Ada’s fictional scenario. Allow girls to skip the activity; no
              diary is collected or graded.
            </li>
            <li>
              Offer a physical anonymous-question box for general learning, not
              emergency support. Do not read identifying disclosures aloud.
            </li>
            <li>
              Use a professionally reviewed private follow-up and
              child-protection procedure. Verify a female contact, backup and
              healthcare route first.
            </li>
          </ol>
        </section>
        <section className="prose print-page">
          <h2>One-page parent guide</h2>
          <p>
            Start by listening without blame. Ask: “Would you like us to look at
            the lesson together?” If she is not ready, leave the door open.
          </p>
          <p>
            Learning does not require a diary. An account connection does not
            let you read private entries or AI questions. Receive only what she
            chooses and confirms.
          </p>
          <p>
            Support her in seeking appropriate qualified care for personal
            health concerns. Prayer can accompany practical support; it does not
            replace healthcare.
          </p>
          <h3>Christian reflection</h3>
          <p>
            An original reflection on Psalm 139:14: her dignity remains as she
            grows. Responding with compassion means respecting her choices and
            offering practical care.
          </p>
        </section>
        <section className="prose print-page" id="blank-diary">
          <h2>Optional blank diary example</h2>
          <p>
            For layout review only. Do not use this unapproved sample to collect
            real children’s health information. A future paper diary is private,
            optional and never collected or graded by default.
          </p>
          <table className="blank-diary">
            <thead>
              <tr>
                <th>Date</th>
                <th>Chosen details (optional)</th>
                <th>Private note (optional)</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Paper can be seen by others. If keeping a private diary is unsafe,
            choose education without tracking.
          </p>
        </section>
        <div className="source-note">
          <strong>Review record</strong>
          <p>
            Sample version 0.1 · 6 October 2026. Health, faith and
            child-protection reviewers not assigned; no approval date.
            Topic-specific sources, care guidance and local support details need
            professional review before use.
          </p>
        </div>
      </article>
    </>
  );
}
