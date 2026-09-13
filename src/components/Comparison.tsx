const ROWS: [string, string, string][] = [
  [
    "Where the records live",
    "On the company’s servers, usually rented from a cloud provider, reachable from the public internet with a password.",
    "On your own hardware, in your house or on a server you rent, reachable only over your own network.",
  ],
  [
    "Who can read them",
    "The company’s systems, staff with access, and whichever AI and search vendors it uses, under a privacy policy that can change.",
    "You and the people you invite. There is no vendor account, and the encryption keys never leave your disk.",
  ],
  [
    "If there’s a breach",
    "One target holding thousands of households’ passports and deeds. You find out when they disclose it.",
    "Your box is nobody’s honeypot. Nothing listens on the public internet, and nothing phones home.",
  ],
  [
    "If the company changes course",
    "Acquisitions, price increases, features moved behind a paywall, shutdowns. An export window if you’re lucky.",
    "There is no company to change course. The code is AGPL-3.0 and can be forked, audited and kept running by anyone; your files stay plain files on disk.",
  ],
  [
    "Who builds it, and how you know",
    "A company, on a roadmap you don’t see. Security claims are claims; the code is closed.",
    "A community, in the open. Every line of code, every issue and the roadmap are on GitHub. Read it before you trust it.",
  ],
  [
    "What it costs",
    "$10 to $40 a month per household, tiered by storage, seats and inboxes, for as long as you want the records to exist.",
    "Free. A small Linux box you already own, or a $5 to $10 VPS. No tiers, no seats.",
  ],
  [
    "If your records are subpoenaed",
    "The request goes to the company. It can be compelled to hand over what it holds, and it may be barred from telling you.",
    "There is no third party to ask. Anyone who wants your records has to come to you, and you will know.",
  ],
];

/*
 * The phone view. The table has nowhere to go on a 390px screen — three columns and seven rows,
 * scrolled sideways with a pinned label, is a worse read than no table at all. Below md the same
 * argument is made as a list: each row's Harbor answer with its question folded into the sentence,
 * so a bullet carries its own meaning instead of borrowing half of it from a column header.
 *
 * The wording is the table's. Change a row's claim above and change its bullet here.
 */
const BULLETS: string[] = [
  "Records live on your own hardware, in your house or on a server you rent, reachable only over your own network.",
  "Only you and the people you invite can read them. There is no vendor account, and the encryption keys never leave your disk.",
  "If there’s a breach, your box is nobody’s honeypot. Nothing listens on the public internet, and nothing phones home.",
  "There is no company to change course. The code is AGPL-3.0 and can be forked, audited and kept running by anyone; your files stay plain files on disk.",
  "It is built by a community, in the open. Every line of code, every issue and the roadmap are on GitHub. Read it before you trust it.",
  "It is free. A small Linux box you already own, or a $5 to $10 VPS. No tiers, no seats.",
  "If your records are subpoenaed, there is no third party to ask. Anyone who wants your records has to come to you, and you will know.",
];

export function Comparison() {
  return (
    <section id="pricing" className="gutter flex flex-col gap-[40px] pb-[88px] pt-[96px]">
      <div className="flex max-w-[640px] flex-col gap-[22px]">
        <span className="font-mono text-[12px] font-medium leading-[16px] tracking-mono text-faint">OPEN SOURCE VS. HOSTED</span>
        <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">The open source alternative.</h2>
      </div>

      {/* The phone reads the bullets; md and up gets the table. */}
      <div className="flex flex-col gap-[22px] md:hidden">
        <p className="text-body leading-[23px] text-muted">
          Against a hosted vault — Trustworthy, Everplans, Prisidio, a Drive folder — running Harbor yourself means:
        </p>
        <ul className="flex flex-col gap-[18px]">
          {BULLETS.map((bullet) => (
            <li key={bullet} className="flex gap-[12px]">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="mt-[3px] shrink-0 text-accent" aria-hidden="true">
                <path d="M3.5 9.2 6.8 12.5 13.5 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* text-text, not muted: the table gives the Harbor column the darker ink and the
                  hosted one the lighter, and this is the Harbor column. */}
              <p className="text-body leading-[23px] text-text">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>

      {/*
       * Narrower than 880px the table scrolls sideways inside this region. The question column
       * stays pinned so a row keeps its label while the two answers slide past; the region is
       * focusable so keyboard users can scroll it too.
       */}
      <div className="hidden overflow-x-auto md:block" role="region" aria-label="Hosted services compared with Harbor" tabIndex={0}>
        <table className="w-full min-w-[880px] table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-text align-top">
              <th scope="col" className="sticky left-0 z-[1] w-[264px] bg-ground pb-[16px] pr-[24px]">
                <span className="sr-only">Question</span>
              </th>
              <th scope="col" className="w-[444px] pb-[16px] pr-[24px] text-[22px] font-bold leading-copy tracking-[-0.025em] text-text">
                Hosted services
                <span className="mt-[6px] block whitespace-nowrap font-mono text-[11px] font-medium leading-[14px] tracking-mono text-faint">
                  HOSTED · TRUSTWORTHY, EVERPLANS, PRISIDIO, A DRIVE FOLDER
                </span>
              </th>
              <th scope="col" className="w-[444px] pb-[16px] text-[22px] font-bold leading-copy tracking-[-0.025em] text-accent">
                Harbor
                <span className="mt-[6px] block whitespace-nowrap font-mono text-[11px] font-medium leading-[14px] tracking-mono text-faint">
                  OPEN SOURCE · SELF-HOSTED · COMMUNITY-BUILT
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([q, hosted, harbor]) => (
              <tr key={q} className="border-b border-border align-top">
                <th scope="row" className="sticky left-0 z-[1] bg-ground py-[16px] pr-[24px] text-body font-semibold leading-[23px] tracking-[-0.01em] text-text">
                  {q}
                </th>
                <td className="py-[16px] pr-[24px] text-body leading-[23px] text-muted">{hosted}</td>
                <td className="py-[16px] text-body leading-[23px] text-text">{harbor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* The pull-up is tuned to the table's last rule; under the bullets it would crowd them. */}
      <p className="max-w-[900px] text-small leading-row text-faint md:-mt-[26px]">
        Hosted pricing from trustworthy.com, everplans.com and prisidio.com, September 2026. Nothing here is legal
        advice; how a request for records is handled depends on where you and the provider are.
      </p>
    </section>
  );
}
