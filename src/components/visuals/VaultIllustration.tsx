/**
 * The hero drawing: three pages falling into the box that keeps them, with a cable running out of
 * its side and off the edge of the page. Hand-drawn, token-coloured, so it repaints with the theme.
 *
 * The canvas starts above zero (viewBox y = -56) because the pages are placed by their centres and
 * rotated; without that headroom their top corners clip. The cable deliberately runs past the right
 * edge of the viewBox so the viewport cuts it off.
 */
const PAGE =
  "M-44 -56 Q0 -60 40 -56 Q48 -46 56 -36 Q58 0 56 52 Q0 58 -44 52 Q-48 0 -44 -56 Z";
const FOLD = "M40 -56 Q39 -46 40 -36 Q48 -35 56 -36";
const LINES = "M-30 -18 Q0 -15 30 -18 M-30 0 Q0 3 30 0 M-30 18 Q-12 21 6 18";

const PAGES = [
  { x: 78, y: 46, r: -16 },
  { x: 232, y: 22, r: 5 },
  { x: 392, y: 52, r: 19 },
];

export function VaultIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -56 640 496"
      className={`h-auto w-full ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Three documents falling into a box that is plugged in by a cable running off the side of the page."
    >
      {PAGES.map((p) => (
        <g key={p.x} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
          <path d={PAGE} fill="var(--color-ground)" stroke="var(--color-text)" strokeWidth="2.1" />
          <path d={FOLD} fill="none" stroke="var(--color-text)" strokeWidth="1.8" />
          <path d={LINES} fill="none" stroke="var(--color-accent)" strokeWidth="1.9" />
        </g>
      ))}

      <g fill="none" stroke="var(--color-border-strong)" strokeWidth="1.8" strokeDasharray="7 9">
        <path d="M96 128 Q150 186 220 226" />
        <path d="M244 108 Q252 172 258 222" />
        <path d="M400 136 Q348 190 292 228" />
      </g>

      {/* Drawn before the box, so the plug tucks into its side rather than sitting on top. */}
      <g>
        <path d="M396 344 Q470 372 524 348 Q580 322 644 338" fill="none" stroke="var(--color-text)" strokeWidth="3" />
        <path
          d="M370 334 Q384 331 396 334 Q399 344 396 354 Q384 357 370 354 Q367 344 370 334 Z"
          fill="var(--color-surface)"
          stroke="var(--color-text)"
          strokeWidth="2"
        />
        <path d="M380 330 Q382 326 384 322" fill="none" stroke="var(--color-text)" strokeWidth="1.8" />
      </g>

      <g>
        <path
          d="M132 250 Q258 244 386 250 Q392 268 386 286 Q258 292 132 286 Q126 268 132 250 Z"
          fill="var(--color-surface)"
          stroke="var(--color-text)"
          strokeWidth="2.2"
        />
        <path
          d="M148 288 Q258 282 372 288 Q378 344 372 398 Q258 406 148 398 Q142 344 148 288 Z"
          fill="var(--color-ground)"
          stroke="var(--color-text)"
          strokeWidth="2.2"
        />
        <path
          d="M228 316 Q258 312 292 316 Q294 326 292 336 Q258 340 228 336 Q226 326 228 316 Z"
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth="1.8"
        />
        <path d="M186 362 Q258 356 334 362" fill="none" stroke="var(--color-border-strong)" strokeWidth="2" />
      </g>
    </svg>
  );
}
