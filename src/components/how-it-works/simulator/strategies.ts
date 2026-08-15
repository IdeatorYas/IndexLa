import type {
  HybridBuyCondition,
  HybridConfig,
  HybridSellCondition,
  SellAmountMode,
  SellExecutionMode,
  StrategyConfig,
  StrategyId,
} from "./types";

export type StrategyDef = {
  id: StrategyId;
  title: string;
  explanation: string;
  label?: string;
};

export const STRATEGIES: StrategyDef[] = [
  {
    id: "buy-now",
    title: "Buy Now",
    explanation: "Immediate execution when authorized.",
  },
  {
    id: "take-profit",
    title: "Take Profit",
    explanation: "Define a profit threshold to lock gains automatically.",
  },
  {
    id: "stop-loss",
    title: "Stop Loss",
    explanation: "Define a loss threshold to limit downside.",
  },
  {
    id: "fear-greed",
    title: "Fear & Greed",
    explanation:
      "Buy Fear → DCA IN when markets enter fear. Sell Greed → DCA OUT when markets enter greed.",
    label: "DCA",
  },
  {
    id: "rsi",
    title: "RSI",
    explanation:
      "Buy RSI Oversold → Buy. Sell RSI Overbought → Sell. Choose Daily or Weekly RSI.",
  },
  {
    id: "momentum",
    title: "Momentum",
    explanation:
      "Adjust exposure as defined market trends change. Daily = shorter / mid-term. Weekly = longer-term.",
  },
  {
    id: "rebalancing",
    title: "Rebalancing",
    explanation:
      "Restore target allocations when portfolio weights drift from targets.",
  },
  {
    id: "hybrid",
    title: "Hybrid Strategy",
    explanation:
      "Pair a Buy condition with a Sell condition, then choose how much to sell.",
  },
];

export const HYBRID_BUY_OPTIONS: {
  id: HybridBuyCondition;
  label: string;
  summary: string;
}[] = [
  { id: "buy-now", label: "Buy Now", summary: "Buy immediately when authorized" },
];

export const HYBRID_SELL_OPTIONS: {
  id: HybridSellCondition;
  label: string;
  summary: string;
}[] = [
  { id: "sell-greed", label: "Sell on Greed", summary: "Sell when Fear & Greed enters greed" },
  {
    id: "sell-rsi-overbought",
    label: "Sell RSI Overbought",
    summary: "Sell when RSI reaches overbought",
  },
  {
    id: "sell-momentum-bearish",
    label: "Sell when Momentum shifts Bearish",
    summary: "Sell when momentum turns bearish",
  },
];

export function strategyTitle(id: StrategyId | null): string {
  if (!id) return "—";
  return STRATEGIES.find((s) => s.id === id)?.title ?? id;
}

export function sellAmountLabel(
  mode: SellAmountMode,
  customPct?: number,
): string {
  if (mode === "50") return "50%";
  if (mode === "100") return "100%";
  return `${customPct ?? 0}%`;
}

export function sellExecutionLabel(mode: SellExecutionMode): string {
  return mode === "direct" ? "Sell Directly" : "DCA OUT";
}

export function formatHybridSummary(hybrid: HybridConfig): string {
  const buy =
    HYBRID_BUY_OPTIONS.find((b) => b.id === hybrid.buyCondition)?.label ??
    hybrid.buyCondition;
  const sell =
    HYBRID_SELL_OPTIONS.find((s) => s.id === hybrid.sellCondition)?.label ??
    hybrid.sellCondition;
  const action = sellExecutionLabel(hybrid.sellExecution);
  const amount = sellAmountLabel(hybrid.sellAmountMode, hybrid.sellCustomPct);
  return `${buy} → ${sell} → ${action} → ${amount}`;
}

export function summarizeStrategy(
  id: StrategyId | null,
  config: StrategyConfig,
  hybrid: HybridConfig,
): string {
  if (!id) return "—";
  switch (id) {
    case "buy-now":
      return "Immediate execution when authorized";
    case "take-profit":
      return `Take Profit: +${config.takeProfitPct ?? 20}%`;
    case "stop-loss":
      return `Stop Loss: -${config.stopLossPct ?? 10}%`;
    case "fear-greed":
      return `Buy Fear < ${config.fearThreshold ?? 20} → DCA IN · Sell Greed > ${config.greedThreshold ?? 70} → DCA OUT · ${config.dcaFrequency ?? "Weekly"}`;
    case "rsi":
      return `${config.rsiTimeframe ?? "Weekly"} RSI · Buy < ${config.rsiBuyThreshold ?? 30} · Sell > ${config.rsiSellThreshold ?? 70}`;
    case "momentum": {
      const tf = config.momentumTimeframe ?? "Weekly";
      return tf === "Daily"
        ? "Daily Trend Change (shorter / mid-term)"
        : "Weekly Trend Change (longer-term)";
    }
    case "rebalancing":
      return `Rebalance: ${config.rebalanceFrequency ?? "Monthly"}`;
    case "hybrid":
      return formatHybridSummary(hybrid);
    default:
      return strategyTitle(id);
  }
}

export function defaultsForStrategy(id: StrategyId): Partial<StrategyConfig> {
  switch (id) {
    case "take-profit":
      return { takeProfitPct: 20 };
    case "stop-loss":
      return { stopLossPct: 10 };
    case "fear-greed":
      return {
        fearThreshold: 20,
        greedThreshold: 70,
        dcaFrequency: "Weekly",
      };
    case "rsi":
      return {
        rsiTimeframe: "Weekly",
        rsiBuyThreshold: 30,
        rsiSellThreshold: 70,
      };
    case "momentum":
      return { momentumTimeframe: "Weekly" };
    case "rebalancing":
      return { rebalanceFrequency: "Monthly" };
    default:
      return {};
  }
}

export function defaultHybridConfig(): HybridConfig {
  return {
    buyCondition: "buy-now",
    sellCondition: "sell-greed",
    sellExecution: "dca-out",
    sellAmountMode: "50",
    sellCustomPct: 50,
    greedThreshold: 70,
    rsiSellThreshold: 70,
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}
