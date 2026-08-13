"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeCta,
  homeH2,
  homeMeasure,
  homeSection,
} from "@/components/home/homeRhythm";

export function FinalCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="early-access"
      className={`relative overflow-hidden ${homeSection} bg-void`}
    >
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="section-pad container-max relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={`${homeH2} ${homeMeasure}`}>
            Invest in Everything. Own Everything. Control Everything.
          </h2>
          <p className={`mt-6 ${homeMeasure} ${homeBody}`}>
            Build programmable portfolios across the evolving on-chain financial
            system while keeping ownership of your assets.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/creators" className={homeCta}>
              Reserve Early Access
            </Button>
          </div>

          <div className={`mt-14 border-t border-line pt-10 text-left sm:text-center ${homeMeasure}`}>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Disclaimer
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted text-pretty text-balance sm:text-[0.98rem]">
              Digital assets, tokenized assets and automated strategies involve
              significant risk, including possible loss of capital. Nothing on
              this website constitutes investment, financial, legal or tax
              advice. Past performance does not guarantee future results. Asset
              availability, functionality and eligibility may vary by
              jurisdiction. INDEXLA does not guarantee investment returns or
              execution outcomes.
            </p>
            <div className="mt-5 text-center">
              <HomeReadMore
                href="/whitepaper/disclaimer"
                label="Full Disclaimer →"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
