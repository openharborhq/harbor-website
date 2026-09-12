import Link from "next/link";
import { GITHUB } from "./Nav";

export function Promise() {
  return (
    <section className="gutter flex flex-col items-start justify-between gap-[56px] bg-accent py-[104px] lg:flex-row lg:items-center lg:gap-[80px]">
      <div className="flex max-w-[720px] flex-col gap-[22px]">
        <h2 className="text-[clamp(36px,3.9vw,56px)] font-extrabold leading-[1.1] tracking-hero text-ground">
          Your data. Your rules.
          <br />
          Your Harbor.
        </h2>
        <p className="text-lead leading-lead text-[#C3D2F5]">
          No account on anyone else’s server. No plan to upgrade. Just the software, the machine you put it on, and a
          family that knows where everything is.
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-[16px] lg:items-end">
        <Link
          href={`${GITHUB}#install`}
          className="font-title flex items-center gap-[10px] rounded-pill bg-ground px-[30px] py-[17px] text-copy leading-body tracking-[-0.01em] text-accent"
        >
          Start self-hosting
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="#123FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          href={`${GITHUB}#readme`}
          className="font-title rounded-pill border border-[#5F82D2] px-[30px] py-[17px] text-copy leading-body tracking-[-0.01em] text-ground"
        >
          Read the docs
        </Link>
        <span className="pt-[6px] font-mono text-[12.5px] leading-[16px] tracking-[0.06em] text-[#C3D2F5]">openharbor.app</span>
      </div>
    </section>
  );
}
