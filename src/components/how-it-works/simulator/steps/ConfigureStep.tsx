"use client";

import {
  formatHybridSummary,
  HYBRID_BUY_OPTIONS,
  HYBRID_SELL_OPTIONS,
  strategyTitle,
} from "../strategies";
import { StrategyRuleVisual } from "../StrategyRuleVisual";
import { useSimulator } from "../SimulatorContext";
import type {
  DcaFrequency,
  HybridBuyCondition,
  HybridSellCondition,
  MomentumTimeframe,
  RebalanceFrequency,
  RsiTimeframe,
  SellExecutionMode,
} from "../types";
import {
  chipActive,
  chipIdle,
  fieldClass,
  labelClass,
  optionCardActive,
  optionCardIdle,
} from "../ui";

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

function BuilderStep({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-void/50 p-4 sm:p-5">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
        {eyebrow}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BuilderArrow() {
  return (
    <div className="flex justify-center py-1 text-electric/70" aria-hidden>
      ↓
    </div>
  );
}

function HybridBuilder() {
  const { draft, setHybrid } = useSimulator();
  const h = draft.hybrid;

  return (
    <div className="space-y-1">
      <p className="mb-4 text-[0.95rem] text-muted">
        Visual rule builder — configure Buy, Sell condition, and Sell action.
      </p>

      <BuilderStep eyebrow="Buy">
        <div className="grid gap-2 sm:grid-cols-2">
          {HYBRID_BUY_OPTIONS.map((opt) => {
            const active = h.buyCondition === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setHybrid({ buyCondition: opt.id as HybridBuyCondition })
                }
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">{opt.label}</p>
                <p className="mt-1 text-[0.82rem] text-muted">{opt.summary}</p>
              </button>
            );
          })}
        </div>
      </BuilderStep>

      <BuilderArrow />

      <BuilderStep eyebrow="Condition">
        <div className="grid gap-2">
          {HYBRID_SELL_OPTIONS.map((opt) => {
            const active = h.sellCondition === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setHybrid({ sellCondition: opt.id as HybridSellCondition })
                }
                className={`rounded-xl border px-4 py-3 text-left transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">{opt.label}</p>
                <p className="mt-1 text-[0.82rem] text-muted">{opt.summary}</p>
              </button>
            );
          })}
        </div>

        {h.sellCondition === "sell-greed" ? (
          <div className="mt-4">
            <Field label="Greed threshold">
              <NumInput
                value={h.greedThreshold ?? 70}
                onChange={(n) => setHybrid({ greedThreshold: n })}
                min={0}
                max={100}
              />
            </Field>
          </div>
        ) : null}

        {h.sellCondition === "sell-rsi-overbought" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="RSI timeframe">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as RsiTimeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setHybrid({ rsiTimeframe: tf })}
                    className={`rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold ${
                      (h.rsiTimeframe ?? "Weekly") === tf
                        ? chipActive
                        : chipIdle
                    }`}
                  >
                    {tf} RSI
                  </button>
                ))}
              </div>
            </Field>
            <Field label="RSI overbought threshold">
              <NumInput
                value={h.rsiSellThreshold ?? 70}
                onChange={(n) => setHybrid({ rsiSellThreshold: n })}
                min={1}
                max={99}
              />
            </Field>
          </div>
        ) : null}

        {h.sellCondition === "sell-momentum-bearish" ? (
          <div className="mt-4">
            <Field label="Momentum timeframe">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as MomentumTimeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setHybrid({ momentumTimeframe: tf })}
                    className={`rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold ${
                      (h.momentumTimeframe ?? "Weekly") === tf
                        ? chipActive
                        : chipIdle
                    }`}
                  >
                    {tf === "Daily"
                      ? "Daily (shorter / mid-term)"
                      : "Weekly (longer-term)"}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        ) : null}
      </BuilderStep>

      <BuilderArrow />

      <BuilderStep eyebrow="Action">
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => setHybrid({ sellExecution: "direct" as SellExecutionMode })}
            className={`rounded-xl border px-4 py-4 text-left transition-all ${
              h.sellExecution === "direct" ? optionCardActive : optionCardIdle
            }`}
          >
            <p className="font-semibold text-ink">Sell Directly</p>
            <p className="mt-1 text-[0.9rem] text-electric">Sell 100%</p>
            <p className="mt-1 text-[0.82rem] text-muted">
              Sells 100% of the selected asset/allocation when the condition
              triggers.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setHybrid({ sellExecution: "dca-out" as SellExecutionMode })}
            className={`rounded-xl border px-4 py-4 text-left transition-all ${
              h.sellExecution === "dca-out" ? optionCardActive : optionCardIdle
            }`}
          >
            <p className="font-semibold text-ink">DCA OUT</p>
            <p className="mt-1 text-[0.82rem] text-muted">
              Sells a chosen % of the selected asset/allocation on a Daily or
              Weekly schedule.
            </p>
          </button>
        </div>

        {h.sellExecution === "dca-out" ? (
          <div className="mt-4 space-y-4 rounded-xl border border-white/[0.07] bg-void/40 p-4">
            <Field label="Frequency">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as DcaFrequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setHybrid({ dcaFrequency: f })}
                    className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold ${
                      h.dcaFrequency === f ? chipActive : chipIdle
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="% sold per execution (of selected asset/allocation)">
              <NumInput
                value={h.dcaOutPct}
                onChange={(n) =>
                  setHybrid({
                    dcaOutPct: Math.max(1, Math.min(100, n || 0)),
                  })
                }
                suffix="%"
                min={1}
                max={100}
              />
            </Field>
            <p className="text-[0.85rem] text-muted">
              Example: DCA OUT → {h.dcaFrequency} → {h.dcaOutPct}%
            </p>
          </div>
        ) : (
          <p className="mt-4 text-[0.88rem] text-muted">
            Sell Directly = 100% sold when triggered (selected asset/allocation
            only — not the entire portfolio unless that asset is 100%).
          </p>
        )}
      </BuilderStep>

      <div className="mt-5 rounded-2xl border border-electric/30 bg-electric/[0.08] px-4 py-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Strategy summary
        </p>
        <p className="mt-2 text-[1.05rem] font-semibold leading-snug text-ink">
          {formatHybridSummary(h)}
        </p>
        <p className="mt-2 text-[0.88rem] text-muted">
          Sell Directly = 100% sold when triggered. DCA OUT = chosen % sold
          Daily or Weekly of the selected asset/allocation.
        </p>
      </div>
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
      <p className="pt-6 text-muted">Select a strategy first.</p>
    );
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto overscroll-contain pt-3 pr-0.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
        Step · Configure
      </p>
      <h3 className="display mt-0.5 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">
        Strategy Configuration
      </h3>
      <p className="mt-1 text-[0.85rem] text-muted">
        Configuring:{" "}
        <span className="font-semibold text-ink">{strategyTitle(id)}</span>
      </p>

      <div className="mt-3">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Trigger → Action → % → Frequency
        </p>
        <StrategyRuleVisual
          id={id}
          config={c}
          hybrid={draft.hybrid}
          compact
        />
      </div>

      <div className="mt-4 space-y-4">
        {id === "buy-now" ? (
          <div className="space-y-4">
            <p className="rounded-2xl border border-electric/25 bg-electric/[0.08] px-4 py-4 text-[0.98rem] text-ink">
              Buy Now executes immediately when authorized. Optionally enable
              Take Profit and/or Stop Loss.
            </p>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/[0.08] bg-void/50 p-4">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 rounded accent-electric"
                checked={!!c.enableTakeProfit}
                onChange={(e) =>
                  patchConfig({ enableTakeProfit: e.target.checked })
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">Take Profit</span>
                <span className="mt-1 block text-[0.85rem] text-muted">
                  Optional — lock gains at a profit threshold.
                </span>
                {c.enableTakeProfit ? (
                  <div className="mt-3">
                    <NumInput
                      value={c.takeProfitPct ?? 20}
                      onChange={(n) => patchConfig({ takeProfitPct: n })}
                      suffix="%"
                      min={1}
                      max={500}
                    />
                  </div>
                ) : null}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/[0.08] bg-void/50 p-4">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 rounded accent-electric"
                checked={!!c.enableStopLoss}
                onChange={(e) =>
                  patchConfig({ enableStopLoss: e.target.checked })
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink">Stop Loss</span>
                <span className="mt-1 block text-[0.85rem] text-muted">
                  Optional — limit downside at a loss threshold.
                </span>
                {c.enableStopLoss ? (
                  <div className="mt-3">
                    <NumInput
                      value={c.stopLossPct ?? 10}
                      onChange={(n) => patchConfig({ stopLossPct: n })}
                      suffix="%"
                      min={1}
                      max={99}
                    />
                  </div>
                ) : null}
              </span>
            </label>

            <div className="rounded-2xl border border-white/[0.08] bg-void/50 px-4 py-3 text-[0.92rem] text-muted">
              {[
                "Buy Now",
                c.enableTakeProfit
                  ? `Take Profit +${c.takeProfitPct ?? 20}%`
                  : null,
                c.enableStopLoss
                  ? `Stop Loss -${c.stopLossPct ?? 10}%`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
          </div>
        ) : null}

        {id === "fear-greed" ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-success">
                  Buy Fear → DCA IN
                </p>
                <div className="mt-3 space-y-3">
                  <Field label="Fear threshold">
                    <NumInput
                      value={c.fearThreshold ?? 20}
                      onChange={(n) => patchConfig({ fearThreshold: n })}
                      min={0}
                      max={100}
                    />
                  </Field>
                  <Field label="DCA IN %">
                    <NumInput
                      value={c.dcaInPct ?? 10}
                      onChange={(n) => patchConfig({ dcaInPct: n })}
                      suffix="%"
                      min={1}
                      max={100}
                    />
                  </Field>
                </div>
              </div>
              <div className="rounded-2xl border border-electric/30 bg-electric/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Sell Greed → DCA OUT
                </p>
                <div className="mt-3 space-y-3">
                  <Field label="Greed threshold">
                    <NumInput
                      value={c.greedThreshold ?? 70}
                      onChange={(n) => patchConfig({ greedThreshold: n })}
                      min={0}
                      max={100}
                    />
                  </Field>
                  <Field label="DCA OUT %">
                    <NumInput
                      value={c.dcaOutPct ?? 10}
                      onChange={(n) => patchConfig({ dcaOutPct: n })}
                      suffix="%"
                      min={1}
                      max={100}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <Field label="DCA frequency">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as DcaFrequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => patchConfig({ dcaFrequency: f })}
                    className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold ${
                      (c.dcaFrequency ?? "Weekly") === f ? chipActive : chipIdle
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </Field>
            <p className="rounded-xl border border-white/[0.07] bg-void/45 px-3 py-2.5 text-[0.88rem] text-muted">
              {`Buy Fear < ${c.fearThreshold ?? 20} → DCA IN ${c.dcaInPct ?? 10}% · Sell Greed > ${c.greedThreshold ?? 70} → DCA OUT ${c.dcaOutPct ?? 10}% · ${c.dcaFrequency ?? "Weekly"}`}
            </p>
          </div>
        ) : null}

        {id === "rsi" ? (
          <div className="space-y-5">
            <Field label="Frequency (Daily or Weekly)">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as RsiTimeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => patchConfig({ rsiTimeframe: tf })}
                    className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold ${
                      (c.rsiTimeframe ?? "Weekly") === tf ? chipActive : chipIdle
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-success">
                  Buy RSI Oversold → DCA IN
                </p>
                <div className="mt-3 space-y-3">
                  <Field label="Buy when RSI &lt;">
                    <NumInput
                      value={c.rsiBuyThreshold ?? 30}
                      onChange={(n) => patchConfig({ rsiBuyThreshold: n })}
                      min={1}
                      max={99}
                    />
                  </Field>
                  <Field label="DCA IN %">
                    <NumInput
                      value={c.dcaInPct ?? 10}
                      onChange={(n) => patchConfig({ dcaInPct: n })}
                      suffix="%"
                      min={1}
                      max={100}
                    />
                  </Field>
                </div>
              </div>
              <div className="rounded-2xl border border-electric/30 bg-electric/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Sell RSI Overbought → DCA OUT
                </p>
                <div className="mt-3 space-y-3">
                  <Field label="Sell when RSI &gt;">
                    <NumInput
                      value={c.rsiSellThreshold ?? 70}
                      onChange={(n) => patchConfig({ rsiSellThreshold: n })}
                      min={1}
                      max={99}
                    />
                  </Field>
                  <Field label="DCA OUT %">
                    <NumInput
                      value={c.dcaOutPct ?? 10}
                      onChange={(n) => patchConfig({ dcaOutPct: n })}
                      suffix="%"
                      min={1}
                      max={100}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <p className="rounded-xl border border-white/[0.07] bg-void/45 px-3 py-2.5 text-[0.88rem] text-muted">
              {`RSI ${c.rsiTimeframe ?? "Weekly"} · DCA IN ${c.dcaInPct ?? 10}% · DCA OUT ${c.dcaOutPct ?? 10}%`}
            </p>
          </div>
        ) : null}

        {id === "momentum" ? (
          <div className="space-y-5">
            <Field label="Momentum mode">
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => patchConfig({ momentumMode: "trend-dca" })}
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    (c.momentumMode ?? "trend-dca") === "trend-dca"
                      ? optionCardActive
                      : optionCardIdle
                  }`}
                >
                  <p className="font-semibold text-ink">DCA IN / DCA OUT</p>
                  <p className="mt-1 text-[0.8rem] text-muted">
                    On trend change
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    patchConfig({ momentumMode: "buy-now-dca-out" })
                  }
                  className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                    c.momentumMode === "buy-now-dca-out"
                      ? optionCardActive
                      : optionCardIdle
                  }`}
                >
                  <p className="font-semibold text-ink">Buy Now → DCA OUT</p>
                  <p className="mt-1 text-[0.8rem] text-muted">
                    When momentum turns bearish
                  </p>
                </button>
              </div>
            </Field>

            <Field label="Frequency">
              <div className="flex flex-wrap gap-2">
                {(["Daily", "Weekly"] as MomentumTimeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => patchConfig({ momentumTimeframe: tf })}
                    className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold ${
                      (c.momentumTimeframe ?? "Weekly") === tf
                        ? chipActive
                        : chipIdle
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </Field>

            {(c.momentumMode ?? "trend-dca") === "trend-dca" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="DCA IN %">
                  <NumInput
                    value={c.dcaInPct ?? 10}
                    onChange={(n) => patchConfig({ dcaInPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </Field>
                <Field label="DCA OUT %">
                  <NumInput
                    value={c.dcaOutPct ?? 10}
                    onChange={(n) => patchConfig({ dcaOutPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </Field>
              </div>
            ) : (
              <Field label="DCA OUT %">
                <NumInput
                  value={c.dcaOutPct ?? 10}
                  onChange={(n) => patchConfig({ dcaOutPct: n })}
                  suffix="%"
                  min={1}
                  max={100}
                />
              </Field>
            )}

            <p className="rounded-xl border border-electric/25 bg-electric/[0.08] px-3 py-2.5 text-[0.92rem] font-semibold text-ink">
              {(c.momentumMode ?? "trend-dca") === "buy-now-dca-out"
                ? `Buy Now → Momentum turns Bearish → DCA OUT → ${c.momentumTimeframe ?? "Weekly"} → ${c.dcaOutPct ?? 10}%`
                : `Momentum ${c.momentumTimeframe ?? "Weekly"} · DCA IN ${c.dcaInPct ?? 10}% / DCA OUT ${c.dcaOutPct ?? 10}%`}
            </p>
          </div>
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
