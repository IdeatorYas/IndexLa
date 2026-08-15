"use client";

import { STRATEGIES } from "../strategies";
import { StrategyRuleVisual } from "../StrategyRuleVisual";
import { useSimulator } from "../SimulatorContext";
import { optionCardActive, optionCardIdle } from "../ui";

export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();

  return (
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Strategy
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Choose Strategy
      </h3>
      <p className="mt-2 text-[0.95rem] text-muted">Your rules. Their keys.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {STRATEGIES.map((s) => {
          const active = draft.strategyId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStrategy(s.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                active ? optionCardActive : optionCardIdle
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="display text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </p>
                {s.label ? (
                  <span className="shrink-0 rounded-full border border-success/40 bg-success/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-success">
                    {s.label}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                {s.explanation}
              </p>
              {active ? (
                <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-electric">
                  Selected · Configure next
                </p>
              ) : null}
            </button>
          );
        })}
      </div>

      {draft.strategyId ? (
        <div className="mt-6 rounded-2xl border border-electric/25 bg-electric/[0.06] p-4 transition-all duration-300">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
            Strategy rules
          </p>
          <p className="mt-1 text-[0.8rem] text-muted">
            Trigger → Action → % → Frequency
          </p>
          <div className="mt-4">
            <StrategyRuleVisual
              id={draft.strategyId}
              config={draft.strategyConfig}
              hybrid={draft.hybrid}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
