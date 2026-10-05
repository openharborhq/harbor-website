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
    lead: "Connect a mailbox, forward email, or upload files. Harbor extracts readable text and brings new documents into your Inbox.",
    items: [
      {
        icon: (
          <>
            <path d="M2.5 5.5h17v11h-17z" strokeLinejoin="round" />
            <path d="M2.5 5.5L11 12l8.5-6.5" strokeLinejoin="round" />
          </>
        ),
        title: "Connect your inbox",
        copy: "Connect a supported mailbox over IMAP. Approve senders for automatic filing and review mail from other senders.",
      },
      {
        icon: (
          <>
            <path d="M3 4.5h16v13h-16z" strokeLinejoin="round" />
            <path d="M7 9.5h8M7 13h5" strokeLinecap="round" />
          </>
        ),
        title: "One address for the household",
        copy: "Set up a dedicated mailbox for forwarded documents. Harbor collects them so you can review and file them in one place.",
      },
      {
        icon: <path d="M11 15.5V3.5M6.5 8L11 3.5 15.5 8M3.5 13.5v4a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4" strokeLinecap="round" strokeLinejoin="round" />,
        title: "Upload files and scans",
        copy: "Extract text from PDFs, scans, and photos, or upload a ZIP of documents. Word and Excel files can be stored, but their contents are not searchable.",
      },
      {
        icon: (
          <>
            <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
            <path d="M6.8 12h6M6.8 15h4" strokeLinecap="round" />
          </>
        ),
        title: "OCR text recognition",
        copy: "Harbor extracts text from scans and photos using optical character recognition. Search the extracted text without opening each file.",
      },
    ],
  },
  {
    id: "analyze",
    number: "02",
    label: "ANALYZE",
    title: "File analysis and summarization",
    lead: "Connect a language model to get summaries and suggested categories, tags, people, and dates. Review the suggestions and correct them before accepting.",
    items: [
      {
        icon: (
          <>
            <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" strokeLinejoin="round" />
            <path d="M6.8 12.5h8M6.8 15.5h5" strokeLinecap="round" />
          </>
        ),
        title: "Document summaries",
        copy: "See a short summary of a document and its key details. Check amounts and dates against the original before acting on them.",
      },
      {
        icon: (
          <>
            <path d="M3.5 10.6V4.5a1 1 0 0 1 1-1h6.1a1 1 0 0 1 .71.3l7.2 7.2a1 1 0 0 1 0 1.41l-6.1 6.1a1 1 0 0 1-1.41 0l-7.2-7.2a1 1 0 0 1-.3-.71z" strokeLinejoin="round" />
            <circle cx="7.4" cy="7.4" r="1.5" />
          </>
        ),
        title: "Tags from the document itself",
        copy: "Use tags for details such as the insurer, year, or address. Harbor suggests existing tags; you can add or change them.",
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
        copy: "Link records to household members, properties, vehicles, and accounts. Open an item to see the documents associated with it.",
      },
    ],
  },
  {
    id: "find",
    number: "03",
    label: "FIND",
    title: "Search inside your documents",
    lead: "Find a document by its title, tags, notes, or extracted text—even when you cannot remember the filename.",
    items: [
      {
        icon: (
          <>
            <circle cx="10" cy="10" r="6.5" />
            <path d="M14.8 14.8L19 19" strokeLinecap="round" />
          </>
        ),
        title: "Full-text search",
        copy: "Search text extracted from documents, including scans. Results show the matching text to help you find the right record.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M3.5 11h15M11 3.5c2 2.2 3 4.8 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.8-3-7.5s1-5.3 3-7.5z" strokeLinejoin="round" />
          </>
        ),
        title: "Language-aware search",
        copy: "Configure OCR for the languages in your documents. Search supports English and German word forms, and a connected model can provide translated summaries.",
      },
      {
        icon: <path d="M3.5 5h15l-5.8 6.6v5.2l-3.4 2v-7.2z" strokeLinejoin="round" />,
        title: "Narrow it to one person or one thing",
        copy: "Filter by person, property, category, tag, or date. Open a vehicle to see its linked receipts, policies, and other records.",
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
        copy: "View the original document alongside its summary, tags, notes, versions, and change history.",
      },
    ],
  },
  {
    id: "get-notified",
    number: "04",
    label: "TRACK DEADLINES",
    title: "Keep track of important dates",
    lead: "Review upcoming expirations and tasks in Harbor. Reminders stay in the app; there is no email digest or calendar feed.",
    items: [
      {
        icon: (
          <>
            <path d="M5 3.5h12v15l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6-2.4-1.6z" strokeLinejoin="round" />
            <path d="M8.4 8h5.2M8.4 11.4h3.4" strokeLinecap="round" />
          </>
        ),
        title: "Invoices and bills that are due",
        copy: "Accept a suggested payment task with its due date and amount, or add one yourself. Each linked task leads back to its document.",
      },
      {
        icon: (
          <>
            <path d="M3.5 5.5h15v13h-15z M3.5 9.5h15M7.5 3v4M14.5 3v4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.6 13.6l1.6 1.6 3.4-3.4" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ),
        title: "Passports, licences and ID cards",
        copy: "Review expiration dates suggested from your documents. Home shows upcoming expirations for the people and things in your vault.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M13.4 8.2c-.6-.7-1.5-1.1-2.4-1.1-1.7 0-3.1 1.3-3.1 2.9s1.4 2.9 3.1 2.9 3.1 1.3 3.1 2.9M11 5.6v10.8" strokeLinecap="round" />
          </>
        ),
        title: "Keep payment details together",
        copy: "Keep a payment amount and its currency with the task, so the details stay alongside the deadline.",
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
        copy: "See overdue tasks, what is due today, and what comes next. Completed tasks remain in the record so you can check them later.",
      },
    ],
  },
  {
    id: "share",
    number: "05",
    label: "SHARE",
    title: "Secure sharing on your terms",
    lead: "Invite household members to your vault or share selected documents with someone outside it, such as your accountant.",
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
        copy: "Give household members their own sign-in. Everyone you invite can see every filed document; use a shared link to send only selected records.",
      },
      {
        icon: (
          <>
            <path d="M9.2 12.8a3.4 3.4 0 0 0 5.1.37l2.4-2.4a3.4 3.4 0 0 0-4.8-4.8l-1.37 1.36" strokeLinecap="round" />
            <path d="M12.8 9.2a3.4 3.4 0 0 0-5.1-.37l-2.4 2.4a3.4 3.4 0 0 0 4.8 4.8l1.36-1.36" strokeLinecap="round" />
          </>
        ),
        title: "Links that expire on their own",
        copy: "Send selected documents through a shared link. Set an expiration date and download limit, or revoke access early.",
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
        copy: "Keep a printed recovery sheet somewhere safe, separate from the server. It holds the keys and backup details needed to recover the vault.",
      },
      {
        icon: (
          <>
            <circle cx="11" cy="11" r="7.5" />
            <path d="M11 6.4V11l3.2 2.2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ),
        title: "A record of who did what",
        copy: "Review document changes and sharing activity to see how records have been updated and accessed.",
      },
    ],
  },
  {
    id: "open-source",
    number: "06",
    label: "OPEN SOURCE",
    title: "An open-source vault you control",
    lead: "Run Harbor on hardware or hosting you control. Choose your backup destination and AI provider, and keep the recovery keys for your encrypted records.",
    items: [
      {
        icon: <path d="M8 14.5L4.5 11 8 7.5M14 7.5L17.5 11 14 14.5M12.4 5.4l-2.8 11.2" strokeLinecap="round" strokeLinejoin="round" />,
        title: "Open source, AGPL-3.0",
        copy: "Read the source, follow development, and contribute changes. Harbor is available under the AGPL-3.0 license.",
      },
      {
        icon: (
          <>
            <path d="M3.5 4.5h15v5h-15z M3.5 12.5h15v5h-15z" strokeLinejoin="round" />
            <path d="M6.6 7h.01M6.6 15h.01" strokeWidth="2" strokeLinecap="round" />
          </>
        ),
        title: "Fully self-hostable",
        copy: "Run Harbor on a Linux machine with Docker and an encrypted data volume. The setup guide explains the hardware and storage requirements.",
      },
      {
        icon: (
          <>
            <ellipse cx="11" cy="5.5" rx="7.5" ry="2.8" />
            <path d="M3.5 5.5v11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-11M3.5 11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
          </>
        ),
        title: "Backups you have actually restored",
        copy: "Configure encrypted nightly backups to Backblaze B2, an SFTP server, or a second disk. Harbor runs a monthly restore test and shows the result in Settings.",
      },
      {
        icon: (
          <>
            <path d="M6.5 9.5V7a4.5 4.5 0 0 1 9 0v2.5" strokeLinecap="round" />
            <path d="M4.5 9.5h13v9h-13z" strokeLinejoin="round" />
          </>
        ),
        title: "Choose your AI provider",
        copy: "Use a local model or connect a hosted provider, which receives document text for suggestions. Harbor also works without AI summaries.",
      },
    ],
  },
];
