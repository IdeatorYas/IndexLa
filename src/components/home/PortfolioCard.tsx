import { HomePortfolioDonut } from "@/components/home/HomePortfolioDonut";
import type { HomeDiscoverProduct } from "@/lib/homeMarketplaceProducts";

type PortfolioCardProps = {
  product: HomeDiscoverProduct;
};

export function PortfolioCard({ product }: PortfolioCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-deep/45 p-5 transition-transform duration-300 ease-out hover:-translate-y-[3px] sm:p-6">
      <div>
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${product.typeClassName}`}
        >
          {product.typeLabel}
        </span>
        <h3 className="display mt-3 text-[clamp(1.2rem,2.4vw,1.45rem)] tracking-[-0.02em] text-ink text-balance text-pretty">
          {product.name}
        </h3>
      </div>

      <div className="mt-5 rounded-xl bg-void/35 px-3.5 py-3">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Strategy
        </p>
        <p className="mt-1.5 text-[1.02rem] font-semibold leading-snug text-ink sm:text-[1.08rem]">
          {product.strategy}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <HomePortfolioDonut
          segments={product.assets.map((a) => ({
            ticker: a.ticker,
            percent: a.percent,
            color: a.color,
            src: a.src,
          }))}
          size={220}
        />
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-1.5">
        {product.assets.map((row) => (
          <li
            key={row.ticker}
            className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.05] bg-void/30 px-2.5 py-1.5"
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: row.color }}
                aria-hidden
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.src}
                alt=""
                width={16}
                height={16}
                className="object-contain"
                loading="lazy"
                decoding="async"
                aria-hidden
              />
              <span className="truncate text-[0.82rem] font-semibold text-ink">
                {row.ticker}
              </span>
            </div>
            <span className="shrink-0 text-[0.82rem] font-semibold tabular-nums text-electric">
              {row.percent}%
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
