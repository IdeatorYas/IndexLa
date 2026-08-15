"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AllocationChart, allocationColor } from "./AllocationChart";
import { AssetLogo } from "./AssetLogo";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { ESTIMATED_GAS_LABEL } from "./types";
import { surfaceClass } from "./ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function PortfolioDetailModal({
  portfolioId,
  onClose,
}: {
  portfolioId: string;
  onClose: () => void;
}) {
  const { published } = useSimulator();
  const portfolio = published.find(
    (p) => p.id === portfolioId && p.status !== "removed",
  );
  const [allocated, setAllocated] = useState(false);
  const [allocAmount, setAllocAmount] = useState(1000);

  useEffect(() => {
    setAllocated(false);
    setAllocAmount(1000);
  }, [portfolioId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!portfolio) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-detail-title"
      onClick={onClose}
    >
      <div
        className={`${surfaceClass} max-h-[90vh] w-full max-w-lg overflow-y-auto p-5 sm:p-7`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
              Portfolio detail
            </p>
            <h3
              id="portfolio-detail-title"
              className="display mt-1 text-[1.35rem] font-semibold tracking-[-0.02em] text-ink"
            >
              {portfolio.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 px-3 py-1 text-[0.8rem] font-semibold text-muted hover:text-ink"
          >
            Close
          </button>
        </div>

        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {portfolio.description}
        </p>

        <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-void/45 p-4">
          <AllocationChart assets={portfolio.assets} size={88} />
          <ul className="min-w-0 flex-1 space-y-1.5">
            {portfolio.assets.map((a, i) => (
              <li
                key={a.key}
                className="flex items-center justify-between gap-2 text-[0.82rem]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: allocationColor(i) }}
                  />
                  <span className="truncate font-semibold text-ink">
                    {a.ticker}
                  </span>
                </span>
                <span className="shrink-0 text-muted">
                  {a.pct}% · {usd((portfolio.amountUsd * a.pct) / 100)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-5 space-y-3 text-[0.92rem]">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Creator</dt>
            <dd className="font-semibold text-ink">You</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Type</dt>
            <dd className="font-semibold text-ink">{portfolio.portfolioType}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Strategy</dt>
            <dd className="text-right font-semibold text-ink">
              {strategyTitle(portfolio.strategyId)}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Rules</dt>
            <dd className="max-w-[62%] text-right text-ink">
              {summarizeStrategy(
                portfolio.strategyId,
                portfolio.strategyConfig,
                portfolio.hybrid,
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Status</dt>
            <dd className="font-semibold capitalize text-ink">
              {portfolio.status}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Execution Fee</dt>
            <dd className="font-semibold text-ink">
              1%
              {portfolio.amountUsd > 0
                ? ` · ${usd(portfolio.amountUsd * 0.01)}`
                : ""}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Estimated Gas</dt>
            <dd className="font-semibold text-ink">{ESTIMATED_GAS_LABEL}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Custody</dt>
            <dd className="font-semibold text-ink">Non-custodial</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Investment simulation</dt>
            <dd className="font-semibold text-electric">
              {portfolio.amountUsd > 0 ? usd(portfolio.amountUsd) : "Not set"}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">
          Share with your friends or community to earn 50% of applicable
          execution fees.
        </p>

        <div className="mt-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Assets & Allocations
          </p>
          <ul className="mt-2 space-y-1.5">
            {portfolio.assets.map((a) => (
              <li
                key={a.key}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-void/45 px-3 py-2.5 text-[0.9rem]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={28}
                  />
                  <span className="font-semibold text-ink">
                    {a.ticker}{" "}
                    <span className="font-normal text-muted">{a.name}</span>
                  </span>
                </span>
                <span className="shrink-0 text-right font-semibold text-electric">
                  {a.pct}%
                  <span className="mt-0.5 block text-[0.75rem] font-normal text-muted">
                    {usd((portfolio.amountUsd * a.pct) / 100)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-electric/25 bg-electric/[0.08] p-4">
          {allocated ? (
            <div>
              <p className="text-[1.05rem] font-semibold text-success">
                Allocation confirmed (simulated)
              </p>
              <p className="mt-1 text-[0.9rem] text-muted">
                {usd(allocAmount)} would be allocated to &ldquo;{portfolio.name}
                &rdquo;. No wallet or on-chain transaction was sent.
              </p>
              <Button
                variant="secondary"
                type="button"
                className="mt-4 !px-4 !py-2 !text-[0.85rem]"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-[0.95rem] font-semibold text-ink">
                Simulate Allocate
              </p>
              <p className="mt-1 text-[0.85rem] text-muted">
                Simulated confirmation only — no wallet, no real transaction.
              </p>
              <label className="mt-3 block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-muted">
                Amount (USD)
              </label>
              <input
                type="number"
                min={1}
                className="mt-2 w-full rounded-xl border border-white/10 bg-void/60 px-4 py-3 text-ink outline-none focus:border-electric/45"
                value={allocAmount}
                onChange={(e) =>
                  setAllocAmount(Math.max(0, Number(e.target.value) || 0))
                }
              />
              <Button
                type="button"
                className={`mt-4 !px-5 !py-2.5 ${allocAmount <= 0 ? "pointer-events-none opacity-40" : ""}`}
                onClick={() => {
                  if (allocAmount > 0) setAllocated(true);
                }}
              >
                Confirm Simulated Allocation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
