import { TrackedLink } from "@/components/TrackedLink";
import { Arrow } from "./parts";
import { doc } from "./routes";
import { StaggerGroup, StaggerItem } from "./Stagger";

/*
 * The last thing on the page.
 *
 * This band used to be saturated cobalt, which is why the four `band` tokens exist — they never
 * flipped with the theme, because white-on-cobalt has to stay white-on-cobalt at night. It is
 * `surface` now, so it themes with everything else and those tokens are unused here.
 */
export function ClosingBand() {
  return (
    <StaggerGroup as="section" stagger={0.16} className="flex flex-col items-start justify-between gap-[48px] rounded-[26px] bg-surface lane py-[60px] md:py-[88px] lg:flex-row lg:items-center lg:gap-[80px]">
      {/* Wide enough for the headline to hold one line at desktop — the old 680px column and the
          600px cap on the h2 broke it across two, which turned three short clauses into a block. */}
      <StaggerItem className="max-w-[860px]">
        <h2 className="text-section-head font-extrabold leading-[1.15] tracking-hero text-text">
          Your data. Your rules. Your Harbor.
        </h2>
      </StaggerItem>
      <StaggerItem className="shrink-0">
      <TrackedLink
        href={doc("install")}
        analyticsEvent="installation_guide_opened"
        analyticsProperties={{ placement: "closing_band" }}
        className="flex shrink-0 items-center gap-[10px] rounded-pill bg-accent px-[26px] py-[13px] text-copy font-bold leading-body tracking-[-0.01em] text-ground"
      >
        Install Harbor
        <Arrow />
      </TrackedLink>
      </StaggerItem>
    </StaggerGroup>
  );
}
