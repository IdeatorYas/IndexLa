"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { homeSection } from "@/components/home/homeRhythm";
import { AssetLogo } from "./AssetLogo";
import { summarizeStrategy, strategyTitle } from "./strategies";
import { useSimulator } from "./SimulatorContext";
import { PortfolioDetailModal } from "./PortfolioDetailModal";
import { surfaceClass } from "./ui";
import type { SimulatorPortfolio } from "./types";

function AssetStack({ portfolio }: { portfolio: SimulatorPortfolio }) {
  const shown = portfolio.assets.slice(0, 5);
  const extra = portfolio.assets.length - shown.length;
  return (
    <div className="mt-3 flex items-center">
      <div className="flex -space-x-2">
        {shown.map((a) => (
          <AssetLogo
            key={a.key}
            ticker={a.ticker}
            name={a.name}
            src={a.src}
            size={28}
            className="ring-2 ring-deep"
          />
        ))}
      </div>
      {extra > 0 ? (
        <span className="ml-2 text-[0.78rem] font-semibold text-muted">
          +{extra}
        </span>
      ) : null}
    </div>
  );
}

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
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
  const summary = portfolio.assets
    .slice(0, 4)
    .map((a) => `${a.ticker} ${a.pct}%`)
    .join(" · ");
  const extra =
    portfolio.assets.length > 4 ? ` +${portfolio.assets.length - 4}` : "";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${surfaceClass} w-full p-5 text-left transition-all duration-300 hover:border-electric/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] ${
        highlight ? "ring-2 ring-electric/55" : ""
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
      {portfolio.description ? (
        <p className="mt-2 line-clamp-2 text-[0.88rem] leading-relaxed text-muted">
          {portfolio.description}
        </p>
      ) : null}
      <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted">
        {portfolio.portfolioType}
      </p>
      <AssetStack portfolio={portfolio} />
      <p className="mt-2 text-[0.88rem] text-muted">
        {summary}
        {extra}
      </p>
      <p className="mt-3 text-[0.95rem] font-semibold text-ink">
        {strategyTitle(portfolio.strategyId)}
      </p>
      <p className="mt-1 text-[0.85rem] leading-snug text-muted">
        {summarizeStrategy(
          portfolio.strategyId,
          portfolio.strategyConfig,
          portfolio.hybrid,
        )}
      </p>
      <p className="mt-3 text-[0.95rem] font-semibold text-electric">
        {usd(portfolio.amountUsd)}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-[0.8rem] text-muted">
        <span>
          Execution Fee <strong className="text-ink">1%</strong>
        </span>
        <span>
          Creator Share <strong className="text-ink">50%</strong>
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
          <div className={`${surfaceClass} px-6 py-14 text-center`}>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Empty marketplace
            </p>
            <p className="mt-3 text-[1.15rem] font-semibold text-ink">
              No published portfolios yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-[0.98rem] text-muted">
              Complete the builder above and publish. Each portfolio you create
              in this session appears here instantly — no fake listings.
            </p>
            <div className="mt-6">
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
