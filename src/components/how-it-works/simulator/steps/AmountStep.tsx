"use client";

import { AllocationChart, allocationColor } from "../AllocationChart";
import { AssetLogo } from "../AssetLogo";
import { useSimulator } from "../SimulatorContext";
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
  const fee = amount * 0.01;
  const creatorShare = fee * 0.5;

  function setAmount(n: number) {
    updateDraft({ amountUsd: Math.max(0, Math.min(1_000_000, n || 0)) });
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Simulate Impact
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Simulate Impact
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        See how a simulated USD allocation maps across your assets. No real
        funds move.
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
            min={100}
            max={1000000}
            step={100}
            className={`${fieldClass} !mt-0 pl-8 text-[1.15rem] font-semibold`}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <input
          type="range"
          min={1000}
          max={100000}
          step={500}
          value={Math.min(100000, Math.max(1000, amount || 1000))}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4 w-full accent-electric"
          aria-label="USD amount slider"
        />
        <div className="mt-1 flex justify-between text-[0.72rem] text-muted-dim">
          <span>$1,000</span>
          <span className="font-semibold text-electric">{usd(amount)}</span>
          <span>$100,000</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <AllocationChart assets={draft.assets} size={128} />
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
                    size={28}
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

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.08] bg-void/45 p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Fee model
          </p>
          <ul className="mt-3 space-y-1.5 text-[0.88rem] text-muted">
            <li>
              Management <strong className="text-ink">0%</strong>
            </li>
            <li>
              Performance <strong className="text-ink">0%</strong>
            </li>
            <li>
              Exit <strong className="text-ink">0%</strong>
            </li>
            <li>
              Execution Fee <strong className="text-electric">1%</strong>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-electric/25 bg-electric/[0.08] p-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Illustrative fees
          </p>
          <p className="mt-3 text-[0.88rem] text-muted">
            Simulated execution fee on {usd(amount)}
          </p>
          <p className="mt-1 text-[1.15rem] font-semibold text-ink">{usd(fee)}</p>
          <p className="mt-3 text-[0.88rem] text-muted">
            Creator share (50% of execution fee)
          </p>
          <p className="mt-1 text-[1.05rem] font-semibold text-success">
            {usd(creatorShare)}
          </p>
          <p className="mt-2 text-[0.75rem] text-muted-dim">
            Simulated / illustrative only — not a performance or earnings claim.
          </p>
        </div>
      </div>
    </div>
  );
}
