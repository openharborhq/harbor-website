import { SectionHead } from "./parts";

/*
 * Three routes in, each as the three steps it actually takes, with the case it suits underneath.
 *
 * Getting the backlog in is the part a household stalls on, so this sits directly under the hero
 * rather than behind a feature page. The steps are mechanisms, not benefits: a reader who has run
 * software before can tell the difference in one line.
 */
const WAYS = [
  {
    key: "email",
    name: "Email",
    line: "The paperwork that was never on paper",
    steps: [
      "Connect a mailbox over IMAP, or forward to the household address.",
      "Sender triage decides what is paperwork and what is a newsletter.",
      "What it keeps lands in the Inbox with a filing already suggested.",
    ],
    bestFor: "Bills, statements, policy renewals",
  },
  {
    key: "upload",
    name: "Upload",
    line: "The drawer you have been meaning to empty",
    steps: [
      "Drag a folder, or a ZIP, onto the page.",
      "Every page is OCR'd and every word indexed.",
      "Each file arrives in the Inbox with a title, a category and its dates.",
    ],
    bestFor: "The filing cabinet, in one afternoon",
  },
  {
    key: "phone",
    name: "A phone",
    line: "The thing in your hand, on paper",
    steps: [
      "Open the vault on a phone that is on the tailnet.",
      "Photograph the document.",
      "It queues behind everything else and is read the same way.",
    ],
    bestFor: "Passports, letters, anything that came by post",
  },
];

export function WaysIn() {
  return (
    <section id="how" className="gutter flex flex-col gap-[56px] border-b border-border bg-surface py-[88px]">
      <SectionHead
        eyebrow="Three ways in"
        title="Paperwork arrives the way it already reaches the house"
        lead="Harbor does not ask a household to change how it receives things. It takes email, files and photographs, and puts all three through the same reading."
        align="center"
        max="max-w-[660px]"
      />

      <ol className="grid gap-[20px] lg:grid-cols-3">
        {WAYS.map((w) => (
          <li key={w.key} className="flex flex-col gap-[22px] rounded-lg border border-border bg-panel p-[28px]">
            <div className="flex flex-col gap-[6px]">
              <h3 className="text-title font-bold leading-[36px] tracking-tight text-text">{w.name}</h3>
              <p className="text-body leading-[22px] text-faint">{w.line}</p>
            </div>

            {/* Fixed-width numeral column, so the three cards' step text starts on one line even
                when a step wraps to two. */}
            <ol className="flex flex-col gap-[14px]">
              {w.steps.map((s, i) => (
                <li key={s} className="flex gap-[14px]">
                  <span className="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-pill bg-accent-soft font-mono text-[11px] font-medium leading-[14px] text-accent">
                    {i + 1}
                  </span>
                  <span className="text-[15.5px] leading-[25px] text-muted">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-auto flex flex-col gap-[6px] border-t border-border pt-[18px]">
              <span className="font-mono text-label font-medium leading-[14px] tracking-mono text-faint">BEST FOR</span>
              <span className="text-body leading-[22px] text-text">{w.bestFor}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
