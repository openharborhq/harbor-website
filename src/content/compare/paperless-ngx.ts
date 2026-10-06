import { HARBOR_FAQ } from "./shared";
import type { Comparison } from "./types";

/*
 * Harbor vs Paperless-ngx. Both are free, open source and self-hosted, so ownership and cost do
 * not separate them and this page has neither a "why self-hosting matters" argument nor a cost
 * chart. Its argument is "a household vault, not an archive": what Harbor builds in for a family
 * (people and property, to-dos, encryption, tested backups) that Paperless-ngx leaves to you.
 *
 * Paperless-ngx is the more mature product with the larger feature set — AI chat and similarity
 * search, 100+ OCR languages, workflows, per-document permissions, a large community — and the
 * page says so, in the table and in its own section. Its claims are taken from the Paperless-ngx
 * documentation and changelog in its repository, at v3.3.0, on `checked`.
 */
const REPO = "https://github.com/paperless-ngx/paperless-ngx";
const DOCS = `${REPO}/blob/dev/docs`;

export const paperlessNgx: Comparison = {
  slug: "paperless-ngx",
  name: "Paperless-ngx",
  checked: "2026-10-06",
  meta: {
    title: "A Paperless-ngx alternative for families · Harbor vs Paperless-ngx",
    description:
      "Paperless-ngx is a superb self-hosted document manager. Harbor is a household data manager: it files your family’s records by person, property and purpose, turns deadlines into to-dos, and encrypts and tests its backups. How the two compare.",
  },
  hero: {
    title: "A Paperless-ngx alternative for families",
    lead: "Paperless-ngx manages documents. Harbor manages a household: who each record belongs to, what it’s for and what’s due.",
  },
  rows: [
    { q: "Price", harbor: "Free, open source (AGPL-3.0)", them: "Free, open source (GPL-3.0)" },
    { q: "Built for", harbor: "Managing a household’s records", them: "Managing documents" },
    { q: "Categories out of the box", harbor: "Household ones: identity, home, cars, insurance, taxes, estate…", them: "You define your own" },
    { q: "Inbox", harbor: "Proposes where each document goes and who it’s for", them: "An inbox tag you create; filed by matching rules" },
    { q: "Filing by person and property", harbor: "Built in", them: "Set up yourself with custom fields" },
    { q: "Deadlines", harbor: "Become a to-do list", them: "Scheduled workflows you set up" },
    { q: "Encryption at rest", harbor: "Every file encrypted", them: "Files stored plain on disk" },
    { q: "Two-step sign-in", harbor: "Required for everyone", them: "Optional, per user" },
    { q: "Backups", harbor: "Nightly, encrypted, offsite", them: "An export command you schedule" },
    { q: "Restore testing", harbor: "Automatic, every month", them: "Not built in" },
    { q: "OCR languages", harbor: "English and German", them: "More than 100" },
    { q: "AI", harbor: "Suggestions, from any model or none", them: "Suggestions, chat and similarity search" },
    { q: "Users and permissions", harbor: "Invited members, full access", them: "Users, groups, per-document permissions" },
    { q: "On your phone", harbor: "Official web app, built for phones", them: "Community apps, none official" },
  ],
  differentiators: {
    title: "Why a household vault",
    points: [
      {
        title: "A household data manager, not a document manager",
        body: "Harbor comes ready for a family’s records, with twelve household categories, from Identity and Real Estate to Insurance, Taxes and Legal & Estate. Its Inbox does the filing: each document arrives with a suggested category, the family member or property it belongs to, and any due dates as to-dos. You accept with one click. Paperless-ngx starts empty and lets you build your own system.",
        checklist: {
          caption: "Built into every Harbor vault",
          items: [
            "Twelve household categories, ready on day one",
            "Every record filed by type and by the person or property it’s about",
            "An Inbox that proposes the filing; you accept in one click",
            "Leaflets and newsletters held back, not filed",
          ],
        },
      },
      {
        title: "Safe by default",
        body: "Harbor encrypts every file, requires two-step sign-in for everyone and has no default passwords, and its installer offers an encrypted disk and a private network. Paperless-ngx leaves those choices to you: two-step sign-in is optional per user, and since it removed its own encryption, documents are plain files, easy to reach and protected only by how you set up the disk.",
        quote: {
          text: "Paperless stores your documents plain on disk.",
          source: "Paperless-ngx documentation",
          href: `${DOCS}/index.md`,
        },
      },
      {
        title: "Backups that prove themselves",
        body: "A family’s only copy of a will needs a backup that works. Harbor backs up every night and checks once a month that a backup can be read back. Paperless-ngx gives you an export command: scheduling it, moving it offsite and testing it are up to you.",
        checklist: {
          caption: "Harbor’s backups, out of the box",
          items: [
            "Every night, encrypted before it leaves the machine",
            "To a second disk, an SFTP server or Backblaze B2",
            "A monthly restore test that decrypts real documents",
            "Upgrades refuse to run until a backup succeeds",
          ],
        },
      },
    ],
  },
  fair: {
    title: "Use Paperless-ngx if",
    lead: "Paperless-ngx is excellent software with a large community behind it.",
    points: [
      "You want a general document manager",
      "You scan in languages other than English and German",
      "You want to create custom document workflows",
      "You’re comfortable setting up security and backups yourself",
      "You’re familiar with nginx and running a web server",
      "You prefer a more technical interface",
      "You’re comfortable using third-party mobile apps",
    ],
  },
  faq: [
    {
      q: "Can I move my documents from Paperless-ngx to Harbor?",
      a: "Yes. Run the Paperless-ngx document exporter with its zip option to get your original files in one archive, then upload that file to Harbor, which reads and files each document again. Tags, correspondents and custom fields do not carry over.",
    },
    ...HARBOR_FAQ,
  ],
  sources: [
    { label: "repository", href: REPO },
    { label: "overview", href: `${DOCS}/index.md` },
    { label: "usage", href: `${DOCS}/usage.md` },
    { label: "AI features", href: `${DOCS}/advanced_usage.md` },
    { label: "exporter", href: `${DOCS}/administration.md` },
    { label: "changelog", href: `${DOCS}/changelog.md` },
  ],
};
