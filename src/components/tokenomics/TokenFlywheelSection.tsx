"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { tkH2, tkSection, tkSurface } from "@/components/tokenomics/tokenomicsRhythm";

type StageCategory =
  | "ACTIVITY"
  | "UTILITY · BURNS"
  | "GROWTH"
  | "REVENUE"
  | "EXPANSION"
  | "BUYBACKS"
  | "SUPPLY REDUCTION";

type FlywheelStage = {
  id: string;
  label: string;
  category: StageCategory;
  emphasis: boolean;
};

const stages: FlywheelStage[] = [
  {
    id: "01",
    label: "Create Portfolio/Index + Strategy",
    category: "ACTIVITY",
    emphasis: false,
  },
  {
    id: "02",
    label: "Publish · Feature · List Strategy → Burn $DEXLA",
    category: "UTILITY · BURNS",
    emphasis: true,
  },
  {
    id: "03",
    label: "Attract Investors → More AUM + Volume",
    category: "GROWTH",
    emphasis: false,
  },
  {
    id: "04",
    label: "Earn Portfolio Fees + Strategy Access Revenue",
    category: "REVENUE",
    emphasis: false,
  },
  {
    id: "05",
    label: "More Creator Activity + More Strategies Listed",
    category: "EXPANSION",
    emphasis: false,
  },
  {
    id: "06",
    label: "Higher $DEXLA Utility + More Direct Burns",
    category: "UTILITY · BURNS",
    emphasis: true,
  },
  {
    id: "07",
    label: "Execution Fee + Treasury Buybacks",
    category: "BUYBACKS",
    emphasis: true,
  },
  {
    id: "08",
    label: "Permanent Supply Reduction",
    category: "SUPPLY REDUCTION",
    emphasis: true,
  },
];

const STAGE_COUNT = stages.length;
const RING_RADIUS = 41;

function polarToPercent(index: number, radius: number) {
  const angle = (index / STAGE_COUNT) * 2 * Math.PI - Math.PI / 2;
  return {
    left: 50 + radius * Math.cos(angle),
    top: 50 + radius * Math.sin(angle),
  };
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number,
) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function nodeSurface(stage: FlywheelStage) {
  if (stage.category === "SUPPLY REDUCTION") {
    return "border-danger/40 bg-danger/[0.08] shadow-[0_0_28px_-10px_rgba(248,113,113,0.35)]";
  }
  if (stage.emphasis) {
    return "border-electric/40 bg-electric/[0.09] shadow-[0_0_32px_-10px_rgba(56,189,248,0.38)]";
  }
  return "border-white/[0.14] bg-panel/80 shadow-[0_10px_36px_rgba(0,0,0,0.28)]";
}

function categoryTone(category: StageCategory) {
  if (category === "SUPPLY REDUCTION") return "text-danger";
  if (category === "UTILITY · BURNS" || category === "BUYBACKS") {
    return "text-electric";
  }
  if (category === "REVENUE") return "text-success";
  return "text-muted-dim";
}

function FlywheelStageCard({
  stage,
  compact = false,
}: {
  stage: FlywheelStage;
  compact?: boolean;
}) {
  return (
    <div
      className={`border backdrop-blur-[2px] transition-[border-color,box-shadow] duration-300 hover:border-electric/50 ${nodeSurface(stage)} ${
        compact ? "px-4 py-3.5" : "px-3 py-3 sm:px-3.5 sm:py-3.5"
      } ${stage.emphasis && !compact ? "sm:px-4 sm:py-4" : ""}`}
    >
      <p
        className={`font-semibold uppercase tracking-[0.14em] ${categoryTone(stage.category)} ${
          compact ? "text-[0.62rem]" : "text-[0.58rem] sm:text-[0.62rem]"
        }`}
      >
        {stage.category}
      </p>
      <p
        className={`mt-1.5 font-semibold leading-snug tracking-[-0.015em] text-ink ${
          compact
            ? "text-[0.88rem] sm:text-[0.95rem]"
            : stage.emphasis
              ? "text-[0.72rem] sm:text-[0.82rem]"
              : "text-[0.68rem] sm:text-[0.76rem]"
        }`}
      >
        {stage.label}
      </p>
    </div>
  );
}

function FlywheelRingSvg({ animate }: { animate: boolean }) {
  const cx = 50;
  const cy = 50;
  const segments = Array.from({ length: STAGE_COUNT }, (_, i) => {
    const startAngle = (i / STAGE_COUNT) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((i + 1) / STAGE_COUNT) * 2 * Math.PI - Math.PI / 2;
    const start = polarToCartesian(cx, cy, RING_RADIUS, startAngle);
    const end = polarToCartesian(cx, cy, RING_RADIUS, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${start.x} ${start.y} A ${RING_RADIUS} ${RING_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
    >
      <defs>
        <marker
          id="flywheel-segment-arrow"
          markerWidth="3.5"
          markerHeight="3.5"
          refX="2.8"
          refY="1.75"
          orient="auto"
        >
          <path d="M0,0 L3.5,1.75 L0,3.5 Z" fill="rgba(56,189,248,0.7)" />
        </marker>
        <radialGradient id="flywheel-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.14)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r="28" fill="url(#flywheel-core-glow)" />

      {segments.map((d, i) => (
        <motion.path
          key={`segment-${i}`}
          d={d}
          fill="none"
          stroke="rgba(56,189,248,0.28)"
          strokeWidth="0.28"
          strokeLinecap="round"
          markerEnd="url(#flywheel-segment-arrow)"
          initial={animate ? { pathLength: 0, opacity: 0.35 } : false}
          whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {(() => {
        const lastAngle =
          ((STAGE_COUNT - 1) / STAGE_COUNT) * 2 * Math.PI - Math.PI / 2;
        const firstAngle = -Math.PI / 2;
        const loopStart = polarToCartesian(cx, cy, RING_RADIUS + 4, lastAngle);
        const loopEnd = polarToCartesian(cx, cy, RING_RADIUS + 4, firstAngle);
        return (
          <motion.path
            d={`M ${loopStart.x} ${loopStart.y} A ${RING_RADIUS + 4} ${RING_RADIUS + 4} 0 1 1 ${loopEnd.x} ${loopEnd.y}`}
            fill="none"
            stroke="rgba(56,189,248,0.42)"
            strokeWidth="0.32"
            strokeDasharray="1.8 1.2"
            markerEnd="url(#flywheel-segment-arrow)"
            initial={animate ? { opacity: 0.2 } : false}
            whileInView={animate ? { opacity: 0.85 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
          />
        );
      })()}
    </svg>
  );
}

function DesktopFlywheel({ animate }: { animate: boolean }) {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] md:block lg:max-w-[40rem]">
      <FlywheelRingSvg animate={animate} />

      <motion.div
        className="absolute left-1/2 top-1/2 z-20 w-[34%] max-w-[10.5rem] -translate-x-1/2 -translate-y-1/2"
        initial={animate ? { opacity: 0, scale: 0.94 } : false}
        whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
        viewport={{ once: true }}
        animate={
          animate
            ? {
                boxShadow: [
                  "0 0 40px -8px rgba(56,189,248,0.25)",
                  "0 0 52px -6px rgba(56,189,248,0.42)",
                  "0 0 40px -8px rgba(56,189,248,0.25)",
                ],
              }
            : undefined
        }
        transition={
          animate
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <div className="border border-electric/45 bg-void/95 px-4 py-5 text-center sm:px-5 sm:py-6">
          <p className="display text-[1.15rem] font-semibold tracking-[-0.04em] text-electric sm:text-[1.45rem]">
            $DEXLA
          </p>
          <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-dim sm:text-[0.65rem]">
            INDEXLA Economic Engine
          </p>
        </div>
      </motion.div>

      {stages.map((stage, index) => {
        const { left, top } = polarToPercent(index, RING_RADIUS);
        const widthClass = stage.emphasis
          ? "w-[34%] max-w-[10.5rem] sm:max-w-[11.5rem]"
          : "w-[30%] max-w-[9rem] sm:max-w-[10rem]";

        return (
          <motion.div
            key={stage.id}
            className={`absolute z-10 ${widthClass}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={animate ? { opacity: 0, scale: 0.92 } : false}
            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FlywheelStageCard stage={stage} />
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
        className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-electric/10 via-electric/35 to-electric/10"
        aria-hidden
      />

      <ol className="relative space-y-4">
        {stages.map((stage, index) => (
          <li key={stage.id} className="relative">
            <div className="mx-auto max-w-md">
              <FlywheelStageCard stage={stage} compact />
            </div>
            {index < stages.length - 1 ? (
              <p
                className="my-2 text-center text-[0.85rem] font-semibold text-electric/55"
                aria-hidden
              >
                ↓
              </p>
            ) : (
              <div className="mt-4 text-center">
                <p
                  className="text-[0.85rem] font-semibold text-electric/55"
                  aria-hidden
                >
                  ↓
                </p>
                <div className="mx-auto mt-4 max-w-md border border-electric/35 bg-electric/[0.07] px-4 py-3.5 text-center">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-electric">
                    Continuous Loop
                  </p>
                  <p className="mt-1.5 text-[0.88rem] font-semibold leading-snug text-ink">
                    Permanent Supply Reduction ↺ Create Portfolio/Index +
                    Strategy
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
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(56,189,248,0.08), transparent 70%)",
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
            className={`mx-auto max-w-5xl ${tkSurface} px-4 py-8 sm:px-8 sm:py-10 lg:py-12`}
          >
            <DesktopFlywheel animate={animate} />
            <MobileFlywheelFlow />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
