"use client";

import {
  formatHybridSummary,
  HYBRID_BUY_OPTIONS,
  HYBRID_SELL_OPTIONS,
  strategyTitle,
} from "../strategies";
import { useSimulator } from "../SimulatorContext";
import type {
  DcaFrequency,
  HybridBuyCondition,
  HybridSellCondition,
  MomentumTimeframe,
  RebalanceFrequency,
  RsiTimeframe,
  SellAmountMode,
  SellExecutionMode,
} from "../types";
import { resolveSellPct } from "../types";
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
  const sellPct = resolveSellPct(h);

  return (
    <div className="space-y-1">
      <p className="mb-4 text-[0.95rem] text-muted">
        Visual rule builder — configure Buy, Sell condition, Action, and Amount.
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
        <div className="grid gap-2 sm:grid-cols-2">
          {(
            [
              { id: "direct" as SellExecutionMode, label: "Sell Directly" },
              { id: "dca-out" as SellExecutionMode, label: "DCA OUT" },
            ] as const
          ).map((opt) => {
            const active = h.sellExecution === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHybrid({ sellExecution: opt.id })}
                className={`rounded-xl border px-4 py-3 text-left font-semibold transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <span className="text-ink">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </BuilderStep>

      <BuilderArrow />

      <BuilderStep eyebrow="Amount">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: "50" as SellAmountMode, label: "50%" },
              { id: "100" as SellAmountMode, label: "100%" },
              { id: "custom" as SellAmountMode, label: "Custom %" },
            ] as const
          ).map((opt) => {
            const active = h.sellAmountMode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHybrid({ sellAmountMode: opt.id })}
                className={`rounded-full border px-4 py-2 text-[0.85rem] font-semibold transition-all ${
                  active ? chipActive : chipIdle
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {h.sellAmountMode === "custom" ? (
          <div className="mt-3">
            <NumInput
              value={h.sellCustomPct}
              onChange={(n) =>
                setHybrid({
                  sellCustomPct: Math.max(1, Math.min(100, n || 0)),
                })
              }
              suffix="%"
              min={1}
              max={100}
            />
          </div>
        ) : null}
        <p className="mt-3 text-[0.85rem] text-muted">
          When triggered, sell <strong className="text-ink">{sellPct}%</strong>{" "}
          of the position.
        </p>
      </BuilderStep>

      <div className="mt-5 rounded-2xl border border-electric/30 bg-electric/[0.08] px-4 py-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-electric">
          Strategy summary
        </p>
        <p className="mt-2 text-[1.05rem] font-semibold leading-snug text-ink">
          {formatHybridSummary(h)}
        </p>
        <p className="mt-2 text-[0.88rem] text-muted">
          What triggers → what action → how much is affected.
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
    return <p className="text-muted">Select a strategy first.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h3 className="display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em] text-ink">
        Strategy Configuration
      </h3>
      <p className="mt-2 text-[0.98rem] text-muted">
        Configuring:{" "}
        <span className="font-semibold text-ink">{strategyTitle(id)}</span>
      </p>

      <div className="mt-6 space-y-5">
        {id === "buy-now" ? (
          <p className="rounded-2xl border border-electric/25 bg-electric/[0.08] px-4 py-4 text-[0.98rem] text-ink">
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

        {id === "fear-greed" ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-success">
                  Buy Fear → DCA IN
                </p>
                <div className="mt-3">
                  <Field label="Fear threshold">
                    <NumInput
                      value={c.fearThreshold ?? 20}
                      onChange={(n) => patchConfig({ fearThreshold: n })}
                      min={0}
                      max={100}
                    />
                  </Field>
                </div>
              </div>
              <div className="rounded-2xl border border-electric/30 bg-electric/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Sell Greed → DCA OUT
                </p>
                <div className="mt-3">
                  <Field label="Greed threshold">
                    <NumInput
                      value={c.greedThreshold ?? 70}
                      onChange={(n) => patchConfig({ greedThreshold: n })}
                      min={0}
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
            <div className="rounded-2xl border border-white/[0.08] bg-void/50 px-4 py-3 text-[0.92rem] text-muted">
              When Fear &lt; {c.fearThreshold ?? 20} →{" "}
              <strong className="text-ink">DCA IN</strong>. When Greed &gt;{" "}
              {c.greedThreshold ?? 70} →{" "}
              <strong className="text-ink">DCA OUT</strong>. Frequency:{" "}
              <strong className="text-ink">{c.dcaFrequency ?? "Weekly"}</strong>.
            </div>
          </div>
        ) : null}

        {id === "rsi" ? (
          <div className="space-y-5">
            <Field label="RSI timeframe">
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
                    {tf} RSI
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-success">
                  Buy RSI Oversold → Buy
                </p>
                <div className="mt-3">
                  <Field label="Buy when RSI &lt;">
                    <NumInput
                      value={c.rsiBuyThreshold ?? 30}
                      onChange={(n) => patchConfig({ rsiBuyThreshold: n })}
                      min={1}
                      max={99}
                    />
                  </Field>
                </div>
              </div>
              <div className="rounded-2xl border border-electric/30 bg-electric/10 p-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
                  Sell RSI Overbought → Sell
                </p>
                <div className="mt-3">
                  <Field label="Sell when RSI &gt;">
                    <NumInput
                      value={c.rsiSellThreshold ?? 70}
                      onChange={(n) => patchConfig({ rsiSellThreshold: n })}
                      min={1}
                      max={99}
                    />
                  </Field>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-void/50 px-4 py-3 text-[0.92rem] text-muted">
              {c.rsiTimeframe ?? "Weekly"} RSI: Buy when RSI &lt;{" "}
              {c.rsiBuyThreshold ?? 30}. Sell when RSI &gt;{" "}
              {c.rsiSellThreshold ?? 70}.
            </div>
          </div>
        ) : null}

        {id === "momentum" ? (
          <Field label="Trend timeframe">
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
                  {tf === "Daily"
                    ? "Daily Trend Change"
                    : "Weekly Trend Change"}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[0.85rem] text-muted">
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
