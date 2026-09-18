import Link from "next/link";
import { getLatestRelease, GITHUB } from "@/lib/github";
import { Arrow } from "./parts";
import { HeroDemo } from "./HeroDemo";
import { HeroCta } from "./HeroCta";

/*
 * A tinted band with a 26px corner, and the app rising out of its floor.
 *
 * The band is `surface-2` against the page's white `ground` — the lighter of the two tints, so
 * the band reads as a held-back area rather than a grey panel. The demo window inside it keeps
 * its shadow, which is what separates the two now that they are only a step apart. The 24px page inset lives on the page wrapper
 * (see page.tsx) rather than here, so every section shares it; this section only adds the 26px
 * of ground beneath itself that separates the band from whatever follows.
 *
 * The band clips: its own 26px radius rounds the screenshot's bottom corners, which is why the
 * shot needs no bottom border and no chrome around it. An earlier version wrapped it in a
 * MacBook bezel and notch; the plain shot reads as the product rather than as a photograph of a
 * laptop, so the chrome came off.
 */
export async function Hero() {
  const release = await getLatestRelease();

  return (
    <section className="flex flex-col pb-[26px]">
      <div className="flex flex-col items-center overflow-hidden rounded-[26px] bg-surface-2 px-[20px] pb-[56px] pt-[64px] md:px-[40px] md:pb-[88px] md:pt-[96px]">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-[48px]">
          <div className="flex max-w-[860px] flex-col items-center gap-[26px] text-center">
            {/* Only rendered when GitHub answered. A version stamp that is wrong is worse than
                none, and this page has no hardcoded number anywhere. */}
            {release && (
              /* Solid `text`, labelled in `ground`. Both flip, so the pill inverts to a light
                 chip with dark type at night rather than staying a black hole in a dark page —
                 the same pair the nav's "Get started" button uses. The version keeps the mono
                 face to stay distinct now that it no longer has a fill of its own. */
              <Link
                href={release.url}
                className="flex items-center gap-[10px] rounded-pill bg-text px-[14px] py-[7px] text-ground"
              >
                <span className="font-mono text-label font-medium leading-[14px] tracking-mono">{release.tag}</span>
                <span className="text-row leading-[18px]">What&rsquo;s new</span>
                <Arrow size={13} />
              </Link>
            )}

            <h1 className="font-display text-hero font-bold leading-[1.03] tracking-hero text-text">
              Bring sanity to your household paperwork
            </h1>

            <p className="max-w-[680px] text-lead leading-copy text-muted">
              Harbor is your open source document vault that transforms record management in your home. Connect your
              inbox or upload files and see Harbor work to tag, sort, and retrieve.
            </p>

            <HeroCta github={GITHUB} />

            <SwitchingFrom />
          </div>

          <HeroDemo />
        </div>
      </div>
    </section>
  );
}

/**
 * The line under the buttons, for someone arriving from a hosted vault.
 *
 * `See how` points at the comparison rather than at a migration guide: there is no Trustworthy
 * importer in the repository, and a link promising one would be the only thing on this page the
 * product cannot actually do.
 */
function SwitchingFrom() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[9px]">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
        <path
          d="M8 1.6v12.8M1.6 8h12.8M3.5 3.5l9 9M12.5 3.5l-9 9"
          stroke="var(--color-accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-body leading-[22px] text-muted">Switching from Trustworthy?</span>
      <Link
        href="/#comparison"
        className="flex items-center gap-[7px] border-b border-border-strong pb-[2px] text-body font-medium leading-[22px] text-text"
      >
        See how
        <Arrow size={14} />
      </Link>
    </div>
  );
}
