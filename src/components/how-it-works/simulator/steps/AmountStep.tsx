"use client";

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

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        How Much Do You Want To Allocate?
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Enter a USD amount. Asset dollar allocations update live.
      </p>

      <div className="mt-6">
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
            min={1}
            step={100}
            className={`${fieldClass} !mt-0 pl-8`}
            value={draft.amountUsd}
            onChange={(e) =>
              updateDraft({ amountUsd: Math.max(0, Number(e.target.value) || 0) })
            }
          />
        </div>
        <p className="mt-2 text-[0.85rem] text-muted">
          Example: {usd(draft.amountUsd || 10000)}
        </p>
      </div>

      <div className="mt-6 space-y-2">
        {draft.assets.map((a) => {
          const dollars = (draft.amountUsd * a.pct) / 100;
          return (
            <div
              key={a.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-void/50 px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <AssetLogo
                  ticker={a.ticker}
                  name={a.name}
                  src={a.src}
                  size={30}
                />
                <p className="text-[0.92rem] font-semibold text-ink">
                  {a.ticker}{" "}
                  <span className="font-normal text-muted">— {a.pct}%</span>
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
  );
}
