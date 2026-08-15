"use client";

import { Button } from "@/components/ui/Button";
import { AllocationChart } from "../AllocationChart";
import { AssetLogo } from "../AssetLogo";
import { summarizeStrategy, strategyTitle } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { surfaceClass } from "../ui";

export function MonitorStep() {
  const { justCreatedId, published, resetDraft, setSelectedId, setStep } =
    useSimulator();
  const portfolio =
    published.find((p) => p.id === justCreatedId && p.status !== "removed") ??
    published.find((p) => p.status !== "removed") ??
    null;

  if (!portfolio) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Portfolio Monitor
        </p>
        <h3 className="display mt-2 text-[1.5rem] font-semibold text-ink">
          No portfolio to monitor
        </h3>
        <p className="mt-2 text-muted">Publish a portfolio to open the monitor.</p>
        <Button
          type="button"
          className="mt-6 !px-5 !py-2.5"
          onClick={() => resetDraft()}
        >
          Build a portfolio
        </Button>
      </div>
    );
  }

  const primary = portfolio.assets[0];

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Portfolio Monitor
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        {portfolio.name}
      </h3>
      <p className="mt-2 text-[0.92rem] text-muted">
        Simulated post-publish view — no real execution or wallet activity.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className={`${surfaceClass} p-4`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Portfolio Status
          </p>
          <p className="mt-2 text-[1.15rem] font-semibold capitalize text-success">
            {portfolio.status === "active" ? "Active" : portfolio.status}
          </p>
        </div>
        <div className={`${surfaceClass} p-4`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Active Strategy
          </p>
          <p className="mt-2 text-[1.05rem] font-semibold text-ink">
            {strategyTitle(portfolio.strategyId)}
          </p>
          <p className="mt-1 text-[0.8rem] leading-snug text-muted">
            {summarizeStrategy(
              portfolio.strategyId,
              portfolio.strategyConfig,
              portfolio.hybrid,
            )}
          </p>
        </div>
      </div>

      <div className={`${surfaceClass} mt-3 p-4`}>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Current Allocation
        </p>
        <div className="mt-3 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <AllocationChart assets={portfolio.assets} size={100} />
          <ul className="w-full flex-1 space-y-1.5">
            {portfolio.assets.map((a) => (
              <li
                key={a.key}
                className="flex items-center justify-between gap-2 text-[0.88rem]"
              >
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={22}
                  />
                  {a.ticker}
                </span>
                <span className="text-electric">{a.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${surfaceClass} mt-3 p-4`}>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Next Rule
        </p>
        <p className="mt-2 text-[0.95rem] text-ink">
          {summarizeStrategy(
            portfolio.strategyId,
            portfolio.strategyConfig,
            portfolio.hybrid,
          )}
        </p>
      </div>

      <div className={`${surfaceClass} mt-3 p-4`}>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Execution History
        </p>
        <div className="mt-3 rounded-xl border border-white/[0.07] bg-void/50 px-3.5 py-3">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-electric">
            Simulated event
          </p>
          <p className="mt-2 text-[1rem] font-semibold text-ink">
            {portfolio.strategyId === "fear-greed"
              ? "Buy Fear Triggered"
              : portfolio.strategyId === "rsi"
                ? "RSI Oversold Triggered"
                : portfolio.strategyId === "buy-now"
                  ? "Buy Now Authorized"
                  : "Strategy Condition Met"}
          </p>
          <p className="mt-1 text-[0.88rem] text-muted">
            {primary
              ? `${primary.ticker} allocation monitored · Simulated execution`
              : "Simulated execution"}
          </p>
          <p className="mt-2 text-[0.75rem] text-muted-dim">
            Clearly simulated — not a real trade or performance claim.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          className="!px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => setSelectedId(portfolio.id)}
        >
          View Portfolio
        </Button>
        <Button
          href="#simulator-marketplace"
          variant="secondary"
          className="!px-5 !py-2.5 !text-[0.9rem]"
        >
          Marketplace
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="!px-5 !py-2.5 !text-[0.9rem]"
          onClick={() => {
            resetDraft();
            setStep("create");
          }}
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
