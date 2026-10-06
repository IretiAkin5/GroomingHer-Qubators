"use client";
import { useState } from "react";
import Link from "next/link";
export default function DemoEnquiry({ school = false }: { school?: boolean }) {
  const [status, setStatus] = useState<"idle" | "preview" | "failed">("idle");
  const [fail, setFail] = useState(false);
  return (
    <form
      className="form-panel"
      id={school ? "interest" : "enquiry"}
      onSubmit={(e) => {
        e.preventDefault();
        setStatus(fail ? "failed" : "preview");
      }}
    >
      <h2>
        {school
          ? "Register your school’s interest"
          : "Let’s start a conversation"}
      </h2>
      <div className="notice">
        <strong>Demonstration form — fictional details only.</strong>
        <p>
          Fields use sample information so this preview cannot collect personal
          details or children’s health information. Nothing is sent or stored. A
          live enquiry service comes later.
        </p>
      </div>
      {school && (
        <>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="school-name">School name</label>
              <input
                id="school-name"
                readOnly
                value="Gracefield School (fictional)"
              />
            </div>
            <div className="field">
              <label htmlFor="school-location">City / state</label>
              <input
                id="school-location"
                readOnly
                value="Ibadan, Oyo — sample location"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="staff-role">Representative’s role</label>
            <input
              id="staff-role"
              readOnly
              value="Programme coordinator (sample)"
            />
          </div>
        </>
      )}
      <div className="field">
        <label htmlFor="enquiry-type">Enquiry type</label>
        <select id="enquiry-type" defaultValue={school ? "school" : "general"}>
          <option value="general">General enquiry</option>
          <option value="school">School programme</option>
          <option value="content">Content concern</option>
          <option value="access">Accessibility help</option>
        </select>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" readOnly value="Mrs Adeyemi (fictional)" />
        </div>
        <div className="field">
          <label htmlFor="reply-email">Reply email</label>
          <input
            id="reply-email"
            type="email"
            readOnly
            value="demo@example.invalid"
          />
        </div>
      </div>
      {school && (
        <>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="school-group">Girls aged 13–15</label>
              <select id="school-group">
                <option>Proposed group of 15–20 (fictional)</option>
                <option>Needs discussion</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="school-print">Sessions and printing</label>
              <select id="school-print">
                <option>Can support (sample)</option>
                <option>Need help</option>
                <option>Unsure</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="school-faith">Clearly Christian approach</label>
            <select id="school-faith">
              <option>Comfortable with the approach (sample)</option>
              <option>Needs discussion</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="school-support">Female support contact</label>
            <select id="school-support">
              <option>Need help identifying one</option>
              <option>Proposed contact — not yet verified</option>
            </select>
          </div>
        </>
      )}
      <div className="field">
        <label htmlFor="enquiry-message">Message</label>
        <textarea
          id="enquiry-message"
          readOnly
          value={
            school
              ? "Our fictional school would like to discuss the proposed six-week programme and what readiness involves."
              : "I would like to learn more about GroomingHer’s education programme. This is a sample enquiry."
          }
        />
        <small>
          No health records, personal symptoms or images are requested.
        </small>
      </div>
      <p className="section-note">
        Not an emergency service. No response hours or live support team are
        confirmed. For urgent help, contact a safe adult or local emergency
        service now.
      </p>
      <label className="check-row">
        <input
          type="checkbox"
          checked={fail}
          onChange={(e) => setFail(e.target.checked)}
        />
        Preview a submission failure
      </label>
      <button className="button primary" type="submit">
        Preview {school ? "interest submission" : "enquiry submission"}
      </button>
      <div aria-live="polite">
        {status === "preview" && (
          <div className="notice success" style={{ marginTop: 20 }}>
            <strong>
              Demo only: preview recorded in this screen. Nothing was sent.
            </strong>
            <p>
              {school
                ? "The intended live journey would remain pending a readiness discussion. This is not school approval and no staff account has been created."
                : "A real receipt confirmation will appear only when an enquiry service successfully receives it."}
            </p>
            {school && (
              <Link className="text-link" href="/onboarding/school">
                Explore fictional staff onboarding →
              </Link>
            )}
          </div>
        )}
        {status === "failed" && (
          <div className="notice error" style={{ marginTop: 20 }}>
            <strong>Preview failure: your enquiry was not sent.</strong>
            <p>
              No live delivery route is configured. You can try the preview
              again or explore public resources. Contact routes must be verified
              before launch.
            </p>
            <Link className="text-link" href="/resources">
              Explore Learning Resources →
            </Link>
          </div>
        )}
      </div>
    </form>
  );
}
