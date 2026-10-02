import { NextResponse } from "next/server";
import { scryptSync, randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { profiles } from "@/lib/schema";

export const dynamic = "force-dynamic";

const AGES = ["12-14", "15-17", "18-19"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const ageBand = String(body?.ageBand ?? "");
  const menarcheStatus = String(body?.menarcheStatus ?? "");
  const language = String(body?.language ?? "en");
  const pin = String(body?.pin ?? "");
  const firstName = String(body?.firstName ?? "").slice(0, 60);
  const lastName = String(body?.lastName ?? "").slice(0, 60);
  const email = String(body?.email ?? "").slice(0, 120);
  const phone = String(body?.phone ?? "").slice(0, 20);

  if (!AGES.includes(ageBand)) return NextResponse.json({ error: "Pick an age band." }, { status: 400 });
  if (!["yes", "no"].includes(menarcheStatus)) return NextResponse.json({ error: "Say whether your period started." }, { status: 400 });
  if (!/^\d{4}$/.test(pin)) return NextResponse.json({ error: "PIN must be 4 digits." }, { status: 400 });

  const salt = randomBytes(16).toString("hex");
  const pinHash = `${salt}:${scryptSync(pin, salt, 32).toString("hex")}`;

  const [row] = await db.insert(profiles).values({ ageBand, menarcheStatus, language, pinHash, firstName: firstName || null, lastName: lastName || null, email: email || null, phone: phone || null }).returning({ id: profiles.id });
  return NextResponse.json({ ok: true, profileId: row.id });
}
