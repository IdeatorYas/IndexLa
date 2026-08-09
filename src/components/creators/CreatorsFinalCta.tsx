"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CreatorPortfolioDashboard } from "@/components/creators/CreatorPortfolioDashboard";

export function CreatorsFinalCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-line bg-void py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-60" aria-hidden />
      <div className="section-pad container-max relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="display text-[clamp(2.1rem,4.8vw,3.4rem)] uppercase tracking-[-0.03em] text-balance">
              Your Audience Is Already Listening.
            </h2>
            <p className="mt-5 text-[1.1rem] leading-relaxed text-muted">
              Now give them something to invest in.
            </p>
            <div className="mt-5 space-y-2 text-[1.05rem] leading-relaxed text-muted">
              <p>Build your flagship portfolio.</p>
              <p>Share your thesis.</p>
              <p>Educate your audience.</p>
              <p>Grow your AUM.</p>
              <p>Earn from the activity you generate.</p>
              <p>Compete for the leaderboard.</p>
            </div>
            <p className="mt-7 display text-[clamp(1.15rem,2.3vw,1.5rem)] text-ink">
              Turn your conviction into something that can grow with your
              audience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#build-flow" className="min-w-[12.5rem]">
                Become a Creator
              </Button>
              <Button href="/strategies" variant="secondary" className="min-w-[12.5rem]">
                Explore Marketplace
              </Button>
            </div>
          </motion.div>

          <CreatorPortfolioDashboard compact />
        </div>
      </div>
    </section>
  );
}
