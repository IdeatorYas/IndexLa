"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { tkH2, tkSection, tkSurface } from "@/components/tokenomics/tokenomicsRhythm";

const nodes = [
  "Create Portfolio or Index + Strategy",
  "Publish / Feature / List Strategy → Burn $DEXLA",
  "Attract Investors → More AUM & Volume",
  "Earn Portfolio Fees + Strategy Access Revenue",
  "More Creator Activity",
  "More Portfolios + Indexes + Strategies + Volume",
  "Higher $DEXLA Utility + More Burns",
] as const;

const NODE_COUNT = nodes.length;

function nodePosition(index: number, radius: number) {
  const angle = (index / NODE_COUNT) * 2 * Math.PI - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

function FlywheelRing({ animate }: { animate: boolean }) {
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
          <path d="M0,0 L4,2 L0,4 Z" fill="rgba(56,189,248,0.65)" />
        </marker>
      </defs>
      <motion.circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="rgba(56,189,248,0.22)"
        strokeWidth="0.35"
        strokeDasharray="4 2.5"
        markerEnd="url(#flywheel-arrow)"
        initial={animate ? { opacity: 0.35 } : false}
        whileInView={animate ? { opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function FlywheelNode({
  label,
  index,
  radius,
  animate,
}: {
  label: string;
  index: number;
  radius: number;
  animate: boolean;
}) {
  const { x, y } = nodePosition(index, radius);

  return (
    <motion.div
      className="absolute z-10 w-[30%] max-w-[7.25rem] sm:w-[28%] sm:max-w-[8.5rem] lg:max-w-[9.5rem]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={animate ? { opacity: 0, scale: 0.92 } : false}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="border border-electric/25 bg-panel/85 px-2.5 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:px-3 sm:py-3">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-electric sm:text-[0.68rem]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 text-[0.68rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.76rem]">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function TokenFlywheelSection() {
  const reduce = useReducedMotion();
  const animate = !reduce;
  const radius = 39;

  return (
    <section className={`${tkSection} bg-deep`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA <span className="gradient-text">Flywheel</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className={`mx-auto max-w-4xl ${tkSurface} px-3 py-6 sm:px-6 sm:py-8`}>
            <div className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[32rem]">
              <FlywheelRing animate={animate} />

              <div className="absolute left-1/2 top-1/2 z-20 w-[38%] max-w-[9rem] -translate-x-1/2 -translate-y-1/2">
                <div className="border border-electric/35 bg-void/90 px-3 py-4 text-center shadow-[0_0_40px_-8px_rgba(56,189,248,0.35)] sm:px-4 sm:py-5">
                  <p className="display text-[0.95rem] font-semibold tracking-[-0.03em] text-electric sm:text-[1.1rem]">
                    $DEXLA
                  </p>
                  <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted-dim sm:text-[0.65rem]">
                    INDEXLA Economy
                  </p>
                </div>
              </div>

              {nodes.map((label, index) => (
                <FlywheelNode
                  key={label}
                  label={label}
                  index={index}
                  radius={radius}
                  animate={animate}
                />
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-xl text-center text-[0.82rem] font-semibold leading-snug tracking-[-0.01em] text-muted sm:text-[0.92rem]">
              <span className="text-electric">Investors:</span> Hold $DEXLA →
              Lower Fees → Discover → Invest → Tip
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
