import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  // The default for any page that does not set its own — the 404 among them. It was the old home
  // page's headline, which outlived the page itself.
  title: "Harbor: a document vault for a household, on a machine you own",
  description:
    "An open-source, self-hosted home for your family's essential documents. Email it in, Harbor reads and files it, on hardware you own.",
  metadataBase: new URL("https://openharbor.app"),
  openGraph: {
    title: "Harbor",
    description: "Your data. Your rules. Your Harbor.",
    url: "https://openharbor.app",
    siteName: "Harbor",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable} ${plexMono.variable}`}>
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
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
