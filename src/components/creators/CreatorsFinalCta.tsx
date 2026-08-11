"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
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
    <section className={`${crSection} relative overflow-hidden bg-void`}>
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-35"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <motion.div
          className={`mx-auto max-w-3xl ${crSurface} px-6 py-12 text-center sm:px-10 sm:py-14`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            Your Content Gets Scrolled.
          </p>
          <h2 className={`mt-3 ${crH2} uppercase`}>
            Your Portfolio Can{" "}
            <span className="gradient-text">Keep Working.</span>
          </h2>

          <p className={`mx-auto mt-6 max-w-xl ${crBody} text-balance`}>
            Turn your conviction into a portfolio your audience can follow,
            customize, and allocate to.
          </p>

          <div className="mx-auto mt-9 max-w-lg rounded-2xl border border-electric/30 bg-electric/[0.08] px-5 py-6 sm:px-7">
            <p className="display text-[clamp(1.25rem,2.8vw,1.55rem)] tracking-[-0.025em] text-ink uppercase">
              Join Early INDEXLA Creators.
            </p>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted text-pretty sm:text-[1.08rem]">
              Be among the first creators building the next generation of
              programmable portfolios.
            </p>
          </div>

          <div className="mt-10">
            <Button href="#become-creator" className={crCta}>
              Become an INDEXLA Creator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
