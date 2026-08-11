import {
  stBody,
  stBodyStrong,
  stSection,
} from "@/components/strategies/strategyRhythm";

export function StrategySuitability() {
  return (
    <section className={`${stSection} bg-void`}>
      <div className="section-pad container-max">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Strategy Suitability
          </h2>
          <div className={`mt-4 space-y-3 ${stBody} !text-[1rem] sm:!text-[1.05rem]`}>
            <p>
              INDEXLA strategies are designed for assets with sufficient
              liquidity, reliable market data, and a clear market structure.
            </p>
            <p>Strategy selection does not remove underlying asset risk.</p>
            <p>
              A strategy that works with BTC or ETH may behave very differently
              with speculative, illiquid, or short-lived assets.
            </p>
            <div className="space-y-1 pt-1">
              <p className={stBodyStrong}>Asset selection matters.</p>
              <p className={stBodyStrong}>Strategy selection matters.</p>
              <p className={stBodyStrong}>Market conditions matter.</p>
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
