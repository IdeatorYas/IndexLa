"use client";

import type { ReactNode } from "react";
import { AssetLogo } from "../AssetLogo";
import { summarizeStrategy, strategyTitle } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { ESTIMATED_GAS_LABEL, type WizardStep } from "../types";

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function EditLink({
  step,
  label,
}: {
  step: WizardStep;
  label: string;
}) {
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

export function ReviewStep() {
  const { draft } = useSimulator();
  const fee = draft.amountUsd * 0.01;

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Review & Publish
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Review & Publish
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Confirm exactly what you are publishing.
      </p>

      <div className="mt-3 space-y-2.5">
        <Section title="Portfolio" editStep="create">
          <dl className="space-y-2 text-[0.95rem]">
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
              <dd className="mt-1 text-ink">{draft.description || "Not set"}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Assets" editStep="assets">
          <ul className="space-y-2">
            {draft.assets.map((a) => (
              <li
                key={a.key}
                className="flex items-center justify-between gap-3 text-[0.95rem]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={26}
                  />
                  <span className="font-semibold text-ink">{a.ticker}</span>
                </span>
                <span className="font-semibold text-electric">{a.pct}%</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Strategy" editStep="configure">
          <p className="text-[1.02rem] font-semibold text-ink">
            {draft.strategyId ? strategyTitle(draft.strategyId) : "Not set"}
          </p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
            {summarizeStrategy(
              draft.strategyId,
              draft.strategyConfig,
              draft.hybrid,
            )}
          </p>
        </Section>

        <Section title="Investment" editStep="amount">
          <dl className="space-y-2 text-[0.95rem]">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Amount</dt>
              <dd className="font-semibold text-electric">
                {draft.amountUsd > 0 ? usd(draft.amountUsd) : "Not set"}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Execution Fee</dt>
              <dd className="font-semibold text-ink">
                1%
                {draft.amountUsd > 0 ? ` · ${usd(fee)}` : ""}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Estimated Gas</dt>
              <dd className="font-semibold text-ink">{ESTIMATED_GAS_LABEL}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Permissions" editStep="permissions">
          <ul className="space-y-1.5 text-[0.92rem] text-ink">
            <li>Swap assets — {draft.authorized ? "Authorized" : "Not set"}</li>
            <li>Allowed networks — Supported networks</li>
            <li>
              Transaction limit —{" "}
              {draft.transactionLimitUsd > 0
                ? usd(draft.transactionLimitUsd)
                : "Not set"}
            </li>
            <li>Withdraw funds — Not permitted</li>
            <li className="text-muted">Non-custodial · Simulated authorization</li>
          </ul>
        </Section>
      </div>

      <p className="mt-5 rounded-2xl border border-white/[0.07] bg-void/40 px-4 py-3 text-[0.88rem] leading-relaxed text-muted">
        Share with your friends or community to earn 50% of applicable execution
        fees.
      </p>
    </div>
  );
}
