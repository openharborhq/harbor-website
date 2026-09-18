import type { ReactNode } from "react";

export type FeatureItem = { icon: ReactNode; title: string; copy: string };

export type FeatureGroup = {
  id: string;
  number: string;
  label: string;
  title: string;
  lead: string;
  items: FeatureItem[];
};

/**
 * One numbered group: the argument on the left, the four features it covers on the right.
 * `dark` inverts it onto the terminal slab, which stays dark in both themes.
 */
export function FeatureSection({ group, tone }: { group: FeatureGroup; tone: "ground" | "surface" | "dark" }) {
  const dark = tone === "dark";
  const surface = tone === "surface" ? "bg-surface" : "bg-ground";

  return (
    <section
      id={group.id}
      className={`gutter flex scroll-mt-[80px] flex-col gap-12 py-[80px] lg:flex-row lg:gap-[80px] ${
        dark ? "bg-terminal py-[88px]" : `${surface} border-t border-border`
      }`}
    >
      <div className="flex shrink-0 flex-col gap-[18px] lg:w-[360px]">
        <div className="flex items-center gap-[10px]">
          <span className={`font-mono text-[12px] font-medium leading-[16px] tracking-mono ${dark ? "text-accent-on-dark" : "text-accent"}`}>
            {group.number}
          </span>
          <span className={`font-mono text-[12px] font-medium leading-[16px] tracking-mono ${dark ? "text-on-dark" : "text-faint"}`}>
            {group.label}
          </span>
        </div>
        <h2
          className={`text-subhead font-bold leading-[1.17] tracking-tight ${dark ? "text-on-band" : "text-text"}`}
        >
          {group.title}
        </h2>
        <p className={`text-[16px] leading-section ${dark ? "text-on-dark" : "text-muted"}`}>{group.lead}</p>
      </div>

      <ul className="grid min-w-0 flex-1 gap-x-[40px] gap-y-[40px] sm:grid-cols-2">
        {group.items.map((item) => (
          <li
            key={item.title}
            className={`flex min-w-0 flex-col gap-[12px] border-t pt-[20px] ${dark ? "border-hairline-dark" : "border-border"}`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              className="shrink-0"
              fill="none"
              stroke={dark ? "var(--color-accent-on-dark)" : "var(--color-accent)"}
              strokeWidth="1.6"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            <h3 className={`font-title text-section leading-[24px] tracking-snug ${dark ? "text-on-band" : "text-text"}`}>
              {item.title}
            </h3>
            <p className={`text-[15.5px] leading-[25px] ${dark ? "text-on-dark" : "text-muted"}`}>{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
