import type { Metadata } from "next";
import Image from "next/image";
import { ClosingBand } from "@/components/v2/ClosingBand";
import { DocumentMarquee } from "@/components/v2/DocumentMarquee";
import { FeatureBand } from "@/components/v2/FeatureBand";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Eyebrow } from "@/components/v2/parts";
import { StaggerGroup, StaggerItem } from "@/components/v2/Stagger";
import { StickyNav } from "@/components/v2/StickyNav";
import { GROUPS } from "@/content/features";

/*
 * Features, in the v2 shell. The words are the live page's, imported rather than copied.
 *
 * Every band on this page is the same height of padding and the same 26px apart, and the tone
 * alternates white, grey, white, grey the whole way down — including the closing band, which is
 * already `surface` and lands on the right side of the alternation by itself. `TONE` is derived
 * from position rather than written out per section, so inserting a band cannot break the rhythm.
 */
export const metadata: Metadata = {
  title: "Features · Harbor",
  description:
    "One place for everything. Easy to find. Nothing expires by surprise. And it never leaves your house. Harbor is an open-source, self-hosted vault for a household's documents.",
};

/** Grey on the evens, white on the odds, counting the hero as nought. */
const tone = (i: number): "surface" | "ground" => (i % 2 === 0 ? "surface" : "ground");

/** One value for every band's vertical padding, so "consistent spacing" is one number. */
const PAD = "py-[60px] md:py-[80px]";

export default function Page() {
  return (
    <div className="px-[24px]">
      <NavV2 />
      {/* 26px between bands: the gap the home page opens between its hero and what follows, used
          uniformly here rather than in two chosen places. */}
      <main id="main" className="flex flex-col gap-[26px]">
        {/* The lane is on the copy, not on the section, because the chip rows have to reach the
            band's own edges — the band's 26px corner is what clips them. */}
        {/* The page's own hero: the copy builds line by line and the chip rows follow it, the same
            shape the home page opens with. Above the fold, so it runs on load. */}
        <StaggerGroup
          as="section"
          stagger={0.42}
          className={`flex flex-col items-center gap-[22px] overflow-hidden rounded-[26px] bg-surface ${PAD}`}
        >
          <StaggerGroup className="flex flex-col items-center gap-[22px] lane">
            <StaggerItem>
              <Eyebrow>FEATURES</Eyebrow>
            </StaggerItem>
            <StaggerItem as="h1" className="max-w-[900px] text-center text-display font-bold leading-[1.12] tracking-[-0.032em] text-text">
              Simple, secure records management
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[680px] text-center text-copy leading-copy text-muted">
              One place for everything. Easy to find. Nothing expires by surprise. And it never leaves your house.
            </StaggerItem>
          </StaggerGroup>
          {/* One item rather than a group: the marquee is already moving under its own power, and
              staggering its label against it would be two clocks on one row. */}
          <StaggerItem className="flex w-full flex-col items-center gap-[18px] pt-[26px]">
            <DocumentMarquee />
            <p className="lane text-center font-mono text-label font-medium leading-[18px] tracking-mono text-faint">
              AND EVERYTHING ELSE THE HOUSEHOLD KEEPS
            </p>
          </StaggerItem>
        </StaggerGroup>

        {/* Same behaviour as the home page: the pill arrives as the opening band's floor passes the
            top of the viewport. The negative margin cancels the gap this sentinel would otherwise
            add between the band and what follows. */}
        <StickyNav sentinelClassName="h-0 w-full -mt-[26px]" />

        {GROUPS.slice(0, 3).map((g, i) => (
          <FeatureBand key={g.id} group={g} tone={tone(i + 1)} />
        ))}

        <StaggerGroup as="section" stagger={0.2} className={`flex flex-col items-center gap-[30px] rounded-[26px] lane bg-surface ${PAD}`}>
          <StaggerItem className="flex max-w-[720px] flex-col items-center gap-[12px]">
            <Eyebrow>ONE DOCUMENT, EVERYTHING ABOUT IT</Eyebrow>
            <p className="text-center text-copy leading-copy text-muted">
              The page exactly as it arrived, the summary Harbor wrote, the tags it pulled out, the expiry it is
              watching, and the note your spouse left last March.
            </p>
          </StaggerItem>
          <StaggerItem className="w-full max-w-[1000px] overflow-hidden rounded-[16px] border border-border">
            <Image
              src="/mock/slide-document@2x.png"
              alt="A document in Harbor: the scanned original beside its summary, tags, notes and expiry date."
              width={1000}
              height={720}
              sizes="(min-width: 1100px) 1000px, calc(100vw - 48px)"
              className="block h-auto w-full"
            />
          </StaggerItem>
        </StaggerGroup>

        {GROUPS.slice(3).map((g, i) => (
          <FeatureBand key={g.id} group={g} tone={tone(i + 5)} />
        ))}

        <ClosingBand />
      </main>
      <FooterV2 />
    </div>
  );
}
