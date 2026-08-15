"use client";

import { AllocationChart, allocationColor } from "./AllocationChart";
import { AssetLogo } from "./AssetLogo";
import { strategyTitle } from "./strategies";
import { StrategyRuleVisual } from "./StrategyRuleVisual";
import { useSimulator } from "./SimulatorContext";
import { allocationTotal, ESTIMATED_GAS_LABEL } from "./types";
import { surfaceClass } from "./ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function hasPreviewContent(draft: {
  name: string;
  portfolioType: string;
  assets: unknown[];
  strategyId: string | null;
  amountUsd: number;
}): boolean {
  return (
    draft.name.trim().length > 0 ||
    draft.portfolioType !== "" ||
    draft.assets.length > 0 ||
    draft.strategyId !== null ||
    draft.amountUsd > 0
  );
}

export function LivePreview() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;
  if (!hasPreviewContent(draft)) return null;

  const total = allocationTotal(draft.assets);
  const fee = draft.amountUsd > 0 ? draft.amountUsd * 0.01 : 0;

  return (
    <aside
      className={`${surfaceClass} sticky top-[4.25rem] hidden h-full max-h-[calc(100svh-4.25rem)] overflow-y-auto p-5 lg:block lg:self-stretch`}
      aria-label="Live product preview"
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Live Preview
      </p>

      {draft.name.trim() ? (
        <p className="mt-2 display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink transition-all duration-300">
          {draft.name.trim()}
        </p>
      ) : null}

      {draft.portfolioType ? (
        <p className="mt-1 text-[0.85rem] text-muted transition-opacity duration-300">
          {draft.portfolioType}
        </p>
      ) : null}

      {draft.assets.length > 0 ? (
        <div className="mt-5 transition-all duration-300">
          <AllocationChart assets={draft.assets} size={132} />
          <div className="mt-4 space-y-1.5">
            {draft.assets.map((a, i) => (
              <div
                key={a.key}
                className="flex items-center justify-between gap-2 text-[0.82rem] transition-all duration-300"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: allocationColor(i) }}
                  />
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={20}
                  />
                  <span className="truncate font-semibold text-ink">
                    {a.ticker}
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-muted">
                  {a.pct}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between gap-2 border-t border-white/[0.06] pt-3 text-[0.82rem]">
            <span className="text-muted">Total</span>
            <span
              className={`font-semibold ${
                total === 100
                  ? "text-success"
                  : total > 100
                    ? "text-amber-200"
                    : "text-ink"
              }`}
            >
              {total === 100
                ? "100%"
                : total > 100
                  ? "Over allocated"
                  : `${Math.round((100 - total) * 100) / 100}% remaining`}
            </span>
          </div>
        </div>
      ) : null}

      {draft.strategyId ? (
        <div className="mt-5 border-t border-white/[0.07] pt-4 transition-all duration-300">
          <div className="mb-3 flex justify-between gap-2 text-[0.82rem]">
            <span className="text-muted">Strategy</span>
            <span className="font-semibold text-ink">
              {strategyTitle(draft.strategyId)}
            </span>
          </div>
          <div className="scale-[0.92] origin-top">
            <StrategyRuleVisual
              id={draft.strategyId}
              config={draft.strategyConfig}
              hybrid={draft.hybrid}
            />
          </div>
        </div>
      ) : null}

      {draft.amountUsd > 0 ? (
        <div className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 text-[0.82rem] transition-all duration-300">
          <div className="flex justify-between gap-2">
            <span className="text-muted">Investment</span>
            <span className="font-semibold text-electric">
              {usd(draft.amountUsd)}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted">Execution Fee</span>
            <span className="font-semibold text-ink">1% · {usd(fee)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted">Estimated Gas</span>
            <span className="font-semibold text-ink">{ESTIMATED_GAS_LABEL}</span>
          </div>
        </div>
      ) : null}
    </aside>
  );
}

export function LivePreviewCompact() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;
  if (!hasPreviewContent(draft)) return null;

  const total = allocationTotal(draft.assets);

  return (
    <div className="mb-4 shrink-0 rounded-2xl border border-white/[0.08] bg-void/50 p-3 lg:hidden">
      <div className="flex items-center gap-3">
        {draft.assets.length > 0 ? (
          <AllocationChart assets={draft.assets} size={56} />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-semibold text-ink">
            {draft.name.trim() || "Building…"}
          </p>
          <p className="truncate text-[0.78rem] text-muted">
            {[
              draft.portfolioType || null,
              draft.strategyId ? strategyTitle(draft.strategyId) : null,
            ]
              .filter(Boolean)
              .join(" · ") || "Not set"}
          </p>
          {draft.assets.length > 0 || draft.amountUsd > 0 ? (
            <p className="mt-1 text-[0.78rem] text-muted">
              {draft.assets.length > 0 ? (
                <span className={total === 100 ? "text-success" : "text-ink"}>
                  {total}%
                </span>
              ) : null}
              {draft.assets.length > 0 && draft.amountUsd > 0 ? " · " : null}
              {draft.amountUsd > 0 ? (
                <span>
                  {usd(draft.amountUsd)} · Fee 1%
                </span>
              ) : null}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
