import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments, cycles, symptoms } from "@/lib/schema";
import { DISCLAIMER, triage, type Band } from "@/lib/triage";

export const dynamic = "force-dynamic";

const EXPLAIN: Record<Band, { title: string; body: string; watch: string[] }> = {
  monitor: {
    title: "Looks within the usual range",
    body: "What you logged fits common patterns for your age. Bodies vary a lot, especially in the first years of periods.",
    watch: ["Track one more cycle", "Heat + rest for cramps", "Re-check if pain worsens or bleeding changes"],
  },
  adult: {
    title: "Worth talking about with a trusted adult",
    body: "This pattern is common, but it deserves a conversation — a mum, aunt, teacher, or nurse can help you decide next steps.",
    watch: ["Bring your last 3 period dates", "Note flow and pain scores 1–5", "Write down your questions first"],
  },
  professional: {
    title: "Best checked by a healthcare professional soon",
    body: "What you logged can need a professional look. This is not a diagnosis — it is a nudge to get checked and bring your notes.",
    watch: ["Last 3 period dates + flow", "Pain scores + missed school days", "Any discharge, fever, or dizziness notes"],
  },
  urgent: {
    title: "Tell a trusted adult right now",
    body: "These signs should not wait. Tell a trusted adult immediately and go to a clinic or emergency care.",
    watch: ["Do not stay alone with severe symptoms", "Bring someone with you", "Show them this screen"],
  },
};

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

export async function GET(req: Request) {
  const profileId = new URL(req.url).searchParams.get("profileId") ?? "";
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });
  const rows = await db.select().from(assessments).where(eq(assessments.profileId, profileId)).orderBy(desc(assessments.createdAt)).limit(1);
  if (!rows[0]) return NextResponse.json({ assessment: null });
  return NextResponse.json({ assessment: rows[0] });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });

  const cyc = await db.select().from(cycles).where(eq(cycles.profileId, profileId)).orderBy(desc(cycles.startDate)).limit(4);
  const asc = [...cyc].reverse();
  const lengths = asc.slice(1).map((c, i) => daysBetween(asc[i].startDate, c.startDate));
  const sym = await db.select().from(symptoms).where(eq(symptoms.profileId, profileId)).orderBy(desc(symptoms.date)).limit(7);

  const painMax = Math.max(0, ...sym.map((s) => s.pain ?? 0));
  const missedSchool = sym.some((s) => s.schoolMissed);
  const fainting = /faint/i.test(JSON.stringify(sym.map((s) => [s.mood, s.discharge])));
  const feverWithDischarge = sym.some((s) => /bad smell|yellow|green|itchy/i.test(s.discharge ?? ""));
  const soakingUnder2h = sym.some((s) => /heavy/i.test(s.discharge ?? "")) && cyc.some((c) => c.flow === "heavy");
  const suddenSevere = painMax >= 5 && sym.length <= 2;

  const result = triage({
    ageBand: String(body?.ageBand ?? "15-17"), cycleLengths: lengths,
    bleedingDaysOver7: false, soakingUnder2h, painMax, missedSchool,
    fainting, feverWithDischarge, suddenSeverePain: suddenSevere,
    noPeriodBy16: false, stoppedMonths: 0,
  });
  const copy = EXPLAIN[result.band];

  const [row] = await db.insert(assessments).values({
    profileId,
    inputsSnapshot: { lengths, painMax, missedSchool, symptomCount: sym.length },
    outcome: result.band, explanation: `${copy.title}. ${copy.body}`,
    redFlags: result.flags,
  }).returning({ id: assessments.id });

  return NextResponse.json({
    ok: true, id: row.id, band: result.band, flags: result.flags,
    title: copy.title, body: copy.body, watch: copy.watch,
    nextStep: result.nextStep, disclaimer: DISCLAIMER,
  });
}
