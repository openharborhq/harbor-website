import type { CSSProperties } from "react";
import { ACCENT, box, FAINT, HAIR, INK, line, MUTED, NAV, NAV_GLYPH, ring } from "./sketch";

/**
 * The hero: Harbor's Inbox, drawn by hand and running. Three documents arrive one after another,
 * each is read, given a summary and a suggested filing, then accepted, and the category it went
 * into ticks up by one in the sidebar.
 *
 * One 12s loop. Each row runs the same timeline, offset by four seconds, so at any moment one is
 * arriving, one is being read and one is filed. Under reduced motion every row rests on its filed
 * state and nothing moves.
 */

type Item = {
  title: string;
  source: string;
  summary: [string, string];
  chips: [string, number][];
  category: string;
  from: string;
  to: string;
};

const ITEMS: Item[] = [
  {
    title: "Homeowners Policy Renewal 2027",
    source: "Forwarded by email · 12 min ago · 4 pages",
    summary: ["Annual renewal from State Farm for 1428 Maple Ave.", "$1,684 premium, renews 12/31/2027."],
    chips: [
      ["Insurance › Home", 142],
      ["1428 Maple Ave", 132],
    ],
    category: "Insurance",
    from: "31",
    to: "32",
  },
  {
    title: "Lake County Property Tax Bill 2026",
    source: "Forwarded by email · 2 h ago · 2 pages",
    summary: ["Property tax for 22 Birch Ln, $2,140.", "Due Oct 31. A to-do has been added."],
    chips: [
      ["Taxes › Property", 138],
      ["Lake cabin", 106],
    ],
    category: "Taxes",
    from: "26",
    to: "27",
  },
  {
    title: "Learner’s Permit, Lucas Weber",
    source: "Photo from phone · 3 h ago · 1 page",
    summary: ["Illinois learner’s permit for Lucas.", "Expires Aug 12, 2028. You will be reminded."],
    chips: [
      ["Identity › Licenses", 150],
      ["Lucas", 80],
    ],
    category: "Identity",
    from: "18",
    to: "19",
  },
];

/** Sidebar counts. The three that receive a document cross-fade to their new number. */
const CATEGORIES: [string, string][] = [
  ["Identity", "18"],
  ["Real Estate", "61"],
  ["Transportation", "14"],
  ["Money", "37"],
  ["Purchases", "122"],
  ["Taxes", "26"],
  ["Insurance", "31"],
  ["Health", "44"],
  ["Legal & Estate", "9"],
];

const ROW_Y = [236, 386, 536];
/*
 * Negative delays start each row part way through its own cycle, so the hero opens on a full
 * inbox with one document arriving at the top, rather than an empty list that fills up.
 */
const DELAY = ["0s", "-4s", "-8s"];

export function HeroInbox() {
  return (
    <svg
      viewBox="0 0 1320 700"
      className="block h-auto w-full"
      style={{ fontFamily: "var(--font-sans)" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Harbor's Inbox, drawn by hand: documents arriving by email and photo, each read, summarized and filed into a category automatically."
    >
      <path d={box(2, 2, 1316, 696, 16, 3)} fill="var(--color-panel)" stroke={INK} strokeWidth="2.2" />

      <path d={line(4, 56, 1312, 9)} stroke={HAIR} strokeWidth="1.6" fill="none" />
      {[26, 48, 70].map((cx, i) => (
        <path key={cx} d={ring(cx, 29, 5.5, 20 + i)} fill="none" stroke={HAIR} strokeWidth="1.5" />
      ))}
      <path d={box(108, 15, 226, 27, 13, 31)} fill="var(--color-surface)" stroke={HAIR} strokeWidth="1.4" />
      <text x="132" y="33" fill={MUTED} fontSize="12.5" style={{ fontFamily: "var(--font-mono)" }}>
        harbor.home.local
      </text>

      {/* Sidebar */}
      <path d="M248 58 Q250 380 248 690" stroke={HAIR} strokeWidth="1.6" fill="none" />
      <path d={ring(34, 92, 11, 40)} fill="none" stroke={ACCENT} strokeWidth="1.9" />
      <path d="M34 86 Q34.6 92 34 98 M29 90.6 Q34 95.4 39 90.6" fill="none" stroke={ACCENT} strokeWidth="1.7" />
      <text x="54" y="98" fill={INK} fontSize="19" fontWeight="700">
        Harbor
      </text>
      {NAV.map((label, i) => {
        const y = 130 + i * 40;
        const active = label === "Inbox";
        return (
          <g key={label}>
            {active && <path d={box(16, y - 4, 216, 34, 9, 50 + i)} fill="var(--color-accent-soft)" stroke={ACCENT} strokeWidth="1.3" />}
            <path d={NAV_GLYPH[label]} transform={`translate(34 ${y + 13})`} fill="none" stroke={active ? ACCENT : MUTED} strokeWidth="1.6" />
            <text x="56" y={y + 18} fill={active ? ACCENT : MUTED} fontSize="15" fontWeight={active ? 600 : 400}>
              {label}
            </text>
            {active && (
              <text x="224" y={y + 18} fill={ACCENT} fontSize="12.5" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
                3
              </text>
            )}
          </g>
        );
      })}
      <text x="24" y="406" fill={FAINT} fontSize="11" letterSpacing="1.1" style={{ fontFamily: "var(--font-mono)" }}>
        CATEGORIES
      </text>
      {CATEGORIES.map(([name, count], i) => {
        const y = 434 + i * 28;
        const item = ITEMS.find((it) => it.category === name);
        const d = item ? DELAY[ITEMS.indexOf(item)] : undefined;
        return (
          <g key={name}>
            <text x="24" y={y} fill={MUTED} fontSize="14">
              {name}
            </text>
            {item ? (
              <g style={{ "--d": d } as CSSProperties}>
                <text x="224" y={y} className="hib-count-old" fill={FAINT} fontSize="12.5" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.from}
                </text>
                <text x="224" y={y} className="hib-count-new" fill={ACCENT} fontSize="12.5" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.to}
                </text>
              </g>
            ) : (
              <text x="224" y={y} fill={FAINT} fontSize="12.5" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
                {count}
              </text>
            )}
          </g>
        );
      })}

      {/* Inbox header */}
      <text x="288" y="186" fill={INK} fontSize="25" fontWeight="700">
        Inbox
      </text>
      <text x="288" y="212" fill={MUTED} fontSize="14.5">
        Arriving from your mailbox and your phone, read and filed on the way in
      </text>

      {ITEMS.map((item, i) => (
        <Row key={item.title} item={item} y={ROW_Y[i]} seed={120 + i * 9} delay={DELAY[i]} />
      ))}
    </svg>
  );
}

function Row({ item, y, seed, delay }: { item: Item; y: number; seed: number; delay: string }) {
  const style = { "--d": delay } as CSSProperties;
  return (
    <g className="hib-row" style={style}>
      <path d={box(288, y, 1000, 126, 12, seed)} fill="var(--color-ground)" stroke={HAIR} strokeWidth="1.7" />

      {/* Page thumbnail */}
      <path d={box(310, y + 16, 72, 94, 6, seed + 40)} fill="var(--color-surface)" stroke={HAIR} strokeWidth="1.5" />
      <g stroke={HAIR} strokeWidth="2.2" fill="none">
        {[44, 34, 48, 30].map((w, k) => (
          <path key={k} d={line(322, y + 36 + k * 15, w, seed + k)} />
        ))}
      </g>

      <text x="402" y={y + 38} fill={INK} fontSize="17" fontWeight="600">
        {item.title}
      </text>
      <text x="402" y={y + 60} fill={FAINT} fontSize="13">
        {item.source}
      </text>

      {/* Reading, then what it says */}
      <g className="hib-reading">
        <text x="402" y={y + 90} fill={MUTED} fontSize="13.5">
          Reading the pages…
        </text>
        <path d={line(402, y + 102, 300, seed + 7)} stroke="var(--color-accent-soft)" strokeWidth="4" fill="none" />
        <path
          className="hib-bar"
          d={line(402, y + 102, 300, seed + 7)}
          stroke={ACCENT}
          strokeWidth="4"
          fill="none"
          pathLength={100}
          style={style}
        />
      </g>
      <g className="hib-summary">
        <text x="402" y={y + 86} fill={MUTED} fontSize="13.5">
          {item.summary[0]}
        </text>
        <text x="402" y={y + 106} fill={MUTED} fontSize="13.5">
          {item.summary[1]}
        </text>
      </g>

      {/* The filing Harbor proposes, then accepts */}
      <g className="hib-chips">
        <text x="900" y={y + 40} fill={FAINT} fontSize="10.5" letterSpacing="1" style={{ fontFamily: "var(--font-mono)" }}>
          FILED TO
        </text>
        {item.chips.map(([label, w], k) => (
          <g key={label}>
            <path d={box(900, y + 52 + k * 34, w, 26, 13, seed + 60 + k)} fill="var(--color-accent-soft)" stroke={ACCENT} strokeWidth="1.2" />
            <text x={900 + w / 2} y={y + 69 + k * 34} fill={ACCENT} fontSize="12.5" fontWeight="500" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </g>
      <g className="hib-check">
        <path d={ring(1246, y + 63, 15, seed + 80)} fill={ACCENT} stroke={ACCENT} strokeWidth="1.3" />
        <path d={`M1239 ${y + 63} Q1242 ${y + 67} 1243.4 ${y + 69.4} Q1247.4 ${y + 62} 1253 ${y + 57}`} fill="none" stroke="var(--color-ground)" strokeWidth="2.2" />
      </g>
    </g>
  );
}
