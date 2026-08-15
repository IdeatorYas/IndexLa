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
  { id: "amount", label: "Amount" },
  { id: "review", label: "Review" },
];

export type StrategyId =
  | "buy-now"
  | "take-profit"
  | "stop-loss"
  | "buy-fear"
  | "sell-greed"
  | "buy-rsi"
  | "sell-rsi"
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
  takeProfitPct?: number;
  stopLossPct?: number;
  fearThreshold?: number;
  greedThreshold?: number;
  dcaFrequency?: DcaFrequency;
  rsiThreshold?: number;
  rsiTimeframe?: RsiTimeframe;
  momentumTimeframe?: MomentumTimeframe;
  rebalanceFrequency?: RebalanceFrequency;
};

export type HybridCondition =
  | "RSI_LT"
  | "RSI_GT"
  | "FEAR_EXTREME"
  | "GREED_EXTREME"
  | "FEAR_BELOW"
  | "GREED_ABOVE";

export type HybridAction = "BUY" | "SELL" | "DCA_IN" | "DCA_OUT";

export type HybridRule = {
  id: string;
  condition: HybridCondition;
  threshold?: number;
  action: HybridAction;
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
  hybridRules: HybridRule[];
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
  hybridRules: HybridRule[];
  authorized: boolean;
  amountUsd: number;
  editingId: string | null;
};

export function emptyDraft(): DraftPortfolio {
  return {
    name: "",
    description: "",
    portfolioType: "",
    assets: [],
    strategyId: null,
    strategyConfig: {
      takeProfitPct: 20,
      stopLossPct: 10,
      fearThreshold: 20,
      greedThreshold: 70,
      dcaFrequency: "Weekly",
      rsiThreshold: 30,
      rsiTimeframe: "Weekly",
      momentumTimeframe: "Weekly",
      rebalanceFrequency: "Monthly",
    },
    hybridRules: [],
    authorized: false,
    amountUsd: 10000,
    editingId: null,
  };
}

export function allocationTotal(assets: SelectedAsset[]): number {
  return Math.round(assets.reduce((sum, a) => sum + a.pct, 0) * 100) / 100;
}
