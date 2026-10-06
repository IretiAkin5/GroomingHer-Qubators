import Link from "next/link";
import { PageIntro } from "@/components/Public";
import { Icon } from "@/components/Icons";
export const metadata = { title: "Get Started" };
export default function GetStarted() {
  return (
    <>
      <PageIntro
        eyebrow="Choose your next step"
        title="There’s a place for you here."
        text="Choose Girl, Parent / Guardian or School. Explore a fictional journey before real pilot accounts become available."
      />
      <section className="container content-section">
        <div className="notice">
          <strong>
            Invitations for the planned pilot. Fictional journeys for this
            preview.
          </strong>
          <p>
            Girls and parents will join through approved school invitations.
            Schools register interest first. You can explore public resources
            without an invitation.
          </p>
        </div>
        <div className="card-grid">
          {[
            [
              "girl",
              "flower",
              "Girl",
              "Short lessons, room for questions and optional private reflection.",
            ],
            [
              "parent",
              "people",
              "Parent / Guardian",
              "Learn how to listen, support and respect her privacy.",
            ],
            [
              "school",
              "school",
              "School",
              "Explore guided sessions, print materials and programme readiness.",
            ],
          ].map(([role, icon, title, text]) => (
            <article className="role-card" key={role}>
              <span className="icon-tile">
                <Icon name={icon} size={28} />
              </span>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link
                className="button primary"
                href={
                  role === "school"
                    ? "/solutions/schools#interest"
                    : `/onboarding/${role}`
                }
              >
                {role === "school"
                  ? "Register school interest"
                  : `Explore ${title.toLowerCase()} journey`}
                <Icon name="arrow" size={18} />
              </Link>
              {role === "school" && (
                <Link className="text-link" href="/onboarding/school">
                  Preview fictional staff onboarding →
                </Link>
              )}
            </article>
          ))}
        </div>
        <div className="actions">
          <Link className="button secondary" href="/resources">
            Just explore Learning Resources
          </Link>
          <Link className="text-link" href="/login">
            Returning to a demo? Log In →
          </Link>
        </div>
      </section>
    </>
  );
}
