"use client";
import { useState } from "react";

interface Share { id: string; summaryText: string; sharedAt: string }

export default function Parent() {
  const [tab, setTab] = useState("shared");
  const [profileId, setProfileId] = useState("");
  const [cards, setCards] = useState<Share[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    if (!profileId.trim()) { setMsg("Enter the sharing ID your daughter gave you."); return; }
    const res = await fetch(`/api/shares?profileId=${profileId.trim()}`);
    const data = await res.json();
    if (!res.ok) { setMsg("Could not load."); return; }
    setCards(data.shares);
    if (!data.shares.length) setMsg("No shared cards yet — she shares only what she chooses.");
  }

  const pill = (on: boolean): React.CSSProperties => ({
    padding: "10px 14px", borderRadius: 999, margin: 4, fontWeight: 800, cursor: "pointer",
    border: on ? "2px solid #7C2D52" : "2px solid #F1D9E0",
    background: on ? "#7C2D52" : "#fff", color: on ? "#fff" : "#3F2A33",
  });

  return (
    <div>
      <div style={{ background: "#7C2D52", color: "#fff", borderRadius: 20, padding: 18 }}>
        <h1 style={{ fontSize: 22, margin: 0 }}>Parent Space</h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, color: "#FBDCE6" }}>Support without snooping — you see only what she shares.</p>
      </div>
      <div style={{ margin: "12px 0" }}>
        {[["shared", "Shared"], ["guides", "Guides"], ["learn", "Learn"], ["help", "Find help"]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} style={pill(tab === v)}>{l}</button>
        ))}
      </div>
      {tab === "shared" && <div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={profileId} onChange={(e) => setProfileId(e.target.value)} placeholder="Sharing ID from your daughter" style={{ flex: 1, padding: 12, borderRadius: 12, border: "2px solid #F1D9E0", fontSize: 15 }} />
          <button onClick={load} style={{ padding: 12, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none" }}>View</button>
        </div>
        {msg && <p style={{ color: "#8a6b76" }}>{msg}</p>}
        {cards.map((c) => (
          <div key={c.id} style={{ background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 14, padding: 14, margin: "8px 0" }}>
            <p style={{ margin: 0 }}>{c.summaryText}</p>
            <small style={{ color: "#8a6b76" }}>{new Date(c.sharedAt).toLocaleString()}</small>
          </div>
        ))}
      </div>}
      {tab === "guides" && <div style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 16, padding: 16 }}>
        <p><b>Opener:</b> "I'm glad you told me. Do you want advice, or listening first?"</p>
        <p><b>Watch for:</b> soaking a pad in under 2 hours · severe pain + missed school · cycles under 21 or over 45 days repeating · discharge with odour/fever.</p>
        <p><b>Seek care when:</b> any of the above, fainting, or pain rest and heat can't ease.</p>
      </div>}
      {tab === "learn" && <div style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 16, padding: 16 }}>
        <p><b>Hygiene:</b> pads every 4–6 hours; spare kit for school.</p>
        <p><b>Myths:</b> periods are not dirty; pain that stops school is not "normal" — it deserves a check.</p>
        <p><b>PCOS/endometriosis basics:</b> ongoing irregularity + strong pain patterns are clinic-conversation topics, not home diagnoses.</p>
      </div>}
      {tab === "help" && <div style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 16, padding: 16 }}>
        <p><b>Tell the doctor:</b> last 3 dates, flow, pain 1–5, symptoms.</p>
        <p><b>Emergency:</b> very heavy bleeding, fainting, sudden severe pain, fever.</p>
      </div>}
    </div>
  );
}
