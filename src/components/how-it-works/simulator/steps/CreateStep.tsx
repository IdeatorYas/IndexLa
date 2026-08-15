"use client";

import { useSimulator } from "../SimulatorContext";
import { STARTER_TEMPLATES } from "../templates";
import { PORTFOLIO_TYPES } from "../types";
import { emptyDraft } from "../types";
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

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Create
      </p>
      <h3 className="display mt-1 text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Create Your Portfolio
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Start from a template or build from scratch. You can edit everything
        later.
      </p>

      <div className="mt-6">
        <p className={labelClass}>Starter templates</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {STARTER_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t.build)}
              className={`rounded-2xl border px-4 py-3.5 text-left transition-all ${optionCardIdle}`}
            >
              <p className="font-semibold text-ink">{t.title}</p>
              <p className="mt-1 text-[0.82rem] leading-snug text-muted">
                {t.blurb}
              </p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => applyTemplate(() => emptyDraft())}
            className={`rounded-2xl border px-4 py-3.5 text-left transition-all sm:col-span-2 ${
              !draft.name && !draft.portfolioType && draft.assets.length === 0
                ? optionCardActive
                : optionCardIdle
            }`}
          >
            <p className="font-semibold text-ink">Start From Scratch</p>
            <p className="mt-1 text-[0.82rem] text-muted">
              Blank builder — define name, type, assets, and strategy yourself.
            </p>
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-5 border-t border-white/[0.07] pt-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Portfolio details
        </p>
        <div>
          <label htmlFor="pf-name" className={labelClass}>
            Portfolio Name
          </label>
          <input
            id="pf-name"
            className={fieldClass}
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
            className={`${fieldClass} min-h-[5.5rem] resize-y`}
            value={draft.description}
            onChange={(e) => updateDraft({ description: e.target.value })}
            placeholder="Describe the thesis behind this portfolio"
            maxLength={400}
          />
        </div>

        <div>
          <label htmlFor="pf-type" className={labelClass}>
            Portfolio Type
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {PORTFOLIO_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateDraft({ portfolioType: t })}
                className={`rounded-full border px-3.5 py-2 text-[0.8rem] font-semibold transition-all ${
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
