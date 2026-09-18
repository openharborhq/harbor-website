import { Cmd, Eyebrow, Terminal } from "./parts";

/*
 * What running Harbor is like after the install, which is the question a self-hoster is actually
 * asking. The commands are the ones in the repository's README, in the order someone reaches for
 * them: is it up, what is it doing, prove the backup works, move to the new release.
 */
const NOTES = [
  {
    head: "One command, six things",
    copy: "Status, logs, the keys to print, a backup now, a proof the backup reads back, and the upgrade. Nothing else is needed day to day.",
  },
  {
    head: "An untested backup is a hope",
    copy: "restore-test runs on its own every month and reports in Settings. Harbor tells you when it fails rather than when it passes.",
  },
  {
    head: "Break-glass is a printed page",
    copy: "The master key, the backup password and where the backups are. Lose the page and the disk together and the documents are gone. That is the design.",
  },
];

export function Operating() {
  return (
    <section className="gutter flex flex-col gap-[48px] py-[88px]">
      <div className="flex flex-col items-start gap-[48px] lg:flex-row lg:items-center lg:gap-[72px]">
        <div className="flex w-full flex-col gap-[18px] lg:w-[44%]">
          <Eyebrow>Operating it</Eyebrow>
          <h2 className="text-section-head font-bold leading-[1.1] tracking-tight text-text">
            After the install there is one command
          </h2>
          <p className="text-lead leading-copy text-muted">
            Harbor is software you run, and this page will not route around that. This is the whole of it.
          </p>
        </div>
        <div className="w-full lg:w-[56%]">
          <Terminal title="HARBOR CLI">
            <Cmd note="what is running">harbor status</Cmd>
            <Cmd note="follow one service">harbor logs worker</Cmd>
            <Cmd note="the keys to print and keep">harbor break-glass</Cmd>
            <Cmd note="back up now">harbor backup</Cmd>
            <Cmd note="prove the backup reads back">harbor restore-test</Cmd>
            <Cmd note="back up, pull, restart">harbor upgrade</Cmd>
          </Terminal>
        </div>
      </div>

      <ul className="grid gap-[20px] md:grid-cols-3">
        {NOTES.map((n) => (
          <li key={n.head} className="flex flex-col gap-[8px] border-t-2 border-accent pt-[18px]">
            <h3 className="font-title text-section leading-[26px] tracking-snug text-text">{n.head}</h3>
            <p className="text-[15.5px] leading-[25px] text-muted">{n.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
