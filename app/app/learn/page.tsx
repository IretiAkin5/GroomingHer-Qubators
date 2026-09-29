"use client";
import { useEffect, useState } from "react";

interface Item { slug: string; tier: string; title: string }
interface Full extends Item { body: string[] }

export default function Learn() {
  const [list, setList] = useState<Item[]>([]);
  const [open, setOpen] = useState<Full | null>(null);

  useEffect(() => { fetch("/api/learn").then((r) => r.json()).then((d) => setList(d.articles ?? [])); }, []);
  async function read(slug: string) {
    const res = await fetch(`/api/learn?slug=${slug}`);
    const data = await res.json();
    if (res.ok) setOpen(data.article);
  }

  if (open) return (
    <div>
      <button onClick={() => setOpen(null)} style={{ background: "none", border: "none", color: "#7C2D52", fontWeight: 800, cursor: "pointer", fontSize: 15 }}>‹ All topics</button>
      <h1 style={{ fontSize: 22 }}>{open.title}</h1>
      <p style={{ fontSize: 13, color: "#8a6b76" }}>Ages {open.tier} · Reviewed stub — clinician sign-off in Phase 5</p>
      {open.body.map((p, i) => <p key={i} style={{ background: "#fff", border: "1px solid #F1D9E0", borderRadius: 12, padding: 12 }}>{p}</p>)}
      <p style={{ fontSize: 13, color: "#8a6b76" }}>Learning info, not a diagnosis.</p>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Learn 📖</h1>
      <p style={{ color: "#8a6b76" }}>Short, honest guides — youngest-first, deeper as you grow.</p>
      {list.map((a) => (
        <button key={a.slug} onClick={() => read(a.slug)} style={{ display: "block", width: "100%", textAlign: "left", background: "#fff", border: "1px solid #F1D9E0", borderRadius: 14, padding: 14, margin: "8px 0", cursor: "pointer" }}>
          <b>{a.title}</b><br /><small style={{ color: "#8a6b76" }}>Ages {a.tier}</small>
        </button>
      ))}
    </div>
  );
}
