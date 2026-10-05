import { NextResponse } from "next/server";
import { LANGS, type Lang } from "@/lib/i18n";

/*
 * The Harbor Cloud waitlist.
 *
 * Sign-ups go to PostHog as a `waitlist_joined` event on a person keyed by the email address, so
 * signing up twice updates one person instead of making two. The request is made from here, not
 * from the browser, because the people this site is for run ad blockers, and a blocked browser
 * call would lose the sign-up without anyone noticing.
 *
 * PostHog is a stopgap (US-hosted, no confirmation email). Before launch emails go out, the list
 * moves to an EU mailing service with double opt-in; the form says where the address is kept
 * until then.
 */
const PLANS = ["backup", "legacy", "undecided"] as const;
type Plan = (typeof PLANS)[number];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // A field people never see. Bots fill it in; they get a success and nothing is stored.
  if (typeof body.website === "string" && body.website !== "") return NextResponse.json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const plan = PLANS.includes(body.plan as Plan) ? (body.plan as Plan) : null;
  const lang = LANGS.includes(body.lang as Lang) ? (body.lang as Lang) : "en";
  if (!EMAIL.test(email) || email.length > 254 || !plan || body.consent !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.POSTHOG_HOST ?? process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host || !/^https:\/\//.test(host)) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  const now = new Date().toISOString();
  const res = await fetch(`${host.replace(/\/$/, "")}/i/v0/e/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: token,
      event: "waitlist_joined",
      distinct_id: email,
      timestamp: now,
      properties: {
        plan,
        language: lang,
        source: "pricing_page",
        $set: { email, waitlist_plan: plan, waitlist_language: lang, waitlist_consent_at: now },
        $set_once: { waitlist_joined_at: now },
      },
    }),
  }).catch(() => null);

  if (!res?.ok) return NextResponse.json({ error: "unavailable" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
