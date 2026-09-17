import Link from "next/link";
import { Toc, TocMobile } from "@/components/docs/Toc";
import { ALL_PAGES, findPage, getToc, loadPage } from "@/content/docs";
import { hrefFor } from "@/content/docs/nav";
import { Anchor } from "@/mdx-components";
import type { ComponentProps } from "react";

/** One documentation page: crumbs, title, content, on-this-page, and the pages either side. */
export async function DocPage({ slug, base = "/docs" }: { slug: string; base?: string }) {
  const found = findPage(slug);
  if (!found) return null;
  const { section, index } = found;
  const [{ Content, meta }, toc] = await Promise.all([loadPage(slug), getToc(slug)]);
  const prev = ALL_PAGES[index - 1];
  const next = ALL_PAGES[index + 1];

  return (
    <>
      <article className="docs-article">
        <nav className="docs-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href={base}>Docs</Link>
            </li>
            <li aria-current={slug === "overview" ? "page" : undefined}>{section.section}</li>
          </ol>
        </nav>
        <h1 className="docs-title text-balance">{meta.title}</h1>
        <p className="docs-desc">{meta.description}</p>
        <TocMobile items={toc} />
        <div className="doc-prose">
          <Content components={{ a: (props: ComponentProps<"a">) => <Anchor {...props} base={base} /> }} />
        </div>
        <nav className="docs-pager" aria-label="Neighbouring pages">
          {prev ? (
            <Link href={hrefFor(prev.slug, base)} className="docs-pager-link">
              <span className="docs-pager-label">Previous</span>
              <span className="docs-pager-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={hrefFor(next.slug, base)} className="docs-pager-link is-next">
              <span className="docs-pager-label">Next</span>
              <span className="docs-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
      <Toc items={toc} />
    </>
  );
}
