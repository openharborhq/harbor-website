import Link from "next/link";
import { GITHUB } from "./Nav";
import { VaultIllustration } from "./visuals/VaultIllustration";

/**
 * Copy on the left, the drawing on the right with its cable running off the edge of the viewport.
 * The row keeps the page's left gutter but drops the right one, so the illustration reaches the
 * screen edge at any width and the cable is cut off by the viewport rather than ending in mid-air.
 */
export function Hero() {
  return (
    <section className="flex flex-col gap-10 overflow-hidden pb-[64px] pl-[var(--gutter)] pr-[var(--gutter)] pt-[80px] lg:flex-row lg:items-center lg:gap-[40px] lg:pr-0">
      <div className="flex max-w-[620px] flex-col gap-[26px]">
        <h1 className="text-[clamp(38px,4.3vw,56px)] font-extrabold leading-[1.07] tracking-[-0.038em] text-text">
          Bring sanity to your household paperwork
        </h1>
        <p className="max-w-[540px] text-section leading-[30px] text-muted">
          Harbor is your open source document vault that transforms record management in your home. Connect your
          inbox or upload files and see Harbor work to tag, sort, and retrieve.
        </p>
        <div className="flex flex-wrap items-center gap-[12px] pt-[8px]">
          <Link
            href={`${GITHUB}#install`}
            className="flex items-center gap-[9px] rounded-pill bg-accent px-[26px] py-[15px] text-[16px] font-semibold leading-row tracking-[-0.01em] text-ground"
          >
            Get started
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {/* Gone on a phone: the section below is the answer to it, and scrolling is already how
              you get there. Kept above md, where the two buttons sit side by side. */}
          <Link
            href="#features"
            className="hidden rounded-pill border border-border px-[26px] py-[15px] text-[16px] font-semibold leading-row tracking-[-0.01em] text-text md:block"
          >
            See how it works
          </Link>
        </div>
      </div>

      {/* Gone on a phone: at that width the drawing is too small to read as a scanner and a stack
          of paper, and it pushes the two buttons — the only thing this section is asking for — off
          the first screen. The negative right margin lets the cable run past the gutter on the
          widths that do keep it; the section clips it, so nothing overflows the page. */}
      <div className="hidden w-auto shrink-0 md:-mr-[var(--gutter)] md:block lg:mr-0 lg:ml-auto lg:w-[640px]">
        <VaultIllustration />
      </div>
    </section>
  );
}
