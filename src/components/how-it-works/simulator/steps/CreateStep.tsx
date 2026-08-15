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
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Create
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Build Your Portfolio
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Name it. Choose a type. Templates are optional.
      </p>

      <div className="mt-4 space-y-3.5">
        <div>
          <label htmlFor="pf-name" className={labelClass}>
            Portfolio Name
          </label>
          <input
            id="pf-name"
            className={`${fieldClass} !mt-1.5 !py-2.5`}
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
            className={`${fieldClass} !mt-1.5 min-h-[3.5rem] resize-none !py-2.5`}
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
          <div className="mt-2 flex flex-wrap gap-1.5">
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

      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <p className={labelClass}>Starter templates · optional</p>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {STARTER_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t.build)}
              className={`rounded-xl border px-3 py-2.5 text-left transition-all ${optionCardIdle}`}
            >
              <p className="text-[0.88rem] font-semibold text-ink">{t.title}</p>
              <p className="mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-muted">
                {t.blurb}
              </p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => applyTemplate(() => emptyDraft())}
            className={`rounded-xl border px-3 py-2.5 text-left transition-all sm:col-span-2 ${
              !draft.name && !draft.portfolioType && draft.assets.length === 0
                ? optionCardActive
                : optionCardIdle
            }`}
          >
            <p className="text-[0.88rem] font-semibold text-ink">
              Start From Scratch
            </p>
            <p className="mt-0.5 text-[0.75rem] text-muted">
              Blank builder — no preloaded portfolio.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
