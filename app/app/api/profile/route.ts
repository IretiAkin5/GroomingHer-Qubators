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

  if (!AGES.includes(ageBand)) return NextResponse.json({ error: "Pick an age band." }, { status: 400 });
  if (!["yes", "no"].includes(menarcheStatus)) return NextResponse.json({ error: "Say whether your period started." }, { status: 400 });
  if (!/^\d{4}$/.test(pin)) return NextResponse.json({ error: "PIN must be 4 digits." }, { status: 400 });

  const salt = randomBytes(16).toString("hex");
  const pinHash = `${salt}:${scryptSync(pin, salt, 32).toString("hex")}`;

  const [row] = await db.insert(profiles).values({ ageBand, menarcheStatus, language, pinHash }).returning({ id: profiles.id });
  return NextResponse.json({ ok: true, profileId: row.id });
}
