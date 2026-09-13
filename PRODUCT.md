# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** the head of a household who is looking for a way to manage the family's paperwork and does not like the commercially available solutions. Their recurring concerns are security, cost, and data ownership. They are fairly technical: comfortable running software, unbothered by open source, and likely already drawn to self-hosting and to local inference, even though Harbor does not require either. (Confirmed by the user, 2026-09-12.)

They arrive from search or from a link, comparing Harbor against hosted vaults such as Trustworthy, Everplans, or Prisidio, and against the binder or filing cabinet they use today.

**Secondary, inferred from the product:** the rest of the household, who are invited from Settings and use the vault day to day without having installed it. The site should not alienate them, but it is not written to win them.

## Product Purpose

Harbor is an open-source, self-hosted document vault for a household. Paperwork arrives by bulk upload or by email; Harbor OCRs it, makes every word searchable, suggests a title, category and dates, files it against the people and things it belongs to, surfaces the deadlines it contains, and keeps it encrypted at rest with nightly offsite backups and a tested restore path. It runs on a small Linux box at home or on a rented VPS.

This site exists to get that visitor from "I distrust the hosted options" to a completed install. Success is an install that a household then keeps using, not a signup.

## Positioning

The claim a hosted vault cannot truthfully copy: **there is no company between the household and its records.** The code is AGPL-3.0, the files stay on hardware the household owns, and the vault is reachable only over the household's own tailnet. Costs are the box you already own or a $5 to $10 VPS, not a per-seat subscription. Nobody can be compelled to hand over the records but the household itself, and nobody can change the terms.

The neighbouring self-hosted document tools (Paperless-style DMS) are built for one person's filing. Harbor's frame is the household: people and property as first-class subjects, invitations rather than accounts, deadlines rather than folders, and a restore drill the product itself reminds you to run.

## Operating Context

- **Install:** a Linux machine with Docker; a single reviewed shell script asks three questions (where documents live, how to reach it, where backups go) and starts eight containers. First run happens in the browser: create the first owner, receive an authenticator key and ten recovery codes once. No default credentials. Others join by invitation.
- **Network:** with a Tailscale auth key the vault is reachable only on the household's tailnet over HTTPS and nothing listens on the machine's own interfaces. Without Tailscale it binds to localhost by default and the owner chooses where to publish.
- **Daily use:** email-in with sender triage (connected mailboxes read over IMAP; a household address to forward to), drag-and-drop or bulk upload including ZIPs, an Inbox where suggestions are confirmed with one click, a Home page of people and property with what expires next, a To do list grouped by due date, and a document view with the original beside its summary, tags, notes, versions and change history.
- **Operations:** a `harbor` CLI for status, logs, backup, restore-test, upgrade and break-glass. Installs pin to a release tag. Nightly encrypted backups via restic to a second disk, SFTP host or B2 bucket, with a monthly automated restore test. Upgrades back up first and refuse if the backup fails.
- **The three things the installer cannot do:** put the data directory on an encrypted volume (LUKS) before installing; print and keep the break-glass page (master key, backup password, backup location); give backups somewhere to go and check the monthly restore test passes. Losing the envelope and the disk means the documents are gone, by design.
- **Evaluation ritual:** the audience reads the code, the licence, the container table and the threat model before trusting the claims. "Read it before you trust it" is the posture the product invites.

## Capabilities and Constraints

**Confirmed capabilities (README, v0.6.1):** upload, OCR, full-text search, suggestions, items, categories, family members, tags, email-in with sender triage, nightly encrypted backups with monthly restore test, browser-based first run, tailnet-only networking, invitations, per-file AES-256-GCM encryption under a master key. Multi-language OCR is claimed on the site; treat as unverified until confirmed against the repo.

**Language model, confirmed by the user:** summaries, titles, categories and dates come from a language model the owner chooses. Frontier hosted models are the preferred path; any OpenAI-compatible API also works, which is how a household would point it at local inference. Harbor takes no position that local inference is better, and the site must not imply it. The suggester can also run with no LLM at all. Consequences for copy:

- "Nothing phones home" and "nothing leaves your house" are false as a default. The suggester sends document text to the chosen provider, mailfetch talks to IMAP hosts, backup talks to the repository, and the worker (the only process that opens documents) has no route out. State what leaves and to whom; do not claim local-only.
- "Free" is true of the software. A hosted model and a VPS are the household's own running costs and should be named as such when cost is compared.

**Terminology the product uses:** vault, Inbox, To do, Home, items, categories, family members, tags, suggestions, owner, invitation, break-glass, restore test, tailnet. The Weber household on the site and the Muster household in the repo are both invented sample data.

**Known copy drift to resolve, not to repeat:** the site says "directly from your Gmail inbox"; the product connects mailboxes over IMAP and accepts forwarded email. The site says "reachable only over your own network"; the precise mechanism is a Tailscale tailnet. Postgres holds OCR text in plaintext, which is why the encrypted volume is mandatory; the site's "encryption keys never leave your disk" should be squared with that.

**Technical constraints of the site itself:** Next.js 16 App Router, React 19, Tailwind v4, pnpm. The design was authored in Paper and the tokens in `src/app/globals.css` are that export. Product screenshots in `public/mock/` are Paper exports with invented data; there are no real product screenshots yet. Deployed at openharbor.app.

**Decided 2026-09-12:** the site hosts its own docs under /docs, as markdown in this repo seeded from the repository's docs. **Undecided:** whether a hosted or managed offering will ever exist (nothing suggests one today). Whether the multi-language search claim is accurate.

## Brand Commitments

- **Name:** Harbor. Project handle: openharborhq. Domain: openharbor.app. Licence: AGPL-3.0.
- **Voice, as written and confirmed by use:** plain, specific, a little dry, unafraid of the hard parts ("An untested backup is a hope"; "Losing the envelope means the documents are gone. That is the design."). It states mechanisms rather than benefits and treats the reader as someone who will read the source.
- **Slogan in use:** "Your data. Your rules. Your Harbor." and the descriptor "everything that matters, safely together."
- **Origin, as the site states it:** built in the open by people who wanted it for their own households.
- No binding visual constraint was given during init. The incumbent look is recorded in code and Paper, not here.
- **Docs follow the conventional documentation layout** (user decision, 2026-09-12): full-width shell, a left navigation tree as the main navigation, content in the center, an on-this-page table of contents on the right. Calibrated against Tailscale's and Docker's documentation. The install page leads with prerequisites and the shortest working install; reaching the vault is presented as a choice between a tailnet and the household's own network, not a mandate.

## Evidence on Hand

**Real and verifiable (checked 2026-09-12):**

- Public repository at github.com/openharborhq/harbor, AGPL-3.0, default branch main, pushed the same day. Latest release v0.6.1. README with a working install script, a container table, a laptop try-out path and a development guide. SECURITY.md and LICENSE exist. README references docs/deploy.md, docs/restore.md, docs/spec and CHANGELOG.md (not individually verified).
- Invented sample households: the Webers (site mocks) and the Musters (repo seed).

**Placeholders that must not be presented as fact (confirmed by the user):**

- The "2.4k" star count in the nav. The repository has 0 stars.
- The "v0.4.1" version stamp in the footer. The current release is v0.6.1; any stamp must be fetched or removed.
- Footer links to docs/backups.md, docs/threat-model.md, docs/break-glass.md, docs/what-leaves-your-house.md and CONTRIBUTING.md. All five return 404 on main.

**Absent, do not fabricate:** users, testimonials, case studies, press, adoption numbers, benchmarks, security audits, and a hosted plan or pricing of Harbor's own. The project is pre-launch: the code is public and installable, but nothing has been announced and nobody outside the project is known to run it. Third-party pricing quoted in the comparison (Trustworthy, Everplans, Prisidio, September 2026) is the only external figure on the page and carries its own date.

## Product Principles

1. **Every claim is a mechanism.** If the page says the records are safe, it says from whom, by what container, over which network. The audience reads the compose file; the copy should survive that.
2. **Honest about what leaves the house.** Name the language model provider, IMAP, and the backup target as outbound traffic. Never trade on "local" when the default is a hosted frontier model.
3. **The household is the unit.** People, property, deadlines and invitations, not folders and seats. The design of the product is family-shaped and the site should reason the same way.
4. **The install is the conversion.** A visitor who leaves with the command, the three prerequisites and a realistic sense of the effort has converted. Nothing on the site should route around the fact that this is software you run.
5. **Proof before launch is the code.** Until there are users to quote, the repository, the release tag, the container table and the threat model are the evidence. Numbers appear only when fetched live.

## Accessibility & Inclusion

No product-specific standard was set. The site should meet WCAG 2.2 AA as a baseline, since the audience includes the whole household and the page carries long comparison tables and looping product animations.
