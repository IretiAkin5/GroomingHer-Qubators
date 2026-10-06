"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDemo } from "./DemoProvider";
const templates = [
  "Could we read the period lesson together? I would like to understand it better.",
  "I have a question from our lesson. Could we talk privately when you are available?",
  "Could you help me find a safe adult to ask about our learning topic?",
];
export default function SharingDemo() {
  const demo = useDemo();
  const router = useRouter();
  const [recipient, setRecipient] = useState<"parent" | "support">("parent");
  const [text, setText] = useState<string>(templates[0]);
  const [closing, setClosing] = useState("Thank you for listening.");
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState("");
  const [fail, setFail] = useState(false);
  const exact = `${text} ${closing}`;
  const label =
    recipient === "parent"
      ? "Mrs Adeyemi — fictional connected guardian"
      : "Mrs Bello — fictional school support contact";
  function send() {
    if (demo.paused) {
      setStatus(
        "Sharing is paused. Nothing was shared. Direct human support remains available.",
      );
      return;
    }
    if (fail) {
      setStatus(
        "Demo delivery failed. Nothing was shared. Try a direct safe-adult route; do not wait for an app response.",
      );
      return;
    }
    demo.sendSample(recipient, exact);
    setStatus(
      "Confirmed in this demo only. No real message was sent, delivered or read.",
    );
    setPreview(false);
  }
  return (
    <>
      <div className="space-page-heading">
        <p className="eyebrow">Your words. Your choice.</p>
        <h1>Help Me Tell Someone</h1>
        <p>
          Choose a fictional safe recipient, shape a sample message, then review
          exactly what would be shared.
        </p>
      </div>
      <div className="notice">
        <strong>Nothing is sent automatically.</strong>
        <p>
          This demonstration uses fixed sample phrases and no personal free
          text. No diary or AI history is attached. Real sending requires
          verified accounts and human-support arrangements.
        </p>
      </div>
      {demo.paused && (
        <div className="notice warning">
          Sharing is paused. Resume it in Account & Privacy before confirming
          another sample message.
        </div>
      )}
      <section className="panel sharing-panel">
        {!preview ? (
          <>
            <h2>Choose the words</h2>
            <div className="field">
              <label htmlFor="share-recipient">
                Fictional verified recipient
              </label>
              <select
                id="share-recipient"
                value={recipient}
                onChange={(e) =>
                  setRecipient(e.target.value as "parent" | "support")
                }
              >
                <option value="parent">
                  Mrs Adeyemi — connected guardian (fictional)
                </option>
                <option value="support">
                  Mrs Bello — school support contact (fictional)
                </option>
              </select>
              <small>
                Sample verification only. School contact hours: fictional
                weekday session time; not live availability.
              </small>
            </div>
            <div className="field">
              <label htmlFor="share-text">Sample message</label>
              <select
                id="share-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              >
                {templates.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="share-closing">Edit the sample closing</label>
              <select
                id="share-closing"
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
              >
                <option>Thank you for listening.</option>
                <option>Could we choose a time to talk?</option>
                <option>
                  I would prefer to start with the printed lesson.
                </option>
              </select>
              <small>
                Combine preset phrases to edit the fictional draft without
                entering real health information.
              </small>
            </div>
            <button
              className="button primary"
              disabled={demo.paused}
              onClick={() => {
                setPreview(true);
                setStatus("");
              }}
            >
              Review exact message
            </button>
          </>
        ) : (
          <>
            <p className="eyebrow">
              Final preview — nothing has been shared yet
            </p>
            <h2>Review before you decide.</h2>
            <div className="message-preview">
              <p>
                <strong>To:</strong> {label}
              </p>
              <hr />
              <p className="exact-message">{exact}</p>
              <hr />
              <p className="section-note">
                Attachments: none. No diary entries or private questions are
                included.
              </p>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                checked={fail}
                onChange={(e) => setFail(e.target.checked)}
              />
              Simulate delivery failure
            </label>
            <div className="actions">
              <button
                className="button primary"
                disabled={demo.paused}
                onClick={send}
              >
                Confirm sharing in demo
              </button>
              <button
                className="button secondary"
                onClick={() => {
                  setPreview(false);
                  setStatus("Cancelled. Nothing was shared.");
                }}
              >
                Cancel sharing
              </button>
              <button className="text-button" onClick={() => setPreview(false)}>
                Edit sample draft
              </button>
            </div>
          </>
        )}
      </section>
      <div aria-live="polite">
        {status && (
          <div
            className={`notice ${status.includes("failed") || status.includes("paused") ? "error" : "success"}`}
            style={{ marginTop: 24 }}
          >
            {status}
            {status.startsWith("Confirmed") && (
              <div className="actions">
                <Link className="text-link" href="/demo/girl/messages">
                  See My Shared Messages →
                </Link>
                {recipient === "parent" && (
                  <button
                    className="text-button"
                    onClick={() => {
                      demo.recipientPreview();
                      router.push("/demo/parent/messages");
                    }}
                  >
                    Preview recipient’s Parent space →
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="panel" style={{ marginTop: 24 }}>
        <h3>Need another safe route?</h3>
        <p>
          If the connected adult feels unsafe or is unavailable, choose another
          safe adult or qualified healthcare professional. Urgent help must not
          wait for a message reply.
        </p>
        <Link className="text-link" href="/demo/girl/support">
          Get Support →
        </Link>
      </div>
    </>
  );
}
