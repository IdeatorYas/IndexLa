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
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-deep/45 p-4 sm:p-5 ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${typeStyle.className}`}
          >
            {typeStyle.label}
          </span>
          <h3 className="display mt-2.5 text-[clamp(1.05rem,2.2vw,1.25rem)] tracking-[-0.02em] text-ink text-balance text-pretty">
            {portfolio.name}
          </h3>
        </div>
        <div className="text-right">
          <p
            className={`text-[1.05rem] font-semibold tabular-nums ${
              portfolio.performancePositive ? "text-success/90" : "text-danger"
            }`}
          >
            {portfolio.performance}
          </p>
          <p className="mt-1 text-[0.68rem] font-medium leading-snug text-muted-dim">
            Demo performance
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {portfolio.assets.map((key) => (
          <div
            key={key}
            className="flex items-center gap-1.5 rounded-full border border-line bg-void/50 py-0.5 pl-1 pr-2"
            title={ASSETS[key].name}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-panel/80">
              <AssetLogo asset={key} size={14} />
            </span>
            <span className="text-[0.65rem] font-semibold tracking-[-0.01em] text-ink/85">
              {ASSETS[key].ticker}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
        <div className="rounded-xl bg-void/35 px-3 py-2.5">
          <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
            Demo AUM
          </p>
          <p className="mt-1 font-semibold text-ink">{portfolio.aum}</p>
        </div>
        <div className="rounded-xl bg-void/35 px-3 py-2.5">
          <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
            Strategy
          </p>
          <p className="mt-1 font-semibold leading-snug text-ink">
            {portfolio.strategy}
          </p>
        </div>
      </div>

      <div className="mt-3.5 space-y-2">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Demo allocation
        </p>
        {portfolio.allocation.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>{row.label}</span>
              <span>{row.pct}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple/80 to-electric/80"
                initial={{ width: 0 }}
                whileInView={{ width: `${row.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 border-t border-line pt-3 text-[0.95rem] leading-snug text-muted">
        <span className="text-electric/90">Activity · </span>
        {portfolio.activity}
      </p>
    </motion.article>
  );
}
