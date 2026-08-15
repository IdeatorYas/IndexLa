"use client";

import { useMemo, useState } from "react";
import { AssetLogo } from "../AssetLogo";
import { filterCatalog } from "../assetCatalog";
import { useSimulator } from "../SimulatorContext";
import { allocationTotal, type CatalogAsset, type SelectedAsset } from "../types";
import { chipActive, chipIdle, fieldClass, labelClass } from "../ui";

function AssetRow({
  asset,
  selected,
  onToggle,
}: {
  asset: CatalogAsset;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left transition-all duration-200 ${
        selected
          ? "border-electric/40 bg-electric/[0.12]"
          : "border-white/[0.06] bg-void/40 hover:border-white/15"
      }`}
    >
      <AssetLogo
        ticker={asset.ticker}
        name={asset.name}
        src={asset.src}
        size={24}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.82rem] font-semibold text-ink">
          {asset.ticker}
        </span>
        <span className="block truncate text-[0.65rem] text-muted-dim">
          {asset.name}
        </span>
      </span>
      <span
        className={`text-[0.65rem] font-semibold ${selected ? "text-electric" : "text-muted-dim"}`}
      >
        {selected ? "✓" : "+"}
      </span>
    </button>
  );
}

/** Combined Assets + Allocation on one screen. */
export function AssetsAllocationStep() {
  const { draft, setAssets } = useSimulator();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "crypto" | "stock" | "commodity"
  >("all");

  const total = allocationTotal(draft.assets);
  const remaining = Math.round((100 - total) * 100) / 100;

  const results = useMemo(
    () => filterCatalog(query, typeFilter).slice(0, 80),
    [query, typeFilter],
  );

  function toggle(asset: CatalogAsset) {
    const exists = draft.assets.find((a) => a.key === asset.key);
    if (exists) {
      setAssets(draft.assets.filter((a) => a.key !== asset.key));
      return;
    }
    const next: SelectedAsset = { ...asset, pct: 0 };
    setAssets([...draft.assets, next]);
  }

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

  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Assets & Allocation
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
          Select Assets & Set Allocations
        </h3>
        <p className="mt-1 text-[0.85rem] text-muted">
          Choose assets and decide how much of each. Total must equal 100%.
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
      </div>

      <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-2">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void/40 p-2.5">
          <label htmlFor="asset-search" className={labelClass}>
            Search / Select Assets
          </label>
          <input
            id="asset-search"
            className={`${fieldClass} !mt-1.5 !py-2`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BTC, NVIDIA, Gold…"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(["all", "crypto", "stock", "commodity"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold capitalize transition-all ${
                  typeFilter === t ? chipActive : chipIdle
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-2 min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-0.5">
            {results.map((a) => (
              <AssetRow
                key={a.key}
                asset={a}
                selected={draft.assets.some((s) => s.key === a.key)}
                onToggle={() => toggle(a)}
              />
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void/40 p-2.5">
          <div className="flex shrink-0 items-center justify-between gap-2">
            <p className={labelClass}>Allocation</p>
            {draft.assets.length > 0 ? (
              <button
                type="button"
                onClick={equalSplit}
                className="text-[0.75rem] font-semibold text-electric hover:text-ink"
              >
                Equal split
              </button>
            ) : null}
          </div>

          {draft.assets.length === 0 ? (
            <p className="mt-4 text-center text-[0.85rem] text-muted-dim">
              Select assets to set allocations.
            </p>
          ) : (
            <div className="mt-2 min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain pr-0.5">
              {draft.assets.map((a) => (
                <div
                  key={a.key}
                  className="grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-2 rounded-xl border border-white/[0.07] bg-void/55 px-2.5 py-1.5"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggle(a)}
                      className="text-[0.7rem] text-muted hover:text-ink"
                      aria-label={`Remove ${a.ticker}`}
                    >
                      ×
                    </button>
                    <AssetLogo
                      ticker={a.ticker}
                      name={a.name}
                      src={a.src}
                      size={24}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.82rem] font-semibold text-ink">
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
          )}
        </div>
      </div>
    </div>
  );
}
