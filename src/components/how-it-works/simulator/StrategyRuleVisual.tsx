"use client";

import { summarizeStrategy } from "./strategies";
import type { HybridConfig, StrategyConfig, StrategyId } from "./types";

function RuleCard({
  side,
  trigger,
  action,
  amount,
  frequency,
}: {
  side: "BUY" | "SELL" | "RULE";
  trigger: string;
  action: string;
  amount?: string;
  frequency?: string;
}) {
  const sideColor =
    side === "BUY"
      ? "border-success/35 bg-success/10 text-success"
      : side === "SELL"
        ? "border-electric/35 bg-electric/10 text-electric"
        : "border-white/15 bg-void/50 text-muted";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-void/50 p-3.5">
      <span
        className={`inline-flex rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${sideColor}`}
      >
        {side}
      </span>
      <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
        Trigger
      </p>
      <p className="mt-0.5 text-[0.95rem] font-semibold text-ink">{trigger}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.85rem]">
        <span className="rounded-lg border border-white/10 bg-void/60 px-2.5 py-1 font-semibold text-ink">
          → {action}
        </span>
        {amount ? (
          <span className="rounded-lg border border-electric/25 bg-electric/10 px-2.5 py-1 font-semibold text-electric">
            {amount}
          </span>
        ) : null}
        {frequency ? (
          <span className="rounded-lg border border-white/10 bg-void/60 px-2.5 py-1 text-muted">
            {frequency}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function StrategyRuleVisual({
  id,
  config,
  hybrid,
}: {
  id: StrategyId;
  config: StrategyConfig;
  hybrid: HybridConfig;
}) {
  switch (id) {
    case "fear-greed":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <RuleCard
            side="BUY"
            trigger={`Fear detected (< ${config.fearThreshold ?? 20})`}
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.dcaFrequency ?? "Weekly"}
          />
          <RuleCard
            side="SELL"
            trigger={`Greed detected (> ${config.greedThreshold ?? 70})`}
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.dcaFrequency ?? "Weekly"}
          />
        </div>
      );
    case "rsi":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <RuleCard
            side="BUY"
            trigger={`RSI Oversold (< ${config.rsiBuyThreshold ?? 30})`}
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.rsiTimeframe ?? "Weekly"}
          />
          <RuleCard
            side="SELL"
            trigger={`RSI Overbought (> ${config.rsiSellThreshold ?? 70})`}
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.rsiTimeframe ?? "Weekly"}
          />
        </div>
      );
    case "momentum": {
      const mode = config.momentumMode ?? "trend-dca";
      if (mode === "buy-now-dca-out") {
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            <RuleCard
              side="BUY"
              trigger="Authorized"
              action="Buy Now"
            />
            <RuleCard
              side="SELL"
              trigger="Momentum turns Bearish"
              action="DCA OUT"
              amount={`${config.dcaOutPct ?? 10}%`}
              frequency={config.momentumTimeframe ?? "Weekly"}
            />
          </div>
        );
      }
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <RuleCard
            side="BUY"
            trigger="Bullish trend change"
            action="DCA IN"
            amount={`${config.dcaInPct ?? 10}%`}
            frequency={config.momentumTimeframe ?? "Weekly"}
          />
          <RuleCard
            side="SELL"
            trigger="Bearish trend change"
            action="DCA OUT"
            amount={`${config.dcaOutPct ?? 10}%`}
            frequency={config.momentumTimeframe ?? "Weekly"}
          />
        </div>
      );
    }
    case "buy-now":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <RuleCard side="BUY" trigger="Authorized" action="Buy Now" />
          <RuleCard
            side="RULE"
            trigger="Optional exits"
            action={
              [
                config.enableTakeProfit
                  ? `TP +${config.takeProfitPct ?? 20}%`
                  : null,
                config.enableStopLoss
                  ? `SL -${config.stopLossPct ?? 10}%`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ") || "None enabled"
            }
          />
        </div>
      );
    case "hybrid":
      return (
        <div className="rounded-2xl border border-electric/25 bg-electric/[0.08] px-4 py-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Hybrid rule
          </p>
          <p className="mt-2 text-[0.95rem] font-semibold leading-snug text-ink">
            {summarizeStrategy("hybrid", config, hybrid)}
          </p>
        </div>
      );
    case "rebalancing":
      return (
        <RuleCard
          side="RULE"
          trigger="Allocation drift"
          action="Rebalance"
          frequency={config.rebalanceFrequency ?? "Monthly"}
        />
      );
    default:
      return null;
  }
}
