import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

const PATHS = [
  {
    id: "core",
    type: "Long-Term Investor",
    headline: "Build Long-Term Exposure",
    tags: "Bitcoin · Gold · Tokenized Stocks · Tokenized RWAs",
    body: "Build diversified portfolios, automate strategies and own the underlying assets.",
    product: "INDEXLA Core",
    cta: { href: "/how-it-works", label: "See How It Works" },
    accent: "border-electric/35 from-electric/[0.12]",
    badge:
      "border-electric/45 bg-electric/[0.16] text-electric shadow-[inset_0_1px_0_rgba(56,189,248,0.22)]",
    tagsClass: "text-electric",
    productClass: "text-electric",
  },
  {
    id: "stable",
    type: "Stablecoin Yield Seeker",
    headline: "Earn with Stablecoins",
    tags: "USDC · USDT · DEX Liquidity · Trading Fees",
    body: "Supply stablecoins to decentralized exchanges and automate your liquidity positions.",
    product: "Stable Club",
    cta: { href: "/stable-club", label: "Explore Stable Club" },
    accent:
      "border-success/40 from-success/[0.14] via-emerald-500/[0.06]",
    badge:
      "border-success/50 bg-success/[0.18] text-success shadow-[inset_0_1px_0_rgba(52,211,153,0.22)]",
    tagsClass: "text-success",
    productClass: "text-success",
  },
  {
    id: "degen",
    type: "High-Risk Trader",
    headline: "Chase the Next 100x",
    tags: "Multiple Coins · Multiple Chains · Multiple Opportunities",
    body: "Build memecoin baskets and give yourself more chances to catch the next 100x.",
    product: "Degen Club · High Risk",
    cta: { href: "/degen-club", label: "Explore Degen Club" },
    accent: "border-amber-400/35 from-amber-400/[0.12]",
    badge:
      "border-amber-400/45 bg-amber-400/[0.16] text-amber-200 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]",
    tagsClass: "text-amber-300",
    productClass: "text-amber-300",
  },
] as const;

export function InvestorPathsSection() {
  return (
    <section id="investment-path" className={`${invSection} bg-deep scroll-mt-24`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Built for Every Type of{" "}
            <span className="gradient-text">Investor.</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${invBody}`}>
            Choose the opportunity that matches your goals, capital and risk
            appetite.
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 max-w-5xl space-y-4">
          {PATHS.map((path, i) => (
            <FadeIn key={path.id} delay={i * 0.05}>
              <article
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-r ${path.accent} to-void/70 px-5 py-6 sm:px-7 sm:py-7 md:px-8`}
              >
                <div className="grid items-center gap-5 md:grid-cols-[1fr_auto] md:gap-8">
                  <div className="min-w-0 text-left">
                    <div className="inline-flex">
                      <span
                        className={`inline-flex items-center rounded-xl border px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] sm:px-4 sm:text-[0.84rem] ${path.badge}`}
                      >
                        {path.type}
                      </span>
                    </div>

                    <h3 className="mt-4 display text-[1.35rem] font-semibold tracking-[-0.025em] text-ink text-balance sm:text-[1.55rem]">
                      {path.headline}
                    </h3>

                    <p
                      className={`mt-3 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.02rem] ${path.tagsClass}`}
                    >
                      {path.tags}
                    </p>

                    <p className={`mt-3 max-w-2xl ${invBody}`}>{path.body}</p>

                    <p
                      className={`mt-4 display text-[1.15rem] font-semibold tracking-[-0.02em] sm:text-[1.28rem] ${path.productClass}`}
                    >
                      {path.product}
                    </p>
                  </div>

                  <div className="flex md:justify-end">
                    <Link
                      href={path.cta.href}
                      className={`${homeCta} inline-flex w-full min-w-[11.5rem] justify-center px-5 py-3 text-[0.95rem] md:w-auto`}
                    >
                      {path.cta.label}
                    </Link>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
