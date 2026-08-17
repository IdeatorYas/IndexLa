"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const PHASES = [
  {
    id: "falls",
    label: "Market falls / Fear",
    shortLabel: "Falls / Fear",
    emotionalAction: "Sells in panic",
    disciplinedAction: "Buys carefully",
    emotionalValue: 3_000,
    disciplinedValue: 15_000,
    pathEnd: 0.18,
  },
  {
    id: "calms",
    label: "Market calms / Neutral",
    shortLabel: "Calms / Neutral",
    emotionalAction: "Waits and hesitates",
    disciplinedAction: "Adjusts the plan",
    emotionalValue: 2_800,
    disciplinedValue: 22_000,
    pathEnd: 0.36,
  },
  {
    id: "rises",
    label: "Market rises / Greed",
    shortLabel: "Rises / Greed",
    emotionalAction: "Buys because others are buying",
    disciplinedAction: "Takes some profit",
    emotionalValue: 5_500,
    disciplinedValue: 35_000,
    pathEnd: 0.55,
  },
  {
    id: "peaks",
    label: "Market peaks / Euphoria",
    shortLabel: "Peaks / Euphoria",
    emotionalAction: "Buys at the top",
    disciplinedAction: "Cash Out",
    emotionalValue: 8_000,
    disciplinedValue: 48_000,
    pathEnd: 0.74,
  },
  {
    id: "falls-again",
    label: "Market falls again / Fear",
    shortLabel: "Falls again / Fear",
    emotionalAction: "Sells in fear",
    disciplinedAction: "Buys again",
    emotionalValue: 1_000,
    disciplinedValue: 60_000,
    pathEnd: 1,
  },
] as const;

const START = 10_000;
const END_EMOTIONAL = 1_000;
const END_DISCIPLINED = 60_000;
const PHASE_MS = 2400;
const OUTCOME_MS = 4800;

/**
 * Shared market path: fall → calm → rise → peak → fall again.
 * Ends near the depth of the first drop so the cycle reads as looping.
 */
const MARKET_PATH =
  "M 14 44 C 32 44, 48 76, 78 76 C 102 76, 118 60, 142 54 C 172 46, 200 28, 232 16 C 252 9, 268 7, 284 10 C 298 22, 306 48, 314 74";

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

function MarketPath({
  progress,
  showLoop,
}: {
  progress: number;
  showLoop: boolean;
}) {
  const p = Math.max(0, Math.min(1, progress));

  return (
    <div className="rounded-xl border border-line bg-void/50 px-2.5 py-2.5 sm:px-3">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
          Same market for both
        </p>
        <p className="text-[0.62rem] font-medium text-muted-dim">
          A repeating cycle
        </p>
      </div>
      <svg
        viewBox="0 0 330 96"
        className="h-[4.5rem] w-full sm:h-[5rem]"
        aria-hidden
      >
        {/* Ghost loop hint: end → back toward first fall */}
        <path
          d="M 314 74 C 300 90, 120 94, 78 76"
          fill="none"
          stroke="rgba(56,189,248,0.28)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          opacity={showLoop ? 1 : 0.45}
        />
        <polygon
          points="78,76 88,70 88,82"
          fill="rgba(56,189,248,0.45)"
          opacity={showLoop ? 1 : 0.4}
        />

        <path
          d={MARKET_PATH}
          fill="none"
          stroke="rgba(148,163,184,0.22)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <motion.path
          d={MARKET_PATH}
          fill="none"
          stroke="url(#marketStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          initial={false}
          animate={{ pathLength: p }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="marketStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mt-0.5 grid grid-cols-5 gap-0.5 sm:gap-1">
        {PHASES.map((phase, i) => {
          const prevEnd = i === 0 ? 0 : PHASES[i - 1].pathEnd;
          const active = p > prevEnd && p <= phase.pathEnd;
          const done = p > phase.pathEnd;
          return (
            <p
              key={phase.id}
              className={`text-center text-[0.48rem] font-semibold uppercase leading-tight tracking-[0.02em] sm:text-[0.55rem] ${
                active
                  ? "text-electric"
                  : done
                    ? "text-muted"
                    : "text-muted-dim"
              }`}
            >
              <span className="sm:hidden">{phase.shortLabel}</span>
              <span className="hidden sm:inline">{phase.label}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

function DeskColumn({
  title,
  monogram,
  subtitle,
  action,
  value,
  history,
  tone,
  pctLabel,
  showOutcome,
  isStart,
}: {
  title: string;
  monogram: string;
  subtitle: string;
  action: string;
  value: number;
  history: number[];
  tone: "danger" | "success";
  pctLabel: string;
  showOutcome: boolean;
  isStart: boolean;
}) {
  const actionTone =
    tone === "danger"
      ? "border-danger/35 bg-danger/10 text-danger"
      : "border-success/35 bg-success/10 text-success";
  const valueTone = tone === "danger" ? "text-danger" : "text-success";

  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-line bg-void/55 p-3 sm:p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.08em] text-electric sm:text-[1.05rem]">
            {title}
          </p>
          <p className="mt-1 text-[0.65rem] leading-snug text-muted-dim">
            {subtitle}
          </p>
        </div>
        <span
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-electric/45 bg-electric/15 text-[0.7rem] font-bold text-electric"
          aria-hidden
        >
          {monogram}
        </span>
      </div>

      <motion.p
        key={value}
        initial={{ opacity: 0.55, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`mt-3 display text-[1.55rem] leading-none tracking-[-0.035em] sm:text-[1.7rem] ${
          showOutcome ? valueTone : "text-ink"
        }`}
      >
        {formatUsd(value)}
      </motion.p>
      <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-muted-dim">
        {isStart ? "Starting money" : "Their money now"}
      </p>

      <div className="mt-2.5">
        <Sparkline points={history} tone={tone} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={action}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className={`mt-2.5 rounded-lg border px-2 py-1.5 text-center text-[0.68rem] font-semibold leading-snug tracking-[0.02em] sm:text-[0.72rem] ${actionTone}`}
        >
          {action}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showOutcome && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-2.5 text-center display text-[1.2rem] font-semibold tracking-[-0.02em] ${valueTone}`}
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
  const lastPhase = PHASES[PHASES.length - 1];

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
  const isStart = step === 0;

  const emotionalValue = showOutcome
    ? END_EMOTIONAL
    : activePhase
      ? activePhase.emotionalValue
      : START;
  const disciplinedValue = showOutcome
    ? END_DISCIPLINED
    : activePhase
      ? activePhase.disciplinedValue
      : START;

  const emotionalHistory = useMemo(() => {
    const pts = [START];
    for (let i = 0; i <= Math.max(phaseIndex, -1); i++) {
      if (i >= 0 && PHASES[i]) pts.push(PHASES[i].emotionalValue);
    }
    if (showOutcome && pts[pts.length - 1] !== END_EMOTIONAL) {
      pts.push(END_EMOTIONAL);
    }
    return pts.length === 1 ? [START, START] : pts;
  }, [phaseIndex, showOutcome]);

  const disciplinedHistory = useMemo(() => {
    const pts = [START];
    for (let i = 0; i <= Math.max(phaseIndex, -1); i++) {
      if (i >= 0 && PHASES[i]) pts.push(PHASES[i].disciplinedValue);
    }
    if (showOutcome && pts[pts.length - 1] !== END_DISCIPLINED) {
      pts.push(END_DISCIPLINED);
    }
    return pts.length === 1 ? [START, START] : pts;
  }, [phaseIndex, showOutcome]);

  const emotionalAction = showOutcome
    ? lastPhase.emotionalAction
    : activePhase
      ? activePhase.emotionalAction
      : "Watching the market";
  const disciplinedAction = showOutcome
    ? lastPhase.disciplinedAction
    : activePhase
      ? activePhase.disciplinedAction
      : "Following a plan";

  const marketProgress = showOutcome
    ? 1
    : activePhase
      ? activePhase.pathEnd
      : 0.02;

  const phaseHint =
    activePhase?.id === "falls-again"
      ? "Fear returns. Cash from the peak can buy again."
      : activePhase?.id === "peaks"
        ? "At the peak, one locks gains. The other buys more."
        : "Same ups and downs. Only their choices change.";

  return (
    <div
      className="rounded-[1.25rem] border border-line bg-deep/80 p-3.5 sm:p-4"
      aria-label="Illustrative story: two investors start with the same money in the same repeating market cycle and end with different outcomes"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 max-w-[20rem] sm:max-w-none">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-electric sm:text-[0.75rem]">
            Same {formatUsd(START)}. Same market. Different behavior.
          </p>
          <p className="mt-1 text-[0.75rem] leading-snug text-muted">
            Watch what happens when one person reacts… and the other follows a
            plan.
          </p>
        </div>
        <p className="rounded-full border border-line bg-void/50 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
          Illustrative example
        </p>
      </div>

      <div className="mt-3.5">
        <MarketPath progress={marketProgress} showLoop={showOutcome || phaseIndex >= 3} />
      </div>

      <div className="mt-3 flex gap-2.5 sm:gap-3">
        <DeskColumn
          title="Emotional Investor"
          monogram="E"
          subtitle="Reacts to emotion"
          action={emotionalAction}
          value={emotionalValue}
          history={emotionalHistory}
          tone="danger"
          pctLabel="-90%"
          showOutcome={showOutcome}
          isStart={isStart}
        />
        <DeskColumn
          title="Disciplined Investor"
          monogram="D"
          subtitle="Follows a plan"
          action={disciplinedAction}
          value={disciplinedValue}
          history={disciplinedHistory}
          tone="success"
          pctLabel="+500%"
          showOutcome={showOutcome}
          isStart={isStart}
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
            className="mt-4 space-y-3 text-center"
          >
            <p className="mx-auto max-w-[22rem] text-balance text-[0.95rem] font-semibold leading-snug tracking-[-0.015em] text-ink sm:max-w-[28rem] sm:text-[1.05rem]">
              Same {formatUsd(START)}. Same market. Different behavior.{" "}
              <span className="gradient-text">Different outcome.</span>
            </p>
            <p className="mx-auto max-w-[22rem] text-pretty text-[0.85rem] font-semibold leading-snug text-electric sm:max-w-[28rem] sm:text-[0.9rem]">
              Pick your assets. Set your strategy. Let INDEXLA automate the
              execution.
            </p>
            <p className="text-[0.62rem] leading-snug text-muted-dim">
              Illustrative example — not a prediction or INDEXLA performance
              claim.
            </p>
          </motion.div>
        ) : (
          <motion.p
            key={activePhase?.id ?? "start"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3.5 text-center text-[0.72rem] leading-snug text-muted"
          >
            {isStart
              ? "Both start equal. The market begins to move."
              : phaseHint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
