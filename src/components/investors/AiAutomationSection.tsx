"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const steps = [
  {
    title: "You Define The Rules",
    body: "Assets, thresholds, actions, and limits — your thesis, encoded.",
  },
  {
    title: "AI Monitors Conditions",
    body: "INDEXLA watches the signals you selected, continuously.",
  },
  {
    title: "Permissions Constrain Execution",
    body: "Nothing runs outside the permissions you approved.",
  },
  {
    title: "INDEXLA Coordinates Execution",
    body: "Authorized transactions only — according to your rules.",
  },
];

export function AiAutomationSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={`${invH2} uppercase`}>
            AI-Powered Automation Built Around{" "}
            <span className="gradient-text">Your Thesis.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            INDEXLA&apos;s AI-assisted automation monitors the conditions you
            define and coordinates authorized execution.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto max-w-2xl">
            {steps.map((step, i) => (
              <div key={step.title}>
                <motion.div
                  className="rounded-[1.15rem] border border-line bg-deep/55 px-5 py-5 sm:px-6"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className="flex items-start gap-4">
                    <span className="display shrink-0 text-[1.4rem] gradient-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="display text-[1.15rem] tracking-[-0.02em] text-ink sm:text-[1.25rem]">
                        {step.title}
                      </p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted sm:text-[1.05rem]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-2.5 text-electric/55" aria-hidden>
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-2xl space-y-3 text-center">
          <p className={invBodyStrong}>
            AI monitors the market. Your rules control the strategy.
          </p>
          <p className={invBody}>
            Your thesis becomes a programmable strategy.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
