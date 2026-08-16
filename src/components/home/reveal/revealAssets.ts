import { HERO_PORTFOLIO_ASSETS } from "@/components/home/hero/portfolioAssets";

/** Approved populate order for the reveal phone (Screen 2). */
export const REVEAL_ASSET_ORDER = [
  "btc",
  "eth",
  "sol",
  "tao",
  "sp500",
  "gold",
  "sui",
  "silver",
  "msft",
  "nvda",
] as const;

export const REVEAL_ASSETS = REVEAL_ASSET_ORDER.map((id) => {
  const asset = HERO_PORTFOLIO_ASSETS.find((a) => a.id === id);
  if (!asset) {
    throw new Error(`Missing reveal asset: ${id}`);
  }
  return asset;
});

export const REVEAL_STORAGE_KEY = "indexla-portfolio-reveal-seen";

export function shouldForceReveal(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("reveal") === "1";
}

export function hasSeenReveal(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(REVEAL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markRevealSeen(): void {
  try {
    window.localStorage.setItem(REVEAL_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}
