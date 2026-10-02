"use client";
import { useEffect, useState } from "react";

// Photo slots: drop free-stock photos (Pexels/Unsplash license) as
// app/public/photos/girl12.jpg, girl15.jpg, girl19.jpg — floral art shows until then.
const PHOTOS = [
  { age: "12", src: "/photos/girl12.jpg" },
  { age: "15", src: "/photos/girl15.jpg" },
  { age: "19", src: "/photos/girl19.jpg" },
];

function Frame({ age, src }: { age: string; src: string }) {
  const [gone, setGone] = useState(false);
  return (
    <div style={{ position: "relative", width: 92, textAlign: "center" }}>
      <div style={{ width: 92, height: 112, borderRadius: 46, background: "#FBDCE6", border: "3px solid #fff", overflow: "hidden", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!gone && <img src={src} alt={`Nigerian girl age ${age}`} onError={() => setGone(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        {gone && <span>🌺👧🏾</span>}
      </div>
      <b style={{ color: "#fff", fontSize: 13 }}>{age}</b>
    </div>
  );
}

export default function Splash() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("gh_profile") && window.location.pathname === "/") setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#7C2D52", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 50, overflowY: "auto" }}>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#FBDCE6", margin: 0 }}>🌸 🌺 🌸 🌺 🌸</p>
      <div style={{ display: "flex", gap: 10, margin: "14px 0 4px" }}>
        {PHOTOS.map((p) => <Frame key={p.age} {...p} />)}
      </div>
      <h1 style={{ fontSize: 30, margin: "14px 0 4px", textAlign: "center" }}>Welcome to GroomingHer</h1>
      <p style={{ color: "#FBDCE6", fontSize: 18, margin: 0, letterSpacing: 1 }}>Becoming of Age</p>
      <a href="/signup" onClick={() => setShow(false)} style={{ marginTop: 24, background: "#fff", color: "#7C2D52", fontWeight: 800, fontSize: 18, padding: "14px 48px", borderRadius: 14, textDecoration: "none" }}>Get Started</a>
    </div>
  );
}
