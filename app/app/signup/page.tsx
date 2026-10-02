"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

// Flowers behind, card on top. 3: choose email OR phone → matching inputs appear.
export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [msg, setMsg] = useState("");

  const inp: React.CSSProperties = { width: "100%", padding: 13, borderRadius: 12, border: "2px solid #F1D9E0", fontSize: 16, margin: "6px 0", background: "#fff" };
  const btn: React.CSSProperties = { width: "100%", padding: 14, borderRadius: 12, background: "#7C2D52", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer", margin: "6px 0" };
  const contact = method === "email" ? email : phone;

  async function sendCode() {
    setMsg("");
    if (!firstName.trim()) { setMsg("Tell us your first name first 💗"); return; }
    if (method === "phone") {
      if (phone.replace(/\D/g, "").length < 10) { setMsg("Enter a full phone number (+234...)."); return; }
      const r = await authClient.$fetch("/phone-number/send-otp", { method: "POST", body: { phoneNumber: phone } }) as { error?: object };
      if (r?.error) { setMsg("Could not send code. Check the number."); return; }
      setCodeSent(true);
      setMsg("Code sent by SMS (or server console in test mode).");
    } else {
      if (!/.+@.+\..+/.test(email)) { setMsg("Enter a valid email address."); return; }
      if (password.length < 6) { setMsg("Password needs 6+ characters."); return; }
      setCodeSent(true);
      setMsg("Demo: your email code is 123456 — enter it below.");
    }
  }

  async function verify() {
    setMsg("");
    if (method === "phone") {
      const r = await authClient.$fetch("/phone-number/verify", { method: "POST", body: { phoneNumber: phone, code } }) as { error?: object };
      if (r?.error) { setMsg("Wrong or expired code."); return; }
    } else if (code.trim() !== "123456") { setMsg("Wrong code. Demo code is 123456."); return; }
    localStorage.setItem("gh_first", firstName);
    localStorage.setItem("gh_last", lastName);
    localStorage.setItem("gh_contact", contact);
    localStorage.setItem("gh_method", method);
    setVerified(true);
  }

  async function google() {
    if (firstName.trim()) localStorage.setItem("gh_first", firstName);
    await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
  }

  return (
    <div style={{ margin: -16, padding: 16, background: "#FBDCE6", borderRadius: 20 }}>
      <p style={{ textAlign: "center", fontSize: 22, margin: "0 0 4px" }}>🌸🌺🌷🌺🌸</p>
      <div style={{ background: "#fff", borderRadius: 20, padding: 18, border: "2px solid #F1D9E0" }}>
        <h1 style={{ fontSize: 24, margin: "0 0 4px" }}>Create your account 🌷</h1>
        <label style={{ fontSize: 14, color: "#8a6b76" }}>1 · First name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={inp} />
        <label style={{ fontSize: 14, color: "#8a6b76" }}>2 · Last name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={inp} />
        <label style={{ fontSize: 14, color: "#8a6b76" }}>3 · Sign up with email or phone?</label>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { setMethod("email"); setCodeSent(false); setVerified(false); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: method === "email" ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: method === "email" ? "#FBDCE6" : "#fff", fontWeight: 800 }}>✉️ Email</button>
          <button onClick={() => { setMethod("phone"); setCodeSent(false); setVerified(false); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: method === "phone" ? "2px solid #E85D8A" : "2px solid #F1D9E0", background: method === "phone" ? "#FBDCE6" : "#fff", fontWeight: 800 }}>📱 Phone</button>
        </div>
        {method === "email" ? (
          <div><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" style={inp} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Choose a password (6+ characters)" style={inp} /></div>
        ) : (
          <div><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number (+234...)" style={inp} /></div>
        )}
        {!codeSent && <button onClick={sendCode} style={btn}>4 · Send me a code</button>}
        {codeSent && !verified && <div>
          <label style={{ fontSize: 14, color: "#8a6b76" }}>5 · Enter the code, then Verify</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456" inputMode="numeric" style={{ ...inp, letterSpacing: 4, textAlign: "center" }} />
            <button onClick={verify} style={{ ...btn, width: 130 }}>Verify</button>
          </div>
        </div>}
        {msg && <p style={{ color: msg.startsWith("Code sent") || msg.startsWith("Demo") ? "#15803D" : "#DC2626" }}>{msg}</p>}
        {verified && <p style={{ color: "#15803D", fontWeight: 800 }}>✓ Verified — welcome, {firstName || "friend"}!</p>}
        <button disabled={!verified} onClick={() => { window.location.href = "/onboarding"; }}
          style={{ ...btn, background: verified ? "#E85D8A" : "#ccc", cursor: verified ? "pointer" : "default" }}>6 · Continue to Onboarding</button>
        <p style={{ textAlign: "center", color: "#8a6b76" }}>— or —</p>
        <button onClick={google} style={{ ...btn, background: "#fff", color: "#3F2A33", border: "2px solid #F1D9E0" }}>G Continue with Google (automatic)</button>
      </div>
      <p style={{ textAlign: "center", fontSize: 20, margin: "8px 0 0" }}>🌷🌸🌺🌸🌷</p>
    </div>
  );
}
