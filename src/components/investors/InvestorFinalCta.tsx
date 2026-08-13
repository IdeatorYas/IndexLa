"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

export function InvestorFinalCta() {
  const reduce = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;
    setSubmitted(true);
    form.reset();
  }

  return (
    <section
      id="early-access"
      className={`${invSection} relative scroll-mt-24 overflow-hidden border-t border-line bg-deep py-14 md:py-16`}
    >
      <div
        className="pointer-events-none absolute inset-0 hero-glow opacity-40"
        aria-hidden
      />
      <div className="section-pad container-max relative">
        <motion.div
          className="mx-auto max-w-xl rounded-[1.5rem] border border-electric/35 bg-gradient-to-b from-electric/[0.1] via-void/50 to-purple/[0.06] px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(56,189,248,0.14),0_20px_60px_rgba(0,0,0,0.28)] sm:px-10 sm:py-12"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-muted-dim">
            Early Access
          </p>
          <h2 className={`mt-3 ${invH2} uppercase`}>
            Reserve Early Access
          </h2>
          <p className={`mx-auto mt-5 max-w-md ${invBody} text-balance`}>
            For investors interested in early access to build and automate
            portfolios on INDEXLA.
          </p>

          {submitted ? (
            <div className="mx-auto mt-9 max-w-md rounded-2xl border border-success/35 bg-success/[0.1] px-5 py-6">
              <p className="text-[1.05rem] font-semibold text-ink">
                Thanks for your interest.
              </p>
              <p className={`mt-2 ${invBody}`}>
                Enter another email if you need to update your request.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-[0.92rem] font-semibold text-electric transition-colors hover:text-ink"
              >
                Submit another email
              </button>
            </div>
          ) : (
            <form
              className="mx-auto mt-9 max-w-md space-y-4 text-left"
              onSubmit={onSubmit}
            >
              <div>
                <label
                  htmlFor="investor-name"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim"
                >
                  Name
                </label>
                <input
                  id="investor-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-1 focus:ring-electric/25"
                />
              </div>
              <div>
                <label
                  htmlFor="investor-email"
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted-dim"
                >
                  Email
                </label>
                <input
                  id="investor-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-[0.98rem] text-ink outline-none transition-colors placeholder:text-muted-dim focus:border-electric/45 focus:ring-1 focus:ring-electric/25"
                />
              </div>
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className={`inline-flex w-full max-w-[22rem] items-center justify-center rounded-full bg-gradient-to-r from-purple to-blue font-semibold tracking-[-0.01em] text-white transition-all duration-300 hover:brightness-110 ${homeCta}`}
                >
                  Reserve Early Access
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
