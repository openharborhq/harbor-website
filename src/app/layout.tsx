import type { Metadata } from "next";
import { Reveal } from "@/components/v2/Reveal";
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

/*
 * Resolves the theme before anything paints: the saved choice, or the device setting. The same
 * logic lives in ThemeToggle for changes made after load. The key is written out here rather than
 * imported: THEME_KEY lives in a "use client" module, and a server file that imports a plain value
 * from one gets a client reference, not the string. Keep it in step with THEME_KEY by hand.
 *
 * It also arms the build-on-entry effect, and does it here for two reasons: before paint, so
 * nothing is seen in its built state and then hidden; and from JavaScript, so that with scripting
 * off — or if this script throws — the attribute is absent, the CSS that hides sections never
 * matches, and the page renders whole. Reduced motion never arms it at all.
 */
const themeScript = `(function(){try{var c=localStorage.getItem("harbor-theme");var d=c==="dark"||(c!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light";if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.reveal="armed";}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the script above writes data-theme on <html> before React sees it.
    <html lang="en" className={`${inter.variable} ${geist.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
