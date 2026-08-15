import type {
  HybridBuyCondition,
  HybridConfig,
  HybridSellCondition,
  ManualDcaLeg,
  StrategyConfig,
  StrategyId,
} from "./types";
import { createManualDcaLeg } from "./types";

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
      "Buy immediately when authorized. Optionally add Take Profit, Stop Loss, and Manual DCA.",
  },
  {
    id: "fear-greed",
    title: "Buy Fear → Sell Greed",
    explanation:
      "DCA IN when markets enter fear. DCA OUT when markets enter greed.",
    label: "DCA",
  },
  {
    id: "rsi",
    title: "RSI",
    explanation:
      "DCA IN on RSI oversold. DCA OUT on RSI overbought. Daily or Weekly.",
    label: "DCA",
  },
  {
    id: "momentum",
    title: "Momentum",
    explanation:
      "DCA IN on bullish trend. DCA OUT or sell all when momentum turns bearish.",
    label: "DCA",
  },
  {
    id: "manual-dca",
    title: "Manual DCA",
    explanation:
      "Schedule your own buy or sell executions by date and size — no market condition required.",
    label: "Schedule",
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
      "Buy Now, then sell on a second condition — Sell Direct or DCA OUT.",
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
    label: "Sell when Momentum turns Bearish",
    summary: "Sell when momentum turns bearish",
  },
];

export function strategyTitle(id: StrategyId | null): string {
  if (!id) return "Not set";
  return STRATEGIES.find((s) => s.id === id)?.title ?? id;
}

function formatManualLegs(legs: ManualDcaLeg[] | undefined): string {
  if (!legs?.length) return "No schedules";
  return legs
    .map((leg) => {
      const size =
        leg.sizing === "pct" ? `${leg.value}% of funds` : `$${leg.value}`;
      return `${leg.side === "buy" ? "Buy" : "Sell"} ${size} on ${leg.date}`;
    })
    .join(" · ");
}

export function formatHybridSummary(hybrid: HybridConfig): string {
  const buy =
    HYBRID_BUY_OPTIONS.find((b) => b.id === hybrid.buyCondition)?.label ??
    hybrid.buyCondition;
  const sell =
    HYBRID_SELL_OPTIONS.find((s) => s.id === hybrid.sellCondition)?.label ??
    hybrid.sellCondition;
  if (hybrid.sellExecution === "direct") {
    return `${buy} → ${sell} → Sell Direct → ${hybrid.sellDirectPct ?? 100}%`;
  }
  return `${buy} → ${sell} → DCA OUT → ${hybrid.dcaFrequency} → ${hybrid.dcaOutPct}% of available funds`;
}

export function summarizeStrategy(
  id: StrategyId | null,
  config: StrategyConfig,
  hybrid: HybridConfig,
): string {
  if (!id) return "Not set";
  switch (id) {
    case "buy-now": {
      const parts = ["Buy immediately when authorized"];
      if (config.enableTakeProfit) {
        parts.push(
          `Take profit at +${config.takeProfitPct ?? 20}% gain · sell ${config.takeProfitSellPct ?? 100}%`,
        );
      }
      if (config.enableStopLoss) {
        parts.push(
          `Stop loss at −${config.stopLossPct ?? 10}% loss · sell ${config.stopLossSellPct ?? 100}%`,
        );
      }
      if (config.enableManualDca && (config.manualDcaLegs?.length ?? 0) > 0) {
        parts.push(`Manual DCA: ${formatManualLegs(config.manualDcaLegs)}`);
      }
      return parts.join(" · ");
    }
    case "fear-greed":
      return `When Fear < ${config.fearThreshold ?? 20} → DCA IN ${config.dcaInPct ?? 10}% of available funds · When Greed > ${config.greedThreshold ?? 70} → DCA OUT ${config.dcaOutPct ?? 10}% · ${config.dcaFrequency ?? "Weekly"}`;
    case "rsi":
      return `RSI ${config.rsiTimeframe ?? "Weekly"} · Oversold < ${config.rsiBuyThreshold ?? 30} → DCA IN ${config.dcaInPct ?? 10}% · Overbought > ${config.rsiSellThreshold ?? 70} → DCA OUT ${config.dcaOutPct ?? 10}%`;
    case "momentum": {
      const tf = config.momentumTimeframe ?? "Weekly";
      const mode = config.momentumMode ?? "trend-dca";
      const bearish = config.momentumBearishAction ?? "dca-out";
      if (mode === "buy-now-dca-out") {
        if (bearish === "sell-all") {
          return `Buy Now → when Momentum turns Bearish (${tf}) → Sell All`;
        }
        return `Buy Now → when Momentum turns Bearish (${tf}) → DCA OUT ${config.dcaOutPct ?? 10}%`;
      }
      if (bearish === "sell-all") {
        return `Momentum ${tf} · Bullish → DCA IN ${config.dcaInPct ?? 10}% · Bearish → Sell All`;
      }
      return `Momentum ${tf} · Bullish → DCA IN ${config.dcaInPct ?? 10}% · Bearish → DCA OUT ${config.dcaOutPct ?? 10}%`;
    }
    case "manual-dca":
      return `Manual DCA · ${formatManualLegs(config.manualDcaLegs)}`;
    case "rebalancing":
      return `Rebalance ${config.rebalanceFrequency ?? "Monthly"} to restore target allocations`;
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
        takeProfitSellPct: 100,
        stopLossPct: 10,
        stopLossSellPct: 100,
        enableManualDca: false,
        manualDcaLegs: [],
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
        momentumBearishAction: "dca-out",
        dcaInPct: 10,
        dcaOutPct: 10,
      };
    case "manual-dca":
      return {
        enableManualDca: true,
        manualDcaLegs: [createManualDcaLeg()],
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
    sellDirectPct: 100,
    dcaFrequency: "Weekly",
    greedThreshold: 70,
    rsiSellThreshold: 70,
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}

export function validateManualLegs(legs: ManualDcaLeg[] | undefined): boolean {
  if (!legs?.length) return false;
  return legs.every((leg) => {
    if (!leg.date) return false;
    if (!(leg.value > 0)) return false;
    if (leg.sizing === "pct" && !(leg.value <= 100)) return false;
    return leg.side === "buy" || leg.side === "sell";
  });
}
