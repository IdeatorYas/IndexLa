"use client";

import { useSimulator } from "../SimulatorContext";
import { PORTFOLIO_TYPES } from "../types";
import { fieldClass, labelClass } from "../ui";

export function CreateStep() {
  const { draft, updateDraft } = useSimulator();

  return (
    <div className="mx-auto max-w-xl">
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Create Your Portfolio
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Name your portfolio and choose its type to continue.
      </p>

      <div className="mt-6 space-y-5">
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
            className={`${fieldClass} min-h-[6rem] resize-y`}
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
          <select
            id="pf-type"
            className={fieldClass}
            value={draft.portfolioType}
            onChange={(e) =>
              updateDraft({
                portfolioType: e.target.value as typeof draft.portfolioType,
              })
            }
          >
            <option value="">Select type</option>
            {PORTFOLIO_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
