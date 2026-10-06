import { HARBOR_COST_NOTE, HARBOR_FAQ, HARBOR_TEN_YEARS, HERO_LEAD } from "./shared";
import type { Comparison } from "./types";

/*
 * Harbor vs Trustworthy. English only and written for a US household: Trustworthy is a US service
 * (English interface, US forms, billed in dollars, California law), so EU hosting and GDPR are not
 * arguments here — Trustworthy claims GDPR compliance anyway.
 *
 * The Harbor column assumes the vault runs on a machine the household owns, which is the case the
 * site is written for. Every quotation below was checked against the live page on `checked`.
 */
const PRIVACY = "https://www.trustworthy.com/privacy";
const SECURITY = "https://www.trustworthy.com/security";

export const trustworthy: Comparison = {
  slug: "trustworthy",
  name: "Trustworthy",
  checked: "2026-10-06",
  meta: {
    title: "A self-hosted Trustworthy alternative · Harbor vs Trustworthy",
    description:
      "Trustworthy keeps your family’s documents on its servers. Harbor is a free, open-source vault that keeps them on a machine in your home. How the two compare on ownership, access and cost.",
  },
  hero: {
    title: "A self-hosted Trustworthy alternative",
    lead: HERO_LEAD,
  },
  rows: [
    { q: "Price", harbor: "Free", them: "$0 to $480 a year" },
    { q: "How your records are hosted", harbor: "On your server, under your control", them: "On Trustworthy’s servers" },
    { q: "Legal requests for your records", harbor: "Handled by you", them: "Handled by Trustworthy" },
    { q: "Who has access", harbor: "Just you", them: "Trustworthy staff and you" },
    { q: "Who grants emergency access", harbor: "You, in advance", them: "Trustworthy’s team" },
    { q: "Storage", harbor: "Unlimited", them: "2 GB to unlimited, by plan" },
    { q: "Backups", harbor: "Nightly, to a provider you choose", them: "Manual export only" },
    { q: "AI model", harbor: "Your choice, including local", them: "No choice, and capped" },
    { q: "Source code", harbor: "Open (AGPL-3.0)", them: "Closed" },
    { q: "Email import", harbor: "Most mailboxes, over IMAP", them: "Gmail only, PDFs only" },
    { q: "Setup", harbor: "Your own Linux machine", them: "Sign up in a browser" },
  ],
  differentiators: {
    title: "Why self-hosting matters",
    points: [
      {
        title: "Stay in control",
        body: "Your records live on a machine you own, not on a company’s servers. You decide who can open them, where they are backed up and what leaves your house. No company holds them, hands them over or changes the rules.",
        quote: {
          text: "We may disclose personal information if we believe that disclosure is in accordance with, or required by, any applicable law or legal process…",
          source: "Trustworthy privacy policy",
          href: PRIVACY,
        },
      },
      {
        title: "Protect from corporate churn",
        body: "Companies get acquired, rewrite their terms and shut down. With a hosted service, any of those can force your family’s records to move on someone else’s schedule. Harbor is open source: the copy you run keeps working whatever happens to any company, including the people who make Harbor.",
        quote: {
          text: "We may share personal information in connection with … any merger, sale of company assets, … or acquisition of all or a portion of our business by another company (including in connection with any bankruptcy or similar proceedings).",
          source: "Trustworthy privacy policy",
          href: PRIVACY,
        },
      },
      {
        title: "Save thousands",
        body: "A subscription charges you every year. Ten years of Trustworthy Platinum, its only plan with unlimited storage, costs $4,800. Harbor is free: buy a small computer once, or use one you already have, and pay a few dollars a year for electricity.",
        figures: [
          { label: "Trustworthy Platinum", value: "$4,800", amount: 4800 },
          HARBOR_TEN_YEARS,
        ],
        note: `Ten-year estimate with subscription prices held constant: Platinum is $40 a month, billed annually. ${HARBOR_COST_NOTE}`,
      },
    ],
  },
  fair: {
    title: "Use Trustworthy if",
    lead: "Harbor is software you run, and that is not for every household.",
    points: [
      "You don’t want to set anything up yourself",
      "You want a native iOS or Android app",
      "You don’t mind paying a subscription",
      "You’re comfortable with a third party holding your records",
    ],
  },
  faq: [
    {
      q: "Can I move my documents from Trustworthy to Harbor?",
      a: "Yes. Export your files from Trustworthy’s web app under Settings → Export data, then upload the archive to Harbor, which reads and files each document again. Trustworthy’s reminders and notes do not carry over.",
    },
    ...HARBOR_FAQ,
  ],
  sources: [
    { label: "pricing", href: "https://www.trustworthy.com/pricing" },
    { label: "security", href: SECURITY },
    { label: "privacy policy", href: PRIVACY },
    { label: "terms", href: "https://www.trustworthy.com/terms" },
    { label: "emergency contacts", href: "https://trustworthy.com/emergency" },
    { label: "AI features", href: "https://www.trustworthy.com/blog/revolutionary-ai-features" },
    { label: "data export", href: "https://help.trustworthy.com/en/articles/11104001" },
    { label: "Gmail connector", href: "https://help.trustworthy.com/en/articles/11103553" },
  ],
};
