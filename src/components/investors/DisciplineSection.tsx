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

const emotions = ["Fear", "FOMO", "Greed", "Panic"];
const rules = ["Rules", "Discipline", "Automation"];

export function DisciplineSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
          <FadeIn>
            <h2 className={`${invH2} uppercase`}>
              Discipline Is The{" "}
              <span className="gradient-text">Real Edge.</span>
            </h2>
            <div className="mt-6 space-y-4">
              <p className={invBody}>
                Smart money looks for opportunity when others are fearful.
              </p>
              <p className={invBody}>
                Retail investors often chase what is already moving, buy into
                excitement, and sell when fear takes over.
              </p>
              <p className={invBody}>
                The problem isn&apos;t always the strategy.{" "}
                <span className="font-semibold text-ink">
                  It&apos;s executing it consistently.
                </span>
              </p>
              <p className={invBody}>
                You shouldn&apos;t have to rely on willpower every time the
                market moves. Define the response before the emotion arrives.
              </p>
              <p className={invBody}>
                When fear reaches a predefined level, your strategy can
                accumulate. When greed reaches a predefined level, it can reduce
                exposure. When allocations drift, it can rebalance.
              </p>
              <p className={invBodyStrong}>
                Your strategy doesn&apos;t change because your emotions do.
              </p>
            </div>
            <div className="mt-7">
              <div className={invGreenBox}>
                <p className={invGreenText}>Turn emotion into rules.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.06}>
            <div className="space-y-4">
              <div className="rounded-[1.25rem] border border-danger/25 bg-danger/[0.06] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-danger/80">
                  Emotion
                </p>
                <ul className="mt-4 space-y-2.5">
                  {emotions.map((item, i) => (
                    <motion.li
                      key={item}
                      className="display text-[clamp(1.35rem,2.8vw,1.75rem)] tracking-[-0.03em] text-ink"
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center text-electric/60" aria-hidden>
                ↓
              </div>
              <div className="rounded-[1.25rem] border border-success/30 bg-success/[0.07] p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-success">
                  Discipline
                </p>
                <ul className="mt-4 space-y-2.5">
                  {rules.map((item, i) => (
                    <motion.li
                      key={item}
                      className="display text-[clamp(1.35rem,2.8vw,1.75rem)] tracking-[-0.03em] text-ink"
                      initial={reduce ? false : { opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
