/** Illustrative assets for How It Works product preview only — not a live support list. */

export type DemoAsset = {
  ticker: string;
  name: string;
  src: string;
};

export const DEMO_CRYPTO: DemoAsset[] = [
  { ticker: "BTC", name: "Bitcoin", src: "/images/assets/bitcoin.svg" },
  { ticker: "ETH", name: "Ethereum", src: "/images/assets/ethereum.svg" },
  { ticker: "BNB", name: "BNB", src: "/images/assets/demo/crypto/bnb.svg" },
  { ticker: "SOL", name: "Solana", src: "/images/assets/solana.svg" },
  { ticker: "XRP", name: "XRP", src: "/images/assets/demo/crypto/xrp.svg" },
  { ticker: "DOGE", name: "Dogecoin", src: "/images/assets/demo/crypto/doge.svg" },
  { ticker: "ADA", name: "Cardano", src: "/images/assets/demo/crypto/ada.svg" },
  { ticker: "AVAX", name: "Avalanche", src: "/images/assets/demo/crypto/avax.svg" },
  { ticker: "TRX", name: "TRON", src: "/images/assets/demo/crypto/trx.svg" },
  { ticker: "LINK", name: "Chainlink", src: "/images/assets/chainlink.svg" },
  { ticker: "DOT", name: "Polkadot", src: "/images/assets/demo/crypto/dot.svg" },
  { ticker: "POL", name: "Polygon", src: "/images/assets/demo/crypto/pol.svg" },
  { ticker: "LTC", name: "Litecoin", src: "/images/assets/demo/crypto/ltc.svg" },
  { ticker: "BCH", name: "Bitcoin Cash", src: "/images/assets/demo/crypto/bch.svg" },
  { ticker: "UNI", name: "Uniswap", src: "/images/assets/demo/crypto/uni.svg" },
  { ticker: "NEAR", name: "NEAR Protocol", src: "/images/assets/near-white.svg" },
  { ticker: "ICP", name: "Internet Computer", src: "/images/assets/icp.svg" },
  { ticker: "XLM", name: "Stellar", src: "/images/assets/demo/crypto/xlm.svg" },
  { ticker: "ATOM", name: "Cosmos", src: "/images/assets/demo/crypto/atom.svg" },
  { ticker: "APT", name: "Aptos", src: "/images/assets/demo/crypto/apt.png" },
  { ticker: "FIL", name: "Filecoin", src: "/images/assets/demo/crypto/fil.svg" },
  { ticker: "ARB", name: "Arbitrum", src: "/images/assets/demo/crypto/arb.png" },
  { ticker: "OP", name: "Optimism", src: "/images/assets/demo/crypto/op.png" },
  { ticker: "SUI", name: "Sui", src: "/images/assets/sui.svg" },
  { ticker: "PEPE", name: "Pepe", src: "/images/assets/demo/crypto/pepe.png" },
];

export const DEMO_STOCKS: DemoAsset[] = [
  { ticker: "AAPL", name: "Apple", src: "/images/assets/demo/stocks/aapl.svg" },
  { ticker: "MSFT", name: "Microsoft", src: "/images/assets/microsoft.svg" },
  { ticker: "NVDA", name: "NVIDIA", src: "/images/assets/nvidia.svg" },
  { ticker: "AMZN", name: "Amazon", src: "/images/assets/demo/stocks/amzn.svg" },
  { ticker: "GOOGL", name: "Alphabet", src: "/images/assets/demo/stocks/googl.svg" },
  { ticker: "META", name: "Meta", src: "/images/assets/demo/stocks/meta.svg" },
  { ticker: "TSLA", name: "Tesla", src: "/images/assets/demo/stocks/tsla.svg" },
  { ticker: "AVGO", name: "Broadcom", src: "/images/assets/demo/stocks/avgo.svg" },
  { ticker: "BRK.B", name: "Berkshire Hathaway", src: "/images/assets/demo/stocks/brkb.svg" },
  { ticker: "JPM", name: "JPMorgan Chase", src: "/images/assets/demo/stocks/jpm.svg" },
  { ticker: "V", name: "Visa", src: "/images/assets/demo/stocks/v.svg" },
  { ticker: "MA", name: "Mastercard", src: "/images/assets/demo/stocks/ma.svg" },
  { ticker: "WMT", name: "Walmart", src: "/images/assets/demo/stocks/wmt.svg" },
  { ticker: "COST", name: "Costco", src: "/images/assets/demo/stocks/cost.svg" },
  { ticker: "NFLX", name: "Netflix", src: "/images/assets/demo/stocks/nflx.svg" },
  { ticker: "AMD", name: "AMD", src: "/images/assets/demo/stocks/amd.svg" },
  { ticker: "ORCL", name: "Oracle", src: "/images/assets/demo/stocks/orcl.svg" },
  { ticker: "CRM", name: "Salesforce", src: "/images/assets/demo/stocks/crm.svg" },
  { ticker: "QCOM", name: "Qualcomm", src: "/images/assets/demo/stocks/qcom.svg" },
  { ticker: "INTC", name: "Intel", src: "/images/assets/demo/stocks/intc.svg" },
  { ticker: "KO", name: "Coca-Cola", src: "/images/assets/demo/stocks/ko.svg" },
  { ticker: "PEP", name: "PepsiCo", src: "/images/assets/demo/stocks/pep.svg" },
  { ticker: "DIS", name: "Disney", src: "/images/assets/demo/stocks/dis.svg" },
  { ticker: "MCD", name: "McDonald's", src: "/images/assets/demo/stocks/mcd.svg" },
  { ticker: "NKE", name: "Nike", src: "/images/assets/demo/stocks/nke.svg" },
];

export const DEMO_COMMODITIES: DemoAsset[] = [
  { ticker: "GOLD", name: "Gold", src: "/images/assets/gold.svg" },
  { ticker: "SILVER", name: "Silver", src: "/images/assets/demo/commodities/silver.svg" },
  { ticker: "COPPER", name: "Copper", src: "/images/assets/demo/commodities/copper.png" },
];

/** Illustrative How It Works target allocation (sums to 100). */
export const DEMO_TARGET_ALLOCATION: (DemoAsset & { pct: number })[] = [
  { ticker: "BTC", name: "Bitcoin", src: "/images/assets/demo/crypto/btc.svg", pct: 22 },
  { ticker: "ETH", name: "Ethereum", src: "/images/assets/demo/crypto/eth.svg", pct: 18 },
  { ticker: "SOL", name: "Solana", src: "/images/assets/solana.svg", pct: 10 },
  { ticker: "NVDA", name: "NVIDIA", src: "/images/assets/nvidia.svg", pct: 14 },
  { ticker: "AMZN", name: "Amazon", src: "/images/assets/demo/stocks/amzn.svg", pct: 12 },
  { ticker: "MSFT", name: "Microsoft", src: "/images/assets/demo/stocks/msft.svg", pct: 12 },
  { ticker: "GOLD", name: "Gold", src: "/images/assets/demo/commodities/gold.svg", pct: 7 },
  { ticker: "SILVER", name: "Silver", src: "/images/assets/demo/commodities/silver.svg", pct: 5 },
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
