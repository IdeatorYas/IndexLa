import {
  DEMO_COMMODITIES,
  DEMO_CRYPTO,
  DEMO_STOCKS,
} from "@/lib/howItWorksDemoAssets";
import { EXTRA_CRYPTO_LOGOS } from "./extraCryptoLogos";
import type { CatalogAsset } from "./types";

const CRYPTO_NETWORKS: Record<string, string[]> = {
  BTC: ["Bitcoin"],
  ETH: ["Ethereum"],
  BNB: ["BNB Chain"],
  SOL: ["Solana"],
  XRP: ["XRP Ledger"],
  AVAX: ["Avalanche"],
  DOT: ["Polkadot"],
  POL: ["Polygon", "Ethereum"],
  ARB: ["Arbitrum"],
  OP: ["Optimism"],
  SUI: ["Sui"],
  NEAR: ["NEAR"],
  ICP: ["Internet Computer"],
  ATOM: ["Cosmos"],
  APT: ["Aptos"],
  LINK: ["Ethereum", "Multiple"],
  UNI: ["Ethereum"],
};

const EXTRA_CRYPTO: { ticker: string; name: string; networks?: string[] }[] = [
  { ticker: "TON", name: "Toncoin" },
  { ticker: "SHIB", name: "Shiba Inu", networks: ["Ethereum"] },
  { ticker: "LEO", name: "UNUS SED LEO" },
  { ticker: "DAI", name: "Dai", networks: ["Ethereum"] },
  { ticker: "HBAR", name: "Hedera" },
  { ticker: "CRO", name: "Cronos" },
  { ticker: "VET", name: "VeChain" },
  { ticker: "MNT", name: "Mantle" },
  { ticker: "RENDER", name: "Render", networks: ["Ethereum", "Solana"] },
  { ticker: "IMX", name: "Immutable", networks: ["Ethereum"] },
  { ticker: "INJ", name: "Injective" },
  { ticker: "GRT", name: "The Graph", networks: ["Ethereum"] },
  { ticker: "ALGO", name: "Algorand" },
  { ticker: "FTM", name: "Fantom" },
  { ticker: "THETA", name: "Theta Network" },
  { ticker: "XTZ", name: "Tezos" },
  { ticker: "EOS", name: "EOS" },
  { ticker: "FLOW", name: "Flow" },
  { ticker: "AAVE", name: "Aave", networks: ["Ethereum"] },
  { ticker: "MKR", name: "Maker", networks: ["Ethereum"] },
  { ticker: "SNX", name: "Synthetix", networks: ["Ethereum"] },
  { ticker: "CRV", name: "Curve", networks: ["Ethereum"] },
  { ticker: "LDO", name: "Lido DAO", networks: ["Ethereum"] },
  { ticker: "RUNE", name: "THORChain" },
  { ticker: "EGLD", name: "MultiversX" },
  { ticker: "SAND", name: "The Sandbox", networks: ["Ethereum"] },
  { ticker: "MANA", name: "Decentraland", networks: ["Ethereum"] },
  { ticker: "AXS", name: "Axie Infinity", networks: ["Ethereum"] },
  { ticker: "CHZ", name: "Chiliz" },
  { ticker: "ENJ", name: "Enjin Coin", networks: ["Ethereum"] },
  { ticker: "GALA", name: "Gala", networks: ["Ethereum"] },
  { ticker: "APE", name: "ApeCoin", networks: ["Ethereum"] },
  { ticker: "BLUR", name: "Blur", networks: ["Ethereum"] },
  { ticker: "COMP", name: "Compound", networks: ["Ethereum"] },
  { ticker: "1INCH", name: "1inch", networks: ["Ethereum"] },
  { ticker: "BAT", name: "Basic Attention Token", networks: ["Ethereum"] },
  { ticker: "ZRX", name: "0x", networks: ["Ethereum"] },
  { ticker: "ENS", name: "Ethereum Name Service", networks: ["Ethereum"] },
  { ticker: "LRC", name: "Loopring", networks: ["Ethereum"] },
  { ticker: "KAVA", name: "Kava" },
  { ticker: "ZEC", name: "Zcash" },
  { ticker: "DASH", name: "Dash" },
  { ticker: "XMR", name: "Monero" },
  { ticker: "ETC", name: "Ethereum Classic" },
  { ticker: "KSM", name: "Kusama" },
  { ticker: "WAVES", name: "Waves" },
  { ticker: "QTUM", name: "Qtum" },
  { ticker: "NEO", name: "Neo" },
  { ticker: "IOTA", name: "IOTA" },
  { ticker: "ZIL", name: "Zilliqa" },
  { ticker: "ICX", name: "ICON" },
  { ticker: "ONT", name: "Ontology" },
  { ticker: "OMG", name: "OMG Network", networks: ["Ethereum"] },
  { ticker: "ANKR", name: "Ankr", networks: ["Ethereum"] },
  { ticker: "SKL", name: "SKALE", networks: ["Ethereum"] },
  { ticker: "STORJ", name: "Storj", networks: ["Ethereum"] },
  { ticker: "AUDIO", name: "Audius", networks: ["Ethereum", "Solana"] },
  { ticker: "YFI", name: "yearn.finance", networks: ["Ethereum"] },
  { ticker: "SUSHI", name: "SushiSwap", networks: ["Ethereum"] },
  { ticker: "BAL", name: "Balancer", networks: ["Ethereum"] },
  { ticker: "REN", name: "Ren", networks: ["Ethereum"] },
  { ticker: "KNC", name: "Kyber Network", networks: ["Ethereum"] },
  { ticker: "CELO", name: "Celo" },
  { ticker: "ONE", name: "Harmony" },
  { ticker: "HOT", name: "Holo" },
  { ticker: "IOTX", name: "IoTeX" },
  { ticker: "SC", name: "Siacoin" },
  { ticker: "DGB", name: "DigiByte" },
  { ticker: "RVN", name: "Ravencoin" },
  { ticker: "NEXO", name: "Nexo", networks: ["Ethereum"] },
  { ticker: "CAKE", name: "PancakeSwap", networks: ["BNB Chain"] },
  { ticker: "TWT", name: "Trust Wallet Token", networks: ["BNB Chain"] },
  { ticker: "WOO", name: "WOO", networks: ["Ethereum"] },
  { ticker: "GMX", name: "GMX", networks: ["Arbitrum"] },
  { ticker: "DYDX", name: "dYdX" },
  { ticker: "JUP", name: "Jupiter", networks: ["Solana"] },
  { ticker: "PYTH", name: "Pyth Network", networks: ["Solana"] },
  { ticker: "WIF", name: "dogwifhat", networks: ["Solana"] },
  { ticker: "BONK", name: "Bonk", networks: ["Solana"] },
  { ticker: "TAO", name: "Bittensor" },
  { ticker: "HYPE", name: "Hyperliquid" },
  { ticker: "PEAQ", name: "peaq" },
  { ticker: "ONDO", name: "Ondo", networks: ["Ethereum"] },
  { ticker: "VELO", name: "Velodrome", networks: ["Optimism"] },
  { ticker: "CFG", name: "Centrifuge", networks: ["Ethereum", "Polkadot"] },
  { ticker: "MPL", name: "Maple Finance", networks: ["Ethereum"] },
  { ticker: "PLUME", name: "Plume", networks: ["Ethereum"] },
];

const STOCK_NETWORKS = ["Tokenized · Multi-chain"];
const COMMODITY_NETWORKS = ["Tokenized · Multi-chain"];

function cryptoFromDemo(): CatalogAsset[] {
  return DEMO_CRYPTO.map((a) => ({
    key: `crypto-${a.ticker.toLowerCase()}`,
    ticker: a.ticker,
    name: a.name,
    type: "crypto" as const,
    src: a.src,
    networks: CRYPTO_NETWORKS[a.ticker] ?? ["Multi-chain"],
  }));
}

function cryptoExtras(): CatalogAsset[] {
  return EXTRA_CRYPTO.map((a) => ({
    key: `crypto-${a.ticker.toLowerCase()}`,
    ticker: a.ticker,
    name: a.name,
    type: "crypto" as const,
    src: EXTRA_CRYPTO_LOGOS[a.ticker],
    networks: a.networks ?? ["Multi-chain"],
  }));
}

function stocks(): CatalogAsset[] {
  const base = DEMO_STOCKS.map((a) => ({
    key: `stock-${a.ticker.toLowerCase().replace(".", "")}`,
    ticker: a.ticker,
    name: a.name,
    type: "stock" as const,
    src: a.src,
    networks: STOCK_NETWORKS,
  }));
  const sp500: CatalogAsset = {
    key: "stock-sp500",
    ticker: "SPX",
    name: "S&P 500",
    type: "stock",
    src: "/images/assets/sp500.svg",
    networks: STOCK_NETWORKS,
  };
  return [...base, sp500];
}

function commodities(): CatalogAsset[] {
  return DEMO_COMMODITIES.map((a) => ({
    key: `commodity-${a.ticker.toLowerCase()}`,
    ticker: a.ticker === "GOLD" ? "XAU" : a.ticker === "SILVER" ? "XAG" : a.ticker,
    name: a.name,
    type: "commodity" as const,
    src: a.src,
    networks: COMMODITY_NETWORKS,
  }));
}

export const ASSET_CATALOG: CatalogAsset[] = [
  ...cryptoFromDemo(),
  ...cryptoExtras(),
  ...stocks(),
  ...commodities(),
];

export function filterCatalog(
  query: string,
  typeFilter?: "all" | "crypto" | "stock" | "commodity",
): CatalogAsset[] {
  const q = query.trim().toLowerCase();
  return ASSET_CATALOG.filter((a) => {
    if (typeFilter && typeFilter !== "all" && a.type !== typeFilter) return false;
    if (!q) return true;
    const goldAlias =
      a.ticker === "XAU" && (q === "gold" || q.includes("gold") || q === "xau");
    const silverAlias =
      a.ticker === "XAG" &&
      (q === "silver" || q.includes("silver") || q === "xag");
    return (
      a.ticker.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      goldAlias ||
      silverAlias
    );
  });
}
