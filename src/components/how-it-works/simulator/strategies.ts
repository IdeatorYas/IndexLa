import type {
  HybridBuyCondition,
  HybridConfig,
  HybridSellCondition,
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
    explanation:
      "Immediate execution when authorized. Optionally add Take Profit and/or Stop Loss.",
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
      "Buy RSI Oversold → DCA IN. Sell RSI Overbought → DCA OUT. Choose Daily or Weekly and the % to execute.",
    label: "DCA",
  },
  {
    id: "momentum",
    title: "Momentum",
    explanation:
      "DCA IN / DCA OUT on trend change, or Buy Now → DCA OUT when momentum turns bearish. Daily or Weekly + %.",
    label: "DCA",
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
      "Pair a Buy condition with a Sell condition, then Sell Directly (100%) or DCA OUT.",
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
  if (!id) return "Not set";
  return STRATEGIES.find((s) => s.id === id)?.title ?? id;
}

export function formatHybridSummary(hybrid: HybridConfig): string {
  const buy =
    HYBRID_BUY_OPTIONS.find((b) => b.id === hybrid.buyCondition)?.label ??
    hybrid.buyCondition;
  const sell =
    HYBRID_SELL_OPTIONS.find((s) => s.id === hybrid.sellCondition)?.label ??
    hybrid.sellCondition;
  if (hybrid.sellExecution === "direct") {
    return `${buy} → ${sell} → Sell Directly → 100% of selected asset/allocation`;
  }
  return `${buy} → ${sell} → DCA OUT → ${hybrid.dcaFrequency} → ${hybrid.dcaOutPct}% of selected asset/allocation`;
}

export function summarizeStrategy(
  id: StrategyId | null,
  config: StrategyConfig,
  hybrid: HybridConfig,
): string {
  if (!id) return "Not set";
  switch (id) {
    case "buy-now": {
      const parts = ["Buy Now"];
      if (config.enableTakeProfit) {
        parts.push(`TP +${config.takeProfitPct ?? 20}%`);
      }
      if (config.enableStopLoss) {
        parts.push(`SL -${config.stopLossPct ?? 10}%`);
      }
      if (parts.length === 1) return "Buy Now · Immediate execution when authorized";
      return parts.join(" · ");
    }
    case "fear-greed":
      return `Buy Fear < ${config.fearThreshold ?? 20} → DCA IN ${config.dcaInPct ?? 10}% · Sell Greed > ${config.greedThreshold ?? 70} → DCA OUT ${config.dcaOutPct ?? 10}% · ${config.dcaFrequency ?? "Weekly"}`;
    case "rsi":
      return `RSI ${config.rsiTimeframe ?? "Weekly"} · Buy Oversold < ${config.rsiBuyThreshold ?? 30} → DCA IN ${config.dcaInPct ?? 10}% · Sell Overbought > ${config.rsiSellThreshold ?? 70} → DCA OUT ${config.dcaOutPct ?? 10}%`;
    case "momentum": {
      const tf = config.momentumTimeframe ?? "Weekly";
      const mode = config.momentumMode ?? "trend-dca";
      if (mode === "buy-now-dca-out") {
        return `Buy Now → Momentum turns Bearish → DCA OUT → ${tf} → ${config.dcaOutPct ?? 10}%`;
      }
      return `Momentum ${tf} · DCA IN ${config.dcaInPct ?? 10}% / DCA OUT ${config.dcaOutPct ?? 10}% on trend change`;
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
    case "buy-now":
      return {
        enableTakeProfit: false,
        enableStopLoss: false,
        takeProfitPct: 20,
        stopLossPct: 10,
      };
    case "fear-greed":
      return {
        fearThreshold: 20,
        greedThreshold: 70,
        dcaFrequency: "Weekly",
        dcaInPct: 10,
        dcaOutPct: 10,
      };
    case "rsi":
      return {
        rsiTimeframe: "Weekly",
        rsiBuyThreshold: 30,
        rsiSellThreshold: 70,
        dcaInPct: 10,
        dcaOutPct: 10,
      };
    case "momentum":
      return {
        momentumTimeframe: "Weekly",
        momentumMode: "trend-dca",
        dcaInPct: 10,
        dcaOutPct: 10,
      };
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
    dcaOutPct: 25,
    dcaFrequency: "Weekly",
    greedThreshold: 70,
    rsiSellThreshold: 70,
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}
