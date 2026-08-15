"use client";

import { useMemo, useState } from "react";
import { filterCatalog } from "../assetCatalog";
import { useSimulator } from "../SimulatorContext";
import { allocationTotal, type CatalogAsset, type SelectedAsset } from "../types";
import { fieldClass, labelClass } from "../ui";

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
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
        selected
          ? "border-electric/40 bg-electric/[0.1]"
          : "border-white/[0.06] bg-void/40 hover:border-white/15"
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-panel text-[0.65rem] font-semibold text-ink">
        {asset.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset.src} alt="" width={18} height={18} className="object-contain" />
        ) : (
          asset.ticker.slice(0, 2)
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9rem] font-semibold text-ink">
          {asset.ticker}
        </span>
        <span className="block truncate text-[0.72rem] text-muted-dim">
          {asset.name} · {asset.type}
        </span>
      </span>
      <span
        className={`text-[0.72rem] font-semibold ${selected ? "text-electric" : "text-muted-dim"}`}
      >
        {selected ? "Selected" : "Add"}
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
    () => filterCatalog(query, typeFilter).slice(0, 60),
    [query, typeFilter],
  );

  const total = allocationTotal(draft.assets);

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
    let remaining = 100;
    const next = draft.assets.map((a, i) => {
      if (i === n - 1) return { ...a, pct: Math.round(remaining * 100) / 100 };
      remaining = Math.round((remaining - base) * 100) / 100;
      return { ...a, pct: base };
    });
    setAssets(next);
  }

  return (
    <div>
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Select Assets
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Search and select assets, then set allocations to exactly 100%.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="asset-search" className={labelClass}>
            Search
          </label>
          <input
            id="asset-search"
            className={fieldClass}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BTC, NVIDIA, Gold…"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "crypto", "stock", "commodity"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold capitalize ${
                  typeFilter === t
                    ? "border-electric/40 bg-electric/15 text-electric"
                    : "border-line bg-void/40 text-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
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

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className={labelClass}>Selected · Allocation %</p>
            <button
              type="button"
              onClick={equalSplit}
              className="text-[0.78rem] font-semibold text-electric hover:text-ink"
              disabled={draft.assets.length === 0}
            >
              Equal split
            </button>
          </div>

          {draft.assets.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-line px-4 py-8 text-center text-[0.95rem] text-muted">
              No assets selected yet.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {draft.assets.map((a) => (
                <div
                  key={a.key}
                  className="rounded-xl border border-white/[0.06] bg-void/45 px-3 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.92rem] font-semibold text-ink">
                        {a.ticker}{" "}
                        <span className="text-muted-dim">— {a.name}</span>
                      </p>
                      <p className="mt-0.5 text-[0.7rem] text-muted-dim">
                        {a.type}
                        {a.networks?.length
                          ? ` · ${a.networks.join(", ")}`
                          : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(a)}
                      className="text-[0.72rem] font-semibold text-muted hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={a.pct}
                      onChange={(e) => setPct(a.key, Number(e.target.value))}
                      className="w-24 rounded-lg border border-line bg-void/70 px-3 py-2 text-[0.95rem] text-ink outline-none focus:border-electric/45"
                    />
                    <span className="text-[0.85rem] text-muted">%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-center ${
              total === 100
                ? "border-success/40 bg-success/10"
                : "border-line bg-void/40"
            }`}
          >
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
              Total Allocation
            </p>
            <p
              className={`mt-1 display text-[1.35rem] font-semibold ${
                total === 100 ? "text-success" : "text-ink"
              }`}
            >
              {total}%
            </p>
            {total !== 100 ? (
              <p className="mt-1 text-[0.82rem] text-muted">
                Must equal exactly 100% to continue
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
