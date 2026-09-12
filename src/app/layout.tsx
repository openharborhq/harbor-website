import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
