export const LOGO_DARK = "/logo/indexla-logo-transparent.png";
export const LOGO_TRANSPARENT = "/logo/indexla-logo-transparent.png";
/** Transparent high-quality INDEXLA logo for deck / print (RGBA / palette+tRNS) */
export const LOGO_DECK = "/logo/indexla-logo-transparent.png";
export const LOGO_LIGHT = "/logo/indexla tranparent logo background.jpg";

export type NavChildLink = {
  href: string;
  label: string;
};

export type NavLink = {
  href: string;
  label: string;
  children?: readonly NavChildLink[];
};

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/investors", label: "Investors" },
  { href: "/creators", label: "Creators" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/stable-club", label: "Stable Club" },
  { href: "/degen-club", label: "Degen Club" },
  { href: "/faq", label: "FAQ" },
  {
    href: "/whitepaper",
    label: "Whitepaper",
    children: [
      { href: "/whitepaper", label: "Whitepaper" },
      { href: "/whitepaper/technical", label: "Technical Paper" },
    ],
  },
] as const;

export type AssetKey =
  | "btc"
  | "eth"
  | "sol"
  | "bnb"
  | "tao"
  | "apple"
  | "nvidia"
  | "google"
  | "microsoft"
  | "sp500"
  | "nasdaq"
  | "gold"
  | "silver"
  | "near"
  | "icp"
  | "hype"
  | "peaq"
  | "chainlink"
  | "ondo";

export const ASSETS: Record<
  AssetKey,
  { name: string; src: string; ticker: string }
> = {
  btc: { name: "Bitcoin", src: "/images/assets/bitcoin.svg", ticker: "BTC" },
  eth: { name: "Ethereum", src: "/images/assets/ethereum.svg", ticker: "ETH" },
  sol: { name: "Solana", src: "/images/assets/solana.svg", ticker: "SOL" },
  bnb: { name: "BNB", src: "/images/assets/bnb.svg", ticker: "BNB" },
  tao: { name: "Bittensor", src: "/images/assets/bittensor.svg", ticker: "TAO" },
  apple: { name: "Apple", src: "/images/assets/apple.svg", ticker: "AAPL" },
  nvidia: { name: "NVIDIA", src: "/images/assets/nvidia.svg", ticker: "NVDA" },
  google: { name: "Google", src: "/images/assets/google.svg", ticker: "GOOGL" },
  microsoft: {
    name: "Microsoft",
    src: "/images/assets/microsoft.svg",
    ticker: "MSFT",
  },
  sp500: { name: "S&P 500", src: "/images/assets/sp500.svg", ticker: "SPX" },
  nasdaq: { name: "Nasdaq", src: "/images/assets/nasdaq.svg", ticker: "NDX" },
  gold: { name: "Gold", src: "/images/assets/gold.svg", ticker: "XAU" },
  silver: { name: "Silver", src: "/images/assets/silver.svg", ticker: "XAG" },
  near: { name: "NEAR", src: "/images/assets/near-white.svg", ticker: "NEAR" },
  icp: { name: "ICP", src: "/images/assets/icp.svg", ticker: "ICP" },
  hype: { name: "HYPE", src: "/images/assets/hype.svg", ticker: "HYPE" },
  peaq: { name: "PEAQ", src: "/images/assets/peaq.svg", ticker: "PEAQ" },
  chainlink: {
    name: "Chainlink",
    src: "/images/assets/chainlink.svg",
    ticker: "LINK",
  },
  ondo: { name: "ONDO", src: "/images/assets/ondo.svg", ticker: "ONDO" },
};

export type PortfolioType =
  | "Hybrid Index"
  | "Hybrid Portfolio"
  | "Stocks Portfolio"
  | "Crypto Portfolio";

export type Portfolio = {
  id: string;
  name: string;
  type: PortfolioType;
  assets: AssetKey[];
  strategy: string;
  /** Per-asset weights derived from approved category totals (sum = 100). */
  assetAllocation: { key: AssetKey; pct: number }[];
};

/**
 * Illustrative portfolios — names/assets/strategies from approved home content.
 * Per-asset weights preserve existing category totals:
 * AI 55/45 · Macro 48/32/20 · Big Tech 72/28 (evenly within each category).
 */
export const PORTFOLIOS: Portfolio[] = [
  {
    id: "ai-power-mix",
    name: "AI Infrastructure Index",
    type: "Hybrid Index",
    assets: ["tao", "near", "icp", "google", "nvidia"],
    strategy: "Buy Fear / Sell Greed",
    assetAllocation: [
      { key: "tao", pct: 18 },
      { key: "near", pct: 18 },
      { key: "icp", pct: 19 },
      { key: "google", pct: 22 },
      { key: "nvidia", pct: 23 },
    ],
  },
  {
    id: "mix-dream-team",
    name: "Diversified Macro Portfolio",
    type: "Hybrid Portfolio",
    assets: ["btc", "sol", "eth", "sp500", "nvidia", "tao", "gold"],
    strategy: "RSI Weekly Signal",
    assetAllocation: [
      { key: "btc", pct: 12 },
      { key: "sol", pct: 12 },
      { key: "eth", pct: 12 },
      { key: "tao", pct: 12 },
      { key: "sp500", pct: 16 },
      { key: "nvidia", pct: 16 },
      { key: "gold", pct: 20 },
    ],
  },
  {
    id: "stocks-power-house",
    name: "Big Tech Momentum",
    type: "Stocks Portfolio",
    assets: ["nvidia", "google", "sp500", "microsoft", "apple"],
    strategy: "Momentum Shifts",
    assetAllocation: [
      { key: "nvidia", pct: 18 },
      { key: "google", pct: 18 },
      { key: "microsoft", pct: 18 },
      { key: "apple", pct: 18 },
      { key: "sp500", pct: 28 },
    ],
  },
];

/** Dominant brand colors for portfolio donut segments. */
export const ASSET_BRAND_COLORS: Record<AssetKey, string> = {
  btc: "#F7931A",
  eth: "#627EEA",
  sol: "#9945FF",
  bnb: "#F3BA2F",
  tao: "#24EE89",
  apple: "#A2AAAD",
  nvidia: "#76B900",
  google: "#4285F4",
  microsoft: "#00A4EF",
  sp500: "#3B82F6",
  nasdaq: "#0A1F44",
  gold: "#D4AF37",
  silver: "#C0C0C0",
  near: "#00C08B",
  icp: "#29ABE2",
  hype: "#97FCE4",
  peaq: "#5B8DEF",
  chainlink: "#2A5ADA",
  ondo: "#1A3CFF",
};
export const TYPE_STYLES: Record<
  PortfolioType,
  { label: string; className: string }
> = {
  "Hybrid Index": {
    label: "Hybrid Index",
    className: "border-electric/40 bg-electric/10 text-electric",
  },
  "Hybrid Portfolio": {
    label: "Hybrid Portfolio",
    className: "border-purple-bright/40 bg-purple/20 text-purple-bright",
  },
  "Stocks Portfolio": {
    label: "Stocks Portfolio",
    className: "border-blue/40 bg-blue/15 text-blue",
  },
  "Crypto Portfolio": {
    label: "Crypto Portfolio",
    className: "border-cyan/40 bg-cyan/10 text-cyan",
  },
};
