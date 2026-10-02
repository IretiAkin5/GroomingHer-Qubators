"use client";
import { useEffect, useState } from "react";

// Splash: a 12-year-old gradually becoming a woman. Flat SVG, no gradients.
function Growing() {
  return (
    <svg viewBox="0 0 300 130" style={{ width: "100%", maxWidth: 300 }}>
      <circle cx="150" cy="52" r="40" fill="#FBDCE6" />
      <g fill="#7C2D52">
        <circle cx="70" cy="52" r="12" /><rect x="62" y="66" width="16" height="34" rx="7" />
        <circle cx="150" cy="44" r="14" /><rect x="140" y="60" width="20" height="44" rx="9" />
        <circle cx="230" cy="36" r="15" /><path d="M218 54 Q230 50 242 54 L240 104 L220 104 Z" />
      </g>
      <g fill="#E85D8A">
        <circle cx="70" cy="106" r="4" /><circle cx="150" cy="108" r="4" /><circle cx="230" cy="108" r="4" />
      </g>
      <path d="M40 112 H260" stroke="#7C2D52" strokeWidth="3" strokeLinecap="round" />
      <text x="70" y="126" textAnchor="middle" fontSize="11" fill="#8A6B76">12</text>
      <text x="150" y="126" textAnchor="middle" fontSize="11" fill="#8A6B76">15</text>
      <text x="230" y="126" textAnchor="middle" fontSize="11" fill="#8A6B76">19</text>
    </svg>
  );
}

export default function Splash() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("gh_profile") && window.location.pathname === "/") setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#7C2D52", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 50 }}>
      <div style={{ background: "#FFF7F9", borderRadius: 24, padding: 16, width: "100%", maxWidth: 340 }}>
        <Growing />
      </div>
      <h1 style={{ fontSize: 32, margin: "20px 0 4px" }}>Welcome to GroomingHer</h1>
      <p style={{ color: "#FBDCE6", fontSize: 18, margin: 0, letterSpacing: 1 }}>Becoming of Age</p>
      <a href="/signup" onClick={() => setShow(false)} style={{ marginTop: 28, background: "#fff", color: "#7C2D52", fontWeight: 800, fontSize: 18, padding: "14px 48px", borderRadius: 14, textDecoration: "none" }}>Get Started</a>
    </div>
  );
}
