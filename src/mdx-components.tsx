import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { BoxDiagram } from "@/components/docs/BoxDiagram";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Note } from "@/components/docs/Note";
import { Prove } from "@/components/docs/Prove";

function Anchor({ href = "", children, ...rest }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
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
