"use client";

import { useSimulator } from "../SimulatorContext";

export function PermissionsStep() {
  const { draft, updateDraft } = useSimulator();

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Execution Permissions
      </h3>
      <div className="mt-4 space-y-3 text-[0.98rem] leading-relaxed text-muted">
        <p>INDEXLA is non-custodial.</p>
        <p>The user keeps control of their assets.</p>
        <p>
          The protocol cannot withdraw funds outside the permissions granted.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-electric/30 bg-electric/[0.08] p-5 sm:p-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Simulation only
        </p>
        <p className="mt-2 text-[0.95rem] text-muted">
          No wallet connection. No signatures. No real transactions.
        </p>
        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-line accent-electric"
            checked={draft.authorized}
            onChange={(e) => updateDraft({ authorized: e.target.checked })}
          />
          <span>
            <span className="block text-[1.05rem] font-semibold text-ink">
              Authorize Strategy Execution
            </span>
            <span className="mt-1 block text-[0.88rem] text-muted">
              Simulated permission to coordinate execution within your rules.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
