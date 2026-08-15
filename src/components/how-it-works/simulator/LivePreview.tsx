"use client";

import { useState } from "react";
import {
  AllocationChart,
  allocationColor,
} from "./AllocationChart";
import { AssetLogo } from "./AssetLogo";
import { strategyTitle, summarizeStrategy, STRATEGIES } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import {
  allocationTotal,
  ESTIMATED_GAS_LABEL,
  type SelectedAsset,
} from "./types";
import { fieldClass, surfaceClass } from "./ui";

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

function CreatorRevenuePanel() {
  const [simActivity, setSimActivity] = useState(10_000_000);
  const simFees = simActivity * 0.01;
  const simCreator = simFees * 0.5;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-void/45 p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
        Creator Revenue
      </p>
      <p className="mt-1 text-[0.78rem] text-ink">
        50% of applicable execution fees
      </p>
      <div className="mt-2 rounded-lg border border-dashed border-white/15 bg-void/50 p-2.5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          Simulated Activity
        </p>
        <input
          type="number"
          min={1000}
          step={100000}
          className={`${fieldClass} !mt-1.5 !py-1.5 text-[0.85rem]`}
          value={simActivity}
          onChange={(e) =>
            setSimActivity(Math.max(0, Number(e.target.value) || 0))
          }
          aria-label="Simulated activity USD"
        />
        <dl className="mt-2 space-y-1 text-[0.78rem]">
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Execution Fees</dt>
            <dd className="font-semibold text-ink">{usd(simFees)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Creator Share</dt>
            <dd className="font-semibold text-success">{usd(simCreator)}</dd>
          </div>
        </dl>
        <p className="mt-1.5 text-[0.62rem] text-muted-dim">
          SIMULATED — not earnings, AUM, users, or traction.
        </p>
      </div>
    </div>
  );
}

/** One row per asset: ticker · allocation % · USD (when amount set). */
function AssetOverviewList({
  assets,
  amountUsd,
}: {
  assets: SelectedAsset[];
  amountUsd: number;
}) {
  const showUsd = amountUsd > 0;
  const total = allocationTotal(assets);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
        <span>Asset</span>
        <span className="flex gap-6 sm:gap-8">
          <span className="w-10 text-right">Alloc</span>
          {showUsd ? <span className="w-14 text-right">USD</span> : null}
        </span>
      </div>
      <ul className="space-y-0.5">
        {assets.map((a, i) => (
          <li
            key={a.key}
            className="flex items-center justify-between gap-2 rounded-lg px-1 py-1 text-[0.8rem]"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: allocationColor(i) }}
              />
              <AssetLogo
                ticker={a.ticker}
                name={a.name}
                src={a.src}
                size={18}
              />
              <span className="truncate font-semibold text-ink">{a.ticker}</span>
            </span>
            <span className="flex shrink-0 items-center gap-6 sm:gap-8">
              <span className="w-10 text-right font-semibold tabular-nums text-ink">
                {a.pct}%
              </span>
              {showUsd ? (
                <span className="w-14 text-right font-semibold tabular-nums text-electric">
                  {usd((amountUsd * a.pct) / 100)}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={`mt-2 flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[0.75rem] ${
          total === 100
            ? "border-success/35 bg-success/10"
            : total > 100
              ? "border-amber-200/35 bg-amber-200/10"
              : "border-white/[0.08] bg-void/40"
        }`}
      >
        <span className="font-semibold uppercase tracking-[0.1em] text-muted">
          Total
        </span>
        <span
          className={`font-semibold tabular-nums ${
            total === 100
              ? "text-success"
              : total > 100
                ? "text-amber-200"
                : "text-ink"
          }`}
        >
          {total}%
        </span>
      </div>
    </div>
  );
}

export function LivePreview() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;

  const populated = hasPreviewContent(draft);
  const fee = draft.amountUsd > 0 ? draft.amountUsd * 0.01 : 0;
  const showCreator = step === "review";
  const strategyBlurb = draft.strategyId
    ? STRATEGIES.find((s) => s.id === draft.strategyId)?.explanation
    : null;

  return (
    <aside
      className={`${surfaceClass} hidden min-h-0 flex-col overflow-hidden border-electric/20 shadow-[0_0_60px_rgba(56,189,248,0.06)] sm:flex`}
      aria-label="Live product preview"
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Live Preview
        </p>
        {populated ? (
          <span className="rounded-full border border-electric/30 bg-electric/10 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-electric">
            Building
          </span>
        ) : null}
      </div>

      {!populated ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/15">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
              Empty
            </p>
          </div>
          <p className="mt-3 display text-[1rem] font-semibold tracking-[-0.02em] text-ink">
            Your portfolio builds here
          </p>
          <p className="mt-1.5 max-w-[14rem] text-[0.75rem] leading-relaxed text-muted">
            Name, assets, allocation, and strategy appear as you configure them.
          </p>
        </div>
      ) : (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
          {(draft.name.trim() || draft.portfolioType) && (
            <div>
              {draft.name.trim() ? (
                <p className="display text-[1.1rem] font-semibold tracking-[-0.02em] text-ink">
                  {draft.name.trim()}
                </p>
              ) : (
                <p className="display text-[1rem] font-semibold tracking-[-0.02em] text-muted-dim">
                  Untitled
                </p>
              )}
              {draft.portfolioType ? (
                <p className="mt-0.5 text-[0.78rem] text-muted">
                  {draft.portfolioType}
                </p>
              ) : null}
            </div>
          )}

          {draft.assets.length > 0 ? (
            <div>
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Assets
              </p>
              <div className="mb-2 flex justify-center">
                <AllocationChart assets={draft.assets} size={84} />
              </div>
              <AssetOverviewList
                assets={draft.assets}
                amountUsd={draft.amountUsd}
              />
            </div>
          ) : null}

          {draft.strategyId ? (
            <div className="border-t border-white/[0.07] pt-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Strategy
              </p>
              <p className="mt-1 text-[0.9rem] font-semibold text-ink">
                {strategyTitle(draft.strategyId)}
              </p>
              {strategyBlurb ? (
                <p className="mt-1 text-[0.75rem] leading-snug text-muted line-clamp-2">
                  {strategyBlurb}
                </p>
              ) : null}
              <p className="mt-1.5 text-[0.75rem] leading-snug text-muted">
                {summarizeStrategy(
                  draft.strategyId,
                  draft.strategyConfig,
                  draft.hybrid,
                )}
              </p>
            </div>
          ) : null}

          <div className="space-y-1.5 border-t border-white/[0.07] pt-3 text-[0.8rem]">
            <div className="flex justify-between gap-2">
              <span className="text-muted">Investment</span>
              <span className="font-semibold text-ink">
                {draft.amountUsd > 0 ? (
                  <span className="text-electric">{usd(draft.amountUsd)}</span>
                ) : (
                  <span className="text-muted-dim">Not set</span>
                )}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted">Execution Fee</span>
              <span className="font-semibold text-ink">
                1%
                {draft.amountUsd > 0 ? (
                  <span className="text-electric"> · {usd(fee)}</span>
                ) : null}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted">Estimated Gas</span>
              <span className="font-semibold text-ink">{ESTIMATED_GAS_LABEL}</span>
            </div>
          </div>

          {showCreator ? (
            <div className="border-t border-white/[0.07] pt-3">
              <CreatorRevenuePanel />
            </div>
          ) : null}
        </div>
      )}
    </aside>
  );
}

export function LivePreviewCompact() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;
  if (!hasPreviewContent(draft)) return null;

  const total = allocationTotal(draft.assets);

  return (
    <div className="rounded-xl border border-electric/20 bg-void/50 p-2.5">
      <div className="flex items-center gap-2.5">
        {draft.assets.length > 0 ? (
          <AllocationChart assets={draft.assets} size={48} />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.88rem] font-semibold text-ink">
            {draft.name.trim() || "Building…"}
          </p>
          <p className="truncate text-[0.72rem] text-muted">
            {[
              draft.portfolioType || null,
              draft.strategyId ? strategyTitle(draft.strategyId) : null,
            ]
              .filter(Boolean)
              .join(" · ") || "Not set"}
          </p>
          {draft.assets.length > 0 ? (
            <p
              className={`mt-0.5 text-[0.72rem] font-semibold ${
                total === 100 ? "text-success" : "text-muted"
              }`}
            >
              {total}% allocated
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
