import { NextResponse } from "next/server";
import { answer } from "@/lib/answers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const question = String(body?.question ?? "").slice(0, 500);
  const ageBand = String(body?.ageBand ?? "15-17");
  if (question.trim().length < 3) return NextResponse.json({ error: "Type your question first." }, { status: 400 });

  // Stubbed: reviewed library only. Live AI gated behind Change 18 safety checks.
  const young = ageBand === "12-14";
  const r = answer(question, young);
  return NextResponse.json({ ok: true, ...r });
}
