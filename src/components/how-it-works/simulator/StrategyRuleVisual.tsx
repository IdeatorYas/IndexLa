import {
  HYBRID_BUY_OPTIONS,
  HYBRID_SELL_OPTIONS,
  summarizeStrategy,
} from "./strategies";
import type { HybridConfig, StrategyConfig, StrategyId } from "./types";

function RuleCard({
  side,
  trigger,
  action,
  amount,
  frequency,
  compact,
}: {
  side: "BUY" | "SELL" | "RULE";
  trigger: string;
  action: string;
  amount?: string;
  frequency?: string;
  compact?: boolean;
}) {
  const sideColor =
    side === "BUY"
      ? "border-success/35 bg-success/10 text-success"
      : side === "SELL"
        ? "border-electric/35 bg-electric/10 text-electric"
        : "border-white/15 bg-void/50 text-muted";

  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-void/50 transition-all duration-300 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <span
        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${sideColor}`}
      >
        {side}
      </span>

      <div
        className={`mt-3 grid gap-2 ${
          compact
            ? "grid-cols-1"
            : "sm:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,0.7fr)_minmax(0,0.55fr)_minmax(0,0.7fr)] sm:items-end"
        }`}
      >
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Trigger
          </p>
          <p
            className={`mt-0.5 font-semibold text-ink ${
              compact ? "text-[0.88rem]" : "text-[0.98rem]"
            }`}
          >
            {trigger}
          </p>
        </div>

        {!compact ? (
          <span className="hidden pb-1 text-electric sm:inline" aria-hidden>
            →
          </span>
        ) : null}

        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Action
          </p>
          <p className="mt-0.5 rounded-lg border border-white/10 bg-void/60 px-2.5 py-1 text-[0.85rem] font-semibold text-ink">
            {action}
          </p>
        </div>

        {amount ? (
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
              %
            </p>
            <p className="mt-0.5 rounded-lg border border-electric/25 bg-electric/10 px-2.5 py-1 text-[0.85rem] font-semibold text-electric">
              {amount}
            </p>
          </div>
        ) : null}

        {frequency ? (
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
              Frequency
            </p>
            <p className="mt-0.5 rounded-lg border border-white/10 bg-void/60 px-2.5 py-1 text-[0.85rem] text-muted">
              {frequency}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function hybridSellTrigger(hybrid: HybridConfig): string {
  switch (hybrid.sellCondition) {
    case "sell-greed":
      return `Greed > ${hybrid.greedThreshold ?? 70}`;
    case "sell-rsi-overbought":
      return `RSI Overbought > ${hybrid.rsiSellThreshold ?? 70}`;
    case "sell-momentum-bearish":
      return "Momentum turns Bearish";
    default:
      return (
        HYBRID_SELL_OPTIONS.find((s) => s.id === hybrid.sellCondition)
          ?.label ?? "Sell condition"
      );
  }
}

export function StrategyRuleVisual({
  id,
  config,
  hybrid,
  compact = false,
}: {
  id: StrategyId;
  config: StrategyConfig;
  hybrid: HybridConfig;
  compact?: boolean;
}) {
  const gap = compact ? "gap-2" : "gap-3";

  switch (id) {
    case "fear-greed":
      return (
        <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
          <RuleCard
            side="BUY"
            trigger={`Fear < ${config.fearThreshold ?? 20}`}
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.dcaFrequency ?? "Weekly"}
            compact={compact}
          />
          <RuleCard
            side="SELL"
            trigger={`Greed > ${config.greedThreshold ?? 70}`}
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.dcaFrequency ?? "Weekly"}
            compact={compact}
          />
        </div>
      );
    case "rsi":
      return (
        <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
          <RuleCard
            side="BUY"
            trigger={`RSI Oversold < ${config.rsiBuyThreshold ?? 30}`}
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.rsiTimeframe ?? "Weekly"}
            compact={compact}
          />
          <RuleCard
            side="SELL"
            trigger={`RSI Overbought > ${config.rsiSellThreshold ?? 70}`}
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.rsiTimeframe ?? "Weekly"}
            compact={compact}
          />
        </div>
      );
    case "momentum": {
      const mode = config.momentumMode ?? "trend-dca";
      if (mode === "buy-now-dca-out") {
        return (
          <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
            <RuleCard
              side="BUY"
              trigger="Authorized"
              action="Buy Now"
              compact={compact}
            />
            <RuleCard
              side="SELL"
              trigger="Momentum turns Bearish"
              action="DCA OUT"
              amount={`${config.dcaOutPct ?? 10}%`}
              frequency={config.momentumTimeframe ?? "Weekly"}
              compact={compact}
            />
          </div>
        );
      }
      return (
        <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
          <RuleCard
            side="BUY"
            trigger="Bullish trend change"
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.momentumTimeframe ?? "Weekly"}
            compact={compact}
          />
          <RuleCard
            side="SELL"
            trigger="Bearish trend change"
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.momentumTimeframe ?? "Weekly"}
            compact={compact}
          />
        </div>
      );
    }
    case "buy-now":
      return (
        <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
          <RuleCard
            side="BUY"
            trigger="Authorized"
            action="Buy Now"
            compact={compact}
          />
          <RuleCard
            side="RULE"
            trigger="Optional exits"
            action={
              [
                config.enableTakeProfit
                  ? `TP +${config.takeProfitPct ?? 20}% · sell ${config.takeProfitSellPct ?? 100}%`
                  : null,
                config.enableStopLoss
                  ? `SL -${config.stopLossPct ?? 10}% · sell ${config.stopLossSellPct ?? 100}%`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ") || "None enabled"
            }
            compact={compact}
          />
        </div>
      );
    case "hybrid": {
      const buyLabel =
        HYBRID_BUY_OPTIONS.find((b) => b.id === hybrid.buyCondition)?.label ??
        "Buy Now";
      const sellDirect = hybrid.sellExecution === "direct";
      return (
        <div className={`grid ${gap} ${compact ? "" : "sm:grid-cols-2"}`}>
          <RuleCard
            side="BUY"
            trigger="Authorized"
            action={buyLabel}
            compact={compact}
          />
          <RuleCard
            side="SELL"
            trigger={hybridSellTrigger(hybrid)}
            action={sellDirect ? "Sell Directly" : "DCA OUT"}
            amount={sellDirect ? "100%" : `${hybrid.dcaOutPct}%`}
            frequency={sellDirect ? undefined : hybrid.dcaFrequency}
            compact={compact}
          />
        </div>
      );
    }
    case "rebalancing":
      return (
        <RuleCard
          side="RULE"
          trigger="Allocation drift"
          action="Rebalance"
          frequency={config.rebalanceFrequency ?? "Monthly"}
          compact={compact}
        />
      );
    default:
      return (
        <p className="text-[0.85rem] text-muted">
          {summarizeStrategy(id, config, hybrid)}
        </p>
      );
  }
}
