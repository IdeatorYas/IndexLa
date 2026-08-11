"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className={`${crSection} relative overflow-hidden bg-deep`}>
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-50" aria-hidden />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
            Your Content Gets Scrolled.
          </p>
          <h2 className={`mt-3 ${crH2} uppercase`}>
            Your Portfolio Can{" "}
            <span className="gradient-text">Keep Working.</span>
          </h2>
          <p className={`mt-6 ${crBody}`}>
            Turn your thesis into something your audience can follow, customize,
            and allocate to.
          </p>
          <p className={`mt-4 ${crBodyStrong}`}>
            Your followers keep their keys. You keep your credibility.
          </p>
          <div className="mt-10">
            <Button
              href="#become-creator"
              className="min-w-[16rem] px-8 py-3.5 text-[1.02rem] shadow-[0_16px_48px_rgba(59,130,246,0.38)]"
            >
              Become an INDEXLA Creator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
