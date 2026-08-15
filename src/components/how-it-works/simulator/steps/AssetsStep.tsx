"use client";

import { useMemo, useState } from "react";
import { AssetLogo } from "../AssetLogo";
import { filterCatalog } from "../assetCatalog";
import { useSimulator } from "../SimulatorContext";
import { type CatalogAsset, type SelectedAsset } from "../types";
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

  function toggle(asset: CatalogAsset) {
    const exists = draft.assets.find((a) => a.key === asset.key);
    if (exists) {
      setAssets(draft.assets.filter((a) => a.key !== asset.key));
      return;
    }
    const next: SelectedAsset = { ...asset, pct: 0 };
    setAssets([...draft.assets, next]);
  }

  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Assets
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
          Select Assets
        </h3>
        <p className="mt-1 text-[0.85rem] text-muted">Select what you own.</p>

        {draft.assets.length > 0 ? (
          <div className="mt-2.5 flex max-h-[4.5rem] flex-wrap gap-1.5 overflow-y-auto">
            {draft.assets.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => toggle(a)}
                className="inline-flex items-center gap-1.5 rounded-full border border-electric/35 bg-electric/10 px-2.5 py-1 text-[0.75rem] font-semibold text-ink"
              >
                <AssetLogo
                  ticker={a.ticker}
                  name={a.name}
                  src={a.src}
                  size={16}
                />
                {a.ticker}
                <span className="text-muted">×</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-[0.82rem] text-muted-dim">Not set</p>
        )}
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void/40 p-2.5 sm:p-3">
        <label htmlFor="asset-search" className={labelClass}>
          Search / Select Assets
        </label>
        <input
          id="asset-search"
          className={`${fieldClass} !mt-1.5 !py-2.5`}
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
    </div>
  );
}
