/**
 * The pieces every section on this page repeats: the mono eyebrow, the heading block under it,
 * and the arrow that rides inside a primary button.
 *
 * The page is built on one rhythm — eyebrow, heading, lead, then the evidence — and keeping that
 * rhythm in one file is what stops eleven sections drifting into eleven heading sizes.
 */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-faint uppercase">
      {children}
    </span>
  );
}

/**
 * `align="center"` is the hero rhythm and the one used by the full-width sections; the deep dives
 * that sit beside a screenshot pass nothing and stay left. `max` caps the lead's measure, which is
 * the only number that needs to change between a one-line lead and a three-line one.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  max = "max-w-[720px]",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  max?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-[18px] ${centered ? "items-center text-center" : "items-start"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={`text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.1] tracking-tight text-text ${centered ? "max-w-[860px]" : "max-w-[620px]"}`}
      >
        {title}
      </h2>
      {lead && <p className={`${max} text-lead leading-copy text-muted`}>{lead}</p>}
    </div>
  );
}

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A terminal slab. Used three times — the CLI, the install, and the unattended install — so the
 * chrome (title bar, mono, the terminal token that darkens again in dark mode) lives here once.
 */
export function Terminal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg bg-terminal">
      <div className="flex items-center gap-[10px] border-b border-hairline-dark px-[18px] py-[11px]">
        <span className="flex gap-[6px]" aria-hidden="true">
          <i className="block h-[9px] w-[9px] rounded-pill bg-hairline-dark" />
          <i className="block h-[9px] w-[9px] rounded-pill bg-hairline-dark" />
          <i className="block h-[9px] w-[9px] rounded-pill bg-hairline-dark" />
        </span>
        <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-on-dark">{title}</span>
      </div>
      <pre className="overflow-x-auto px-[20px] py-[18px] font-mono text-[13.5px] leading-[24px] text-[#dfe6f1]">
        {children}
      </pre>
    </div>
  );
}

/** A line in a Terminal: the dimmed prompt, the command, and an optional trailing comment. */
export function Cmd({ children, note }: { children: string; note?: string }) {
  return (
    <>
      <span className="select-none text-faint">$ </span>
      <span>{children}</span>
      {note && <span className="text-faint">{"  # " + note}</span>}
      {"\n"}
    </>
  );
}

/**
 * The GitHub mark. Lives here because two places draw it now — the nav's link and the hero's
 * "Go to repo" button — and a second hand-copied path is how the two quietly drift apart.
 */
export function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
      <path
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34C3.8 14.35 3.33 12.8 3.33 12.8c-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.19c0 .21.145.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
        fill="currentColor"
      />
    </svg>
  );
}
