"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
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
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 sm:items-center"
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
            <dt className="text-muted">Config</dt>
            <dd className="max-w-[60%] text-right text-ink">
              {summarizeStrategy(
                portfolio.strategyId,
                portfolio.strategyConfig,
                portfolio.hybridRules.length,
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
            <dd className="font-semibold text-ink">1%</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Creator Share</dt>
            <dd className="font-semibold text-ink">50%</dd>
          </div>
        </dl>

        <div className="mt-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
            Assets
          </p>
          <ul className="mt-2 space-y-1.5">
            {portfolio.assets.map((a) => (
              <li
                key={a.key}
                className="flex justify-between rounded-lg border border-white/[0.06] bg-void/40 px-3 py-2 text-[0.9rem]"
              >
                <span className="font-semibold text-ink">
                  {a.ticker}{" "}
                  <span className="font-normal text-muted">{a.name}</span>
                </span>
                <span className="text-electric">{a.pct}%</span>
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
                Allocate to Portfolio
              </p>
              <p className="mt-1 text-[0.85rem] text-muted">
                Simulated confirmation only.
              </p>
              <label className="mt-3 block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-muted">
                Amount (USD)
              </label>
              <input
                type="number"
                min={1}
                className="mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-ink outline-none focus:border-electric/45"
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
                Confirm Allocation
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
