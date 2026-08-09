"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

/** Track-record-only visual — not the hero portfolio card */
export function CreatorTrackRecordSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-line bg-void py-14 md:py-18">
      <div className="section-pad container-max">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <FadeIn>
            <h2 className="display text-[clamp(2rem,4.5vw,3.15rem)] uppercase tracking-[-0.02em] text-balance">
              Your Track Record Is{" "}
              <span className="gradient-text">Public.</span>
            </h2>
            <div className="mt-5 space-y-3 text-[1.05rem] leading-relaxed text-muted">
              <p>
                Your best call shouldn&apos;t disappear into a Telegram scroll.
              </p>
              <p>
                Your portfolio gives your thesis a public track record investors
                can evaluate.
              </p>
            </div>
            <p className="mt-4 text-[0.95rem] font-semibold text-ink">
              Allocations · Strategy · PnL · Performance · Activity · AUM
            </p>
            <div className="mt-5 space-y-1.5 text-[1.02rem] leading-relaxed text-muted">
              <p>Your PnL is public.</p>
              <p>Your wins are public.</p>
              <p>Your mistakes are public.</p>
              <p className="pt-1 font-medium text-ink/90">That&apos;s the point.</p>
            </div>
            <p className="mt-6 display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">
              Build something you can stand behind.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-dim">
              Investors allocate at their own risk. INDEXLA provides the
              portfolio infrastructure and relevant platform disclosures.
            </p>
          </FadeIn>

          <FadeIn delay={0.06}>
            <motion.div
              className="rounded-[1.35rem] border border-line bg-void/50 p-5 sm:p-6"
              initial={reduce ? false : { opacity: 0.85 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
                  Public record · illustrative
                </p>
                <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[0.65rem] font-semibold text-success">
                  On-chain visible
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {[
                  { label: "PnL", value: "+$964K", up: true },
                  { label: "Performance", value: "+21.6%", up: true },
                  { label: "AUM", value: "$6.4M", up: false },
                  { label: "Activity", value: "14d streak", up: false },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-line bg-deep/80 px-3 py-3"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.12em] text-muted-dim">
                      {m.label}
                    </p>
                    <p
                      className={`mt-1 display text-[1.2rem] ${
                        m.up ? "text-success" : "text-ink"
                      }`}
                    >
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-line bg-deep/80 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
                  Strategy
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Momentum + RSI Weekly
                </p>
                <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className="w-[55%] bg-purple" />
                  <div className="w-[28%] bg-electric" />
                  <div className="w-[17%] bg-blue" />
                </div>
                <p className="mt-2 text-[0.7rem] text-muted-dim">
                  Allocations visible · performance history public
                </p>
              </div>

              <p className="mt-4 text-[0.7rem] text-muted-dim">
                Illustrative track-record concept — not live creator data.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
