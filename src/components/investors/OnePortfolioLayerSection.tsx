"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";

const fragments = ["Wallets", "DEXs", "Exchanges", "Bridges", "Networks"];

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
            Stop jumping between wallets, exchanges, DEXs, bridges, and networks
            just to manage one portfolio.
          </p>
          <p className={`mt-3 ${invBody}`}>
            INDEXLA brings everything into one portfolio experience.
          </p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 sm:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {fragments.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-xl border border-line bg-void/50 px-4 py-2.5 text-[0.9rem] font-semibold text-muted"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <span className="text-electric/60" aria-hidden>
              ↓
            </span>

            <div className="rounded-[1.25rem] border border-electric/40 bg-electric/10 px-10 py-5 text-center">
              <p className="display text-[clamp(1.5rem,3vw,2rem)] gradient-text">
                INDEXLA
              </p>
            </div>

            <span className="text-electric/60" aria-hidden>
              ↓
            </span>

            <div className="rounded-[1.25rem] border border-success/35 bg-success/[0.08] px-8 py-4 text-center">
              <p className="display text-[1.2rem] text-ink sm:text-[1.35rem]">
                One portfolio experience
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-xl space-y-2 text-center">
          <p className={invBody}>Build your portfolio.</p>
          <p className={invBody}>Manage your allocations.</p>
          <p className={invBody}>Define your strategy.</p>
          <p className={invBody}>
            Automate execution across supported networks.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
