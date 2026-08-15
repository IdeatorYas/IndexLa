import type { StrategyConfig, StrategyId } from "./types";

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
    id: "buy-fear",
    title: "Buy Fear",
    explanation:
      "Increase allocations when markets enter fear conditions through DCA.",
    label: "DCA IN",
  },
  {
    id: "sell-greed",
    title: "Sell Greed",
    explanation:
      "Reduce allocations when markets enter extreme greed through DCA.",
    label: "DCA OUT",
  },
  {
    id: "buy-rsi",
    title: "Buy RSI Oversold",
    explanation: "Accumulate when RSI reaches oversold conditions.",
  },
  {
    id: "sell-rsi",
    title: "Sell RSI Overbought",
    explanation: "Reduce exposure when RSI reaches overbought conditions.",
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
      "Combine multiple rules in a WHEN → CONDITION → ACTION builder.",
  },
];

export function strategyTitle(id: StrategyId | null): string {
  if (!id) return "—";
  return STRATEGIES.find((s) => s.id === id)?.title ?? id;
}

export function summarizeStrategy(
  id: StrategyId | null,
  config: StrategyConfig,
  hybridCount: number,
): string {
  if (!id) return "—";
  switch (id) {
    case "buy-now":
      return "Immediate execution when authorized";
    case "take-profit":
      return `Take Profit: +${config.takeProfitPct ?? 20}%`;
    case "stop-loss":
      return `Stop Loss: -${config.stopLossPct ?? 10}%`;
    case "buy-fear":
      return `Fear < ${config.fearThreshold ?? 20} · ${config.dcaFrequency ?? "Weekly"} · DCA IN`;
    case "sell-greed":
      return `Greed > ${config.greedThreshold ?? 70} · ${config.dcaFrequency ?? "Weekly"} · DCA OUT`;
    case "buy-rsi":
      return `RSI < ${config.rsiThreshold ?? 30} · ${config.rsiTimeframe ?? "Weekly"} RSI · Buy`;
    case "sell-rsi":
      return `RSI > ${config.rsiThreshold ?? 70} · ${config.rsiTimeframe ?? "Weekly"} RSI · Sell`;
    case "momentum":
      return `${config.momentumTimeframe ?? "Weekly"} Trend Change`;
    case "rebalancing":
      return `Rebalance: ${config.rebalanceFrequency ?? "Monthly"}`;
    case "hybrid":
      return `Hybrid · ${hybridCount} rule${hybridCount === 1 ? "" : "s"}`;
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
    case "buy-fear":
      return { fearThreshold: 20, dcaFrequency: "Weekly" };
    case "sell-greed":
      return { greedThreshold: 70, dcaFrequency: "Weekly" };
    case "buy-rsi":
      return { rsiThreshold: 30, rsiTimeframe: "Weekly" };
    case "sell-rsi":
      return { rsiThreshold: 70, rsiTimeframe: "Weekly" };
    case "momentum":
      return { momentumTimeframe: "Weekly" };
    case "rebalancing":
      return { rebalanceFrequency: "Monthly" };
    default:
      return {};
  }
}
