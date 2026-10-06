import Link from "next/link";
import { LearningIllustration, Icon } from "@/components/Icons";
import {
  SectionHeading,
  ResourceCards,
  FaqList,
  FaithReflection,
} from "@/components/Public";
const audiences = [
  {
    name: "Girls",
    icon: "flower",
    label: "A space to learn and grow",
    body: "Explore body changes, periods, hygiene and healthy boundaries. Keep an optional private diary and choose when to ask a trusted adult for support.",
    href: "/solutions/girls",
    action: "Explore for Girls",
    color: "lavender",
  },
  {
    name: "Parents & Guardians",
    icon: "people",
    label: "Support her with understanding",
    body: "Find practical guides and thoughtful conversation starters. Receive the concerns she chooses to share, while respecting her private learning space.",
    href: "/solutions/parents",
    action: "Explore for Parents",
    color: "peach",
  },
  {
    name: "Schools",
    icon: "school",
    label: "Bring caring education into school",
    body: "Explore a proposed six-week programme with guided lessons, printed materials and clear support responsibilities.",
    href: "/solutions/schools",
    action: "Explore for Schools",
    color: "sage",
  },
];
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" />
            Knowledge for growing. Care for every step.
          </p>
          <h1>
            Growing in
            <br />
            knowledge.
            <br />
            <em>Grounded in faith.</em>
          </h1>
          <p className="hero-description">
            Christian health education helping Nigerian girls aged{" "}
            <strong>13–15</strong> understand their changing bodies, ask
            questions with confidence and find support—with parents and schools
            alongside them.
          </p>
          <div className="actions">
            <Link className="button primary" href="/get-started">
              Get Started <Icon name="arrow" size={19} />
            </Link>
            <Link className="button secondary" href="/resources">
              Explore Resources <Icon name="book" size={19} />
            </Link>
          </div>
          <p className="hero-note">
            <Icon name="heart" size={17} />
            Know your body. Honour your worth. Grow with confidence.
          </p>
        </div>
        <div className="hero-art">
          <div className="art-eyebrow">
            <Icon name="spark" size={16} />A little knowledge. A lot of
            possibility.
          </div>
          <LearningIllustration />
          <div className="hero-art-note">
            Made for girls. With caring adults alongside.
          </div>
        </div>
      </section>
      <section className="why-band">
        <div className="container why-grid">
          <p className="eyebrow">WHY GROOMINGHER</p>
          <h2>
            Growing up comes
            <br />
            with questions.
          </h2>
          <p>
            A changing body can bring new experiences and questions. GroomingHer
            offers clear learning and gentle encouragement, helping girls
            understand more and feel comfortable asking for help.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="A place for each of us"
          title="Different roles. One caring purpose."
          text="Girls at the heart. Families and schools alongside."
        />
        <div className="card-grid">
          {audiences.map((a) => (
            <article className={`audience-card ${a.color}`} key={a.name}>
              <div className="card-top">
                <span className="icon-tile">
                  <Icon name={a.icon} size={27} />
                </span>
                <span className="eyebrow">{a.name}</span>
              </div>
              <h3>{a.label}</h3>
              <p>{a.body}</p>
              <Link className="text-link" href={a.href}>
                {a.action}
                <Icon name="arrow" size={18} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section topics-section">
        <div className="container">
          <SectionHeading
            eyebrow="Small lessons. Lasting understanding."
            title="Understand your changing body."
            text="Puberty, periods, hygiene, boundaries and asking for help—one topic at a time."
          />
          <div className="topic-row">
            {[
              ["flower", "Body changes", "body-changes"],
              ["book", "Periods", "getting-to-know-your-period"],
              ["leaf", "Hygiene & discharge", "hygiene-and-questions"],
              ["shield", "Healthy boundaries", "boundaries-and-trusted-adults"],
              ["heart", "Seeking help", "asking-for-help"],
            ].map(([icon, title, slug]) => (
              <Link
                href={`/resources/${slug}`}
                key={slug}
                className="topic-item"
              >
                <Icon name={icon} size={28} />
                <span>{title}</span>
                <Icon name="arrow" size={17} />
              </Link>
            ))}
          </div>
          <p className="section-note">
            Sample topics and health content await professional review.
          </p>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="How it works"
            title="Learning together, one step at a time."
          />
          <Link href="/how-it-works" className="text-link">
            See How It Works <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="steps-row">
          {[
            "Meet GroomingHer",
            "Understand and agree",
            "Learn together",
            "Revisit and reflect",
            "Ask for support",
          ].map((s, i) => (
            <div key={s}>
              <span className="step-number">0{i + 1}</span>
              <h3>{s}</h3>
              <p>
                {
                  [
                    "A school introduces the programme.",
                    "Family permission and the girl’s own agreement.",
                    "Guided lessons in a supportive school setting.",
                    "Optional home learning and a private diary.",
                    "Choose a safe adult when you need help.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container section faith-section">
        <div>
          <p className="eyebrow">Rooted in compassion</p>
          <h2>
            Faith that encourages.
            <br />
            Learning that empowers.
          </h2>
          <p>
            Our Christian approach encourages dignity, compassion and care for
            the body. Questions are welcome. Needing support is never something
            to be ashamed of.
          </p>
        </div>
        <FaithReflection />
      </section>
      <section className="section privacy-section">
        <div className="container split-section">
          <span className="big-icon">
            <Icon name="lock" size={58} />
          </span>
          <div>
            <p className="eyebrow">Safe learning & privacy</p>
            <h2>Your story deserves care.</h2>
            <p>
              The diary is optional. Girls review and choose the messages they
              send. Connecting an account does not give parents or schools
              access to private diary entries or AI questions.
            </p>
            <p>
              Ask GroomingHer will explain reviewed lessons only. It will not
              read the diary or diagnose a condition. AI is unavailable while
              reviews are pending.
            </p>
            <Link className="text-link" href="/privacy">
              Read About Safety and Privacy <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container split-section offline-section">
        <div>
          <p className="eyebrow">Beyond the screen</p>
          <h2>
            Learning should not depend
            <br />
            on owning a phone.
          </h2>
          <p>
            Guided school sessions and printed lessons help girls take part
            without a personal device. Online lessons offer another way to
            revisit what they learn.
          </p>
          <Link href="/solutions/schools" className="text-link">
            Explore learning at school <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="paper-stack">
          <div className="paper-sheet">
            <Icon name="book" size={35} />
            <p className="eyebrow">GroomingHer · Sample pack</p>
            <h3>
              Understanding my period
              <br />
              and asking for help
            </h3>
            <hr />
            <p>Girl lesson · Parent guide · Facilitator notes</p>
            <span className="review-label">Awaiting professional review</span>
          </div>
        </div>
      </section>
      <section className="section resources-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Learning resources"
              title="Start with a question."
              text="Clear introductions to everyday topics about growing up."
            />
            <Link href="/resources" className="text-link">
              View All Resources <Icon name="arrow" size={18} />
            </Link>
          </div>
          <ResourceCards limit={3} />
        </div>
      </section>
      <section className="container section">
        <div className="school-invitation">
          <div>
            <p className="eyebrow">The first chapter · Planned pilot</p>
            <h2>
              Help shape GroomingHer’s
              <br />
              first school programme.
            </h2>
            <p>
              We are preparing a six-week pilot for girls aged 13–15 at a
              Christian school. School, funding and professional reviews remain
              to be confirmed.
            </p>
          </div>
          <Link className="button cream" href="/solutions/schools#interest">
            Register Your School’s Interest <Icon name="arrow" size={20} />
          </Link>
        </div>
      </section>
      <section className="container section faq-section">
        <div>
          <SectionHeading
            eyebrow="Let’s make things clear"
            title="A few things you may be wondering."
          />
          <Link className="text-link" href="/faqs">
            See all FAQs <Icon name="arrow" size={18} />
          </Link>
        </div>
        <FaqList limit={5} />
      </section>
      <section className="section final-invitation">
        <div className="container">
          <Icon name="flower" size={40} />
          <h2>
            A confident next step
            <br />
            starts with understanding.
          </h2>
          <p>
            Explore learning for girls, guidance for parents and a programme
            schools can help shape.
          </p>
          <div className="actions centered">
            <Link className="button primary" href="/get-started">
              Get Started <Icon name="arrow" size={19} />
            </Link>
            <Link
              href="/solutions/schools#interest"
              className="button secondary"
            >
              Bring GroomingHer to Your School
            </Link>
          </div>
          <p className="section-note">
            Education only. For a personal health concern, speak to a qualified
            healthcare professional.
            <br />
            For urgent help, seek immediate assistance from a safe adult or
            local emergency service; do not wait for a website reply.
          </p>
        </div>
      </section>
    </>
  );
}
