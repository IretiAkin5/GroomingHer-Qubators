import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { shares } from "@/lib/schema";

export const dynamic = "force-dynamic";

// Consent ledger: a parent sees ONLY rows created here by the girl herself.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const profileId = String(body?.profileId ?? "");
  const summaryText = String(body?.summaryText ?? "").slice(0, 1000);
  if (!profileId || !summaryText) return NextResponse.json({ error: "Nothing to share yet." }, { status: 400 });
  const [row] = await db.insert(shares).values({
    profileId, assessmentId: body?.assessmentId ?? null,
    summaryText, recipientType: "parent",
  }).returning({ id: shares.id });
  return NextResponse.json({ ok: true, id: row.id });
}

export async function GET(req: Request) {
  const profileId = new URL(req.url).searchParams.get("profileId") ?? "";
  if (!profileId) return NextResponse.json({ error: "Missing profile." }, { status: 400 });
  const rows = await db.select().from(shares).where(eq(shares.profileId, profileId)).orderBy(desc(shares.sharedAt));
  return NextResponse.json({ shares: rows });
}
