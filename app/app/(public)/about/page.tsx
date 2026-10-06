import Link from "next/link";
import type { Metadata } from "next";
import {
  PageIntro,
  FaithReflection,
  SectionHeading,
} from "@/components/Public";
import { Icon } from "@/components/Icons";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="Our purpose"
        title="Knowledge, dignity and care. For her."
        text="GroomingHer helps girls understand their changing bodies, ask questions with confidence and know when to seek support."
      />
      <section className="container content-section two-columns">
        <div className="prose">
          <p className="eyebrow">A founder’s purpose</p>
          <h2>Making room for questions.</h2>
          <p>
            GroomingHer is founded by <strong>Ireti Ogunmola</strong>. Her
            purpose is to create a respectful, Christian health education
            experience for Nigerian girls, with caring adults alongside them.
          </p>
          <p>
            The first audience is girls aged 13–15, including girls who have not
            started menstruating. Parents and guardians have their own learning
            space. Authorised school staff help deliver guided sessions.
          </p>
          <h2>Education comes first.</h2>
          <p>
            We aim to improve understanding, confidence and help-seeking. We do
            not diagnose illness or promise to prevent future reproductive
            conditions.
          </p>
          <p>
            Health explanations will be professionally reviewed. Christian
            reflections will be reviewed separately and clearly distinguished
            from medical information. No healthcare reviewer, school partner or
            funding is confirmed yet.
          </p>
          <h2>A place beyond a phone.</h2>
          <p>
            School sessions and printed learning make core participation
            possible without a personal device. Online access is another way to
            revisit a lesson, not a condition of belonging.
          </p>
          <div className="actions">
            <Link className="button primary" href="/get-started">
              Get Started
              <Icon name="arrow" size={18} />
            </Link>
            <Link className="button secondary" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <FaithReflection />
          <div className="panel" style={{ marginTop: 24 }}>
            <SectionHeading
              eyebrow="Where we are"
              title="A first chapter, thoughtfully prepared."
            />
            <p>
              This is a fictional demonstration. The planned six-week pilot
              needs a suitable Christian school, funding, reviewed materials and
              verified human-support arrangements before participation begins.
            </p>
            <p>
              We aim to use relevant WHO guidance to inform our approach.
              GroomingHer is not WHO approved or certified.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
