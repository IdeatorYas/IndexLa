"use client";

import { STRATEGIES, summarizeStrategy } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { ConfigureStep } from "./ConfigureStep";

/** Strategy cards + immediate product configuration (no generic Trigger/Action UI). */
export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();
  const active = STRATEGIES.find((s) => s.id === draft.strategyId);

  return (
    <div className="flex h-full min-h-0 flex-col pt-2.5">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Strategy
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink">
          Choose & Configure Strategy
        </h3>
        <p className="mt-0.5 text-[0.8rem] text-muted">
          Select one strategy — its real controls open immediately below.
        </p>
      </div>

      <div className="mt-2.5 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-0.5">
        <div className="grid gap-2 sm:grid-cols-2">
          {STRATEGIES.map((s) => {
            const selected = draft.strategyId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStrategy(s.id)}
                aria-pressed={selected}
                className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                  selected
                    ? "border-electric/50 bg-electric/[0.12] shadow-[0_0_0_1px_rgba(56,189,248,0.18)]"
                    : "border-white/[0.08] bg-void/40 hover:border-white/15 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.9rem] font-semibold tracking-[-0.02em] text-ink">
                    {s.title}
                  </p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {s.label ? (
                      <span className="rounded-full border border-success/40 bg-success/15 px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-success">
                        {s.label}
                      </span>
                    ) : null}
                    <span
                      className={`text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${
                        selected ? "text-electric" : "text-muted-dim"
                      }`}
                    >
                      {selected ? "Active" : "Select"}
                    </span>
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-muted">
                  {s.explanation}
                </p>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className="rounded-2xl border border-electric/35 bg-void/60 p-3 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-white/[0.07] pb-3">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
                  Configure · {active.title}
                </p>
                <p className="mt-1 text-[0.82rem] text-muted">
                  {active.explanation}
                </p>
              </div>
            </div>
            <ConfigureStep embedded />
            <p className="mt-3 text-[0.78rem] leading-relaxed text-muted-dim">
              Live rule:{" "}
              <span className="text-muted">
                {summarizeStrategy(
                  draft.strategyId,
                  draft.strategyConfig,
                  draft.hybrid,
                )}
              </span>
            </p>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-[0.88rem] text-muted-dim">
            Select a strategy card above to configure it.
          </p>
        )}
      </div>
    </div>
  );
}
