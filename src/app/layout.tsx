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
  title: "Harbor: everything that matters, safely together",
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
 */
const themeScript = `(function(){try{var c=localStorage.getItem("harbor-theme");var d=c==="dark"||(c!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light";}catch(e){}})();`;

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
      </body>
    </html>
  );
}
