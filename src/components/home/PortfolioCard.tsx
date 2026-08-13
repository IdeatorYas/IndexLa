"use client";

import { motion } from "framer-motion";
import { AssetLogo } from "@/components/ui/AssetLogo";
import { ASSETS, TYPE_STYLES, type Portfolio } from "@/lib/site";

type PortfolioCardProps = {
  portfolio: Portfolio;
  featured?: boolean;
};

export function PortfolioCard({ portfolio, featured = false }: PortfolioCardProps) {
  const typeStyle = TYPE_STYLES[portfolio.type];

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-5 sm:p-6 ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/10 blur-3xl transition-opacity group-hover:opacity-100"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${typeStyle.className}`}
          >
            {typeStyle.label}
          </span>
          <h3 className="display mt-3 text-[clamp(1.15rem,2.4vw,1.35rem)] tracking-[-0.02em] text-ink text-balance text-pretty">
            {portfolio.name}
          </h3>
        </div>
        <div className="text-right">
          <p
            className={`text-lg font-semibold tabular-nums ${
              portfolio.performancePositive ? "text-success" : "text-danger"
            }`}
          >
            {portfolio.performance}
          </p>
          <p className="mt-1 inline-flex items-center rounded-md border border-success/35 bg-success/10 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-success">
            Illustrative
          </p>
          <p className="mt-1.5 text-[0.7rem] font-medium leading-snug text-muted">
            Demo performance
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {portfolio.assets.map((key) => (
          <div
            key={key}
            className="flex items-center gap-1.5 rounded-full border border-line bg-void/55 py-1 pl-1 pr-2.5"
            title={ASSETS[key].name}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-panel/80">
              <AssetLogo asset={key} size={16} />
            </span>
            <span className="text-[0.68rem] font-semibold tracking-[-0.01em] text-ink/90">
              {ASSETS[key].ticker}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-void/40 px-3 py-3">
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-dim">
            Demo AUM
          </p>
          <p className="mt-1 font-semibold text-ink">{portfolio.aum}</p>
        </div>
        <div className="rounded-2xl bg-void/40 px-3 py-3">
          <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-dim">
            Strategy
          </p>
          <p className="mt-1 font-semibold leading-snug text-ink">
            {portfolio.strategy}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-dim">
          Demo allocation
        </p>
        {portfolio.allocation.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>{row.label}</span>
              <span>{row.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple to-electric"
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-[1.05rem] leading-snug text-muted">
        <span className="text-electric">Activity · </span>
        {portfolio.activity}
        <span className="ml-2 inline-flex items-center rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-success">
          Illustrative
        </span>
      </p>
    </motion.article>
  );
}
