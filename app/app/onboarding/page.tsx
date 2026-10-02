"use client";
import { useState } from "react";

function bandFor(age: number) {
  if (age <= 14) return "12-14";
  if (age <= 17) return "15-17";
  return "18-19";
}

export default function Onboarding() {
  const [role, setRole] = useState<"girl" | "parent" | null>(null);
  const [age, setAge] = useState("");
  const [menarche, setMenarche] = useState("yes");
  const [msg, setMsg] = useState("");

  const chip = (on: boolean): React.CSSProperties => ({
    padding: "14px 20px", borderRadius: 14, minHeight: 52, margin: 6, cursor: "pointer", fontSize: 17,
    border: on ? "2px solid #E85D8A" : "2px solid #F1D9E0",
    background: on ? "#FBDCE6" : "#fff", fontWeight: on ? 800 : 400, width: "100%",
  });

  async function goHome() {
    setMsg("");
    const n = Number(age);
    if (!Number.isInteger(n) || n < 8 || n > 25) { setMsg("Type your age in numbers (e.g. 14)."); return; }
    const res = await fetch("/api/profile", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ageBand: bandFor(n), menarcheStatus: menarche, language: "en", pin: "",
        firstName: localStorage.getItem("gh_first") ?? "", lastName: localStorage.getItem("gh_last") ?? "",
        email: localStorage.getItem("gh_method") === "email" ? localStorage.getItem("gh_contact") ?? "" : "",
        phone: localStorage.getItem("gh_method") === "phone" ? localStorage.getItem("gh_contact") ?? "" : "",
      }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error ?? "Could not save."); return; }
    localStorage.setItem("gh_profile", data.profileId);
    localStorage.setItem("gh_role", "girl");
    localStorage.setItem("gh_age", String(n));
    window.location.href = "/";
  }

  function goParent() {
    localStorage.setItem("gh_role", "parent");
    window.location.href = "/parent";
  }

  if (!role) return (
    <div style={{ textAlign: "center", paddingTop: 30 }}>
      <h1 style={{ fontSize: 26 }}>Who is joining? 💗</h1>
      <button onClick={() => setRole("girl")} style={chip(false)}>👧 I am a Girl</button>
      <button onClick={() => setRole("parent")} style={chip(false)}>👪 I am a Parent</button>
    </div>
  );

  if (role === "parent") return (
    <div style={{ textAlign: "center", paddingTop: 30 }}>
      <h1 style={{ fontSize: 24 }}>Welcome, Parent 🤝</h1>
      <p style={{ color: "#8a6b76" }}>Guides, alerts, and support — you see only what your daughter shares.</p>
      <button onClick={goParent} style={{ padding: "14px 32px", borderRadius: 14, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer" }}>Enter Parent Space</button>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>How old are you? 🎂</h1>
      <p style={{ color: "#8a6b76" }}>Type your age — your content fits your stage.</p>
      <input value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))} inputMode="numeric" placeholder="e.g. 14" style={{ fontSize: 28, padding: 14, borderRadius: 14, border: "2px solid #7C2D52", width: "100%", textAlign: "center" }} />
      <h3>Has your period started?</h3>
      <div style={{ display: "flex", gap: 8 }}>
        {[["yes", "Yes"], ["no", "Not yet"]].map(([v, l]) => (
          <button key={v} onClick={() => setMenarche(v)} style={{ flex: 1, padding: 12, borderRadius: 12, border: menarche === v ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: menarche === v ? "#FBDCE6" : "#fff", fontWeight: 800 }}>{l}</button>
        ))}
      </div>
      {age && Number(age) >= 8 && <p style={{ color: "#15803D" }}>You'll get the {bandFor(Number(age))} experience: {Number(age) <= 14 ? "simple basics" : Number(age) <= 17 ? "managing + recognizing" : "owning your health"}.</p>}
      {msg && <p style={{ color: "#DC2626" }}>{msg}</p>}
      <button onClick={goHome} style={{ width: "100%", padding: 14, borderRadius: 14, background: "#E85D8A", color: "#fff", fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer", marginTop: 12 }}>Take me home →</button>
    </div>
  );
}
