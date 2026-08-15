"use client";

import { useState } from "react";
import {
  AllocationBars,
  AllocationChart,
  allocationColor,
} from "./AllocationChart";
import { AssetLogo } from "./AssetLogo";
import { strategyTitle, summarizeStrategy, STRATEGIES } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { allocationTotal, ESTIMATED_GAS_LABEL } from "./types";
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
    <div className="rounded-2xl border border-white/[0.08] bg-void/45 p-4 transition-all duration-300">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
        Creator Revenue
      </p>
      <p className="mt-1.5 text-[0.85rem] text-ink">
        50% of applicable execution fees
      </p>
      <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-void/50 p-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          Simulated Activity
        </p>
        <input
          type="number"
          min={1000}
          step={100000}
          className={`${fieldClass} !mt-2 !py-2 text-[0.9rem]`}
          value={simActivity}
          onChange={(e) =>
            setSimActivity(Math.max(0, Number(e.target.value) || 0))
          }
          aria-label="Simulated activity USD"
        />
        <dl className="mt-3 space-y-1.5 text-[0.82rem]">
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Execution Fees</dt>
            <dd className="font-semibold text-ink">{usd(simFees)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Creator Share</dt>
            <dd className="font-semibold text-success">{usd(simCreator)}</dd>
          </div>
        </dl>
        <p className="mt-2 text-[0.68rem] text-muted-dim">
          SIMULATED — not earnings, AUM, users, or traction.
        </p>
      </div>
    </div>
  );
}

export function LivePreview() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;

  const populated = hasPreviewContent(draft);
  const fee = draft.amountUsd > 0 ? draft.amountUsd * 0.01 : 0;
  const showFees = draft.amountUsd > 0;
  const showGas = showFees && step === "review";
  const showCreator = step === "review";
  const strategyBlurb = draft.strategyId
    ? STRATEGIES.find((s) => s.id === draft.strategyId)?.explanation
    : null;

  return (
    <aside
      className={`${surfaceClass} hidden h-full min-h-0 overflow-y-auto overscroll-contain border-electric/20 p-4 shadow-[0_0_60px_rgba(56,189,248,0.06)] lg:block`}
      aria-label="Live product preview"
    >
      <div className="flex items-center justify-between gap-2">
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
        <div className="mt-6 flex flex-col items-center justify-center px-3 py-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/15">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
              Empty
            </p>
          </div>
          <p className="mt-4 display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
            Your portfolio builds here
          </p>
          <p className="mt-1.5 max-w-[15rem] text-[0.8rem] leading-relaxed text-muted">
            Name, assets, allocation, and strategy appear as you configure them.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-4">
          {(draft.name.trim() || draft.portfolioType) && (
            <div className="transition-all duration-300">
              {draft.name.trim() ? (
                <p className="display text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">
                  {draft.name.trim()}
                </p>
              ) : (
                <p className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-muted-dim">
                  Untitled
                </p>
              )}
              {draft.portfolioType ? (
                <p className="mt-0.5 text-[0.82rem] text-muted">
                  {draft.portfolioType}
                </p>
              ) : null}
            </div>
          )}

          {draft.assets.length > 0 ? (
            <div className="transition-all duration-300">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
                Allocation
              </p>
              <div className="flex flex-col items-center gap-3">
                <AllocationChart assets={draft.assets} size={108} />
                <div className="w-full">
                  <AllocationBars assets={draft.assets} />
                </div>
              </div>
              {draft.amountUsd > 0 ? (
                <ul className="mt-2.5 space-y-1">
                  {draft.assets.map((a, i) => (
                    <li
                      key={a.key}
                      className="flex items-center justify-between gap-2 text-[0.78rem]"
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
                        <span className="truncate font-semibold text-ink">
                          {a.ticker}
                        </span>
                      </span>
                      <span className="shrink-0 font-semibold text-electric">
                        {usd((draft.amountUsd * a.pct) / 100)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {draft.strategyId ? (
            <div className="border-t border-white/[0.07] pt-4 transition-all duration-300">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    Strategy
                  </p>
                  <p className="mt-1 text-[0.95rem] font-semibold text-ink">
                    {strategyTitle(draft.strategyId)}
                  </p>
                </div>
              </div>
              {strategyBlurb ? (
                <p className="mb-3 text-[0.8rem] leading-relaxed text-muted">
                  {strategyBlurb}
                </p>
              ) : null}
              <p className="mb-1 text-[0.78rem] leading-snug text-muted">
                {summarizeStrategy(
                  draft.strategyId,
                  draft.strategyConfig,
                  draft.hybrid,
                )}
              </p>
            </div>
          ) : null}

          {showFees ? (
            <div className="space-y-2 border-t border-white/[0.07] pt-4 text-[0.82rem] transition-all duration-300">
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
              {showGas ? (
                <div className="flex justify-between gap-2">
                  <span className="text-muted">Estimated Gas</span>
                  <span className="font-semibold text-ink">
                    {ESTIMATED_GAS_LABEL}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}

          {showCreator ? (
            <div className="border-t border-white/[0.07] pt-4">
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
