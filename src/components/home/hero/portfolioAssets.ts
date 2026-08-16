export type FloatingPortfolioAsset = {
  id: string;
  ticker: string;
  allocation: number;
  /** Existing AssetLogo key when available */
  assetKey?:
    | "btc"
    | "eth"
    | "sol"
    | "tao"
    | "sp500"
    | "gold"
    | "silver"
    | "microsoft"
    | "nvidia";
  /** Direct logo path for assets not in ASSETS map */
  logoSrc?: string;
  /** Desktop position as % of hero stage */
  desktop: { x: number; y: number; depth: number };
  /** Mobile position as % — omit to hide on small screens */
  mobile?: { x: number; y: number; depth: number };
  /** Float animation seed */
  drift: { duration: number; x: number; y: number; delay: number };
};

/**
 * Illustrative portfolio — allocations only (sum = 100%).
 * Not performance / returns.
 */
export const HERO_PORTFOLIO_ASSETS: FloatingPortfolioAsset[] = [
  {
    id: "btc",
    ticker: "BTC",
    allocation: 33,
    assetKey: "btc",
    desktop: { x: 8, y: 28, depth: 1 },
    mobile: { x: 6, y: 18, depth: 1 },
    drift: { duration: 9.5, x: 6, y: 10, delay: 0 },
  },
  {
    id: "eth",
    ticker: "ETH",
    allocation: 15,
    assetKey: "eth",
    desktop: { x: 88, y: 24, depth: 0.92 },
    mobile: { x: 88, y: 16, depth: 0.9 },
    drift: { duration: 11, x: -5, y: 8, delay: 0.4 },
  },
  {
    id: "sol",
    ticker: "SOL",
    allocation: 10,
    assetKey: "sol",
    desktop: { x: 6, y: 58, depth: 0.78 },
    mobile: { x: 8, y: 72, depth: 0.75 },
    drift: { duration: 10.2, x: 7, y: -7, delay: 0.8 },
  },
  {
    id: "tao",
    ticker: "TAO",
    allocation: 10,
    assetKey: "tao",
    desktop: { x: 92, y: 52, depth: 0.8 },
    mobile: { x: 90, y: 68, depth: 0.78 },
    drift: { duration: 12, x: -6, y: -6, delay: 1.1 },
  },
  {
    id: "gold",
    ticker: "Gold",
    allocation: 10,
    assetKey: "gold",
    desktop: { x: 14, y: 78, depth: 0.72 },
    mobile: { x: 18, y: 88, depth: 0.7 },
    drift: { duration: 10.8, x: 5, y: -8, delay: 0.2 },
  },
  {
    id: "sp500",
    ticker: "S&P 500",
    allocation: 8,
    assetKey: "sp500",
    desktop: { x: 84, y: 78, depth: 0.7 },
    mobile: { x: 78, y: 88, depth: 0.68 },
    drift: { duration: 11.4, x: -4, y: 7, delay: 1.5 },
  },
  {
    id: "sui",
    ticker: "SUI",
    allocation: 5,
    logoSrc: "/images/assets/sui.svg",
    desktop: { x: 18, y: 42, depth: 0.55 },
    // hidden on mobile — simplify
    drift: { duration: 13, x: 8, y: 5, delay: 0.6 },
  },
  {
    id: "silver",
    ticker: "Silver",
    allocation: 5,
    assetKey: "silver",
    desktop: { x: 80, y: 40, depth: 0.55 },
    drift: { duration: 12.6, x: -7, y: 6, delay: 1.8 },
  },
  {
    id: "msft",
    ticker: "MSFT",
    allocation: 3,
    assetKey: "microsoft",
    desktop: { x: 24, y: 18, depth: 0.42 },
    drift: { duration: 14, x: 4, y: 9, delay: 0.9 },
  },
  {
    id: "nvda",
    ticker: "NVDA",
    allocation: 1,
    assetKey: "nvidia",
    desktop: { x: 76, y: 16, depth: 0.35 },
    drift: { duration: 13.5, x: -5, y: 8, delay: 1.3 },
  },
];

/** Bubble diameter in rem from allocation weight (BTC largest, NVDA smallest). */
export function allocationSizeRem(
  allocation: number,
  compact = false,
  variant: "default" | "reveal" = "default",
): number {
  if (variant === "reveal") {
    // Desktop: large premium circles. Compact: sized to clear full-bleed headline.
    const min = compact ? 4.0 : 7.0;
    const max = compact ? 5.15 : 12.4;
    const t = Math.pow(
      Math.max(0, Math.min(1, (allocation - 1) / 32)),
      0.55,
    );
    return min + t * (max - min);
  }
  const min = compact ? 2.35 : 2.7;
  const max = compact ? 4.6 : 5.85;
  const t = Math.max(0, Math.min(1, (allocation - 1) / 32));
  return min + t * (max - min);
}
