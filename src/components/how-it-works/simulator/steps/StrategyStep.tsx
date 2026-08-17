"use client";

import { useEffect, useRef, type RefObject } from "react";
import { STRATEGIES, summarizeStrategy } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import { ConfigureStep } from "./ConfigureStep";
import type { StrategyId } from "../types";

function StrategyCard({
  id,
  title,
  label,
  explanation,
  selected,
  onSelect,
}: {
  id: StrategyId;
  title: string;
  label?: string;
  explanation: string;
  selected: boolean;
  onSelect: (id: StrategyId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
        selected
          ? "border-electric/50 bg-electric/[0.12] shadow-[0_0_0_1px_rgba(56,189,248,0.18)]"
          : "border-white/[0.08] bg-void/40 hover:border-white/15 hover:bg-white/[0.03]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[0.9rem] font-semibold tracking-[-0.02em] text-ink sm:text-[0.9rem]">
          {title}
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          {label ? (
            <span className="rounded-full border border-success/40 bg-success/15 px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-success">
              {label}
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
      <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-muted sm:line-clamp-2">
        {explanation}
      </p>
    </button>
  );
}

function StrategyConfigurePanel({
  panelRef,
  className = "",
}: {
  panelRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const { draft } = useSimulator();
  const active = STRATEGIES.find((s) => s.id === draft.strategyId);
  if (!active || !draft.strategyId) return null;

  return (
    <div
      ref={panelRef}
      className={`rounded-2xl border border-electric/35 bg-void/60 p-3 shadow-[0_0_40px_rgba(56,189,248,0.06)] ${className}`}
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-white/[0.07] pb-3">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Configure · {active.title}
          </p>
          <p className="mt-1 text-[0.82rem] text-muted sm:text-[0.82rem]">
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
  );
}

/** Strategy cards + immediate product configuration (no generic Trigger/Action UI). */
export function StrategyStep() {
  const { draft, setStrategy } = useSimulator();
  const configRef = useRef<HTMLDivElement>(null);
  const active = STRATEGIES.find((s) => s.id === draft.strategyId);

  useEffect(() => {
    if (!draft.strategyId) return;
    const t = window.requestAnimationFrame(() => {
      configRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    return () => window.cancelAnimationFrame(t);
  }, [draft.strategyId]);

  return (
    <div className="flex h-full min-h-0 flex-col pt-2.5">
      <div className="shrink-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
          Step · Strategy
        </p>
        <h3 className="display mt-0.5 text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink">
          Choose & Configure Strategy
        </h3>
        <p className="mt-0.5 text-[0.8rem] text-muted sm:text-[0.8rem]">
          Select one strategy — its real controls open immediately below.
        </p>
      </div>

      <div className="mt-2.5 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-0.5">
        {/* Mobile: settings panel directly under the selected card */}
        <div className="space-y-2.5 sm:hidden">
          {STRATEGIES.map((s) => {
            const selected = draft.strategyId === s.id;
            return (
              <div key={s.id} className="space-y-2.5">
                <StrategyCard
                  id={s.id}
                  title={s.title}
                  label={s.label}
                  explanation={s.explanation}
                  selected={selected}
                  onSelect={setStrategy}
                />
                {selected ? (
                  <StrategyConfigurePanel
                    panelRef={selected ? configRef : undefined}
                  />
                ) : null}
              </div>
            );
          })}
          {!active ? (
            <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-[0.88rem] text-muted-dim">
              Select a strategy to configure it.
            </p>
          ) : null}
        </div>

        {/* Desktop: unchanged two-column cards, configure panel after all cards */}
        <div className="hidden sm:block">
          <div className="grid gap-2 sm:grid-cols-2">
            {STRATEGIES.map((s) => {
              const selected = draft.strategyId === s.id;
              return (
                <StrategyCard
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  label={s.label}
                  explanation={s.explanation}
                  selected={selected}
                  onSelect={setStrategy}
                />
              );
            })}
          </div>

          {active ? (
            <StrategyConfigurePanel className="mt-2.5" />
          ) : (
            <p className="mt-2.5 rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-[0.88rem] text-muted-dim">
              Select a strategy card above to configure it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
