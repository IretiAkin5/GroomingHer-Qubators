"use client";
import { useState } from "react";

interface Msg { who: "me" | "her"; text: string; follow?: string[]; triage?: boolean }
const STARTERS = ["Is my period normal?", "What helps period pain?", "What discharge is not normal?"];

export default function Ask() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setBusy(true); setQ("");
    setMsgs((m) => [...m, { who: "me", text: question }]);
    const res = await fetch("/api/ask", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, ageBand: "15-17" }),
    });
    const data = await res.json();
    setBusy(false);
    setMsgs((m) => [...m, res.ok
      ? { who: "her", text: data.text, follow: data.follow, triage: data.triage }
      : { who: "her", text: data.error ?? "Try again." }]);
  }

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Ask Her 💬</h1>
      <p style={{ color: "#8a6b76", fontSize: 14 }}>Private answers from reviewed guidance. Chats stay 30 days — <button onClick={() => setMsgs([])} style={{ background: "none", border: "none", color: "#7C2D52", textDecoration: "underline", cursor: "pointer", fontSize: 14 }}>delete chat</button></p>
      {msgs.length === 0 && <div>{STARTERS.map((s) => <button key={s} onClick={() => send(s)} style={{ display: "block", width: "100%", textAlign: "left", padding: 12, borderRadius: 12, margin: "6px 0", border: "2px solid #F1D9E0", background: "#fff" }}>{s}</button>)}</div>}
      {msgs.map((m, i) => (
        <div key={i} style={{ background: m.who === "me" ? "#FBDCE6" : "#fff", border: "1px solid #F1D9E0", borderRadius: 14, padding: 12, margin: "8px 0", marginLeft: m.who === "me" ? 40 : 0, marginRight: m.who === "me" ? 0 : 40 }}>
          <p style={{ margin: 0 }}>{m.text}</p>
          {m.triage && <p><a href="/normal">→ Check — Is this normal?</a></p>}
          {m.follow && <div>{m.follow.map((f) => <button key={f} onClick={() => send(f)} style={{ padding: "8px 12px", borderRadius: 999, margin: 4, border: "2px solid #F1D9E0", background: "#fff", fontSize: 13 }}>{f}</button>)}</div>}
        </div>
      ))}
      {busy && <p style={{ color: "#8a6b76" }}>Her is thinking…</p>}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(q)} placeholder="Ask anything about your body…" style={{ flex: 1, padding: 12, borderRadius: 14, border: "2px solid #F1D9E0", fontSize: 16 }} />
        <button onClick={() => send(q)} style={{ padding: "12px 18px", borderRadius: 14, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none" }}>Send</button>
      </div>
    </div>
  );
}
