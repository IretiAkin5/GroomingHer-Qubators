import Link from "next/link";
import { Icon } from "./Icons";
import { faqs, lessons, reviewNotice } from "@/lib/content";
export function ReviewNotice() {
  return (
    <div className="review-notice">
      <Icon name="book" size={19} />
      <span>
        {reviewNotice}. Preview for discussion, not personal medical advice.
      </span>
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{text}</p>
        {children}
      </div>
    </section>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function ResourceCards({
  limit,
  topic = "All topics",
}: {
  limit?: number;
  topic?: string;
}) {
  return (
    <div className="card-grid">
      {lessons
        .filter((l) => topic === "All topics" || l.topic === topic)
        .slice(0, limit)
        .map((l) => (
          <Link
            className="resource-card"
            href={`/resources/${l.slug}`}
            key={l.slug}
          >
            <div className={`resource-art art-${l.icon}`}>
              <Icon name={l.icon} size={46} />
              <span className="art-circle" />
            </div>
            <div className="card-body">
              <p className="eyebrow">{l.topic} · 4 min read</p>
              <h3>{l.title}</h3>
              <p>{l.summary}</p>
              <span className="review-label">Sample · review pending</span>
              <span className="text-link">
                Read sample <Icon name="arrow" size={18} />
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}
export function FaqList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Programme() {
  return (
    <div className="programme-grid">
      {lessons.map((l) => (
        <div className="programme-item" key={l.week}>
          <span className="week-number">0{l.week}</span>
          <div>
            <p className="eyebrow">Week {l.week}</p>
            <h3>{l.title}</h3>
            <p>{l.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function FaithReflection() {
  return (
    <aside className="faith-panel">
      <span className="eyebrow">Christian reflection · Psalm 139:14</span>
      <h2>Your worth does not change with your body.</h2>
      <p>
        We are wonderfully made. As your body grows and changes, your dignity
        remains. Caring for yourself includes learning, asking questions and
        accepting help.
      </p>
      <small>
        Original reflection, not a quotation from a Bible translation. Prayer
        accompanies practical care and healthcare.
      </small>
    </aside>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand">
            <Icon size={30} />
            GroomingHer.
          </Link>
          <p>
            Christian health education supporting girls, families and schools
            with knowledge, dignity and care.
          </p>
          <span className="footer-tag">Learning. Faith. Compassion.</span>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/solutions/girls">Girls</Link>
          <Link href="/solutions/parents">Parents and Guardians</Link>
          <Link href="/solutions/schools">Schools</Link>
        </div>
        <div>
          <h3>Learn & connect</h3>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/resources">Learning Resources</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/get-started">Get Started</Link>
          <Link href="/faqs">FAQs</Link>
        </div>
        <div>
          <h3>Care & clarity</h3>
          <Link href="/privacy">Safety and Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/child-safety">Child Safety</Link>
          <Link href="/accessibility">Accessibility Help</Link>
          <Link href="/support">Get Support</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 GroomingHer</span>
        <p>
          Fictional demonstration. Education only, not diagnosis or emergency
          care. No real children’s health information is collected.
        </p>
      </div>
    </footer>
  );
}
