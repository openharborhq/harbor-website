/**
 * The only numbers on the page come from here, fetched from GitHub and cached for an hour.
 * Every helper returns null when GitHub is slow, down, rate-limited, or answers with something
 * unexpected, and the components render the honest version without the number.
 */

export const REPO = "openharborhq/harbor";
export const GITHUB = `https://github.com/${REPO}`;

const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 5000;

/**
 * Not an AbortSignal: passing one to fetch opts the request out of Next's data cache
 * (docs: app/api-reference/functions/fetch), so a slow answer is raced instead of aborted.
 */
function withTimeout<T>(p: Promise<T>): Promise<T | null> {
  return Promise.race([p, new Promise<null>((resolve) => setTimeout(() => resolve(null), TIMEOUT_MS))]);
}

async function github<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "openharbor.app",
  };
  // Optional: raises the unauthenticated limit of 60 requests an hour per IP.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await withTimeout(
      fetch(`https://api.github.com/repos/${REPO}${path}`, { headers, next: { revalidate: REVALIDATE_SECONDS } }),
    );
    if (!res || !res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getStars(): Promise<number | null> {
  const data = await github<{ stargazers_count?: unknown }>("");
  const n = data?.stargazers_count;
  return typeof n === "number" && Number.isFinite(n) && n >= 0 ? n : null;
}

export async function getLatestRelease(): Promise<{ tag: string; url: string } | null> {
  const data = await github<{ tag_name?: unknown; html_url?: unknown }>("/releases/latest");
  if (typeof data?.tag_name !== "string" || typeof data?.html_url !== "string") return null;
  return { tag: data.tag_name, url: data.html_url };
}

/** 2438 -> "2.4k", 980 -> "980", 12000 -> "12k". */
export function formatStars(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n).toLowerCase();
}
