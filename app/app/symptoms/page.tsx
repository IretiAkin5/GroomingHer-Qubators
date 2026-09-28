"use client";
import { useState } from "react";

export default function Symptoms() {
  const today = new Date().toISOString().slice(0, 10);
  const [pain, setPain] = useState(0);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [discharge, setDischarge] = useState("");
  const [mood, setMood] = useState("");
  const [msg, setMsg] = useState("");
  const [saved, setSaved] = useState(false);

  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";
  const toggle = (k: string) => setOn((p) => ({ ...p, [k]: !p[k] }));
  const chip = (active: boolean): React.CSSProperties => ({
    padding: "10px 16px", borderRadius: 999, margin: 4, minHeight: 44, cursor: "pointer", fontSize: 14,
    border: active ? "2px solid #E85D8A" : "2px solid #F1D9E0",
    background: active ? "#FBDCE6" : "#fff", fontWeight: active ? 800 : 400,
  });

  async function save() {
    setMsg(""); setSaved(false);
    if (!profileId) { setMsg("Finish onboarding first."); return; }
    const res = await fetch("/api/symptoms", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, date: today, pain, discharge, mood, acne: !!on.acne, bloating: !!on.bloating, schoolMissed: !!on.school }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save."); return; }
    setSaved(true);
  }

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>How do you feel today?</h1>
      <p style={{ color: "#8a6b76" }}>{today} · tap what applies, under a minute</p>
      <h3>Pain (0–5)</h3>
      <div>{[0, 1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setPain(n)} style={chip(pain === n)}>{n}</button>)}</div>
      <h3>Body</h3>
      <div>
        <button onClick={() => toggle("acne")} style={chip(!!on.acne)}>Acne</button>
        <button onClick={() => toggle("bloating")} style={chip(!!on.bloating)}>Bloating</button>
        <button onClick={() => toggle("school")} style={chip(!!on.school)}>Missed school</button>
      </div>
      <h3>Discharge</h3>
      <div>{["none", "clear/white", "itchy", "bad smell", "yellow/green"].map((d) => <button key={d} onClick={() => setDischarge(discharge === d ? "" : d)} style={chip(discharge === d)}>{d}</button>)}</div>
      <h3>Mood</h3>
      <div>{["okay", "low", "irritable", "tired"].map((m) => <button key={m} onClick={() => setMood(mood === m ? "" : m)} style={chip(mood === m)}>{m}</button>)}</div>
      <div style={{ marginTop: 16 }}>
        <button onClick={save} style={{ padding: "12px 24px", borderRadius: 14, minHeight: 48, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>Save today</button>
      </div>
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      {saved && <div style={{ background: "#E6F7F4", border: "1px solid #0D9488", borderRadius: 12, padding: 12, marginTop: 12 }}>
        Saved. <a href="/normal">Check — Is this normal?</a>
      </div>}
    </div>
  );
}
