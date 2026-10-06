import type { Metadata } from "next";
import { ClosingBand } from "@/components/v2/ClosingBand";
import { Faq } from "@/components/v2/Faq";
import { FooterV2 } from "@/components/v2/FooterV2";
import { Mark } from "@/components/Logo";
import { NavV2 } from "@/components/v2/NavV2";
import { Eyebrow } from "@/components/v2/parts";
import { compare } from "@/components/v2/routes";
import { StaggerGroup, StaggerItem } from "@/components/v2/Stagger";
import { StickyNav } from "@/components/v2/StickyNav";
import type { Comparison } from "@/content/compare";
import type { Figure, Quote } from "@/content/compare/types";

/*
 * A versus page: Harbor beside one alternative. English only, in the features page's shell.
 *
 * The shape the established versus pages share: the answer in one sentence, a short table right
 * under it, three differentiators, a plain note on where the other product is ahead, a few
 * questions. The table sits inside the opening band, the way the pricing page's plans do, so the
 * comparison is on screen before anything else is asked of the reader. It is a real <table> with
 * row headers, so a crawler reads the same structure a person does.
 */
const PAD = "py-[60px] md:py-[80px]";

export function compareMetadata(c: Comparison): Metadata {
  const url = compare(c.slug);
  return {
    ...c.meta,
    alternates: { canonical: url },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url,
      siteName: "Harbor",
      locale: "en_US",
      type: "website",
    },
  };
}

/** Spelled from a fixed table, so the server and every browser print the same date. */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function ComparePage({ comparison: c }: { comparison: Comparison }) {
  return (
    <div className="px-[24px]">
      <FaqJsonLd questions={c.faq} />
      <NavV2 />
      <StickyNav sentinelClassName="h-0 w-full" />
      <main id="main" className="flex flex-col gap-[26px]">
        <section className={`flex flex-col items-center gap-[48px] rounded-[26px] bg-surface lane ${PAD}`}>
          <StaggerGroup className="flex flex-col items-center gap-[22px]">
            <StaggerItem>
              <Eyebrow>Harbor vs {c.name}</Eyebrow>
            </StaggerItem>
            <StaggerItem as="h1" className="max-w-[900px] text-balance text-center text-display font-bold leading-[1.12] tracking-[-0.032em] text-text">
              {c.hero.title}
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[640px] text-center text-copy leading-copy text-muted">
              {c.hero.lead}
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup delay={0.3} className="flex w-full max-w-[880px] flex-col gap-[16px]">
            <StaggerItem>
              <ComparisonTable comparison={c} />
            </StaggerItem>
            <StaggerItem as="p" className="text-center text-small leading-[20px] text-muted">
              Checked <time dateTime={c.checked}>{longDate(c.checked)}</time> against these sources:{" "}
              {c.sources.map((s, i) => (
                <span key={s.href}>
                  {i > 0 && ", "}
                  <a href={s.href} className="underline decoration-border-strong underline-offset-2 hover:text-accent">
                    {s.label}
                  </a>
                </span>
              ))}
              .
            </StaggerItem>
          </StaggerGroup>
        </section>

        {/*
          The argument, one row per point: the claim on the left, its evidence on the right — the
          other product's own words, or the arithmetic. Rows rather than three columns, so a point
          gets the width its evidence needs and every piece of evidence starts on the same line as
          its claim, whatever the paragraphs' lengths.
        */}
        <section className={`flex flex-col gap-[40px] rounded-[26px] bg-ground lane ${PAD}`}>
          <StaggerGroup className="flex flex-col gap-[18px]">
            <StaggerItem>
              <Eyebrow>THE DIFFERENCE</Eyebrow>
            </StaggerItem>
            <StaggerItem>
              <h2 className="max-w-[900px] text-section-head font-bold leading-[1.1] tracking-tight text-text">{c.differentiators.title}</h2>
            </StaggerItem>
          </StaggerGroup>
          <ol className="flex flex-col">
            {c.differentiators.points.map((p, i) => (
              <StaggerGroup
                as="li"
                key={p.title}
                className="grid gap-x-[80px] gap-y-[28px] border-t border-border py-[40px] last:pb-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:py-[48px]"
              >
                <StaggerItem className="flex flex-col gap-[14px]">
                  <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-accent">{`0${i + 1}`}</span>
                  <h3 className="text-subhead font-bold leading-[1.17] tracking-tight text-text">{p.title}</h3>
                  <p className="max-w-[480px] text-[16px] leading-section text-muted">{p.body}</p>
                </StaggerItem>
                <StaggerItem className="flex flex-col justify-center">
                  {p.quote && <Evidence quote={p.quote} />}
                  {p.figures && <CostChart figures={p.figures} note={p.note} />}
                  {p.checklist && <Checklist {...p.checklist} />}
                </StaggerItem>
              </StaggerGroup>
            ))}
          </ol>
        </section>

        <StaggerGroup as="section" className={`flex flex-col gap-[32px] rounded-[26px] bg-surface lane ${PAD} lg:flex-row lg:gap-[80px]`}>
          <StaggerItem className="flex shrink-0 flex-col gap-[18px] lg:w-[360px]">
            <Eyebrow>FAIR TO SAY</Eyebrow>
            <h2 className="text-subhead font-bold leading-[1.17] tracking-tight text-text">{c.fair.title}</h2>
            <p className="text-[16px] leading-section text-muted">{c.fair.lead}</p>
          </StaggerItem>
          <StaggerGroup as="ul" className="flex flex-1 flex-col lg:max-w-[560px] lg:self-center">
            {c.fair.points.map((point, i) => (
              <StaggerItem
                as="li"
                key={point}
                className={`py-[14px] text-copy leading-[24px] text-text ${i > 0 ? "border-t border-border" : "pt-0"}`}
              >
                {point}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </StaggerGroup>

        <Faq title={`Switching from ${c.name}`} questions={c.faq} />

        <ClosingBand lead="Free, open source, and on a machine you own." placement={`compare_${c.slug}_closing`} />
      </main>
      <FooterV2 />
    </div>
  );
}

/** The other product's own words, in the docs' note shape: a hairline box, its source beneath. */
function Evidence({ quote }: { quote: Quote }) {
  return (
    <figure className="flex flex-col gap-[16px] rounded-lg border border-border bg-surface px-[22px] py-[22px] sm:px-[28px] sm:py-[26px]">
      <blockquote cite={quote.href} className="text-copy leading-[27px] text-text">
        “{quote.text}”
      </blockquote>
      <figcaption className="font-mono text-label font-medium uppercase leading-[14px] tracking-mono text-faint">
        <a href={quote.href} className="hover:text-accent">
          {quote.source}
        </a>
      </figcaption>
    </figure>
  );
}

/** What Harbor does, as a short list in the same box the other points use for their evidence. */
function Checklist({ caption, items }: { caption: string; items: string[] }) {
  return (
    <figure className="flex flex-col gap-[18px] rounded-lg border border-border bg-surface px-[22px] py-[22px] sm:px-[28px] sm:py-[26px]">
      <figcaption className="font-mono text-label font-medium uppercase leading-[14px] tracking-mono text-faint">{caption}</figcaption>
      <ul className="flex flex-col gap-[12px]">
        {items.map((item) => (
          <li key={item} className="flex gap-[10px] text-copy leading-[25px] text-text">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-[5px] shrink-0" aria-hidden="true">
              <path d="M3 8.5l3.2 3L13 4.5" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </figure>
  );
}

/*
 * Ten years of cost as horizontal bars, each named on its own line beside it. One measure on one
 * baseline, so a bar's length is the whole comparison: the bars grow from a square start to a 4px
 * rounded end, 18px thick, with the value at the tip. Harbor's bar is the accent; the others share one neutral. Every bar is named and
 * valued in text, so the colour is never the only way to tell them apart, and the list itself is
 * the table view — there is nothing a tooltip would add.
 */
function CostChart({ figures, note }: { figures: Figure[]; note?: string }) {
  const max = Math.max(...figures.map((f) => f.amount ?? 0));
  return (
    <figure className="flex flex-col gap-[20px] rounded-lg border border-border bg-surface px-[22px] py-[22px] sm:px-[28px] sm:py-[26px]">
      <figcaption className="font-mono text-label font-medium uppercase leading-[14px] tracking-mono text-faint">Cost over ten years</figcaption>
      <dl className="flex flex-col gap-[16px] sm:gap-[14px]">
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col gap-[8px] sm:grid sm:grid-cols-[176px_minmax(0,1fr)] sm:items-center sm:gap-[16px]">
            <dt className={`text-body leading-body ${f.harbor ? "font-semibold text-text" : "text-muted"}`}>{f.label}</dt>
            <dd className="flex items-center gap-[12px]">
              <span
                aria-hidden="true"
                className={`block h-[18px] rounded-r-[4px] ${f.harbor ? "bg-accent" : "bg-chart-neutral"}`}
                style={{ width: `calc((100% - 104px) * ${(f.amount ?? 0) / max})` }}
              />
              <span className={`shrink-0 font-mono text-[15px] leading-body tabular-nums ${f.harbor ? "font-medium text-text" : "text-muted"}`}>
                {f.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="border-t border-border pt-[16px] text-small leading-[19px] text-muted">{note}</p>}
    </figure>
  );
}

/*
 * The table, with Harbor as a filled cobalt column whose head rises above the table as a tab.
 * That fill is the one place besides the promise band where cobalt covers a surface, so it uses
 * the band tokens, which stay cobalt in both themes. A few words per cell keeps it three columns
 * even on a phone.
 *
 * `border-separate` rather than collapsed borders, because collapsed tables cannot round their
 * corners: each edge cell draws its own side of the frame and its own corner instead.
 */
function ComparisonTable({ comparison: c }: { comparison: Comparison }) {
  const pad = "px-[12px] py-[14px] align-middle text-row leading-row sm:px-[24px] sm:py-[18px] sm:text-body sm:leading-body";
  const last = c.rows.length - 1;
  return (
    <table className="w-full table-fixed border-separate border-spacing-0 text-left">
      <caption className="sr-only">Harbor compared with {c.name}</caption>
      <thead>
        <tr>
          <th scope="col" className="w-[32%]">
            <span className="sr-only">Question</span>
          </th>
          <th scope="col" className="rounded-t-[16px] bg-band px-[12px] py-[20px] align-middle sm:py-[26px]">
            <span className="flex items-center justify-center gap-[8px]">
              <Mark size={22} color="var(--color-on-band)" />
              <span className="text-[17px] font-bold leading-[22px] tracking-snug text-on-band sm:text-[20px]">Harbor</span>
            </span>
          </th>
          <th scope="col" className="px-[12px] py-[20px] align-middle text-center text-[17px] font-bold leading-[22px] tracking-snug text-text sm:py-[26px] sm:text-[20px]">
            {c.name}
          </th>
        </tr>
      </thead>
      <tbody>
        {c.rows.map((r, i) => (
          <tr key={r.q}>
            <th
              scope="row"
              className={`${pad} border-b border-l border-border bg-panel font-semibold text-text ${i === 0 ? "rounded-tl-[16px] border-t" : ""} ${i === last ? "rounded-bl-[16px]" : ""}`}
            >
              {r.q}
            </th>
            <td className={`${pad} border-b bg-band font-medium text-on-band ${i === last ? "border-band" : "border-band-line"}`}>{r.harbor}</td>
            <td
              className={`${pad} border-b border-r border-border bg-panel text-muted ${i === 0 ? "rounded-tr-[16px] border-t" : ""} ${i === last ? "rounded-br-[16px]" : ""}`}
            >
              {r.them}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/*
 * The questions as structured data, rendered the way the Next docs recommend (guides/json-ld):
 * a plain script tag, with `<` escaped so a question can never close it.
 */
function FaqJsonLd({ questions }: { questions: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
