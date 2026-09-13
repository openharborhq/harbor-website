import type { CSSProperties } from "react";

/**
 * Hand-drawn variant of tile 3, "Search intuitively". Same eight-second loop as SearchVisual:
 * the query types itself, the two documents that contain it rise and show their matching line.
 * Swap the import in Pipeline.tsx to go back to the drafted one.
 */
const DOCS: { bars: number[]; match?: { line: number; text: string; lang?: string } }[] = [
  { bars: [68, 56, 72, 60, 40], match: { line: 2, text: "furnace warranty" } },
  { bars: [60, 72, 52, 66, 44] },
  { bars: [70, 58, 64, 50, 46], match: { line: 1, text: "Heizung Garantie", lang: "DE" } },
  { bars: [54, 66, 60, 70, 38] },
];

export function SearchVisualSketch() {
  return (
    <div className="tile-stage-wrap relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="tile-stage relative h-[230px] w-[500px] shrink-0">
        <div className="absolute left-[30px] top-[16px] flex h-[40px] w-[440px] items-center gap-[10px] px-[16px]">
          <svg viewBox="0 0 440 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path
              d="M12 3 Q220 0.8 428 3.2 Q437 8 437.6 20 Q438 32 428 36.8 Q220 39.2 12 36.8 Q2.6 32 2.2 20 Q2 8 12 3 Z"
              fill="var(--color-ground)"
              stroke="var(--color-text)"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-muted)" strokeWidth="1.7" strokeLinecap="round" className="relative shrink-0">
            <path d="M3.2 7.2 Q2.8 2.6 7.2 2.4 Q11.8 2.2 11.8 7 Q11.9 11.6 7.4 11.7 Q3 11.8 3.2 7.2 Z" />
            <path d="M10.8 10.6 Q12.6 12.4 14 13.9" />
          </svg>
          <span className="relative flex h-[20px] items-center text-[14px] leading-[20px] text-text">
            <span className="srch-placeholder absolute left-0 whitespace-nowrap text-muted/70">Search inside every document</span>
            <span className="srch-typed inline-block overflow-hidden whitespace-nowrap">furnace warranty</span>
            <span className="srch-caret ml-[1px] inline-block h-[16px] w-[1.5px] bg-text" />
          </span>
        </div>

        {DOCS.map((d, i) => (
          <div
            key={i}
            className={`srch-doc absolute top-[78px] h-[128px] w-[100px] ${d.match ? "srch-hit" : "srch-miss"}`}
            style={{ left: 30 + i * 113.33 } as CSSProperties}
          >
            <svg viewBox="0 0 100 128" className="absolute inset-0 h-full w-full" strokeLinecap="round" strokeLinejoin="round">
              <path
                className={d.match ? "srchk-card" : undefined}
                d="M5 9 Q50 5.6 95 9 Q97.4 64 95 119 Q50 122.6 5 119 Q2.6 64 5 9 Z"
                fill="var(--color-ground)"
                stroke={d.match ? undefined : "var(--color-border-strong)"}
                strokeWidth="1.8"
              />
              <g stroke="var(--color-border-strong)" strokeWidth="2.6" fill="none">
                {d.bars.map((w, j) => (
                  <path key={j} d={`M12 ${25 + j * 20} Q${12 + w / 2} ${25 + j * 20 + (j % 2 ? -1.6 : 1.8)} ${12 + w} ${25 + j * 20}`} />
                ))}
              </g>
            </svg>
            {d.match && (
              <span
                className="srch-line absolute left-[-6px] flex items-center whitespace-nowrap px-[6px] text-[10px] font-medium leading-[20px] text-accent"
                style={{ top: 25 + d.match.line * 20 - 10 }}
              >
                <svg viewBox="0 0 110 22" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path
                    d="M6 2.4 Q55 0.8 104 2.6 Q108 6 108 11 Q108 16 104 19.4 Q55 21.2 6 19.6 Q2 16 2 11 Q2 6 6 2.4 Z"
                    fill="var(--color-accent-soft)"
                    stroke="var(--color-accent)"
                    strokeWidth="1.1"
                  />
                </svg>
                <span className="relative">{d.match.text}</span>
              </span>
            )}
            {d.match?.lang && (
              <span className="srch-lang absolute right-[8px] top-[12px] flex items-center px-[5px] font-mono text-[9px] leading-[14px] tracking-[0.06em] text-faint">
                <svg viewBox="0 0 30 18" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  <path d="M3 2.4 Q15 1 27 2.6 Q28.6 9 27 15.4 Q15 17 3 15.6 Q1.4 9 3 2.4 Z" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.2" />
                </svg>
                <span className="relative">{d.match.lang}</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
