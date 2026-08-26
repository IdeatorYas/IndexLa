import {
  DexlaFlywheel,
  FeeEquation,
  FeeSplitBars,
  MegaFlow,
  OneShotVsTenShots,
  PathToScaleTable,
} from "@/components/investor-deck/DeckVisuals";
import { SlideShell } from "@/components/investor-deck/SlideShell";
import {
  deckBody,
  deckBodyStrong,
  deckH2,
  deckLead,
} from "@/components/investor-deck/deckRhythm";

const CREATOR_STREAMS = [
  ["Portfolio Fees", "50% of applicable execution fees"],
  ["Strategy Access", "Monetize proprietary strategies"],
  ["$DEXLA Tips", "Direct community support"],
  ["Creator Rewards", "Monthly rewards"],
] as const;

const DEXLA_UTILITY = [
  ["Publish", "List portfolios"],
  ["Feature", "Promote portfolios"],
  ["Discount", "Unlock fee discounts"],
  ["Tip", "Support creators"],
  ["Access", "Pay for strategy access"],
] as const;

export function Slide05CreatorEconomy() {
  return (
    <SlideShell n="05">
      <div className="flex h-full flex-col">
        <h2 className={deckH2}>Creators Are the New Distribution Layer.</h2>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.05fr_0.95fr] gap-7">
          <div className="flex flex-col justify-center gap-4">
            <p className={deckBodyStrong}>Creators already command attention and trust.</p>
            <p className={deckBody}>
              INDEXLA turns that social capital into executable financial products.
            </p>
            <MegaFlow steps={["Publish", "Community Invests", "Creator Earns"]} accent large />
            <div className="grid grid-cols-1 gap-3">
              {CREATOR_STREAMS.map(([label, value]) => (
                <div
                  key={label}
                  className="deck-surface flex items-center justify-between rounded-xl px-5 py-4"
                >
                  <span className="text-[1.45rem] font-semibold text-ink">{label}</span>
                  <span className="text-[1.4rem] text-electric">{value}</span>
                </div>
              ))}
            </div>
            <p className={`${deckLead} !text-electric`}>
              Creators don’t just use INDEXLA. They become the distribution engine.
            </p>
          </div>
          <div className="deck-surface-accent flex flex-col items-center justify-center rounded-3xl p-8">
            <p className="text-[1.25rem] font-bold uppercase tracking-[0.14em] text-electric">
              Creator Distribution
            </p>
            <div className="mt-6 flex w-full flex-col items-center gap-3">
              {["Audience", "Thesis Portfolio", "Community Wallets", "Creator Revenue"].map(
                (step, i, arr) => (
                  <div key={step} className="flex w-full flex-col items-center gap-2">
                    <div className="deck-flow-accent w-full max-w-[460px] px-6 py-5 text-center">
                      <span className="text-[1.7rem] font-bold uppercase text-ink">{step}</span>
                    </div>
                    {i < arr.length - 1 ? (
                      <span className="text-[2rem] text-electric/80" aria-hidden>
                        ↓
                      </span>
                    ) : null}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide06BusinessModel() {
  return (
    <SlideShell n="06">
      <div className="flex h-full flex-col">
        <h2 className={deckH2}>Monetize Activity. Capture Value.</h2>
        <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3.5">
          <div className="grid grid-cols-[0.85fr_1.15fr] gap-4">
            <div className="deck-surface-accent rounded-xl p-5">
              <p className="text-[1.25rem] font-bold uppercase tracking-[0.12em] text-electric">
                1% EXECUTION FEE
              </p>
              <p className="mt-3 text-[1.55rem] leading-snug text-ink">
                On every buy, sell, rebalance & automated execution.
              </p>
            </div>
            <FeeEquation />
          </div>
          <div>
            <p className="mb-2 text-[1.2rem] font-bold uppercase tracking-[0.12em] text-muted-dim">
              FEE DISTRIBUTION
            </p>
            <FeeSplitBars />
          </div>
          <p className={deckBody}>
            INDEXLA captures value through platform revenue, treasury economics and $DEXLA
            buybacks.
          </p>
          <div>
            <p className="mb-2 text-[1.2rem] font-bold uppercase tracking-[0.12em] text-muted-dim">
              PATH TO SCALE
            </p>
            <PathToScaleTable />
          </div>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[1.15rem] font-bold uppercase tracking-[0.1em] text-muted-dim">
                STAGE TIMING
              </p>
              <p className="mt-1 text-[1.45rem] font-semibold text-ink">
                Seed — Q4 2026 → Private — Q1 2027 → Public / TGE — Q2–Q3 2027
              </p>
              <p className="mt-1 text-[1.1rem] text-muted-dim">
                Stage targets based on ~5× execution volume across core portfolios + Degen Club.
              </p>
            </div>
            <p className="display text-[1.65rem] font-semibold text-electric">
              AUM → Volume → Gross Fees → INDEXLA Value Capture
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide07DegenClub() {
  return (
    <SlideShell n="07">
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between gap-6">
          <h2 className={deckH2}>The Volume Engine</h2>
          <MegaFlow steps={["Attention", "Activity", "Volume", "Fees"]} accent />
        </div>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[0.78fr_1.22fr] gap-6">
          <div className="flex flex-col justify-center gap-4">
            <p className={`${deckBody} text-muted`}>
              Core portfolios are designed for holding. Lower turnover → lower fee frequency.
            </p>
            <p className={`${deckBody} text-muted`}>
              Memecoins and high-velocity assets are major drivers of crypto attention,
              participation and trading activity.
            </p>
            <p className={`${deckBodyStrong} text-ink`}>
              Degen Club captures that activity in a structured way.
            </p>
            <p className={`${deckBody} text-muted`}>
              Instead of single-asset speculation, users can take multiple calculated positions
              inside one rules-based, automated basket.
            </p>
            <p className={`${deckLead} !text-[1.75rem] !text-electric`}>
              Degen Club is INDEXLA’s deliberate high-velocity revenue accelerator — expanding
              market reach while generating the trading volume the core model needs.
            </p>
          </div>
          <OneShotVsTenShots />
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide08Dexla() {
  return (
    <SlideShell n="08">
      <div className="flex h-full flex-col">
        <h2 className={deckH2}>The Economic Backbone</h2>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] gap-7">
          <div className="flex flex-col justify-center gap-4">
            <p className={deckBody}>
              $DEXLA is embedded across INDEXLA, powering platform utility, creator activity and
              value capture.
            </p>
            <p className={deckBodyStrong}>
              It is the exclusive token for publishing, featuring, accessing and monetizing
              strategies.
            </p>
            <p className="text-[1.2rem] font-bold uppercase tracking-[0.12em] text-muted-dim">
              UTILITY
            </p>
            <div className="space-y-2.5">
              {DEXLA_UTILITY.map(([from, to]) => (
                <div
                  key={from}
                  className="deck-surface flex items-center gap-3 rounded-xl px-4 py-3.5"
                >
                  <span className="min-w-[130px] text-[1.4rem] font-bold text-electric">
                    {from}
                  </span>
                  <span className="text-[1.5rem] text-electric/70">→</span>
                  <span className="text-[1.4rem] text-ink">{to}</span>
                </div>
              ))}
            </div>
            <p className={`${deckLead} !text-electric`}>
              INDEXLA generates the activity. $DEXLA captures the value.
            </p>
          </div>
          <DexlaFlywheel />
        </div>
      </div>
    </SlideShell>
  );
}
