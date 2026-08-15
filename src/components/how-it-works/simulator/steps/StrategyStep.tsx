"use client";

import { STRATEGIES } from "../strategies";
import { StrategyRuleVisual } from "../StrategyRuleVisual";
import { useSimulator } from "../SimulatorContext";
import { optionCardActive, optionCardIdle } from "../ui";

export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();

  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Strategy
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
          Choose Strategy
        </h3>
        <p className="mt-1 text-[0.85rem] text-muted">Your rules. Their keys.</p>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-0.5">
        <div className="grid gap-2 sm:grid-cols-2">
          {STRATEGIES.map((s) => {
            const active = draft.strategyId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStrategy(s.id)}
                className={`rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">
                    {s.title}
                  </p>
                  {s.label ? (
                    <span className="shrink-0 rounded-full border border-success/40 bg-success/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-success">
                      {s.label}
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 line-clamp-2 text-[0.78rem] leading-snug text-muted">
                  {s.explanation}
                </p>
              </button>
            );
          })}
        </div>

        {draft.strategyId ? (
          <div className="rounded-xl border border-electric/25 bg-electric/[0.06] p-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
              Trigger → Action → % → Frequency
            </p>
            <div className="mt-2.5">
              <StrategyRuleVisual
                id={draft.strategyId}
                config={draft.strategyConfig}
                hybrid={draft.hybrid}
                compact
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
