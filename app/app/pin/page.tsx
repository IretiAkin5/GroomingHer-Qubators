"use client";
import { useState } from "react";

export default function Pin() {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";

  async function save() {
    setMsg("");
    if (!/^\d{4}$/.test(pin)) { setMsg("PIN must be exactly 4 digits."); return; }
    const res = await fetch("/api/profile/pin", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, pin }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save."); return; }
    setDone(true);
  }

  if (done) return <div style={{ textAlign: "center", paddingTop: 40 }}><h1>🔒 PIN set!</h1><p>Your space locks when you leave.</p><a href="/">Go home</a></div>;

  return (
    <div style={{ textAlign: "center", paddingTop: 30 }}>
      <h1 style={{ fontSize: 24 }}>Lock your space 🔒</h1>
      <p style={{ color: "#8a6b76" }}>A 4-digit PIN keeps others out on shared phones.</p>
      <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="••••" style={{ fontSize: 28, letterSpacing: 8, padding: 12, borderRadius: 14, border: "2px solid #7C2D52", width: "100%", textAlign: "center" }} />
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      <button onClick={save} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer", marginTop: 12 }}>Set PIN</button>
    </div>
  );
}
