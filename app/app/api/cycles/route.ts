import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { cycles } from "@/lib/schema";

export const dynamic = "force-dynamic";

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  const profileId = new URL(req.url).searchParams.get("profileId") ?? "";
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });
  const rows = await db.select().from(cycles).where(eq(cycles.profileId, profileId)).orderBy(desc(cycles.startDate));

  const asc = [...rows].reverse();
  const lengths = asc.slice(1).map((c, i) => daysBetween(asc[i].startDate, c.startDate));
  const badge = lengths.length < 1 ? null : lengths.every((l) => l >= 21 && l <= 45) ? "Regular" : "Irregular — see why";
  const avg = lengths.length ? Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length) : 28;
  const last = asc[asc.length - 1]?.startDate;
  const predicted = last ? [addDays(last, avg - 1), addDays(last, avg), addDays(last, avg + 1)] : [];

  return NextResponse.json({ cycles: rows, stats: { lengths, badge, predicted } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  const startDate = String(body?.startDate ?? "");
  const endDate = body?.endDate ? String(body.endDate) : null;
  const flow = ["light", "medium", "heavy"].includes(body?.flow) ? body.flow : "medium";
  if (!profileId || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) return NextResponse.json({ error: "Pick a valid start day." }, { status: 400 });
  if (endDate && !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) return NextResponse.json({ error: "Pick a valid end day." }, { status: 400 });

  const [row] = await db.insert(cycles).values({ profileId, startDate, endDate, flow }).returning({ id: cycles.id });
  return NextResponse.json({ ok: true, id: row.id });
}
