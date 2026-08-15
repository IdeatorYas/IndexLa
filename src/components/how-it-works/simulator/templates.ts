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
  /** Short strategy label shown on the template card */
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
 * Strategy remains fully editable after selection (not locked).
 */
export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "ai-global-allocation",
    title: "AI Global Allocation Index",
    blurb: "Global tech + AI leaders. Starting point — edit anytime.",
    strategyLabel: "Momentum · Weekly DCA",
    build: () =>
      baseDraft({
        name: "AI Global Allocation Index",
        description:
          "A global allocation across AI and technology leaders. Default strategy: Momentum — weekly trend change with DCA IN / DCA OUT. You can switch strategies anytime.",
        portfolioType: "Hybrid Index",
        strategyId: "momentum",
        assets: assets([
          { ticker: "NVDA", pct: 25 },
          { ticker: "MSFT", pct: 20 },
          { ticker: "GOOGL", pct: 15 },
          { ticker: "AAPL", pct: 15 },
          { ticker: "BTC", pct: 15 },
          { ticker: "ETH", pct: 10 },
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
    blurb: "Growth equities with RSI rules. Starting point — edit anytime.",
    strategyLabel: "RSI · Weekly",
    build: () =>
      baseDraft({
        name: "Digital Tech Growth Index",
        description:
          "A growth-focused technology equity index. Default strategy: RSI Weekly — Buy Oversold / Sell Overbought with DCA. You can switch strategies anytime.",
        portfolioType: "Stocks Index",
        strategyId: "rsi",
        assets: assets([
          { ticker: "NVDA", pct: 30 },
          { ticker: "AAPL", pct: 25 },
          { ticker: "MSFT", pct: 25 },
          { ticker: "GOOGL", pct: 20 },
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
    blurb: "Crypto, equities, and gold. Starting point — edit anytime.",
    strategyLabel: "Fear & Greed · Weekly DCA",
    build: () =>
      baseDraft({
        name: "Global Macro Index",
        description:
          "A macro hybrid across crypto, equities, and gold. Default strategy: Buy Fear → Sell Greed with Weekly DCA IN / DCA OUT. You can switch strategies anytime.",
        portfolioType: "Hybrid Index",
        strategyId: "fear-greed",
        assets: assets([
          { ticker: "BTC", pct: 25 },
          { ticker: "ETH", pct: 20 },
          { ticker: "NVDA", pct: 20 },
          { ticker: "MSFT", pct: 15 },
          { ticker: "XAU", pct: 20 },
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
    blurb: "Leading DeFi protocols. Starting point — edit anytime.",
    strategyLabel: "Buy Now · TP/SL",
    build: () =>
      baseDraft({
        name: "DeFi Leaders Index",
        description:
          "A concentrated DeFi leaders index. Default strategy: Buy Now with Take Profit and Stop Loss configured. You can switch strategies anytime.",
        portfolioType: "Crypto Index",
        strategyId: "buy-now",
        assets: assets([
          { ticker: "ETH", pct: 35 },
          { ticker: "AAVE", pct: 20 },
          { ticker: "MKR", pct: 15 },
          { ticker: "LDO", pct: 15 },
          { ticker: "LINK", pct: 15 },
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
    blurb: "Major L1s with exit rules. Starting point — edit anytime.",
    strategyLabel: "Buy Now → Momentum DCA OUT",
    build: () =>
      baseDraft({
        name: "Blockchain Leaders Portfolio",
        description:
          "A portfolio of leading blockchain assets. Default strategy: Buy Now → DCA OUT when Momentum turns Bearish (Weekly). You can switch strategies anytime.",
        portfolioType: "Crypto Portfolio",
        strategyId: "momentum",
        assets: assets([
          { ticker: "BTC", pct: 40 },
          { ticker: "ETH", pct: 30 },
          { ticker: "SOL", pct: 20 },
          { ticker: "AVAX", pct: 10 },
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
    blurb: "RWA + majors hybrid. Starting point — edit anytime.",
    strategyLabel: "Hybrid · Sell on Greed",
    build: () =>
      baseDraft({
        name: "RWA Crypto Index",
        description:
          "A real-world assets and crypto hybrid. Default strategy: Buy Now → Sell on Greed with DCA OUT. You can switch strategies anytime.",
        portfolioType: "Hybrid Portfolio",
        strategyId: "hybrid",
        assets: assets([
          { ticker: "BTC", pct: 30 },
          { ticker: "ETH", pct: 25 },
          { ticker: "ONDO", pct: 20 },
          { ticker: "XAU", pct: 15 },
          { ticker: "LINK", pct: 10 },
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
