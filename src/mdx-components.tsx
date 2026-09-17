import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { BoxDiagram } from "@/components/docs/BoxDiagram";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Note } from "@/components/docs/Note";
import { Prove } from "@/components/docs/Prove";

/**
 * Moves a link the MDX wrote as `/docs/...` into whichever docs tree is rendering it.
 *
 * The pages cross-reference each other constantly and every one of those hrefs is absolute. Left
 * alone under `/docs`, the first "see Prerequisites" in the prose drops the reader back into
 * the live chrome mid-read — the nav and the pager were rebased, and the body was the hole.
 * Rewriting here keeps the rebasing in one place and the .mdx files untouched.
 */
export function rebaseDocHref(href: string, base: string): string {
  if (base === "/docs") return href;
  if (href === "/docs") return base;
  return href.startsWith("/docs/") ? base + href.slice("/docs".length) : href;
}

export function Anchor({ href = "", children, base = "/docs", ...rest }: ComponentProps<"a"> & { base?: string }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={rebaseDocHref(href, base)} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener" {...rest}>
      {children}
    </a>
  );
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="doc-table" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

const components: MDXComponents = {
  a: Anchor,
  pre: CodeBlock,
  table: Table,
  Note,
  Prove,
  BoxDiagram,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
