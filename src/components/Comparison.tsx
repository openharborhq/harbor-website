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

export function Comparison() {
  return (
    <section id="pricing" className="gutter flex flex-col gap-[40px] pb-[88px] pt-[96px]">
      <div className="flex max-w-[640px] flex-col gap-[22px]">
        <span className="font-mono text-[12px] font-medium leading-[16px] tracking-mono text-faint">OPEN SOURCE VS. HOSTED</span>
        <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">The open source alternative.</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-text align-bottom">
              <th scope="col" className="w-[264px] pb-[16px] pr-[24px]">
                <span className="sr-only">Question</span>
              </th>
              <th scope="col" className="w-[444px] pb-[16px] pr-[24px] text-[22px] font-bold leading-copy tracking-[-0.025em] text-text">
                Hosted services
                <span className="mt-[6px] block font-mono text-[11px] font-medium leading-[14px] tracking-mono text-faint">
                  HOSTED · TRUSTWORTHY, EVERPLANS, PRISIDIO, A DRIVE FOLDER
                </span>
              </th>
              <th scope="col" className="w-[444px] pb-[16px] text-[22px] font-bold leading-copy tracking-[-0.025em] text-accent">
                Harbor
                <span className="mt-[6px] block font-mono text-[11px] font-medium leading-[14px] tracking-mono text-faint">
                  OPEN SOURCE · SELF-HOSTED · COMMUNITY-BUILT
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([q, hosted, harbor]) => (
              <tr key={q} className="border-b border-border align-top">
                <th scope="row" className="py-[16px] pr-[24px] text-body font-semibold leading-[23px] tracking-[-0.01em] text-text">
                  {q}
                </th>
                <td className="py-[16px] pr-[24px] text-body leading-[23px] text-muted">{hosted}</td>
                <td className="py-[16px] text-body leading-[23px] text-text">{harbor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="-mt-[26px] max-w-[900px] text-small leading-row text-faint">
        Hosted pricing from trustworthy.com, everplans.com and prisidio.com, September 2026. Nothing here is legal
        advice; how a request for records is handled depends on where you and the provider are.
      </p>
    </section>
  );
}
