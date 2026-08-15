"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { homeSection } from "@/components/home/homeRhythm";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { PortfolioDetailModal } from "./PortfolioDetailModal";
import { surfaceClass } from "./ui";
import type { SimulatorPortfolio } from "./types";

function assetsSummary(p: SimulatorPortfolio): string {
  const top = p.assets.slice(0, 4).map((a) => `${a.ticker} ${a.pct}%`);
  const extra = p.assets.length > 4 ? ` +${p.assets.length - 4}` : "";
  return `${top.join(" · ")}${extra}`;
}

function Card({
  portfolio,
  highlight,
  onOpen,
}: {
  portfolio: SimulatorPortfolio;
  highlight: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${surfaceClass} w-full p-5 text-left transition-colors hover:border-electric/35 ${
        highlight ? "ring-2 ring-electric/50" : ""
      }`}
    >
      {highlight ? (
        <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-electric">
          Just published
        </p>
      ) : null}
      <p className="display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
        {portfolio.name}
      </p>
      <p className="mt-1 text-[0.88rem] text-muted">
        Creator: <span className="font-semibold text-ink">You</span>
      </p>
      <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted">
        {portfolio.portfolioType}
      </p>
      <p className="mt-2 text-[0.9rem] text-muted">{assetsSummary(portfolio)}</p>
      <p className="mt-3 text-[0.95rem] font-semibold text-ink">
        {strategyTitle(portfolio.strategyId)}
      </p>
      <p className="mt-1 text-[0.85rem] text-muted">
        {summarizeStrategy(
          portfolio.strategyId,
          portfolio.strategyConfig,
          portfolio.hybridRules.length,
        )}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-[0.8rem] text-muted">
        <span>
          Execution Fee{" "}
          <strong className="text-ink">1%</strong>
        </span>
        <span>
          Creator Share{" "}
          <strong className="text-ink">50%</strong>
        </span>
      </div>
      {portfolio.status === "paused" ? (
        <p className="mt-3 text-[0.8rem] font-semibold text-amber-200">Paused</p>
      ) : null}
    </button>
  );
}

export function MarketplaceSection() {
  const {
    published,
    justCreatedId,
    selectedId,
    setSelectedId,
    clearJustCreated,
  } = useSimulator();

  const visible = published.filter((p) => p.status !== "removed");

  useEffect(() => {
    if (!justCreatedId) return;
    const t = window.setTimeout(() => clearJustCreated(), 8000);
    return () => window.clearTimeout(t);
  }, [justCreatedId, clearJustCreated]);

  return (
    <section
      className={`${homeSection} border-t border-white/[0.06] bg-deep/40`}
      id="simulator-marketplace"
    >
      <div className="section-pad container-max">
        <div className="mb-8 max-w-2xl">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-electric">
            Marketplace Simulation
          </p>
          <h2 className="mt-2 display text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
            Published Portfolios
          </h2>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
            Portfolios you publish in this session appear here. Allocate is
            simulated — no wallet required.
          </p>
        </div>

        {visible.length === 0 ? (
          <div className={`${surfaceClass} px-6 py-12 text-center`}>
            <p className="text-[1.05rem] text-muted">
              No published portfolios yet. Complete the wizard above to add
              one.
            </p>
            <div className="mt-5">
              <Button href="#simulator" variant="secondary">
                Start building
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Card
                key={p.id}
                portfolio={p}
                highlight={p.id === justCreatedId}
                onOpen={() => setSelectedId(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedId ? (
        <PortfolioDetailModal
          portfolioId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      ) : null}
    </section>
  );
}
