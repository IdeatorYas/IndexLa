"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  homeBody,
  homeBodyStrong,
  homeChip,
  homeH2,
} from "@/components/home/homeRhythm";

const flow = [
  "Create Portfolio",
  "Choose Strategy",
  "Confirm",
  "INDEXLA Executes",
  "Monitor",
] as const;

export function HowItWorksPageHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-10 md:pb-12 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-[0.92rem] font-semibold text-electric transition-colors hover:text-ink"
            >
              ← Back to INDEXLA
            </Link>
          </div>

          <div className="mx-auto mb-7 h-px w-14 bg-gradient-to-r from-electric/80 to-transparent" />

          <h1 className={`${homeH2} uppercase`}>
            How It{" "}
            <span className="gradient-text">Works</span>
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl ${homeBodyStrong}`}>
            See how INDEXLA takes you from portfolio setup to automated execution
            — with your assets staying in your wallet.
          </p>

          <div className="mx-auto mt-8 max-w-4xl rounded-[1.35rem] border border-electric/25 bg-gradient-to-b from-electric/[0.08] to-transparent px-4 py-6 sm:px-8 sm:py-7">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Product Flow
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {flow.map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <span className={homeChip}>{item}</span>
                  {i < flow.length - 1 ? (
                    <span className="text-electric/80" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <p className={`mx-auto mt-7 max-w-2xl ${homeBody} text-balance`}>
            Walk through each step below — connect, allocate, automate, and
            activate — using interactive product previews.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
