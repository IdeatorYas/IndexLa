"use client";

import { motion, useReducedMotion } from "framer-motion";

const mechanisms = [
  "Creators permanently burn $DEXLA to publish public portfolios and indexes.",
  "The protocol uses a share of execution fees to buy and permanently burn $DEXLA.",
  "The Treasury uses a share of realized profits to buy and permanently burn $DEXLA.",
] as const;

export function TokenomicsHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-14 md:pb-16 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" aria-hidden />
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
          <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-electric to-transparent" />

          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-electric">
            Tokenomics
          </p>

          <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.5rem)] uppercase tracking-[-0.03em] text-balance">
            $DEXLA: The Engine of the{" "}
            <span className="gradient-text">INDEXLA Ecosystem</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[1.08rem] leading-relaxed text-muted">
            $DEXLA is the native utility token of INDEXLA.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">
            Its utility is built around three concrete mechanisms:
          </p>

          <ul className="mx-auto mt-6 max-w-2xl space-y-3 text-left">
            {mechanisms.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-line bg-void/45 px-4 py-3 text-[0.98rem] leading-relaxed text-muted"
              >
                <span className="mr-2 text-electric" aria-hidden>
                  →
                </span>
                {item.includes("Creators permanently burn") ? (
                  <>
                    <span className="font-semibold text-ink">
                      Creators permanently burn $DEXLA
                    </span>{" "}
                    to publish public portfolios and indexes.
                  </>
                ) : item.includes("protocol uses a share") ? (
                  <>
                    <span className="font-semibold text-ink">
                      The protocol uses a share of execution fees
                    </span>{" "}
                    to buy and permanently burn $DEXLA.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-ink">
                      The Treasury uses a share of realized profits
                    </span>{" "}
                    to buy and permanently burn $DEXLA.
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-8 max-w-2xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
            <p>Demand is created by platform activity.</p>
            <p>
              Supply is reduced through permanent burns as that activity grows.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
