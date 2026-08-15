"use client";

import { AssetLogo } from "../AssetLogo";
import { useSimulator } from "../SimulatorContext";
import { allocationTotal } from "../types";
import { labelClass } from "../ui";

export function AllocationStep() {
  const { draft, setAssets } = useSimulator();
  const total = allocationTotal(draft.assets);
  const remaining = Math.round((100 - total) * 100) / 100;

  function setPct(key: string, pct: number) {
    const safe = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;
    setAssets(
      draft.assets.map((a) => (a.key === key ? { ...a, pct: safe } : a)),
    );
  }

  function equalSplit() {
    if (draft.assets.length === 0) return;
    const n = draft.assets.length;
    const base = Math.floor((100 / n) * 100) / 100;
    let rem = 100;
    const next = draft.assets.map((a, i) => {
      if (i === n - 1) return { ...a, pct: Math.round(rem * 100) / 100 };
      rem = Math.round((rem - base) * 100) / 100;
      return { ...a, pct: base };
    });
    setAssets(next);
  }

  if (draft.assets.length === 0) {
    return (
      <div className="flex h-full items-center justify-center py-6 text-center">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Step · Allocation
          </p>
          <h3 className="display mt-1 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
            Set Allocations
          </h3>
          <p className="mt-3 text-muted">
            No assets selected. Go back and choose assets first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      <div className="shrink-0">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Step · Allocation
            </p>
            <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
              Set Allocations
            </h3>
          </div>
          <button
            type="button"
            onClick={equalSplit}
            className="shrink-0 text-[0.78rem] font-semibold text-electric hover:text-ink"
          >
            Equal split
          </button>
        </div>
        <p className="mt-1 text-[0.85rem] text-muted">
          Asset · Allocation %. Total must equal 100%.
        </p>

        <div
          className={`mt-3 rounded-xl border px-3 py-2 transition-colors ${
            total === 100
              ? "border-success/40 bg-success/10"
              : total > 100
                ? "border-amber-400/40 bg-amber-400/10"
                : "border-white/[0.08] bg-void/50"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <p className={labelClass}>Total</p>
              <p
                className={`display text-[1.25rem] font-semibold leading-none ${
                  total === 100
                    ? "text-success"
                    : total > 100
                      ? "text-amber-200"
                      : "text-ink"
                }`}
              >
                {total}%
              </p>
            </div>
            <div className="text-right text-[0.82rem]">
              {total === 100 ? (
                <span className="font-semibold text-success">Ready</span>
              ) : total > 100 ? (
                <span className="font-semibold text-amber-200">
                  Over allocated
                </span>
              ) : (
                <span className="text-muted">
                  <strong className="text-ink">{remaining}%</strong> remaining
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_5.5rem] gap-2 px-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          <span>Asset</span>
          <span className="text-right">Allocation %</span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain pr-0.5">
        {draft.assets.map((a) => (
          <div
            key={a.key}
            className="grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-2 rounded-xl border border-white/[0.07] bg-void/55 px-2.5 py-1.5"
          >
            <div className="flex min-w-0 items-center gap-2">
              <AssetLogo
                ticker={a.ticker}
                name={a.name}
                src={a.src}
                size={26}
              />
              <div className="min-w-0">
                <p className="truncate text-[0.85rem] font-semibold text-ink">
                  {a.ticker}
                </p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={a.pct}
                  onChange={(e) => setPct(a.key, Number(e.target.value))}
                  className="mt-0.5 w-full accent-electric"
                  aria-label={`${a.ticker} allocation`}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-0.5">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={a.pct}
                onChange={(e) => setPct(a.key, Number(e.target.value))}
                className="w-[3.25rem] rounded-lg border border-white/10 bg-void/70 px-1 py-1 text-center text-[0.88rem] font-semibold text-ink outline-none focus:border-electric/45"
              />
              <span className="text-[0.72rem] text-muted">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
