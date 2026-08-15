"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  homeBody,
  homeBodyStrong,
  homeChip,
  homeH2,
} from "@/components/home/homeRhythm";
import { PRODUCT_FLOW_LABELS } from "@/components/how-it-works/simulator/types";

export function HowItWorksPageHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 flex min-h-[100svh] flex-col justify-center pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5">
            <Link
              href="/"
              className="inline-flex items-center text-[0.9rem] font-semibold text-electric transition-colors hover:text-ink"
            >
              ← Back to INDEXLA
            </Link>
          </div>

          <h1 className={`${homeH2} uppercase`}>
            How It{" "}
            <span className="gradient-text">Works</span>
          </h1>

          <p className={`mx-auto mt-5 max-w-2xl ${homeBodyStrong}`}>
            Build your portfolio, define your strategy, keep custody, and see
            how INDEXLA coordinates execution when your rules are met.
          </p>

          <div className="mx-auto mt-7 max-w-4xl rounded-[1.25rem] border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-4 py-5 sm:px-8 sm:py-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Product Flow
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2.5 sm:gap-x-2 sm:gap-y-3">
              {PRODUCT_FLOW_LABELS.map((item, i) => (
                <div key={item} className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`${homeChip} !px-2.5 !py-1.5 !text-[0.68rem] sm:!px-3 sm:!text-[0.72rem]`}>
                    {item}
                  </span>
                  {i < PRODUCT_FLOW_LABELS.length - 1 ? (
                    <span className="text-electric/80" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <p className={`mx-auto mt-7 max-w-2xl ${homeBody} text-balance`}>
            Walk through the simulator below — from create to marketplace. No
            wallet. No real transactions.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[0.92rem] text-muted">
            Turn your thesis into a portfolio your audience can allocate capital
            to — and earn from it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
