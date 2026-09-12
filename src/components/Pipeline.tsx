import Image from "next/image";
import type { ReactNode } from "react";
import { UploadVisual } from "./visuals/UploadVisual";

const TILES: { img: string; alt: string; title: string; copy: string; visual?: ReactNode }[] = [
  {
    img: "filing",
    visual: <UploadVisual />,
    alt: "",
    title: "Upload photos and docs",
    copy: "All uploaded files are auto-summarized and categorized for you. Filing docs is a breeze.",
  },
  {
    img: "tagging",
    alt: "A document with the tags Harbor pulled from its own text: the insurer, the address, the year.",
    title: "Tagged automatically",
    copy: "Every document gets tags pulled from its own content: the insurer, the address, the year, “tax-deductible”. A filter finds what a folder never could.",
  },
  {
    img: "search",
    alt: "A search whose match is inside a scanned page, with the matching line highlighted.",
    title: "Search intuitively",
    copy: "Find documents using multi-language support. Automated tagging makes finding things easy.",
  },
  {
    img: "share",
    alt: "A share sheet: a link to one document for a tax adviser, with an expiry date and a download switch.",
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
      <div className="grid gap-[48px] md:grid-cols-2 md:gap-x-[24px]">
        {TILES.map((t) => (
          <article key={t.img} className="flex flex-col gap-[18px]">
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
