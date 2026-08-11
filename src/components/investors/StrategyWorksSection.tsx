"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  STRATEGY_CYCLE_PHASES,
  MarketCycleVisual,
} from "@/components/investors/MarketCycleVisual";
import {
  invBody,
  invBodyStrong,
  invCard,
  invEyebrow,
  invGreenBox,
  invGreenText,
  invH2,
  invH3,
  invSection,
} from "@/components/investors/investorRhythm";

const phases = [
  {
    id: "extreme-fear",
    n: "01",
    title: "EXTREME FEAR",
    trigger: "Fear & Greed Index falls below 20.",
    body: [
      "Your strategy begins accumulating.",
      "For example, you could configure INDEXLA to deploy 10% of your allocated capital per DCA action while extreme fear conditions remain.",
      "As long as sentiment stays in the extreme fear zone, the strategy continues accumulating according to your rules.",
    ],
    action: "Fear → DCA IN",
  },
  {
    id: "neutral",
    n: "02",
    title: "NEUTRAL",
    trigger: "Sentiment recovers into the 45–55 range.",
    body: [
      "Your strategy pauses. No buying. No selling.",
      "Your portfolio simply holds while the market establishes its next direction.",
    ],
    action: "Neutral → HOLD",
  },
  {
    id: "greed",
    n: "03",
    title: "GREED",
    trigger: "Sentiment rises above 70.",
    body: [
      "The strategy begins taking profits.",
      "Instead of trying to predict the exact top, INDEXLA can gradually reduce exposure through DCA out according to the percentages you defined.",
    ],
    action: "Greed → DCA OUT",
  },
  {
    id: "extreme-greed",
    n: "04",
    title: "EXTREME GREED",
    trigger: "Sentiment reaches extreme greed.",
    body: [
      "Your strategy increases the pace of profit taking according to your predefined rules.",
      "For example, you could configure larger DCA out percentages in extreme greed than during normal greed conditions.",
    ],
    action: "Extreme Greed → TAKE MORE PROFIT",
  },
];

const cycleSummary = [
  { phase: "Fear", action: "Accumulate" },
  { phase: "Neutral", action: "Hold" },
  { phase: "Greed", action: "Take Profit" },
  { phase: "Extreme Greed", action: "Take More Profit" },
];

export function StrategyWorksSection() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState("extreme-fear");
  const active = phases.find((p) => p.id === activeId) ?? phases[0];

  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={invH2}>
            See How A{" "}
            <span className="gradient-text">Strategy Works.</span>
          </h2>
          <p className="mt-4 text-[1.1rem] font-semibold text-ink sm:text-[1.2rem]">
            Example: Buy Fear. Sell Greed.
          </p>
          <p className={`mt-4 ${invBody}`}>
            Instead of reacting to every market move, define your response to
            the market cycle in advance.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className={invCard}>
            <p className={invEyebrow}>You define</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Your capital allocation.",
                "Your DCA percentage.",
                "Your execution frequency.",
                "Your sentiment thresholds.",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-void/50 px-3 py-2 text-[0.92rem] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className={`mt-4 ${invBodyStrong}`}>
              INDEXLA then follows those rules as market sentiment changes.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <FadeIn delay={0.04}>
            <div className="sticky top-28 rounded-[1.35rem] border border-line bg-deep/60 p-5 sm:p-6">
              <MarketCycleVisual
                phases={STRATEGY_CYCLE_PHASES}
                variant="strategy"
                activePhaseId={activeId}
              />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {phases.map((phase) => (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActiveId(phase.id)}
                    className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors ${
                      activeId === phase.id
                        ? "border-electric bg-electric/15 text-electric"
                        : "border-line bg-void/40 text-muted hover:border-electric/40"
                    }`}
                  >
                    {phase.n}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <motion.article
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-[1.35rem] border border-electric/25 bg-gradient-to-br from-electric/8 via-void/40 to-transparent p-6 sm:p-7"
            >
              <p className="text-[0.7rem] font-semibold text-electric">
                {active.n} — {active.title}
              </p>
              <p className={`mt-4 ${invBodyStrong}`}>{active.trigger}</p>
              <div className="mt-4 space-y-3">
                {active.body.map((line) => (
                  <p key={line} className={invBody}>
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-5 display text-[1.1rem] text-electric">
                {active.action}
              </p>
            </motion.article>
          </FadeIn>
        </div>

        <FadeIn className="mt-12 space-y-6">
          <div>
            <p className={invH3}>Then the cycle repeats.</p>
            <p className={`mt-3 ${invBody}`}>
              Then, when fear returns, accumulation begins again.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {cycleSummary.map((row) => (
              <div
                key={row.phase}
                className="rounded-xl border border-line bg-void/40 px-4 py-3 text-center"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted-dim">
                  {row.phase}
                </p>
                <p className="mt-1 text-[0.92rem] font-semibold text-electric">
                  → {row.action}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                You don&apos;t need to predict the top or bottom.
              </p>
            </div>
            <div className={invGreenBox}>
              <p className={invGreenText}>
                You need to be prepared for the cycle.
              </p>
            </div>
          </div>

          <p className={invBody}>
            INDEXLA monitors the conditions and coordinates execution according
            to the rules and permissions you approved.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
