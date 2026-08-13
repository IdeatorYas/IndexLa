/** Illustrative assets for How It Works product preview only — not a live support list. */

export type DemoAsset = {
  ticker: string;
  name: string;
  src: string;
};

/** Prefer local INDEXLA assets; otherwise cryptocurrency-icons color SVGs. */
const cryptoIcon = (symbol: string, local?: string) =>
  local ??
  `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${symbol}.svg`;

const stockLogo = (domain: string, local?: string) =>
  local ?? `https://logo.clearbit.com/${domain}`;

export const DEMO_CRYPTO: DemoAsset[] = [
  { ticker: "BTC", name: "Bitcoin", src: cryptoIcon("btc", "/images/assets/bitcoin.svg") },
  { ticker: "ETH", name: "Ethereum", src: cryptoIcon("eth", "/images/assets/ethereum.svg") },
  { ticker: "BNB", name: "BNB", src: cryptoIcon("bnb", "/images/assets/bnb.svg") },
  { ticker: "SOL", name: "Solana", src: cryptoIcon("sol", "/images/assets/solana.svg") },
  { ticker: "XRP", name: "XRP", src: cryptoIcon("xrp") },
  { ticker: "DOGE", name: "Dogecoin", src: cryptoIcon("doge") },
  { ticker: "ADA", name: "Cardano", src: cryptoIcon("ada") },
  { ticker: "AVAX", name: "Avalanche", src: cryptoIcon("avax") },
  { ticker: "TRX", name: "TRON", src: cryptoIcon("trx") },
  { ticker: "LINK", name: "Chainlink", src: cryptoIcon("link", "/images/assets/chainlink.svg") },
  { ticker: "DOT", name: "Polkadot", src: cryptoIcon("dot") },
  { ticker: "POL", name: "Polygon", src: cryptoIcon("matic") },
  { ticker: "LTC", name: "Litecoin", src: cryptoIcon("ltc") },
  { ticker: "BCH", name: "Bitcoin Cash", src: cryptoIcon("bch") },
  { ticker: "UNI", name: "Uniswap", src: cryptoIcon("uni") },
  { ticker: "NEAR", name: "NEAR", src: cryptoIcon("near", "/images/assets/near-white.svg") },
  { ticker: "ICP", name: "Internet Computer", src: cryptoIcon("icp", "/images/assets/icp.svg") },
  { ticker: "XLM", name: "Stellar", src: cryptoIcon("xlm") },
  { ticker: "ATOM", name: "Cosmos", src: cryptoIcon("atom") },
  { ticker: "APT", name: "Aptos", src: "https://assets.coingecko.com/coins/images/26455/small/aptos_round.png" },
  { ticker: "FIL", name: "Filecoin", src: cryptoIcon("fil") },
  { ticker: "ARB", name: "Arbitrum", src: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg" },
  { ticker: "OP", name: "Optimism", src: "https://assets.coingecko.com/coins/images/25244/small/Optimism.png" },
  { ticker: "SUI", name: "Sui", src: cryptoIcon("sui", "/images/assets/sui.svg") },
  { ticker: "PEPE", name: "Pepe", src: "https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg" },
];

export const DEMO_STOCKS: DemoAsset[] = [
  { ticker: "AAPL", name: "Apple", src: stockLogo("apple.com", "/images/assets/apple.svg") },
  { ticker: "MSFT", name: "Microsoft", src: stockLogo("microsoft.com", "/images/assets/microsoft.svg") },
  { ticker: "NVDA", name: "NVIDIA", src: stockLogo("nvidia.com", "/images/assets/nvidia.svg") },
  { ticker: "AMZN", name: "Amazon", src: stockLogo("amazon.com", "/images/assets/amazon.svg") },
  { ticker: "GOOGL", name: "Alphabet", src: stockLogo("google.com", "/images/assets/google.svg") },
  { ticker: "META", name: "Meta", src: stockLogo("meta.com", "/images/assets/meta.svg") },
  { ticker: "TSLA", name: "Tesla", src: stockLogo("tesla.com") },
  { ticker: "AVGO", name: "Broadcom", src: stockLogo("broadcom.com") },
  { ticker: "BRK.B", name: "Berkshire Hathaway", src: stockLogo("berkshirehathaway.com") },
  { ticker: "JPM", name: "JPMorgan", src: stockLogo("jpmorganchase.com") },
  { ticker: "V", name: "Visa", src: stockLogo("visa.com") },
  { ticker: "MA", name: "Mastercard", src: stockLogo("mastercard.com") },
  { ticker: "WMT", name: "Walmart", src: stockLogo("walmart.com") },
  { ticker: "COST", name: "Costco", src: stockLogo("costco.com") },
  { ticker: "NFLX", name: "Netflix", src: stockLogo("netflix.com") },
  { ticker: "AMD", name: "AMD", src: stockLogo("amd.com") },
  { ticker: "ORCL", name: "Oracle", src: stockLogo("oracle.com") },
  { ticker: "CRM", name: "Salesforce", src: stockLogo("salesforce.com") },
  { ticker: "QCOM", name: "Qualcomm", src: stockLogo("qualcomm.com") },
  { ticker: "INTC", name: "Intel", src: stockLogo("intel.com") },
  { ticker: "KO", name: "Coca-Cola", src: stockLogo("coca-cola.com") },
  { ticker: "PEP", name: "PepsiCo", src: stockLogo("pepsico.com") },
  { ticker: "DIS", name: "Disney", src: stockLogo("disney.com") },
  { ticker: "MCD", name: "McDonald's", src: stockLogo("mcdonalds.com") },
  { ticker: "NKE", name: "Nike", src: stockLogo("nike.com") },
];

export const DEMO_COMMODITIES: DemoAsset[] = [
  { ticker: "GOLD", name: "Gold", src: "/images/assets/gold.svg" },
  { ticker: "SILVER", name: "Silver", src: "/images/assets/silver.svg" },
  {
    ticker: "COPPER",
    name: "Copper",
    src: "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#b87333"/><text x="32" y="38" text-anchor="middle" fill="#fff" font-size="14" font-family="system-ui,sans-serif" font-weight="700">Cu</text></svg>`,
      ),
  },
];

export const DEMO_TARGET_ALLOCATION: {
  ticker: string;
  name: string;
  src: string;
  pct: number;
}[] = [
  { ticker: "BTC", name: "Bitcoin", src: "/images/assets/bitcoin.svg", pct: 20 },
  { ticker: "ETH", name: "Ethereum", src: "/images/assets/ethereum.svg", pct: 15 },
  { ticker: "SOL", name: "Solana", src: "/images/assets/solana.svg", pct: 10 },
  { ticker: "NVDA", name: "NVIDIA", src: "/images/assets/nvidia.svg", pct: 15 },
  { ticker: "AMZN", name: "Amazon", src: "/images/assets/amazon.svg", pct: 10 },
  { ticker: "MSFT", name: "Microsoft", src: "/images/assets/microsoft.svg", pct: 10 },
  { ticker: "GOLD", name: "Gold", src: "/images/assets/gold.svg", pct: 12 },
  { ticker: "SILVER", name: "Silver", src: "/images/assets/silver.svg", pct: 8 },
];

export const AUTOMATE_STRATEGIES = [
  {
    id: "standard-dca",
    title: "Standard DCA",
    lines: ["Choose timeframe: Daily / Weekly"],
  },
  {
    id: "smart-dca",
    title: "Smart DCA",
    lines: ["DCA in Fear", "DCA out in Greed"],
  },
  {
    id: "standard-trading",
    title: "Standard Trading",
    lines: ["Buy Now → Take Profit at %", "Buy Now → Stop Loss at %"],
  },
  {
    id: "smart-trading",
    title: "Smart Trading",
    lines: ["Buy when RSI is oversold", "Sell when RSI is overbought"],
  },
  {
    id: "rebalance",
    title: "Rebalance",
    lines: [
      "Set target allocation percentages. INDEXLA rebalances the portfolio when allocations move away from the preset targets.",
    ],
  },
] as const;
