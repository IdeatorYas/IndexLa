"use client";

import {
  formatHybridSummary,
  HYBRID_BUY_OPTIONS,
  HYBRID_SELL_OPTIONS,
  summarizeStrategy,
} from "../strategies";
import { useSimulator } from "../SimulatorContext";
import {
  createManualDcaLeg,
  type DcaFrequency,
  type HybridBuyCondition,
  type HybridSellCondition,
  type ManualDcaLeg,
  type MomentumBearishAction,
  type MomentumTimeframe,
  type RebalanceFrequency,
  type RsiTimeframe,
  type SellExecutionMode,
} from "../types";
import {
  chipActive,
  chipIdle,
  fieldClass,
  labelClass,
  optionCardActive,
  optionCardIdle,
} from "../ui";

function Panel({
  title,
  accent = "default",
  children,
}: {
  title: string;
  accent?: "default" | "buy" | "sell";
  children: React.ReactNode;
}) {
  const border =
    accent === "buy"
      ? "border-success/30 bg-success/[0.07]"
      : accent === "sell"
        ? "border-electric/30 bg-electric/[0.07]"
        : "border-white/[0.08] bg-void/50";
  return (
    <div className={`rounded-xl border p-3 ${border}`}>
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink">
        {title}
      </p>
      <div className="mt-2.5 space-y-2.5">{children}</div>
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
        className={`${fieldClass} !mt-0 max-w-[9rem] !py-2`}
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix ? <span className="text-[0.85rem] text-muted">{suffix}</span> : null}
    </div>
  );
}

function ChipRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full border px-3 py-1.5 text-[0.8rem] font-semibold transition-all ${
            value === opt ? chipActive : chipIdle
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Outcome({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-white/[0.08] bg-void/45 px-3 py-2.5 text-[0.82rem] leading-relaxed text-muted">
      <span className="font-semibold text-ink">What this will do: </span>
      {text}
    </p>
  );
}

function ManualDcaEditor({
  legs,
  onChange,
}: {
  legs: ManualDcaLeg[];
  onChange: (next: ManualDcaLeg[]) => void;
}) {
  function patchLeg(id: string, patch: Partial<ManualDcaLeg>) {
    onChange(legs.map((leg) => (leg.id === id ? { ...leg, ...patch } : leg)));
  }

  return (
    <div className="space-y-2.5">
      {legs.map((leg, index) => (
        <div
          key={leg.id}
          className="rounded-xl border border-white/[0.08] bg-void/40 p-3"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
              Schedule {index + 1}
            </p>
            {legs.length > 1 ? (
              <button
                type="button"
                onClick={() => onChange(legs.filter((l) => l.id !== leg.id))}
                className="text-[0.75rem] font-semibold text-muted hover:text-ink"
              >
                Remove
              </button>
            ) : null}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div>
              <p className={labelClass}>Buy or Sell</p>
              <div className="mt-1.5">
                <ChipRow
                  options={["Buy", "Sell"]}
                  value={leg.side === "buy" ? "Buy" : "Sell"}
                  onChange={(v) =>
                    patchLeg(leg.id, { side: v === "Buy" ? "buy" : "sell" })
                  }
                />
              </div>
            </div>
            <div>
              <p className={labelClass}>Date</p>
              <input
                type="date"
                className={`${fieldClass} !mt-1.5 !py-2`}
                value={leg.date}
                onChange={(e) => patchLeg(leg.id, { date: e.target.value })}
              />
            </div>
            <div>
              <p className={labelClass}>Sizing</p>
              <div className="mt-1.5">
                <ChipRow
                  options={["% of funds", "USD amount"]}
                  value={leg.sizing === "pct" ? "% of funds" : "USD amount"}
                  onChange={(v) =>
                    patchLeg(leg.id, {
                      sizing: v === "% of funds" ? "pct" : "amount",
                    })
                  }
                />
              </div>
            </div>
            <div>
              <p className={labelClass}>
                {leg.sizing === "pct"
                  ? "% of available funds"
                  : "Amount (USD)"}
              </p>
              <div className="mt-1.5">
                <NumInput
                  value={leg.value}
                  onChange={(n) =>
                    patchLeg(leg.id, {
                      value:
                        leg.sizing === "pct"
                          ? Math.max(1, Math.min(100, n || 0))
                          : Math.max(1, n || 0),
                    })
                  }
                  suffix={leg.sizing === "pct" ? "%" : undefined}
                  min={1}
                  max={leg.sizing === "pct" ? 100 : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...legs, createManualDcaLeg()])}
        className="w-full rounded-xl border border-dashed border-electric/35 bg-electric/[0.05] px-3 py-2.5 text-[0.85rem] font-semibold text-electric hover:bg-electric/10"
      >
        + Add scheduled DCA
      </button>
    </div>
  );
}

function HybridBuilder() {
  const { draft, setHybrid } = useSimulator();
  const h = draft.hybrid;

  return (
    <div className="space-y-3">
      <Panel title="1 · Buy">
        <div className="grid gap-2">
          {HYBRID_BUY_OPTIONS.map((opt) => {
            const active = h.buyCondition === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setHybrid({ buyCondition: opt.id as HybridBuyCondition })
                }
                className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">{opt.label}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted">{opt.summary}</p>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title="2 · Sell condition">
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
                className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                  active ? optionCardActive : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">{opt.label}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted">{opt.summary}</p>
              </button>
            );
          })}
        </div>
        {h.sellCondition === "sell-greed" ? (
          <div className="mt-2">
            <p className={labelClass}>Greed threshold</p>
            <div className="mt-1.5">
              <NumInput
                value={h.greedThreshold ?? 70}
                onChange={(n) => setHybrid({ greedThreshold: n })}
                min={0}
                max={100}
              />
            </div>
          </div>
        ) : null}
        {h.sellCondition === "sell-rsi-overbought" ? (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <p className={labelClass}>RSI overbought above</p>
              <div className="mt-1.5">
                <NumInput
                  value={h.rsiSellThreshold ?? 70}
                  onChange={(n) => setHybrid({ rsiSellThreshold: n })}
                  min={1}
                  max={99}
                />
              </div>
            </div>
            <div>
              <p className={labelClass}>RSI frequency</p>
              <div className="mt-1.5">
                <ChipRow
                  options={["Daily", "Weekly"] as RsiTimeframe[]}
                  value={(h.rsiTimeframe ?? "Weekly") as RsiTimeframe}
                  onChange={(v) => setHybrid({ rsiTimeframe: v })}
                />
              </div>
            </div>
          </div>
        ) : null}
        {h.sellCondition === "sell-momentum-bearish" ? (
          <div className="mt-2">
            <p className={labelClass}>Momentum frequency</p>
            <div className="mt-1.5">
              <ChipRow
                options={["Daily", "Weekly"] as MomentumTimeframe[]}
                value={(h.momentumTimeframe ?? "Weekly") as MomentumTimeframe}
                onChange={(v) => setHybrid({ momentumTimeframe: v })}
              />
            </div>
          </div>
        ) : null}
      </Panel>

      <Panel title="3 · Sell action">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              setHybrid({ sellExecution: "direct" as SellExecutionMode })
            }
            className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
              h.sellExecution === "direct" ? optionCardActive : optionCardIdle
            }`}
          >
            <p className="font-semibold text-ink">Sell Direct</p>
            <p className="mt-0.5 text-[0.8rem] text-muted">
              Sell a set % when the condition is met.
            </p>
          </button>
          <button
            type="button"
            onClick={() =>
              setHybrid({ sellExecution: "dca-out" as SellExecutionMode })
            }
            className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
              h.sellExecution === "dca-out" ? optionCardActive : optionCardIdle
            }`}
          >
            <p className="font-semibold text-ink">DCA OUT</p>
            <p className="mt-0.5 text-[0.8rem] text-muted">
              Sell gradually on a Daily or Weekly schedule.
            </p>
          </button>
        </div>

        {h.sellExecution === "direct" ? (
          <div className="mt-2">
            <p className={labelClass}>% to sell</p>
            <div className="mt-1.5">
              <NumInput
                value={h.sellDirectPct ?? 100}
                onChange={(n) =>
                  setHybrid({
                    sellDirectPct: Math.max(1, Math.min(100, n || 0)),
                  })
                }
                suffix="%"
                min={1}
                max={100}
              />
            </div>
          </div>
        ) : (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div>
              <p className={labelClass}>Frequency</p>
              <div className="mt-1.5">
                <ChipRow
                  options={["Daily", "Weekly"] as DcaFrequency[]}
                  value={(h.dcaFrequency ?? "Weekly") as DcaFrequency}
                  onChange={(v) => setHybrid({ dcaFrequency: v })}
                />
              </div>
            </div>
            <div>
              <p className={labelClass}>% of available funds per execution</p>
              <div className="mt-1.5">
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
              </div>
            </div>
          </div>
        )}
      </Panel>

      <Outcome text={formatHybridSummary(h)} />
    </div>
  );
}

/** Product-style strategy configuration — no generic Trigger/Action cards. */
export function ConfigureStep({ embedded = false }: { embedded?: boolean }) {
  const { draft, updateDraft } = useSimulator();
  const id = draft.strategyId;
  const c = draft.strategyConfig;

  function patchConfig(patch: Partial<typeof c>) {
    updateDraft({ strategyConfig: { ...c, ...patch } });
  }

  if (!id) {
    return embedded ? null : (
      <p className="pt-6 text-muted">Select a strategy first.</p>
    );
  }

  const legs = c.manualDcaLegs ?? [];

  return (
    <div className={embedded ? "space-y-3" : "h-full min-h-0 space-y-3 overflow-y-auto pt-3 pr-0.5"}>
      {id === "buy-now" ? (
        <div className="space-y-3">
          <p className="text-[0.88rem] text-muted">
            Buys your allocation immediately when authorized.
          </p>

          <Panel title="Optional Take Profit">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-electric"
                checked={!!c.enableTakeProfit}
                onChange={(e) =>
                  patchConfig({ enableTakeProfit: e.target.checked })
                }
              />
              <span className="text-[0.85rem] font-semibold text-ink">
                Enable Take Profit
              </span>
            </label>
            <div
              className={`grid gap-2.5 sm:grid-cols-2 ${
                c.enableTakeProfit ? "" : "opacity-50"
              }`}
            >
              <div>
                <p className={labelClass}>Take profit at (% gain)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.takeProfitPct ?? 20}
                    onChange={(n) =>
                      patchConfig({
                        takeProfitPct: n,
                        enableTakeProfit: true,
                      })
                    }
                    suffix="% gain"
                    min={1}
                    max={500}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>Sell (% of allocation)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.takeProfitSellPct ?? 100}
                    onChange={(n) =>
                      patchConfig({
                        takeProfitSellPct: Math.max(1, Math.min(100, n || 0)),
                        enableTakeProfit: true,
                      })
                    }
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Optional Stop Loss">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-electric"
                checked={!!c.enableStopLoss}
                onChange={(e) =>
                  patchConfig({ enableStopLoss: e.target.checked })
                }
              />
              <span className="text-[0.85rem] font-semibold text-ink">
                Enable Stop Loss
              </span>
            </label>
            <div
              className={`grid gap-2.5 sm:grid-cols-2 ${
                c.enableStopLoss ? "" : "opacity-50"
              }`}
            >
              <div>
                <p className={labelClass}>Stop loss at (% loss)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.stopLossPct ?? 10}
                    onChange={(n) =>
                      patchConfig({
                        stopLossPct: n,
                        enableStopLoss: true,
                      })
                    }
                    suffix="% loss"
                    min={1}
                    max={99}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>Sell (% of allocation)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.stopLossSellPct ?? 100}
                    onChange={(n) =>
                      patchConfig({
                        stopLossSellPct: Math.max(1, Math.min(100, n || 0)),
                        enableStopLoss: true,
                      })
                    }
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Manual DCA">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-electric"
                checked={!!c.enableManualDca}
                onChange={(e) => {
                  const enabled = e.target.checked;
                  patchConfig({
                    enableManualDca: enabled,
                    manualDcaLegs:
                      enabled && legs.length === 0
                        ? [createManualDcaLeg()]
                        : legs,
                  });
                }}
              />
              <span className="text-[0.85rem] font-semibold text-ink">
                Add scheduled buy/sell dates
              </span>
            </label>
            {c.enableManualDca ? (
              <ManualDcaEditor
                legs={legs.length ? legs : [createManualDcaLeg()]}
                onChange={(next) =>
                  patchConfig({
                    enableManualDca: true,
                    manualDcaLegs: next,
                  })
                }
              />
            ) : (
              <p className="text-[0.8rem] text-muted">
                Optional — schedule buys or sells on exact dates in addition to
                Buy Now.
              </p>
            )}
          </Panel>

          <Outcome
            text={summarizeStrategy(id, c, draft.hybrid)}
          />
        </div>
      ) : null}

      {id === "fear-greed" ? (
        <div className="space-y-3">
          <div>
            <p className={labelClass}>Frequency</p>
            <div className="mt-1.5">
              <ChipRow
                options={["Daily", "Weekly"] as DcaFrequency[]}
                value={(c.dcaFrequency ?? "Weekly") as DcaFrequency}
                onChange={(v) => patchConfig({ dcaFrequency: v })}
              />
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Panel title="Buy Fear → DCA IN" accent="buy">
              <div>
                <p className={labelClass}>Fear threshold (below)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.fearThreshold ?? 20}
                    onChange={(n) => patchConfig({ fearThreshold: n })}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>% of available funds</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.dcaInPct ?? 10}
                    onChange={(n) => patchConfig({ dcaInPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </Panel>
            <Panel title="Sell Greed → DCA OUT" accent="sell">
              <div>
                <p className={labelClass}>Greed threshold (above)</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.greedThreshold ?? 70}
                    onChange={(n) => patchConfig({ greedThreshold: n })}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>% of available funds</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.dcaOutPct ?? 10}
                    onChange={(n) => patchConfig({ dcaOutPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </Panel>
          </div>
          <Outcome text={summarizeStrategy(id, c, draft.hybrid)} />
        </div>
      ) : null}

      {id === "rsi" ? (
        <div className="space-y-3">
          <div>
            <p className={labelClass}>RSI Frequency</p>
            <div className="mt-1.5">
              <ChipRow
                options={["Daily", "Weekly"] as RsiTimeframe[]}
                value={(c.rsiTimeframe ?? "Weekly") as RsiTimeframe}
                onChange={(v) => patchConfig({ rsiTimeframe: v })}
              />
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Panel title="RSI Oversold → DCA IN" accent="buy">
              <div>
                <p className={labelClass}>Oversold when RSI below</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.rsiBuyThreshold ?? 30}
                    onChange={(n) => patchConfig({ rsiBuyThreshold: n })}
                    min={1}
                    max={99}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>% of available funds</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.dcaInPct ?? 10}
                    onChange={(n) => patchConfig({ dcaInPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </Panel>
            <Panel title="RSI Overbought → DCA OUT" accent="sell">
              <div>
                <p className={labelClass}>Overbought when RSI above</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.rsiSellThreshold ?? 70}
                    onChange={(n) => patchConfig({ rsiSellThreshold: n })}
                    min={1}
                    max={99}
                  />
                </div>
              </div>
              <div>
                <p className={labelClass}>% of available funds</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.dcaOutPct ?? 10}
                    onChange={(n) => patchConfig({ dcaOutPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            </Panel>
          </div>
          <Outcome text={summarizeStrategy(id, c, draft.hybrid)} />
        </div>
      ) : null}

      {id === "momentum" ? (
        <div className="space-y-3">
          <div>
            <p className={labelClass}>Momentum Frequency</p>
            <div className="mt-1.5">
              <ChipRow
                options={["Daily", "Weekly"] as MomentumTimeframe[]}
                value={(c.momentumTimeframe ?? "Weekly") as MomentumTimeframe}
                onChange={(v) => patchConfig({ momentumTimeframe: v })}
              />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => patchConfig({ momentumMode: "trend-dca" })}
              className={`rounded-xl border px-3 py-2.5 text-left ${
                (c.momentumMode ?? "trend-dca") === "trend-dca"
                  ? optionCardActive
                  : optionCardIdle
              }`}
            >
              <p className="font-semibold text-ink">Trend DCA</p>
              <p className="mt-0.5 text-[0.78rem] text-muted">
                DCA IN on bullish · exit on bearish
              </p>
            </button>
            <button
              type="button"
              onClick={() => patchConfig({ momentumMode: "buy-now-dca-out" })}
              className={`rounded-xl border px-3 py-2.5 text-left ${
                c.momentumMode === "buy-now-dca-out"
                  ? optionCardActive
                  : optionCardIdle
              }`}
            >
              <p className="font-semibold text-ink">Buy Now → Exit on Bearish</p>
              <p className="mt-0.5 text-[0.78rem] text-muted">
                Enter now, exit when momentum turns bearish
              </p>
            </button>
          </div>

          {(c.momentumMode ?? "trend-dca") === "trend-dca" ? (
            <Panel title="Bullish Trend → DCA IN" accent="buy">
              <p className={labelClass}>% of available funds</p>
              <div className="mt-1.5">
                <NumInput
                  value={c.dcaInPct ?? 10}
                  onChange={(n) => patchConfig({ dcaInPct: n })}
                  suffix="%"
                  min={1}
                  max={100}
                />
              </div>
            </Panel>
          ) : null}

          <Panel title="Bearish Trend" accent="sell">
            <p className={labelClass}>When momentum turns bearish</p>
            <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  patchConfig({
                    momentumBearishAction: "dca-out" as MomentumBearishAction,
                  })
                }
                className={`rounded-xl border px-3 py-2.5 text-left ${
                  (c.momentumBearishAction ?? "dca-out") === "dca-out"
                    ? optionCardActive
                    : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">DCA OUT</p>
                <p className="mt-0.5 text-[0.78rem] text-muted">
                  Sell a % of available funds
                </p>
              </button>
              <button
                type="button"
                onClick={() =>
                  patchConfig({
                    momentumBearishAction: "sell-all" as MomentumBearishAction,
                  })
                }
                className={`rounded-xl border px-3 py-2.5 text-left ${
                  c.momentumBearishAction === "sell-all"
                    ? optionCardActive
                    : optionCardIdle
                }`}
              >
                <p className="font-semibold text-ink">
                  Sell All when Momentum turns Bearish
                </p>
                <p className="mt-0.5 text-[0.78rem] text-muted">
                  Exit the full allocation
                </p>
              </button>
            </div>
            {(c.momentumBearishAction ?? "dca-out") === "dca-out" ? (
              <div className="mt-2">
                <p className={labelClass}>% of available funds</p>
                <div className="mt-1.5">
                  <NumInput
                    value={c.dcaOutPct ?? 10}
                    onChange={(n) => patchConfig({ dcaOutPct: n })}
                    suffix="%"
                    min={1}
                    max={100}
                  />
                </div>
              </div>
            ) : null}
          </Panel>

          <Outcome text={summarizeStrategy(id, c, draft.hybrid)} />
        </div>
      ) : null}

      {id === "manual-dca" ? (
        <div className="space-y-3">
          <p className="text-[0.88rem] text-muted">
            Define your own buy/sell schedule by date and size — no market
            condition required.
          </p>
          <ManualDcaEditor
            legs={legs.length ? legs : [createManualDcaLeg()]}
            onChange={(next) =>
              patchConfig({
                enableManualDca: true,
                manualDcaLegs: next,
              })
            }
          />
          <Outcome text={summarizeStrategy(id, c, draft.hybrid)} />
        </div>
      ) : null}

      {id === "rebalancing" ? (
        <div className="space-y-3">
          <Panel title="Rebalancing Frequency">
            <ChipRow
              options={
                [
                  "Weekly",
                  "Monthly",
                  "Quarterly",
                  "On Drift",
                ] as RebalanceFrequency[]
              }
              value={(c.rebalanceFrequency ?? "Monthly") as RebalanceFrequency}
              onChange={(v) => patchConfig({ rebalanceFrequency: v })}
            />
          </Panel>
          <Outcome text={summarizeStrategy(id, c, draft.hybrid)} />
        </div>
      ) : null}

      {id === "hybrid" ? <HybridBuilder /> : null}
    </div>
  );
}
