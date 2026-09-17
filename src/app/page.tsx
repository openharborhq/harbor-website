import type { Metadata } from "next";
import { Boxes } from "@/components/v2/Boxes";
import { ClosingBand } from "@/components/v2/ClosingBand";
import { DeepDives } from "@/components/v2/DeepDive";
import { Faq } from "@/components/v2/Faq";
import { FooterV2 } from "@/components/v2/FooterV2";
import { Hero } from "@/components/v2/Hero";
import { HowItWorks } from "@/components/v2/HowItWorks";
import { NavV2 } from "@/components/v2/NavV2";
import { StickyNav } from "@/components/v2/StickyNav";

/*
 * The v2 home page, built from the "Home — full page" artboard in the Paper file.
 *
 * The 24px inset is here rather than on each section: in the design it lives on the artboard, so
 * every band — nav, hero, footer included — is held the same distance off the glass and the
 * rounded sections read as one inset document. Sections butt against each other by default; the
 * two places the design opens a gap (under the hero, and before the FAQ) are explicit.
 */
export const metadata: Metadata = {
  title: "Harbor: a document vault for a household, on a machine you own",
  description:
    "Open source, self-hosted. Paperwork arrives by email or upload; Harbor reads it, files it against the person or thing it belongs to, and puts the dates inside it on a list.",
};

export default function Page() {
  return (
    <div className="px-[24px]">
      <NavV2 />
      <main id="main" className="flex flex-col">
        <Hero />
        {/* Its sentinel sits here, so the bar arrives as the hero's floor leaves the viewport. */}
        <StickyNav />
        <Boxes />
        <HowItWorks />
        <DeepDives />
        {/* The one break in the page between the sharing dive and the FAQ. */}
        <div aria-hidden="true" className="h-[26px] shrink-0" />
        <Faq />
        <ClosingBand />
      </main>
      <FooterV2 />
    </div>
  );
}
