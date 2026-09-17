import type { FeatureGroup } from "@/components/features/FeatureSection";

/*
 * The six feature groups, and the one copy of them.
 *
 * They used to live inside `app/features/page.tsx`. When the v2 page arrived and wanted the same
 * six groups under a different layout, the choice was to copy 280 lines of prose into a second
 * file or to move them here; a second copy is a second thing to edit and the one that gets
 * forgotten. The layout belongs to each page, the words belong to both.
 */

export const GROUPS: FeatureGroup[] = [
  {
    id: "capture",
    number: "01",
    label: "CAPTURE",
    title: "File upload and email monitoring",
    lead: "Connect the mailbox it already comes to, or drop a decade of scans in at once. Either way it lands read.",
    items: [
      {
        icon: (
          <>
            <path d="M2.5 5.5h17v11h-17z" strokeLinejoin="round" />
            <path d="M2.5 5.5L11 12l8.5-6.5" strokeLinejoin="round" />
          </>
        ),
        title: "Connect your Gmail",
        copy: "Point Harbor at a label or the whole mailbox. It takes the bills, the policies and the school letters, and leaves the rest alone.",
      },
      {
        icon: (
          <>
            <path d="M3 4.5h16v13h-16z" strokeLinejoin="round" />
            <path d="M7 9.5h8M7 13h5" strokeLinecap="round" />
          </>
        ),
        title: "One address for the household",
        copy: "Forward anything to your vault’s own address. It is waiting, already read and filed, when you get home.",
      },
      {
        icon: <path d="M11 15.5V3.5M6.5 8L11 3.5 15.5 8M3.5 13.5v4a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4" strokeLinecap="round" strokeLinejoin="round" />,
        title: "Upload anything",
        copy: "Harbor reads every common file format, converts what it takes in to PDF, and analyses it for what comes next.",
      },
      {
        icon: (
          <>
            <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
            <path d="M6.8 12h6M6.8 15h4" strokeLinecap="round" />
          </>
        ),
        title: "OCR text recognition",
        copy: "Crooked phone shots and forty-page contracts alike are read by the OCR, so every word on every page can be found later.",
      },
    ],
  },
  {
    id: "analyze",
    number: "02",
    label: "ANALYZE",
    title: "File analysis and summarization",
    lead: "Every document is summarized, tagged from its own words, and attached to the person or the thing it belongs to. You confirm with one click.",
    items: [
      {
        icon: (
          <>
            <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
            <path d="M6.8 12.5h8M6.8 15.5h5" strokeLinecap="round" />
          </>
        ),
        title: "Plain-English summaries",
        copy: "A few lines under every document saying what it is, what it covers, what it costs and when it renews.",
      },
      {
        icon: (
          <>
            <path d="M3.5 10.6V4.5a1 1 0 0 1 1-1h6.1a1 1 0 0 1 .71.3l7.2 7.2a1 1 0 0 1 0 1.41l-6.1 6.1a1 1 0 0 1-1.41 0l-7.2-7.2a1 1 0 0 1-.3-.71z" strokeLinejoin="round" />
            <circle cx="7.4" cy="7.4" r="1.5" />
          </>
        ),
        title: "Tags from the document itself",
        copy: "The insurer, the address, the policy number, the year, tax-deductible. A filter finds what a folder never could.",
      },
      {
        icon: <path d="M3.5 6.5h6v6h-6z M12.5 6.5h6v6h-6z M3.5 15.5h6v3h-6z M12.5 15.5h6v3h-6z" strokeLinejoin="round" />,
        title: "Categories you decide",
        copy: "Start with Identity, Real Estate, Money, Taxes and Health. Rename them, nest them, add the ones your household actually uses.",
      },
      {
        icon: (
          <>
            <circle cx="8.4" cy="7.6" r="3.1" />
            <path d="M3.2 18.5c0-2.9 2.33-5.2 5.2-5.2s5.2 2.3 5.2 5.2" strokeLinecap="round" />
            <path d="M14.5 6.5h4.3v4.3h-4.3z M14.5 13.9h4.3v4.3h-4.3z" strokeLinejoin="round" />
          </>
        ),
        title: "People and things",
        copy: "Papers belong to people, and to things. The house, the car, the joint account, the dog. Open any of them and the whole file is there.",
      },
    ],
  },
  {
    id: "find",
    number: "03",
    label: "FIND",
    title: "Plain text search you wish you had IRL",
    lead: "Not the filename. The insurer, the year, the half sentence you remember from the middle of page three.",
    items: [
      {
        icon: (
          <>
            <circle cx="10" cy="10" r="6.5" />
            <path d="M14.8 14.8L19 19" strokeLinecap="round" />
          </>
        ),
        title: "Full text search",
        copy: "Every word of every page, scans included. The matching line shows in the result, before you open anything.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M3.5 11h15M11 3.5c2 2.2 3 4.8 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.8-3-7.5s1-5.3 3-7.5z" strokeLinejoin="round" />
          </>
        ),
        title: "Works in your languages",
        copy: "A German lease and a Spanish invoice are indexed in their own language, and the summary comes back in yours.",
      },
      {
        icon: <path d="M3.5 5h15l-5.8 6.6v5.2l-3.4 2v-7.2z" strokeLinejoin="round" />,
        title: "Narrow it to one person or one thing",
        copy: "Filter by person, property, category, tag or date. Open the car and every paper the car has ever had is there.",
      },
      {
        icon: (
          <>
            <path d="M4.5 3.5h8l5 5v10h-13z" strokeLinejoin="round" />
            <path d="M12.5 3.5v5h5" strokeLinejoin="round" />
            <path d="M7.4 12.2l1.5 1.5 3.2-3.3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ),
        title: "The original, plus what it means",
        copy: "Every page kept exactly as it arrived, beside its summary, tags, notes, earlier versions and a record of who changed what.",
      },
    ],
  },
  {
    id: "get-notified",
    number: "04",
    label: "GET NOTIFIED",
    title: "Get notifications when it matters",
    lead: "A date inside a document is a date Harbor keeps. The bill, the renewal, the passport that runs out the week before the holiday.",
    items: [
      {
        icon: (
          <>
            <path d="M5 3.5h12v15l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6-2.4-1.6z" strokeLinejoin="round" />
            <path d="M8.4 8h5.2M8.4 11.4h3.4" strokeLinecap="round" />
          </>
        ),
        title: "Invoices and bills that are due",
        copy: "A due date and an amount in a document become a to-do with both attached, linked back to the page they came from.",
      },
      {
        icon: (
          <>
            <path d="M3.5 5.5h15v13h-15z M3.5 9.5h15M7.5 3v4M14.5 3v4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.6 13.6l1.6 1.6 3.4-3.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ),
        title: "Passports, licences and ID cards",
        copy: "Expiry dates are read off the document itself. Everyone in the household shows their next date on the home page.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M13.4 8.2c-.6-.7-1.5-1.1-2.4-1.1-1.7 0-3.1 1.3-3.1 2.9s1.4 2.9 3.1 2.9 3.1 1.3 3.1 2.9M11 5.6v10.8" strokeLinecap="round" />
          </>
        ),
        title: "Amounts in any currency",
        copy: "A bill in euros stays in euros. Each to-do keeps the currency it was written in, and the totals add up per currency.",
      },
      {
        icon: (
          <>
            <circle cx="5.6" cy="6.6" r="2.1" />
            <circle cx="5.6" cy="14.8" r="2.1" />
            <path d="M10.2 6.6h8.3M10.2 14.8h8.3" strokeLinecap="round" />
          </>
        ),
        title: "One list, in the order it is due",
        copy: "Today, this week, later. Tick it off and it stays on the record, because someone will ask when it was paid.",
      },
    ],
  },
  {
    id: "share",
    number: "05",
    label: "SHARE",
    title: "Secure sharing on your terms",
    lead: "A vault only one person can open is a single point of failure. Harbor is built for a household, and for the adviser who needs fourteen documents in March.",
    items: [
      {
        icon: (
          <>
            <circle cx="7.8" cy="8" r="2.6" />
            <circle cx="15" cy="8.6" r="2.1" />
            <path d="M3.2 17.6c0-2.5 2.06-4.6 4.6-4.6s4.6 2.1 4.6 4.6M14.4 13.2c2.2.2 3.9 2 3.9 4.4" strokeLinecap="round" />
          </>
        ),
        title: "The whole household",
        copy: "Everyone who should be able to find the policy has their own way in, from their own phone, without asking you for it.",
      },
      {
        icon: (
          <>
            <path d="M9.2 12.8a3.4 3.4 0 0 0 5.1.37l2.4-2.4a3.4 3.4 0 0 0-4.8-4.8l-1.37 1.36" strokeLinecap="round" />
            <path d="M12.8 9.2a3.4 3.4 0 0 0-5.1-.37l-2.4 2.4a3.4 3.4 0 0 0 4.8 4.8l1.36-1.36" strokeLinecap="round" />
          </>
        ),
        title: "Links that expire on their own",
        copy: "Send the tax adviser exactly the documents they need. You set whether they can download, and when the link dies.",
      },
      {
        icon: (
          <>
            <path d="M3.5 6h15v11h-15z" strokeLinejoin="round" />
            <path d="M3.5 6l7.5 5.6L18.5 6" strokeLinejoin="round" />
            <circle cx="16.6" cy="15.4" r="3.1" fill="var(--color-ground)" />
          </>
        ),
        title: "Break-glass access",
        copy: "A sealed envelope for the person who will need all of it if you cannot be asked. Printed once, opened once, and you are told when it is.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M11 6.4V11l3.2 2.2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ),
        title: "A record of who did what",
        copy: "Every upload, edit, share and opened link is written down, so the question of who changed the policy has an answer.",
      },
    ],
  },
  {
    id: "open-source",
    number: "06",
    label: "OPEN SOURCE",
    title: "Your data. Your Harbor. Self-hosted all the way.",
    lead: "No account on anyone else’s server, no tier to upgrade, and no way for us to read a single page of it. If you stop using Harbor tomorrow, the files are still plain files on your disk.",
    items: [
      {
        icon: <path d="M8 14.5L4.5 11 8 7.5M14 7.5L17.5 11 14 14.5M12.4 5.4l-2.8 11.2" strokeLinecap="round" strokeLinejoin="round" />,
        title: "Open source, AGPL-3.0",
        copy: "Every line of code, every issue and the roadmap are public. Read it before you trust it, fork it if we disappear.",
      },
      {
        icon: (
          <>
            <path d="M3.5 4.5h15v5h-15z M3.5 12.5h15v5h-15z" strokeLinejoin="round" />
            <path d="M6.6 7h.01M6.6 15h.01" strokeWidth="2" strokeLinecap="round" />
          </>
        ),
        title: "Fully self-hostable",
        copy: "One compose file and five containers on a mini-PC, a NAS, an old laptop or a small VPS with your name on the invoice.",
      },
      {
        icon: (
          <>
            <ellipse cx="11" cy="5.5" rx="7.5" ry="2.8" />
            <path d="M3.5 5.5v11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-11M3.5 11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
          </>
        ),
        title: "Backups you have actually restored",
        copy: "Encrypted snapshots on a schedule to a second disk or a bucket you own, plus a restore drill Harbor reminds you to run.",
      },
      {
        icon: (
          <>
            <path d="M6.5 9.5V7a4.5 4.5 0 0 1 9 0v2.5" strokeLinecap="round" />
            <path d="M4.5 9.5h13v9h-13z" strokeLinejoin="round" />
          </>
        ),
        title: "Nothing phones home",
        copy: "No telemetry, no vendor account. The language model that writes the summaries is your choice: one on your own box, or a hosted API only if you switch it on.",
      },
    ],
  },
];
