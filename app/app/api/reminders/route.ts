import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { cycles, symptoms } from "@/lib/schema";
import { computeReminders } from "@/lib/reminders";

export const dynamic = "force-dynamic";

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

export async function GET(req: Request) {
  const profileId = new URL(req.url).searchParams.get("profileId") ?? "";
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });
  const cyc = await db.select().from(cycles).where(eq(cycles.profileId, profileId)).orderBy(desc(cycles.startDate)).limit(6);
  const sym = await db.select().from(symptoms).where(eq(symptoms.profileId, profileId)).orderBy(desc(symptoms.date)).limit(1);
  const asc = [...cyc].reverse();
  const lengths = asc.slice(1).map((c, i) => daysBetween(asc[i].startDate, c.startDate));
  const badge = lengths.length < 1 ? null : lengths.every((l) => l >= 21 && l <= 45) ? "Regular" : "Irregular — see why";
  const reminders = computeReminders(
    cyc.map((c) => c.startDate), sym[0]?.date ?? null, badge,
  );
  const moods = await db.select({ date: symptoms.date, mood: symptoms.mood }).from(symptoms).where(eq(symptoms.profileId, profileId)).orderBy(desc(symptoms.date)).limit(7);
  return NextResponse.json({ reminders, moods });
}
