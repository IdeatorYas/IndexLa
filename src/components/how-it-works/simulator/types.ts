export type AssetClass = "crypto" | "stock" | "commodity";

export type PortfolioType =
  | "Crypto Index"
  | "Stocks Index"
  | "Hybrid Index"
  | "Crypto Portfolio"
  | "Stock Portfolio"
  | "Hybrid Portfolio";

export const PORTFOLIO_TYPES: PortfolioType[] = [
  "Crypto Index",
  "Stocks Index",
  "Hybrid Index",
  "Crypto Portfolio",
  "Stock Portfolio",
  "Hybrid Portfolio",
];

export type WizardStep =
  | "create"
  | "assets"
  | "strategy"
  | "configure"
  | "permissions"
  | "amount"
  | "review"
  | "success";

export const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "create", label: "Create" },
  { id: "assets", label: "Assets" },
  { id: "strategy", label: "Strategy" },
  { id: "configure", label: "Configure" },
  { id: "permissions", label: "Permissions" },
  { id: "amount", label: "Impact" },
  { id: "review", label: "Review" },
];

export type StrategyId =
  | "buy-now"
  | "fear-greed"
  | "rsi"
  | "momentum"
  | "rebalancing"
  | "hybrid";

export type DcaFrequency = "Daily" | "Weekly";
export type RsiTimeframe = "Daily" | "Weekly";
export type MomentumTimeframe = "Daily" | "Weekly";
export type RebalanceFrequency =
  | "Weekly"
  | "Monthly"
  | "Quarterly"
  | "On Drift";

export type StrategyConfig = {
  enableTakeProfit?: boolean;
  enableStopLoss?: boolean;
  takeProfitPct?: number;
  stopLossPct?: number;
  fearThreshold?: number;
  greedThreshold?: number;
  dcaFrequency?: DcaFrequency;
  rsiBuyThreshold?: number;
  rsiSellThreshold?: number;
  rsiTimeframe?: RsiTimeframe;
  momentumTimeframe?: MomentumTimeframe;
  rebalanceFrequency?: RebalanceFrequency;
};

/** Extensible hybrid buy legs */
export type HybridBuyCondition = "buy-now";

/** Extensible hybrid sell legs */
export type HybridSellCondition =
  | "sell-greed"
  | "sell-rsi-overbought"
  | "sell-momentum-bearish";

export type SellExecutionMode = "direct" | "dca-out";

export type HybridConfig = {
  buyCondition: HybridBuyCondition;
  sellCondition: HybridSellCondition;
  sellExecution: SellExecutionMode;
  /** DCA OUT only — % of the selected asset/allocation sold per execution */
  dcaOutPct: number;
  dcaFrequency: DcaFrequency;
  greedThreshold?: number;
  rsiSellThreshold?: number;
  rsiTimeframe?: RsiTimeframe;
  momentumTimeframe?: MomentumTimeframe;
};

export type CatalogAsset = {
  key: string;
  ticker: string;
  name: string;
  type: AssetClass;
  src?: string;
  networks?: string[];
};

export type SelectedAsset = CatalogAsset & {
  pct: number;
};

export type PortfolioStatus = "active" | "paused" | "removed";

export type SimulatorPortfolio = {
  id: string;
  name: string;
  description: string;
  portfolioType: PortfolioType;
  assets: SelectedAsset[];
  strategyId: StrategyId;
  strategyConfig: StrategyConfig;
  hybrid: HybridConfig;
  authorized: boolean;
  amountUsd: number;
  status: PortfolioStatus;
  createdAt: number;
};

export type DraftPortfolio = {
  name: string;
  description: string;
  portfolioType: PortfolioType | "";
  assets: SelectedAsset[];
  strategyId: StrategyId | null;
  strategyConfig: StrategyConfig;
  hybrid: HybridConfig;
  authorized: boolean;
  amountUsd: number;
  editingId: string | null;
};

export function emptyHybrid(): HybridConfig {
  return {
    buyCondition: "buy-now",
    sellCondition: "sell-greed",
    sellExecution: "dca-out",
    dcaOutPct: 25,
    dcaFrequency: "Weekly",
    greedThreshold: 70,
    rsiSellThreshold: 70,
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}

export function emptyDraft(): DraftPortfolio {
  return {
    name: "",
    description: "",
    portfolioType: "",
    assets: [],
    strategyId: null,
    strategyConfig: {
      enableTakeProfit: false,
      enableStopLoss: false,
      takeProfitPct: 20,
      stopLossPct: 10,
      fearThreshold: 20,
      greedThreshold: 70,
      dcaFrequency: "Weekly",
      rsiBuyThreshold: 30,
      rsiSellThreshold: 70,
      rsiTimeframe: "Weekly",
      momentumTimeframe: "Weekly",
      rebalanceFrequency: "Monthly",
    },
    hybrid: emptyHybrid(),
    authorized: false,
    amountUsd: 10000,
    editingId: null,
  };
}

export function allocationTotal(assets: SelectedAsset[]): number {
  return Math.round(assets.reduce((sum, a) => sum + a.pct, 0) * 100) / 100;
}

/** Sell Directly always 100%; DCA OUT uses configured % of the asset/allocation */
export function resolveSellPct(hybrid: HybridConfig): number {
  if (hybrid.sellExecution === "direct") return 100;
  return hybrid.dcaOutPct;
}
