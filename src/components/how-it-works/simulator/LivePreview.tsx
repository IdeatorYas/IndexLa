"use client";

import { AllocationChart, allocationColor } from "./AllocationChart";
import { AssetLogo } from "./AssetLogo";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { allocationTotal } from "./types";
import { surfaceClass } from "./ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function LivePreview() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;

  const total = allocationTotal(draft.assets);
  const fee = draft.amountUsd * 0.01;

  return (
    <aside
      className={`${surfaceClass} sticky top-24 hidden h-fit p-5 xl:block`}
      aria-label="Live product preview"
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Live Preview
      </p>
      <p className="mt-1 display text-[1.2rem] font-semibold tracking-[-0.02em] text-ink">
        {draft.name.trim() || "Untitled Portfolio"}
      </p>
      <p className="mt-1 text-[0.82rem] text-muted">
        {draft.portfolioType || "Select a portfolio type"}
      </p>

      <div className="mt-5">
        <AllocationChart assets={draft.assets} size={120} />
      </div>

      <div className="mt-4 max-h-36 space-y-1.5 overflow-y-auto pr-1">
        {draft.assets.length === 0 ? (
          <p className="text-center text-[0.82rem] text-muted-dim">
            Select assets to preview allocation
          </p>
        ) : (
          draft.assets.map((a, i) => (
            <div
              key={a.key}
              className="flex items-center justify-between gap-2 text-[0.8rem]"
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
                  size={18}
                />
                <span className="truncate font-semibold text-ink">{a.ticker}</span>
              </span>
              <span className="shrink-0 text-muted">{a.pct}%</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 text-[0.82rem]">
        <div className="flex justify-between gap-2">
          <span className="text-muted">Total</span>
          <span
            className={`font-semibold ${total === 100 ? "text-success" : "text-ink"}`}
          >
            {total}%
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted">Strategy</span>
          <span className="max-w-[58%] text-right font-semibold text-ink">
            {draft.strategyId ? strategyTitle(draft.strategyId) : "—"}
          </span>
        </div>
        {draft.strategyId ? (
          <p className="text-[0.75rem] leading-snug text-muted">
            {summarizeStrategy(
              draft.strategyId,
              draft.strategyConfig,
              draft.hybrid,
            )}
          </p>
        ) : null}
        <div className="flex justify-between gap-2">
          <span className="text-muted">Simulated USD</span>
          <span className="font-semibold text-electric">
            {usd(draft.amountUsd)}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted">Execution Fee</span>
          <span className="font-semibold text-ink">1% · {usd(fee)}</span>
        </div>
      </div>
    </aside>
  );
}

export function LivePreviewCompact() {
  const { draft, step } = useSimulator();
  if (step === "success") return null;

  const total = allocationTotal(draft.assets);

  return (
    <div className="mb-5 rounded-2xl border border-white/[0.08] bg-void/50 p-3 xl:hidden">
      <div className="flex items-center gap-3">
        <AllocationChart assets={draft.assets} size={64} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-semibold text-ink">
            {draft.name.trim() || "Untitled Portfolio"}
          </p>
          <p className="truncate text-[0.78rem] text-muted">
            {draft.portfolioType || "Type pending"} ·{" "}
            {draft.strategyId
              ? strategyTitle(draft.strategyId)
              : "Strategy pending"}
          </p>
          <p className="mt-1 text-[0.78rem] text-muted">
            <span className={total === 100 ? "text-success" : "text-ink"}>
              {total}%
            </span>{" "}
            · {usd(draft.amountUsd)} · Fee 1%
          </p>
        </div>
      </div>
    </div>
  );
}
