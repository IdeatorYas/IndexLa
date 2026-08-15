"use client";

import { AllocationChart } from "../AllocationChart";
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
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Allocation
        </p>
        <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
          Set Allocations
        </h3>
        <p className="mt-4 text-muted">
          No assets selected. Go back and choose assets first.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Allocation
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Set Allocations
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Set how much of your portfolio goes to each asset. Total must equal
        exactly 100%.
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className={labelClass}>Allocation</p>
        <button
          type="button"
          onClick={equalSplit}
          className="text-[0.78rem] font-semibold text-electric hover:text-ink"
        >
          Equal split
        </button>
      </div>

      <div
        className={`mt-2 rounded-xl border px-3 py-2.5 transition-colors ${
          total === 100
            ? "border-success/40 bg-success/10"
            : total > 100
              ? "border-amber-400/40 bg-amber-400/10"
              : "border-white/[0.08] bg-void/50"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
              Total Allocation
            </p>
            <p
              className={`display text-[1.35rem] font-semibold leading-none ${
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
          <div className="text-right text-[0.85rem]">
            {total === 100 ? (
              <span className="font-semibold text-success">Ready</span>
            ) : total > 100 ? (
              <span className="font-semibold text-amber-200">
                Allocation exceeds 100%
              </span>
            ) : (
              <span className="text-muted">
                <strong className="text-ink">{remaining}%</strong> remaining
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <AllocationChart assets={draft.assets} size={112} />
      </div>

      <div className="mt-4 space-y-1.5">
        {draft.assets.map((a) => (
          <div
            key={a.key}
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-void/55 px-2.5 py-2"
          >
            <AssetLogo ticker={a.ticker} name={a.name} src={a.src} size={28} />
            <span className="w-14 shrink-0 text-[0.85rem] font-semibold text-ink">
              {a.ticker}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={a.pct}
              onChange={(e) => setPct(a.key, Number(e.target.value))}
              className="min-w-0 flex-1 accent-electric"
              aria-label={`${a.ticker} allocation`}
            />
            <div className="flex shrink-0 items-center gap-0.5">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={a.pct}
                onChange={(e) => setPct(a.key, Number(e.target.value))}
                className="w-[3.4rem] rounded-lg border border-white/10 bg-void/70 px-1.5 py-1.5 text-center text-[0.9rem] font-semibold text-ink outline-none focus:border-electric/45"
              />
              <span className="text-[0.75rem] text-muted">%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
