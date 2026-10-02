"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [method, setMethod] = useState<"email" | "phone" | null>(null);
  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");

  const inp: React.CSSProperties = { width: "100%", padding: 13, borderRadius: 12, border: "2px solid #F1D9E0", fontSize: 16, margin: "6px 0" };
  const btn: React.CSSProperties = { width: "100%", padding: 14, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer", margin: "6px 0" };

  async function sendCode() {
    setMsg("");
    if (method === "phone") {
      const r = await authClient.$fetch("/phone-number/send-otp", { method: "POST", body: { phoneNumber: contact } }) as { error?: object };
      if (r?.error) { setMsg("Could not send code. Check the number (+234...)."); return; }
    } else {
      if (!/.+@.+\..+/.test(contact)) { setMsg("Enter a valid email address."); return; }
    }
    setCodeSent(true);
    setMsg(method === "phone" ? "Code sent by SMS (or server console in test mode)." : "Demo: your code is 123456 — enter it below.");
  }

  async function verify() {
    setMsg("");
    if (method === "phone") {
      const r = await authClient.$fetch("/phone-number/verify", { method: "POST", body: { phoneNumber: contact, code } }) as { error?: object };
      if (r?.error) { setMsg("Wrong or expired code."); return; }
    } else if (code.trim() !== "123456") { setMsg("Wrong code. Demo code is 123456."); return; }
    localStorage.setItem("gh_first", firstName);
    localStorage.setItem("gh_contact", contact);
    localStorage.setItem("gh_method", method ?? "");
    setVerified(true);
  }

  async function google() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
  }

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>Create your account</h1>
      <label style={{ fontSize: 14, color: "#8a6b76" }}>1 · First name</label>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={inp} />
      <label style={{ fontSize: 14, color: "#8a6b76" }}>2 · Last name</label>
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={inp} />
      <label style={{ fontSize: 14, color: "#8a6b76" }}>3 · Email address</label>
      <input value={method === "email" ? contact : ""} onChange={(e) => { setMethod("email"); setContact(e.target.value); setCodeSent(false); setVerified(false); }} placeholder="you@example.com" style={inp} />
      <label style={{ fontSize: 14, color: "#8a6b76" }}>4 · Or use phone instead</label>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setMethod("email"); setCodeSent(false); setVerified(false); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: method === "email" ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: method === "email" ? "#FBDCE6" : "#fff", fontWeight: 800 }}>✉️ Email</button>
        <button onClick={() => { setMethod("phone"); setContact(""); setCodeSent(false); setVerified(false); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: method === "phone" ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: method === "phone" ? "#FBDCE6" : "#fff", fontWeight: 800 }}>📱 Phone</button>
      </div>
      {method === "phone" && <div><label style={{ fontSize: 14, color: "#8a6b76" }}>Your phone number</label>
        <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+2348012345678" style={inp} /></div>}
      {method && !codeSent && <button onClick={sendCode} style={btn}>5 · Send me a code</button>}
      {codeSent && !verified && <div>
        <label style={{ fontSize: 14, color: "#8a6b76" }}>5 · Enter the code, then Verify</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" inputMode="numeric" style={{ ...inp, letterSpacing: 4, textAlign: "center" }} />
          <button onClick={verify} style={{ ...btn, width: 130 }}>Verify</button>
        </div>
      </div>}
      {msg && <p style={{ color: msg.startsWith("Code sent") ? "#15803D" : "#DC2626" }}>{msg}</p>}
      {verified && <p style={{ color: "#15803D", fontWeight: 800 }}>✓ Verified — welcome, {firstName || "friend"}!</p>}
      <button disabled={!verified} onClick={() => { localStorage.setItem("gh_first", firstName); localStorage.setItem("gh_last", lastName); window.location.href = "/onboarding"; }}
        style={{ ...btn, background: verified ? "#E85D8A" : "#ccc", cursor: verified ? "pointer" : "default" }}>6 · Continue to Onboarding</button>
      <p style={{ textAlign: "center", color: "#8a6b76" }}>— or —</p>
      <button onClick={google} style={{ ...btn, background: "#fff", color: "#3F2A33", border: "2px solid #F1D9E0" }}>G Continue with Google (automatic)</button>
    </div>
  );
}
