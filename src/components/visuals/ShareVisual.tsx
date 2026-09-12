/**
 * Tile 4: "Share with tax advisers". A secure link leaves a document, travels to the adviser, the
 * adviser is marked as having it; the link's expiry counts down and the link goes dead on its own.
 * Pure CSS, 9s loop.
 */
export function ShareVisual() {
  return (
    <div className="relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="relative h-[230px] w-[500px] shrink-0">
        {/* The document being shared */}
        <div className="absolute left-[40px] top-[55px] h-[120px] w-[96px] rounded-[12px] border border-border bg-ground">
          {[64, 52, 68, 46, 58].map((w, i) => (
            <div key={i} className="absolute left-[14px] h-[6px] rounded-[3px] bg-border" style={{ top: 22 + i * 19, width: w }} />
          ))}
        </div>
        <span className="absolute left-[40px] top-[184px] w-[96px] text-center text-[11.5px] leading-[16px] text-muted">2025 taxes</span>

        {/* Path from document to adviser */}
        <div className="absolute left-[150px] top-[114px] h-0 w-[210px] border-t-[1.5px] border-dotted border-border-strong" />
        <div className="shr-trail absolute left-[150px] top-[113.5px] h-[2px] w-0 rounded-pill bg-accent" />

        {/* The travelling secure link */}
        <div className="shr-token absolute left-[140px] top-[100px] flex h-[30px] w-[30px] items-center justify-center rounded-pill bg-accent shadow-[0_3px_8px_rgba(18,63,168,0.25)]">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="7" width="10" height="7" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
        </div>

        {/* The adviser */}
        <div className="absolute left-[380px] top-[88px] flex h-[52px] w-[52px] items-center justify-center rounded-pill bg-accent-soft text-[15px] font-semibold text-accent">
          JA
          <span className="shr-badge absolute -right-[2px] -top-[2px] flex h-[18px] w-[18px] items-center justify-center rounded-pill bg-accent ring-2 ring-surface">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5l3 3 6-6.5" />
            </svg>
          </span>
        </div>
        <span className="absolute left-[350px] top-[150px] w-[112px] text-center text-[11.5px] leading-[16px] text-muted">Jordan, CPA</span>

        {/* Expiry label under the path */}
        <div className="shr-label absolute left-[175px] top-[132px] flex h-[26px] w-[160px] items-center justify-center rounded-pill border border-border bg-ground text-[11.5px] font-medium">
          <span className="shr-l1 absolute text-text">Expires in 30 days</span>
          <span className="shr-l2 absolute text-text">Expires in 7 days</span>
          <span className="shr-l3 absolute text-faint">Link expired</span>
        </div>
      </div>
    </div>
  );
}
