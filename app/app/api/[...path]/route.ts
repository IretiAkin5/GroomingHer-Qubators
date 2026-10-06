import { NextResponse } from "next/server";
function disabled() {
  return NextResponse.json(
    {
      error:
        "Live accounts and personal health collection are disabled in this fictional demonstration.",
    },
    { status: 410 },
  );
}
export const GET = disabled;
export const POST = disabled;
export const PUT = disabled;
export const PATCH = disabled;
export const DELETE = disabled;
