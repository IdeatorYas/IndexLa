import { ASSET_CATALOG } from "./assetCatalog";
import { defaultHybridConfig, defaultsForStrategy } from "./strategies";
import type {
  DraftPortfolio,
  HybridConfig,
  PortfolioType,
  SelectedAsset,
  StrategyConfig,
  StrategyId,
} from "./types";
import { emptyDraft } from "./types";

function pick(ticker: string, pct: number): SelectedAsset | null {
  const a = ASSET_CATALOG.find(
    (x) => x.ticker.toUpperCase() === ticker.toUpperCase(),
  );
  if (!a) return null;
  return { ...a, pct };
}

function assets(rows: { ticker: string; pct: number }[]): SelectedAsset[] {
  return rows
    .map((r) => pick(r.ticker, r.pct))
    .filter((x): x is SelectedAsset => x !== null);
}

export type StarterTemplate = {
  id: string;
  title: string;
  blurb: string;
  strategyLabel: string;
  build: () => DraftPortfolio;
};

function baseDraft(
  patch: Partial<DraftPortfolio> & {
    name: string;
    description: string;
    portfolioType: PortfolioType;
    strategyId: StrategyId;
    assets: SelectedAsset[];
    strategyConfig?: Partial<StrategyConfig>;
    hybrid?: HybridConfig;
  },
): DraftPortfolio {
  const d = emptyDraft();
  const strategyDefaults = defaultsForStrategy(patch.strategyId);
  return {
    ...d,
    ...patch,
    strategyConfig: {
      ...d.strategyConfig,
      ...strategyDefaults,
      ...patch.strategyConfig,
    },
    hybrid: patch.hybrid ?? defaultHybridConfig(),
    authorized: false,
    transactionLimitUsd: 5000,
    amountUsd: patch.amountUsd ?? 0,
    editingId: null,
  };
}

/**
 * Optional starter templates — each demonstrates a different existing INDEXLA strategy.
 * Not auto-selected. Strategy and all fields remain fully editable after selection.
 */
export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "ai-global-allocation",
    title: "AI Global Allocation Index",
    blurb: "AI infrastructure, technology, and decentralized networks.",
    strategyLabel: "Momentum · Weekly DCA",
    build: () =>
      baseDraft({
        name: "AI Global Allocation Index",
        description:
          "AI infrastructure, technology, and decentralized networks.",
        portfolioType: "Hybrid Index",
        strategyId: "momentum",
        assets: assets([
          { ticker: "NVDA", pct: 17 },
          { ticker: "TAO", pct: 17 },
          { ticker: "GOOGL", pct: 17 },
          { ticker: "LINK", pct: 16 },
          { ticker: "NEAR", pct: 16 },
          { ticker: "ICP", pct: 17 },
        ]),
        strategyConfig: {
          momentumTimeframe: "Weekly",
          momentumMode: "trend-dca",
          dcaInPct: 10,
          dcaOutPct: 10,
        },
      }),
  },
  {
    id: "digital-tech-growth",
    title: "Digital Tech Growth Index",
    blurb:
      "Digital assets and leading technology companies built for long-term growth.",
    strategyLabel: "RSI · Weekly",
    build: () =>
      baseDraft({
        name: "Digital Tech Growth Index",
        description:
          "Digital assets and leading technology companies built for long-term growth.",
        portfolioType: "Hybrid Index",
        strategyId: "rsi",
        assets: assets([
          { ticker: "BTC", pct: 15 },
          { ticker: "ETH", pct: 15 },
          { ticker: "SUI", pct: 14 },
          { ticker: "NVDA", pct: 14 },
          { ticker: "MSFT", pct: 14 },
          { ticker: "GOOGL", pct: 14 },
          { ticker: "AMD", pct: 14 },
        ]),
        strategyConfig: {
          rsiTimeframe: "Weekly",
          rsiBuyThreshold: 30,
          rsiSellThreshold: 70,
          dcaInPct: 10,
          dcaOutPct: 10,
        },
      }),
  },
  {
    id: "global-macro",
    title: "Global Macro Index",
    blurb: "Diversified exposure across crypto, equities, and commodities.",
    strategyLabel: "Fear & Greed · Weekly DCA",
    build: () =>
      baseDraft({
        name: "Global Macro Index",
        description:
          "Diversified exposure across crypto, equities, and commodities.",
        portfolioType: "Hybrid Index",
        strategyId: "fear-greed",
        assets: assets([
          { ticker: "BTC", pct: 20 },
          { ticker: "ETH", pct: 20 },
          { ticker: "SPX", pct: 20 },
          { ticker: "XAU", pct: 20 },
          { ticker: "XAG", pct: 20 },
        ]),
        strategyConfig: {
          fearThreshold: 20,
          greedThreshold: 70,
          dcaFrequency: "Weekly",
          dcaInPct: 10,
          dcaOutPct: 10,
        },
      }),
  },
  {
    id: "defi-leaders",
    title: "DeFi Leaders Index",
    blurb:
      "Leading DeFi protocols across trading, lending, liquidity, and decentralized finance.",
    strategyLabel: "Buy Now · Take Profit",
    build: () =>
      baseDraft({
        name: "DeFi Leaders Index",
        description:
          "Leading DeFi protocols across trading, lending, liquidity, and decentralized finance.",
        portfolioType: "Crypto Index",
        strategyId: "buy-now",
        assets: assets([
          { ticker: "UNI", pct: 20 },
          { ticker: "AAVE", pct: 20 },
          { ticker: "JUP", pct: 20 },
          { ticker: "VELO", pct: 20 },
          { ticker: "MKR", pct: 20 },
        ]),
        strategyConfig: {
          enableTakeProfit: true,
          enableStopLoss: true,
          takeProfitPct: 20,
          stopLossPct: 10,
        },
      }),
  },
  {
    id: "blockchain-leaders",
    title: "Blockchain Leaders Portfolio",
    blurb:
      "A focused portfolio of major blockchain networks and infrastructure assets.",
    strategyLabel: "Buy Now → Momentum DCA OUT",
    build: () =>
      baseDraft({
        name: "Blockchain Leaders Portfolio",
        description:
          "A focused portfolio of major blockchain networks and infrastructure assets.",
        portfolioType: "Crypto Portfolio",
        strategyId: "momentum",
        assets: assets([
          { ticker: "BTC", pct: 20 },
          { ticker: "ETH", pct: 20 },
          { ticker: "SOL", pct: 15 },
          { ticker: "SUI", pct: 15 },
          { ticker: "LINK", pct: 15 },
          { ticker: "AVAX", pct: 15 },
        ]),
        strategyConfig: {
          momentumTimeframe: "Weekly",
          momentumMode: "buy-now-dca-out",
          dcaOutPct: 10,
          dcaInPct: 10,
        },
      }),
  },
  {
    id: "rwa-crypto",
    title: "RWA Crypto Index",
    blurb:
      "Crypto assets focused on tokenized real-world assets and on-chain financial infrastructure.",
    strategyLabel: "Hybrid · Buy Now → Sell on Greed",
    build: () =>
      baseDraft({
        name: "RWA Crypto Index",
        description:
          "Crypto assets focused on tokenized real-world assets and on-chain financial infrastructure.",
        portfolioType: "Crypto Index",
        strategyId: "hybrid",
        assets: assets([
          { ticker: "ONDO", pct: 25 },
          { ticker: "CFG", pct: 25 },
          { ticker: "MPL", pct: 25 },
          { ticker: "PLUME", pct: 25 },
        ]),
        hybrid: {
          ...defaultHybridConfig(),
          buyCondition: "buy-now",
          sellCondition: "sell-greed",
          sellExecution: "dca-out",
          dcaOutPct: 20,
          dcaFrequency: "Weekly",
          greedThreshold: 70,
        },
      }),
  },
];
