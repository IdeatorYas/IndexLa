"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const fragments = ["Wallet", "Exchange", "DEX", "Bridge", "Network"];

export function OnePortfolioLayerSection() {
  const reduce = useReducedMotion();

  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Manage Your Portfolio From{" "}
            <span className="gradient-text">One Layer.</span>
          </h2>
          <p className={`mt-5 ${invBody}`}>
            Managing investments across wallets, exchanges, DEXs, bridges, and
            networks can make even a simple strategy difficult to execute
            consistently.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
            {/* Fragmentation */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:max-w-[240px]">
              {fragments.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-xl border border-line/80 bg-void/50 px-4 py-2.5 text-[0.85rem] font-semibold text-muted"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 text-electric/70 lg:px-2">
              <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-dim lg:block">
                Consolidate
              </span>
              <motion.span
                className="text-2xl"
                animate={reduce ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden
              >
                →
              </motion.span>
            </div>

            {/* INDEXLA hub */}
            <motion.div
              className="rounded-[1.35rem] border border-electric/40 bg-gradient-to-br from-electric/15 via-purple/10 to-transparent px-8 py-6 text-center"
              initial={reduce ? false : { scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="display text-[clamp(1.5rem,3vw,2rem)] gradient-text">
                INDEXLA
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                One portfolio layer
              </p>
            </motion.div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 text-electric/70 lg:px-2">
              <motion.span
                className="text-2xl"
                animate={reduce ? undefined : { x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                aria-hidden
              >
                →
              </motion.span>
            </div>

            {/* Outcome */}
            <motion.div
              className="rounded-[1.35rem] border border-success/35 bg-success/[0.08] px-8 py-6 text-center"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="display text-[clamp(1.25rem,2.5vw,1.65rem)] text-ink">
                One Portfolio
              </p>
              <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-success">
                Build · Define · Execute
              </p>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 mx-auto max-w-2xl text-center">
          <div className="space-y-2">
            <p className={invBody}>Build one portfolio.</p>
            <p className={invBody}>Define your strategy.</p>
            <p className={invBody}>Manage your allocations.</p>
            <p className={invBody}>
              Coordinate execution across supported networks.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
