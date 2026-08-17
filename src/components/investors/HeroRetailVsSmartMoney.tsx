"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type PhaseId = "fear" | "neutral" | "greed" | "euphoria" | "outcome";

const PHASES: {
  id: PhaseId;
  label: string;
  retailAction: string;
  smartAction: string;
  retailValue: number;
  smartValue: number;
}[] = [
  {
    id: "fear",
    label: "Fear",
    retailAction: "Panic Sell",
    smartAction: "Accumulate",
    retailValue: 7_200,
    smartValue: 12_400,
  },
  {
    id: "neutral",
    label: "Neutral",
    retailAction: "Wait / Hesitate",
    smartAction: "Rebalance",
    retailValue: 6_800,
    smartValue: 18_600,
  },
  {
    id: "greed",
    label: "Greed",
    retailAction: "FOMO Buy",
    smartAction: "Take Profit",
    retailValue: 8_400,
    smartValue: 34_000,
  },
  {
    id: "euphoria",
    label: "Euphoria",
    retailAction: "Buy the Top",
    smartAction: "Reduce Exposure",
    retailValue: 1_000,
    smartValue: 60_000,
  },
];

const START = 10_000;
const PHASE_MS = 2400;
const OUTCOME_MS = 4200;

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function Sparkline({
  points,
  tone,
}: {
  points: number[];
  tone: "danger" | "success";
}) {
  const w = 120;
  const h = 28;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 1);
  const d = points
    .map((v, i) => {
      const x = (i / Math.max(points.length - 1, 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke = tone === "danger" ? "#f87171" : "#34d399";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-7 w-full"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

function DeskColumn({
  title,
  action,
  value,
  history,
  tone,
  pctLabel,
  showOutcome,
}: {
  title: string;
  action: string;
  value: number;
  history: number[];
  tone: "danger" | "success";
  pctLabel: string;
  showOutcome: boolean;
}) {
  const actionTone =
    tone === "danger"
      ? "border-danger/35 bg-danger/10 text-danger"
      : "border-success/35 bg-success/10 text-success";
  const valueTone = tone === "danger" ? "text-danger" : "text-success";

  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-line bg-void/55 p-3 sm:p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
          {title}
        </p>
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] font-bold ${
            tone === "danger"
              ? "border-danger/40 bg-danger/10 text-danger"
              : "border-success/40 bg-success/10 text-success"
          }`}
          aria-hidden
        >
          {title === "Retail" ? "R" : "S"}
        </span>
      </div>

      <p className="mt-2.5 display text-[1.35rem] leading-none tracking-[-0.03em] text-ink sm:text-[1.5rem]">
        {formatUsd(value)}
      </p>
      <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-muted-dim">
        Portfolio value
      </p>

      <div className="mt-2.5">
        <Sparkline points={history} tone={tone} />
      </div>

      <div
        className={`mt-2.5 rounded-lg border px-2.5 py-1.5 text-center text-[0.72rem] font-semibold uppercase tracking-[0.08em] ${actionTone}`}
      >
        {action}
      </div>

      <AnimatePresence>
        {showOutcome && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-2.5 text-center display text-[1.15rem] font-semibold tracking-[-0.02em] ${valueTone}`}
          >
            {pctLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HeroRetailVsSmartMoney() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  // steps: 0 = start, 1..4 = phases, 5 = outcome hold

  useEffect(() => {
    if (reduce) {
      setStep(PHASES.length + 1);
      return;
    }
    const outcomeStep = PHASES.length + 1;
    const delay = step === outcomeStep ? OUTCOME_MS : PHASE_MS;
    const id = window.setTimeout(() => {
      setStep((s) => (s >= outcomeStep ? 0 : s + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [reduce, step]);

  const phaseIndex = step >= 1 && step <= PHASES.length ? step - 1 : -1;
  const activePhase = phaseIndex >= 0 ? PHASES[phaseIndex] : null;
  const showOutcome = step > PHASES.length;

  const retailValue = showOutcome
    ? 1_000
    : activePhase
      ? activePhase.retailValue
      : START;
  const smartValue = showOutcome
    ? 60_000
    : activePhase
      ? activePhase.smartValue
      : START;

  const retailHistory = useMemo(() => {
    const pts = [START];
    for (let i = 0; i <= Math.max(phaseIndex, -1); i++) {
      if (i >= 0 && PHASES[i]) pts.push(PHASES[i].retailValue);
    }
    if (showOutcome && pts[pts.length - 1] !== 1_000) pts.push(1_000);
    return pts.length === 1 ? [START, START] : pts;
  }, [phaseIndex, showOutcome]);

  const smartHistory = useMemo(() => {
    const pts = [START];
    for (let i = 0; i <= Math.max(phaseIndex, -1); i++) {
      if (i >= 0 && PHASES[i]) pts.push(PHASES[i].smartValue);
    }
    if (showOutcome && pts[pts.length - 1] !== 60_000) pts.push(60_000);
    return pts.length === 1 ? [START, START] : pts;
  }, [phaseIndex, showOutcome]);

  const retailAction = showOutcome
    ? "Buy the Top"
    : activePhase
      ? activePhase.retailAction
      : "Ready";
  const smartAction = showOutcome
    ? "Reduce Exposure"
    : activePhase
      ? activePhase.smartAction
      : "Ready";

  const cycleIndex = showOutcome
    ? PHASES.length - 1
    : Math.max(phaseIndex, 0);

  return (
    <div
      className="rounded-[1.25rem] border border-line bg-deep/80 p-3.5 sm:p-4"
      aria-label="Illustrative retail versus smart money market cycle scenario"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
            Same market. Different execution.
          </p>
          <p className="mt-0.5 text-[0.72rem] text-muted">
            Starting capital: {formatUsd(START)} each
          </p>
        </div>
        <p className="rounded-full border border-line bg-void/50 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative scenario
        </p>
      </div>

      {/* Shared cycle rail */}
      <div className="mt-3.5 grid grid-cols-4 gap-1.5">
        {PHASES.map((p, i) => {
          const active = !showOutcome && phaseIndex === i;
          const done = phaseIndex > i || showOutcome;
          return (
            <div
              key={p.id}
              className={`rounded-lg border px-1 py-1.5 text-center transition-colors ${
                active
                  ? "border-electric/50 bg-electric/15 text-ink"
                  : done
                    ? "border-line bg-void/40 text-muted"
                    : "border-line/60 bg-void/20 text-muted-dim"
              }`}
            >
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.08em] sm:text-[0.62rem]">
                {p.label}
              </p>
            </div>
          );
        })}
      </div>
      <p className="mt-1.5 text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-dim">
        {showOutcome
          ? "Cycle complete"
          : activePhase
            ? `Phase: ${activePhase.label}`
            : "Market cycle begins"}
      </p>

      <div className="mt-3.5 flex gap-2.5 sm:gap-3">
        <DeskColumn
          title="Retail"
          action={retailAction}
          value={retailValue}
          history={retailHistory}
          tone="danger"
          pctLabel="-90%"
          showOutcome={showOutcome}
        />
        <DeskColumn
          title="Smart Money"
          action={smartAction}
          value={smartValue}
          history={smartHistory}
          tone="success"
          pctLabel="+500%"
          showOutcome={showOutcome}
        />
      </div>

      <AnimatePresence mode="wait">
        {showOutcome ? (
          <motion.div
            key="outcome"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-3.5 space-y-2 text-center"
          >
            <p className="display text-[0.95rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.05rem]">
              Emotions are universal.{" "}
              <span className="gradient-text">Execution is not.</span>
            </p>
            <p className="text-[0.8rem] font-semibold text-electric">
              Set the rules once. Let execution follow.
            </p>
            <p className="text-[0.65rem] leading-snug text-muted-dim">
              Illustrative scenario only. Not historical performance. Not an
              INDEXLA return claim.
            </p>
          </motion.div>
        ) : (
          <motion.p
            key={`phase-msg-${cycleIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3.5 text-center text-[0.72rem] leading-snug text-muted"
          >
            Both face the same cycle. Only the decisions change.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
