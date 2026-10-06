import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Inter } from "next/font/google";
import type { Lang } from "@/lib/i18n";
import "@/app/globals.css";

/*
 * The document both root layouts render: `app/(en)/layout.tsx` for the English pages and the
 * docs, `app/(de)/layout.tsx` for the German pages. Two root layouts rather than one, because the
 * root layout owns `<html lang>` and a static page cannot learn its language from the request.
 * Crossing between them is a full page load, which only happens when someone switches language.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Display face for hero headlines (see --font-display). Body copy stays on Inter. */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${geist.variable} ${plexMono.variable}`;

const DEFAULTS: Record<Lang, { title: string; description: string; tagline: string }> = {
  en: {
    // The default for any page that does not set its own. It was the old home page's headline,
    // which outlived the page itself.
    title: "Harbor: a document vault for a household, on a machine you own",
    description:
      "An open-source, self-hosted home for your family's essential documents. Email it in, Harbor reads and files it, on hardware you own.",
    tagline: "Your data. Your rules. Your Harbor.",
  },
  de: {
    title: "Harbor: der Dokumententresor für deinen Haushalt, auf deiner eigenen Hardware",
    description:
      "Ein quelloffener, selbst gehosteter Ort für die wichtigen Unterlagen deiner Familie. Per E-Mail oder Upload hinein, Harbor liest und sortiert sie, auf Hardware, die dir gehört.",
    tagline: "Deine Daten. Deine Regeln. Dein Harbor.",
  },
};

export function rootMetadata(lang: Lang): Metadata {
  const d = DEFAULTS[lang];
  return {
    title: d.title,
    description: d.description,
    metadataBase: new URL("https://openharbor.app"),
    openGraph: {
      title: "Harbor",
      description: d.tagline,
      url: lang === "de" ? "https://openharbor.app/de" : "https://openharbor.app",
      siteName: "Harbor",
      locale: lang === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    // The shared card is drawn wide (opengraph-image.tsx), so ask X and the like to show it wide.
    twitter: { card: "summary_large_image" },
  };
}

const SKIP: Record<Lang, string> = { en: "Skip to content", de: "Zum Inhalt springen" };

export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={fontVariables}>
      <body>
        {/*
          Motion serialises its initial variant as inline styles, so every element that builds in
          arrives as opacity:0 in the HTML and is revealed by JavaScript. With scripting off that
          is a blank hero above a blank page. This puts them all back.
        */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          {SKIP[lang]}
        </a>
        {children}
      </body>
    </html>
  );
}
