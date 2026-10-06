import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({
    ok: true,
    app: "groomingher",
    mode: "fictional-demo",
    healthCollection: false,
  });
}
