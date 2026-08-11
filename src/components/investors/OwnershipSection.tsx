"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invBodyStrong,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const flowSteps = [
  {
    label: "User Wallet",
    sub: "Your assets stay here",
    accent: "border-line bg-void/50",
  },
  {
    label: "User Defined Permissions",
    sub: "Rules you approve",
    accent: "border-electric/35 bg-electric/10",
  },
  {
    label: "INDEXLA Execution",
    sub: "Monitors & coordinates",
    accent: "border-purple/35 bg-purple/10",
  },
  {
    label: "Authorized Transaction",
    sub: "Within your limits",
    accent: "border-success/35 bg-success/10",
  },
];

const choices = [
  "You choose the assets.",
  "You choose the allocations.",
  "You choose the rules.",
  "You choose the permissions.",
];

export function OwnershipSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={invH2}>
            Own The Assets.{" "}
            <span className="gradient-text">Keep Control.</span>
          </h2>
          <div className="mt-5 space-y-3">
            <p className={invBody}>
              INDEXLA does not take custody of your assets. Your assets remain
              in your wallet. Your strategy operates within the permissions you
              approve.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-3">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <motion.div
                  className={`w-full rounded-[1.15rem] border px-5 py-4 text-center ${step.accent}`}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="display text-[1.05rem] tracking-[-0.02em] text-ink sm:text-[1.15rem]">
                    {step.label}
                  </p>
                  <p className="mt-1 text-[0.78rem] text-muted">{step.sub}</p>
                </motion.div>
                {i < flowSteps.length - 1 && (
                  <span className="py-1.5 text-electric/60" aria-hidden>
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <ul className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
            {choices.map((line) => (
              <li
                key={line}
                className="rounded-xl border border-line bg-deep/40 px-4 py-3 text-[0.95rem] font-semibold text-ink"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className={`mx-auto mt-6 max-w-2xl text-center ${invBodyStrong}`}>
            INDEXLA provides the infrastructure to coordinate execution according
            to those rules.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
