/*
 * The /compare hub: Harbor beside every alternative at once, and a way into each versus page.
 *
 * Every cell restates something a versus page already says and sources, so the hub carries no
 * claim of its own; where a page says it at length, the cell says it in a few words. The columns
 * follow `COMPARISONS` order, by slug, so a new versus page needs a column here too.
 */
export const HUB = {
  checked: "2026-10-06",
  meta: {
    title: "Family document vaults compared · Harbor vs Trustworthy, Everplans, Quicken LifeHub and Paperless-ngx",
    description:
      "How Harbor compares with Trustworthy, Everplans, Quicken LifeHub and Paperless-ngx on who holds your records, what they cost, backups, sign-in and what happens if the company is sold.",
  },
  hero: {
    title: "How Harbor compares",
    lead: "Harbor is built from the ground up for today’s family. It’s free and open source, and it holds its own against the best commercial vaults.",
  },
  /** The other products, in table order, by their versus page's slug. */
  columns: ["trustworthy", "everplans", "quicken-lifehub", "paperless-ngx"],
  rows: [
    { q: "Price", harbor: "Free", them: ["$0 to $480 a year", "$99.99 a year", "$1.99 to $3.99 a month", "Free"] },
    { q: "Where your records live", harbor: "Your own hardware", them: ["Trustworthy’s servers", "Everplans’ servers", "Amazon’s cloud, run by Quicken", "Your own hardware"] },
    { q: "Built for", harbor: "Household records", them: ["Household records", "Life and estate planning", "Household records", "General documents"] },
    { q: "Legal requests handled by", harbor: "You", them: ["Trustworthy", "Everplans", "Quicken", "You"] },
    { q: "If the company is sold", harbor: "Not applicable", them: ["Can pass to the buyer", "Can pass to the buyer", "Can pass to the buyer", "Not applicable"] },
    { q: "Storage", harbor: "Unlimited", them: ["2 GB to unlimited, by plan", "3 items free, then unlimited", "30 GB", "Unlimited"] },
    { q: "Backups", harbor: "Nightly, tested monthly", them: ["Manual export", "Manual download", "Manual download, every 30 days", "An export command you schedule"] },
    { q: "Two-step sign-in", harbor: "Required", them: ["Required", "Optional", "Only when something looks unusual", "Optional"] },
    { q: "On your phone", harbor: "Web app built for phones", them: ["iOS and Android apps", "iPhone app", "iOS and Android apps", "Community apps"] },
    { q: "Source code", harbor: "Open (AGPL-3.0)", them: ["Closed", "Closed", "Closed", "Open (GPL-3.0)"] },
    { q: "Setup", harbor: "Your own Linux machine", them: ["Sign up in a browser", "Sign up in a browser", "Sign up in a browser", "Your own server"] },
  ],
  /** One line per versus page, in the cards that link to them. */
  summaries: {
    trustworthy: "A hosted family vault with AI filing. Who holds your records, and ten years of cost.",
    everplans: "A planning vault that has changed owners twice since 2021.",
    "quicken-lifehub": "A low-cost add-on under Quicken’s company-wide privacy policy.",
    "paperless-ngx": "The open-source document manager, against a household data manager.",
  } as Record<string, string>,
};
