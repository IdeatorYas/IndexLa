import { AssetLogo } from "@/components/ui/AssetLogo";
import { ASSETS, TYPE_STYLES, type Portfolio } from "@/lib/site";

type PortfolioCardProps = {
  portfolio: Portfolio;
  featured?: boolean;
};

export function PortfolioCard({ portfolio, featured = false }: PortfolioCardProps) {
  const typeStyle = TYPE_STYLES[portfolio.type];

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

      <div className="mt-5 flex flex-wrap gap-1.5">
        {portfolio.assets.map((key) => (
          <div
            key={key}
            className="flex items-center gap-1.5 rounded-full border border-line bg-void/50 py-0.5 pl-1 pr-2"
            title={ASSETS[key].name}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-panel/80">
              <AssetLogo asset={key} size={14} />
            </span>
            <span className="text-[0.7rem] font-semibold tracking-[-0.01em] text-ink/85">
              {ASSETS[key].ticker}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl bg-void/35 px-3.5 py-3">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Strategy
        </p>
        <p className="mt-1.5 text-[1.02rem] font-semibold leading-snug text-ink sm:text-[1.08rem]">
          {portfolio.strategy}
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        <p className="text-[0.62rem] uppercase tracking-[0.12em] text-muted-dim">
          Allocation
        </p>
        {portfolio.allocation.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-[0.88rem] text-muted">
              <span>{row.label}</span>
              <span>{row.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-purple/80 to-electric/80 motion-safe:animate-[bar-fill_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
