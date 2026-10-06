import { HARBOR_COST_NOTE, HARBOR_FAQ, HARBOR_TEN_YEARS, HERO_LEAD } from "./shared";
import type { Comparison } from "./types";

/*
 * Harbor vs Everplans. English only and written for a US household, like the Trustworthy page:
 * Everplans is a US service (New York law, billed in dollars, iOS app on the US App Store).
 *
 * The argument here is ownership more than access. Everplans says its administrators "can never
 * see" what you store, so this page does not claim otherwise; what it has instead is a company
 * that has changed hands twice — National Guardian Life in January 2021, Precoa in October 2024 —
 * and a privacy policy, last updated in May 2022, that says an acquirer takes your records with
 * it. Every quotation below was checked against the live page on `checked`.
 */
const PRIVACY = "https://www.everplans.com/privacy-policy";
const TERMS = "https://www.everplans.com/terms-of-service";

export const everplans: Comparison = {
  slug: "everplans",
  name: "Everplans",
  checked: "2026-10-06",
  meta: {
    title: "A self-hosted Everplans alternative · Harbor vs Everplans",
    description:
      "Everplans keeps your family’s records on its servers and has changed owners twice since 2021. Harbor is a free, open-source vault that keeps them on a machine in your home. How the two compare.",
  },
  hero: {
    title: "A self-hosted Everplans alternative",
    lead: HERO_LEAD,
  },
  rows: [
    { q: "Price", harbor: "Free", them: "$99.99 a year" },
    { q: "How your records are hosted", harbor: "On your server, under your control", them: "On Everplans’ servers" },
    { q: "Who owns the service", harbor: "You run it", them: "Precoa, since 2024" },
    { q: "Legal requests for your records", harbor: "Handled by you", them: "Handled by Everplans" },
    { q: "How much you can store", harbor: "Unlimited", them: "3 items free, unlimited on Premium" },
    { q: "Backups", harbor: "Nightly, to a provider you choose", them: "Manual download only" },
    { q: "Two-step sign-in", harbor: "Required, with an authenticator app", them: "Optional, code sent to your phone" },
    { q: "On your phone", harbor: "Web app on any phone", them: "iPhone app; no Android" },
    { q: "Source code", harbor: "Open (AGPL-3.0)", them: "Closed" },
    { q: "Setup", harbor: "Your own Linux machine", them: "Sign up in a browser" },
  ],
  differentiators: {
    title: "Why self-hosting matters",
    points: [
      {
        title: "Stay in control",
        body: "Your records live on a machine you own, not on a company’s servers. You decide who can open them, where they are backed up and what leaves your house. No company holds them, hands them over or changes the rules.",
        quote: {
          text: "We may also share your Personal Information solely to the extent required by law to comply with a subpoena or analogous legal process or governmental request; while this may include certain of your Secure Information…",
          source: "Everplans privacy policy",
          href: PRIVACY,
        },
      },
      {
        title: "Protect from corporate churn",
        body: "Everplans has changed owners twice: a life insurer bought it in 2021, and Precoa, an end-of-life planning company that works with funeral homes, in 2024. Its privacy policy says the buyer takes your records with it. Harbor is open source: the copy you run keeps working whatever happens to any company, including the people who make Harbor.",
        quote: {
          text: "The Acquirer will possess your Basic Information and any other Personal Information you do not delete from the Services (which may include part or all of your Secure Information)…",
          source: "Everplans privacy policy",
          href: PRIVACY,
        },
      },
      {
        title: "Pay once, not every year",
        body: "Everplans Premium is $99.99 a year, and the free plan holds three items. Ten years of Premium costs about $1,000. Harbor is free: buy a small computer once, or use one you already have, and pay a few dollars a year for electricity.",
        figures: [{ label: "Everplans Premium", value: "$1,000", amount: 1000 }, HARBOR_TEN_YEARS],
        note: `Ten-year estimate with subscription prices held constant: Premium is $99.99 a year. ${HARBOR_COST_NOTE}`,
      },
    ],
  },
  fair: {
    title: "Use Everplans if",
    lead: "Harbor is software you run, and that is not for every household.",
    points: [
      "You don’t want to set anything up yourself",
      "You’re comfortable with changing corporate governance",
      "You don’t mind paying a subscription",
      "You’re comfortable with a third party holding your records",
    ],
  },
  faq: [
    {
      q: "Can I move my documents from Everplans to Harbor?",
      a: "Yes. On your Everplans dashboard, choose Preview/Download, then Download PDF. You get a ZIP file with your Everplan as a PDF and your uploaded documents in folders. Upload that file to Harbor, which reads and files each document again. Deputies and after-death settings do not carry over.",
    },
    ...HARBOR_FAQ,
  ],
  sources: [
    { label: "pricing", href: "https://www.everplans.com/pricing" },
    { label: "security", href: "https://www.everplans.com/security" },
    { label: "privacy policy", href: PRIVACY },
    { label: "terms", href: TERMS },
    { label: "about", href: "https://www.everplans.com/about" },
    { label: "mobile app", href: "https://help.everplans.com/hc/en-us/articles/5435435185172-Who-can-use-the-Everplans-mobile-app" },
    { label: "download", href: "https://help.everplans.com/hc/en-us/articles/215665638-How-do-I-print-or-download-my-Everplan" },
    { label: "NGL acquisition", href: "https://www.everplans.com/blog/national-guardian-life-insurance-company-ngl-acquires-everplans" },
    { label: "Precoa acquisition", href: "https://www.everplans.com/blog/everplans-has-a-new-home" },
  ],
};
