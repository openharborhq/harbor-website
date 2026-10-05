import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Let other machines on the LAN load dev assets (Next blocks cross-origin dev resources by default).
  allowedDevOrigins: ["192.168.2.*", "*.local"],
  // In dev, serve the pre-sized 2x mocks as-is instead of pushing each one through the optimizer
  // on first request per width; production keeps optimization.
  images: { unoptimized: dev },
  // The guides under src/content/docs are MDX.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Prerequisites became the install chooser and the guide for each kind of machine.
  async redirects() {
    return [
      { source: "/docs/prerequisites", destination: "/docs/install", permanent: true },
      // The docs are English only; a German reader who guesses /de/docs lands on them.
      { source: "/de/docs/:path*", destination: "/docs/:path*", permanent: false },
    ];
  },
  // Two root layouts (English and German) leave no single layout for a 404, so the site ships a
  // global one in app/global-not-found.tsx.
  experimental: { globalNotFound: true },
};

/*
 * Code blocks in the guides are set on the landing page's terminal token. This is a Shiki
 * theme built from those tokens rather than a stock editor theme, so the docs and the site
 * share one palette. Plugin options must stay serializable: Turbopack passes them to Rust.
 */
const codeTheme = {
  name: "harbor-terminal",
  type: "dark",
  colors: {
    "editor.background": "#131e2d",
    "editor.foreground": "#dfe6f1",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8894a6" } },
    { scope: ["string", "string.quoted", "string.unquoted", "string.interpolated"], settings: { foreground: "#c3d2f5" } },
    { scope: ["keyword", "keyword.control", "keyword.operator", "storage", "storage.type"], settings: { foreground: "#7ea6ff" } },
    { scope: ["entity.name.function", "support.function", "entity.name.command", "support.function.builtin"], settings: { foreground: "#ffffff" } },
    { scope: ["variable", "variable.other", "variable.parameter", "meta.embedded"], settings: { foreground: "#a7b4c6" } },
    { scope: ["constant", "constant.numeric", "constant.language", "constant.other.option"], settings: { foreground: "#7ea6ff" } },
    { scope: ["punctuation", "meta.brace"], settings: { foreground: "#a7b4c6" } },
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-autolink-headings",
        {
          behavior: "append",
          properties: { className: ["doc-anchor"], ariaLabel: "Link to this section" },
          content: { type: "text", value: "#" },
        },
      ],
      ["rehype-pretty-code", { theme: codeTheme, keepBackground: false, defaultLang: "sh", bypassInlineCode: true }],
    ],
  },
});

export default withMDX(nextConfig);
