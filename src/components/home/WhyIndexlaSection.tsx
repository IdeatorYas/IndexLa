import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  {
    title: "Multi Asset",
    body: "Build portfolios across crypto, tokenized assets, commodities, RWAs, and hybrid assets.",
  },
  {
    title: "Multi Chain",
    body: "Coordinate portfolio activity across supported networks.",
  },
  {
    title: "Non Custodial",
    body: "Users retain control of their assets while smart contract permissions constrain authorized execution.",
  },
  {
    title: "Programmable",
    body: "Turn predefined investment rules into automated portfolio actions.",
  },
  {
    title: "Creator Native",
    body: "Creators can transform investment theses into persistent portfolio products and participate economically in portfolio activity.",
  },
] as const;

export function WhyIndexlaSection() {
  return (
    <section className="relative border-t border-line bg-void py-20 md:py-28 lg:py-32">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.3rem)] tracking-[-0.03em] text-balance">
            Why INDEXLA
          </h2>
          <p className="mt-5 text-[1.15rem] font-semibold leading-snug text-ink">
            One infrastructure layer for programmable portfolios.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pillars.map((pillar, i) => (
            <FadeIn
              key={pillar.title}
              delay={i * 0.05}
              className={i === pillars.length - 1 ? "md:col-span-2 xl:col-span-1" : ""}
            >
              <article className="h-full rounded-3xl border border-line bg-deep/55 p-6 text-center sm:p-7">
                <h3 className="display text-[1.35rem] tracking-[-0.02em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                  {pillar.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
