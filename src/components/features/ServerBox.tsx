import type { CSSProperties } from "react";

/** Where each page starts its drift, and how long it waits before setting off. */
const DOCS = [
  { sx: 108, sy: -46, sr: "-15deg", delay: "0s" },
  { sx: 286, sy: -68, sr: "7deg", delay: "2s" },
  { sx: 456, sy: -40, sr: "17deg", delay: "4s" },
];

/**
 * The machine Harbor runs on: a small fanless box, drawn by hand rather than drafted. Every edge
 * is a bowed stroke that overshoots at the corners, the way a pen does. Faces are filled first,
 * the outline is drawn last on top, so the sketch lines stay visible over the fills.
 */
export function ServerBox({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 -78 560 424"
      className={`h-auto w-full max-w-[560px] ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={
        animated
          ? "Documents drifting down into a small fanless server box with four network ports, drawn by hand."
          : "A small fanless server box with four network ports, drawn by hand."
      }
    >
      {animated && (
        <g>
          {DOCS.map((d) => (
            <g key={d.sx} className="fb-doc" style={{ "--sx": `${d.sx}px`, "--sy": `${d.sy}px`, "--sr": d.sr, "--d": d.delay } as CSSProperties}>
              <path
                d="M-17 -23 Q-1 -25.6 12 -23.4 Q16 -19 19.6 -14.6 Q21.4 1 19.8 20.4 Q1 23.4 -17 20.6 Q-19 -1 -17 -23 Z"
                fill="var(--color-ground)"
                stroke="var(--color-text)"
                strokeWidth="1.9"
              />
              <path d="M12 -23.4 Q11.4 -18.6 12.2 -14.2 Q15.8 -13.6 19.6 -14.6" fill="none" stroke="var(--color-text)" strokeWidth="1.7" />
              <path d="M-11 -5.4 Q0 -4.2 11 -5.2" fill="none" stroke="var(--color-accent)" strokeWidth="1.7" />
              <path d="M-11 2.6 Q0 3.8 11 2.8" fill="none" stroke="var(--color-accent)" strokeWidth="1.7" />
              <path d="M-11 10.8 Q-4 11.6 2 11" fill="none" stroke="var(--color-accent)" strokeWidth="1.7" />
            </g>
          ))}
        </g>
      )}
      <g>
        <path d="M90 131 Q120 110 151 89 Q310 87 469 91 Q440 111 411 131 Q250 133 90 131 Z" fill="var(--color-surface)" />
        <path d="M411 131 Q440 111 469 91 Q472 156 469 221 Q440 241 411 261 Q408 196 411 131 Z" fill="var(--color-surface-2)" />
        <path d="M90 131 Q250 129 411 131 Q409 196 411 261 Q250 263 90 261 Q88 196 90 131 Z" fill="var(--color-ground)" />
      </g>
      <g stroke="var(--color-border-strong)" strokeWidth="1.7" fill="none">
        <path d="M106 129 Q137 111 166 91" />
        <path d="M134 130 Q163 109 194 90" />
        <path d="M162 129 Q193 111 222 91" />
        <path d="M190 130 Q219 110 250 90" />
        <path d="M218 129 Q249 112 278 91" />
        <path d="M246 130 Q275 109 306 90" />
        <path d="M274 129 Q305 111 334 91" />
        <path d="M302 130 Q331 110 362 90" />
        <path d="M330 129 Q361 112 390 91" />
        <path d="M358 130 Q387 109 418 90" />
        <path d="M386 129 Q417 111 446 91" />
      </g>
      <g stroke="var(--color-text)" strokeWidth="1.7" fill="var(--color-surface)">
        <path d="M113 261 Q125 259 137 261 Q139 265 137 269 Q125 271 113 269 Q111 265 113 261 Z" />
        <path d="M363 261 Q375 259 387 261 Q389 265 387 269 Q375 271 363 269 Q361 265 363 261 Z" />
      </g>
      <g stroke="var(--color-border-strong)" strokeWidth="1.6" fill="none">
        <path d="M424 169 Q443 156 461 143" />
        <path d="M424 187 Q442 173 462 161" />
        <path d="M424 205 Q443 192 461 179" />
        <path d="M424 223 Q442 209 462 197" />
      </g>
      <g>
        <path d="M115 166 Q114 153 128 153 Q142 152 141 166 Q142 180 128 179 Q114 180 115 166 Z" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="1.9" />
        <path d="M128 159 Q129 163 128 167" stroke="var(--color-accent)" strokeWidth="2" fill="none" />
        <path
          className={animated ? "fb-led" : undefined}
          d="M156 166 Q155 161 160 161 Q165 161 164 166 Q165 171 160 171 Q155 171 156 166 Z"
          fill="var(--color-accent)"
        />
        <path d="M186 159 Q201 157 216 159 Q218 165 216 172 Q201 174 186 172 Q184 165 186 159 Z" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="1.7" />
        <path d="M191 165 Q201 167 211 165" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="none" />
        <path d="M228 159 Q243 157 258 159 Q260 165 258 172 Q243 174 228 172 Q226 165 228 159 Z" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="1.7" />
        <path d="M233 165 Q243 167 253 165" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="none" />
        <path d="M272 158 Q291 156 310 158 Q307 166 305 174 Q291 176 277 174 Q274 166 272 158 Z" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="1.7" />
        <path d="M325 157 Q347 155 369 157 Q372 165 369 173 Q347 175 325 173 Q322 165 325 157 Z" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="1.7" />
        <path d="M334 165 Q347 167 360 165" stroke="var(--color-border-strong)" strokeWidth="1.5" fill="none" />
      </g>
      <g>
        {[125, 191, 257, 323].map((x, i) => (
          <g key={x}>
            <path
              d={`M${x + 1} 199 Q${x + 26} 197 ${x + 51} 199 Q${x + 53} 219 ${x + 51} 239 Q${x + 26} 241 ${x + 1} 239 Q${x - 1} 219 ${x + 1} 199 Z`}
              fill="var(--color-surface)"
              stroke="var(--color-text)"
              strokeWidth="1.9"
            />
            <path
              d={`M${x + 10} 215 Q${x + 15} 214 ${x + 21} 214 Q${x + 21} 210 ${x + 21} 206 Q${x + 26} 205 ${x + 31} 206 Q${x + 31} 210 ${x + 31} 214 Q${x + 36} 215 ${x + 42} 214 Q${x + 43} 223 ${x + 42} 232 Q${x + 26} 234 ${x + 10} 232 Q${x + 9} 223 ${x + 10} 215 Z`}
              fill="var(--color-ground)"
              stroke="var(--color-border-strong)"
              strokeWidth="1.5"
            />
            <path
              d={`M${x + 5} 235 Q${x + 4} 232 ${x + 8} 232 Q${x + 12} 232 ${x + 11} 235 Q${x + 12} 238 ${x + 8} 238 Q${x + 4} 238 ${x + 5} 235 Z`}
              fill={i < 2 ? "var(--color-accent)" : "var(--color-border-strong)"}
            />
            <path
              d={`M${x + 41} 235 Q${x + 40} 232 ${x + 44} 232 Q${x + 48} 232 ${x + 47} 235 Q${x + 48} 238 ${x + 44} 238 Q${x + 40} 238 ${x + 41} 235 Z`}
              fill="var(--color-border-strong)"
            />
          </g>
        ))}
      </g>
      <g stroke="var(--color-text)" fill="none">
        <path d="M86 132 Q250 128 415 130" strokeWidth="2.3" />
        <path d="M86 260 Q250 264 415 259" strokeWidth="2.2" />
        <path d="M91 126 Q88 196 90 266" strokeWidth="2.2" />
        <path d="M411 126 Q414 196 410 266" strokeWidth="2.1" />
        <path d="M146 88 Q310 86 474 92" strokeWidth="2.2" />
        <path d="M86 134 Q120 112 155 86" strokeWidth="2.1" />
        <path d="M406 134 Q440 112 475 86" strokeWidth="2.2" />
        <path d="M470 86 Q472 155 468 225" strokeWidth="2.2" />
        <path d="M407 263 Q440 243 474 217" strokeWidth="2.1" />
      </g>
    </svg>
  );
}
