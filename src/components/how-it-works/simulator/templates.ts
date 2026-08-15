import { ASSET_CATALOG } from "./assetCatalog";
import { defaultHybridConfig, defaultsForStrategy } from "./strategies";
import type {
  DraftPortfolio,
  PortfolioType,
  SelectedAsset,
  StrategyId,
} from "./types";
import { emptyDraft } from "./types";

function pick(
  ticker: string,
  pct: number,
): SelectedAsset | null {
  const a = ASSET_CATALOG.find(
    (x) => x.ticker.toUpperCase() === ticker.toUpperCase(),
  );
  if (!a) return null;
  return { ...a, pct };
}

function assets(
  rows: { ticker: string; pct: number }[],
): SelectedAsset[] {
  return rows
    .map((r) => pick(r.ticker, r.pct))
    .filter((x): x is SelectedAsset => x !== null);
}

export type StarterTemplate = {
  id: string;
  title: string;
  blurb: string;
  build: () => DraftPortfolio;
};

function baseDraft(
  patch: Partial<DraftPortfolio> & {
    name: string;
    description: string;
    portfolioType: PortfolioType;
    strategyId: StrategyId;
    assets: SelectedAsset[];
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
    amountUsd: patch.amountUsd ?? 10000,
    editingId: null,
  };
}

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    id: "hybrid-wealth",
    title: "Hybrid Wealth",
    blurb: "Crypto + equities + gold with Fear & Greed automation.",
    build: () =>
      baseDraft({
        name: "Hybrid Wealth",
        description:
          "A balanced hybrid portfolio across crypto, technology equities, and gold with Fear & Greed DCA rules.",
        portfolioType: "Hybrid Portfolio",
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
        },
      }),
  },
  {
    id: "crypto-core",
    title: "Crypto Core",
    blurb: "Major crypto assets with RSI Daily/Weekly automation.",
    build: () =>
      baseDraft({
        name: "Crypto Core",
        description:
          "A concentrated crypto index focused on large-cap digital assets with RSI rules.",
        portfolioType: "Crypto Index",
        strategyId: "rsi",
        assets: assets([
          { ticker: "BTC", pct: 40 },
          { ticker: "ETH", pct: 30 },
          { ticker: "SOL", pct: 20 },
          { ticker: "LINK", pct: 10 },
        ]),
        strategyConfig: {
          rsiTimeframe: "Weekly",
          rsiBuyThreshold: 30,
          rsiSellThreshold: 70,
        },
      }),
  },
  {
    id: "tech-growth",
    title: "Tech Growth",
    blurb: "Leading technology equities with Momentum weekly trend rules.",
    build: () =>
      baseDraft({
        name: "Tech Growth",
        description:
          "A growth-oriented stock portfolio across major technology companies with momentum rules.",
        portfolioType: "Stocks Index",
        strategyId: "momentum",
        assets: assets([
          { ticker: "NVDA", pct: 30 },
          { ticker: "AAPL", pct: 25 },
          { ticker: "MSFT", pct: 25 },
          { ticker: "GOOGL", pct: 20 },
        ]),
        strategyConfig: {
          momentumTimeframe: "Weekly",
        },
      }),
  },
  {
    id: "balanced",
    title: "Balanced Portfolio",
    blurb: "Diversified mix with Buy Now plus optional TP/SL ready to configure.",
    build: () =>
      baseDraft({
        name: "Balanced Portfolio",
        description:
          "A diversified hybrid allocation across crypto, equities, and commodities.",
        portfolioType: "Hybrid Index",
        strategyId: "buy-now",
        assets: assets([
          { ticker: "BTC", pct: 20 },
          { ticker: "ETH", pct: 15 },
          { ticker: "AAPL", pct: 20 },
          { ticker: "AMZN", pct: 15 },
          { ticker: "XAU", pct: 15 },
          { ticker: "XAG", pct: 15 },
        ]),
        strategyConfig: {
          enableTakeProfit: true,
          enableStopLoss: true,
          takeProfitPct: 20,
          stopLossPct: 10,
        },
      }),
  },
];
