/**
 * The Home screen, drawn rather than screenshotted. Same layout and the same household as the
 * exported mock in public/mock/hero-home@2x.png, which is still there if you want it back: swap
 * the import in Hero.tsx. Everything is one SVG, so it scales cleanly and follows the theme.
 *
 * The wobble is deterministic (seeded off each shape's own position), never random, so the server
 * and the browser draw the identical path and hydration stays quiet.
 */

const INK = "var(--color-text)";
const HAIR = "var(--color-border-strong)";
const MUTED = "var(--color-muted)";
const FAINT = "var(--color-faint)";
const ACCENT = "var(--color-accent)";
const WARN = "var(--color-warn)";

/** Deterministic jitter in [-1, 1] from a seed. */
function j(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

/** A rounded rectangle with every edge bowed and every corner slightly off, as if drawn. */
function box(x: number, y: number, w: number, h: number, r: number, seed = 1) {
  const a = 1.2;
  const t = (n: number) => j(seed + n) * a;
  return [
    `M${x + r} ${y + t(1)}`,
    `Q${x + w / 2} ${y + t(2) - 1} ${x + w - r} ${y + t(3)}`,
    `Q${x + w} ${y} ${x + w + t(4)} ${y + r}`,
    `Q${x + w + t(5) + 1} ${y + h / 2} ${x + w + t(6)} ${y + h - r}`,
    `Q${x + w} ${y + h} ${x + w - r} ${y + h + t(7)}`,
    `Q${x + w / 2} ${y + h + t(8) + 1} ${x + r} ${y + h + t(9)}`,
    `Q${x} ${y + h} ${x + t(10)} ${y + h - r}`,
    `Q${x + t(11) - 1} ${y + h / 2} ${x + t(12)} ${y + r}`,
    `Q${x} ${y} ${x + r} ${y + t(1)}`,
    "Z",
  ].join(" ");
}

/** A circle that does not quite close on itself. */
function ring(cx: number, cy: number, r: number, seed = 1) {
  const t = (n: number) => j(seed + n) * 1.4;
  return [
    `M${cx - r + t(1)} ${cy}`,
    `Q${cx - r + t(2)} ${cy - r} ${cx} ${cy - r + t(3)}`,
    `Q${cx + r} ${cy - r + t(4)} ${cx + r + t(5)} ${cy}`,
    `Q${cx + r + t(6)} ${cy + r} ${cx} ${cy + r + t(7)}`,
    `Q${cx - r} ${cy + r + t(8)} ${cx - r + t(1)} ${cy}`,
    "Z",
  ].join(" ");
}

/** A bowed horizontal rule. */
function line(x: number, y: number, w: number, seed = 1) {
  return `M${x} ${y + j(seed) * 0.8} Q${x + w / 2} ${y + j(seed + 1) * 1.6} ${x + w} ${y + j(seed + 2) * 0.8}`;
}

const NAV = [
  { label: "Home", active: true },
  { label: "Inbox" },
  { label: "To do" },
  { label: "Library" },
  { label: "People & things" },
  { label: "Settings" },
];

/** The sidebar glyphs, drawn around (0,0) and dropped in beside each label. */
function NavIcon({ label, x, y, colour }: { label: string; x: number; y: number; colour: string }) {
  const p: Record<string, string> = {
    Home: "M-8 0 Q0 -8 8 0 M-6 -0.6 Q-5.6 4 -6 8 Q0 9 6 8 Q5.6 4 6 -0.6 M-2 8 Q-1.6 4.4 -2 1.6 Q0 1.2 2 1.6 Q1.6 4.6 2 8",
    Inbox: "M-8 -5.4 Q0 -6.4 8 -5.4 Q8.8 0 8 5.4 Q0 6.4 -8 5.4 Q-8.8 0 -8 -5.4 Z M-8 -5.4 L0 0.6 L8 -5.4",
    "To do": "M-7.6 0 Q-8 -7.6 0 -7.8 Q8 -8 7.8 0 Q8 7.8 0 7.8 Q-8 8 -7.6 0 Z M-3.6 0.4 Q-1.6 2.4 -0.6 3.6 Q1.8 -0.6 4.4 -3.2",
    Library: "M-7.6 -7 Q0 -7.8 7.6 -7 Q8.2 0 7.6 7 Q0 7.8 -7.6 7 Q-8.2 0 -7.6 -7 Z M-4 -2.4 Q0 -1.8 4 -2.4 M-4 2.2 Q-1 2.8 2 2.2",
    "People & things": "M-2.4 -3.4 Q-2.8 -8 1.4 -8 Q5.6 -8 5.2 -3.4 Q5.6 1 1.4 1 Q-2.8 1 -2.4 -3.4 Z M-6.6 8.4 Q-6.2 2.6 1.4 2.6 Q9 2.6 9.4 8.4",
    Settings: "M-7.4 0 Q-7.8 -7.4 0 -7.6 Q7.8 -7.8 7.6 0 Q7.8 7.6 0 7.6 Q-7.8 7.8 -7.4 0 Z M-3 0 Q-3.2 -3.2 0 -3.2 Q3.2 -3.2 3 0 Q3.2 3.2 0 3.2 Q-3.2 3.2 -3 0 Z",
  };
  return <path d={p[label]} transform={`translate(${x} ${y})`} fill="none" stroke={colour} strokeWidth="1.6" />;
}

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

const PEOPLE = [
  { name: "Sarah", role: "Owner", records: "74 records", next: "Expires in 24 days", warn: true, face: "long" },
  { name: "Daniel", role: "Spouse", records: "68 records", next: "Expires in 71 days", face: "beard" },
  { name: "Lucas", role: "Son", records: "31 records", next: "Nothing expiring", face: "short" },
  { name: "Emma", role: "Daughter", records: "24 records", next: "Nothing expiring", face: "bunches" },
];

const THINGS = [
  { name: "1428 Maple Ave", role: "Primary residence", records: "86 records", next: "Expires in 112 days", kind: "house" },
  { name: "Subaru Outback", role: "ABC-4471 · 2019", records: "14 records", next: "Expires in 57 days", kind: "car" },
  { name: "Lake cabin", role: "22 Birch Ln", records: "29 records", next: "Nothing expiring", kind: "cabin" },
  { name: "Chase joint checking", role: "Sarah & Daniel", records: "22 records", next: "Nothing expiring", kind: "account" },
];

const CARD_X = [288, 540, 792, 1044];
const CARD_W = 232;

export function HeroSketch() {
  return (
    <svg
      viewBox="0 0 1320 700"
      className="block h-auto w-full"
      style={{ fontFamily: "var(--font-sans)" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Harbor's Home page, drawn by hand: the Weber household's four people and four things, each with what is on file and the next date that matters."
    >
      <path d={box(2, 2, 1316, 696, 16, 3)} fill="var(--color-panel)" stroke={INK} strokeWidth="2.2" />

      {/* Window chrome */}
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
      <g>
        <path d={ring(34, 92, 11, 40)} fill="none" stroke={ACCENT} strokeWidth="1.9" />
        <path d="M34 86 Q34.6 92 34 98 M29 90.6 Q34 95.4 39 90.6" fill="none" stroke={ACCENT} strokeWidth="1.7" />
        <text x="54" y="98" fill={INK} fontSize="19" fontWeight="700">
          Harbor
        </text>
      </g>
      {NAV.map((n, i) => {
        const y = 130 + i * 40;
        return (
          <g key={n.label}>
            {n.active && <path d={box(16, y - 4, 216, 34, 9, 50 + i)} fill="var(--color-accent-soft)" stroke={ACCENT} strokeWidth="1.3" />}
            <NavIcon label={n.label} x={34} y={y + 13} colour={n.active ? ACCENT : MUTED} />
            <text x="56" y={y + 18} fill={n.active ? ACCENT : MUTED} fontSize="15" fontWeight={n.active ? 600 : 400}>
              {n.label}
            </text>
          </g>
        );
      })}
      <text x="24" y="406" fill={FAINT} fontSize="11" letterSpacing="1.1" style={{ fontFamily: "var(--font-mono)" }}>
        CATEGORIES
      </text>
      {CATEGORIES.map(([name, count], i) => {
        const y = 434 + i * 28;
        return (
          <g key={name}>
            <text x="24" y={y} fill={MUTED} fontSize="14">
              {name}
            </text>
            <text x="224" y={y} fill={FAINT} fontSize="12.5" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
              {count}
            </text>
          </g>
        );
      })}

      {/* Top bar */}
      <path d={line(250, 128, 1068, 70)} stroke={HAIR} strokeWidth="1.6" fill="none" />
      <path d={box(288, 74, 470, 36, 18, 71)} fill="var(--color-ground)" stroke={HAIR} strokeWidth="1.5" />
      <g fill="none" stroke={MUTED} strokeWidth="1.6">
        <path d={ring(312, 90, 5.6, 72)} />
        <path d="M316.6 94.6 Q319.4 97 321.4 99.4" />
      </g>
      <text x="334" y="97" fill={MUTED} fontSize="14">
        Search inside every document
      </text>
      <text x="734" y="97" fill={FAINT} fontSize="12" textAnchor="end" style={{ fontFamily: "var(--font-mono)" }}>
        ⌘K
      </text>
      <path d={box(1118, 74, 172, 36, 18, 73)} fill={ACCENT} stroke={ACCENT} strokeWidth="1.4" />
      <text x="1204" y="97" fill="var(--color-ground)" fontSize="14" fontWeight="600" textAnchor="middle">
        + Add documents
      </text>

      {/* Family */}
      <text x="288" y="184" fill={INK} fontSize="25" fontWeight="700">
        Family
      </text>
      <text x="374" y="184" fill={MUTED} fontSize="14.5">
        4 people · 197 records
      </text>
      {PEOPLE.map((p, i) => (
        <Card key={p.name} x={CARD_X[i]} y={206} seed={100 + i * 7} name={p.name} role={p.role} records={p.records} next={p.next} warn={p.warn}>
          <Face kind={p.face} cx={CARD_X[i] + CARD_W / 2} cy={262} seed={200 + i * 5} />
        </Card>
      ))}

      {/* Property and things */}
      <text x="288" y="440" fill={INK} fontSize="25" fontWeight="700">
        Property &amp; things
      </text>
      <text x="524" y="440" fill={MUTED} fontSize="14.5">
        4 items · 151 records
      </text>
      {THINGS.map((t, i) => (
        <Card key={t.name} x={CARD_X[i]} y={462} seed={300 + i * 7} name={t.name} role={t.role} records={t.records} next={t.next}>
          <Thing kind={t.kind} cx={CARD_X[i] + CARD_W / 2} cy={518} seed={400 + i * 5} />
        </Card>
      ))}
    </svg>
  );
}

function Card({
  x,
  y,
  seed,
  name,
  role,
  records,
  next,
  warn,
  children,
}: {
  x: number;
  y: number;
  seed: number;
  name: string;
  role: string;
  records: string;
  next: string;
  warn?: boolean;
  children: React.ReactNode;
}) {
  const mid = x + CARD_W / 2;
  return (
    <g>
      <path d={box(x, y, CARD_W, 180, 12, seed)} fill="var(--color-ground)" stroke={HAIR} strokeWidth="1.7" />
      {children}
      <text x={mid} y={y + 114} fill={INK} fontSize="15.5" fontWeight="600" textAnchor="middle">
        {name}
      </text>
      <text x={mid} y={y + 134} fill={MUTED} fontSize="12.5" textAnchor="middle">
        {role}
      </text>
      <text x={mid} y={y + 152} fill={MUTED} fontSize="12.5" textAnchor="middle">
        {records}
      </text>
      <text x={mid} y={y + 170} fill={warn ? WARN : MUTED} fontSize="12.5" fontWeight={warn ? 600 : 400} textAnchor="middle">
        {next}
      </text>
    </g>
  );
}

/** Head and shoulders inside the avatar ring, varied just enough to tell four people apart. */
function Face({ kind, cx, cy, seed }: { kind: string; cx: number; cy: number; seed: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.7">
      <path d={ring(cx, cy, 34, seed)} fill="var(--color-surface)" stroke={HAIR} strokeWidth="1.5" />
      <path d={ring(cx, cy - 8, 11, seed + 1)} />
      <path d={`M${cx - 20} ${cy + 26} Q${cx - 18} ${cy + 7} ${cx} ${cy + 6} Q${cx + 18} ${cy + 7} ${cx + 20} ${cy + 26}`} />
      {kind === "long" && <path d={`M${cx - 12} ${cy - 12} Q${cx - 16} ${cy + 6} ${cx - 13} ${cy + 14} M${cx + 12} ${cy - 12} Q${cx + 16} ${cy + 6} ${cx + 13} ${cy + 14}`} />}
      {kind === "beard" && <path d={`M${cx - 9} ${cy - 2} Q${cx} ${cy + 8} ${cx + 9} ${cy - 2}`} />}
      {kind === "short" && <path d={`M${cx - 11} ${cy - 13} Q${cx} ${cy - 22} ${cx + 11} ${cy - 13}`} />}
      {kind === "bunches" && (
        <path d={`M${cx - 13} ${cy - 10} Q${cx - 19} ${cy - 6} ${cx - 17} ${cy + 2} M${cx + 13} ${cy - 10} Q${cx + 19} ${cy - 6} ${cx + 17} ${cy + 2}`} />
      )}
    </g>
  );
}

/** The house, the car, the cabin and the joint account, drawn the same way. */
function Thing({ kind, cx, cy, seed }: { kind: string; cx: number; cy: number; seed: number }) {
  return (
    <g fill="none" stroke={INK} strokeWidth="1.7">
      <path d={ring(cx, cy, 34, seed)} fill="var(--color-surface)" stroke={HAIR} strokeWidth="1.5" />
      {kind === "house" && (
        <g>
          <path d={`M${cx - 18} ${cy + 2} Q${cx} ${cy - 16} ${cx + 18} ${cy + 2}`} />
          <path d={`M${cx - 14} ${cy + 1} Q${cx - 13} ${cy + 9} ${cx - 14} ${cy + 17} Q${cx} ${cy + 19} ${cx + 14} ${cy + 17} Q${cx + 13} ${cy + 9} ${cx + 14} ${cy + 1}`} />
          <path d={`M${cx - 4} ${cy + 18} Q${cx - 3} ${cy + 11} ${cx - 4} ${cy + 7} Q${cx} ${cy + 6} ${cx + 4} ${cy + 7} Q${cx + 3} ${cy + 12} ${cx + 4} ${cy + 18}`} />
        </g>
      )}
      {kind === "car" && (
        <g>
          <path d={`M${cx - 20} ${cy + 6} Q${cx - 18} ${cy - 2} ${cx - 11} ${cy - 3} Q${cx - 6} ${cy - 11} ${cx + 4} ${cy - 10} Q${cx + 12} ${cy - 9} ${cx + 15} ${cy - 2} Q${cx + 20} ${cy - 1} ${cx + 20} ${cy + 6} Q${cx} ${cy + 9} ${cx - 20} ${cy + 6} Z`} />
          <path d={ring(cx - 11, cy + 8, 4.6, seed + 2)} />
          <path d={ring(cx + 11, cy + 8, 4.6, seed + 3)} />
        </g>
      )}
      {kind === "cabin" && (
        <g>
          <path d={`M${cx - 16} ${cy + 4} Q${cx - 3} ${cy - 12} ${cx + 10} ${cy + 4}`} />
          <path d={`M${cx - 12} ${cy + 3} Q${cx - 11} ${cy + 10} ${cx - 12} ${cy + 17} Q${cx - 1} ${cy + 19} ${cx + 6} ${cy + 17} Q${cx + 5} ${cy + 10} ${cx + 6} ${cy + 3}`} />
          <path d={`M${cx + 14} ${cy + 18} Q${cx + 15} ${cy + 8} ${cx + 14} ${cy - 2}`} />
          <path d={`M${cx + 8} ${cy + 1} Q${cx + 14} ${cy - 10} ${cx + 20} ${cy + 1} Z`} />
        </g>
      )}
      {kind === "account" && (
        <g>
          <path d={box(cx - 20, cy - 11, 40, 24, 4, seed + 4)} />
          <path d={`M${cx - 19} ${cy - 3} Q${cx} ${cy - 2} ${cx + 19} ${cy - 3}`} />
          <path d={`M${cx - 13} ${cy + 7} Q${cx - 8} ${cy + 8} ${cx - 3} ${cy + 7}`} />
        </g>
      )}
    </g>
  );
}
