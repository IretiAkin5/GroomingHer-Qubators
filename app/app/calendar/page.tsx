"use client";
import { useEffect, useState } from "react";

interface Cycle { id: string; startDate: string; endDate: string | null; flow: string }

export default function Calendar() {
  const [month, setMonth] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [badge, setBadge] = useState<string | null>(null);
  const [predicted, setPredicted] = useState<string[]>([]);
  const [day, setDay] = useState("");
  const [flow, setFlow] = useState("medium");
  const [msg, setMsg] = useState("");

  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";

  async function load() {
    if (!profileId) { setMsg("Finish onboarding first."); return; }
    const res = await fetch(`/api/cycles?profileId=${profileId}`);
    const data = await res.json();
    if (res.ok) { setCycles(data.cycles); setBadge(data.stats.badge); setPredicted(data.stats.predicted); }
  }
  useEffect(() => { load(); }, []);

  async function save(kind: "start" | "end") {
    setMsg("");
    const body = kind === "start" ? { profileId, startDate: day, flow } : { profileId, startDate: day, endDate: day, flow };
    const res = await fetch("/api/cycles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save."); return; }
    setDay(""); load();
  }

  const first = new Date(month.y, month.m, 1);
  const cells: (number | null)[] = [...Array(first.getDay()).fill(null), ...Array(new Date(month.y, month.m + 1, 0).getDate()).keys()].map((d) => (typeof d === "number" ? d + 1 : null));
  const iso = (d: number) => `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const periodDays = new Set(cycles.flatMap((c) => { const out: string[] = [c.startDate]; if (c.endDate) { let d = c.startDate; while (d < c.endDate) { const n = new Date(d + "T12:00:00"); n.setDate(n.getDate() + 1); d = n.toISOString().slice(0, 10); out.push(d); } } return out; }));
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Calendar</h1>
      {badge && <p style={{ background: badge.startsWith("Regular") ? "#E6F7F4" : "#FEF3C7", padding: 12, borderRadius: 12 }}><b>{badge}</b>{predicted.length > 0 && <> · Next likely: {predicted[0]} – {predicted[2]}</>}</p>}
      <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "12px 0" }}>
        <button onClick={() => setMonth({ y: month.m === 0 ? month.y - 1 : month.y, m: (month.m + 11) % 12 })}>‹</button>
        <b>{first.toLocaleString("default", { month: "long", year: "numeric" })}</b>
        <button onClick={() => setMonth({ y: month.m === 11 ? month.y + 1 : month.y, m: (month.m + 1) % 12 })}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
        {cells.map((d, i) => d === null ? <div key={i} /> : (
          <button key={i} onClick={() => setDay(iso(d))} style={{ aspectRatio: "1", borderRadius: 12, border: iso(d) === today ? "3px solid #7C2D52" : "1px solid #F1D9E0", background: periodDays.has(iso(d)) ? "#E85D8A" : predicted.includes(iso(d)) ? "#FBDCE6" : "#fff", color: periodDays.has(iso(d)) ? "#fff" : "#3F2A33", fontWeight: periodDays.has(iso(d)) ? 800 : 400 }}>{d}</button>
        ))}
      </div>
      {day && <div style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 16, padding: 16, marginTop: 12 }}>
        <b>{day}</b>
        <div>{["light", "medium", "heavy"].map((f) => <button key={f} onClick={() => setFlow(f)} style={{ padding: "10px 14px", borderRadius: 999, margin: 4, border: flow === f ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: flow === f ? "#FBDCE6" : "#fff" }}>{f}</button>)}</div>
        <button onClick={() => save("start")} style={{ padding: 12, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, border: "none", marginRight: 8 }}>Save period day</button>
      </div>}
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      <h3>History</h3>
      {cycles.length === 0 ? <p style={{ color: "#8a6b76" }}>No periods logged yet — tap a day above.</p> :
        <ul>{cycles.map((c) => <li key={c.id}>{c.startDate}{c.endDate && c.endDate !== c.startDate ? ` – ${c.endDate}` : ""} · {c.flow}</li>)}</ul>}
    </div>
  );
}
