"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FAQ_SECTIONS } from "@/components/faq/faqData";

export function FaqHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-void pt-28 pb-10 md:pb-12 md:pt-32">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-void to-transparent"
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
          <h1 className="display text-[clamp(2.3rem,5vw,3.6rem)] uppercase tracking-[-0.03em]">
            FAQ
          </h1>
        </motion.div>

        <nav
          aria-label="FAQ categories"
          className="mx-auto mt-8 max-w-4xl"
        >
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {FAQ_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex rounded-full border border-line bg-void/50 px-3.5 py-2 text-[0.78rem] font-semibold tracking-[-0.01em] text-muted transition-colors hover:border-electric/40 hover:text-electric sm:text-[0.82rem]"
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
