import { notFound } from "next/navigation";
import Link from "next/link";
import { lessons } from "@/lib/content";
import { PageIntro, ReviewNotice } from "@/components/Public";
import PrintButton from "@/components/PrintButton";
export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      lessons.find((l) => l.slug === slug)?.title ?? "Resource unavailable",
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = lessons.find((l) => l.slug === slug);
  if (!l) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`${l.topic} · Week ${l.week} · Sample`}
        title={l.title}
        text={l.summary}
      />
      <article className="container content-section">
        <div className="prose">
          <Link className="back-link" href="/resources">
            ← Back to Learning Resources
          </Link>
          <ReviewNotice />
          <p className="print-note">
            GroomingHer · Sample v0.1 · 6 October 2026 · Not approved for
            teaching or clinical use.
          </p>
          <p className="eyebrow">What this lesson explores</p>
          <p>{l.objective}</p>
          <h2>A little understanding</h2>
          {l.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <aside className="faith-panel" style={{ marginTop: 30 }}>
            <p className="eyebrow">
              Christian reflection · Separate from health explanation
            </p>
            <p>{l.reflection}</p>
            <small>Sample reflection awaiting separate faith review.</small>
          </aside>
          <h2>A fictional activity</h2>
          <p>{l.action}</p>
          <p>
            You can skip this activity. No personal health information is
            needed.
          </p>
          <h2>Your next step</h2>
          <p>
            Revisit the sample with a caring adult. For a personal health
            concern, speak to a qualified healthcare professional. For urgent
            help, seek a safe adult or local emergency service immediately; do
            not wait for an app reply.
          </p>
          <div className="source-note">
            <strong>Content and review record</strong>
            <p>
              Sample version 0.1 · prepared 6 October 2026. Health reviewer: not
              assigned. Approval date: none. Not approved for use with children.
            </p>
            <p>
              Reference for review:{" "}
              <a
                className="text-link"
                href="https://www.who.int/health-topics/adolescent-health"
                target="_blank"
                rel="noreferrer"
              >
                WHO adolescent health ↗
              </a>
              . A healthcare reviewer must select topic-specific sources and
              approve this exact lesson version.
            </p>
          </div>
          <PrintButton />
          <h3>Related learning</h3>
          {lessons
            .filter((x) => x.slug !== slug)
            .slice(0, 2)
            .map((x) => (
              <div key={x.slug}>
                <Link className="text-link" href={`/resources/${x.slug}`}>
                  {x.title} →
                </Link>
              </div>
            ))}
          <div className="actions">
            <Link href="/support" className="button secondary">
              Get Support
            </Link>
            <Link href="/contact" className="text-link">
              Report a content concern →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
