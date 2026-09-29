"use client";
import { useEffect, useState } from "react";

const SCRIPTS = {
  direct: "Mum/Dad, I checked my symptoms in GroomingHer and it says I should talk to you. Can we look at it together?",
  gentle: "There's something about my body I'd like you to know. The app helped me write it down — can I show you when you have a moment?",
};

export default function Tell() {
  const [text, setText] = useState("");
  const [script, setScript] = useState<"direct" | "gentle">("direct");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";

  useEffect(() => {
    if (!profileId) return;
    fetch(`/api/normal?profileId=${profileId}`).then((r) => r.json()).then((d) => {
      if (d.assessment) setText(`GroomingHer summary (learning info, not a diagnosis): ${d.assessment.explanation} Suggested: bring your last period dates and talk with a trusted adult.`);
    });
  }, []);

  async function send() {
    setMsg("");
    const res = await fetch("/api/shares", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, summaryText: text }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not share."); return; }
    setSent(true);
  }

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Tell Parents/Guardian</h1>
      <p style={{ color: "#8a6b76" }}>They see only this card — never your calendar, chats, or logs.</p>
      <div style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 16, padding: 16 }}>
        <p>{text || "No check result yet — visit Is This Normal? first."}</p>
      </div>
      <h3>Words to say</h3>
      <div>
        {(["direct", "gentle"] as const).map((s) => (
          <button key={s} onClick={() => setScript(s)} style={{ padding: "10px 14px", borderRadius: 999, margin: 4, border: script === s ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: script === s ? "#FBDCE6" : "#fff" }}>{s === "direct" ? "Direct" : "Gentle"}</button>
        ))}
      </div>
      <p style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 12, padding: 12 }}>"{SCRIPTS[script]}"</p>
      <button onClick={() => navigator.clipboard?.writeText(`${text}\n\n${SCRIPTS[script]}`)} style={{ padding: 12, borderRadius: 12, background: "#fff", border: "2px solid #7C2D52", color: "#7C2D52", fontWeight: 800, marginRight: 8 }}>Copy all</button>
      <button onClick={send} style={{ padding: 12, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none" }}>Send to Parent view</button>
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      {sent && <p style={{ color: "#15803D" }}>Shared ✓ — it now appears under Parent Space → Shared. <a href="/parent">Preview parent view</a></p>}
    </div>
  );
}
