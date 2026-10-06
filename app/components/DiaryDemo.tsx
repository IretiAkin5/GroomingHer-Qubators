"use client";
import Link from "next/link";
import { useState } from "react";
import { useDemo, type DiaryEntry } from "./DemoProvider";
import { Icon } from "./Icons";
const blank: DiaryEntry = {
  id: "",
  date: "2026-10-01",
  end: "",
  flow: "Not recorded",
  pain: "Not recorded",
  impact: "Not recorded",
  note: "No note selected",
};
export default function DiaryDemo() {
  const demo = useDemo();
  const [editing, setEditing] = useState<DiaryEntry | null>(null);
  const [deleteId, setDeleteId] = useState("");
  const [status, setStatus] = useState("");
  const [fail, setFail] = useState(false);
  function change(p: Partial<DiaryEntry>) {
    setEditing((e) => (e ? { ...e, ...p } : e));
    setStatus("");
  }
  function save() {
    if (!editing) return;
    if (editing.end && editing.end < editing.date) {
      setStatus(
        "The sample end date cannot come before the start date. Please correct it.",
      );
      return;
    }
    if (fail) {
      setStatus(
        "Demo save failed. No entry was saved. Learning and support are still available.",
      );
      return;
    }
    demo.saveEntry({ ...editing, id: editing.id || crypto.randomUUID() });
    setEditing(null);
    setStatus("Fictional entry saved in temporary demo memory only.");
  }
  return (
    <>
      <div className="space-page-heading">
        <p className="eyebrow">Optional. Private. Yours.</p>
        <h1>My Diary</h1>
        <p>
          A place to explore how an optional diary could work. You never need it
          to learn or get support.
        </p>
      </div>
      <div className="notice">
        <strong>
          Fixed fictional examples only — no personal health input.
        </strong>
        <p>
          Choose sample dates and descriptions. Entries stay in temporary
          memory, are not sent to a server and reset on refresh or exit.
          Parents, schools and AI have no diary view. These are demonstration
          boundaries, not live account security.
        </p>
      </div>
      {!editing ? (
        <>
          <div className="actions">
            <button
              className="button primary"
              onClick={() => {
                setEditing({ ...blank });
                setStatus("");
              }}
            >
              Try a fictional entry
              <Icon name="book" size={18} />
            </button>
            <Link className="button secondary" href="/demo/girl/lessons">
              Skip diary and keep learning
            </Link>
          </div>
          <h2 className="subheading">Fictional diary history</h2>
          {demo.entries.length === 0 ? (
            <div className="empty-panel">
              <Icon name="leaf" size={34} />
              <h3>No entries. That’s completely okay.</h3>
              <p>
                Nothing is created automatically. Learning and support are
                always here.
              </p>
            </div>
          ) : (
            <div className="diary-list">
              {demo.entries.map((e) => (
                <article key={e.id} className="panel">
                  <div className="panel-heading">
                    <h3>Sample · {e.date}</h3>
                    <span className="badge">Temporary demo entry</span>
                  </div>
                  <p>
                    {e.end ? `Ends ${e.end} · ` : ""}Flow: {e.flow} · Pain:{" "}
                    {e.pain} · Activity: {e.impact}
                  </p>
                  <p>{e.note}</p>
                  <div className="actions">
                    <button
                      className="button secondary"
                      onClick={() => {
                        setEditing({ ...e });
                        setStatus("");
                      }}
                    >
                      Edit fictional entry
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => setDeleteId(e.id)}
                    >
                      Delete entry
                    </button>
                  </div>
                  {deleteId === e.id && (
                    <div className="notice warning" style={{ marginTop: 20 }}>
                      <strong>Delete this fictional entry?</strong>
                      <p>This removes it from temporary memory.</p>
                      <div className="actions">
                        <button
                          className="button primary"
                          onClick={() => {
                            demo.deleteEntry(e.id);
                            setDeleteId("");
                            setStatus("Fictional entry deleted.");
                          }}
                        >
                          Confirm deletion
                        </button>
                        <button
                          className="button secondary"
                          onClick={() => setDeleteId("")}
                        >
                          Keep entry
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <form
          className="panel diary-form"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <h2>
            {editing.id ? "Edit fictional entry" : "A fictional diary entry"}
          </h2>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="diary-date">Sample period start date</label>
              <select
                id="diary-date"
                value={editing.date}
                onChange={(e) => change({ date: e.target.value })}
              >
                <option>2026-10-01</option>
                <option>2026-10-02</option>
                <option>2026-10-03</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="diary-end">Sample end date (optional)</label>
              <select
                id="diary-end"
                value={editing.end}
                onChange={(e) => change({ end: e.target.value })}
              >
                <option value="">Not recorded</option>
                <option>2026-09-30</option>
                <option>2026-10-04</option>
                <option>2026-10-05</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="diary-flow">Sample flow (optional)</label>
              <select
                id="diary-flow"
                value={editing.flow}
                onChange={(e) => change({ flow: e.target.value })}
              >
                {["Not recorded", "Light", "Medium", "Heavy"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="diary-pain">
                Sample pain description (optional)
              </label>
              <select
                id="diary-pain"
                value={editing.pain}
                onChange={(e) => change({ pain: e.target.value })}
              >
                {["Not recorded", "None", "Mild", "Noticeable"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="diary-impact">
              Sample daily-activity impact (optional)
            </label>
            <select
              id="diary-impact"
              value={editing.impact}
              onChange={(e) => change({ impact: e.target.value })}
            >
              {[
                "Not recorded",
                "Usual activities",
                "Took a rest in the fictional scenario",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="diary-note">Fictional note (optional)</label>
            <select
              id="diary-note"
              value={editing.note}
              onChange={(e) => change({ note: e.target.value })}
            >
              <option>No note selected</option>
              <option>Sample: Ada made time for a quiet rest.</option>
              <option>Sample: Ada asked an adult about the lesson.</option>
            </select>
            <small>
              No free text is accepted. Personal symptoms or health information
              cannot be entered.
            </small>
          </div>
          <label className="check-row">
            <input
              type="checkbox"
              checked={fail}
              onChange={(e) => setFail(e.target.checked)}
            />
            Simulate a save failure
          </label>
          <div className="actions">
            <button className="button primary" type="submit">
              Save fictional entry
            </button>
            <button
              className="button secondary"
              type="button"
              onClick={() => {
                setEditing(null);
                setStatus("Cancelled. No changes saved.");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div aria-live="polite">
        {status && (
          <div
            className={`notice ${status.includes("cannot") || status.includes("failed") ? "error" : "success"}`}
            style={{ marginTop: 24 }}
          >
            {status}
          </div>
        )}
      </div>
      <div className="actions">
        <Link className="text-link" href="/demo/girl/support">
          Get Support →
        </Link>
        <Link className="text-link" href="/demo/girl/share">
          Help Me Tell Someone →
        </Link>
      </div>
    </>
  );
}
