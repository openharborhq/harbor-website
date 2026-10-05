/*
 * The site's two languages.
 *
 * English keeps the addresses it always had (`/`, `/features`, `/pricing`); German lives under
 * `/de`. A page knows its language from the route it is rendered by, never from the request, so
 * every page stays static: `proxy.ts` is the only code that reads the browser's language, and all
 * it does with it is choose which of the two static pages to send a first-time visitor to.
 *
 * The docs are English only for now. German pages link to them as they are.
 */
export const LANGS = ["en", "de"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/** Set when someone picks a language in the footer; read by `proxy.ts`. One year. */
export const LANG_COOKIE = "harbor-lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** The name of each language in itself, for the switcher. */
export const LANG_NAMES: Record<Lang, string> = { en: "English", de: "Deutsch" };

/** The marketing pages that exist in both languages, by their English path. */
export const LOCALIZED_PATHS = ["/", "/features", "/pricing"] as const;

/**
 * A marketing path in a language. `localize("/pricing", "de")` is `/de/pricing`, `localize("/",
 * "de")` is `/de`, and a hash rides along (`/#features` → `/de#features`). Paths that only exist
 * in English (the docs, GitHub) come back unchanged.
 */
export function localize(path: string, lang: Lang): string {
  if (lang === "en" || /^https?:/.test(path)) return path;
  const [pathname, hash = ""] = path.split("#");
  const base = pathname === "" ? "/" : pathname;
  if (!(LOCALIZED_PATHS as readonly string[]).includes(base)) return path;
  const prefixed = base === "/" ? "/de" : `/de${base}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** The English path behind a German one: `/de/pricing` → `/pricing`, `/de` → `/`. */
export function delocalize(pathname: string): string {
  if (pathname === "/de") return "/";
  if (pathname.startsWith("/de/")) return pathname.slice(3);
  return pathname;
}

/** `hreflang` alternates for a page that exists in both languages. */
export function alternatesFor(path: (typeof LOCALIZED_PATHS)[number], lang: Lang) {
  return {
    canonical: localize(path, lang),
    languages: { en: path, de: localize(path, "de"), "x-default": path },
  };
}
