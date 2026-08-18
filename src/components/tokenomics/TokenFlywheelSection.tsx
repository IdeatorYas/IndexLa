"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { tkH2, tkSection, tkSurface } from "@/components/tokenomics/tokenomicsRhythm";

type FlywheelPhase = {
  id: string;
  num: string;
  title: string;
  lines: readonly string[];
  emphasis?: string;
  highlight: boolean;
};

const phases: FlywheelPhase[] = [
  {
    id: "create",
    num: "01",
    title: "CREATE",
    lines: ["Portfolio / Index + Strategy"],
    highlight: false,
  },
  {
    id: "use",
    num: "02",
    title: "USE $DEXLA",
    lines: ["Publish · Feature · List Strategy"],
    emphasis: "Direct burns happen here",
    highlight: true,
  },
  {
    id: "activity",
    num: "03",
    title: "ACTIVITY + REVENUE",
    lines: [
      "Investors → AUM + Volume",
      "Portfolio Fees + Strategy Access Revenue",
    ],
    highlight: false,
  },
  {
    id: "supply",
    num: "04",
    title: "SUPPLY REDUCTION",
    lines: ["Direct Burns + Buybacks", "→ Permanent Supply Reduction"],
    highlight: true,
  },
];

/** Clockwise anchor positions: top → right → bottom → left */
const DESKTOP_ANCHORS = [
  { x: 50, y: 11 },
  { x: 89, y: 50 },
  { x: 50, y: 89 },
  { x: 11, y: 50 },
] as const;

const CONNECTOR_PATHS = [
  "M 50 18 Q 72 18 82 50",
  "M 82 50 Q 72 82 50 82",
  "M 50 82 Q 28 82 18 50",
  "M 18 50 Q 28 18 50 18",
] as const;

function phasePanelClass(highlight: boolean, supply = false) {
  if (supply) {
    return "border-danger/40 bg-danger/[0.07] shadow-[0_0_36px_-12px_rgba(248,113,113,0.32),inset_0_1px_0_0_rgba(248,113,113,0.12)] hover:border-danger/55 hover:shadow-[0_0_44px_-10px_rgba(248,113,113,0.38)]";
  }
  if (highlight) {
    return "border-electric/45 bg-electric/[0.08] shadow-[0_0_40px_-12px_rgba(56,189,248,0.35),inset_0_1px_0_0_rgba(56,189,248,0.14)] hover:border-electric/60 hover:shadow-[0_0_48px_-10px_rgba(56,189,248,0.42)]";
  }
  return "border-white/[0.14] bg-panel/75 shadow-[0_12px_40px_rgba(0,0,0,0.28),inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.32)]";
}

function PhasePanel({
  phase,
  compact = false,
}: {
  phase: FlywheelPhase;
  compact?: boolean;
}) {
  const isSupply = phase.id === "supply";
  const numAccent = isSupply
    ? "text-danger"
    : phase.highlight
      ? "text-electric"
      : "text-muted-dim";

  return (
    <motion.div
      className={`border backdrop-blur-[3px] transition-[border-color,box-shadow,transform] duration-300 ${phasePanelClass(phase.highlight, isSupply)} ${
        compact ? "px-5 py-5" : "px-4 py-4 sm:px-5 sm:py-5"
      }`}
      whileHover={compact ? undefined : { y: -2 }}
    >
      <p
        className={`display font-semibold leading-none tabular-nums tracking-[-0.05em] ${numAccent} ${
          compact ? "text-[2rem]" : "text-[1.65rem] sm:text-[2rem]"
        }`}
      >
        {phase.num}
      </p>
      <h3
        className={`display mt-2 font-semibold uppercase tracking-[-0.02em] text-ink ${
          compact
            ? "text-[0.95rem]"
            : phase.highlight
              ? "text-[0.82rem] sm:text-[0.92rem]"
              : "text-[0.78rem] sm:text-[0.88rem]"
        }`}
      >
        {phase.title}
      </h3>
      <div className={`space-y-1 ${compact ? "mt-3" : "mt-3 sm:mt-3.5"}`}>
        {phase.lines.map((line) => (
          <p
            key={line}
            className={`font-medium leading-snug tracking-[-0.015em] text-muted ${
              compact ? "text-[0.88rem]" : "text-[0.78rem] sm:text-[0.86rem]"
            }`}
          >
            {line}
          </p>
        ))}
      </div>
      {phase.emphasis ? (
        <p
          className={`mt-2.5 font-semibold uppercase tracking-[0.12em] text-electric ${
            compact ? "text-[0.62rem]" : "text-[0.58rem] sm:text-[0.62rem]"
          }`}
        >
          {phase.emphasis}
        </p>
      ) : null}
    </motion.div>
  );
}

function FlywheelConnectors({ animate }: { animate: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <marker
          id="flywheel-arrow"
          markerWidth="4"
          markerHeight="4"
          refX="3.2"
          refY="2"
          orient="auto"
        >
          <path d="M0,0 L4,2 L0,4 Z" fill="rgba(56,189,248,0.75)" />
        </marker>
        <radialGradient id="flywheel-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.16)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
        <linearGradient id="flywheel-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(56,189,248,0)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.55)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>

      <circle cx={50} cy={50} r={22} fill="url(#flywheel-hub-glow)" />

      {CONNECTOR_PATHS.map((d, i) => (
        <g key={`connector-${i}`}>
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(56,189,248,0.14)"
            strokeWidth="0.55"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0.3 } : false}
            whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(56,189,248,0.38)"
            strokeWidth="0.32"
            strokeLinecap="round"
            markerEnd="url(#flywheel-arrow)"
            initial={animate ? { pathLength: 0, opacity: 0.4 } : false}
            whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.12 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {animate ? (
            <motion.path
              d={d}
              fill="none"
              stroke="url(#flywheel-flow)"
              strokeWidth="0.45"
              strokeLinecap="round"
              strokeDasharray="2 6"
              initial={{ pathLength: 1, opacity: 0 }}
              animate={{
                strokeDashoffset: [0, -8],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                strokeDashoffset: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4,
                },
                opacity: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                },
              }}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function DesktopFlywheel({ animate }: { animate: boolean }) {
  const panelWidth = "w-[42%] max-w-[13.5rem] sm:max-w-[14.5rem] lg:max-w-[15.5rem]";

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[36rem] md:block lg:max-w-[42rem] xl:max-w-[44rem]">
      <FlywheelConnectors animate={animate} />

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 w-[38%] max-w-[11.5rem] -translate-x-1/2 -translate-y-1/2"
        initial={animate ? { opacity: 0, scale: 0.92 } : false}
        whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true }}
        animate={
          animate
            ? {
                boxShadow: [
                  "0 0 48px -10px rgba(56,189,248,0.22)",
                  "0 0 64px -8px rgba(56,189,248,0.38)",
                  "0 0 48px -10px rgba(56,189,248,0.22)",
                ],
              }
            : undefined
        }
        transition={
          animate
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <div className="relative border border-electric/50 bg-void/95 px-5 py-6 text-center shadow-[inset_0_1px_0_0_rgba(56,189,248,0.18)] sm:px-6 sm:py-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.12), transparent 70%)",
            }}
            aria-hidden
          />
          <p className="display relative text-[1.35rem] font-semibold tracking-[-0.04em] text-electric sm:text-[1.65rem]">
            $DEXLA
          </p>
          <p className="relative mt-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted-dim sm:text-[0.65rem]">
            INDEXLA Economic Engine
          </p>
        </div>
      </motion.div>

      {phases.map((phase, index) => {
        const anchor = DESKTOP_ANCHORS[index];

        return (
          <motion.div
            key={phase.id}
            className={`absolute z-10 ${panelWidth} -translate-x-1/2 -translate-y-1/2`}
            style={{
              left: `${anchor.x}%`,
              top: `${anchor.y}%`,
            }}
            initial={animate ? { opacity: 0, scale: 0.94 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.08 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <PhasePanel phase={phase} />
          </motion.div>
        );
      })}
    </div>
  );
}

function MobileFlywheelFlow() {
  return (
    <div className="relative md:hidden">
      <div
        className="absolute bottom-8 left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-electric/10 via-electric/35 to-electric/10"
        aria-hidden
      />

      <ol className="relative space-y-3">
        {phases.map((phase, index) => (
          <li key={phase.id}>
            <div className="mx-auto max-w-md">
              <PhasePanel phase={phase} compact />
            </div>
            {index < phases.length - 1 ? (
              <p
                className="my-2.5 text-center text-[0.9rem] font-semibold text-electric/55"
                aria-hidden
              >
                ↓
              </p>
            ) : (
              <div className="mt-3 text-center">
                <p
                  className="text-[0.9rem] font-semibold text-electric/55"
                  aria-hidden
                >
                  ↓
                </p>
                <div className="mx-auto mt-4 max-w-md border border-electric/35 bg-electric/[0.07] px-5 py-4 text-center">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    Continuous Loop
                  </p>
                  <p className="mt-2 text-[0.9rem] font-semibold leading-snug text-ink">
                    SUPPLY REDUCTION ↺ CREATE
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
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
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(56,189,248,0.09), transparent 72%)",
        }}
        aria-hidden
      />

      <div className="section-pad container-max relative mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA <span className="gradient-text">Flywheel</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div
            className={`mx-auto max-w-5xl ${tkSurface} px-4 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12`}
          >
            <DesktopFlywheel animate={animate} />
            <MobileFlywheelFlow />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
