"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkH2,
  tkSection,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

const creators = [
  "Publish portfolios",
  "Burn $DEXLA",
  "Promote portfolios",
  "Burn more $DEXLA",
] as const;

const investors = [
  "Hold $DEXLA",
  "Reduce execution fees",
  "Follow portfolios",
  "Tip creators",
] as const;

const platformDrivers = [
  "More portfolios",
  "More execution",
  "Treasury profits",
] as const;

function FlowSteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-5 space-y-0">
      {steps.map((step, i) => (
        <li key={step}>
          <div className="rounded-xl border border-white/[0.08] bg-void/45 px-3.5 py-3 text-center">
            <p className="text-[0.95rem] font-semibold text-ink">{step}</p>
          </div>
          {i < steps.length - 1 && (
            <div
              className="flex justify-center py-1.5 text-electric/50"
              aria-hidden
            >
              ↓
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export function TokenFlywheelSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA{" "}
            <span className="gradient-text">Flywheel</span>
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <FadeIn>
            <article className={`h-full ${tkSurface} p-5 sm:p-6`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Creators
              </p>
              <FlowSteps steps={creators} />
            </article>
          </FadeIn>

          <FadeIn delay={0.04}>
            <article className={`h-full ${tkSurface} p-5 sm:p-6`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Investors
              </p>
              <FlowSteps steps={investors} />
            </article>
          </FadeIn>

          <FadeIn delay={0.08}>
            <article className={`h-full ${tkSurface} p-5 sm:p-6`}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-electric">
                Platform
              </p>
              <div className="mt-5 space-y-2">
                {platformDrivers.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/[0.08] bg-void/45 px-3.5 py-3 text-center"
                  >
                    <p className="text-[0.95rem] font-semibold text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <motion.div
                className="my-3 flex justify-center text-electric/50"
                aria-hidden
                initial={reduce ? false : { opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                ↓
              </motion.div>

              <div className="rounded-xl border border-electric/35 bg-electric/[0.1] px-3.5 py-3 text-center">
                <p className="text-[0.95rem] font-semibold text-ink">Buybacks</p>
              </div>

              <motion.div
                className="my-3 flex justify-center text-danger/55"
                aria-hidden
                initial={reduce ? false : { opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                ↓
              </motion.div>

              <div className="rounded-xl border border-danger/35 bg-danger/[0.1] px-3.5 py-3 text-center">
                <p className="text-[0.95rem] font-semibold text-danger">
                  Permanent burns
                </p>
              </div>
            </article>
          </FadeIn>
        </div>

        <FadeIn className="mt-7">
          <p className="mx-auto max-w-2xl text-center text-[0.95rem] font-semibold leading-relaxed text-ink sm:text-[1.05rem]">
            Creators → Investors → Platform → Buybacks →{" "}
            <span className="text-danger">Permanent burns</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
