"use client";

import { Button } from "@/components/ui/Button";
import { AssetLogo } from "./AssetLogo";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { surfaceClass } from "./ui";

export function ManagePanel() {
  const {
    published,
    loadForEdit,
    pausePortfolio,
    resumePortfolio,
    rebalancePortfolio,
    removePortfolio,
    setSelectedId,
    rebalanceFlashId,
  } = useSimulator();

  const manageable = published.filter((p) => p.status !== "removed");
  if (manageable.length === 0) return null;

  return (
    <div className="border-t border-white/[0.04] bg-void">
      <div className="container-max px-4 py-8 sm:px-6 lg:px-8">
      <h3 className="display text-[clamp(1.25rem,2.2vw,1.55rem)] font-semibold tracking-[-0.02em] text-ink">
        Manage Your Portfolios
      </h3>
      <p className="mt-2 text-[0.95rem] text-muted">
        View, edit, pause, rebalance, or remove — session simulation only.
      </p>

      <div className="mt-5 space-y-3">
        {manageable.map((p) => (
          <div
            key={p.id}
            className={`${surfaceClass} flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5`}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 flex -space-x-1.5">
                  {p.assets.slice(0, 3).map((a) => (
                    <AssetLogo
                      key={a.key}
                      ticker={a.ticker}
                      name={a.name}
                      src={a.src}
                      size={24}
                      className="ring-2 ring-deep"
                    />
                  ))}
                </div>
                <p className="display text-[1.05rem] font-semibold text-ink">
                  {p.name}
                </p>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${
                    p.status === "paused"
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-200"
                      : "border-success/40 bg-success/10 text-success"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-1 text-[0.88rem] text-muted">
                {strategyTitle(p.strategyId)} ·{" "}
                {summarizeStrategy(p.strategyId, p.strategyConfig, p.hybrid)}
              </p>
              {rebalanceFlashId === p.id ? (
                <p className="mt-2 text-[0.85rem] font-semibold text-electric">
                  Rebalance simulated — target weights restored.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                type="button"
                className="!px-3.5 !py-2 !text-[0.8rem]"
                onClick={() => setSelectedId(p.id)}
              >
                View
              </Button>
              <Button
                variant="ghost"
                type="button"
                className="!px-3.5 !py-2 !text-[0.8rem]"
                onClick={() => loadForEdit(p.id)}
              >
                Edit
              </Button>
              {p.status === "paused" ? (
                <Button
                  variant="secondary"
                  type="button"
                  className="!px-3.5 !py-2 !text-[0.8rem]"
                  onClick={() => resumePortfolio(p.id)}
                >
                  Resume
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  type="button"
                  className="!px-3.5 !py-2 !text-[0.8rem]"
                  onClick={() => pausePortfolio(p.id)}
                >
                  Pause
                </Button>
              )}
              <Button
                variant="secondary"
                type="button"
                className="!px-3.5 !py-2 !text-[0.8rem]"
                onClick={() => rebalancePortfolio(p.id)}
              >
                Rebalance
              </Button>
              <button
                type="button"
                onClick={() => removePortfolio(p.id)}
                className="rounded-full border border-red-400/30 bg-red-500/10 px-3.5 py-2 text-[0.8rem] font-semibold text-red-200 hover:border-red-400/50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
