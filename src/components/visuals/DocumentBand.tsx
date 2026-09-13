/**
 * The kinds of paperwork a household keeps, as drawn chips running past both edges of the page.
 * The bleed is the point: it reads as a sample of a longer list rather than a complete inventory.
 *
 * Each chip carries its own small tilt and drift, so the rows look drawn rather than ruled. The
 * numbers are fixed, never random, so the server and the browser render the same thing.
 */
type Chip = { x: number; w: number; label: string; accent?: boolean; dy: number; rot: number };

const ROW_TOP = [10, 78];

const ROWS: Chip[][] = [
  [
    { x: -40, w: 94, label: "Passport", accent: true, dy: -2, rot: -1.2 },
    { x: 72, w: 174, label: "Birth certificate", dy: 3, rot: 0.9 },
    { x: 264, w: 174, label: "Homeowners policy", accent: true, dy: -1, rot: -0.7 },
    { x: 456, w: 102, label: "Car title", dy: 2, rot: 1.5 },
    { x: 576, w: 110, label: "Tax return", dy: -3, rot: -1.1 },
    { x: 704, w: 62, label: "Will", dy: 1, rot: 0.7 },
    { x: 784, w: 174, label: "Mortgage statement", dy: 2, rot: -1.4 },
    { x: 976, w: 142, label: "Insurance card", dy: -2, rot: 1.1 },
    { x: 1136, w: 142, label: "Bank statement", dy: 3, rot: -0.8 },
    { x: 1296, w: 166, label: "Pension statement", dy: -1, rot: 1.3 },
  ],
  [
    { x: -120, w: 158, label: "Driver’s license", dy: 2, rot: 1.2 },
    { x: 56, w: 94, label: "Warranty", dy: -3, rot: -1 },
    { x: 168, w: 174, label: "Vaccination record", dy: 1, rot: 0.8 },
    { x: 360, w: 70, label: "Lease", dy: 3, rot: -1.4 },
    { x: 448, w: 190, label: "Marriage certificate", accent: true, dy: -2, rot: 0.6 },
    { x: 656, w: 62, label: "Deed", dy: 2, rot: -0.9 },
    { x: 736, w: 166, label: "Power of attorney", dy: -1, rot: 1.3 },
    { x: 920, w: 190, label: "Vehicle registration", dy: 3, rot: -0.7 },
    { x: 1128, w: 142, label: "Medical record", accent: true, dy: -2, rot: 1 },
    { x: 1288, w: 126, label: "Utility bill", dy: 1, rot: -1.2 },
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

export function DocumentBand() {
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <svg
        viewBox="0 0 1440 132"
        className="h-auto w-full min-w-[1440px] shrink-0"
        strokeLinejoin="round"
        role="img"
        aria-label="The kinds of paperwork Harbor keeps: passports, certificates, policies, titles, tax returns, wills, statements, licenses and more."
      >
        {ROWS.map((row, r) =>
          row.map((c) => {
            const top = ROW_TOP[r];
            const cx = c.x + c.w / 2;
            const cy = top + 18;
            return (
              <g key={c.label} transform={`translate(0 ${c.dy}) rotate(${c.rot} ${cx} ${cy})`}>
                <path
                  d={pill(c.x, c.w, top)}
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
          }),
        )}
      </svg>
    </div>
  );
}
