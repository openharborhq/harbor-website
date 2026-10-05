"use client";

import { usePathname } from "next/navigation";
import { delocalize, LANG_COOKIE, LANG_COOKIE_MAX_AGE, LANG_NAMES, LANGS, LOCALIZED_PATHS, localize, type Lang } from "@/lib/i18n";

/*
 * The footer's language choice: the current language as plain text, the other as a link to the
 * same page in that language.
 *
 * Choosing writes a cookie before the browser follows the link, and `proxy.ts` honours that cookie
 * over the browser's language from then on, so picking English on a German browser sticks. A page
 * that only exists in English (the docs) offers the German home page instead.
 *
 * A plain `<a>`, not `next/link`: the two languages are separate root layouts, so the switch is a
 * full page load either way, and the plain link also works before hydration.
 */
export function LanguageSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  const english = delocalize(pathname);
  const hasTwin = (LOCALIZED_PATHS as readonly string[]).includes(english);
  const hrefFor = (target: Lang) => (target === "en" ? (hasTwin ? english : pathname) : hasTwin ? localize(english, "de") : "/de");

  return (
    <nav aria-label={lang === "de" ? "Sprache" : "Language"} className="flex items-center gap-[6px] text-[13.5px] leading-[18px]">
      {LANGS.map((target, i) => (
        <span key={target} className="flex items-center gap-[6px]">
          {i > 0 && <span aria-hidden="true" className="text-faint">·</span>}
          {target === lang ? (
            <span aria-current="true" className="font-semibold text-text">
              {LANG_NAMES[target]}
            </span>
          ) : (
            <a
              href={hrefFor(target)}
              hrefLang={target}
              lang={target}
              onClick={() => {
                document.cookie = `${LANG_COOKIE}=${target}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
              }}
              className="text-muted underline-offset-[3px] hover:text-accent hover:underline"
            >
              {LANG_NAMES[target]}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
