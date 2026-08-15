"use client";

import type { ReactNode } from "react";
import { AllocationChart } from "../AllocationChart";
import { AssetLogo } from "../AssetLogo";
import { summarizeStrategy, strategyTitle } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { ESTIMATED_GAS_LABEL, type WizardStep } from "../types";
import { fieldClass, labelClass } from "../ui";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function EditLink({ step, label }: { step: WizardStep; label: string }) {
  const { setStep } = useSimulator();
  return (
    <button
      type="button"
      onClick={() => setStep(step)}
      className="text-[0.78rem] font-semibold text-electric hover:underline"
    >
      {label}
    </button>
  );
}

function Section({
  title,
  editStep,
  children,
}: {
  title: string;
  editStep?: WizardStep;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-void/50 p-3 sm:p-3.5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {title}
        </p>
        {editStep ? <EditLink step={editStep} label="Edit" /> : null}
      </div>
      {children}
    </div>
  );
}

/** Final Review: summary + investment + fees + non-custodial trust. */
export function ReviewStep() {
  const { draft, updateDraft } = useSimulator();
  const amount = draft.amountUsd;
  const fee = amount > 0 ? amount * 0.01 : 0;

  function setAmount(n: number) {
    updateDraft({ amountUsd: Math.max(0, Math.min(1_000_000, n || 0)) });
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Final Review
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Final Review
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Confirm everything, set investment, then authorize & publish.
      </p>

      <div className="mt-3 space-y-2.5">
        <Section title="Portfolio" editStep="create">
          <dl className="space-y-1.5 text-[0.9rem]">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Name</dt>
              <dd className="text-right font-semibold text-ink">
                {draft.name || "Not set"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Type</dt>
              <dd className="text-right font-semibold text-ink">
                {draft.portfolioType || "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Description</dt>
              <dd className="mt-0.5 text-ink">{draft.description || "Not set"}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Assets & Allocation" editStep="assets">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            <AllocationChart assets={draft.assets} size={96} />
            <ul className="w-full flex-1 space-y-1.5">
              {draft.assets.map((a) => (
                <li
                  key={a.key}
                  className="flex items-center justify-between gap-3 text-[0.88rem]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <AssetLogo
                      ticker={a.ticker}
                      name={a.name}
                      src={a.src}
                      size={22}
                    />
                    <span className="truncate font-semibold text-ink">
                      {a.ticker}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold text-electric">
                    {a.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Strategy" editStep="strategy">
          <p className="text-[0.95rem] font-semibold text-ink">
            {draft.strategyId ? strategyTitle(draft.strategyId) : "Not set"}
          </p>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
            {summarizeStrategy(
              draft.strategyId,
              draft.strategyConfig,
              draft.hybrid,
            )}
          </p>
        </Section>

        <Section title="Investment">
          <label htmlFor="review-usd-amount" className={labelClass}>
            Investment Amount (USD)
          </label>
          <div className="relative mt-1.5">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              $
            </span>
            <input
              id="review-usd-amount"
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

          {amount > 0 ? (
            <p className="mt-2 text-[0.82rem] text-muted">
              Investment {usd(amount)} → Execution Fee {usd(fee)} · Est. Gas{" "}
              {ESTIMATED_GAS_LABEL}
            </p>
          ) : (
            <p className="mt-2 text-[0.82rem] text-muted-dim">
              Enter an investment amount to calculate fees.
            </p>
          )}
        </Section>

        <div className="rounded-xl border border-electric/30 bg-electric/[0.08] px-3.5 py-3 text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Your Keys · Your Assets · Your Permissions
          </p>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
            INDEXLA can execute approved strategy actions. It cannot withdraw
            your funds. Permissions can be revoked.
          </p>
          <p className="mt-2 text-[0.75rem] text-muted-dim">
            Simulation only · No wallet connection · No real transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
