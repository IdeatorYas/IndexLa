"use client";

import { useSimulator } from "../SimulatorContext";
import { fieldClass, labelClass } from "../ui";

function PermRow({
  title,
  detail,
  status,
  tone,
}: {
  title: string;
  detail: string;
  status: string;
  tone: "ok" | "deny" | "neutral";
}) {
  const toneClass =
    tone === "ok"
      ? "border-success/35 bg-success/10 text-success"
      : tone === "deny"
        ? "border-amber-400/35 bg-amber-400/10 text-amber-200"
        : "border-white/12 bg-void/50 text-ink";

  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-white/[0.07] bg-void/45 px-3.5 py-3">
      <div className="min-w-0">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {title}
        </p>
        <p className="mt-1 text-[0.92rem] text-ink">{detail}</p>
      </div>
      <span
        className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.72rem] font-semibold ${toneClass}`}
      >
        {status}
      </span>
    </div>
  );
}

export function PermissionsStep() {
  const { draft, updateDraft } = useSimulator();

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Permissions
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Execution Permissions
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Authorize execution — never withdrawals.
      </p>

      <div className="mt-3 rounded-xl border border-electric/30 bg-electric/[0.08] px-3 py-3 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Your Keys · Your Assets · Your Permissions
        </p>
        <p className="mt-1.5 text-[0.8rem] text-muted">
          The protocol cannot withdraw your funds. You can revoke access at any
          time.
        </p>
      </div>

      <div className="mt-3 space-y-2">
        <PermRow
          title="Swap Assets"
          detail="Coordinate swaps within your strategy rules"
          status={draft.authorized ? "✓ Authorized" : "Not set"}
          tone={draft.authorized ? "ok" : "neutral"}
        />
        <PermRow
          title="Allowed Networks"
          detail="Supported networks for selected assets"
          status="✓ Supported networks"
          tone="ok"
        />
        <div className="rounded-xl border border-white/[0.07] bg-void/45 px-3 py-2.5">
          <label htmlFor="tx-limit" className={labelClass}>
            Transaction Limit (USD)
          </label>
          <input
            id="tx-limit"
            type="number"
            min={100}
            max={1000000}
            step={100}
            className={`${fieldClass} !mt-1.5 !py-2`}
            value={draft.transactionLimitUsd || ""}
            onChange={(e) =>
              updateDraft({
                transactionLimitUsd: Math.max(
                  0,
                  Number(e.target.value) || 0,
                ),
              })
            }
          />
          <p className="mt-1 text-[0.72rem] text-muted">
            Simulated max size per coordinated execution.
          </p>
        </div>
        <PermRow
          title="Withdraw Funds"
          detail="INDEXLA never receives withdrawal authority"
          status="✕ Not permitted"
          tone="deny"
        />
      </div>

      <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-electric/30 bg-gradient-to-br from-electric/[0.1] via-void/40 to-transparent p-3.5 transition-colors hover:border-electric/45">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-line accent-electric"
          checked={draft.authorized}
          onChange={(e) => updateDraft({ authorized: e.target.checked })}
        />
        <span>
          <span className="block text-[0.98rem] font-semibold text-ink">
            Authorize Strategy Execution
          </span>
          <span className="mt-1 block text-[0.8rem] text-muted">
            Simulated permission only — no wallet, no real transactions.
          </span>
        </span>
      </label>
    </div>
  );
}
