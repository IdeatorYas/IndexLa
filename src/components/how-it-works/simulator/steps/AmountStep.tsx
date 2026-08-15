"use client";

import { useState } from "react";
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
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Investment
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Investment Amount
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Simulate capital. Fees calculate instantly.
      </p>

      <div className="mt-3 rounded-xl border border-white/[0.08] bg-void/50 p-3.5">
        <label htmlFor="usd-amount" className={labelClass}>
          Investment Amount (USD)
        </label>
        <div className="relative mt-1.5">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            $
          </span>
          <input
            id="usd-amount"
            type="number"
            min={0}
            max={1000000}
            step={100}
            placeholder="0"
            className={`${fieldClass} !mt-0 !py-2.5 pl-7 text-[1.05rem] font-semibold`}
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
          className="mt-3 w-full accent-electric"
          aria-label="USD amount slider"
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.08] bg-void/45 px-3 py-2.5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Execution Fee
          </p>
          <p className="mt-1 text-[1rem] font-semibold text-ink">
            1%
            {amount > 0 ? (
              <span className="text-electric"> · {usd(fee)}</span>
            ) : null}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-void/45 px-3 py-2.5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Estimated Gas
          </p>
          <p className="mt-1 text-[1rem] font-semibold text-ink">
            {ESTIMATED_GAS_LABEL}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/[0.08] bg-void/40 p-3.5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
          Creator Revenue
        </p>
        <p className="mt-1 text-[0.85rem] text-ink">
          50% of applicable execution fees
        </p>
        <div className="mt-3 rounded-lg border border-dashed border-white/15 bg-void/50 p-2.5">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Simulated Activity
          </p>
          <input
            type="number"
            min={1000}
            step={100000}
            className={`${fieldClass} !mt-1.5 !py-2`}
            value={simActivity}
            onChange={(e) =>
              setSimActivity(Math.max(0, Number(e.target.value) || 0))
            }
          />
          <dl className="mt-2 space-y-1 text-[0.82rem]">
            <div className="flex justify-between gap-2">
              <dt className="text-muted">Execution Fees</dt>
              <dd className="font-semibold text-ink">{usd(simFees)}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted">Creator Share</dt>
              <dd className="font-semibold text-success">{usd(simCreator)}</dd>
            </div>
          </dl>
          <p className="mt-1.5 text-[0.68rem] text-muted-dim">
            SIMULATED — not earnings or traction.
          </p>
        </div>
      </div>
    </div>
  );
}
