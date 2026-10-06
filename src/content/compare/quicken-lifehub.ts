import { HARBOR_FAQ, HERO_LEAD } from "./shared";
import type { Comparison } from "./types";

/*
 * Harbor vs Quicken LifeHub. English only and written for a US household (California law,
 * billed in dollars).
 *
 * Price is not an argument here: LifeHub is $1.99 to $3.99 a month, or free with Simplifi, so
 * there is no cost chart. The argument is what the low price comes with. LifeHub sits under
 * Quicken's company-wide privacy policy, which lists wills, passports and deeds among what it
 * collects and allows personal information to be used to market Quicken's and its partners'
 * products; the company is private-equity owned and was reported in 2025 to be exploring a sale.
 * The page quotes the policy and leaves the conclusion to the reader: Quicken has not said it
 * mines LifeHub documents, and nothing here claims it does.
 *
 * Harbor's own claims are checked against its code: full-text search over every word plus
 * model-written aliases across English and German, not vector search.
 */
const PRIVACY = "https://www.quicken.com/privacy-us/us/";
const TERMS = "https://www.quicken.com/about-us/terms/simplifi-and-lifehub/";

export const quickenLifehub: Comparison = {
  slug: "quicken-lifehub",
  name: "Quicken LifeHub",
  checked: "2026-10-06",
  meta: {
    title: "A self-hosted Quicken LifeHub alternative · Harbor vs Quicken LifeHub",
    description:
      "Quicken LifeHub keeps your family’s documents under Quicken’s company-wide privacy policy. Harbor is a free, open-source vault that keeps them on a machine in your home and files them for you. How the two compare.",
  },
  hero: {
    title: "A self-hosted Quicken LifeHub alternative",
    lead: HERO_LEAD,
  },
  rows: [
    { q: "Price", harbor: "Free", them: "$1.99 to $3.99 a month" },
    { q: "How your records are hosted", harbor: "On your server, under your control", them: "On Amazon’s cloud, run by Quicken" },
    { q: "Marketing use of your information", harbor: "None. No company holds it", them: "Allowed by its privacy policy" },
    { q: "Legal requests for your records", harbor: "Handled by you", them: "Handled by Quicken" },
    { q: "If the company is sold", harbor: "Not applicable. It’s open source", them: "Your data goes to the new owner" },
    { q: "How much you can store", harbor: "Unlimited", them: "30 GB" },
    { q: "Backups", harbor: "Nightly, to a provider you choose", them: "Manual download, once every 30 days" },
    { q: "Two-step sign-in", harbor: "Required at every sign-in", them: "Only when something looks unusual" },
    { q: "AI model", harbor: "Your choice, including local", them: "An unnamed third-party model" },
    { q: "Source code", harbor: "Open (AGPL-3.0)", them: "Closed" },
    { q: "Setup", harbor: "Your own Linux machine", them: "Sign up in a browser" },
  ],
  differentiators: {
    title: "Why self-hosting matters",
    points: [
      {
        title: "Your records, not a marketing profile",
        body: "LifeHub sits under Quicken’s company-wide privacy policy. It lists wills, passports and deeds among the information Quicken collects, and lets Quicken use personal information to market its own products and its partners’. The policy doesn’t say who those partners are. With Harbor there is no company and no profile: your records stay on your machine.",
        quote: {
          text: "Specifically, we use personal information to: … Advertise, promote, or market our or our partners’ products and services…",
          source: "Quicken privacy statement",
          href: PRIVACY,
        },
      },
      {
        title: "Protect from corporate churn",
        body: "Quicken is owned by a private-equity firm that explored selling it in 2025. If it is sold, its privacy policy says your information goes to the new owner. Its terms can change without notice, and it can end your account for any reason. Harbor is open source: the copy you run keeps working whatever happens to any company, including the people who make Harbor.",
        quote: {
          text: "…we may immediately, in our sole discretion and without notice, terminate this Agreement or your use of the Products and Services… or for any other reason.",
          source: "Quicken LifeHub terms of use",
          href: TERMS,
        },
      },
      {
        title: "Paperwork that files itself",
        body: "Harbor reads every document the moment it arrives, from an upload, an email or a photo of a letter, and does the filing for you. You review what it suggests and accept it with one click.",
        checklist: {
          caption: "What Harbor does with a new document",
          items: [
            "Reads every page, and turns phone photos into clean scans",
            "Suggests a title, category, tags and the people or property it belongs to",
            "Finds due dates and expiry dates and turns them into to-dos",
            "Searches every word, and finds documents by what they are in English or German",
          ],
        },
      },
    ],
  },
  fair: {
    title: "Use Quicken LifeHub if",
    lead: "Harbor is software you run, and that is not for every household.",
    points: [
      "You don’t want to set anything up yourself",
      "You want a native iOS or Android app",
      "You already pay for Quicken Simplifi",
      "You’re comfortable with a third party holding your records",
    ],
  },
  faq: [
    {
      q: "Can I move my documents from Quicken LifeHub to Harbor?",
      a: "Yes. In LifeHub, open Settings, then Household Details, then Download your Household, and request a copy. Quicken emails you when the ZIP file is ready, with your documents in folders by category. Upload that file to Harbor, which reads and files each document again. LifeHub allows one download every 30 days, so check the file before you close your account.",
    },
    ...HARBOR_FAQ,
  ],
  sources: [
    { label: "product page", href: "https://www.quicken.com/products/lifehub/" },
    { label: "privacy statement", href: PRIVACY },
    { label: "terms of use", href: TERMS },
    { label: "security", href: "https://www.quicken.com/about-us/qlh-security/" },
    { label: "household download", href: "https://support.lifehub.quicken.com/en/articles/14712920-how-to-download-your-quicken-lifehub-household-data-for-safekeeping" },
    { label: "storage", href: "https://www.quicken.com/blog/best-document-and-life-event-records-management-apps-2026/" },
    { label: "reported sale (Bloomberg)", href: "https://news.bloomberglaw.com/crypto/quickens-owner-said-to-explore-selling-finance-software-pioneer" },
  ],
};
