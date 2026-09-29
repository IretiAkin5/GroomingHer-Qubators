import { NextResponse } from "next/server";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  const pin = String(body?.pin ?? "");
  if (!profileId || !/^\d{4}$/.test(pin)) return NextResponse.json({ error: "Enter your 4-digit PIN." }, { status: 400 });

  const rows = await db.select({ pinHash: profiles.pinHash }).from(profiles).where(eq(profiles.id, profileId)).limit(1);
  const stored = rows[0]?.pinHash;
  if (!stored) return NextResponse.json({ error: "Profile not found. Please sign up again." }, { status: 404 });

  const [salt, hash] = stored.split(":");
  const check = scryptSync(pin, salt, 32).toString("hex");
  const ok = timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(check, "hex"));
  if (!ok) return NextResponse.json({ error: "Wrong PIN. Try again." }, { status: 401 });
  return NextResponse.json({ ok: true });
}
