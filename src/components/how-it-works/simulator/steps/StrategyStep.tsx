"use client";

import { useEffect, useRef } from "react";
import { STRATEGIES } from "../strategies";
import { StrategyRuleVisual } from "../StrategyRuleVisual";
import { useSimulator } from "../SimulatorContext";
import { ConfigureStep } from "./ConfigureStep";

/** Strategy selection + configuration in one place — config expands under the selected strategy. */
export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();
  const configRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!draft.strategyId || !configRef.current) return;
    configRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [draft.strategyId]);

  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Strategy
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
          Choose & Configure Strategy
        </h3>
        <p className="mt-1 text-[0.85rem] text-muted">
          Select a strategy — configuration opens immediately underneath.
        </p>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-0.5">
        {STRATEGIES.map((s) => {
          const active = draft.strategyId === s.id;
          return (
            <div
              key={s.id}
              className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                active
                  ? "border-electric/45 bg-electric/[0.08] shadow-[0_0_0_1px_rgba(56,189,248,0.12)]"
                  : "border-white/[0.08] bg-void/40"
              }`}
            >
              <button
                type="button"
                onClick={() => setStrategy(s.id)}
                className={`w-full px-3 py-3 text-left transition-colors ${
                  active ? "" : "hover:bg-white/[0.03]"
                }`}
                aria-expanded={active}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.95rem] font-semibold tracking-[-0.02em] text-ink">
                    {s.title}
                  </p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {s.label ? (
                      <span className="rounded-full border border-success/40 bg-success/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-success">
                        {s.label}
                      </span>
                    ) : null}
                    <span
                      className={`text-[0.7rem] font-semibold ${
                        active ? "text-electric" : "text-muted-dim"
                      }`}
                    >
                      {active ? "Configuring" : "Select"}
                    </span>
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-[0.78rem] leading-snug text-muted">
                  {s.explanation}
                </p>
              </button>

              {active ? (
                <div
                  ref={configRef}
                  className="space-y-3 border-t border-electric/20 bg-void/55 px-3 py-3"
                >
                  <div>
                    <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                      Trigger → Action → % → Frequency
                    </p>
                    <StrategyRuleVisual
                      id={s.id}
                      config={draft.strategyConfig}
                      hybrid={draft.hybrid}
                      compact
                    />
                  </div>
                  <ConfigureStep embedded />
                </div>
              ) : null}
            </div>
          );
        })}

        {!draft.strategyId ? (
          <p className="py-3 text-center text-[0.88rem] text-muted-dim">
            Select a strategy to configure its parameters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
