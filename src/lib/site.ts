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
    name: "AI Infrastructure Index",
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
    name: "Diversified Macro Portfolio",
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
    name: "Big Tech Momentum",
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
