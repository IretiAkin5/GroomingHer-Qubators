"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const steps = ["Account", "Age", "Period", "Language", "PIN"] as const;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("girl");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState("");
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

  async function google() {
    setMsg("");
    await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
  }
  async function sendCode() {
    setMsg("");
    const r = await authClient.$fetch("/phone-number/send-otp", { method: "POST", body: { phoneNumber: phone } }) as { error?: { message?: string } };
    if (r?.error) { setMsg("Could not send code. Check the number."); return; }
    setMsg("Code sent — check your SMS (or server console in test mode).");
  }
  async function verifyCode() {
    setMsg("");
    const r = await authClient.$fetch("/phone-number/verify", { method: "POST", body: { phoneNumber: phone, code } }) as { error?: { message?: string } };
    if (r?.error) { setMsg("Wrong or expired code."); return; }
    setVerified(phone);
  }

  async function finish() {
    setMsg("");
    const res = await fetch("/api/profile", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ageBand, menarcheStatus: menarche, language, pin }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save. Try again."); return; }
    localStorage.setItem("gh_profile", data.profileId);
    localStorage.setItem("gh_role", role);
    setDone(data.profileId);
  }

  if (done) return <div><h1 style={{ fontSize: 24 }}>You are in 🎉</h1><p>Your private space is ready. Nothing is shared without your say-so.</p><a href="/">Go home</a></div>;

  return (
    <div>
      <p style={{ color: "#8a6b76" }}>Step {step + 1} of 5 — {steps[step]}</p>
      {step === 0 && <div>
        <h1 style={{ fontSize: 24 }}>Get Started</h1>
        <div>
          <button style={chip(role === "girl")} onClick={() => setRole("girl")}>I'm a girl</button>
          <button style={chip(role === "parent")} onClick={() => setRole("parent")}>I'm a parent</button>
        </div>
        <h3>Sign up options</h3>
        <button onClick={google} style={{ display: "block", width: "100%", padding: 12, borderRadius: 12, margin: "6px 0", border: "2px solid #F1D9E0", background: "#fff", fontWeight: 800 }}>Continue with Google</button>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone e.g. +2348012345678" style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px solid #F1D9E0", margin: "6px 0", fontSize: 16 }} />
        <button onClick={sendCode} style={{ padding: 12, borderRadius: 12, background: "#fff", border: "2px solid #7C2D52", color: "#7C2D52", fontWeight: 800, marginRight: 8 }}>Send code</button>
        <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit code" style={{ width: 140, padding: 12, borderRadius: 12, border: "2px solid #F1D9E0", fontSize: 16 }} />
        <button onClick={verifyCode} style={{ padding: 12, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none", marginLeft: 8 }}>Verify</button>
        {verified && <p style={{ color: "#15803D" }}>✓ {verified} verified. You can continue — or skip and use PIN only.</p>}
      </div>}
      {step === 1 && <div><h1 style={{ fontSize: 24 }}>How old are you?</h1>{[["12-14", "12–14 · just starting"], ["15-17", "15–17 · figuring it out"], ["18-19", "18–19 · owning it"]].map(([v, l]) => <button key={v} style={chip(ageBand === v)} onClick={() => setAgeBand(v)}>{l}</button>)}</div>}
      {step === 2 && <div><h1 style={{ fontSize: 24 }}>Has your period started?</h1>{[["yes", "Yes"], ["no", "Not yet"]].map(([v, l]) => <button key={v} style={chip(menarche === v)} onClick={() => setMenarche(v)}>{l}</button>)}</div>}
      {step === 3 && <div><h1 style={{ fontSize: 24 }}>Language?</h1>{[["en", "English"]].map(([v, l]) => <button key={v} style={chip(language === v)} onClick={() => setLanguage(v)}>{l}</button>)}</div>}
      {step === 4 && <div><h1 style={{ fontSize: 24 }}>Set a 4-digit PIN</h1><p style={{ color: "#8a6b76" }}>Keeps others out on shared phones.</p><input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="••••" style={{ fontSize: 24, letterSpacing: 8, padding: 12, borderRadius: 14, border: "2px solid #7C2D52", width: "100%" }} /></div>}
      {msg && <p style={{ color: msg.startsWith("Code sent") || msg.startsWith("✓") ? "#15803D" : "#DC2626" }}>{msg}</p>}
      <div style={{ marginTop: 16 }}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ ...chip(false), marginRight: 8 }}>Back</button>}
        {step < 4
          ? <button onClick={() => setStep(step + 1)} style={{ padding: "12px 24px", borderRadius: 14, minHeight: 48, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>{step === 0 ? "Continue (skip signup for now)" : "Next"}</button>
          : <button onClick={finish} style={{ padding: "12px 24px", borderRadius: 14, minHeight: 48, background: "#E85D8A", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer" }}>Finish</button>}
      </div>
    </div>
  );
}
