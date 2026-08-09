export function StrategySuitability() {
  return (
    <section className="border-t border-line bg-void py-10 md:py-12">
      <div className="section-pad container-max">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Strategy Suitability
          </h2>
          <div className="mt-4 space-y-3 text-[0.92rem] leading-relaxed text-muted-dim">
            <p>
              INDEXLA strategies are designed for assets with sufficient
              liquidity, reliable market data, and a clear market structure.
            </p>
            <p>
              Strategy selection does not remove underlying asset risk.
            </p>
            <p>
              A strategy that works with BTC or ETH may behave very differently
              with speculative, illiquid, or short-lived assets.
            </p>
            <div className="space-y-1 pt-1 text-[0.95rem] font-semibold text-muted">
              <p>Asset selection matters.</p>
              <p>Strategy selection matters.</p>
              <p>Market conditions matter.</p>
            </div>
            <p>
              Historical examples on this page are illustrative market history,
              not claimed INDEXLA strategy returns.
            </p>
            <p>
              Verified backtests will show actual strategy performance when
              available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
