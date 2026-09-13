import Image from "next/image";
import type { ReactNode } from "react";
import { SearchVisualSketch } from "./visuals/SearchVisualSketch";
import { ShareVisualSketch } from "./visuals/ShareVisualSketch";
import { TagVisualSketch } from "./visuals/TagVisualSketch";
import { UploadVisualSketch } from "./visuals/UploadVisualSketch";

const TILES: { img: string; alt: string; title: string; copy: string; visual?: ReactNode }[] = [
  {
    img: "filing",
    // Hand-drawn variants. The drafted originals are still beside them in ./visuals.
    visual: <UploadVisualSketch />,
    alt: "",
    title: "Upload photos and docs",
    copy: "All uploaded files are auto-summarized and categorized for you. Filing docs is a breeze.",
  },
  {
    img: "tagging",
    visual: <TagVisualSketch />,
    alt: "",
    title: "Tagged automatically",
    copy: "Every document gets tags pulled from its own content: the insurer, the address, the year, “tax-deductible”. A filter finds what a folder never could.",
  },
  {
    img: "search",
    visual: <SearchVisualSketch />,
    alt: "",
    title: "Search intuitively",
    copy: "Find documents using multi-language support. Automated tagging makes finding things easy.",
  },
  {
    img: "share",
    visual: <ShareVisualSketch />,
    alt: "",
    title: "Share with tax advisers",
    copy: "Secure sharing with tax advisers. You control who can download and when links expire.",
  },
];

export function Pipeline() {
  return (
    <section className="gutter flex flex-col gap-[64px] bg-ground pb-[110px] pt-[104px]">
      <div className="max-w-[700px]">
        <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">Paperwork that files itself.</h2>
      </div>
      {/* min-w-0 on each tile: the 500px stages inside the visuals clip rather than widen the column past a phone. */}
      <div className="grid gap-[48px] md:grid-cols-2 md:gap-x-[24px]">
        {TILES.map((t) => (
          <article key={t.img} className="flex min-w-0 flex-col gap-[18px]">
            {t.visual ?? (
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src={`/mock/tile-${t.img}@2x.png`}
                alt={t.alt}
                width={588}
                height={300}
                sizes="(min-width: 1440px) 588px, (min-width: 768px) 42vw, 100vw"
                className="block h-auto w-full"
              />
            </div>
            )}
            <div className="flex flex-col gap-[8px]">
              <h3 className="font-title text-lead leading-copy tracking-[-0.025em] text-text">{t.title}</h3>
              <p className="text-[15.5px] leading-[25px] text-muted">{t.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
