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
  | "review"
  | "success";

export const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "create", label: "Create" },
  { id: "assets", label: "Assets & Allocation" },
  { id: "strategy", label: "Strategy" },
  { id: "review", label: "Final Review" },
];

/** Simulated network gas estimate — separate from execution fee */
export const ESTIMATED_GAS_LABEL = "~$2–$3";

/** Product flow shown in hero — must match simulator terminology */
export const PRODUCT_FLOW_LABELS = [
  "Create",
  "Assets & Allocation",
  "Strategy",
  "Final Review",
  "Authorize & Publish",
  "Marketplace",
] as const;

export type StrategyId =
  | "buy-now"
  | "fear-greed"
  | "rsi"
  | "momentum"
  | "manual-dca"
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

export type MomentumMode = "trend-dca" | "buy-now-dca-out";
export type MomentumBearishAction = "dca-out" | "sell-all";

export type ManualDcaSide = "buy" | "sell";
export type ManualDcaSizing = "pct" | "amount";

/** Scheduled Manual DCA execution (simulation) */
export type ManualDcaLeg = {
  id: string;
  side: ManualDcaSide;
  /** YYYY-MM-DD */
  date: string;
  sizing: ManualDcaSizing;
  /** % of available funds, or USD amount */
  value: number;
};

export type StrategyConfig = {
  enableTakeProfit?: boolean;
  enableStopLoss?: boolean;
  takeProfitPct?: number;
  /** % of position sold when take-profit triggers */
  takeProfitSellPct?: number;
  stopLossPct?: number;
  /** % of position sold when stop-loss triggers */
  stopLossSellPct?: number;
  /** Optional Manual DCA schedules attached to Buy Now */
  enableManualDca?: boolean;
  manualDcaLegs?: ManualDcaLeg[];
  fearThreshold?: number;
  greedThreshold?: number;
  dcaFrequency?: DcaFrequency;
  /** DCA IN % of funds/allocation per execution */
  dcaInPct?: number;
  /** DCA OUT % of funds/allocation per execution */
  dcaOutPct?: number;
  rsiBuyThreshold?: number;
  rsiSellThreshold?: number;
  rsiTimeframe?: RsiTimeframe;
  momentumTimeframe?: MomentumTimeframe;
  momentumMode?: MomentumMode;
  /** On bearish momentum: DCA OUT % or sell entire allocation */
  momentumBearishAction?: MomentumBearishAction;
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
  /** DCA OUT % of the selected asset/allocation sold per execution */
  dcaOutPct: number;
  /** Sell Direct % of the selected asset/allocation */
  sellDirectPct: number;
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
  /** Simulated max transaction size (USD) — display only */
  transactionLimitUsd: number;
  amountUsd: number;
  editingId: string | null;
};

export function emptyHybrid(): HybridConfig {
  return {
    buyCondition: "buy-now",
    sellCondition: "sell-greed",
    sellExecution: "dca-out",
    dcaOutPct: 25,
    sellDirectPct: 100,
    dcaFrequency: "Weekly",
    greedThreshold: 70,
    rsiSellThreshold: 70,
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}

export function createManualDcaLeg(
  patch: Partial<ManualDcaLeg> = {},
): ManualDcaLeg {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: `dca_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    side: "buy",
    date: today,
    sizing: "pct",
    value: 10,
    ...patch,
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
      takeProfitSellPct: 100,
      stopLossPct: 10,
      stopLossSellPct: 100,
      enableManualDca: false,
      manualDcaLegs: [],
      fearThreshold: 20,
      greedThreshold: 70,
      dcaFrequency: "Weekly",
      dcaInPct: 10,
      dcaOutPct: 10,
      rsiBuyThreshold: 30,
      rsiSellThreshold: 70,
      rsiTimeframe: "Weekly",
      momentumTimeframe: "Weekly",
      momentumMode: "trend-dca",
      momentumBearishAction: "dca-out",
      rebalanceFrequency: "Monthly",
    },
    hybrid: emptyHybrid(),
    authorized: false,
    transactionLimitUsd: 5000,
    amountUsd: 0,
    editingId: null,
  };
}

export function allocationTotal(assets: SelectedAsset[]): number {
  return Math.round(assets.reduce((sum, a) => sum + a.pct, 0) * 100) / 100;
}

/** Sell Direct uses sellDirectPct; DCA OUT uses dcaOutPct */
export function resolveSellPct(hybrid: HybridConfig): number {
  if (hybrid.sellExecution === "direct") {
    return hybrid.sellDirectPct ?? 100;
  }
  return hybrid.dcaOutPct;
}
