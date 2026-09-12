import Image from "next/image";
import Link from "next/link";
import { GITHUB } from "./Nav";

export function Hero() {
  return (
    <section>
      <div className="gutter flex flex-col pt-[96px]">
        <h1 className="max-w-[903px] text-[clamp(42px,5.28vw,76px)] font-extrabold leading-[1] tracking-hero text-text">
          Bring sanity to your household paperwork.
        </h1>
        <div className="flex flex-col items-start justify-between gap-10 pt-[40px] lg:flex-row lg:items-end">
          <div className="flex max-w-[752px] flex-col gap-[34px]">
            <p className="text-lead leading-lead tracking-[-0.011em] text-muted">
              Never lose important documents again. Keep records of your passports, deeds or bills in your own vault and
              find everything in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-[12px]">
              <Link
                href={`${GITHUB}#install`}
                className="flex items-center gap-[9px] rounded-pill bg-accent px-[26px] py-[15px] text-[16px] font-semibold leading-row tracking-[-0.01em] text-ground"
              >
                Get started
                <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="#inside"
                className="rounded-pill border border-border px-[26px] py-[15px] text-[16px] font-semibold leading-row tracking-[-0.01em] text-text"
              >
                See how it works
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-end gap-[14px] pb-[8px]">
            <div className="h-[2px] w-[56px] bg-accent" />
            <p className="whitespace-pre text-right text-[25px] font-semibold leading-[36px] tracking-[-0.025em] text-text">
              Your data. Your rules.
              {"\n"}
              Your Harbor.
            </p>
          </div>
        </div>
      </div>

      {/* The app at 1:1, 1320 wide, running off the right edge and cut by the next section's top rule. */}
      <div className="gutter-l overflow-hidden pt-[76px]">
        <div className="w-[1320px] max-w-none overflow-hidden rounded-t-[16px] border border-b-0 border-border bg-panel">
          <Image
            src="/mock/hero-home@2x.png"
            alt="Harbor's Home page: the Weber household's family members and property, with what expires next."
            width={1320}
            height={800}
            priority
            sizes="1320px"
            className="block"
          />
        </div>
      </div>
    </section>
  );
}
