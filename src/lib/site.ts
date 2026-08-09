export const LOGO_DARK = "/logo/INDEXLA LOGO 2.png";
export const LOGO_LIGHT = "/logo/indexla tranparent logo background.jpg";

export const NAV_LINKS = [
  { href: "/investors", label: "Investors" },
  { href: "/creators", label: "Creators" },
  { href: "/strategies", label: "Strategies" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/faq", label: "FAQ" },
  { href: "/whitepaper", label: "Whitepaper" },
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
  aum: string;
  performance: string;
  performancePositive: boolean;
  allocation: { label: string; pct: number }[];
  activity: string;
};

/** Demo / illustrative values clearly labeled in UI — from approved home.md */
export const PORTFOLIOS: Portfolio[] = [
  {
    id: "ai-power-mix",
    name: "AI POWER MIX",
    type: "Hybrid Index",
    assets: ["tao", "near", "icp", "google", "nvidia"],
    strategy: "Buy Fear / Sell Greed",
    aum: "$4.2M",
    performance: "+18.4%",
    performancePositive: true,
    allocation: [
      { label: "Crypto AI", pct: 55 },
      { label: "Equities", pct: 45 },
    ],
    activity: "Rebalanced 2d ago",
  },
  {
    id: "mix-dream-team",
    name: "MIX DREAM TEAM",
    type: "Hybrid Portfolio",
    assets: ["btc", "sol", "eth", "sp500", "nvidia", "tao", "gold"],
    strategy: "RSI Weekly Signal",
    aum: "$12.8M",
    performance: "+24.1%",
    performancePositive: true,
    allocation: [
      { label: "Crypto", pct: 48 },
      { label: "Equities", pct: 32 },
      { label: "Commodities", pct: 20 },
    ],
    activity: "Signal fired 6h ago",
  },
  {
    id: "stocks-power-house",
    name: "STOCKS POWER HOUSE",
    type: "Stocks Portfolio",
    assets: ["nvidia", "google", "sp500", "microsoft", "apple"],
    strategy: "Momentum Shifts",
    aum: "$8.6M",
    performance: "+11.2%",
    performancePositive: true,
    allocation: [
      { label: "Tech", pct: 72 },
      { label: "Index", pct: 28 },
    ],
    activity: "Momentum update 1d ago",
  },
];

/** Depth: 0 = far (smaller/dimmer), 1 = mid, 2 = near (larger/brighter) */
export const HERO_ASSETS: {
  key: AssetKey;
  x: string;
  y: string;
  size: number;
  delay: number;
  depth: 0 | 1 | 2;
  mx?: string;
  my?: string;
  mSize?: number;
}[] = [
  // Outer ring — left
  { key: "btc", x: "6%", y: "14%", size: 72, delay: 0.04, depth: 2, mx: "8%", my: "8%", mSize: 40 },
  { key: "sp500", x: "3%", y: "34%", size: 54, delay: 0.1, depth: 1, mx: "28%", my: "4%", mSize: 32 },
  { key: "apple", x: "9%", y: "52%", size: 50, delay: 0.14, depth: 1, mx: "6%", my: "42%", mSize: 30 },
  { key: "nvidia", x: "12%", y: "72%", size: 62, delay: 0.18, depth: 2, mx: "14%", my: "78%", mSize: 36 },
  { key: "gold", x: "22%", y: "86%", size: 48, delay: 0.28, depth: 1, mx: "36%", my: "90%", mSize: 30 },
  // Outer ring — top / right
  { key: "eth", x: "22%", y: "6%", size: 58, delay: 0.08, depth: 2, mx: "72%", my: "6%", mSize: 34 },
  { key: "sol", x: "74%", y: "7%", size: 56, delay: 0.12, depth: 2, mx: "90%", my: "18%", mSize: 34 },
  { key: "bnb", x: "90%", y: "18%", size: 52, delay: 0.16, depth: 1, mx: "92%", my: "38%", mSize: 32 },
  { key: "nasdaq", x: "95%", y: "38%", size: 50, delay: 0.2, depth: 1, mx: "78%", my: "72%", mSize: 30 },
  { key: "tao", x: "88%", y: "56%", size: 58, delay: 0.22, depth: 2, mx: "90%", my: "58%", mSize: 34 },
  { key: "google", x: "78%", y: "74%", size: 52, delay: 0.24, depth: 1, mx: "62%", my: "84%", mSize: 32 },
  { key: "microsoft", x: "92%", y: "80%", size: 48, delay: 0.3, depth: 1, mx: "48%", my: "92%", mSize: 30 },
  { key: "silver", x: "58%", y: "88%", size: 46, delay: 0.32, depth: 0, mx: "22%", my: "92%", mSize: 28 },
  // Inner / mid depth extras for richer universe
  { key: "near", x: "28%", y: "22%", size: 42, delay: 0.2, depth: 0, mx: "18%", my: "22%", mSize: 26 },
  { key: "icp", x: "68%", y: "20%", size: 44, delay: 0.24, depth: 0, mx: "54%", my: "10%", mSize: 26 },
  { key: "chainlink", x: "32%", y: "78%", size: 44, delay: 0.26, depth: 0, mx: "84%", my: "82%", mSize: 26 },
  { key: "ondo", x: "64%", y: "68%", size: 42, delay: 0.28, depth: 0, mx: "40%", my: "76%", mSize: 26 },
  { key: "hype", x: "18%", y: "40%", size: 46, delay: 0.18, depth: 1, mx: "4%", my: "62%", mSize: 28 },
  { key: "peaq", x: "82%", y: "42%", size: 44, delay: 0.22, depth: 0, mx: "96%", my: "50%", mSize: 28 },
];

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
