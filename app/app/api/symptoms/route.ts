import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { cycles, symptoms } from "@/lib/schema";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const profileId = q.get("profileId") ?? "";
  const date = q.get("date") ?? "";
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });
  const rows = date
    ? await db.select().from(symptoms).where(and(eq(symptoms.profileId, profileId), eq(symptoms.date, date)))
    : await db.select().from(symptoms).where(eq(symptoms.profileId, profileId)).orderBy(desc(symptoms.date));
  return NextResponse.json({ symptoms: rows });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  const date = String(body?.date ?? new Date().toISOString().slice(0, 10));
  const pain = Math.max(0, Math.min(5, Number(body?.pain ?? 0) || 0));
  if (!profileId || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "Missing profile or date." }, { status: 400 });

  const latest = await db.select({ id: cycles.id }).from(cycles).where(eq(cycles.profileId, profileId)).orderBy(desc(cycles.startDate)).limit(1);
  const [row] = await db.insert(symptoms).values({
    profileId, cycleId: latest[0]?.id ?? null, date, pain,
    discharge: body?.discharge ? String(body.discharge) : null,
    acne: !!body?.acne, bloating: !!body?.bloating,
    mood: body?.mood ? String(body.mood) : null,
    schoolMissed: !!body?.schoolMissed,
  }).returning({ id: symptoms.id });
  return NextResponse.json({ ok: true, id: row.id });
}
