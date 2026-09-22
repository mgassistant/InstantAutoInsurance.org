import { NextRequest, NextResponse } from "next/server";

const BROKERIQ_URL =
  process.env.BROKERIQ_URL || "https://www.broker-iq.com/api/leads/inbound";

// Insurance tenant fallback so leads always reach BrokerIQ for auto-contact
// even if the env var is unset in prod. Env var overrides when a dedicated
// instantautoinsurance.org tenant is created by the dev team.
const TENANT_ID =
  process.env.BROKERIQ_TENANT_ID || "a48b4bbb-0a1a-4cef-bb21-56c7bf94f64e";
const SOURCE = "instantautoinsurance.org";
const LEAD_TYPE = "auto_insurance";

// Email notification (Resend) — optional, degrades gracefully if unset.
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || "";
const NOTIFY_FROM =
  process.env.LEAD_NOTIFY_FROM ||
  "Instant Auto Insurance <support@instantautoinsurance.org>";

async function sendEmail(subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY || !NOTIFY_TO) return false; // not configured — skip silently
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: NOTIFY_TO.split(",").map((s) => s.trim()),
        subject,
        html,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Lead email notification failed:", err);
    return false;
  }
}

function esc(v: string): string {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // Beacon may send a Blob; try text fallback.
    try {
      const text = await req.text();
      body = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    } catch {
      body = {};
    }
  }

  const isPartial = body.partial === true || body.lead_status === "partial";

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const phone = String(body.phone || "").replace(/\D/g, "");
  const zip = String(body.zip || "").trim();
  const vehicle = String(body.vehicle || "").trim();
  const sr22 = String(body.sr22 || "").trim();
  const state = String(body.state || "CA").trim();

  // For a complete submit, require the basics. Partial leads pass through
  // with whatever contact info exists.
  if (!isPartial) {
    const missing: string[] = [];
    if (!name || name.length < 2) missing.push("name");
    if (phone.length < 10) missing.push("phone");
    if (!email.includes("@") || !email.includes(".")) missing.push("email");
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing or invalid: ${missing.join(", ")}`, missing },
        { status: 400 }
      );
    }
  }

  const leadStatus = isPartial ? "partial" : "complete";

  // 1) BrokerIQ (fail-open). BrokerIQ dedups by email/phone, so a later
  //    complete submission updates the same partial record.
  const brokerPromise = fetch(BROKERIQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      message: [
        vehicle ? `Vehicle: ${vehicle}` : "",
        sr22 ? `SR-22: ${sr22}` : "",
        zip ? `ZIP: ${zip}` : "",
      ]
        .filter(Boolean)
        .join(" | "),
      source: SOURCE,
      tenant_id: TENANT_ID,
      lead_type: LEAD_TYPE,
      lead_status: leadStatus,
      state,
      raw: {
        origin: SOURCE,
        lead_status: leadStatus,
        partial: isPartial,
        name,
        email,
        phone,
        zip,
        vehicle,
        sr22,
        state,
      },
    }),
  })
    .then((r) => r.ok)
    .catch((err) => {
      console.error("BrokerIQ submission failed:", err);
      return false;
    });

  // 2) Agency email via Resend (fail-open). Skipped for partial leads.
  let emailPromise: Promise<boolean> = Promise.resolve(false);
  if (!isPartial) {
    const html = `
    <h2>New auto insurance request — InstantAutoInsurance.org</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">
      <tr><td><b>Name</b></td><td>${esc(name) || "—"}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(email) || "—"}</td></tr>
      <tr><td><b>Phone</b></td><td>${esc(phone) || "—"}</td></tr>
      <tr><td><b>ZIP</b></td><td>${esc(zip) || "—"}</td></tr>
      <tr><td><b>Vehicle</b></td><td>${esc(vehicle) || "—"}</td></tr>
      <tr><td><b>SR-22</b></td><td>${esc(sr22) || "—"}</td></tr>
      <tr><td><b>State</b></td><td>${esc(state) || "—"}</td></tr>
    </table>
    <p style="color:#888;font-size:12px">Source: ${SOURCE}</p>`;
    emailPromise = sendEmail(
      `New auto quote — ${name || email || phone || "no data"}`,
      html
    );
  }

  await Promise.allSettled([brokerPromise, emailPromise]);

  // Fail-open: always return ok so a downstream failure never blocks the visitor.
  return NextResponse.json({ ok: true });
}
