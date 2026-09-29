"use client";
import { useState } from "react";

interface Result { band: string; flags: string[]; title: string; body: string; watch: string[]; nextStep: string; disclaimer: string }

const COLORS: Record<string, string> = { monitor: "#E6F7F4", adult: "#FEF3C7", professional: "#FDE8E8", urgent: "#FEE2E2" };
const BORDERS: Record<string, string> = { monitor: "#0D9488", adult: "#F59E0B", professional: "#DC2626", urgent: "#DC2626" };

export default function Normal() {
  const [result, setResult] = useState<Result | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";

  async function check() {
    setMsg(""); setBusy(true);
    if (!profileId) { setMsg("Finish onboarding first."); setBusy(false); return; }
    const res = await fetch("/api/normal", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) { setMsg(data.error ?? "Could not check."); return; }
    setResult(data);
  }

  function shareText() {
    if (!result) return "";
    return `GroomingHer summary (learning info, not a diagnosis): ${result.title}. Suggested: ${result.nextStep}`;
  }

  if (!result) return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      <h1 style={{ fontSize: 24 }}>Is this normal?</h1>
      <p style={{ color: "#8a6b76" }}>We check your logged periods + symptoms against usual ranges for your age.</p>
      <button onClick={check} disabled={busy} style={{ padding: "14px 28px", borderRadius: 14, minHeight: 52, background: "#E85D8A", color: "#fff", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer" }}>{busy ? "Checking…" : "Check now"}</button>
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
    </div>
  );

  return (
    <div>
      <div style={{ background: COLORS[result.band] ?? "#fff", border: `2px solid ${BORDERS[result.band] ?? "#F1D9E0"}`, borderRadius: 20, padding: 18 }}>
        <h1 style={{ fontSize: 22, margin: "0 0 6px" }}>{result.title}</h1>
        <p>{result.body}</p>
        <h3>Watch for</h3>
        <ul>{result.watch.map((w) => <li key={w}>{w}</li>)}</ul>
        <p><b>Next step:</b> {result.nextStep}</p>
        <p style={{ fontSize: 13, color: "#8a6b76" }}>{result.disclaimer}</p>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => { navigator.clipboard?.writeText(shareText()); setCopied(true); }} style={{ padding: 12, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none", marginRight: 8 }}>Copy summary for parent</button>
        <button onClick={() => setResult(null)} style={{ padding: 12, borderRadius: 12, background: "#fff", border: "2px solid #F1D9E0" }}>Check again</button>
      </div>
      {copied && <p style={{ color: "#15803D" }}>Copied — show or send it to a parent or trusted adult. Full sharing flow arrives in Slice 6.</p>}
    </div>
  );
}
