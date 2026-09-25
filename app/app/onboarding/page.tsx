"use client";
import { useState } from "react";

const steps = ["Age", "Period", "Language", "PIN"] as const;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [ageBand, setAgeBand] = useState("15-17");
  const [menarche, setMenarche] = useState("yes");
  const [language, setLanguage] = useState("en");
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState("");

  const chip = (on: boolean): React.CSSProperties => ({
    padding: "12px 18px", borderRadius: 999, minHeight: 48, margin: 4, cursor: "pointer",
    border: on ? "2px solid #E85D8A" : "2px solid #F1D9E0",
    background: on ? "#FBDCE6" : "#fff", fontWeight: on ? 800 : 400, fontSize: 16,
  });

  async function finish() {
    setMsg("");
    const res = await fetch("/api/profile", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ageBand, menarcheStatus: menarche, language, pin }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save. Try again."); return; }
    localStorage.setItem("gh_profile", data.profileId);
    setDone(data.profileId);
  }

  if (done) return <div><h1 style={{ fontSize: 24 }}>You are in 🎉</h1><p>Your private space is ready. Nothing is shared without your say-so.</p><a href="/">Go home</a></div>;

  return (
    <div>
      <p style={{ color: "#8a6b76" }}>Step {step + 1} of 4 — {steps[step]}</p>
      {step === 0 && <div><h1 style={{ fontSize: 24 }}>How old are you?</h1>{["12-14", "15-17", "18-19"].map((a) => <button key={a} style={chip(ageBand === a)} onClick={() => setAgeBand(a)}>{a}</button>)}</div>}
      {step === 1 && <div><h1 style={{ fontSize: 24 }}>Has your period started?</h1>{[["yes", "Yes"], ["no", "Not yet"]].map(([v, l]) => <button key={v} style={chip(menarche === v)} onClick={() => setMenarche(v)}>{l}</button>)}</div>}
      {step === 2 && <div><h1 style={{ fontSize: 24 }}>Language?</h1>{[["en", "English"], ["pcm", "Pidgin"]].map(([v, l]) => <button key={v} style={chip(language === v)} onClick={() => setLanguage(v)}>{l}</button>)}</div>}
      {step === 3 && <div><h1 style={{ fontSize: 24 }}>Set a 4-digit PIN</h1><p style={{ color: "#8a6b76" }}>Keeps others out on shared phones.</p><input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="••••" style={{ fontSize: 24, letterSpacing: 8, padding: 12, borderRadius: 14, border: "2px solid #7C2D52", width: "100%" }} /></div>}
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      <div style={{ marginTop: 16 }}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ ...chip(false), marginRight: 8 }}>Back</button>}
        {step < 3
          ? <button onClick={() => setStep(step + 1)} style={{ padding: "12px 24px", borderRadius: 14, minHeight: 48, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>Next</button>
          : <button onClick={finish} style={{ padding: "12px 24px", borderRadius: 14, minHeight: 48, background: "#E85D8A", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>Finish</button>}
      </div>
    </div>
  );
}
