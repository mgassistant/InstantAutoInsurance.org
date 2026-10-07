import { NextRequest, NextResponse } from "next/server";
import { clientIP, verifyEmail } from "@/lib/emailVerification";

export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = (body?.email || "").toString().trim();
  } catch {
    return NextResponse.json({ ok: true, checked: false, reason: "bad_request" });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, checked: false, reason: "invalid_format" });
  }

  // Shared helper (fail-open). The quote route runs the same check again
  // server-side, so this endpoint is a courtesy to the visitor, not the only gate.
  return NextResponse.json(await verifyEmail(email, clientIP(req)));
}
