/**
 * Homepage Discover products — sourced from IndexLa-App index-catalog.ts.
 * Allocations use the app's equalAllocations (10 assets → 10% each).
 * Strategies from strategyIdForIndexOrdinal at catalog build time.
 */

export type HomeDiscoverAsset = {
  ticker: string;
  percent: number;
  color: string;
  src: string;
};

export type HomeDiscoverProduct = {
  id: string;
  name: string;
  typeLabel: string;
  typeClassName: string;
  strategy: string;
  assets: HomeDiscoverAsset[];
};

/** Brand colors from IndexLa-App asset-registry (donut-tuned for dark/light extremes). */
function donutColor(raw: string): string {
  const c = raw.toLowerCase();
  if (
    c === "#000000" ||
    c === "#000" ||
    c === "#101010" ||
    c === "#1b1b1b" ||
    c === "#1a1a1a" ||
    c === "#23292f"
  ) {
    return "#3D4450";
  }
  if (c === "#ffffff" || c === "#fff" || c === "#e6dafe") {
    return "#7C6AE8";
  }
  return raw;
}

function equalAssets(
  rows: { ticker: string; color: string; src: string }[],
): HomeDiscoverAsset[] {
  const pct = Math.floor(100 / rows.length);
  const remainder = 100 - pct * rows.length;
  return rows.map((row, i) => ({
    ticker: row.ticker,
    percent: i === 0 ? pct + remainder : pct,
    color: donutColor(row.color),
    src: row.src,
  }));
}

/** AI & Compute Index — ai-compute-index (ordinal 18 → Momentum Trend) */
const AI_COMPUTE = equalAssets([
  { ticker: "TAO", color: "#FFFFFF", src: "/images/assets/demo/crypto/tao.svg" },
  { ticker: "RENDER", color: "#C40000", src: "/images/assets/demo/crypto/rndr.png" },
  { ticker: "FET", color: "#1E3448", src: "/images/assets/demo/crypto/fet.jpg" },
  { ticker: "AKT", color: "#ED3524", src: "/images/assets/demo/crypto/akt.svg" },
  { ticker: "NVDA", color: "#76B900", src: "/images/assets/demo/stocks/nvda.svg" },
  { ticker: "MSFT", color: "#00A4EF", src: "/images/assets/demo/stocks/msft.svg" },
  { ticker: "GOOGL", color: "#4285F4", src: "/images/assets/demo/stocks/googl.svg" },
  { ticker: "AMZN", color: "#FF9900", src: "/images/assets/demo/stocks/amzn.svg" },
  { ticker: "PLTR", color: "#101010", src: "/images/assets/demo/stocks/pltr.png" },
  { ticker: "ARM", color: "#0091BD", src: "/images/assets/demo/stocks/arm.png" },
]);

/** Layer 1 Index — layer-1-index live app assets (ordinal 0 → Buy Fear / Sell Greed) */
const LAYER_1 = equalAssets([
  { ticker: "BTC", color: "#F7931A", src: "/images/assets/bitcoin.svg" },
  { ticker: "ETH", color: "#627EEA", src: "/images/assets/ethereum.svg" },
  { ticker: "XRP", color: "#23292F", src: "/images/assets/demo/crypto/xrp.svg" },
  { ticker: "BNB", color: "#F3BA2F", src: "/images/assets/demo/crypto/bnb.svg" },
  { ticker: "SOL", color: "#14F195", src: "/images/assets/solana.svg" },
  { ticker: "TRX", color: "#FF0013", src: "/images/assets/demo/crypto/trx.svg" },
  { ticker: "HYPE", color: "#97FCE4", src: "/images/assets/demo/crypto/hype.svg" },
  { ticker: "ADA", color: "#0033AD", src: "/images/assets/demo/crypto/ada.svg" },
  { ticker: "AVAX", color: "#E84142", src: "/images/assets/demo/crypto/avax.svg" },
  { ticker: "SUI", color: "#4DA2FF", src: "/images/assets/sui.svg" },
]);

/** DeFi Index — defi-index (ordinal 7 → Momentum Trend) */
const DEFI = equalAssets([
  { ticker: "LINK", color: "#2A5ADA", src: "/images/assets/chainlink.svg" },
  { ticker: "UNI", color: "#FF007A", src: "/images/assets/demo/crypto/uni.svg" },
  { ticker: "AAVE", color: "#B6509E", src: "/images/assets/demo/crypto/aave.svg" },
  { ticker: "HYPE", color: "#97FCE4", src: "/images/assets/demo/crypto/hype.svg" },
  { ticker: "ENA", color: "#5CE1E6", src: "/images/assets/demo/crypto/ena.png" },
  { ticker: "ONDO", color: "#183CFF", src: "/images/assets/ondo.svg" },
  { ticker: "JUP", color: "#00D18C", src: "/images/assets/demo/crypto/jup.png" },
  { ticker: "PENDLE", color: "#1A1A1A", src: "/images/assets/demo/crypto/pendle.png" },
  { ticker: "MORPHO", color: "#2470FF", src: "/images/assets/demo/crypto/morpho.png" },
  { ticker: "CRV", color: "#FF0000", src: "/images/assets/demo/crypto/crv.svg" },
]);

export const HOME_DISCOVER_PRODUCTS: HomeDiscoverProduct[] = [
  {
    id: "ai-compute-index",
    name: "AI & Compute",
    typeLabel: "Hybrid Index",
    typeClassName: "border-electric/40 bg-electric/10 text-electric",
    strategy: "Momentum Trend",
    assets: AI_COMPUTE,
  },
  {
    id: "layer-1-index",
    name: "Layer 1 Index",
    typeLabel: "Crypto Index",
    typeClassName: "border-cyan/40 bg-cyan/10 text-cyan",
    strategy: "Buy Fear / Sell Greed",
    assets: LAYER_1,
  },
  {
    id: "defi-index",
    name: "DeFi Index",
    typeLabel: "Crypto Index",
    typeClassName: "border-purple-bright/40 bg-purple/20 text-purple-bright",
    strategy: "Momentum Trend",
    assets: DEFI,
  },
];
