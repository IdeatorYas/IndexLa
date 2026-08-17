"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AllocationBars, allocationColor } from "../AllocationChart";
import { AssetLogo } from "../AssetLogo";
import { filterCatalog } from "../assetCatalog";
import { useSimulator } from "../SimulatorContext";
import {
  allocationTotal,
  equalWeightAssets,
  setAssetPctKeepTotal,
  type CatalogAsset,
  type SelectedAsset,
} from "../types";
import { chipActive, chipIdle, fieldClass } from "../ui";

type Phase = 1 | 2 | 3;

function formatPct(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  if (Math.abs(rounded - Math.round(rounded)) < 0.001) {
    return String(Math.round(rounded));
  }
  return String(rounded);
}

function StepHeader({
  phase,
  title,
  instruction,
}: {
  phase: Phase;
  title: string;
  instruction: string;
}) {
  return (
    <div className="shrink-0">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
          {phase} / 3
        </p>
        <ol className="flex items-center gap-1.5" aria-label="Setup progress">
          {([1, 2, 3] as const).map((n) => (
            <li
              key={n}
              className={`h-1.5 w-6 rounded-full ${
                n < phase
                  ? "bg-success/80"
                  : n === phase
                    ? "bg-electric"
                    : "bg-white/10"
              }`}
            />
          ))}
        </ol>
      </div>
      <h3 className="display mt-2 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-1 text-[0.92rem] leading-snug text-muted">{instruction}</p>
    </div>
  );
}

function SelectAssets({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  results,
  selected,
  onToggle,
}: {
  query: string;
  setQuery: (v: string) => void;
  typeFilter: "all" | "crypto" | "stock" | "commodity";
  setTypeFilter: (t: "all" | "crypto" | "stock" | "commodity") => void;
  results: CatalogAsset[];
  selected: SelectedAsset[];
  onToggle: (asset: CatalogAsset) => void;
}) {
  const selectedKeys = new Set(selected.map((a) => a.key));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {selected.length > 0 ? (
        <div className="mt-3 shrink-0">
          <p className="text-[0.78rem] font-semibold text-ink">
            {selected.length} selected
            <span className="font-normal text-muted"> · tap to remove</span>
          </p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {selected.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => onToggle(a)}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-electric/40 bg-electric/15 px-3 py-2 text-[0.88rem] font-semibold text-ink"
              >
                <AssetLogo ticker={a.ticker} name={a.name} src={a.src} size={22} />
                {a.ticker}
                <span className="text-muted">×</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-[0.92rem] text-muted-dim">
          Select at least one asset to continue.
        </p>
      )}

      <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-void/40 p-3">
        <label htmlFor="mobile-asset-search" className="sr-only">
          Search assets
        </label>
        <input
          id="mobile-asset-search"
          className={`${fieldClass} !mt-0 !py-3 text-[1rem]`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="BTC, NVIDIA, Gold…"
        />
        <div className="mt-2.5 flex flex-wrap gap-2">
          {(["all", "crypto", "stock", "commodity"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={`min-h-10 rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold capitalize ${
                typeFilter === t ? chipActive : chipIdle
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-2.5 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain">
          {results.map((a) => {
            const isOn = selectedKeys.has(a.key);
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => onToggle(a)}
                className={`flex min-h-[3.5rem] w-full items-center gap-3 rounded-xl border px-3 py-3 text-left ${
                  isOn
                    ? "border-electric/45 bg-electric/[0.14]"
                    : "border-white/[0.07] bg-void/50"
                }`}
              >
                <AssetLogo ticker={a.ticker} name={a.name} src={a.src} size={36} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[1rem] font-semibold text-ink">
                    {a.ticker}
                  </span>
                  <span className="block truncate text-[0.82rem] text-muted">
                    {a.name}
                  </span>
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.95rem] font-semibold ${
                    isOn
                      ? "bg-electric/25 text-electric"
                      : "bg-white/[0.06] text-muted-dim"
                  }`}
                >
                  {isOn ? "✓" : "+"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SetAllocations({
  assets,
  total,
  onAdjust,
  onSetPct,
}: {
  assets: SelectedAsset[];
  total: number;
  onAdjust: (key: string, delta: number) => void;
  onSetPct: (key: string, pct: number) => void;
}) {
  return (
    <div className="mt-3 flex min-h-0 flex-1 flex-col">
      <div
        className={`shrink-0 rounded-xl border px-4 py-3 ${
          total === 100
            ? "border-success/40 bg-success/10"
            : "border-white/[0.08] bg-void/50"
        }`}
      >
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Total Allocation
        </p>
        <p
          className={`display mt-0.5 text-[1.65rem] font-semibold tabular-nums leading-none ${
            total === 100 ? "text-success" : "text-ink"
          }`}
        >
          {formatPct(total)}%
        </p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="flex h-full w-full">
            {assets.map((a, i) => (
              <div
                key={a.key}
                className="h-full"
                style={{
                  width: `${Math.max(0, a.pct)}%`,
                  background: allocationColor(i),
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pb-1">
        <div className="flex items-center justify-between px-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          <span>Asset</span>
          <span>Allocation %</span>
        </div>
        {assets.map((a, i) => (
          <div
            key={a.key}
            className="rounded-2xl border border-white/[0.08] bg-void/50 px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: allocationColor(i) }}
              />
              <AssetLogo ticker={a.ticker} name={a.name} src={a.src} size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-[1rem] font-semibold text-ink">{a.ticker}</p>
                <p className="truncate text-[0.8rem] text-muted">{a.name}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onAdjust(a.key, -1)}
                disabled={a.pct <= 0}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-void/80 text-[1.4rem] font-semibold text-ink disabled:opacity-30"
                aria-label={`Decrease ${a.ticker}`}
              >
                −
              </button>
              <label className="flex min-w-0 flex-1 items-baseline justify-center gap-1">
                <span className="sr-only">{a.ticker} allocation percent</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formatPct(a.pct)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^\d.]/g, "");
                    if (raw === "") return;
                    onSetPct(a.key, Number(raw));
                  }}
                  className="w-[5.5rem] bg-transparent text-center text-[1.7rem] font-semibold tabular-nums text-ink outline-none"
                />
                <span className="text-[1.05rem] font-semibold text-muted">%</span>
              </label>
              <button
                type="button"
                onClick={() => onAdjust(a.key, 1)}
                disabled={a.pct >= 100}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-void/80 text-[1.4rem] font-semibold text-ink disabled:opacity-30"
                aria-label={`Increase ${a.ticker}`}
              >
                +
              </button>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(0, Math.min(100, a.pct))}%`,
                  background: allocationColor(i),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewPortfolio({ assets, total }: { assets: SelectedAsset[]; total: number }) {
  return (
    <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div
        className={`rounded-xl border px-4 py-3 ${
          total === 100
            ? "border-success/40 bg-success/10"
            : "border-white/[0.08] bg-void/50"
        }`}
      >
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Total Allocation
        </p>
        <p
          className={`display mt-0.5 text-[1.65rem] font-semibold tabular-nums ${
            total === 100 ? "text-success" : "text-ink"
          }`}
        >
          {formatPct(total)}%
        </p>
      </div>
      <div className="mt-4">
        <AllocationBars assets={assets} />
      </div>
    </div>
  );
}

export function MobileAssetsFlow() {
  const { draft, setAssets, goNext, goBack } = useSimulator();
  const [phase, setPhase] = useState<Phase>(1);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "crypto" | "stock" | "commodity"
  >("all");

  const total = allocationTotal(draft.assets);
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

  function onAdjust(key: string, delta: number) {
    const current = draft.assets.find((a) => a.key === key);
    if (!current) return;
    setAssets(setAssetPctKeepTotal(draft.assets, key, current.pct + delta));
  }

  function onSetPct(key: string, pct: number) {
    if (!Number.isFinite(pct)) return;
    setAssets(setAssetPctKeepTotal(draft.assets, key, pct));
  }

  function onBack() {
    if (phase === 1) {
      goBack();
      return;
    }
    setPhase((p) => (p === 3 ? 2 : 1));
  }

  function onContinue() {
    if (phase === 1) {
      if (draft.assets.length < 1) return;
      setAssets(equalWeightAssets(draft.assets));
      setPhase(2);
      return;
    }
    if (phase === 2) {
      if (total !== 100) return;
      setPhase(3);
      return;
    }
    if (total !== 100 || draft.assets.length < 1) return;
    goNext();
  }

  const canContinue =
    phase === 1
      ? draft.assets.length >= 1
      : total === 100 && draft.assets.length >= 1;

  const titles: Record<Phase, { title: string; instruction: string; cta: string }> = {
    1: {
      title: "Select Assets",
      instruction: "Choose what belongs in this portfolio. Allocations come next.",
      cta: "Continue →",
    },
    2: {
      title: "Set Allocations",
      instruction: "Equal weights are applied. Adjust any asset — the total stays 100%.",
      cta: "Continue →",
    },
    3: {
      title: "Review Portfolio",
      instruction: "Confirm assets and weights before continuing.",
      cta: "Confirm Portfolio →",
    },
  };

  return (
    <div className="flex h-full min-h-0 flex-col pt-2">
      <StepHeader
        phase={phase}
        title={titles[phase].title}
        instruction={titles[phase].instruction}
      />

      {phase === 1 ? (
        <SelectAssets
          query={query}
          setQuery={setQuery}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          results={results}
          selected={draft.assets}
          onToggle={toggle}
        />
      ) : null}
      {phase === 2 ? (
        <SetAllocations
          assets={draft.assets}
          total={total}
          onAdjust={onAdjust}
          onSetPct={onSetPct}
        />
      ) : null}
      {phase === 3 ? (
        <ReviewPortfolio assets={draft.assets} total={total} />
      ) : null}

      <div className="-mx-3 shrink-0 border-t border-white/[0.08] bg-void/95 px-3 pt-3 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            className="!min-h-12 !px-5 !py-3 text-[0.95rem]"
            type="button"
          >
            Back
          </Button>
          <Button
            onClick={onContinue}
            className={`!min-h-12 !px-5 !py-3 text-[0.95rem] ${
              !canContinue ? "pointer-events-none opacity-40" : ""
            }`}
            type="button"
          >
            {titles[phase].cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
