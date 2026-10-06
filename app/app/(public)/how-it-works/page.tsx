import Link from "next/link";
import { PageIntro, Programme, SectionHeading } from "@/components/Public";
import { Icon } from "@/components/Icons";
export const metadata = { title: "How it works" };
const steps = [
  [
    "Meet GroomingHer",
    "A participating school introduces the programme to girls and families. Schools complete readiness discussions before staff accounts or sessions are approved.",
  ],
  [
    "Understand and agree",
    "Families receive programme and privacy information. Required guardian permission and the girl’s own agreement are separate from optional diary use and feedback.",
  ],
  [
    "Learn together",
    "Six weekly sessions introduce body changes, periods, hygiene, practical support and boundaries. Facilitators use professionally reviewed materials.",
  ],
  [
    "Revisit and reflect",
    "Girls may revisit lessons at home or use printed materials. A private diary is optional and is not graded or required for learning.",
  ],
  [
    "Ask for support",
    "Girls can approach a safe adult directly or choose a message, review its exact wording and confirm sending. Nothing is shared automatically.",
  ],
];
export default function HowItWorks() {
  return (
    <>
      <PageIntro
        eyebrow="School to home, at your pace"
        title="Learning together, one step at a time."
        text="A planned six-week programme for girls aged 13–15, with families informed and human support at its heart."
      />
      <section className="container content-section">
        <div className="two-columns">
          <div>
            {steps.map(([title, text], i) => (
              <div
                className="programme-item"
                key={title}
                style={{ marginBottom: 18 }}
              >
                <span className="step-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <aside>
            <div className="panel">
              <h2>Participation beyond a phone</h2>
              <p>
                Printed core lessons and guided sessions include girls without
                their own device. Home learning, AI explanations and diary use
                are optional.
              </p>
            </div>
            <div className="panel">
              <h2>Human help, always</h2>
              <p>
                Each pilot school must have a trained female support contact, a
                backup and a route to qualified healthcare. These arrangements
                are not yet confirmed.
              </p>
              <p>
                For urgent help, seek immediate assistance from a safe adult or
                local emergency service. Do not wait for an app or website
                response.
              </p>
              <Link className="text-link" href="/support">
                Get Support
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="The proposed six weeks"
          title="A little learning, each week."
        />
        <Programme />
        <div className="actions">
          <Link className="button primary" href="/get-started">
            Choose your role
          </Link>
          <Link className="button secondary" href="/resources">
            Explore sample resources
          </Link>
        </div>
      </section>
    </>
  );
}
