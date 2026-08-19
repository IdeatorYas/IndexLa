"use client";

import { motion, useReducedMotion } from "framer-motion";

type PhaseAccent = "default" | "electric" | "danger";

type EnginePhase = {
  id: string;
  num: string;
  title: string;
  detail: string;
  accent: PhaseAccent;
};

const PHASE_COUNT = 4;
const RING_RADIUS = 36;

const phases: EnginePhase[] = [
  {
    id: "create",
    num: "01",
    title: "CREATE",
    detail: "Portfolio or Index + Strategy",
    accent: "default",
  },
  {
    id: "use",
    num: "02",
    title: "USE $DEXLA",
    detail: "Publish · Feature · Monetize · Save · Tip",
    accent: "electric",
  },
  {
    id: "activity",
    num: "03",
    title: "ACTIVITY + REVENUE",
    detail: "AUM · Volume · Fees · Strategy Access",
    accent: "default",
  },
  {
    id: "supply",
    num: "04",
    title: "SUPPLY REDUCTION",
    detail: "Burns + Buybacks",
    accent: "danger",
  },
];

function polarPercent(index: number, radius: number) {
  const angle = (index / PHASE_COUNT) * 2 * Math.PI - Math.PI / 2;
  return {
    left: 50 + radius * Math.cos(angle),
    top: 50 + radius * Math.sin(angle),
  };
}

function polarPoint(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function panelStyles(accent: PhaseAccent) {
  if (accent === "danger") {
    return "border-danger/42 bg-gradient-to-b from-danger/[0.12] via-void/82 to-transparent shadow-[0_0_28px_-12px_rgba(248,113,113,0.32),inset_0_1px_0_0_rgba(248,113,113,0.12)]";
  }
  if (accent === "electric") {
    return "border-electric/48 bg-gradient-to-b from-electric/[0.12] via-void/82 to-transparent shadow-[0_0_32px_-12px_rgba(56,189,248,0.36),inset_0_1px_0_0_rgba(56,189,248,0.14)]";
  }
  return "border-white/[0.14] bg-gradient-to-b from-white/[0.08] via-void/82 to-transparent shadow-[0_10px_32px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.05)]";
}

function numStyles(accent: PhaseAccent) {
  if (accent === "danger") return "text-danger";
  if (accent === "electric") return "text-electric";
  return "text-muted-dim";
}

function PhaseCard({ phase }: { phase: EnginePhase }) {
  return (
    <motion.article
      className={`border px-3 py-2.5 text-center sm:px-3.5 sm:py-3 ${panelStyles(phase.accent)}`}
    >
      <p
        className={`display text-[1.15rem] font-semibold leading-none tabular-nums tracking-[-0.05em] sm:text-[1.35rem] ${numStyles(phase.accent)}`}
      >
        {phase.num}
      </p>
      <h3 className="display mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[-0.02em] text-ink sm:text-[0.76rem]">
        {phase.title}
      </h3>
      <p className="mt-1 text-[0.68rem] font-medium leading-snug tracking-[-0.015em] text-muted sm:text-[0.74rem]">
        {phase.detail}
      </p>
    </motion.article>
  );
}

function EngineConnectors() {
  const cx = 50;
  const cy = 50;
  const connectorR = RING_RADIUS * 0.76;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <marker
          id="engine-arrow"
          markerWidth="5"
          markerHeight="5"
          refX="4.1"
          refY="2.5"
          orient="auto"
        >
          <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(56,189,248,0.85)" />
        </marker>
        <radialGradient id="engine-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
        <radialGradient id="engine-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.26)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={22} fill="url(#engine-core-glow)" />

      {Array.from({ length: PHASE_COUNT }, (_, i) => {
        const angle = (i / PHASE_COUNT) * 2 * Math.PI - Math.PI / 2;
        const end = polarPoint(cx, cy, connectorR, angle);
        return (
          <g key={`connector-${i}`}>
            <line
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="rgba(56,189,248,0.52)"
              strokeWidth="0.65"
              strokeLinecap="round"
              markerEnd="url(#engine-arrow)"
            />
            <circle cx={end.x} cy={end.y} r="1.1" fill="rgba(56,189,248,0.6)" />
            <circle cx={end.x} cy={end.y} r="4.8" fill="url(#engine-node-glow)" />
          </g>
        );
      })}
    </svg>
  );
}

export function DexlaEconomicEngine() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem] xl:max-w-[32rem]">
      <EngineConnectors />

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 w-[38%] max-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 sm:max-w-[9.5rem]"
        initial={animate ? { opacity: 0, scale: 0.92 } : false}
        whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true }}
      >
        <div className="relative border border-electric/50 bg-void/96 px-3 py-4 text-center shadow-[inset_0_1px_0_0_rgba(56,189,248,0.18)] sm:px-4 sm:py-5">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(56,189,248,0.14), transparent 68%)",
            }}
            aria-hidden
          />
          <p className="display relative text-[1.15rem] font-semibold tracking-[-0.04em] text-electric sm:text-[1.35rem]">
            $DEXLA
          </p>
          <p className="relative mt-1.5 text-[0.62rem] font-medium italic tracking-[-0.01em] text-muted sm:text-[0.7rem]">
            Economic Engine
          </p>
        </div>
      </motion.div>

      {phases.map((phase, index) => {
        const { left, top } = polarPercent(index, RING_RADIUS);
        return (
          <motion.div
            key={phase.id}
            className="absolute z-10 w-[42%] max-w-[10.5rem] -translate-x-1/2 -translate-y-1/2 sm:max-w-[11.5rem]"
            style={{ left: `${left}%`, top: `${top}%` }}
            initial={animate ? { opacity: 0, scale: 0.94 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.08 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PhaseCard phase={phase} />
          </motion.div>
        );
      })}
    </div>
  );
}
