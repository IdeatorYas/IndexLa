"use client";

import { strategyTitle } from "../strategies";
import { useSimulator } from "../SimulatorContext";
import type {
  DcaFrequency,
  HybridAction,
  HybridCondition,
  HybridRule,
  MomentumTimeframe,
  RebalanceFrequency,
  RsiTimeframe,
} from "../types";
import { fieldClass, labelClass } from "../ui";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className={labelClass}>{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function NumInput({
  value,
  onChange,
  suffix,
  min,
  max,
}: {
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        className={`${fieldClass} !mt-0 max-w-[10rem]`}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix ? <span className="text-muted">{suffix}</span> : null}
    </div>
  );
}

const HYBRID_CONDITIONS: { id: HybridCondition; label: string }[] = [
  { id: "RSI_LT", label: "RSI < threshold" },
  { id: "RSI_GT", label: "RSI > threshold" },
  { id: "FEAR_EXTREME", label: "Fear & Greed = Extreme Fear" },
  { id: "GREED_EXTREME", label: "Fear & Greed = Extreme Greed" },
  { id: "FEAR_BELOW", label: "Fear & Greed below threshold" },
  { id: "GREED_ABOVE", label: "Fear & Greed above threshold" },
];

const HYBRID_ACTIONS: { id: HybridAction; label: string }[] = [
  { id: "BUY", label: "BUY" },
  { id: "SELL", label: "SELL" },
  { id: "DCA_IN", label: "DCA IN" },
  { id: "DCA_OUT", label: "DCA OUT" },
];

function HybridBuilder() {
  const { draft, setHybridRules } = useSimulator();

  function addRule() {
    const rule: HybridRule = {
      id: `rule_${Date.now().toString(36)}`,
      condition: "RSI_LT",
      threshold: 30,
      action: "BUY",
    };
    setHybridRules([...draft.hybridRules, rule]);
  }

  function update(id: string, patch: Partial<HybridRule>) {
    setHybridRules(
      draft.hybridRules.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }

  function remove(id: string) {
    setHybridRules(draft.hybridRules.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      <p className="text-[0.95rem] text-muted">
        Visual rule builder: <strong className="text-ink">WHEN → CONDITION → ACTION</strong>
      </p>
      {draft.hybridRules.map((rule) => (
        <div
          key={rule.id}
          className="rounded-xl border border-white/[0.07] bg-void/45 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="When / Condition">
              <select
                className={`${fieldClass} !mt-0`}
                value={rule.condition}
                onChange={(e) =>
                  update(rule.id, {
                    condition: e.target.value as HybridCondition,
                  })
                }
              >
                {HYBRID_CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            {rule.condition === "RSI_LT" ||
            rule.condition === "RSI_GT" ||
            rule.condition === "FEAR_BELOW" ||
            rule.condition === "GREED_ABOVE" ? (
              <Field label="Threshold">
                <NumInput
                  value={rule.threshold ?? 30}
                  onChange={(n) => update(rule.id, { threshold: n })}
                />
              </Field>
            ) : (
              <div />
            )}
            <Field label="Action">
              <select
                className={`${fieldClass} !mt-0`}
                value={rule.action}
                onChange={(e) =>
                  update(rule.id, { action: e.target.value as HybridAction })
                }
              >
                {HYBRID_ACTIONS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <p className="mt-3 text-[0.85rem] text-electric">
            WHEN{" "}
            {rule.condition === "RSI_LT"
              ? `RSI < ${rule.threshold ?? 30}`
              : rule.condition === "RSI_GT"
                ? `RSI > ${rule.threshold ?? 70}`
                : rule.condition === "FEAR_EXTREME"
                  ? "Fear & Greed = Extreme Fear"
                  : rule.condition === "GREED_EXTREME"
                    ? "Fear & Greed = Extreme Greed"
                    : rule.condition === "FEAR_BELOW"
                      ? `Fear & Greed < ${rule.threshold ?? 20}`
                      : `Fear & Greed > ${rule.threshold ?? 70}`}{" "}
            → {rule.action.replace("_", " ")}
          </p>
          <button
            type="button"
            onClick={() => remove(rule.id)}
            className="mt-2 text-[0.75rem] font-semibold text-muted hover:text-ink"
          >
            Remove rule
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRule}
        className="rounded-full border border-electric/35 bg-electric/10 px-4 py-2 text-[0.85rem] font-semibold text-electric"
      >
        + Add rule
      </button>
    </div>
  );
}

export function ConfigureStep() {
  const { draft, updateDraft } = useSimulator();
  const id = draft.strategyId;
  const c = draft.strategyConfig;

  function patchConfig(patch: Partial<typeof c>) {
    updateDraft({ strategyConfig: { ...c, ...patch } });
  }

  if (!id) {
    return (
      <p className="text-muted">Select a strategy first.</p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Strategy Configuration
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Configuring: <span className="font-semibold text-ink">{strategyTitle(id)}</span>
      </p>

      <div className="mt-6 space-y-5">
        {id === "buy-now" ? (
          <p className="rounded-xl border border-electric/25 bg-electric/[0.08] px-4 py-4 text-[0.98rem] text-ink">
            Immediate execution when authorized. No additional parameters.
          </p>
        ) : null}

        {id === "take-profit" ? (
          <Field label="Take Profit">
            <NumInput
              value={c.takeProfitPct ?? 20}
              onChange={(n) => patchConfig({ takeProfitPct: n })}
              suffix="%"
              min={1}
              max={500}
            />
            <p className="mt-2 text-[0.85rem] text-muted">
              Example: Take Profit: +{c.takeProfitPct ?? 20}%
            </p>
          </Field>
        ) : null}

        {id === "stop-loss" ? (
          <Field label="Stop Loss">
            <NumInput
              value={c.stopLossPct ?? 10}
              onChange={(n) => patchConfig({ stopLossPct: n })}
              suffix="%"
              min={1}
              max={99}
            />
            <p className="mt-2 text-[0.85rem] text-muted">
              Example: Stop Loss: -{c.stopLossPct ?? 10}%
            </p>
          </Field>
        ) : null}

        {id === "buy-fear" ? (
          <>
            <div className="inline-flex rounded-full border border-success/40 bg-success/15 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-success">
              DCA IN
            </div>
            <Field label="Fear threshold">
              <NumInput
                value={c.fearThreshold ?? 20}
                onChange={(n) => patchConfig({ fearThreshold: n })}
                min={0}
                max={100}
              />
            </Field>
            <Field label="Frequency">
              <select
                className={`${fieldClass} !mt-0 max-w-xs`}
                value={c.dcaFrequency ?? "Weekly"}
                onChange={(e) =>
                  patchConfig({ dcaFrequency: e.target.value as DcaFrequency })
                }
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </Field>
          </>
        ) : null}

        {id === "sell-greed" ? (
          <>
            <div className="inline-flex rounded-full border border-electric/40 bg-electric/15 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-electric">
              DCA OUT
            </div>
            <Field label="Greed threshold">
              <NumInput
                value={c.greedThreshold ?? 70}
                onChange={(n) => patchConfig({ greedThreshold: n })}
                min={0}
                max={100}
              />
            </Field>
            <Field label="Frequency">
              <select
                className={`${fieldClass} !mt-0 max-w-xs`}
                value={c.dcaFrequency ?? "Weekly"}
                onChange={(e) =>
                  patchConfig({ dcaFrequency: e.target.value as DcaFrequency })
                }
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </Field>
          </>
        ) : null}

        {id === "buy-rsi" || id === "sell-rsi" ? (
          <>
            <Field label="RSI timeframe">
              <select
                className={`${fieldClass} !mt-0 max-w-xs`}
                value={c.rsiTimeframe ?? "Weekly"}
                onChange={(e) =>
                  patchConfig({ rsiTimeframe: e.target.value as RsiTimeframe })
                }
              >
                <option value="Daily">Daily RSI</option>
                <option value="Weekly">Weekly RSI</option>
              </select>
            </Field>
            <Field label="RSI threshold">
              <NumInput
                value={
                  c.rsiThreshold ?? (id === "buy-rsi" ? 30 : 70)
                }
                onChange={(n) => patchConfig({ rsiThreshold: n })}
                min={1}
                max={99}
              />
            </Field>
            <p className="text-[0.85rem] text-muted">
              {id === "buy-rsi"
                ? `RSI < ${c.rsiThreshold ?? 30} → Buy`
                : `RSI > ${c.rsiThreshold ?? 70} → Sell`}
            </p>
          </>
        ) : null}

        {id === "momentum" ? (
          <Field label="Trend timeframe">
            <select
              className={`${fieldClass} !mt-0 max-w-xs`}
              value={c.momentumTimeframe ?? "Weekly"}
              onChange={(e) =>
                patchConfig({
                  momentumTimeframe: e.target.value as MomentumTimeframe,
                })
              }
            >
              <option value="Daily">Daily Trend Change</option>
              <option value="Weekly">Weekly Trend Change</option>
            </select>
            <p className="mt-2 text-[0.85rem] text-muted">
              Daily = shorter / mid-term. Weekly = longer-term.
            </p>
          </Field>
        ) : null}

        {id === "rebalancing" ? (
          <Field label="Rebalancing frequency">
            <select
              className={`${fieldClass} !mt-0 max-w-xs`}
              value={c.rebalanceFrequency ?? "Monthly"}
              onChange={(e) =>
                patchConfig({
                  rebalanceFrequency: e.target.value as RebalanceFrequency,
                })
              }
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="On Drift">On Drift</option>
            </select>
          </Field>
        ) : null}

        {id === "hybrid" ? <HybridBuilder /> : null}
      </div>
    </div>
  );
}
