import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { ASSETS } from "@/lib/site";
import { DEGEN_MEME_LOGOS } from "@/components/degen-club/memeLogos";
import {
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

type StyleCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  benefit: string;
  cta: { href: string; label: string };
  shell: string;
  titleClass: string;
  labelClass: string;
  glow: string;
  assets: { src: string; alt: string }[];
};

const STYLES: StyleCard[] = [
  {
    id: "core",
    label: "Long-Term Investors",
    title: "INDEXLA CORE",
    description:
      "Build diversified portfolios across crypto, tokenized stocks, commodities and real-world assets. Automate your strategy while retaining direct ownership.",
    benefit: "Long-Term · Diversified · Direct Ownership",
    cta: { href: "/#discover-portfolios", label: "Explore Portfolios →" },
    shell:
      "border-blue/45 bg-gradient-to-b from-blue/[0.16] via-electric/[0.06] to-deep/80 shadow-[inset_0_1px_0_rgba(59,130,246,0.22)]",
    titleClass: "text-electric",
    labelClass:
      "border-electric/40 bg-electric/15 text-electric shadow-[inset_0_1px_0_rgba(56,189,248,0.18)]",
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
    label: "Stablecoin Yield Seekers",
    title: "STABLE CLUB",
    description:
      "Supply stablecoin liquidity to decentralized exchanges and earn trading fees. INDEXLA automates your position while you retain control.",
    benefit: "No Lending · No Borrowing · No Extra Vault",
    cta: { href: "/stable-club", label: "Explore Stable Club →" },
    shell:
      "border-cyan/45 bg-gradient-to-b from-cyan/[0.14] via-success/[0.07] to-deep/80 shadow-[inset_0_1px_0_rgba(34,211,238,0.2)]",
    titleClass: "text-cyan",
    labelClass:
      "border-cyan/40 bg-cyan/15 text-cyan shadow-[inset_0_1px_0_rgba(34,211,238,0.18)]",
    glow: "from-cyan/25 via-success/10 to-transparent",
    assets: [
      { src: "/images/assets/usdc.svg", alt: "USDC" },
      { src: "/images/assets/usdt.svg", alt: "USDT" },
    ],
  },
  {
    id: "degen",
    label: "High-Risk Traders",
    title: "DEGEN CLUB",
    description:
      "Build diversified memecoin baskets to chase high-upside opportunities. Multiply your chances instead of betting everything on one coin.",
    benefit: "Multiple Coins · Multiple Opportunities · High Volatility",
    cta: { href: "/degen-club", label: "Explore Degen Club →" },
    shell:
      "border-amber-400/40 bg-gradient-to-b from-amber-400/[0.14] via-orange-500/[0.08] to-deep/80 shadow-[inset_0_1px_0_rgba(251,191,36,0.18)]",
    titleClass: "text-amber-300",
    labelClass:
      "border-amber-400/40 bg-amber-400/15 text-amber-200 shadow-[inset_0_1px_0_rgba(251,191,36,0.18)]",
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
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem]"
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

        <div className="mx-auto mt-10 grid max-w-6xl auto-rows-fr gap-5 lg:grid-cols-3 lg:gap-6">
          {STYLES.map((style, i) => (
            <FadeIn key={style.id} delay={i * 0.05} className="h-full">
              <article
                className={`relative grid h-full overflow-hidden rounded-[1.5rem] border px-6 py-9 text-center sm:px-7 sm:py-10 ${style.shell}`}
                style={{
                  gridTemplateRows: "auto auto 1fr auto auto",
                }}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${style.glow}`}
                  aria-hidden
                />
                <CardAssetBackdrop assets={style.assets} />

                <div className="relative z-10 flex justify-center">
                  <span
                    className={`inline-flex min-h-[2.25rem] items-center justify-center rounded-xl border px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] sm:text-[0.78rem] ${style.labelClass}`}
                  >
                    {style.label}
                  </span>
                </div>

                <p
                  className={`relative z-10 mt-5 display min-h-[2rem] text-[1.15rem] font-bold uppercase leading-none tracking-[0.14em] sm:min-h-[2.2rem] sm:text-[1.3rem] ${style.titleClass}`}
                >
                  {style.title}
                </p>

                <p className="relative z-10 mt-6 text-[1.08rem] font-medium leading-[1.55] text-muted text-balance sm:text-[1.15rem]">
                  {style.description}
                </p>

                <p className="relative z-10 mt-6 text-[1.05rem] font-semibold leading-snug tracking-[-0.015em] text-ink text-balance sm:text-[1.12rem]">
                  {style.benefit}
                </p>

                <div className="relative z-10 mt-8 flex justify-center">
                  <Link
                    href={style.cta.href}
                    className="inline-flex items-center text-[1.1rem] font-semibold leading-none text-electric transition-colors hover:text-ink"
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
