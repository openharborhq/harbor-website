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
import { alternatesFor, type Lang } from "@/lib/i18n";

/*
 * Features, in the v2 shell. The words are the live page's, imported rather than copied.
 *
 * Every band on this page is the same height of padding and the same 26px apart, and the tone
 * alternates white, grey, white, grey the whole way down — including the closing band, which is
 * already `surface` and lands on the right side of the alternation by itself. `TONE` is derived
 * from position rather than written out per section, so inserting a band cannot break the rhythm.
 */
const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Features · Harbor",
    description:
      "Organize household paperwork, search document contents, track important dates, and share selected records with an open-source vault you host yourself.",
  },
  de: {
    title: "Funktionen · Harbor",
    description:
      "Ordne die Unterlagen deines Haushalts, durchsuche Dokumentinhalte, behalte wichtige Termine im Blick und teile ausgewählte Dokumente – mit einem Open-Source-Tresor, den du selbst hostest.",
  },
};

export function featuresMetadata(lang: Lang): Metadata {
  return { ...META[lang], alternates: alternatesFor("/features", lang) };
}

/** The page's own words. The six groups' words live in `content/features.tsx`. */
const COPY: Record<
  Lang,
  { eyebrow: string; title: string; lead: string; marquee: string; docEyebrow: string; docBody: string; docAlt: string }
> = {
  en: {
    eyebrow: "FEATURES",
    title: "Your household paperwork, organized",
    lead: "Bring documents together from uploads and email. Search their contents, track important dates, and share selected records—all from a vault you host yourself.",
    marquee: "AND EVERYTHING ELSE THE HOUSEHOLD KEEPS",
    docEyebrow: "ONE DOCUMENT, EVERYTHING ABOUT IT",
    docBody:
      "View a document alongside its summary, tags, expiration date, and household notes. Keep the original and the details you need together.",
    docAlt: "A document in Harbor: the scanned original beside its summary, tags, notes and expiry date.",
  },
  de: {
    eyebrow: "FUNKTIONEN",
    title: "Die Unterlagen deines Haushalts, geordnet",
    lead: "Führe Dokumente aus Uploads und E-Mails zusammen. Durchsuche ihren Inhalt, behalte wichtige Termine im Blick und teile ausgewählte Dokumente – alles aus einem Tresor, den du selbst hostest.",
    marquee: "UND ALLES ANDERE, WAS EIN HAUSHALT AUFBEWAHRT",
    docEyebrow: "EIN DOKUMENT, ALLES DAZU",
    docBody:
      "Sieh dir ein Dokument neben Zusammenfassung, Tags, Ablaufdatum und Notizen des Haushalts an. Das Original und die Angaben, die du brauchst, bleiben zusammen.",
    docAlt: "Ein Dokument in Harbor: das gescannte Original neben Zusammenfassung, Tags, Notizen und Ablaufdatum.",
  },
};

/** Grey on the evens, white on the odds, counting the hero as nought. */
const tone = (i: number): "surface" | "ground" => (i % 2 === 0 ? "surface" : "ground");

/** One value for every band's vertical padding, so "consistent spacing" is one number. */
const PAD = "py-[60px] md:py-[80px]";

export function FeaturesPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const groups = GROUPS[lang];
  /* German only: the display heading may break inside a long compound on a phone. */
  const hyphens = lang === "de" ? " hyphens-auto" : "";
  return (
    <div className="px-[24px]">
      <NavV2 lang={lang} />
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
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </StaggerItem>
            <StaggerItem
              as="h1"
              className={`max-w-[900px] text-center text-display font-bold leading-[1.12] tracking-[-0.032em] text-text${hyphens}`}
            >
              {t.title}
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[680px] text-center text-copy leading-copy text-muted">
              {t.lead}
            </StaggerItem>
          </StaggerGroup>
          {/* One item rather than a group: the marquee is already moving under its own power, and
              staggering its label against it would be two clocks on one row. */}
          <StaggerItem className="flex w-full flex-col items-center gap-[18px] pt-[26px]">
            <DocumentMarquee lang={lang} />
            <p className="lane text-center font-mono text-label font-medium leading-[18px] tracking-mono text-faint">
              {t.marquee}
            </p>
          </StaggerItem>
        </StaggerGroup>

        {/* Same behaviour as the home page: the pill arrives as the opening band's floor passes the
            top of the viewport. The negative margin cancels the gap this sentinel would otherwise
            add between the band and what follows. */}
        <StickyNav sentinelClassName="h-0 w-full -mt-[26px]" lang={lang} />

        {groups.slice(0, 3).map((g, i) => (
          <FeatureBand key={g.id} group={g} tone={tone(i + 1)} lang={lang} />
        ))}

        <StaggerGroup as="section" stagger={0.2} className={`flex flex-col items-center gap-[30px] rounded-[26px] lane bg-surface ${PAD}`}>
          <StaggerItem className="flex max-w-[720px] flex-col items-center gap-[12px]">
            <Eyebrow>{t.docEyebrow}</Eyebrow>
            <p className="text-center text-copy leading-copy text-muted">
              {t.docBody}
            </p>
          </StaggerItem>
          <StaggerItem className="w-full max-w-[1000px] overflow-hidden rounded-[16px] border border-border">
            <Image
              src="/mock/slide-document@2x.png"
              alt={t.docAlt}
              width={1000}
              height={720}
              sizes="(min-width: 1100px) 1000px, calc(100vw - 48px)"
              className="block h-auto w-full"
            />
          </StaggerItem>
        </StaggerGroup>

        {groups.slice(3).map((g, i) => (
          <FeatureBand key={g.id} group={g} tone={tone(i + 5)} lang={lang} />
        ))}

        <ClosingBand lang={lang} />
      </main>
      <FooterV2 lang={lang} />
    </div>
  );
}
