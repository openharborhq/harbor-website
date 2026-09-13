import type { CSSProperties } from "react";

/**
 * Hand-drawn variant of tile 2, "Tagged automatically". Same nine-second loop and the same
 * staggering as TagVisual; the card, its text lines and the tag pills are drawn rather than boxed.
 * Swap the import in Pipeline.tsx to go back to the drafted one.
 */
const DOC = { x: 28, y: 14, w: 200, h: 202 };
const LINE_TOP = 30;
const LINE_STEP = 18;
const LINES = [150, 120, 160, 140, 130, 155, 115, 100, 135];
const COL = { x: 282, top: 52, step: 42 };

const WORDS: { text: string; row: number; x: number; w: number }[] = [
  { text: "State Farm", row: 1, x: 86, w: 66 },
  { text: "1428 Maple Ave", row: 3, x: 40, w: 92 },
  { text: "2027", row: 4, x: 62, w: 32 },
  { text: "tax-deductible", row: 6, x: 104, w: 86 },
];

export function TagVisualSketch() {
  return (
    <div className="tile-stage-wrap relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="tile-stage relative h-[230px] w-[500px] shrink-0">
        <div className="absolute" style={{ left: DOC.x, top: DOC.y, width: DOC.w, height: DOC.h }}>
          <svg viewBox="0 0 200 202" className="absolute inset-0 h-full w-full" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="M6 12 Q100 8 194 12 Q197 101 194 190 Q100 195 6 190 Q3 101 6 12 Z"
              fill="var(--color-ground)"
              stroke="var(--color-text)"
              strokeWidth="1.9"
            />
            <g stroke="var(--color-border-strong)" strokeWidth="2.6" fill="none">
              {LINES.map((w, i) => (
                <path key={i} d={`M18 ${LINE_TOP + i * LINE_STEP + 3} Q${18 + w / 2} ${LINE_TOP + i * LINE_STEP + (i % 2 ? 1.4 : 4.4)} ${18 + w} ${LINE_TOP + i * LINE_STEP + 2.6}`} />
              ))}
            </g>
          </svg>
          {WORDS.map((w, i) => (
            <span
              key={w.text}
              className="tag-ghost absolute whitespace-nowrap bg-ground px-[3px] text-[11.5px] leading-[18px] text-text"
              style={{ left: w.x - 3, top: LINE_TOP + w.row * LINE_STEP - 6, "--d": `${i * 0.9}s` } as CSSProperties}
            >
              {w.text}
            </span>
          ))}
        </div>

        {WORDS.map((w, i) => {
          const fromX = DOC.x + w.x - 3;
          const fromY = DOC.y + LINE_TOP + w.row * LINE_STEP - 6;
          return (
            <span
              key={w.text}
              className="tagk-chip absolute flex items-center whitespace-nowrap px-[10px] text-[11.5px] font-medium leading-[22px] text-accent"
              style={{ left: fromX - 10, top: fromY - 2, "--dx": `${COL.x - fromX}px`, "--dy": `${COL.top + i * COL.step - fromY}px`, "--d": `${i * 0.9}s` } as CSSProperties}
            >
              <svg viewBox="0 0 100 26" preserveAspectRatio="none" className="tagk-pill absolute inset-0 h-full w-full" style={{ "--d": `${i * 0.9}s` } as CSSProperties}>
                <path
                  d="M13 2.6 Q50 0.9 87 2.4 Q97 4.4 97.6 13 Q98 21.6 87 23.4 Q50 25.1 13 23.6 Q2.6 21.6 2.2 13 Q2 4.4 13 2.6 Z"
                  fill="var(--color-accent-soft)"
                  stroke="var(--color-accent)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="relative">{w.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
