import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_LEN = 500;
const MAX_DESC = 5000;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trims and strips accidental wrapping quotes from .env values */
function normalizeEnvString(value: string | undefined): string {
  if (!value) return "";
  let s = value.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function formatResendError(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  const e = error as Record<string, unknown>;
  if (typeof e.message === "string") return e.message;
  if (Array.isArray(e.message)) {
    return e.message
      .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
      .join("; ");
  }
  const nested = e.error;
  if (nested && typeof nested === "object" && "message" in nested) {
    return formatResendError(nested);
  }
  return undefined;
}

function buildEmailHtml(fields: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  description: string;
}): string {
  const rows = [
    ["First name", fields.firstName],
    ["Last name", fields.lastName],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Subject", fields.title],
    ["Description", fields.description || "—"],
  ] as const;

  const bodyRows = rows
    .map(
      ([label, value]) => `
  <tr>
    <td style="padding:12px 16px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#334155;width:140px;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td>
  </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(15,23,42,0.08);">
    <tr>
      <td style="padding:24px 24px 8px;">
        <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#6366f1;">JudyTech</p>
        <h1 style="margin:8px 0 0;font-size:22px;color:#0f172a;">New contact form submission</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${bodyRows}</table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;

  // Honeypot — bots often fill hidden fields
  if (isNonEmptyString(o._hp) && o._hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const firstName = isNonEmptyString(o.firstName) ? o.firstName.trim() : "";
  const lastName = isNonEmptyString(o.lastName) ? o.lastName.trim() : "";
  const email = isNonEmptyString(o.email) ? o.email.trim() : "";
  const phone = isNonEmptyString(o.phone) ? o.phone.trim() : "";
  const title = isNonEmptyString(o.title) ? o.title.trim() : "";
  const description =
    typeof o.description === "string" ? o.description.trim().slice(0, MAX_DESC) : "";

  if (!firstName || firstName.length > MAX_LEN) {
    return NextResponse.json({ error: "Invalid first name" }, { status: 400 });
  }
  if (!lastName || lastName.length > MAX_LEN) {
    return NextResponse.json({ error: "Invalid last name" }, { status: 400 });
  }
  if (!email || email.length > MAX_LEN || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!phone || phone.length > MAX_LEN) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }
  if (!title || title.length > MAX_LEN) {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  const apiKey = normalizeEnvString(process.env.RESEND_API_KEY);
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Email service is not configured",
        detail: "Set RESEND_API_KEY in .env.local (see .env.example).",
      },
      { status: 500 }
    );
  }

  const to =
    normalizeEnvString(process.env.CONTACT_TO_EMAIL) || "mahmoudria94@gmail.com";
  const from =
    normalizeEnvString(process.env.CONTACT_FROM_EMAIL) ||
    normalizeEnvString(process.env.CONTACT_FROM) ||
    "JudyTech <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const subject = `JudyTech contact: ${title.slice(0, 120)}`;

  let sendResult: { data: unknown; error: unknown };
  try {
    sendResult = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html: buildEmailHtml({ firstName, lastName, email, phone, title, description }),
    });
  } catch (err) {
    console.error("[contact] send threw", err);
    return NextResponse.json(
      {
        error: "Failed to send message",
        detail: err instanceof Error ? err.message : undefined,
      },
      { status: 500 }
    );
  }

  const { error } = sendResult;
  if (error) {
    const detail = formatResendError(error);
    console.error("[contact] Resend error", error);
    return NextResponse.json(
      {
        error: "Failed to send message",
        detail:
          detail ??
          "Check RESEND_API_KEY and that CONTACT_TO_EMAIL matches your Resend account email when using onboarding@resend.dev, or verify a domain at resend.com/domains.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
