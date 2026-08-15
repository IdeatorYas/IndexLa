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
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
        selected
          ? "border-electric/40 bg-electric/[0.12] shadow-[0_0_20px_rgba(56,189,248,0.08)]"
          : "border-white/[0.06] bg-void/40 hover:border-white/15"
      }`}
    >
      <AssetLogo
        ticker={asset.ticker}
        name={asset.name}
        src={asset.src}
        size={32}
      />
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
    () => filterCatalog(query, typeFilter).slice(0, 80),
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
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Assets
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Select Assets
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Set how much of your portfolio goes to each asset. Total must equal
        exactly 100%.
      </p>

      <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="flex min-h-0 flex-col rounded-2xl border border-white/[0.08] bg-void/40 p-4 sm:p-5">
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
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "crypto", "stock", "commodity"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold capitalize transition-all ${
                  typeFilter === t ? chipActive : chipIdle
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 max-h-[20rem] flex-1 space-y-2 overflow-y-auto pr-1 lg:max-h-[24rem]">
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

        <div className="flex min-h-0 flex-col rounded-2xl border border-white/[0.08] bg-void/40 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className={labelClass}>Allocation</p>
            <button
              type="button"
              onClick={equalSplit}
              className="text-[0.78rem] font-semibold text-electric hover:text-ink disabled:opacity-40"
              disabled={draft.assets.length === 0}
            >
              Equal split
            </button>
          </div>

          {draft.assets.length > 0 ? (
            <div className="mt-3 flex justify-center">
              <AllocationChart assets={draft.assets} size={100} />
            </div>
          ) : null}

          {draft.assets.length === 0 ? (
            <p className="mt-4 flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-[0.95rem] text-muted lg:min-h-[16rem]">
              No assets selected yet.
            </p>
          ) : (
            <div className="mt-3 max-h-[16rem] flex-1 space-y-2 overflow-y-auto pr-1 lg:max-h-[18rem]">
              {draft.assets.map((a) => (
                <div
                  key={a.key}
                  className="rounded-xl border border-white/[0.07] bg-void/50 px-3 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <AssetLogo
                        ticker={a.ticker}
                        name={a.name}
                        src={a.src}
                        size={34}
                      />
                      <div className="min-w-0">
                        <p className="text-[0.92rem] font-semibold text-ink">
                          {a.ticker}{" "}
                          <span className="font-normal text-muted-dim">
                            — {a.name}
                          </span>
                        </p>
                        <p className="mt-0.5 text-[0.7rem] text-muted-dim">
                          {a.type}
                          {a.networks?.length
                            ? ` · ${a.networks.join(", ")}`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(a)}
                      className="text-[0.72rem] font-semibold text-muted hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple to-electric transition-all duration-300"
                        style={{ width: `${Math.min(100, a.pct)}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={a.pct}
                        onChange={(e) => setPct(a.key, Number(e.target.value))}
                        className="w-24 rounded-lg border border-white/10 bg-void/70 px-3 py-2 text-[0.95rem] text-ink outline-none focus:border-electric/45"
                      />
                      <span className="text-[0.85rem] text-muted">%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className={`mt-auto pt-4 ${
              draft.assets.length === 0 ? "" : ""
            }`}
          >
            <div
              className={`rounded-xl border px-4 py-3 text-center transition-colors ${
                total === 100
                  ? "border-success/40 bg-success/10"
                  : "border-white/[0.08] bg-void/40"
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
    </div>
  );
}
