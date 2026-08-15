"use client";

import { useState } from "react";
import { AllocationChart, allocationColor } from "../AllocationChart";
import { AssetLogo } from "../AssetLogo";
import { useSimulator } from "../SimulatorContext";
import { ESTIMATED_GAS_LABEL } from "../types";
import { fieldClass, labelClass } from "../ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function AmountStep() {
  const { draft, updateDraft } = useSimulator();
  const amount = draft.amountUsd;
  const fee = amount > 0 ? amount * 0.01 : 0;
  const [simActivity, setSimActivity] = useState(10_000_000);

  function setAmount(n: number) {
    updateDraft({ amountUsd: Math.max(0, Math.min(1_000_000, n || 0)) });
  }

  const simFees = simActivity * 0.01;
  const simCreator = simFees * 0.5;

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Investment
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Investment Amount
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Enter the USD amount you want to simulate. Fees calculate instantly.
      </p>

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-void/50 p-4 sm:p-5">
        <label htmlFor="usd-amount" className={labelClass}>
          Investment Amount (USD)
        </label>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            $
          </span>
          <input
            id="usd-amount"
            type="number"
            min={0}
            max={1000000}
            step={100}
            placeholder="0"
            className={`${fieldClass} !mt-0 pl-8 text-[1.15rem] font-semibold`}
            value={amount > 0 ? amount : ""}
            onChange={(e) =>
              setAmount(e.target.value === "" ? 0 : Number(e.target.value))
            }
          />
        </div>
        <input
          type="range"
          min={1000}
          max={100000}
          step={500}
          value={amount > 0 ? Math.min(100000, Math.max(1000, amount)) : 1000}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4 w-full accent-electric"
          aria-label="USD amount slider"
        />
        <div className="mt-1 flex justify-between text-[0.72rem] text-muted-dim">
          <span>$1,000</span>
          <span className="font-semibold text-electric">
            {amount > 0 ? usd(amount) : "Not set"}
          </span>
          <span>$100,000</span>
        </div>
      </div>

      {amount > 0 && draft.assets.length > 0 ? (
        <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <AllocationChart assets={draft.assets} size={112} />
          <div className="w-full flex-1 space-y-2">
            {draft.assets.map((a, i) => {
              const dollars = (amount * a.pct) / 100;
              return (
                <div
                  key={a.key}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-void/50 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: allocationColor(i) }}
                    />
                    <AssetLogo
                      ticker={a.ticker}
                      name={a.name}
                      src={a.src}
                      size={26}
                    />
                    <p className="text-[0.9rem] font-semibold text-ink">
                      {a.ticker}{" "}
                      <span className="font-normal text-muted">{a.pct}%</span>
                    </p>
                  </div>
                  <p className="text-[0.95rem] font-semibold text-electric">
                    {usd(dollars)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.08] bg-void/45 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Execution Fee
          </p>
          <p className="mt-2 text-[1.15rem] font-semibold text-ink">
            1%
            {amount > 0 ? (
              <span className="text-electric"> · {usd(fee)}</span>
            ) : null}
          </p>
          <p className="mt-1 text-[0.82rem] text-muted">
            Calculated from investment amount
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-void/45 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Estimated Gas
          </p>
          <p className="mt-2 text-[1.15rem] font-semibold text-ink">
            {ESTIMATED_GAS_LABEL}
          </p>
          <p className="mt-1 text-[0.82rem] text-muted">
            Separate from execution fee
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/[0.08] bg-void/40 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
          Creator Revenue
        </p>
        <p className="mt-2 text-[0.92rem] text-ink">
          50% of applicable execution fees
        </p>
        <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-void/50 p-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Simulated Activity
          </p>
          <label className="mt-2 block text-[0.75rem] text-muted">
            Simulated portfolio activity (USD)
          </label>
          <input
            type="number"
            min={1000}
            step={100000}
            className={`${fieldClass} !mt-1`}
            value={simActivity}
            onChange={(e) =>
              setSimActivity(Math.max(0, Number(e.target.value) || 0))
            }
          />
          <dl className="mt-3 space-y-1.5 text-[0.88rem]">
            <div className="flex justify-between gap-2">
              <dt className="text-muted">Execution Fees</dt>
              <dd className="font-semibold text-ink">{usd(simFees)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted">Creator Share</dt>
              <dd className="font-semibold text-success">{usd(simCreator)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-[0.72rem] text-muted-dim">
            SIMULATED — not earnings, AUM, users, or traction.
          </p>
        </div>
      </div>
    </div>
  );
}
