/**
 * Hand-drawn variant of tile 4, "Share with tax advisers". Same nine-second loop as ShareVisual:
 * the locked link travels to the adviser, the expiry counts down, the link dies on its own.
 * The trail draws itself with a dash offset rather than growing a box.
 * Swap the import in Pipeline.tsx to go back to the drafted one.
 */
export function ShareVisualSketch() {
  return (
    <div className="tile-stage-wrap relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="tile-stage relative h-[230px] w-[500px] shrink-0">
        {/* The document being shared */}
        <div className="absolute left-[40px] top-[55px] h-[120px] w-[96px]">
          <svg viewBox="0 0 96 120" className="absolute inset-0 h-full w-full" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8 Q48 4.6 91 8 Q93.4 60 91 112 Q48 115.4 5 112 Q2.6 60 5 8 Z" fill="var(--color-ground)" stroke="var(--color-text)" strokeWidth="1.9" />
            <g stroke="var(--color-border-strong)" strokeWidth="2.6" fill="none">
              {[64, 52, 68, 46, 58].map((w, i) => (
                <path key={i} d={`M14 ${25 + i * 19} Q${14 + w / 2} ${25 + i * 19 + (i % 2 ? -1.6 : 1.8)} ${14 + w} ${25 + i * 19}`} />
              ))}
            </g>
          </svg>
        </div>
        <span className="absolute left-[40px] top-[184px] w-[96px] text-center text-[11.5px] leading-[16px] text-muted">2025 taxes</span>

        {/* The path, and the trail that draws itself along it */}
        <svg viewBox="0 0 220 12" preserveAspectRatio="none" className="absolute left-[150px] top-[108px] h-[12px] w-[210px]">
          <path d="M2 7 Q110 4 218 6.6" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.6" strokeDasharray="4 7" strokeLinecap="round" />
          <path className="shrk-trail" d="M2 7 Q110 4 218 6.6" fill="none" strokeWidth="2.4" strokeLinecap="round" pathLength={100} />
        </svg>

        {/* The travelling secure link */}
        <div className="shr-token absolute left-[140px] top-[100px] flex h-[30px] w-[30px] items-center justify-center rounded-pill">
          <svg viewBox="0 0 30 30" className="absolute inset-0 h-full w-full">
            <path className="shrk-token-body" d="M2.6 15 Q2.2 3.2 14.6 2.6 Q27.4 2.2 27.6 14.6 Q28 27 15.2 27.4 Q2.8 27.8 2.6 15 Z" strokeWidth="1.4" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--color-ground)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="relative">
            <path d="M3.2 7.4 Q8 6.8 12.8 7.4 Q13.4 10.6 12.8 13.8 Q8 14.4 3.2 13.8 Q2.6 10.6 3.2 7.4 Z" />
            <path d="M5.6 7.2 Q5.2 4.6 8 4.6 Q10.8 4.6 10.4 7.2" />
          </svg>
        </div>

        {/* The adviser */}
        <div className="absolute left-[380px] top-[88px] flex h-[52px] w-[52px] items-center justify-center text-[15px] font-semibold text-accent">
          <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full">
            <path
              d="M3 26 Q2.4 4.6 25.4 3.4 Q48.6 3 49 25.4 Q49.6 48 26.6 48.8 Q3.4 49.2 3 26 Z"
              fill="var(--color-accent-soft)"
              stroke="var(--color-accent)"
              strokeWidth="1.4"
            />
          </svg>
          <span className="relative">JA</span>
          <span className="shr-badge absolute -right-[3px] -top-[3px] flex h-[20px] w-[20px] items-center justify-center">
            <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full">
              <path
                d="M2.6 10 Q2.2 2.8 9.8 2.5 Q17.4 2.2 17.6 9.6 Q18 17.2 10.4 17.5 Q2.8 17.8 2.6 10 Z"
                fill="var(--color-accent)"
                stroke="var(--color-surface)"
                strokeWidth="2"
              />
              <path d="M6 10.2 Q8 12.2 8.9 13.4 Q11.4 9 14.2 6.4" fill="none" stroke="var(--color-ground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span className="absolute left-[350px] top-[150px] w-[112px] text-center text-[11.5px] leading-[16px] text-muted">Jordan, CPA</span>

        {/* Expiry label under the path */}
        <div className="shr-label absolute left-[175px] top-[132px] flex h-[28px] w-[160px] items-center justify-center text-[11.5px] font-medium">
          <svg viewBox="0 0 160 28" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path
              d="M14 2.6 Q80 0.9 146 2.4 Q157 5 157.6 14 Q158 23 146 25.4 Q80 27.1 14 25.6 Q3 23 2.4 14 Q2 5 14 2.6 Z"
              fill="var(--color-ground)"
              stroke="var(--color-border-strong)"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <span className="shr-l1 absolute text-text">Expires in 30 days</span>
          <span className="shr-l2 absolute text-text">Expires in 7 days</span>
          <span className="shr-l3 absolute text-faint">Link expired</span>
        </div>
      </div>
    </div>
  );
}
