import { TrackedLink } from "@/components/TrackedLink";
import { getLatestRelease, GITHUB } from "@/lib/github";
import { Arrow } from "./parts";
import { HeroDemo } from "./HeroDemo";
import { HeroCta } from "./HeroCta";
import { StaggerGroup, StaggerItem } from "./Stagger";

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
        {/*
          Two nested groups, so the copy builds line by line and the window arrives after it.
          Motion propagates a variant down through nested motion components, so the inner group
          both receives "visible" from the outer one and runs its own stagger against its own
          children. The outer step is wide because it only has two children and the second of them
          should not start until the copy has largely landed.
        */}
        <StaggerGroup className="flex w-full max-w-[1200px] flex-col items-center gap-[48px]" stagger={0.62}>
          <StaggerGroup className="flex max-w-[860px] flex-col items-center gap-[26px] text-center">
            {/* Only rendered when GitHub answered. A version stamp that is wrong is worse than
                none, and this page has no hardcoded number anywhere. */}
            {release && (
              /* Solid `text`, labelled in `ground`. Both flip, so the pill inverts to a light
                 chip with dark type at night rather than staying a black hole in a dark page —
                 the same pair the nav's "Get started" button uses. The version keeps the mono
                 face to stay distinct now that it no longer has a fill of its own. */
              <StaggerItem>
                <TrackedLink
                  href={release.url}
                  analyticsEvent="release_notes_opened"
                  analyticsProperties={{ placement: "hero_release_badge" }}
                  className="flex items-center gap-[10px] rounded-pill bg-text px-[14px] py-[7px] text-ground"
                >
                  <span className="font-mono text-label font-medium leading-[14px] tracking-mono">{release.tag}</span>
                  <span className="shiny-text text-row leading-[18px] text-ground/75">What&rsquo;s new</span>
                  <Arrow size={13} />
                </TrackedLink>
              </StaggerItem>
            )}

            <StaggerItem as="h1" className="font-display text-hero font-bold leading-[1.03] tracking-hero text-text">
              Bring sanity to your household paperwork
            </StaggerItem>

            <StaggerItem as="p" className="max-w-[680px] text-lead leading-copy text-muted">
              Harbor is an open-source document vault you host yourself. Connect your inbox or upload files to
              organize your household records, keep track of important dates, and find what you need.
            </StaggerItem>

            <StaggerItem>
              <HeroCta github={GITHUB} />
            </StaggerItem>
          </StaggerGroup>

          {/* `w-full`, because the column centres its children and the demo sizes itself from its
              parent: a wrapper that shrank to its content would take the window down with it. */}
          <StaggerItem className="w-full">
            <HeroDemo />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
