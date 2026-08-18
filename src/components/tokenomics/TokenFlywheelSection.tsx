"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { tkH2, tkSection, tkSurface } from "@/components/tokenomics/tokenomicsRhythm";

type PhaseAccent = "default" | "electric" | "danger";

type EnginePhase = {
  id: string;
  num: string;
  title: string;
  detail: string;
  accent: PhaseAccent;
};

const LOOP =
  "More Platform Activity → More $DEXLA Utility → More Token Burns";

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

/** Clockwise: top → right → bottom → left */
const DESKTOP_ANCHORS = [
  { x: 50, y: 10 },
  { x: 90, y: 50 },
  { x: 50, y: 90 },
  { x: 10, y: 50 },
] as const;

const PHASE_CONNECTORS = [
  "M 50 17 Q 74 17 83 50",
  "M 83 50 Q 74 83 50 83",
  "M 50 83 Q 26 83 17 50",
] as const;

/** Outer return arc — SUPPLY REDUCTION → CREATE with integrated loop */
const LOOP_ARC = "M 17 50 Q 8 50 8 28 Q 8 8 50 8 Q 50 8 50 17";

function panelStyles(accent: PhaseAccent) {
  if (accent === "danger") {
    return "border-danger/42 bg-danger/[0.07] shadow-[0_0_40px_-12px_rgba(248,113,113,0.34),inset_0_1px_0_0_rgba(248,113,113,0.14)] hover:border-danger/58";
  }
  if (accent === "electric") {
    return "border-electric/48 bg-electric/[0.09] shadow-[0_0_44px_-12px_rgba(56,189,248,0.38),inset_0_1px_0_0_rgba(56,189,248,0.16)] hover:border-electric/62";
  }
  return "border-white/[0.15] bg-panel/78 shadow-[0_14px_44px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/28";
}

function numStyles(accent: PhaseAccent) {
  if (accent === "danger") return "text-danger";
  if (accent === "electric") return "text-electric";
  return "text-muted-dim";
}

function PhaseCard({
  phase,
  compact = false,
}: {
  phase: EnginePhase;
  compact?: boolean;
}) {
  return (
    <motion.article
      className={`border backdrop-blur-[3px] transition-[border-color,box-shadow,transform] duration-300 ${panelStyles(phase.accent)} ${
        compact ? "px-5 py-5" : "px-4 py-4 sm:px-5 sm:py-5"
      }`}
      whileHover={compact ? undefined : { y: -3 }}
    >
      <p
        className={`display font-semibold leading-none tabular-nums tracking-[-0.05em] ${numStyles(phase.accent)} ${
          compact ? "text-[2.1rem]" : "text-[1.75rem] sm:text-[2.15rem]"
        }`}
      >
        {phase.num}
      </p>
      <h3
        className={`display mt-2 font-semibold uppercase tracking-[-0.02em] text-ink ${
          compact ? "text-[0.98rem]" : "text-[0.82rem] sm:text-[0.94rem]"
        }`}
      >
        {phase.title}
      </h3>
      <p
        className={`mt-2.5 font-medium leading-snug tracking-[-0.015em] text-muted ${
          compact ? "text-[0.9rem]" : "text-[0.8rem] sm:text-[0.88rem]"
        }`}
      >
        {phase.detail}
      </p>
    </motion.article>
  );
}

function EngineConnectors({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <marker
          id="engine-arrow"
          markerWidth="4"
          markerHeight="4"
          refX="3.2"
          refY="2"
          orient="auto"
        >
          <path d="M0,0 L4,2 L0,4 Z" fill="rgba(56,189,248,0.8)" />
        </marker>
        <radialGradient id="engine-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.2)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
        <linearGradient id="engine-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(56,189,248,0)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.6)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>

      <circle cx={50} cy={50} r={26} fill="url(#engine-core-glow)" />

      {/* Outer loop ring */}
      <ellipse
        cx={50}
        cy={50}
        rx={46}
        ry={46}
        fill="none"
        stroke="rgba(56,189,248,0.08)"
        strokeWidth="0.35"
      />

      {[...PHASE_CONNECTORS, LOOP_ARC].map((d, i) => (
        <g key={`path-${i}`}>
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(56,189,248,0.12)"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0.25 } : false}
            whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke={
              i === 3
                ? "rgba(56,189,248,0.48)"
                : "rgba(56,189,248,0.36)"
            }
            strokeWidth={i === 3 ? "0.38" : "0.3"}
            strokeLinecap="round"
            strokeDasharray={i === 3 ? "1.2 0.8" : undefined}
            markerEnd="url(#engine-arrow)"
            initial={animate ? { pathLength: 0, opacity: 0.35 } : false}
            whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.1 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {animate ? (
            <motion.path
              d={d}
              fill="none"
              stroke="url(#engine-flow)"
              strokeWidth="0.42"
              strokeLinecap="round"
              strokeDasharray="1.5 5"
              animate={{
                strokeDashoffset: [0, -6.5],
                opacity: [0.3, 0.55, 0.3],
              }}
              transition={{
                strokeDashoffset: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                },
                opacity: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                },
              }}
            />
          ) : null}
        </g>
      ))}

      {/* Loop statement integrated on outer arc */}
      <path
        id="loop-text-path"
        d="M 14 48 Q 6 48 6 30 Q 6 12 50 12"
        fill="none"
      />
      <text
        fill="rgba(56,189,248,0.72)"
        fontSize="2.05"
        fontWeight="600"
        letterSpacing="0.04"
      >
        <textPath href="#loop-text-path" startOffset="8%">
          {LOOP}
        </textPath>
      </text>
    </svg>
  );
}

function DexlaCore({ animate, compact = false }: { animate: boolean; compact?: boolean }) {
  return (
    <motion.div
      className={
        compact
          ? "relative mx-auto w-full max-w-xs"
          : "absolute left-1/2 top-1/2 z-30 w-[46%] max-w-[14rem] -translate-x-1/2 -translate-y-1/2 lg:max-w-[15.5rem]"
      }
      initial={animate ? { opacity: 0, scale: 0.9 } : false}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      animate={
        animate
          ? {
              boxShadow: [
                "0 0 56px -10px rgba(56,189,248,0.28)",
                "0 0 72px -6px rgba(56,189,248,0.45)",
                "0 0 56px -10px rgba(56,189,248,0.28)",
              ],
            }
          : undefined
      }
      transition={
        animate ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : undefined
      }
    >
      <div
        className={`relative border border-electric/55 bg-void/96 text-center shadow-[inset_0_1px_0_0_rgba(56,189,248,0.22),0_0_60px_-16px_rgba(56,189,248,0.35)] ${
          compact ? "px-6 py-7" : "px-6 py-8 sm:px-7 sm:py-9"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 38%, rgba(56,189,248,0.16), transparent 68%)",
          }}
          aria-hidden
        />
        <p
          className={`display relative font-semibold tracking-[-0.04em] text-electric ${
            compact ? "text-[1.75rem]" : "text-[1.55rem] sm:text-[1.9rem] lg:text-[2.05rem]"
          }`}
        >
          $DEXLA
        </p>
        <p
          className={`relative mt-2.5 font-medium italic tracking-[-0.01em] text-muted ${
            compact ? "text-[0.95rem]" : "text-[0.88rem] sm:text-[1rem]"
          }`}
        >
          Economic Engine
        </p>
      </div>
    </motion.div>
  );
}

function DesktopEngine({ animate }: { animate: boolean }) {
  const panelWidth =
    "w-[43%] max-w-[14rem] sm:max-w-[15rem] lg:max-w-[16rem]";

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[38rem] md:block lg:max-w-[44rem] xl:max-w-[46rem]">
      <EngineConnectors animate={animate} />
      <DexlaCore animate={animate} />

      {phases.map((phase, index) => {
        const anchor = DESKTOP_ANCHORS[index];
        return (
          <motion.div
            key={phase.id}
            className={`absolute z-20 ${panelWidth} -translate-x-1/2 -translate-y-1/2`}
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
            initial={animate ? { opacity: 0, scale: 0.93 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1 + index * 0.08,
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

function MobileEngineFlow({ animate }: { animate: boolean }) {
  return (
    <div className="relative md:hidden">
      <DexlaCore animate={animate} compact />

      <div
        className="absolute bottom-12 left-1/2 top-[7.5rem] w-px -translate-x-1/2 bg-gradient-to-b from-electric/12 via-electric/32 to-electric/12"
        aria-hidden
      />

      <ol className="relative mt-8 space-y-3">
        {phases.map((phase, index) => (
          <li key={phase.id}>
            <div className="mx-auto max-w-md">
              <PhaseCard phase={phase} compact />
            </div>
            {index < phases.length - 1 ? (
              <p
                className="my-2.5 text-center text-[0.9rem] font-semibold text-electric/55"
                aria-hidden
              >
                ↓
              </p>
            ) : null}
          </li>
        ))}

        <li className="pt-1">
          <p
            className="text-center text-[0.9rem] font-semibold text-electric/55"
            aria-hidden
          >
            ↓
          </p>
          <div className="mx-auto mt-4 max-w-md border border-electric/38 bg-electric/[0.08] px-5 py-4 text-center shadow-[inset_0_1px_0_0_rgba(56,189,248,0.12)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-electric/90">
              Loop
            </p>
            <p className="mt-2 text-[0.88rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
              {LOOP}
            </p>
          </div>
          <p
            className="my-2.5 text-center text-[0.9rem] font-semibold text-electric/55"
            aria-hidden
          >
            ↓
          </p>
          <div className="mx-auto max-w-md border border-white/20 bg-panel/60 px-5 py-3.5 text-center">
            <p className="text-[0.88rem] font-semibold uppercase tracking-[0.06em] text-electric">
              ↺ CREATE
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}

export function TokenFlywheelSection() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  return (
    <section className={`${tkSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 62% 52% at 50% 44%, rgba(56,189,248,0.1), transparent 74%)",
        }}
        aria-hidden
      />

      <div className="section-pad container-max relative mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA <span className="gradient-text">Economic Engine</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div
            className={`mx-auto max-w-5xl ${tkSurface} px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-14`}
          >
            <DesktopEngine animate={animate} />
            <MobileEngineFlow animate={animate} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
