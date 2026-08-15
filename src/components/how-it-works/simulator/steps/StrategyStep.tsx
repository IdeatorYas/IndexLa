"use client";

import { STRATEGIES } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { optionCardActive, optionCardIdle } from "../ui";

export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();

  return (
    <div>
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Choose Strategy
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        INDEXLA Strategies — select one to configure next.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
