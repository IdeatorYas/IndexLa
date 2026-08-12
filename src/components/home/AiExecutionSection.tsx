"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const steps = [
  "Investor Rules",
  "AI Monitoring",
  "Trigger Detected",
  "Execution Prepared",
  "Cross-Chain Execution",
  "Portfolio Updated",
];

export function AiExecutionSection() {
  return (
    <section className="relative border-t border-line bg-void py-24 md:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] uppercase tracking-[-0.02em] text-balance">
            AI Watches. Your Rules Decide.{" "}
            <span className="gradient-text">INDEXLA Executes.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>You define the strategy.</p>
            <p>
              AI monitors the conditions you specify, such as sentiment, RSI,
              momentum, and allocation drift.
            </p>
            <p>
              INDEXLA coordinates transaction execution across supported chains
              and assets when your defined conditions are met.
            </p>
            <p className="font-medium text-ink/90">
              Your assets stay under your control.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-14">
          <div className="overflow-hidden rounded-3xl glass p-5 text-center sm:p-8">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Execution pipeline · financial infrastructure
            </p>
            <ol className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {steps.map((step, i) => (
                <li key={step}>
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex h-full flex-col items-center justify-center rounded-2xl border border-line bg-void/50 p-4 text-center"
                  >
                    <span className="text-[0.7rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 text-sm font-semibold leading-snug text-ink">
                      {step}
                    </span>
                    <motion.div
                      className="mt-4 h-1 rounded-full bg-gradient-to-r from-purple to-electric"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </motion.div>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
