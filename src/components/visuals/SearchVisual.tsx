import type { CSSProperties } from "react";

/**
 * Tile 3: "Search intuitively". A query is typed; of four documents, the two that contain the
 * phrase rise and show the matching line, one of them in German. Pure CSS, 8s loop.
 */
const DOCS: { bars: number[]; match?: { line: number; text: string; lang?: string } }[] = [
  { bars: [68, 56, 72, 60, 40], match: { line: 2, text: "furnace warranty" } },
  { bars: [60, 72, 52, 66, 44] },
  { bars: [70, 58, 64, 50, 46], match: { line: 1, text: "Heizung Garantie", lang: "DE" } },
  { bars: [54, 66, 60, 70, 38] },
];

export function SearchVisual() {
  return (
    <div className="relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="relative h-[230px] w-[500px] shrink-0">
        {/* Search field */}
        <div className="absolute left-[30px] top-[16px] flex h-[40px] w-[440px] items-center gap-[10px] rounded-[10px] border border-border bg-ground px-[14px]">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="var(--color-muted)" strokeWidth="1.6" strokeLinecap="round" className="shrink-0">
            <circle cx="7" cy="7" r="4.6" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <span className="relative flex h-[20px] items-center text-[14px] leading-[20px] text-text">
            <span className="srch-placeholder absolute left-0 whitespace-nowrap text-muted/70">Search inside every document</span>
            <span className="srch-typed inline-block overflow-hidden whitespace-nowrap">furnace warranty</span>
            <span className="srch-caret ml-[1px] inline-block h-[16px] w-[1.5px] bg-text" />
          </span>
        </div>

        {/* Documents */}
        {DOCS.map((d, i) => (
          <div
            key={i}
            className={`srch-doc absolute top-[78px] h-[128px] w-[100px] rounded-[12px] border border-border bg-ground ${d.match ? "srch-hit" : "srch-miss"}`}
            style={{ left: 30 + i * 113.33, "--line": d.match?.line ?? 0 } as CSSProperties}
          >
            {d.bars.map((w, j) => {
              const isMatch = d.match && d.match.line === j;
              return (
                <div key={j} className="absolute left-[12px] flex h-[6px] items-center" style={{ top: 22 + j * 20 }}>
                  <div className="h-[6px] rounded-[3px] bg-border" style={{ width: w }} />
                  {isMatch && (
                    <span className="srch-line absolute left-[-4px] top-[-7px] whitespace-nowrap rounded-[5px] bg-accent-soft px-[4px] text-[10px] font-medium leading-[20px] text-accent">
                      {d.match!.text}
                    </span>
                  )}
                </div>
              );
            })}
            {d.match?.lang && (
              <span className="srch-lang absolute right-[8px] top-[8px] rounded-[4px] border border-border px-[4px] font-mono text-[9px] leading-[14px] tracking-[0.06em] text-faint">
                {d.match.lang}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
