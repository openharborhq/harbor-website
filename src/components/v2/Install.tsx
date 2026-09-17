import Link from "next/link";
import { GITHUB } from "@/lib/github";
import { Arrow, Cmd, Eyebrow, Terminal } from "./parts";
import { doc } from "./routes";

/*
 * The conversion. A visitor who leaves with the command, the three prerequisites and a realistic
 * sense of the effort has converted, whether or not they run it today — so the three things the
 * installer cannot do sit here beside the command rather than on a page they would reach later.
 *
 * `less install.sh` is kept in the block on purpose. It is the line that says what kind of project
 * this is.
 */
const YOURS = [
  {
    n: "01",
    head: "Put the data directory on an encrypted volume",
    copy: "Before you run it. Postgres holds the text of every document in the clear, so a stolen disk is otherwise a readable copy of the paperwork. The installer warns; it cannot do this afterwards.",
  },
  {
    n: "02",
    head: "Print the break-glass page",
    copy: "The master key, the backup password, and where the backups are. Without it, a dead disk means the documents are gone.",
  },
  {
    n: "03",
    head: "Give backups somewhere to go",
    copy: "A second disk, an SFTP host or a B2 bucket — then check the monthly restore test passes. Settings shows every run.",
  },
];

export function Install() {
  return (
    <section id="install" className="gutter flex flex-col gap-[52px] border-t border-border bg-surface py-[104px]">
      <div className="flex flex-col items-start gap-[48px] lg:flex-row lg:gap-[72px]">
        <div className="flex w-full flex-col gap-[18px] lg:w-[44%]">
          <Eyebrow>Install</Eyebrow>
          <h2 className="text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.1] tracking-tight text-text">
            Three lines, three questions, eight containers
          </h2>
          <p className="text-lead leading-copy text-muted">
            The script asks where the documents should live, how you want to reach the vault, and where backups should
            go. It does the rest and prints an address. The vault is empty and asks you to create the first owner;
            there are no default credentials.
          </p>
          <div className="flex flex-wrap items-center gap-[12px] pt-[8px]">
            <Link
              href={doc("install")}
              className="flex items-center gap-[9px] rounded-pill bg-accent px-[26px] py-[14px] text-body font-semibold leading-[18px] text-ground"
            >
              The install guide
              <Arrow size={15} />
            </Link>
            <Link
              href={`${GITHUB}/blob/main/install.sh`}
              className="rounded-pill border border-border-strong px-[26px] py-[14px] text-body font-semibold leading-[18px] text-text"
            >
              Read install.sh
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-col gap-[16px] lg:w-[56%]">
          <Terminal title="A LINUX MACHINE WITH DOCKER">
            <Cmd>curl -fsSLO https://raw.githubusercontent.com/openharborhq/harbor/main/install.sh</Cmd>
            <Cmd note="please read it before running it as root">less install.sh</Cmd>
            <Cmd>sudo sh install.sh</Cmd>
          </Terminal>
          <Terminal title="OR UNATTENDED, ANSWERING UP FRONT">
            <Cmd>{"sudo env HARBOR_DATA_DIR=/data TS_AUTHKEY=tskey-auth-… \\\n      RESTIC_REPOSITORY=b2:my-bucket:/harbor sh install.sh"}</Cmd>
          </Terminal>
        </div>
      </div>

      {/* Placed here, next to the command, rather than on a page reached afterwards: all three are
          decided before the install, and two of them cannot be fixed later. */}
      <div className="flex flex-col gap-[26px] rounded-lg border border-border bg-panel p-[32px]">
        <h3 className="text-title font-bold leading-[36px] tracking-tight text-text">
          Three things the installer cannot do for you
        </h3>
        <ol className="grid gap-[28px] md:grid-cols-3">
          {YOURS.map((y) => (
            <li key={y.n} className="flex flex-col gap-[8px]">
              <span className="font-mono text-[12px] font-medium leading-[16px] tracking-[0.06em] text-accent">{y.n}</span>
              <h4 className="font-title text-section leading-[26px] tracking-snug text-text">{y.head}</h4>
              <p className="text-[15.5px] leading-[25px] text-muted">{y.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
