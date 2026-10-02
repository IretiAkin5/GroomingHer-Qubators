"use client";
import { useEffect, useState } from "react";

// Wraps every teen page: profile without a fresh unlock sees the PIN screen.
// Unlock lasts for this tab only (sessionStorage) + 5-min background timeout.
export default function LockGate({ children }: { children: React.ReactNode }) {
  const [locked, setLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const profile = localStorage.getItem("gh_profile");
    if (!profile) return;
    fetch(`/api/profile?profileId=${profile}`).then((r) => r.json()).then((d) => {
      if (d.hasPin === false) return; // no PIN yet → home nudges to /pin
      const unlocked = sessionStorage.getItem("gh_unlocked");
      const last = Number(sessionStorage.getItem("gh_last") ?? 0);
      if (unlocked !== "1" || Date.now() - last > 5 * 60 * 1000) setLocked(true);
    }).catch(() => {});
    const stamp = () => sessionStorage.setItem("gh_last", String(Date.now()));
    const onHide = () => { stamp(); };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  async function unlock() {
    setMsg("");
    const profileId = localStorage.getItem("gh_profile") ?? "";
    const res = await fetch("/api/profile/verify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, pin }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Try again."); setPin(""); return; }
    sessionStorage.setItem("gh_unlocked", "1");
    sessionStorage.setItem("gh_last", String(Date.now()));
    setLocked(false); setPin("");
  }

  if (!locked) return <>{children}</>;

  return (
    <div style={{ textAlign: "center", paddingTop: 60 }}>
      <div style={{ width: 56, height: 56, borderRadius: 18, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 28, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>H</div>
      <h1 style={{ fontSize: 24 }}>Welcome back</h1>
      <p style={{ color: "#8a6b76" }}>Enter your 4-digit PIN</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "12px 0" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: 52, height: 60, borderRadius: 14, border: "2px solid #7C2D52", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800 }}>{pin[i] ? "•" : ""}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,72px)", gap: 8, justifyContent: "center" }}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) => (
          <button key={i} disabled={!k} onClick={() => { if (k === "⌫") setPin(pin.slice(0, -1)); else if (pin.length < 4) { const n = pin + k; setPin(n); if (n.length === 4) setTimeout(() => (document.getElementById("unlock-btn") as HTMLButtonElement)?.click(), 150); } }}
            style={{ height: 56, borderRadius: 14, fontSize: 20, fontWeight: 800, border: "2px solid #F1D9E0", background: "#fff", cursor: k ? "pointer" : "default", opacity: k ? 1 : 0 }}>{k}</button>
        ))}
      </div>
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      <button id="unlock-btn" onClick={unlock} style={{ display: "none" }}>unlock</button>
    </div>
  );
}
