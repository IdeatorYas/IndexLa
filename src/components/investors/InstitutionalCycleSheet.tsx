"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type CycleRow = {
  stage: string;
  psychology: string;
  strategy: string;
  tone: "fear" | "recovery" | "neutral" | "greed" | "euphoria" | "reversal";
};

const ROWS: CycleRow[] = [
  {
    stage: "Extreme Fear",
    psychology: "Capitulation",
    strategy: "DCA IN",
    tone: "fear",
  },
  {
    stage: "Fear",
    psychology: "Anxiety",
    strategy: "DCA IN",
    tone: "fear",
  },
  {
    stage: "Recovery",
    psychology: "Hope",
    strategy: "HOLD",
    tone: "recovery",
  },
  {
    stage: "Neutral",
    psychology: "Balance",
    strategy: "HOLD",
    tone: "neutral",
  },
  {
    stage: "Greed",
    psychology: "Optimism",
    strategy: "DCA OUT",
    tone: "greed",
  },
  {
    stage: "Extreme Greed",
    psychology: "Euphoria",
    strategy: "Increase Profit Taking",
    tone: "euphoria",
  },
  {
    stage: "Reversal",
    psychology: "Realization",
    strategy: "Prepare / Repeat",
    tone: "reversal",
  },
];

const toneDot: Record<CycleRow["tone"], string> = {
  fear: "bg-danger",
  recovery: "bg-electric",
  neutral: "bg-muted",
  greed: "bg-purple-bright",
  euphoria: "bg-purple",
  reversal: "bg-success",
};

/**
 * Institutional market-cycle strategy sheet — used once on the Investors page
 * as the signature Market Cycles visual (not reused elsewhere).
 */
export function InstitutionalCycleSheet({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  return (
    <div
      className={`overflow-hidden rounded-[1.35rem] border border-line bg-deep/80 ${className}`}
      role="img"
      aria-label="Market cycle strategy sheet mapping psychology stages to INDEXLA responses"
    >
      {/* Sheet header */}
      <div className="border-b border-line bg-void/50 px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              INDEXLA Strategy Sheet
            </p>
            <p className="mt-1.5 display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.3rem]">
              Market Cycle → Psychology → Strategy
            </p>
          </div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim">
            Rule-based response map
          </p>
        </div>

        {/* Legend strip */}
        <div className="mt-4 flex flex-wrap gap-2 text-[0.72rem] font-semibold">
          <span className="rounded-md border border-line bg-void/60 px-2.5 py-1 text-muted">
            Cycle
          </span>
          <span className="text-muted-dim" aria-hidden>
            →
          </span>
          <span className="rounded-md border border-line bg-void/60 px-2.5 py-1 text-muted">
            Psychology
          </span>
          <span className="text-muted-dim" aria-hidden>
            →
          </span>
          <span className="rounded-md border border-electric/35 bg-electric/10 px-2.5 py-1 text-electric">
            INDEXLA Strategy
          </span>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[1.2fr_1fr_1.35fr] gap-0 border-b border-line bg-void/35 px-6 py-2.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            Market Stage
          </p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            Psychology
          </p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
            INDEXLA Response
          </p>
        </div>
        <ul>
          {ROWS.map((row, i) => (
            <motion.li
              key={row.stage}
              className="grid grid-cols-[1.2fr_1fr_1.35fr] items-center gap-0 border-b border-line/70 px-6 py-3.5 last:border-b-0"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${toneDot[row.tone]}`}
                  aria-hidden
                />
                <span className="text-[0.98rem] font-semibold text-ink">
                  {row.stage}
                </span>
              </div>
              <span className="text-[0.95rem] text-muted">{row.psychology}</span>
              <span className="inline-flex w-fit items-center rounded-lg border border-electric/30 bg-electric/10 px-3 py-1.5 text-[0.82rem] font-semibold tracking-[-0.01em] text-electric">
                {row.strategy}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile stacked rows */}
      <ul className="md:hidden">
        {ROWS.map((row, i) => (
          <motion.li
            key={row.stage}
            className="border-b border-line/70 px-4 py-4 last:border-b-0"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${toneDot[row.tone]}`}
                aria-hidden
              />
              <span className="text-[0.98rem] font-semibold text-ink">
                {row.stage}
              </span>
            </div>
            <p className="mt-2 text-[0.9rem] text-muted">
              Psychology · {row.psychology}
            </p>
            <p className="mt-2 inline-flex rounded-lg border border-electric/30 bg-electric/10 px-2.5 py-1 text-[0.8rem] font-semibold text-electric">
              {row.strategy}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Cycle arc footer — subtle path, not the old ring visual */}
      <div className="border-t border-line bg-void/40 px-4 py-4 sm:px-6">
        <svg
          viewBox="0 0 640 48"
          className="h-10 w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${uid}-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(248,113,113)" />
              <stop offset="35%" stopColor="rgb(56,189,248)" />
              <stop offset="70%" stopColor="rgb(167,139,250)" />
              <stop offset="100%" stopColor="rgb(52,211,153)" />
            </linearGradient>
          </defs>
          <path
            d="M 12 36 C 80 36, 100 8, 160 8 C 220 8, 240 36, 320 36 C 400 36, 420 8, 480 8 C 540 8, 560 36, 628 36"
            fill="none"
            stroke={`url(#${uid}-arc)`}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <text
            x="320"
            y="46"
            textAnchor="middle"
            fill="rgb(110,98,136)"
            style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em" }}
          >
            CYCLE CONTINUES
          </text>
        </svg>
        <p className="mt-1 text-center text-[0.78rem] leading-relaxed text-muted">
          Fear → Accumulate · Neutral → Hold · Greed → Take Profit · Extreme
          Greed → Increase Profit Taking
        </p>
      </div>
    </div>
  );
}
