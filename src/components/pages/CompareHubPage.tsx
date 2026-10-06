import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/Logo";
import { ClosingBand } from "@/components/v2/ClosingBand";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Arrow, Eyebrow } from "@/components/v2/parts";
import { COMPARE, compare } from "@/components/v2/routes";
import { StaggerGroup, StaggerItem } from "@/components/v2/Stagger";
import { StickyNav } from "@/components/v2/StickyNav";
import { findComparison } from "@/content/compare";
import { HUB } from "@/content/compare/hub";

/*
 * The /compare hub. The versus pages' table at five columns — Harbor's still the cobalt one —
 * then a way into each page. Five columns of sentences cannot fit a phone, so below desktop width
 * the table scrolls sideways inside its own frame with the question column pinned; the page
 * itself never scrolls sideways.
 */
const PAD = "py-[60px] md:py-[80px]";

export function compareHubMetadata(): Metadata {
  return {
    ...HUB.meta,
    alternates: { canonical: COMPARE },
    openGraph: { title: HUB.meta.title, description: HUB.meta.description, url: COMPARE, siteName: "Harbor", locale: "en_US", type: "website" },
  };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function CompareHubPage() {
  const products = HUB.columns.map((slug) => findComparison(slug)).filter((c) => c !== undefined);

  return (
    <div className="px-[24px]">
      <NavV2 />
      <StickyNav sentinelClassName="h-0 w-full" />
      <main id="main" className="flex flex-col gap-[26px]">
        <section className={`flex flex-col items-center gap-[48px] rounded-[26px] bg-surface lane ${PAD}`}>
          <StaggerGroup className="flex flex-col items-center gap-[22px]">
            <StaggerItem>
              <Eyebrow>COMPARE</Eyebrow>
            </StaggerItem>
            <StaggerItem as="h1" className="max-w-[900px] text-balance text-center text-display font-bold leading-[1.12] tracking-[-0.032em] text-text">
              {HUB.hero.title}
            </StaggerItem>
            <StaggerItem as="p" className="max-w-[680px] text-center text-copy leading-copy text-muted">
              {HUB.hero.lead}
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup delay={0.3} className="flex w-full flex-col gap-[16px]">
            <StaggerItem>
              <HubTable names={products.map((p) => ({ slug: p.slug, name: p.name }))} />
            </StaggerItem>
            <StaggerItem as="p" className="text-center text-small leading-[20px] text-muted">
              Checked <time dateTime={HUB.checked}>{longDate(HUB.checked)}</time>. Each comparison lists its sources.
            </StaggerItem>
          </StaggerGroup>
        </section>

        <StaggerGroup as="section" className={`flex flex-col gap-[40px] rounded-[26px] bg-ground lane ${PAD}`}>
          <StaggerItem className="flex flex-col gap-[18px]">
            <Eyebrow>IN DETAIL</Eyebrow>
            <h2 className="text-section-head font-bold leading-[1.1] tracking-tight text-text">Read a comparison</h2>
          </StaggerItem>
          <StaggerGroup as="ul" className="grid gap-[20px] md:grid-cols-2">
            {products.map((p) => (
              <StaggerItem as="li" key={p.slug}>
                <Link
                  href={compare(p.slug)}
                  className="group flex h-full flex-col gap-[10px] rounded-[20px] border border-border bg-panel p-[24px] transition-colors duration-150 hover:border-border-strong sm:p-[28px]"
                >
                  <span className="font-mono text-label font-medium uppercase leading-[14px] tracking-mono text-faint">Harbor vs {p.name}</span>
                  <span className="font-title text-section leading-[24px] tracking-snug text-text">{p.hero.title}</span>
                  <span className="flex-1 text-[15.5px] leading-[25px] text-muted">{HUB.summaries[p.slug]}</span>
                  <span className="mt-[6px] flex items-center gap-[8px] text-body font-semibold leading-[20px] text-accent group-hover:underline">
                    Read the comparison
                    <Arrow size={14} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </StaggerGroup>

        <ClosingBand lead="Free, open source, and on a machine you own." placement="compare_hub_closing" />
      </main>
      <FooterV2 />
    </div>
  );
}

/*
 * The versus table at five columns. `border-separate` for the same reason as on the versus pages:
 * a collapsed table cannot round its corners. The question column is sticky so a row keeps its
 * label while the table scrolls sideways on a narrow screen.
 */
function HubTable({ names }: { names: { slug: string; name: string }[] }) {
  const pad = "px-[16px] py-[14px] align-middle text-row leading-row sm:px-[20px] sm:py-[16px]";
  const last = HUB.rows.length - 1;
  const sticky = "sticky left-0 z-10";

  return (
    <div className="-mx-[24px] overflow-x-auto px-[24px] pb-[4px] lg:mx-0 lg:px-0">
      <table className="w-full min-w-[960px] table-fixed border-separate border-spacing-0 text-left">
        <caption className="sr-only">Harbor compared with {names.map((n) => n.name).join(", ")}</caption>
        <thead>
          <tr>
            <th scope="col" className={`${sticky} w-[18%] bg-surface`}>
              <span className="sr-only">Question</span>
            </th>
            <th scope="col" className="rounded-t-[16px] bg-band px-[12px] py-[20px] align-middle">
              <span className="flex items-center justify-center gap-[8px]">
                <Mark size={20} color="var(--color-on-band)" />
                <span className="text-[17px] font-bold leading-[22px] tracking-snug text-on-band">Harbor</span>
              </span>
            </th>
            {names.map((n) => (
              <th scope="col" key={n.slug} className="px-[12px] py-[20px] text-center align-middle">
                <Link href={compare(n.slug)} className="text-[16px] font-bold leading-[22px] tracking-snug text-text hover:text-accent">
                  {n.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HUB.rows.map((r, i) => (
            <tr key={r.q}>
              <th
                scope="row"
                className={`${pad} ${sticky} border-b border-l border-border bg-panel font-semibold text-text ${i === 0 ? "rounded-tl-[16px] border-t" : ""} ${i === last ? "rounded-bl-[16px]" : ""}`}
              >
                {r.q}
              </th>
              <td className={`${pad} border-b bg-band font-medium text-on-band ${i === last ? "border-band" : "border-band-line"}`}>{r.harbor}</td>
              {r.them.map((cell, j) => (
                <td
                  key={names[j]?.slug ?? j}
                  className={`${pad} border-b border-border bg-panel text-muted ${j > 0 ? "border-l" : ""} ${j === r.them.length - 1 ? "border-r" : ""} ${i === 0 ? "border-t" : ""} ${i === 0 && j === r.them.length - 1 ? "rounded-tr-[16px]" : ""} ${i === last && j === r.them.length - 1 ? "rounded-br-[16px]" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
