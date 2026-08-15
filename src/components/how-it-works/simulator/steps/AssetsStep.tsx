"use client";

import { useMemo, useState } from "react";
import { AllocationChart } from "../AllocationChart";
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
      className={`flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-all duration-200 ${
        selected
          ? "border-electric/40 bg-electric/[0.12]"
          : "border-white/[0.06] bg-void/40 hover:border-white/15"
      }`}
    >
      <AssetLogo
        ticker={asset.ticker}
        name={asset.name}
        src={asset.src}
        size={28}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.85rem] font-semibold text-ink">
          {asset.ticker}
        </span>
        <span className="block truncate text-[0.68rem] text-muted-dim">
          {asset.name}
        </span>
      </span>
      <span
        className={`text-[0.68rem] font-semibold ${selected ? "text-electric" : "text-muted-dim"}`}
      >
        {selected ? "✓" : "+"}
      </span>
    </button>
  );
}

export function AssetsStep() {
  const { draft, setAssets } = useSimulator();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "crypto" | "stock" | "commodity"
  >("all");

  const results = useMemo(
    () => filterCatalog(query, typeFilter).slice(0, 80),
    [query, typeFilter],
  );

  const total = allocationTotal(draft.assets);
  const remaining = Math.round((100 - total) * 100) / 100;

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

  const totalBanner = (
    <div
      className={`rounded-xl border px-3 py-2.5 transition-colors ${
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
  );

  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Assets
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Select & Allocate
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Set how much of your portfolio goes to each asset. Total must equal
        exactly 100%.
      </p>

      <div className="mt-5 flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
        {/* Allocation first on mobile — always visible, compact */}
        <div className="order-1 flex flex-col rounded-2xl border border-white/[0.08] bg-void/40 p-3 sm:p-4 lg:order-2">
          <div className="flex items-center justify-between gap-2">
            <p className={labelClass}>Allocation</p>
            <button
              type="button"
              onClick={equalSplit}
              className="text-[0.75rem] font-semibold text-electric hover:text-ink disabled:opacity-40"
              disabled={draft.assets.length === 0}
            >
              Equal split
            </button>
          </div>

          {totalBanner}

          {draft.assets.length > 0 ? (
            <div className="mt-3 flex justify-center">
              <AllocationChart assets={draft.assets} size={88} />
            </div>
          ) : null}

          {draft.assets.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-white/15 px-3 py-8 text-center text-[0.9rem] text-muted">
              Select assets from the catalog to allocate.
            </p>
          ) : (
            <div className="mt-3 space-y-1.5">
              {draft.assets.map((a) => (
                <div
                  key={a.key}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-void/55 px-2 py-1.5"
                >
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={26}
                  />
                  <span className="w-12 shrink-0 text-[0.8rem] font-semibold text-ink">
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
                      className="w-[3.25rem] rounded-lg border border-white/10 bg-void/70 px-1.5 py-1 text-center text-[0.85rem] font-semibold text-ink outline-none focus:border-electric/45"
                    />
                    <span className="text-[0.75rem] text-muted">%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(a)}
                    className="shrink-0 px-1 text-[0.7rem] font-semibold text-muted hover:text-ink"
                    aria-label={`Remove ${a.ticker}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Catalog */}
        <div className="order-2 flex min-h-0 flex-col rounded-2xl border border-white/[0.08] bg-void/40 p-3 sm:p-4 lg:order-1">
          <label htmlFor="asset-search" className={labelClass}>
            Search / Select Assets
          </label>
          <input
            id="asset-search"
            className={fieldClass}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BTC, NVIDIA, Gold…"
          />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {(["all", "crypto", "stock", "commodity"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold capitalize transition-all ${
                  typeFilter === t ? chipActive : chipIdle
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-3 max-h-[14rem] space-y-1.5 overflow-y-auto pr-1 sm:max-h-[18rem] lg:max-h-[22rem]">
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
      </div>
    </div>
  );
}
