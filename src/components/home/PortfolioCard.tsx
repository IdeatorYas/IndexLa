import { HomePortfolioDonut } from "@/components/home/HomePortfolioDonut";
import { ASSETS, ASSET_BRAND_COLORS, TYPE_STYLES, type Portfolio } from "@/lib/site";

type PortfolioCardProps = {
  portfolio: Portfolio;
  featured?: boolean;
};

export function PortfolioCard({ portfolio, featured = false }: PortfolioCardProps) {
  const typeStyle = TYPE_STYLES[portfolio.type];
  const rows = portfolio.assetAllocation;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-deep/45 p-5 transition-transform duration-300 ease-out hover:-translate-y-[3px] sm:p-6 ${
        featured ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div>
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${typeStyle.className}`}
        >
          {typeStyle.label}
        </span>
        <h3 className="display mt-3 text-[clamp(1.15rem,2.4vw,1.4rem)] tracking-[-0.02em] text-ink text-balance text-pretty">
          {portfolio.name}
        </h3>
      </div>

      <div className="mt-5 rounded-xl bg-void/35 px-3.5 py-3">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Strategy
        </p>
        <p className="mt-1.5 text-[1.02rem] font-semibold leading-snug text-ink sm:text-[1.08rem]">
          {portfolio.strategy}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <HomePortfolioDonut segments={rows} size={212} />
      </div>

      <ul className="mt-5 space-y-2">
        {rows.map((row) => {
          const meta = ASSETS[row.key];
          return (
            <li
              key={row.key}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-void/30 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: ASSET_BRAND_COLORS[row.key] }}
                  aria-hidden
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.src}
                  alt=""
                  width={18}
                  height={18}
                  className="object-contain"
                  loading="lazy"
                  decoding="async"
                  aria-hidden
                />
                <span className="truncate text-[0.92rem] font-semibold text-ink">
                  {meta.ticker}
                </span>
              </div>
              <span className="shrink-0 text-[0.92rem] font-semibold tabular-nums text-electric">
                {row.pct}%
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
