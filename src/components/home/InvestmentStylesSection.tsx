import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const STYLES = [
  {
    id: "core",
    eyebrow: "INDEXLA CORE",
    body: [
      "Build long-term exposure through diversified portfolios across crypto, tokenized stocks, commodities and real-world assets.",
    ],
    highlight: null as string | null,
    risk: null as string | null,
    cta: { href: "#discover-portfolios", label: "Explore Portfolios →" },
    accent:
      "border-electric/35 bg-electric/[0.06] shadow-[inset_0_1px_0_rgba(56,189,248,0.12)]",
    eyebrowClass: "text-electric",
  },
  {
    id: "stable",
    eyebrow: "STABLE CLUB",
    body: [
      "Put your stablecoins to work through non-custodial USDC and USDT liquidity strategies.",
      "Earn trading fees and incentives without lending or borrowing.",
    ],
    highlight: "No Lending · No Borrowing · No Extra Vault",
    risk: null,
    cta: { href: "/stable-club", label: "Explore Stable Club →" },
    accent:
      "border-cyan/35 bg-cyan/[0.06] shadow-[inset_0_1px_0_rgba(34,211,238,0.12)]",
    eyebrowClass: "text-cyan",
  },
  {
    id: "degen",
    eyebrow: "DEGEN CLUB",
    body: [
      "A new way to chase the next 100x.",
      "Diversify across a basket of memecoins.",
    ],
    highlight: "Multiple Coins · Multiple Opportunities · More Chances to Catch a Winner",
    risk: "High Risk · High Volatility",
    cta: { href: "/degen-club", label: "Explore Degen Club →" },
    accent:
      "border-amber-400/30 bg-amber-400/[0.06] shadow-[inset_0_1px_0_rgba(251,191,36,0.12)]",
    eyebrowClass: "text-amber-300",
  },
] as const;

export function InvestmentStylesSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={`${homeH2} mx-auto max-w-4xl`}>
            One Platform.{" "}
            <span className="gradient-text">Every Investment Style.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-[1.15rem] font-semibold leading-snug text-electric text-balance sm:text-[1.3rem]">
            Long-Term Investors · Stablecoin Yield Seekers · High-Risk Traders
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 lg:grid-cols-3 lg:gap-5">
          {STYLES.map((style, i) => (
            <FadeIn key={style.id} delay={i * 0.05} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border px-5 py-7 text-center sm:px-6 sm:py-8 ${style.accent}`}
              >
                <p
                  className={`text-[0.78rem] font-bold uppercase tracking-[0.16em] ${style.eyebrowClass}`}
                >
                  {style.eyebrow}
                </p>
                <div className={`mt-5 flex-1 space-y-3 ${homeBody}`}>
                  {style.body.map((line) => (
                    <p key={line} className="text-balance">
                      {line}
                    </p>
                  ))}
                </div>
                {style.highlight ? (
                  <p className="mt-5 text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.05rem]">
                    {style.highlight}
                  </p>
                ) : null}
                {style.risk ? (
                  <p className="mt-3 text-[0.88rem] font-semibold uppercase tracking-[0.08em] text-amber-300/90">
                    {style.risk}
                  </p>
                ) : null}
                <div className="mt-7">
                  <Link
                    href={style.cta.href}
                    className="inline-flex items-center text-[1.05rem] font-semibold text-electric transition-colors hover:text-ink"
                  >
                    {style.cta.label}
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
