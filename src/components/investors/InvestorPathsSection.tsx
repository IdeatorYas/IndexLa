import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ASSETS } from "@/lib/site";
import { DEGEN_MEME_LOGOS } from "@/components/degen-club/memeLogos";
import {
  invBody,
  invH2,
  invSection,
} from "@/components/investors/investorRhythm";
import { homeCta } from "@/components/home/homeRhythm";

const PATHS = [
  {
    id: "core",
    label: "For Long-Term Investors",
    title: "INDEXLA CORE",
    body: [
      "Build diversified portfolios across crypto, tokenized stocks, commodities and real-world assets.",
      "Define allocations, automate portfolio actions and own the underlying assets directly.",
    ],
    benefit: "Diversify · DCA · Rebalance · Take Profit",
    cta: { href: "/how-it-works", label: "Explore How It Works" },
    titleClass: "text-electric",
    labelClass: "border-electric/40 bg-electric/15 text-electric",
    shell:
      "border-blue/45 bg-gradient-to-b from-blue/[0.16] via-electric/[0.06] to-deep/80",
    assets: [
      { src: ASSETS.btc.src, alt: "Bitcoin" },
      { src: ASSETS.eth.src, alt: "Ethereum" },
      { src: ASSETS.sol.src, alt: "Solana" },
      { src: ASSETS.gold.src, alt: "Gold" },
      { src: ASSETS.sp500.src, alt: "S&P 500" },
      { src: ASSETS.nvidia.src, alt: "NVIDIA" },
      { src: ASSETS.google.src, alt: "Google" },
    ],
  },
  {
    id: "stable",
    label: "For Stablecoin Yield Seekers",
    title: "STABLE CLUB",
    body: [
      "Supply stablecoins to decentralized exchanges and earn trading fees while INDEXLA automates the liquidity position.",
    ],
    benefit: "DEX Trading Fees · No Lending · No Borrowing · No Extra Vault",
    cta: { href: "/stable-club", label: "Explore Stable Club" },
    titleClass: "text-cyan",
    labelClass: "border-cyan/40 bg-cyan/15 text-cyan",
    shell:
      "border-cyan/45 bg-gradient-to-b from-cyan/[0.14] via-success/[0.07] to-deep/80",
    assets: [
      { src: "/images/assets/usdc.svg", alt: "USDC" },
      { src: "/images/assets/usdt.svg", alt: "USDT" },
    ],
  },
  {
    id: "degen",
    label: "For High-Risk Traders",
    title: "DEGEN CLUB",
    body: [
      "Build a basket of memecoins and give yourself more chances to catch the next 100x.",
    ],
    benefit: "Multiple Coins · Multiple Shots · High Risk",
    cta: { href: "/degen-club", label: "Explore Degen Club" },
    titleClass: "text-amber-300",
    labelClass: "border-amber-400/40 bg-amber-400/15 text-amber-200",
    shell:
      "border-amber-400/40 bg-gradient-to-b from-amber-400/[0.14] via-orange-500/[0.08] to-deep/80",
    assets: [
      { src: DEGEN_MEME_LOGOS.DOGE, alt: "DOGE" },
      { src: DEGEN_MEME_LOGOS.PEPE, alt: "PEPE" },
      { src: DEGEN_MEME_LOGOS.SHIB, alt: "SHIB" },
      { src: DEGEN_MEME_LOGOS.CASHCAT, alt: "CASH CAT" },
    ],
  },
] as const;

export function InvestorPathsSection() {
  return (
    <section id="investment-path" className={`${invSection} bg-deep scroll-mt-24`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Three Ways to Put Your Capital{" "}
            <span className="gradient-text">to Work.</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl ${invBody}`}>
            Different goals. Different risk levels. Different ways to invest.
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-6xl auto-rows-fr gap-5 lg:grid-cols-3 lg:gap-6">
          {PATHS.map((path, i) => (
            <FadeIn key={path.id} delay={i * 0.05} className="h-full">
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border px-6 py-9 text-center sm:px-7 sm:py-10 ${path.shell}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  aria-hidden
                >
                  {path.assets.map((asset, ai) => (
                    <div
                      key={`${asset.alt}-${ai}`}
                      className="absolute"
                      style={{
                        width: 36,
                        height: 36,
                        left: `${12 + (ai % 4) * 22}%`,
                        top: `${10 + Math.floor(ai / 4) * 28}%`,
                      }}
                    >
                      <Image
                        src={asset.src}
                        alt=""
                        width={36}
                        height={36}
                        className="object-contain opacity-80"
                      />
                    </div>
                  ))}
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="flex justify-center">
                    <span
                      className={`inline-flex min-h-[2.25rem] items-center justify-center rounded-xl border px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] sm:text-[0.78rem] ${path.labelClass}`}
                    >
                      {path.label}
                    </span>
                  </div>

                  <h3
                    className={`display mt-5 text-[1.45rem] font-semibold tracking-[-0.03em] sm:text-[1.6rem] ${path.titleClass}`}
                  >
                    {path.title}
                  </h3>

                  <div className={`mt-4 flex-1 space-y-3 ${invBody}`}>
                    {path.body.map((line) => (
                      <p key={line} className="text-balance">
                        {line}
                      </p>
                    ))}
                  </div>

                  <p className="mt-6 text-[0.98rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.05rem]">
                    {path.benefit}
                  </p>

                  <div className="mt-7 flex justify-center">
                    <Link
                      href={path.cta.href}
                      className={`${homeCta} inline-flex min-w-[12rem] px-5 py-3 text-[0.95rem]`}
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
