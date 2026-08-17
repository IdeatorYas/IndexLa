import type {
  HybridBuyCondition,
  HybridConfig,
  HybridSellCondition,
  ManualDcaLeg,
  StrategyConfig,
  StrategyId,
} from "./types";
import { createManualDcaLeg } from "./types";

function fmtNum(n: number | undefined, suffix = ""): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  return `${n}${suffix}`;
}

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
        leg.sizing === "pct"
          ? `${fmtNum(leg.value, "%")} of funds`
          : leg.value !== undefined
            ? `$${leg.value}`
            : "—";
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
    return `${buy} → ${sell} → Sell Direct → ${fmtNum(hybrid.sellDirectPct, "%")}`;
  }
  return `${buy} → ${sell} → DCA OUT → ${hybrid.dcaFrequency} → ${fmtNum(hybrid.dcaOutPct, "%")} of available funds`;
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
          `Take profit at +${fmtNum(config.takeProfitPct, "%")} gain · sell ${fmtNum(config.takeProfitSellPct, "%")}`,
        );
      }
      if (config.enableStopLoss) {
        parts.push(
          `Stop loss at −${fmtNum(config.stopLossPct, "%")} loss · sell ${fmtNum(config.stopLossSellPct, "%")}`,
        );
      }
      if (config.enableManualDca && (config.manualDcaLegs?.length ?? 0) > 0) {
        parts.push(`Manual DCA: ${formatManualLegs(config.manualDcaLegs)}`);
      }
      return parts.join(" · ");
    }
    case "fear-greed":
      return `When Fear < ${fmtNum(config.fearThreshold)} → DCA IN ${fmtNum(config.dcaInPct, "%")} of available funds · When Greed > ${fmtNum(config.greedThreshold)} → DCA OUT ${fmtNum(config.dcaOutPct, "%")} · ${config.dcaFrequency ?? "Weekly"}`;
    case "rsi":
      return `RSI ${config.rsiTimeframe ?? "Weekly"} · Oversold < ${fmtNum(config.rsiBuyThreshold)} → DCA IN ${fmtNum(config.dcaInPct, "%")} · Overbought > ${fmtNum(config.rsiSellThreshold)} → DCA OUT ${fmtNum(config.dcaOutPct, "%")}`;
    case "momentum": {
      const tf = config.momentumTimeframe ?? "Weekly";
      const mode = config.momentumMode ?? "trend-dca";
      const bearish = config.momentumBearishAction ?? "dca-out";
      if (mode === "buy-now-dca-out") {
        if (bearish === "sell-all") {
          return `Buy Now → when Momentum turns Bearish (${tf}) → Sell All`;
        }
        return `Buy Now → when Momentum turns Bearish (${tf}) → DCA OUT ${fmtNum(config.dcaOutPct, "%")}`;
      }
      if (bearish === "sell-all") {
        return `Momentum ${tf} · Bullish → DCA IN ${fmtNum(config.dcaInPct, "%")} · Bearish → Sell All`;
      }
      return `Momentum ${tf} · Bullish → DCA IN ${fmtNum(config.dcaInPct, "%")} · Bearish → DCA OUT ${fmtNum(config.dcaOutPct, "%")}`;
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
        enableManualDca: false,
        manualDcaLegs: [],
      };
    case "fear-greed":
      return { dcaFrequency: "Weekly" };
    case "rsi":
      return { rsiTimeframe: "Weekly" };
    case "momentum":
      return {
        momentumTimeframe: "Weekly",
        momentumMode: "trend-dca",
        momentumBearishAction: "dca-out",
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
    dcaFrequency: "Weekly",
    rsiTimeframe: "Weekly",
    momentumTimeframe: "Weekly",
  };
}

export function validateManualLegs(legs: ManualDcaLeg[] | undefined): boolean {
  if (!legs?.length) return false;
  return legs.every((leg) => {
    if (!leg.date) return false;
    if (typeof leg.value !== "number" || !(leg.value > 0)) return false;
    if (leg.sizing === "pct" && !(leg.value <= 100)) return false;
    return leg.side === "buy" || leg.side === "sell";
  });
}
