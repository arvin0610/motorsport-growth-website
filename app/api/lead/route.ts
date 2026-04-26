import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  company: z.string().min(2),
  email:   z.string().email(),
  type:    z.enum(["Performance Ads", "Lead Gen", "Creative", "Web", "Brand"]),
  budget:  z.enum(["<5k/mo", "5–15k/mo", "15–40k/mo", "40k+/mo"]),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // TODO: wire to inbox / CRM (Resend, Postmark, HubSpot). Logs in dev.
  if (process.env.NODE_ENV !== "production") {
    console.log("[lead]", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
