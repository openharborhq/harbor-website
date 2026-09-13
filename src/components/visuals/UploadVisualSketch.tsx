import type { CSSProperties } from "react";

/**
 * Hand-drawn variant of tile 1, "Upload photos and docs". Same scene and the same CSS timing as
 * UploadVisual (it reuses every upl-* keyframe), but every shape is a bowed path that overshoots
 * at the corners the way a pen does. Swap the import in Pipeline.tsx to go back to the drafted one.
 */
export function UploadVisualSketch() {
  return (
    <div className="upl tile-stage-wrap relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="relative flex h-[168px] w-[340px] items-center justify-center">
        {/* The drop zone, drawn rather than bordered. Its stroke and fill carry the highlight. */}
        <svg viewBox="0 0 340 168" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            className="upl-zone-sketch"
            d="M8 26 Q10 12 26 10 Q170 6 314 10 Q330 12 332 26 Q336 84 332 142 Q330 156 314 158 Q170 162 26 158 Q10 156 8 142 Q4 84 8 26 Z"
            strokeWidth="2"
            strokeDasharray="11 9"
            strokeLinecap="round"
          />
        </svg>

        <div className="upl-idle absolute inset-x-0 bottom-[22px] flex flex-col items-center gap-[6px]">
          <span className="text-[13px] font-medium text-text">Drop files here</span>
          <span className="text-[11.5px] text-faint">photos, PDFs, scans</span>
        </div>

        <div className="absolute left-1/2 top-[18px] h-[72px] w-[58px] -translate-x-1/2">
          <Card className="upl-file" style={{ "--r": "-13deg", "--x": "-30px", "--d": "0s" } as CSSProperties} kind="photo" />
          <Card className="upl-file" style={{ "--r": "0deg", "--x": "0px", "--d": "0.22s" } as CSSProperties} kind="pdf" />
          <Card className="upl-file" style={{ "--r": "12deg", "--x": "30px", "--d": "0.44s" } as CSSProperties} kind="doc" />
          <div className="upl-scan absolute -inset-x-6 top-0 h-[3px] opacity-0">
            <svg viewBox="0 0 106 3" className="h-full w-full" preserveAspectRatio="none">
              <path d="M1 2 Q53 0.4 105 1.8" fill="none" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="upl-reading absolute inset-x-[28px] bottom-[22px] flex flex-col items-center gap-[9px] opacity-0">
          <span className="text-[13px] font-medium text-text">Reading 3 files</span>
          <div className="relative h-[8px] w-full">
            <svg viewBox="0 0 284 8" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path
                d="M4 4 Q10 1.5 20 1.6 Q142 0.6 264 1.8 Q276 1.7 280 4 Q276 6.4 264 6.3 Q142 7.4 20 6.4 Q10 6.5 4 4 Z"
                fill="var(--color-accent-soft)"
                stroke="var(--color-border-strong)"
                strokeWidth="1.2"
              />
            </svg>
            <div className="absolute inset-y-[2px] left-[5px] right-[5px] overflow-hidden">
              <div className="upl-bar h-full w-0 rounded-pill bg-accent" />
            </div>
          </div>
        </div>

        <div className="upl-done absolute inset-x-0 bottom-[16px] flex flex-col items-center gap-[8px] opacity-0">
          <span className="flex items-center gap-[7px] text-[13px] font-medium text-text">
            <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0" strokeLinecap="round" strokeLinejoin="round">
              <path
                d="M2.4 9 Q2 3 8.8 2.4 Q15.6 2 15.8 8.8 Q16.2 15.4 9.2 15.7 Q2.6 16 2.4 9 Z"
                fill="var(--color-accent)"
                stroke="var(--color-accent)"
                strokeWidth="1.2"
              />
              <path d="M5.4 9.2 Q7.2 11 8.1 12.1 Q10.4 8.2 12.9 5.9" fill="none" stroke="var(--color-ground)" strokeWidth="1.8" />
            </svg>
            Filed
          </span>
          <div className="flex gap-[7px]">
            <Chip>Real Estate › Warranties</Chip>
            <Chip>1428 Maple Ave</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A pill that is drawn, not rounded: the outline sits behind the label. */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex items-center px-[11px] py-[4px] text-[11px] font-medium text-accent">
      <svg viewBox="0 0 100 24" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <path
          d="M12 2.4 Q50 0.8 88 2.2 Q97 4 97.6 12 Q98 20 88 21.6 Q50 23.2 12 21.8 Q2.6 20 2.2 12 Q2 4 12 2.4 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

function Card({ kind, className, style }: { kind: "photo" | "pdf" | "doc"; className: string; style: CSSProperties }) {
  return (
    <div className={`${className} absolute inset-0`} style={style}>
      <svg viewBox="0 0 58 72" className="h-full w-full" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M4 7 Q29 3.6 54 6.6 Q56.4 36 54 65.4 Q29 68.6 4 65.4 Q1.8 36 4 7 Z"
          fill="var(--color-ground)"
          stroke="var(--color-text)"
          strokeWidth="1.9"
        />
        {kind === "photo" && (
          <g fill="none" stroke="var(--color-accent)" strokeWidth="1.7">
            <path d="M13 25 Q29 22.6 45 24.6 Q47 36 45 47.4 Q29 49.8 13 47.4 Q11.2 36 13 25 Z" />
            <path d="M15 45 Q21 36 26.5 40.5 Q31 44 34 38.5 Q39.5 32 44.6 44" />
            <path d="M35 30.4 Q35 27.2 38.2 27.2 Q41.4 27.2 41.3 30.4 Q41.3 33.6 38.2 33.5 Q35 33.5 35 30.4 Z" />
          </g>
        )}
        {kind === "pdf" && (
          <g fill="none" stroke="var(--color-accent)" strokeWidth="1.7">
            <path d="M17 19 Q28 17 36.5 18.4 Q41.5 23 44 27.6 Q45.6 41 44 53.8 Q29 56 17 53.8 Q15.4 36 17 19 Z" />
            <path d="M36.5 18.4 Q36 23.6 36.8 27.8 Q40.4 28.4 44 27.6" />
            <path d="M22.6 44.6 Q29 45.8 37 44.4" strokeWidth="2.6" />
            <path d="M22.6 37.4 Q27 38.4 32 37.6" />
          </g>
        )}
        {kind === "doc" && (
          <g fill="none" stroke="var(--color-accent)" strokeWidth="1.7">
            <path d="M17 19 Q28 17 36.5 18.4 Q41.5 23 44 27.6 Q45.6 41 44 53.8 Q29 56 17 53.8 Q15.4 36 17 19 Z" />
            <path d="M36.5 18.4 Q36 23.6 36.8 27.8 Q40.4 28.4 44 27.6" />
            <path d="M22.4 34.6 Q29 35.6 38 34.8" />
            <path d="M22.4 41.6 Q29 42.6 38 41.8" />
            <path d="M22.4 48.4 Q26.6 49.2 31 48.6" />
          </g>
        )}
      </svg>
    </div>
  );
}
