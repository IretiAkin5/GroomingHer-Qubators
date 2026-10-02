"use client";
import { useEffect, useState } from "react";

const ACTIONS = [
  ["📅", "Log period", "/calendar"],
  ["💬", "Log symptoms", "/symptoms"],
  ["🔍", "Is this normal?", "/normal"],
  ["💡", "Ask Her", "/ask"],
  ["📖", "Learn", "/learn"],
  ["🔔", "Reminders", "/reminders"],
];

export default function Home() {
  const [name, setName] = useState("");
  const [alerts, setAlerts] = useState(0);

  useEffect(() => {
    const p = localStorage.getItem("gh_profile") ?? "";
    if (!p) return;
    setName("welcome back");
    fetch(`/api/reminders?profileId=${p}`).then((r) => r.json()).then((d) => setAlerts((d.reminders ?? []).length)).catch(() => {});
  }, []);

  const btn: React.CSSProperties = {
    background: "#fff", border: "2px solid #F1D9E0", borderRadius: 16, padding: "16px 8px",
    textDecoration: "none", color: "#3F2A33", fontWeight: 800, fontSize: 14, textAlign: "center",
  };

  return (
    <div>
      <div style={{ background: "#7C2D52", color: "#fff", borderRadius: 20, padding: 20 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>GroomingHer 🌸</h1>
        <p style={{ margin: "6px 0 0", color: "#FBDCE6" }}>
          {name ? `${name} — how is your body today?` : "Your private period companion. Start with onboarding 👇"}
        </p>
        {!name && <a href="/onboarding" style={{ display: "inline-block", marginTop: 12, background: "#fff", color: "#7C2D52", fontWeight: 800, padding: "12px 22px", borderRadius: 12, textDecoration: "none" }}>Get started</a>}
        {alerts > 0 && <p style={{ margin: "10px 0 0" }}><a href="/reminders" style={{ color: "#fff", fontWeight: 800 }}>🔔 {alerts} reminder{alerts > 1 ? "s" : ""} for you →</a></p>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 14 }}>
        {ACTIONS.map(([icon, label, href]) => (
          <a key={href} href={href} style={btn}>{icon}<br />{label}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <a href="/tell" style={{ ...btn, flex: 1 }}>👪 Tell Parents/Guardian</a>
        <a href="/parent" style={{ ...btn, flex: 1 }}>Parent Space</a>
      </div>
      <p style={{ fontSize: 13, color: "#8a6b76", marginTop: 14 }}>Educational information only. Not a medical diagnosis.</p>
    </div>
  );
}
