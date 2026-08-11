"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  stBody,
  stCta,
  stH2,
  stSection,
  stSurface,
} from "@/components/strategies/strategyRhythm";

const steps = [
  "Choose your assets.",
  "Set your allocations.",
  "Define your conditions.",
  "Let the system monitor them.",
] as const;

export function StrategiesFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className={`${stSection} relative overflow-hidden bg-deep`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-35" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className={`mx-auto max-w-3xl ${stSurface} px-6 py-12 text-center sm:px-10 sm:py-14`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`${stH2} uppercase`}>
            Build Your First{" "}
            <span className="gradient-text">Strategy.</span>
          </h2>

          <div className={`mt-6 space-y-2 ${stBody}`}>
            {steps.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Button
              href="/creators"
              className={`${stCta} min-w-[17rem] !px-10 !py-4 !text-[1.08rem] shadow-[0_20px_56px_rgba(59,130,246,0.48)]`}
            >
              Build Your First Strategy
            </Button>
            <Link
              href="#buy-fear-sell-greed"
              className="text-[0.95rem] font-semibold tracking-[-0.01em] text-electric transition-colors hover:text-ink"
            >
              See It In Action
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
