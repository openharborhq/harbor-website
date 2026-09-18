import type { FeatureGroup } from "@/components/features/FeatureSection";
import { Eyebrow } from "./parts";

/*
 * One numbered feature group, in the v2 band rhythm.
 *
 * The live page's `FeatureSection` draws the same six groups edge to edge, separated by hairlines
 * and alternating white against `surface`. v2 has no hairlines between sections and no full-bleed
 * bands: everything is a rounded slab held 24px off the glass, and the separation comes from the
 * tonal step between one slab and the next. So this is the same content and the same two-column
 * argument, in the shape the rest of the page is in — not a second set of words.
 *
 * The dark tone the live page uses for its last group is gone. On v2 that group would be the only
 * dark slab on a light page, and the terminal token it used stays dark in both themes, which put
 * a permanent black hole at the foot of the page at night.
 *
 * No rule above each feature either. The live page separates them with a hairline; at four per
 * group across six groups that is twenty-four blue-grey lines down a page whose own sections are
 * already separated by a tonal step, and the 40px grid gap says the same thing more quietly.
 */
export function FeatureBand({ group, tone }: { group: FeatureGroup; tone: "ground" | "surface" }) {
  return (
    <section
      data-reveal
      id={group.id}
      className={`flex scroll-mt-[96px] flex-col gap-[48px] rounded-[26px] lane py-[60px] md:py-[80px] lg:flex-row lg:gap-[80px] ${
        tone === "surface" ? "bg-surface" : "bg-ground"
      }`}
    >
      <div className="flex shrink-0 flex-col gap-[18px] lg:w-[360px]">
        <span className="flex items-center gap-[10px]">
          <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-accent">{group.number}</span>
          <Eyebrow>{group.label}</Eyebrow>
        </span>
        <h2 className="text-subhead font-bold leading-[1.17] tracking-tight text-text">{group.title}</h2>
        <p className="text-[16px] leading-section text-muted">{group.lead}</p>
      </div>

      <ul className="grid min-w-0 flex-1 gap-x-[40px] gap-y-[40px] sm:grid-cols-2">
        {group.items.map((item) => (
          <li key={item.title} className="flex min-w-0 flex-col gap-[12px]">
            <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" aria-hidden="true">
              {item.icon}
            </svg>
            <h3 className="font-title text-section leading-[24px] tracking-snug text-text">{item.title}</h3>
            <p className="text-[15.5px] leading-[25px] text-muted">{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
