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
import { alternatesFor, type Lang } from "@/lib/i18n";

/*
 * The v2 home page, built from the "Home — full page" artboard in the Paper file. Rendered by
 * `app/(en)/page.tsx` at `/` and `app/(de)/de/page.tsx` at `/de`.
 *
 * The 24px inset is here rather than on each section: in the design it lives on the artboard, so
 * every band — nav, hero, footer included — is held the same distance off the glass and the
 * rounded sections read as one inset document. Sections butt against each other by default; the
 * two places the design opens a gap (under the hero, and before the FAQ) are explicit.
 */
const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Harbor: your household document vault",
    description:
      "An open-source document vault you host yourself. Organize household paperwork, search your records, track important dates, and share documents on your terms.",
  },
  de: {
    title: "Harbor: der Dokumententresor für deinen Haushalt",
    description:
      "Ein quelloffener Dokumententresor, den du selbst hostest. Ordne den Papierkram deines Haushalts, durchsuche deine Unterlagen, behalte Fristen im Blick und teile Dokumente zu deinen Bedingungen.",
  },
};

export function homeMetadata(lang: Lang): Metadata {
  return { ...META[lang], alternates: alternatesFor("/", lang) };
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <div className="px-[24px]">
      <NavV2 lang={lang} />
      <main id="main" className="flex flex-col">
        <Hero lang={lang} />
        {/* Its sentinel sits here, so the bar arrives as the hero's floor leaves the viewport. */}
        <StickyNav lang={lang} />
        <Boxes lang={lang} />
        <HowItWorks lang={lang} />
        <DeepDives lang={lang} />
        {/* The one break in the page between the sharing dive and the FAQ. */}
        <div aria-hidden="true" className="h-[26px] shrink-0" />
        <Faq lang={lang} />
        <ClosingBand lang={lang} />
      </main>
      <FooterV2 lang={lang} />
    </div>
  );
}
