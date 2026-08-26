import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ASSETS } from "@/lib/site";
import { DEGEN_MEME_LOGOS } from "@/components/degen-club/memeLogos";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

type StyleCard = {
  id: string;
  eyebrow: string;
  body: string[];
  highlight: string | null;
  risk: string | null;
  cta: { href: string; label: string };
  shell: string;
  eyebrowClass: string;
  glow: string;
  assets: { src: string; alt: string }[];
};

const STYLES: StyleCard[] = [
  {
    id: "core",
    eyebrow: "INDEXLA CORE",
    body: [
      "Build long-term exposure through diversified portfolios across crypto, tokenized stocks, commodities and real-world assets.",
    ],
    highlight: null,
    risk: null,
    cta: { href: "#discover-portfolios", label: "Explore Portfolios →" },
    shell:
      "border-blue/45 bg-gradient-to-b from-blue/[0.16] via-electric/[0.06] to-deep/80 shadow-[inset_0_1px_0_rgba(59,130,246,0.22)]",
    eyebrowClass: "text-electric",
    glow: "from-blue/25 via-electric/10 to-transparent",
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
    eyebrow: "STABLE CLUB",
    body: [
      "Put your stablecoins to work by supplying liquidity to decentralized exchanges.",
      "Earn trading fees while INDEXLA automates the position.",
    ],
    highlight: "No Lending · No Borrowing · No Extra Vault",
    risk: null,
    cta: { href: "/stable-club", label: "Explore Stable Club →" },
    shell:
      "border-cyan/45 bg-gradient-to-b from-cyan/[0.14] via-success/[0.07] to-deep/80 shadow-[inset_0_1px_0_rgba(34,211,238,0.2)]",
    eyebrowClass: "text-cyan",
    glow: "from-cyan/25 via-success/10 to-transparent",
    assets: [
      { src: "/images/assets/usdc.svg", alt: "USDC" },
      { src: "/images/assets/usdt.svg", alt: "USDT" },
    ],
  },
  {
    id: "degen",
    eyebrow: "DEGEN CLUB",
    body: [
      "A new way to chase the next 100x.",
      "Diversify across a basket of memecoins.",
    ],
    highlight:
      "Multiple Coins · Multiple Opportunities · More Chances to Catch a Winner",
    risk: "High Risk · High Volatility",
    cta: { href: "/degen-club", label: "Explore Degen Club →" },
    shell:
      "border-amber-400/40 bg-gradient-to-b from-amber-400/[0.14] via-orange-500/[0.08] to-deep/80 shadow-[inset_0_1px_0_rgba(251,191,36,0.18)]",
    eyebrowClass: "text-amber-300",
    glow: "from-amber-400/25 via-orange-500/10 to-transparent",
    assets: [
      { src: DEGEN_MEME_LOGOS.DOGE, alt: "DOGE" },
      { src: DEGEN_MEME_LOGOS.PEPE, alt: "PEPE" },
      { src: DEGEN_MEME_LOGOS.SHIB, alt: "SHIB" },
      { src: DEGEN_MEME_LOGOS.CASHCAT, alt: "CASH CAT" },
    ],
  },
];

function CardAssetBackdrop({
  assets,
}: {
  assets: { src: string; alt: string }[];
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.14] sm:opacity-[0.16]">
        {assets.map((asset, i) => {
          const positions = [
            "left-[6%] top-[12%]",
            "right-[8%] top-[18%]",
            "left-[12%] bottom-[22%]",
            "right-[10%] bottom-[16%]",
            "left-[42%] top-[8%]",
            "right-[28%] bottom-[28%]",
            "left-[28%] bottom-[10%]",
          ];
          const sizes = [44, 40, 36, 42, 34, 38, 32];
          const size = sizes[i % sizes.length];
          return (
            <div
              key={`${asset.alt}-${i}`}
              className={`absolute ${positions[i % positions.length]}`}
              style={{ width: size, height: size }}
            >
              <Image
                src={asset.src}
                alt=""
                width={size}
                height={size}
                className="h-full w-full object-contain opacity-90"
                unoptimized
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/55 to-void/80" />
    </div>
  );
}

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
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border px-5 py-7 text-center sm:px-6 sm:py-8 ${style.shell}`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${style.glow}`}
                  aria-hidden
                />
                <CardAssetBackdrop assets={style.assets} />
                <div className="relative z-10 flex h-full flex-col">
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
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
