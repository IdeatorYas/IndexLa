import {
  CompetitiveTable,
  GtmSystem,
} from "@/components/investor-deck/DeckVisuals";
import { SlideShell } from "@/components/investor-deck/SlideShell";
import {
  deckBody,
  deckH2,
  deckLead,
  deckMetric,
} from "@/components/investor-deck/deckRhythm";

const MARKET_METRICS = [
  { value: "$250T+", label: "Global investable assets" },
  { value: "$10T+", label: "Projected tokenized RWAs by 2030" },
  { value: "$80B+", label: "DeFi TVL" },
] as const;

const PILLARS = [
  {
    n: "01",
    title: "TRUE OWNERSHIP",
    body: "Assets remain in the investor’s wallet.",
    visual: "Wallet-first · Non-custodial",
  },
  {
    n: "02",
    title: "CREATOR DISTRIBUTION",
    body: "Creators bring audiences → audiences become investors.",
    visual: "Audience → Capital",
  },
  {
    n: "03",
    title: "CROSS-ASSET & CROSS-CHAIN",
    body: "Crypto + Tokenized Assets + RWAs across multiple chains in one portfolio layer.",
    visual: "One portfolio layer",
  },
  {
    n: "04",
    title: "AUTOMATED EXECUTION",
    body: "AI coordinates complex execution within user-defined rules without taking custody.",
    visual: "Rules · AI · No custody",
  },
] as const;

export function Slide09Market() {
  return (
    <SlideShell n="09">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} text-ink`}>Capital Is Moving On-Chain.</h2>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {MARKET_METRICS.map((m) => (
            <div
              key={m.value}
              className="deck-surface-accent flex flex-col items-center justify-center rounded-3xl px-6 py-10 text-center shadow-[0_0_60px_rgba(56,189,248,0.12)]"
            >
              <p className={`${deckMetric} !text-[6.8rem] text-electric`}>{m.value}</p>
              <p className="mt-6 text-[1.85rem] font-semibold leading-snug text-ink">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-center gap-5">
          <p className="text-[1.25rem] font-bold uppercase tracking-[0.12em] text-muted-dim">
            THE OPPORTUNITY
          </p>
          <p className={`${deckLead} max-w-[1500px] text-center text-ink`}>
            The missing link is no longer asset availability, it is the distribution and
            portfolio layer.
          </p>
          <div className="w-full max-w-[1500px] rounded-2xl border border-electric/35 bg-electric/[0.06] px-10 py-7 text-center">
            <p className="display text-[2.55rem] font-semibold tracking-[-0.03em] text-electric">
              Asset Supply × Creator Distribution × Programmable Execution
            </p>
          </div>
          <div className="w-full max-w-[900px] rounded-2xl border border-electric/40 bg-electric/[0.08] px-10 py-6 text-center">
            <p className="display text-[2.25rem] font-semibold tracking-[-0.02em] text-ink">
              INDEXLA sits at the intersection.
            </p>
          </div>
          <p className="text-[1.15rem] text-muted-dim">
            Sources: McKinsey & Company · RWA.xyz · DeFiLlama
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide10WhyWins() {
  return (
    <SlideShell n="10">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} text-ink`}>The Combination Is the Thesis.</h2>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="deck-surface relative flex flex-col justify-between overflow-hidden rounded-2xl p-7"
            >
              <div>
                <div className="flex items-baseline gap-4">
                  <span className="display text-[3rem] font-bold text-electric">{p.n}</span>
                  <p className="display text-[2.15rem] font-semibold tracking-[-0.03em] text-electric">
                    {p.title}
                  </p>
                </div>
                <p className="mt-5 text-[1.85rem] leading-snug text-ink">{p.body}</p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[1.35rem] font-semibold uppercase tracking-[0.08em] text-muted-dim">
                  {p.visual}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 deck-surface-accent rounded-2xl px-8 py-5">
          <p className="text-[1.2rem] font-bold uppercase tracking-[0.14em] text-muted-dim">
            THE MOAT
          </p>
          <p className="mt-2 display text-[2.45rem] font-semibold tracking-[-0.03em] text-electric">
            Ownership × Creators × Cross-Chain × Cross-Asset × AI Automation
          </p>
          <p className={`mt-3 ${deckBody} text-muted`}>
            Interfaces can be copied. Creator relationships, strategy history and distribution
            compound over time.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide11Competitive() {
  return (
    <SlideShell n="11">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} text-electric`}>INDEXLA Owns the Intersection.</h2>
        <div className="mt-10 flex min-h-0 flex-1 flex-col justify-end pb-0">
          <CompetitiveTable />
          <div className="mt-1.5 flex items-center justify-between gap-5 border-t border-electric/30 pt-2.5">
            <p className="max-w-[1280px] text-[1.9rem] font-semibold leading-snug text-ink">
              No single competitor combines direct ownership, cross-asset, cross-chain, AI
              automation and creator distribution.
            </p>
            <p className="display shrink-0 text-[3.6rem] font-bold uppercase tracking-[-0.03em] text-electric">
              INDEXLA DOES.
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

export function Slide12GTM() {
  return (
    <SlideShell n="12">
      <div className="flex h-full flex-col">
        <h2 className={`${deckH2} text-electric`}>Distribution Is the Growth Engine</h2>
        <p className="mt-2 text-[1.75rem] font-semibold text-ink">
          A multi-channel system drives AUM, volume and retention.
        </p>
        <div className="mt-3 min-h-0 flex-1">
          <GtmSystem />
        </div>
      </div>
    </SlideShell>
  );
}
