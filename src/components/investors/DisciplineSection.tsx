"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invGreenBox,
  invGreenText,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const emotions = ["FOMO", "Greed", "Fear", "Panic"];
const rules = ["Defined", "Consistent", "Disciplined", "Automated"];

export function DisciplineSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={invH2}>
            Discipline Is The{" "}
            <span className="gradient-text">Real Edge.</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <FadeIn>
            <div className="rounded-[1.35rem] border border-danger/25 bg-danger/[0.06] p-6 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-danger/80">
                Emotion
              </p>
              <ul className="mt-5 space-y-3">
                {emotions.map((item, i) => (
                  <motion.li
                    key={item}
                    className="display text-[clamp(1.25rem,2.5vw,1.65rem)] tracking-[-0.02em] text-ink/85"
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="flex flex-col items-center gap-3 px-2">
            <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                Transform
              </span>
              <div className="flex flex-col items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-2 w-2 rounded-full bg-electric/60"
                    animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-full border border-electric/40 bg-electric/10 px-5 py-2.5 text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-electric">
                Emotion → Rules → Execution
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.04}>
            <div className="rounded-[1.35rem] border border-success/30 bg-success/[0.06] p-6 sm:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-success">
                Rules
              </p>
              <ul className="mt-5 space-y-3">
                {rules.map((item, i) => (
                  <motion.li
                    key={item}
                    className="display text-[clamp(1.25rem,2.5vw,1.65rem)] tracking-[-0.02em] text-ink"
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10 max-w-3xl space-y-4">
          <p className={invBody}>
            Smart money looks for opportunity when others are fearful. Retail
            investors often chase what is already moving, buy into excitement, and
            sell when fear takes over.
          </p>
          <p className={invBody}>
            The problem isn&apos;t always the strategy.{" "}
            <span className="font-semibold text-ink">
              It&apos;s executing it consistently.
            </span>
          </p>
          <p className={invBody}>
            You shouldn&apos;t have to rely on willpower every time the market
            moves. Define the response <span className="font-semibold text-ink">before</span> the
            emotion arrives.
          </p>
          <div className="space-y-2 pl-0 sm:pl-1">
            <p className={invBody}>
              When fear reaches a predefined level, your strategy can accumulate.
            </p>
            <p className={invBody}>
              When greed reaches a predefined level, it can reduce exposure.
            </p>
            <p className={invBody}>
              When allocations drift, it can rebalance.
            </p>
          </div>
          <p className={invBodyStrong}>
            Your strategy doesn&apos;t change because your emotions do.
          </p>
          <div className="pt-2">
            <div className={invGreenBox}>
              <p className={invGreenText}>Turn emotion into rules.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
