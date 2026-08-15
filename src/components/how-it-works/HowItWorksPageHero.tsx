"use client";

import Link from "next/link";

/** Slim intro only — simulator owns the viewport below. */
export function HowItWorksPageHero() {
  return (
    <section className="relative isolate border-b border-white/[0.06] bg-void pt-20">
      <div className="container-max flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2.5 sm:px-5 lg:px-6">
        <div className="min-w-0">
          <Link
            href="/"
            className="text-[0.8rem] font-semibold text-electric transition-colors hover:text-ink"
          >
            ← Back to INDEXLA
          </Link>
          <h1 className="display mt-0.5 text-[clamp(1.05rem,2vw,1.25rem)] font-semibold tracking-[-0.02em] text-ink">
            How It <span className="gradient-text">Works</span>
            <span className="ml-2 text-[0.78rem] font-normal tracking-normal text-muted">
              Build · Strategy · Custody · Simulation
            </span>
          </h1>
        </div>
        <p className="max-w-md text-[0.78rem] leading-snug text-muted">
          No wallet. No real transactions. Your portfolio builds in the live
          preview.
        </p>
      </div>
    </section>
  );
}
