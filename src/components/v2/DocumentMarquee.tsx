import "./DocumentMarquee.css";

/*
 * The kinds of paperwork a household keeps, as drawn chips running past both edges of the page.
 *
 * The labels and the drawn pill are the live page's `DocumentBand`; what changes is that the rows
 * now tile and travel instead of being one fixed 1440-wide sample. Positions are computed from the
 * chip widths rather than written down, because a hand-placed row does not tile: the old data ran
 * from x=-40 to x≈1462, so butting a second copy against it would have left a visible gap at the
 * seam. Cumulative widths plus a fixed gap give a row whose end meets its own beginning exactly.
 *
 * Each chip keeps its small tilt and drift so the rows look drawn rather than ruled. Every number
 * here is fixed, never random, so the server and the browser render the same thing.
 */
type Chip = { w: number; label: string; accent?: boolean; dy: number; rot: number };

const GAP = 20;
const PILL_H = 36;
const ROW_H = 52;
/* Pixels per second. Slow enough to read a label as it passes, which is the only reason the row
   is legible rather than decorative. */
const SPEED = 34;

const ROWS: Chip[][] = [
  [
    { w: 94, label: "Passport", accent: true, dy: -2, rot: -1.2 },
    { w: 174, label: "Birth certificate", dy: 3, rot: 0.9 },
    { w: 174, label: "Homeowners policy", accent: true, dy: -1, rot: -0.7 },
    { w: 102, label: "Car title", dy: 2, rot: 1.5 },
    { w: 110, label: "Tax return", dy: -3, rot: -1.1 },
    { w: 62, label: "Will", dy: 1, rot: 0.7 },
    { w: 174, label: "Mortgage statement", dy: 2, rot: -1.4 },
    { w: 142, label: "Insurance card", dy: -2, rot: 1.1 },
    { w: 142, label: "Bank statement", dy: 3, rot: -0.8 },
    { w: 166, label: "Pension statement", dy: -1, rot: 1.3 },
  ],
  [
    { w: 158, label: "Driver’s license", dy: 2, rot: 1.2 },
    { w: 94, label: "Warranty", dy: -3, rot: -1 },
    { w: 174, label: "Vaccination record", dy: 1, rot: 0.8 },
    { w: 70, label: "Lease", dy: 3, rot: -1.4 },
    { w: 190, label: "Marriage certificate", accent: true, dy: -2, rot: 0.6 },
    { w: 62, label: "Deed", dy: 2, rot: -0.9 },
    { w: 166, label: "Power of attorney", dy: -1, rot: 1.3 },
    { w: 190, label: "Vehicle registration", dy: 3, rot: -0.7 },
    { w: 142, label: "Medical record", accent: true, dy: -2, rot: 1 },
    { w: 126, label: "Utility bill", dy: 1, rot: -1.2 },
  ],
];

/** A pill with a bow in each long edge and corners that do not quite meet. */
function pill(x: number, w: number, top: number) {
  const cx = x + w / 2;
  return [
    `M${x + 18} ${top + 0.5}`,
    `Q${cx} ${top - 1.2} ${x + w - 18} ${top}`,
    `Q${x + w - 1} ${top + 3} ${x + w - 1.5} ${top + 18}`,
    `Q${x + w - 1} ${top + 33} ${x + w - 18} ${top + 36}`,
    `Q${cx} ${top + 37.6} ${x + 18} ${top + 35.5}`,
    `Q${x + 1} ${top + 33} ${x + 1.5} ${top + 18}`,
    `Q${x + 1} ${top + 3} ${x + 18} ${top + 0.5}`,
    "Z",
  ].join(" ");
}

/** Cumulative x for each chip, and the row's total width — the width one copy has to be for the
 *  second copy to sit exactly where the first began. */
function layout(chips: Chip[]) {
  let x = 0;
  const placed = chips.map((c) => {
    const at = x;
    x += c.w + GAP;
    return { ...c, at };
  });
  return { placed, width: x };
}

function Row({ chips }: { chips: Chip[] }) {
  const { placed, width } = layout(chips);
  const top = (ROW_H - PILL_H) / 2;

  return (
    <svg width={width} height={ROW_H} viewBox={`0 0 ${width} ${ROW_H}`} className="block shrink-0" strokeLinejoin="round" aria-hidden="true">
      {placed.map((c) => {
        const at = c.at;
        const cx = at + c.w / 2;
        return (
          <g key={c.label} transform={`translate(0 ${c.dy}) rotate(${c.rot} ${cx} ${top + 18})`}>
            <path
              d={pill(at, c.w, top)}
              fill={c.accent ? "var(--color-accent-soft)" : "var(--color-ground)"}
              stroke={c.accent ? "var(--color-accent)" : "var(--color-border-strong)"}
              strokeWidth="1.4"
            />
            <text
              x={cx}
              y={top + 23}
              textAnchor="middle"
              fontSize="15"
              fill={c.accent ? "var(--color-accent)" : "var(--color-text)"}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DocumentMarquee() {
  return (
    /* One label for the pair. The rows themselves are `aria-hidden`: read out, twenty duplicated
       chip names in two copies apiece is noise, and the sentence says what the picture says. */
    <div
      className="flex w-full flex-col gap-[10px]"
      role="img"
      aria-label="The kinds of paperwork Harbor keeps: passports, certificates, policies, titles, tax returns, wills, statements, licenses and more."
    >
      {ROWS.map((chips, i) => {
        const { width } = layout(chips);
        return (
          <div key={i} className="marq">
            <div
              className="marq-track"
              data-dir={i % 2 === 0 ? "right" : "left"}
              style={{ "--marq-dur": `${Math.round(width / SPEED)}s` } as React.CSSProperties}
            >
              <Row chips={chips} />
              <Row chips={chips} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
