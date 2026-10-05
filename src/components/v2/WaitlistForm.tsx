"use client";

import { useId, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { Arrow, PRIMARY } from "./parts";

/*
 * The Harbor Cloud waitlist: an email address, the plan someone is interested in, and an explicit
 * yes to one email at launch. Posts to /api/waitlist, which forwards to PostHog.
 *
 * The consent line says plainly where the address is kept, because the rest of the site makes the
 * same kind of promise about documents: state what leaves, and to whom.
 */
type Plan = "backup" | "legacy" | "undecided";

const COPY: Record<
  Lang,
  {
    email: string;
    placeholder: string;
    plan: string;
    plans: Record<Plan, string>;
    consent: string;
    submit: string;
    sending: string;
    done: string;
    doneLead: string;
    invalid: string;
    failed: string;
  }
> = {
  en: {
    email: "Email address",
    placeholder: "you@example.com",
    plan: "Which plan interests you?",
    plans: { backup: "Harbor Backup", legacy: "Backup + Legacy", undecided: "Not sure yet" },
    consent:
      "Email me once when Harbor Cloud opens. Until then my address is stored with PostHog, the site’s analytics provider, on servers in the US.",
    submit: "Join the waitlist",
    sending: "Joining…",
    done: "You’re on the list.",
    doneLead: "We’ll email you once, when subscriptions open.",
    invalid: "Enter a valid email address and tick the box to join.",
    failed: "That didn’t go through. Try again in a minute.",
  },
  de: {
    email: "E-Mail-Adresse",
    placeholder: "du@beispiel.de",
    plan: "Welcher Tarif interessiert dich?",
    plans: { backup: "Harbor Backup", legacy: "Backup + Legacy", undecided: "Weiß ich noch nicht" },
    consent:
      "Schreibt mir einmal, wenn Harbor Cloud startet. Bis dahin liegt meine Adresse bei PostHog, dem Analysedienst dieser Website, auf Servern in den USA.",
    submit: "Auf die Warteliste",
    sending: "Wird eingetragen …",
    done: "Du stehst auf der Liste.",
    doneLead: "Wir schreiben dir einmal, wenn die Abos starten.",
    invalid: "Gib eine gültige E-Mail-Adresse ein und setz das Häkchen.",
    failed: "Das hat nicht geklappt. Versuch es in einer Minute noch einmal.",
  },
};

export function WaitlistForm({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const id = useId();
  const [plan, setPlan] = useState<Plan>("legacy");
  const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "failed">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const consent = form.get("consent") === "on";
    if (!email || !consent || !event.currentTarget.checkValidity()) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, plan, consent, lang, website: form.get("website") ?? "" }),
      });
      setState(res.ok ? "done" : res.status === 400 ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col gap-[6px] rounded-[20px] border border-border bg-panel p-[22px] sm:p-[28px]">
        <p className="text-section font-bold leading-[26px] tracking-snug text-text">{t.done}</p>
        <p className="text-body leading-[24px] text-muted">{t.doneLead}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-[22px] rounded-[20px] border border-border bg-panel p-[22px] sm:p-[28px]"
    >
      <div className="flex flex-col gap-[8px]">
        <label htmlFor={`${id}-email`} className="text-body font-semibold leading-[20px] text-text">
          {t.email}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={t.placeholder}
          className="w-full rounded-[12px] border border-border-strong bg-ground px-[14px] py-[11px] text-copy leading-[22px] text-text placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <fieldset className="flex flex-col gap-[10px]">
        <legend className="mb-[8px] text-body font-semibold leading-[20px] text-text">{t.plan}</legend>
        <div className="flex flex-wrap gap-[10px]">
          {(Object.keys(t.plans) as Plan[]).map((p) => (
            <label
              key={p}
              className={`flex cursor-pointer items-center gap-[8px] rounded-pill border px-[14px] py-[8px] text-body leading-[20px] transition-colors duration-150 ${
                plan === p ? "border-accent bg-accent-soft text-text" : "border-border bg-ground text-muted hover:text-text"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={p}
                checked={plan === p}
                onChange={() => setPlan(p)}
                className="accent-[var(--color-accent)]"
              />
              {t.plans[p]}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex gap-[10px] text-row leading-[21px] text-muted">
        <input type="checkbox" name="consent" required className="mt-[3px] shrink-0 accent-[var(--color-accent)]" />
        <span>{t.consent}</span>
      </label>

      {/* Hidden from people and assistive tech; only a bot fills it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-[12px] sm:flex-row sm:items-center sm:gap-[18px]">
        <button
          type="submit"
          disabled={state === "sending"}
          className={`flex items-center gap-[9px] ${PRIMARY} transition-[filter] duration-150 hover:brightness-[1.08] disabled:opacity-60`}
        >
          {state === "sending" ? t.sending : t.submit}
          {state !== "sending" && <Arrow />}
        </button>
        {(state === "invalid" || state === "failed") && (
          <p role="alert" className="text-row leading-[20px] text-warn">
            {state === "invalid" ? t.invalid : t.failed}
          </p>
        )}
      </div>
    </form>
  );
}
