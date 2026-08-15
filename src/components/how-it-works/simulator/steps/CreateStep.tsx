"use client";

import { useState } from "react";
import { useSimulator } from "../SimulatorContext";
import { STARTER_TEMPLATES } from "../templates";
import { PORTFOLIO_TYPES, emptyDraft, type DraftPortfolio } from "../types";
import {
  chipActive,
  chipIdle,
  fieldClass,
  labelClass,
  optionCardActive,
  optionCardIdle,
} from "../ui";

export function CreateStep() {
  const { draft, updateDraft, applyTemplate } = useSimulator();
  /** Visual selection only — scratch keeps all fields empty. */
  const [startChoice, setStartChoice] = useState<"scratch" | string>("scratch");

  function chooseScratch() {
    setStartChoice("scratch");
    applyTemplate(() => emptyDraft());
  }

  function chooseTemplate(id: string, build: () => DraftPortfolio) {
    setStartChoice(id);
    applyTemplate(build);
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-2.5 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Create
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink">
        Build Your Portfolio
      </h3>
      <p className="mt-0.5 text-[0.8rem] text-muted">
        Build your own, or use an optional starter template.
      </p>

      <div className="mt-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Build Your Own
        </p>
        <button
          type="button"
          onClick={chooseScratch}
          className={`mt-1.5 w-full rounded-xl border px-3.5 py-3 text-left transition-all ${
            startChoice === "scratch"
              ? `${optionCardActive} shadow-[0_0_32px_rgba(56,189,248,0.12)]`
              : optionCardIdle
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="display text-[1rem] font-semibold tracking-[-0.02em] text-ink">
                Build from Scratch
              </p>
              <p className="mt-1 text-[0.8rem] leading-snug text-muted">
                Create your own portfolio from zero.
              </p>
            </div>
            {startChoice === "scratch" ? (
              <span className="shrink-0 rounded-full border border-electric/40 bg-electric/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-electric">
                Selected
              </span>
            ) : null}
          </div>
        </button>
      </div>

      <div className="mt-3.5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Starter Templates · Optional
        </p>
        <p className="mt-0.5 text-[0.72rem] text-muted-dim">
          Starting points only — change anything anytime.
        </p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {STARTER_TEMPLATES.map((t) => {
            const active = startChoice === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => chooseTemplate(t.id, t.build)}
                className={`rounded-xl border px-3 py-2 text-left transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <p className="text-[0.85rem] font-semibold text-ink">{t.title}</p>
                <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-electric">
                  {t.strategyLabel}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[0.72rem] leading-snug text-muted">
                  {t.blurb}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3.5 space-y-3 border-t border-white/[0.07] pt-3">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Portfolio details
        </p>
        <div>
          <label htmlFor="pf-name" className={labelClass}>
            Portfolio Name
          </label>
          <input
            id="pf-name"
            className={`${fieldClass} !mt-1 !py-2`}
            value={draft.name}
            onChange={(e) => updateDraft({ name: e.target.value })}
            placeholder="e.g. Hybrid Wealth Portfolio"
            maxLength={80}
          />
        </div>

        <div>
          <label htmlFor="pf-desc" className={labelClass}>
            Description
          </label>
          <textarea
            id="pf-desc"
            className={`${fieldClass} !mt-1 min-h-[2.75rem] resize-none !py-2`}
            value={draft.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
            placeholder="Describe the thesis behind this portfolio"
            maxLength={400}
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="pf-type" className={labelClass}>
            Portfolio Type
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {PORTFOLIO_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateDraft({ portfolioType: t })}
                className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold transition-all ${
                  draft.portfolioType === t ? chipActive : chipIdle
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
