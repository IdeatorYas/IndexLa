"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FaqSection } from "@/lib/faq";

export function FaqHero({ sections }: { sections: FaqSection[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent"
        aria-hidden
      />

      <div className="section-pad container-max relative z-10 pb-10 pt-[5.75rem] lg:pb-12 lg:pt-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display text-[clamp(2.2rem,5vw,3.4rem)] uppercase tracking-[-0.03em]">
            FAQ
          </h1>
        </motion.div>

        <nav aria-label="FAQ categories" className="mx-auto mt-7 max-w-4xl border-t border-line/80 pt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5 sm:gap-x-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex px-3 py-2 text-[0.8rem] font-semibold tracking-[-0.01em] text-muted transition-colors hover:text-electric sm:px-3.5 sm:text-[0.84rem]"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
