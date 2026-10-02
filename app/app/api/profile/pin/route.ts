import { NextResponse } from "next/server";
import { scryptSync, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  const pin = String(body?.pin ?? "");
  if (!profileId || !/^\d{4}$/.test(pin)) return NextResponse.json({ error: "PIN must be exactly 4 digits." }, { status: 400 });
  const salt = randomBytes(16).toString("hex");
  const pinHash = `${salt}:${scryptSync(pin, salt, 32).toString("hex")}`;
  await db.update(profiles).set({ pinHash }).where(eq(profiles.id, profileId));
  return NextResponse.json({ ok: true });
}
