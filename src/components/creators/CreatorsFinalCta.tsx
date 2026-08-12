"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  crBody,
  crCta,
  crH2,
  crSection,
  crSurface,
} from "@/components/creators/creatorRhythm";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`${crSection} relative scroll-mt-24 overflow-hidden bg-void`}
    >
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-35"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <motion.div
          className={`mx-auto max-w-3xl ${crSurface} px-6 py-12 sm:px-10 sm:py-14`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            Early Access
          </p>
          <h2 className={`mt-3 ${crH2} uppercase`}>
            Reserve Your Place For{" "}
            <span className="gradient-text">Creator MVP Access</span>
          </h2>

          <p className={`mx-auto mt-6 max-w-xl ${crBody} text-balance`}>
            For creators interested in early access to publish portfolios,
            grow community participation, and preview the INDEXLA creator
            experience.
          </p>

          <form
            className="mx-auto mt-9 max-w-md space-y-4 text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="creator-x-handle"
                className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim"
              >
                X Handle
              </label>
              <input
                id="creator-x-handle"
                name="xHandle"
                type="text"
                placeholder="@yourhandle"
                autoComplete="username"
                className="mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-1 focus:ring-electric/25"
              />
            </div>
            <div>
              <label
                htmlFor="creator-follower-count"
                className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim"
              >
                Follower Count
              </label>
              <input
                id="creator-follower-count"
                name="followerCount"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 25,000"
                className="mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-1 focus:ring-electric/25"
              />
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:brightness-110 ${crCta}`}
              >
                Reserve Early Access
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
