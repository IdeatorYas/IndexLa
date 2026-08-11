"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import {
  CLIMAX_CYCLE_PHASES,
  MarketCycleVisual,
} from "@/components/investors/MarketCycleVisual";
import {
  invBody,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function MarketCyclesSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} overflow-hidden bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div className="section-pad container-max relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <FadeIn>
            <h2 className={invH2}>
              Markets Move In Cycles.{" "}
              <span className="gradient-text block sm:inline">
                You Don&apos;t Need To Time The Top Or The Bottom.
              </span>
            </h2>

            <div className="mt-6 space-y-4">
              <p className={invBody}>
                Markets move through fear, recovery, greed, and euphoria. Trying
                to buy the exact bottom and sell the exact top is nearly
                impossible.
              </p>
              <p className={invBody}>
                The edge is not predicting every turning point.{" "}
                <span className="font-semibold text-ink">
                  It&apos;s having a strategy that knows what to do as the cycle
                  changes.
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              {[
                "Accumulate through fear.",
                "Hold through recovery.",
                "Take profits through greed.",
                "Increase profit taking as euphoria builds.",
                "Then be ready to accumulate again when the cycle turns.",
              ].map((line) => (
                <li key={line} className={invBody}>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  You don&apos;t need to predict the cycle.
                </p>
              </div>
              <div className={invGreenBox}>
                <p className={invGreenText}>
                  You need to be prepared for it.
                </p>
              </div>
            </div>

            <p className={`mt-6 ${invBody}`}>
              Build your strategy when you&apos;re calm. Let INDEXLA execute your
              rules when the market isn&apos;t.
            </p>

            <motion.div
              className="mt-8"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Button href="/creators" className="min-w-[13.5rem]">
                Build Your Portfolio & Automate Your Strategy in 5 Minutes
              </Button>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.5rem] border border-line/80 bg-deep/60 p-6 sm:p-8">
              <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                INDEXLA Strategy Across The Cycle
              </p>
              <MarketCycleVisual
                phases={CLIMAX_CYCLE_PHASES}
                variant="climax"
                className="mt-4"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
