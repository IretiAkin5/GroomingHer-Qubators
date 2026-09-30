"use client";
import { useEffect, useState } from "react";

interface Reminder { kind: string; title: string; body: string }

export default function Reminders() {
  const [items, setItems] = useState<Reminder[]>([]);
  const [moods, setMoods] = useState<{ date: string; mood: string | null }[]>([]);
  const profileId = typeof window !== "undefined" ? localStorage.getItem("gh_profile") ?? "" : "";

  useEffect(() => {
    if (!profileId) return;
    fetch(`/api/reminders?profileId=${profileId}`).then((r) => r.json()).then((d) => {
      setItems(d.reminders ?? []); setMoods(d.moods ?? []);
    });
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Reminders 🔔</h1>
      {items.length === 0 ? <p style={{ color: "#8a6b76" }}>All clear — nothing needs you right now.</p> :
        items.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #F1D9E0", borderLeft: "6px solid #E85D8A", borderRadius: 14, padding: 14, margin: "8px 0" }}>
            <b>{r.title}</b><p style={{ margin: "4px 0 0" }}>{r.body}</p>
          </div>
        ))}
      <h3>Past 7 days mood</h3>
      {moods.length === 0 ? <p style={{ color: "#8a6b76" }}>No check-ins yet — log symptoms to see your week.</p> :
        <ul>{moods.map((m) => <li key={m.date}>{m.date} · {m.mood || "—"}</li>)}</ul>}
    </div>
  );
}
