"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { groupVariants, itemVariants } from "./Stagger";
import type { Lang } from "@/lib/i18n";

/*
 * Four things Harbor does, with a stage on the left showing whichever is selected.
 *
 * This was drawn as a selector long before it behaved as one: only the Inbox stage existed, and
 * wiring a control that showed the same panel four times would have been worse than leaving it
 * inert. The other three are now drawn (2026-09-17), so the switch is live.
 *
 * The stages are mockups, not screenshots, but the vocabulary is the product's own — a suggestion
 * opens "Looks like …" and carries a category, items, dates, at most three tags and a confidence;
 * items are people and things alike, each with its glyph; a share expires in 24 hours, 7 days or
 * 30 days and gives each recipient their own link. Inventing field names here is how a marketing
 * page and an app drift apart, so none are invented. The household is the same one the Inbox rows
 * already used.
 *
 * Each option owns a tint, and the stage takes the tint of whichever is active, so the colour is
 * what ties the selection to the panel rather than being decoration.
 *
 * In German, the app's own words stay English, because the app is: screen names, field labels,
 * statuses and the share durations. What Harbor writes about a document is in the household's
 * language, so titles, the "Looks like …" summary (German: „Sieht aus wie …“), values, tags and
 * item names are German — the same Weber family, living in Germany.
 */
type Tint = "accent" | "violet" | "green" | "warn";

const TILE: Record<Tint, string> = {
  accent: "bg-accent-soft",
  violet: "bg-violet-soft",
  green: "bg-green-soft",
  warn: "bg-warn-soft",
};

const STROKE: Record<Tint, string> = {
  accent: "var(--color-accent)",
  violet: "var(--color-violet)",
  green: "var(--color-green)",
  warn: "var(--color-warn)",
};

/* Written out rather than interpolated: Tailwind scans for whole class names, and a `bg-${tint}`
   would compile to nothing at all. */
const WASH: Record<Tint, string> = {
  accent: "bg-accent-soft text-accent",
  violet: "bg-violet-soft text-violet",
  green: "bg-green-soft text-green",
  warn: "bg-warn-soft text-warn",
};

const MONO = "font-mono text-label font-medium leading-[14px] tracking-mono";

/* ────────────────────────────── the stage's shared furniture ───────────────────────────── */

function Stage({ tint, icon, title, meta, children }: { tint: Tint; icon: ReactNode; title: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-panel">
      <div className="flex items-center justify-between gap-[12px] border-b border-border bg-surface-2 px-[18px] py-[14px]">
        <span className="flex min-w-0 items-center gap-[10px]">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={STROKE[tint]} strokeWidth="1.8" aria-hidden="true">
            {icon}
          </svg>
          <span className="truncate text-body font-bold leading-[20px] text-text">{title}</span>
        </span>
        {/* The mono count is the first thing to go when the panel narrows: it is a detail that
            makes the mockup feel real, and at 375px it would run off the panel's edge. */}
        <span className={`${MONO} hidden shrink-0 text-faint sm:block`}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

/** The page-of-paper thumbnail every stage uses to stand in for a document. */
function Thumb({ lit }: { lit?: boolean }) {
  return (
    <div className={`flex h-[48px] w-[38px] shrink-0 flex-col gap-[4px] rounded-sm p-[7px] ${lit ? "bg-panel" : "bg-surface"}`}>
      <i className="block h-[3px] w-full rounded-[2px] bg-border-strong" />
      <i className="block h-[3px] w-[80%] rounded-[2px] bg-border" />
      <i className="block h-[3px] w-[90%] rounded-[2px] bg-border" />
    </div>
  );
}

function Chip({ tint, children }: { tint: Tint; children: ReactNode }) {
  return <span className={`rounded-pill px-[9px] py-[3px] text-[11px] font-medium leading-[14px] ${WASH[tint]}`}>{children}</span>;
}

/* ──────────────────────────────────── 1 · the Inbox ────────────────────────────────────── */

const MAIL = (
  <>
    <rect x="3" y="5.5" width="18" height="13" rx="2.6" />
    <path d="m4.2 7.8 6.9 5.1a1.5 1.5 0 0 0 1.8 0l6.9-5.1" strokeLinecap="round" />
  </>
);

/** One Inbox row. `state` marks the document mid-processing, which is what the stage is showing. */
function Row({ title, meta, tags, state }: { title: string; meta: string; tags: string[]; state?: boolean }) {
  return (
    <li
      className={`flex items-center gap-[14px] rounded-md p-[14px] ${
        state ? "border-[1.5px] border-accent bg-accent-soft" : "border border-border bg-ground"
      }`}
    >
      <Thumb lit={state} />
      <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
        <span className="line-clamp-2 text-row font-bold leading-[18px] text-text">{title}</span>
        <span className="truncate text-small leading-[16px] text-muted">{meta}</span>
        <div className="flex flex-wrap items-center gap-[6px]">
          {tags.map((t) => (
            <span
              key={t}
              className={`rounded-pill px-[9px] py-[3px] text-[11px] font-medium leading-[14px] text-accent ${state ? "bg-panel" : "bg-accent-soft"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {state && (
        <span className={`${MONO} shrink-0 rounded-pill bg-accent px-[11px] py-[5px] text-ground`}>TAGGING</span>
      )}
    </li>
  );
}

/* `meta` is the app's line, English in both; titles and tags are the household's. */
type InboxRow = { title: string; meta: string; tags: string[] };

const INBOX_ROWS: Record<Lang, [InboxRow, InboxRow, InboxRow]> = {
  en: [
    { title: "Homeowners Policy Renewal 2027", meta: "Forwarded by email · just now", tags: ["Insurance", "1428 Maple Ave"] },
    { title: "Lake County Property Tax Bill", meta: "Forwarded by email · 2 h ago", tags: ["Taxes", "Lake cabin"] },
    { title: "Learner’s Permit, Lucas Weber", meta: "Photo from phone · 3 h ago", tags: ["Identity", "Lucas"] },
  ],
  de: [
    { title: "Wohngebäudeversicherung 2027", meta: "Forwarded by email · just now", tags: ["Versicherungen", "Ahornweg 12"] },
    { title: "Grundsteuerbescheid 2026", meta: "Forwarded by email · 2 h ago", tags: ["Steuern", "Ferienhaus am See"] },
    { title: "BF17-Bescheinigung, Lucas Weber", meta: "Photo from phone · 3 h ago", tags: ["Ausweise", "Lucas"] },
  ],
};

function InboxStage({ lang }: { lang: Lang }) {
  const [first, second, third] = INBOX_ROWS[lang];
  return (
    <Stage tint="accent" icon={MAIL} title="Inbox" meta="3 TO REVIEW">
      <ul className="flex flex-col gap-[12px] p-[18px]">
        <Row state {...first} />
        <Row {...second} />
        <Row {...third} />
      </ul>
    </Stage>
  );
}

/* ─────────────────────────────── 2 · what the model read ───────────────────────────────── */

const SPARK = (
  <>
    <path d="M13.6 3.2l1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9 1.9-5Z" strokeLinejoin="round" />
    <path d="M5.8 15.4v4.4M3.6 17.6H8" strokeLinecap="round" />
  </>
);

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <dt className={`${MONO} text-faint`}>{label}</dt>
      <dd className="text-row font-medium leading-[18px] text-text">{value}</dd>
    </div>
  );
}

const READING: Record<Lang, { title: string; summary: string; category: string; item: string; dated: string; renews: string; tags: [string, string, string] }> = {
  en: {
    title: "Homeowners Policy Renewal 2027",
    summary: "Looks like the annual homeowners policy for 1428 Maple Ave. It renews on 1 March and the premium is $1,840 for the year.",
    category: "Insurance",
    item: "1428 Maple Ave",
    dated: "14 February 2027",
    renews: "1 March 2027",
    tags: ["Insurance", "Renewal", "Maple Ave"],
  },
  de: {
    title: "Wohngebäudeversicherung 2027",
    summary: "Sieht aus wie die jährliche Wohngebäudeversicherung für Ahornweg 12. Sie verlängert sich am 1. März, der Beitrag liegt bei 1.840 € im Jahr.",
    category: "Versicherungen",
    item: "Ahornweg 12",
    dated: "14. Februar 2027",
    renews: "1. März 2027",
    tags: ["Versicherung", "Verlängerung", "Ahornweg"],
  },
};

function ReadingStage({ lang }: { lang: Lang }) {
  const r = READING[lang];
  return (
    <Stage tint="violet" icon={SPARK} title={r.title} meta="SUGGESTED">
      <div className="flex flex-col gap-[18px] p-[18px]">
        <div className="flex items-start gap-[14px]">
          <Thumb />
          <p className="flex-1 rounded-md bg-violet-soft p-[13px] text-row leading-[21px] text-text">
            {r.summary}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-[18px] gap-y-[16px]">
          <Field label="CATEGORY" value={r.category} />
          <Field label="FILED AGAINST" value={r.item} />
          <Field label="DATED" value={r.dated} />
          <Field label="RENEWS" value={r.renews} />
        </dl>

        <div className="flex flex-wrap items-center gap-[6px] border-t border-border pt-[16px]">
          <Chip tint="violet">{r.tags[0]}</Chip>
          <Chip tint="violet">{r.tags[1]}</Chip>
          <Chip tint="violet">{r.tags[2]}</Chip>
          <span className={`${MONO} ml-auto text-faint`}>HIGH CONFIDENCE</span>
        </div>
      </div>
    </Stage>
  );
}

/* ──────────────────────────── 3 · people, things and pets ──────────────────────────────── */

const PAWS = (
  <>
    <ellipse cx="7.2" cy="8.6" rx="1.9" ry="2.4" />
    <ellipse cx="12" cy="6.8" rx="1.9" ry="2.5" />
    <ellipse cx="16.8" cy="8.6" rx="1.9" ry="2.4" />
    <path
      d="M12 12.6c2.6 0 4.8 2 4.8 4.2 0 1.7-1.3 2.8-3 2.8h-3.6c-1.7 0-3-1.1-3-2.8 0-2.2 2.2-4.2 4.8-4.2Z"
      strokeLinejoin="round"
    />
  </>
);

/* People get their initial, things get a glyph — the same split the app makes, so a grid of both
   reads at a glance. */
const ITEMS: Record<Lang, { glyph: string; name: string; kind: string; on?: boolean }[]> = {
  en: [
    { glyph: "M", name: "Maya", kind: "Person" },
    { glyph: "⌂", name: "1428 Maple Ave", kind: "Property" },
    { glyph: "⛭", name: "Volvo V60", kind: "Vehicle" },
    { glyph: "❋", name: "Rosie", kind: "Pet", on: true },
  ],
  de: [
    { glyph: "M", name: "Maya", kind: "Person" },
    { glyph: "⌂", name: "Ahornweg 12", kind: "Property" },
    { glyph: "⛭", name: "Volvo V60", kind: "Vehicle" },
    { glyph: "❋", name: "Rosie", kind: "Pet", on: true },
  ],
};

const PET_DOCS: Record<Lang, { title: string; meta: string; tag: string }[]> = {
  en: [
    { title: "Vet invoice — dental clean", meta: "Paid · 9 January 2027", tag: "Veterinary" },
    { title: "Rabies vaccination record", meta: "Valid to 4 June 2028", tag: "Health" },
    { title: "Pet insurance policy", meta: "Renews 1 October 2027", tag: "Insurance" },
  ],
  de: [
    { title: "Tierarztrechnung – Zahnreinigung", meta: "Bezahlt · 9. Januar 2027", tag: "Tierarzt" },
    { title: "Tollwut-Impfnachweis", meta: "Gültig bis 4. Juni 2028", tag: "Gesundheit" },
    { title: "Tierkrankenversicherung", meta: "Verlängert sich am 1. Oktober 2027", tag: "Versicherung" },
  ],
};

function ItemsStage({ lang }: { lang: Lang }) {
  return (
    <Stage tint="green" icon={PAWS} title="Rosie" meta="PET · 6 DOCUMENTS">
      <div className="flex flex-col gap-[18px] p-[18px]">
        <ul className="flex flex-wrap gap-[8px]">
          {ITEMS[lang].map((it) => (
            <li
              key={it.name}
              className={`flex items-center gap-[9px] rounded-pill py-[7px] pl-[7px] pr-[14px] ${
                it.on ? "border-[1.5px] border-green bg-green-soft" : "border border-border bg-ground"
              }`}
            >
              <span
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-pill text-[13px] font-bold leading-none ${
                  it.on ? "bg-green text-panel" : "bg-surface text-muted"
                }`}
              >
                {it.glyph}
              </span>
              <span className={`text-row font-medium leading-[18px] ${it.on ? "text-text" : "text-muted"}`}>{it.name}</span>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-[10px] border-t border-border pt-[16px]">
          {PET_DOCS[lang].map((d) => (
            <li key={d.title} className="flex items-center gap-[14px] rounded-md border border-border bg-ground p-[13px]">
              <Thumb />
              <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                <span className="line-clamp-2 text-row font-bold leading-[18px] text-text">{d.title}</span>
                <span className="truncate text-small leading-[16px] text-muted">{d.meta}</span>
              </div>
              <span className="hidden shrink-0 sm:block">
                <Chip tint="green">{d.tag}</Chip>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}

/* ──────────────────────────────── 4 · one expiring link ────────────────────────────────── */

const SHARE = (
  <>
    <circle cx="17.4" cy="5.8" r="2.6" />
    <circle cx="6.6" cy="12" r="2.6" />
    <circle cx="17.4" cy="18.2" r="2.6" />
    <path d="m9 10.7 5.9-3.4M9 13.3l5.9 3.4" strokeLinecap="round" />
  </>
);

function Tick() {
  return (
    <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] bg-warn">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="var(--color-panel)" strokeWidth="2.2" aria-hidden="true">
        <path d="M2.5 6.2 4.9 8.6 9.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* "Share with" and the durations are the app's; the recipient and the documents are the household's. */
const SHARED: Record<Lang, { title: string; docs: string[] }> = {
  en: {
    title: "Share with Dr. Alvarez",
    docs: ["Rabies vaccination record", "Vet invoice — dental clean", "Pet insurance policy", "Microchip registration"],
  },
  de: {
    title: "Share with Dr. Albers",
    docs: ["Tollwut-Impfnachweis", "Tierarztrechnung – Zahnreinigung", "Tierkrankenversicherung", "Mikrochip-Registrierung"],
  },
};

function ShareStage({ lang }: { lang: Lang }) {
  const sh = SHARED[lang];
  return (
    <Stage tint="warn" icon={SHARE} title={sh.title} meta="4 SELECTED">
      <div className="flex flex-col gap-[16px] p-[18px]">
        <ul className="flex flex-col gap-[8px]">
          {sh.docs.map((t) => (
            <li key={t} className="flex items-center gap-[12px] rounded-md border border-border bg-ground px-[13px] py-[11px]">
              <Tick />
              <span className="min-w-0 flex-1 truncate text-row font-medium leading-[18px] text-text">{t}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-[10px] border-t border-border pt-[16px]">
          <div className="flex items-center justify-between gap-[12px]">
            <span className={`${MONO} text-faint`}>LINK EXPIRES</span>
            <span className="flex gap-[6px]">
              {["24 hours", "7 days", "30 days"].map((o) => (
                <span
                  key={o}
                  className={`rounded-pill px-[11px] py-[4px] text-[12px] font-medium leading-[16px] ${
                    o === "7 days" ? "bg-warn text-panel" : "border border-border text-muted"
                  }`}
                >
                  {o}
                </span>
              ))}
            </span>
          </div>
          <div className="flex items-center gap-[10px] rounded-md bg-warn-soft px-[13px] py-[12px]">
            <span className="min-w-0 flex-1 truncate font-mono text-row leading-[18px] text-warn">harbor.home/s/8f3ca1…</span>
            <span className={`${MONO} shrink-0 text-warn`}>STOPS IN 7 DAYS</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ──────────────────────────────────────── the section ──────────────────────────────────── */

type Option = { head: string; copy: string; tint: Tint; glyph: ReactNode; stage: ReactNode };

function options(lang: Lang): Option[] {
  if (lang === "de") {
    return [
      {
        head: "Unterlagen zusammenführen",
        copy: "Verbinde ein Postfach oder leite Dokumente an Harbor weiter. Neue Eingänge prüfst du in deiner Inbox.",
        tint: "accent",
        glyph: MAIL,
        stage: <InboxStage lang={lang} />,
      },
      {
        head: "Vorschläge prüfen",
        copy: "Harbor schlägt Titel, Kategorie, Tags und wichtige Termine vor. Du prüfst sie, bevor etwas abgelegt wird.",
        tint: "violet",
        glyph: SPARK,
        stage: <ReadingStage lang={lang} />,
      },
      {
        head: "Nach Person oder Ding ordnen",
        copy: "Unterlagen liegen bei der Person, dem Haus, dem Auto oder dem Haustier, zu dem sie gehören – vom Reisepass bis zur Tierarztrechnung.",
        tint: "green",
        glyph: PAWS,
        stage: <ItemsStage lang={lang} />,
      },
      {
        head: "Eine Kopie teilen",
        copy: "Wähl Dokumente aus, leg fest, wann der Link abläuft, und gib ihn weiter. Den Zugriff kannst du jederzeit widerrufen.",
        tint: "warn",
        glyph: SHARE,
        stage: <ShareStage lang={lang} />,
      },
    ];
  }
  return [
    {
      head: "Bring paperwork together",
      copy: "Connect a mailbox or forward documents to Harbor. Review new arrivals in your Inbox.",
      tint: "accent",
      glyph: MAIL,
      stage: <InboxStage lang={lang} />,
    },
    {
      head: "Review the suggestions",
      copy: "Harbor suggests a title, category, tags, and important dates. Review them before filing.",
      tint: "violet",
      glyph: SPARK,
      stage: <ReadingStage lang={lang} />,
    },
    {
      head: "Organize by person or thing",
      copy: "Keep records with the person, home, car, or pet they belong to, from passports to vet bills.",
      tint: "green",
      glyph: PAWS,
      stage: <ItemsStage lang={lang} />,
    },
    {
      head: "Share a copy",
      copy: "Select documents, set an expiration date, and send a link. Revoke access whenever you need to.",
      tint: "warn",
      glyph: SHARE,
      stage: <ShareStage lang={lang} />,
    },
  ];
}

/** The section's own words, around the stage. */
const SECTION: Record<Lang, { eyebrow: string; head: string; lead: string; tabs: string }> = {
  en: {
    eyebrow: "HOW IT WORKS",
    head: "See how Harbor works",
    lead: "From a bill arriving in your inbox to a copy shared with your accountant.",
    tabs: "What Harbor does",
  },
  de: {
    eyebrow: "SO FUNKTIONIERT’S",
    head: "So arbeitet Harbor",
    lead: "Von der Rechnung in deinem Postfach bis zur Kopie für deine Steuerberatung.",
    tabs: "Was Harbor macht",
  },
};

/** The tabs enter from the right rather than from below. */
const FROM_RIGHT = itemVariants("right");

export function HowItWorks({ lang = "en" }: { lang?: Lang } = {}) {
  const OPTIONS = options(lang);
  const t = SECTION[lang];
  const [active, setActive] = useState(0);
  const still = useReducedMotion();
  const tabList = useRef<HTMLDivElement>(null);
  const tabsInView = useInView(tabList, { once: true, amount: 0.12 });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /* A vertical tablist, so Up and Down move between options and the panel follows. Without this a
     keyboard reaches the options but cannot use them the way the pattern promises. */
  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : e.key === "Home" ? -active : e.key === "End" ? OPTIONS.length - 1 - active : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + OPTIONS.length) % OPTIONS.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="flex flex-col gap-[56px] rounded-[26px] bg-surface-2 lane py-[60px] md:py-[88px]">
      <div className="flex flex-col gap-[18px]">
        <span className={`${MONO} text-faint`}>{t.eyebrow}</span>
        <h2 className="max-w-[820px] text-section-head font-bold leading-[1.1] tracking-tight text-text">
          {t.head}
        </h2>
        <p className="max-w-[700px] text-lead leading-copy text-muted">
          {t.lead}
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-[44px] lg:flex-row">
        {/* The stage. `surface` against the section's `surface-2` is a small step, so the hairline
            is doing real work here rather than decoration. The min-height is the tallest panel's:
            without it the section would grow and shrink under the cursor as options are tried. */}
        <div
          id="how-stage"
          role="tabpanel"
          aria-labelledby={`how-tab-${active}`}
          className="flex min-h-[476px] min-w-0 flex-1 flex-col rounded-[20px] border border-border bg-surface p-[20px]"
        >
          {/* Keyed, and deliberately without AnimatePresence: `mode="wait"` plays the old panel
              out before the new one starts, which leaves the stage empty for the length of the
              exit — a blank flash on every click. Remounting on the key and fading the new panel
              in means the stage is never empty. */}
          <motion.div
            key={active}
            className="flex flex-1 flex-col"
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {OPTIONS[active].stage}
          </motion.div>
        </div>

        {/* The tabs come in from the right, one after another. The variants are applied to the
            tablist and its buttons directly rather than through a wrapper component: anything
            between a tablist and its tabs breaks the relationship that control depends on. */}
        <motion.div
          ref={tabList}
          role="tablist"
          aria-orientation="vertical"
          aria-label={t.tabs}
          onKeyDown={onKey}
          className="flex w-full shrink-0 flex-col gap-[10px] lg:w-[430px]"
          variants={still ? undefined : groupVariants(0.09, 0.06)}
          initial={still ? false : "hidden"}
          animate={still ? false : tabsInView ? "visible" : "hidden"}
        >
          {OPTIONS.map((o, i) => {
            const on = i === active;
            return (
              <motion.button
                key={o.head}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                data-motion
                variants={still ? undefined : FROM_RIGHT}
                type="button"
                role="tab"
                id={`how-tab-${i}`}
                aria-selected={on}
                aria-controls="how-stage"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex gap-[16px] rounded-lg p-[22px] text-left transition-colors duration-150 ease-out ${
                  on ? "border border-border bg-panel" : "border border-transparent hover:bg-panel/60"
                }`}
              >
                <span className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg ${TILE[o.tint]}`}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={STROKE[o.tint]} strokeWidth="1.7" aria-hidden="true">
                    {o.glyph}
                  </svg>
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-[6px]">
                  <span className={`text-section font-bold leading-[26px] tracking-snug ${on ? "text-text" : "text-muted"}`}>{o.head}</span>
                  <span className={`text-[15.5px] leading-[25px] ${on ? "text-muted" : "text-faint"}`}>{o.copy}</span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
