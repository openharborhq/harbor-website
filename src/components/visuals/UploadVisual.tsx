/**
 * Tile 1: "Upload photos and docs". A drop zone; three files fly in, get read, and end up filed.
 * Pure CSS, loops every 8 seconds; with reduced motion it rests on the filed state.
 */
export function UploadVisual() {
  return (
    <div className="upl tile-stage-wrap relative flex aspect-[588/300] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface" aria-hidden="true">
      <div className="upl-zone relative flex h-[168px] w-[340px] items-center justify-center rounded-[12px] border-[1.5px] border-dashed border-border-strong bg-ground">
        {/* Idle label */}
        <div className="upl-idle absolute inset-x-0 bottom-[22px] flex flex-col items-center gap-[6px]">
          <span className="text-[13px] font-medium text-text">Drop files here</span>
          <span className="text-[11.5px] text-faint">photos, PDFs, scans</span>
        </div>

        {/* The three files */}
        <div className="absolute left-1/2 top-[18px] h-[72px] w-[58px] -translate-x-1/2">
          <File className="upl-file" style={{ "--r": "-13deg", "--x": "-30px", "--d": "0s" } as React.CSSProperties} kind="photo" />
          <File className="upl-file" style={{ "--r": "0deg", "--x": "0px", "--d": "0.22s" } as React.CSSProperties} kind="pdf" />
          <File className="upl-file" style={{ "--r": "12deg", "--x": "30px", "--d": "0.44s" } as React.CSSProperties} kind="doc" />
          <div className="upl-scan absolute -inset-x-6 top-0 h-[2px] rounded-pill bg-accent opacity-0" />
        </div>

        {/* Reading state */}
        <div className="upl-reading absolute inset-x-[28px] bottom-[22px] flex flex-col items-center gap-[9px] opacity-0">
          <span className="text-[13px] font-medium text-text">Reading 3 files</span>
          <div className="h-[4px] w-full overflow-hidden rounded-pill bg-accent-soft">
            <div className="upl-bar h-full w-0 rounded-pill bg-accent" />
          </div>
        </div>

        {/* Filed state */}
        <div className="upl-done absolute inset-x-0 bottom-[16px] flex flex-col items-center gap-[8px] opacity-0">
          <span className="flex items-center gap-[6px] text-[13px] font-medium text-text">
            <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
              <circle cx="8" cy="8" r="8" fill="var(--color-accent)" />
              <path d="M4.6 8.3l2.2 2.2 4.6-4.8" fill="none" stroke="var(--color-ground)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Filed
          </span>
          <div className="flex gap-[6px]">
            <Chip>Real Estate › Warranties</Chip>
            <Chip>1428 Maple Ave</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-pill bg-accent-soft px-[9px] py-[3px] text-[11px] font-medium text-accent">{children}</span>;
}

function File({ kind, className, style }: { kind: "photo" | "pdf" | "doc"; className: string; style: React.CSSProperties }) {
  return (
    <div className={`${className} absolute inset-0 flex items-center justify-center rounded-[6px] border border-border bg-ground shadow-[0_2px_6px_rgba(13,22,34,0.08)]`} style={style}>
      {kind === "photo" && (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="4" y="6" width="26" height="22" rx="2.5" />
          <path d="M4 23l8-7 6 5 4-3 8 6" />
          <circle cx="23" cy="12.5" r="2.2" />
        </svg>
      )}
      {kind === "pdf" && (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M8 4h12l7 7v19H8z M20 4v7h7" />
          <text x="17" y="24" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600" fill="var(--color-accent)" stroke="none">PDF</text>
        </svg>
      )}
      {kind === "doc" && (
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4h12l7 7v19H8z M20 4v7h7" />
          <path d="M12 16h10M12 20h10M12 24h6" />
        </svg>
      )}
    </div>
  );
}
