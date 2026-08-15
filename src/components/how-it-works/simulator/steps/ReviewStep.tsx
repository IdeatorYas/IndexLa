"use client";

import { AssetLogo } from "../AssetLogo";
import { summarizeStrategy, strategyTitle } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import type { WizardStep } from "../types";

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

function Row({
  label,
  value,
  editStep,
}: {
  label: string;
  value: React.ReactNode;
  editStep?: WizardStep;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/[0.06] py-3.5 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
          {label}
        </p>
        <div className="mt-1 text-[0.98rem] text-ink">{value}</div>
      </div>
      {editStep ? <EditLink step={editStep} label="Edit" /> : null}
    </div>
  );
}

export function ReviewStep() {
  const { draft } = useSimulator();

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Review
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Final Review
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Confirm your portfolio before publishing to the marketplace simulation.
      </p>

      <div className="mt-6 rounded-2xl border border-white/[0.09] bg-void/55 px-4 py-2 sm:px-5">
        <Row label="Name" value={draft.name || "—"} editStep="create" />
        <Row
          label="Description"
          value={draft.description || "—"}
          editStep="create"
        />
        <Row
          label="Portfolio type"
          value={draft.portfolioType || "—"}
          editStep="create"
        />
        <Row
          label="Assets"
          editStep="assets"
          value={
            <ul className="space-y-2">
              {draft.assets.map((a) => (
                <li key={a.key} className="flex items-center gap-2.5">
                  <AssetLogo
                    ticker={a.ticker}
                    name={a.name}
                    src={a.src}
                    size={26}
                  />
                  <span>
                    {a.ticker} — {a.pct}% (
                    {usd((draft.amountUsd * a.pct) / 100)})
                  </span>
                </li>
              ))}
            </ul>
          }
        />
        <Row
          label="Strategy"
          editStep="strategy"
          value={draft.strategyId ? strategyTitle(draft.strategyId) : "—"}
        />
        <Row
          label="Configuration"
          editStep="configure"
          value={summarizeStrategy(
            draft.strategyId,
            draft.strategyConfig,
            draft.hybrid,
          )}
        />
        <Row
          label="Permissions"
          editStep="permissions"
          value={draft.authorized ? "Authorized (simulated)" : "Not authorized"}
        />
        <Row
          label="Investment amount"
          editStep="amount"
          value={usd(draft.amountUsd)}
        />
        <Row label="Execution Fee" value={`1% · ${usd(draft.amountUsd * 0.01)}`} />
        <Row
          label="Creator Share"
          value={`50% of execution fees · ${usd(draft.amountUsd * 0.005)} illustrative`}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] bg-void/40 px-4 py-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Creator Revenue
        </p>
        <p className="mt-1 text-[0.92rem] text-ink">
          50% of applicable execution fees
        </p>
        <p className="mt-1 text-[0.8rem] text-muted-dim">
          Simulated / illustrative only — not earnings or performance.
        </p>
      </div>
    </div>
  );
}
