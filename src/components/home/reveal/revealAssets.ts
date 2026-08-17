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

/** Display names for reveal copy — keep allocation data from HERO_PORTFOLIO_ASSETS */
export const REVEAL_DISPLAY_NAME: Record<
  (typeof REVEAL_ASSET_ORDER)[number],
  string
> = {
  btc: "Bitcoin",
  eth: "Ethereum",
  sol: "Solana",
  tao: "TAO",
  sp500: "S&P 500",
  gold: "Gold",
  sui: "SUI",
  silver: "Silver",
  msft: "MSFT",
  nvda: "NVDA",
};

export const REVEAL_ASSETS = REVEAL_ASSET_ORDER.map((id) => {
  const asset = HERO_PORTFOLIO_ASSETS.find((a) => a.id === id);
  if (!asset) {
    throw new Error(`Missing reveal asset: ${id}`);
  }
  return {
    ...asset,
    displayName: REVEAL_DISPLAY_NAME[id],
  };
});

export type RevealAsset = (typeof REVEAL_ASSETS)[number];

export const REVEAL_STORAGE_KEY = "indexla-portfolio-reveal-seen";
export const REVEAL_COOKIE = "indexla-reveal-seen";

export function shouldForceReveal(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("reveal") === "1";
}

function persistRevealCookie(): void {
  try {
    document.cookie = `${REVEAL_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
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
  persistRevealCookie();
}
