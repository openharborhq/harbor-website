import type { CSSProperties } from "react";

/**
 * Tile 2: "Tagged automatically". One document; four words lift out of its text lines and become
 * tags in a column beside it. Pure CSS, 9s loop, staggered per word.
 */
const DOC = { x: 28, y: 14, w: 200, h: 202 };
const LINE_TOP = 30;
const LINE_STEP = 18;
const LINES = [150, 120, 160, 140, 130, 155, 115, 100, 135];
const COL = { x: 282, top: 52, step: 42 };

const WORDS: { text: string; row: number; x: number }[] = [
  { text: "State Farm", row: 1, x: 86 },
  { text: "1428 Maple Ave", row: 3, x: 40 },
  { text: "2027", row: 4, x: 62 },
  { text: "tax-deductible", row: 6, x: 104 },
];

export function TagVisual() {
  return (
    <div className="relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="relative h-[230px] w-[500px] shrink-0">
        {/* The document */}
        <div className="absolute rounded-[14px] border border-border bg-ground" style={{ left: DOC.x, top: DOC.y, width: DOC.w, height: DOC.h }}>
          {LINES.map((w, i) => (
            <div key={i} className="absolute left-[18px] h-[6px] rounded-[3px] bg-border" style={{ top: LINE_TOP + i * LINE_STEP, width: w }} />
          ))}
          {/* The words as they sit in the text, staying behind once lifted */}
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

        {/* Column the tags land in */}
        {WORDS.map((w, i) => {
          const fromX = DOC.x + w.x - 3;
          const fromY = DOC.y + LINE_TOP + w.row * LINE_STEP - 6;
          return (
            <span
              key={w.text}
              className="tag-chip absolute whitespace-nowrap text-[11.5px] leading-[18px] font-medium"
              style={{ left: fromX, top: fromY, "--dx": `${COL.x - fromX}px`, "--dy": `${COL.top + i * COL.step - fromY}px`, "--d": `${i * 0.9}s` } as CSSProperties}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
