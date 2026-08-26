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
    eyebrow: "Invest Across Global Markets",
    tags: "Bitcoin · Gold · Tokenized Stocks · Tokenized RWAs",
    body: "Build diversified portfolios, automate strategies and own the underlying assets.",
    product: "INDEXLA Core",
    cta: { href: "/how-it-works", label: "See How It Works" },
    accent: "border-electric/35 from-electric/[0.12]",
    productClass: "text-electric",
  },
  {
    id: "stable",
    eyebrow: "Put Stablecoins to Work",
    tags: "USDC · USDT · DEX Liquidity · Trading Fees",
    body: "Supply stablecoins to decentralized exchanges and automate your liquidity positions.",
    product: "Stable Club",
    cta: { href: "/stable-club", label: "Explore Stable Club" },
    accent: "border-cyan/35 from-cyan/[0.12]",
    productClass: "text-cyan",
  },
  {
    id: "degen",
    eyebrow: "Chase the Next Memecoin 100x",
    tags: "Multiple Coins · Multiple Chains · Multiple Opportunities",
    body: "Build memecoin baskets and give yourself more chances to catch the next 100x.",
    product: "Degen Club · High Risk",
    cta: { href: "/degen-club", label: "Explore Degen Club" },
    accent: "border-amber-400/35 from-amber-400/[0.12]",
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
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
                      {path.eyebrow}
                    </p>
                    <p className="mt-2.5 text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-electric sm:text-[1.02rem]">
                      {path.tags}
                    </p>
                    <p className={`mt-3 max-w-2xl ${invBody}`}>{path.body}</p>
                    <p
                      className={`mt-4 display text-[1.2rem] font-semibold tracking-[-0.02em] sm:text-[1.35rem] ${path.productClass}`}
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
