"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { InstitutionalCycleSheet } from "@/components/investors/InstitutionalCycleSheet";
import {
  invBody,
  invBodyStrong,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

export function MarketCyclesSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} overflow-hidden bg-void`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-40" aria-hidden />
      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Markets Move In Cycles.{" "}
            <span className="gradient-text">
              You Don&apos;t Need To Time The Top Or The Bottom.
            </span>
          </h2>
        </FadeIn>

        <FadeIn className="mx-auto mt-6 max-w-3xl space-y-4 text-center">
          <p className={invBody}>
            Markets move through fear, recovery, greed, and euphoria.
          </p>
          <p className={invBody}>
            Trying to buy the exact bottom and sell the exact top is nearly
            impossible.
          </p>
          <p className={invBody}>
            The edge is not predicting every turning point.
          </p>
          <p className={invBodyStrong}>
            It&apos;s having a strategy that knows what to do as the cycle
            changes.
          </p>
        </FadeIn>

        <FadeIn className="mx-auto mt-6 max-w-xl space-y-2 text-center">
          <p className={invBody}>Accumulate through fear.</p>
          <p className={invBody}>Hold through recovery.</p>
          <p className={invBody}>Take profits through greed.</p>
          <p className={invBody}>
            Increase profit taking as euphoria builds.
          </p>
          <p className={invBody}>
            Then be ready to accumulate again when the cycle turns.
          </p>
        </FadeIn>

        {/* Signature visual — used only here */}
        <FadeIn className="mt-10" delay={0.06}>
          <InstitutionalCycleSheet />
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                You don&apos;t need to predict the cycle.
              </p>
            </div>
            <div className={invGreenBox}>
              <p className={invGreenText}>You need to be prepared for it.</p>
            </div>
          </div>

          <p className={invBody}>
            Build your strategy when you&apos;re calm.
          </p>
          <p className={invBody}>
            Let INDEXLA execute your rules when the market isn&apos;t.
          </p>

          <motion.div
            className="pt-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button href="/creators" className="min-w-[13.5rem]">
              Build Your Portfolio & Automate Your Strategy in 5 Minutes
            </Button>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
