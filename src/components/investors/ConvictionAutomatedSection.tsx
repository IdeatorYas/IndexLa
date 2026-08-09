"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

const pipeline = [
  {
    title: "AI monitors the market.",
    detail: "Conditions you define",
    accent: "from-purple/40 to-purple/10",
  },
  {
    title: "Your strategy determines the action.",
    detail: "Investor-controlled rules",
    accent: "from-electric/35 to-electric/10",
  },
  {
    title: "INDEXLA coordinates execution.",
    detail: "Cross-chain when triggered",
    accent: "from-blue/35 to-blue/10",
  },
];

export function ConvictionAutomatedSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] uppercase tracking-[-0.02em] text-balance">
              Your Conviction.{" "}
              <span className="gradient-text">Automated.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
              <p>Markets move 24/7.</p>
              <p>Your portfolio shouldn&apos;t depend on you checking your phone.</p>
              <p>
                INDEXLA monitors the conditions you define and coordinates
                execution when your rules are triggered.
              </p>
            </div>
            <p className="mt-8 display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
              While you&apos;re sleeping. While you&apos;re working. While the
              market is moving.
            </p>
            <p className="mt-6 text-[1.05rem] font-medium text-ink/90">
              Your portfolio shouldn&apos;t require constant attention.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[1.75rem] glass p-5 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                Market conditions → Rules → Execution
              </p>
              <ol className="mt-6 space-y-3">
                {pipeline.map((item, i) => (
                  <li key={item.title}>
                    <motion.div
                      initial={reduce ? false : { opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className={`rounded-2xl border border-line bg-gradient-to-r ${item.accent} p-4 sm:p-5`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="display text-[1.25rem] text-electric">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{item.title}</p>
                          <p className="mt-1 text-sm text-muted">{item.detail}</p>
                        </div>
                      </div>
                      {!reduce && i < pipeline.length - 1 && (
                        <div className="ml-3 mt-3 h-4 w-px bg-gradient-to-b from-electric/50 to-transparent" />
                      )}
                    </motion.div>
                  </li>
                ))}
              </ol>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
