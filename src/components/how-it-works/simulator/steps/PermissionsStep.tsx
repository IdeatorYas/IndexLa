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

      <div className="mt-8 overflow-hidden rounded-2xl border border-electric/30 bg-gradient-to-br from-electric/[0.12] via-void/40 to-purple/10 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-electric/35 bg-electric/15 text-electric">
            ◎
          </span>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
              Simulation only
            </p>
            <p className="mt-0.5 text-[0.9rem] text-muted">
              No wallet · No signatures · No real transactions
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.08] bg-void/50 p-4">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted">
            How authorization works
          </p>
          <ol className="mt-3 space-y-2 text-[0.9rem] text-muted">
            <li>1. You define strategy rules and limits.</li>
            <li>2. You authorize execution within those rules.</li>
            <li>3. INDEXLA coordinates trades only when conditions match.</li>
            <li>4. Assets stay in your wallet — custody never moves.</li>
          </ol>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-void/40 p-4 transition-colors hover:border-electric/30">
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
