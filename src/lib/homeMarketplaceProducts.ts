/**
 * Homepage Discover products — illustrative allocations for portfolio cards.
 * Strategies from strategyIdForIndexOrdinal at catalog build time.
 * Logos: verified local brand assets under /images/assets/.
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

function weightedAssets(
  rows: { ticker: string; percent: number; color: string; src: string }[],
): HomeDiscoverAsset[] {
  const total = rows.reduce((sum, row) => sum + row.percent, 0);
  if (total !== 100) {
    throw new Error(`Homepage portfolio allocations must total 100%, got ${total}`);
  }
  return rows.map((row) => ({
    ticker: row.ticker,
    percent: row.percent,
    color: donutColor(row.color),
    src: row.src,
  }));
}

/** AI & Compute Index — Momentum Trend */
const AI_COMPUTE = weightedAssets([
  { ticker: "NVDA", percent: 18, color: "#76B900", src: "/images/assets/demo/stocks/nvda.png" },
  { ticker: "MSFT", percent: 14, color: "#00A4EF", src: "/images/assets/demo/stocks/msft.png" },
  { ticker: "GOOGL", percent: 12, color: "#4285F4", src: "/images/assets/demo/stocks/googl.png" },
  { ticker: "TAO", percent: 10, color: "#FFFFFF", src: "/images/assets/demo/crypto/tao.png" },
  { ticker: "RENDER", percent: 9, color: "#C40000", src: "/images/assets/demo/crypto/rndr.png" },
  { ticker: "PLTR", percent: 9, color: "#101010", src: "/images/assets/demo/stocks/pltr.png" },
  { ticker: "AMZN", percent: 8, color: "#FF9900", src: "/images/assets/demo/stocks/amzn.png" },
  { ticker: "FET", percent: 7, color: "#1E3448", src: "/images/assets/demo/crypto/fet.png" },
  { ticker: "ARM", percent: 7, color: "#0091BD", src: "/images/assets/demo/stocks/arm.png" },
  { ticker: "AKT", percent: 6, color: "#ED3524", src: "/images/assets/demo/crypto/akt.png" },
]);

/** Layer 1 Index — Buy Fear / Sell Greed */
const LAYER_1 = weightedAssets([
  { ticker: "BTC", percent: 22, color: "#F7931A", src: "/images/assets/demo/crypto/btc.png" },
  { ticker: "ETH", percent: 18, color: "#627EEA", src: "/images/assets/demo/crypto/eth.png" },
  { ticker: "SOL", percent: 14, color: "#14F195", src: "/images/assets/demo/crypto/sol.png" },
  { ticker: "BNB", percent: 10, color: "#F3BA2F", src: "/images/assets/demo/crypto/bnb.png" },
  { ticker: "XRP", percent: 8, color: "#23292F", src: "/images/assets/demo/crypto/xrp.png" },
  { ticker: "AVAX", percent: 7, color: "#E84142", src: "/images/assets/demo/crypto/avax.png" },
  { ticker: "SUI", percent: 6, color: "#4DA2FF", src: "/images/assets/demo/crypto/sui.png" },
  { ticker: "ADA", percent: 5, color: "#0033AD", src: "/images/assets/demo/crypto/ada.png" },
  { ticker: "TRX", percent: 5, color: "#FF0013", src: "/images/assets/demo/crypto/trx.png" },
  { ticker: "HYPE", percent: 5, color: "#97FCE4", src: "/images/assets/demo/crypto/hype.png" },
]);

/** DeFi Index — Momentum Trend */
const DEFI = weightedAssets([
  { ticker: "LINK", percent: 15, color: "#2A5ADA", src: "/images/assets/demo/crypto/link.png" },
  { ticker: "AAVE", percent: 13, color: "#B6509E", src: "/images/assets/demo/crypto/aave.png" },
  { ticker: "UNI", percent: 12, color: "#FF007A", src: "/images/assets/demo/crypto/uni.png" },
  { ticker: "ONDO", percent: 10, color: "#183CFF", src: "/images/assets/demo/crypto/ondo.png" },
  { ticker: "JUP", percent: 9, color: "#00D18C", src: "/images/assets/demo/crypto/jup.png" },
  { ticker: "PENDLE", percent: 9, color: "#1A1A1A", src: "/images/assets/demo/crypto/pendle.png" },
  { ticker: "ENA", percent: 8, color: "#5CE1E6", src: "/images/assets/demo/crypto/ena.png" },
  { ticker: "MORPHO", percent: 8, color: "#2470FF", src: "/images/assets/demo/crypto/morpho.png" },
  { ticker: "HYPE", percent: 8, color: "#97FCE4", src: "/images/assets/demo/crypto/hype.png" },
  { ticker: "CRV", percent: 8, color: "#FF0000", src: "/images/assets/demo/crypto/crv.png" },
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
