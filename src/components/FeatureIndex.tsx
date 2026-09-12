import type { ReactNode } from "react";

const S = { fill: "none", stroke: "var(--color-accent)", strokeWidth: 1.6 } as const;

const FEATURES: { icon: ReactNode; title: string; copy: string }[] = [
  {
    icon: <path d="M2.5 5.5h17v11h-17z M2.5 5.5L11 12l8.5-6.5" {...S} strokeLinejoin="round" />,
    title: "Email ingest",
    copy: "One address for the household. Forward the bill, the policy, the school letter. It’s waiting, already read, when you get home.",
  },
  {
    icon: <path d="M11 15.5V3.5M6.5 8L11 3.5 15.5 8M3.5 13.5v4a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4" {...S} strokeLinecap="round" strokeLinejoin="round" />,
    title: "Upload anything",
    copy: "PDFs, phone photos, a decade of scans in one ZIP. Harbor spots what it has already seen and files the rest.",
  },
  {
    icon: (
      <>
        <path d="M4 3.5h9l5 5v10h-14z M13 3.5v5h5" {...S} strokeLinejoin="round" />
        <path d="M6.8 12h6M6.8 15h4" {...S} strokeLinecap="round" />
      </>
    ),
    title: "Read on every page",
    copy: "Crooked phone shots and forty-page contracts alike become searchable text, in the languages your paperwork actually arrives in.",
  },
  {
    icon: (
      <>
        <circle cx="10" cy="10" r="6.5" {...S} />
        <path d="M14.8 14.8L19 19" {...S} strokeLinecap="round" />
      </>
    ),
    title: "Indexing and search",
    copy: "Full text across the whole library, narrowed by person, property, category or date. The matching line shows before you open anything.",
  },
  {
    icon: <path d="M3.5 6.5h6v6h-6z M12.5 6.5h6v6h-6z M3.5 15.5h6v3h-6z M12.5 15.5h6v3h-6z" {...S} strokeLinejoin="round" />,
    title: "Categories and subjects",
    copy: "Papers belong to people, and to things. The house, the car, the joint account, the dog. Open any of them and the whole file is there.",
  },
  {
    icon: (
      <>
        <ellipse cx="11" cy="5.5" rx="7.5" ry="2.8" {...S} />
        <path d="M3.5 5.5v11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-11M3.5 11c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8" {...S} />
      </>
    ),
    title: "Backups you’ve actually restored",
    copy: "Encrypted snapshots on a schedule, to a second disk or a bucket you own, plus a restore drill Harbor reminds you to run. An untested backup is a hope.",
  },
];

export function FeatureIndex() {
  return (
    <section className="gutter flex flex-col gap-[52px] border-y border-border bg-surface pb-[116px] pt-[108px]">
      <div className="flex max-w-[760px] flex-col gap-[20px]">
        <span className="font-mono text-[12px] font-medium leading-[16px] tracking-mono text-faint">WHAT’S IN THE BOX</span>
        <h2 className="text-section-head font-bold leading-section-head tracking-tight text-text">Everything the binder was for.</h2>
      </div>
      <ul className="grid gap-x-[40px] gap-y-[52px] sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title} className="flex flex-col gap-[13px] border-t border-border pt-[22px]">
            <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
              {f.icon}
            </svg>
            <h3 className="font-title text-section leading-[24px] tracking-snug text-text">{f.title}</h3>
            <p className="text-[15.5px] leading-[25px] text-muted">{f.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
