import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/components/RootDocument";
import { Wordmark } from "@/components/Logo";
import "./globals.css";

/*
 * The 404 for addresses no route matches. The site has two root layouts (English and German),
 * so there is no single layout to build a 404 from, and Next renders this file on its own. It
 * cannot know which language the visitor wanted, so it says it in both.
 */
export const metadata: Metadata = {
  title: "Page not found · Harbor",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-[28px] px-[24px] text-center">
          <Wordmark />
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-section-head font-bold leading-[1.1] tracking-tight text-text">This page does not exist.</h1>
            <p lang="de" className="text-lead leading-copy text-muted">Diese Seite gibt es nicht.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <Link href="/" className="rounded-pill bg-accent px-[24px] py-[12px] text-body font-semibold leading-body text-ground">
              Go to the home page
            </Link>
            <Link href="/de" lang="de" className="rounded-pill border border-border-strong px-[24px] py-[12px] text-body font-semibold leading-body text-text">
              Zur Startseite
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
