import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { db } from "./db";

// Sends OTP by real SMS (Termii). Needs TERMI I_API_KEY + TERMII_SENDER_ID in env.
async function sendSMS(to: string, text: string) {
  const key = process.env.TERMII_API_KEY;
  if (!key) { console.log(`[SMS:dev] to ${to}: ${text}`); return; }
  await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, from: process.env.TERMII_SENDER_ID ?? "GroomingHer", sms: text, type: "plain", channel: "generic", api_key: key }),
  });
}

// Better Auth stores users/sessions in local Postgres. Teen privacy is enforced
// in app code: every query is scoped by profileId; parents read shares only.
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  socialProviders: process.env.GOOGLE_CLIENT_ID
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "" } }
    : undefined,
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => sendSMS(phoneNumber, `Your GroomingHer code is ${code}. It expires in 10 minutes.`),
    }),
  ],
  session: { expiresIn: 60 * 60 * 24 * 7 },
});
