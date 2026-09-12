export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
      <path
        d="M13 2.5 L22.5 7 L22.5 14.5 C22.5 19.5 18.4 22.8 13 24 C7.6 22.8 3.5 19.5 3.5 14.5 L3.5 7 Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13 8.5 L13 17.5 M8.6 12.4 C8.6 12.4 10.2 14.6 13 14.6 C15.8 14.6 17.4 12.4 17.4 12.4"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ mark = 26, text = "text-section leading-[24px]" }: { mark?: number; text?: string }) {
  return (
    <span className="flex items-center gap-[11px]">
      <Mark size={mark} />
      <span className={`${text} font-bold tracking-snug text-text`}>Harbor</span>
    </span>
  );
}
