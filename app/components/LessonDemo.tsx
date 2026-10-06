"use client";
import Link from "next/link";
import { useState } from "react";
import { lessons } from "@/lib/content";
import { useDemo } from "./DemoProvider";
import { ReviewNotice } from "./Public";
import PrintButton from "./PrintButton";
export default function LessonDemo({ slug }: { slug: string }) {
  const l = lessons.find((x) => x.slug === slug)!;
  const demo = useDemo();
  const [answer, setAnswer] = useState<string | null>(null);
  return (
    <>
      <Link className="back-link" href="/demo/girl/lessons">
        ← My Lessons
      </Link>
      <div className="space-page-heading">
        <p className="eyebrow">
          Week {l.week} · {l.topic}
        </p>
        <h1>{l.title}</h1>
        <p>{l.objective}</p>
      </div>
      <ReviewNotice />
      <article className="lesson-layout">
        <section className="panel lesson-prose">
          <h2>A little understanding</h2>
          {l.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <aside className="faith-panel">
            <p className="eyebrow">
              Christian reflection · Separate from health explanation
            </p>
            <p>{l.reflection}</p>
            <small>Sample reflection awaiting faith review.</small>
          </aside>
          <h2>A fictional activity</h2>
          <p>{l.action}</p>
          <div className="learning-check">
            <h3>Ada has a question from her lesson. What could she do?</h3>
            <p>No grades and no personal disclosure. You can retry or skip.</p>
            <div className="check-options">
              {[
                ["safe", "Ask a safe adult and keep a backup route"],
                ["required", "Wait until she has filled in a diary"],
                ["share", "Share her whole diary automatically"],
              ].map(([value, label]) => (
                <button
                  className="answer-option"
                  aria-pressed={answer === value}
                  key={value}
                  onClick={() => setAnswer(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div aria-live="polite">
              {answer && (
                <div
                  className={`notice ${answer === "safe" ? "success" : "warning"}`}
                >
                  {answer === "safe"
                    ? "That’s a thoughtful choice. Help is available without a diary, and a backup adult can be useful."
                    : "Try again when you’re ready. A diary is optional and nothing is shared automatically. She can approach a safe adult directly."}
                </div>
              )}
            </div>
            <div className="actions">
              <button className="text-button" onClick={() => setAnswer(null)}>
                Retry
              </button>
              <button className="text-button" onClick={() => setAnswer("safe")}>
                Skip check and see explanation
              </button>
            </div>
          </div>
          <div className="actions">
            <button
              className="button primary"
              onClick={() => demo.complete(l.slug)}
              disabled={demo.completed.includes(l.slug)}
            >
              {demo.completed.includes(l.slug)
                ? "Sample lesson explored"
                : "Mark sample lesson explored"}
            </button>
            <Link className="button secondary" href="/demo/girl/support">
              Get Support
            </Link>
          </div>
          <p className="section-note">
            Demo progress reflects learning only. No school grade, diary streak
            or health score.
          </p>
        </section>
        <aside>
          <section className="panel">
            <p className="eyebrow">Sample record</p>
            <h3>Review before teaching.</h3>
            <p>
              Version 0.1 · 6 October 2026. Health reviewer not assigned. No
              approval date. Topic-specific sources and care guidance need
              professional review.
            </p>
            <Link className="text-link" href={`/resources/${l.slug}`}>
              Public sample & source record →
            </Link>
            <PrintButton />
          </section>
          <section className="panel">
            <h3>A little more help?</h3>
            <p>
              AI is unavailable while reviews are pending. Your ordinary
              learning and human-support routes remain open.
            </p>
            <Link className="text-link" href="/demo/girl/ask">
              Ask GroomingHer →
            </Link>
          </section>
        </aside>
      </article>
    </>
  );
}
