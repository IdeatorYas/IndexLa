"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const fragments = [
  { label: "Wallet A", sub: "ETH mainnet" },
  { label: "Wallet B", sub: "Solana" },
  { label: "Bridge UI", sub: "Manual hops" },
  { label: "CEX app", sub: "Another login" },
  { label: "L2 wallet", sub: "Another network" },
];

export function MultiChainSection() {
  return (
    <section className="relative border-t border-line bg-deep py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.35rem)] uppercase tracking-[-0.02em] text-balance">
            Your Assets Are Everywhere.{" "}
            <span className="gradient-text">Your Portfolio Shouldn&apos;t Be.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[1.08rem] leading-relaxed text-muted">
            <p>
              Managing a multi-chain portfolio today can mean jumping between
              wallets, networks, bridges, exchanges, and applications.
            </p>
            <p>Different assets. Different wallets. Different interfaces.</p>
            <p>
              Moving capital across chains can mean switching networks, finding
              the right bridge, and managing transactions across multiple
              platforms.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn>
            <div className="rounded-[1.75rem] border border-danger/15 bg-danger/[0.04] p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-danger/80">
                Fragmented today
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {fragments.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-line bg-void/40 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-ink/90">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-dim">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[1.75rem] glass p-6 sm:p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-electric">
                INDEXLA
              </p>
              <p className="display mt-3 text-[1.55rem] text-ink">
                INDEXLA brings the portfolio together.
              </p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
                Manage supported assets across multiple chains through one
                portfolio interface, with cross-chain execution powered by the
                infrastructure underneath.
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-void/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">Unified portfolio</span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-electric">
                    Multi-chain
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {["ETH", "SOL", "BNB"].map((chain) => (
                    <div
                      key={chain}
                      className="rounded-xl border border-line bg-panel/50 py-3 text-center text-xs font-semibold text-muted"
                    >
                      {chain}
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
                <p className="mt-3 text-center text-xs text-muted-dim">
                  One interface · coordinated execution
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-10">
          <p className="display text-[clamp(1.2rem,2.5vw,1.7rem)] text-ink">
            One portfolio. Multiple chains. One place to manage it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
