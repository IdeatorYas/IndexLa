"use client";

import { FadeIn } from "@/components/ui/FadeIn";

const channels = [
  {
    title: "X / TWITTER",
    body: "Share your thesis. Discuss your portfolio. Explain allocation changes.",
  },
  {
    title: "YOUTUBE",
    body: "Build videos around your strategy, market views, and portfolio performance.",
  },
  {
    title: "TELEGRAM / DISCORD",
    body: "Give your community a live portfolio they can discover and follow.",
  },
  {
    title: "EDUCATION",
    body: "Teach people why you selected the assets, allocations, and strategy.",
  },
];

const pipeline = [
  "Creator Content",
  "Portfolio",
  "Investor Capital",
  "AUM",
  "Trading Activity",
  "Creator Earnings",
];

export function CreatorDistributionSection() {
  return (
    <section className="relative border-t border-line bg-void py-14 md:py-20">
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)] uppercase tracking-[-0.02em] text-balance">
            Turn Your Content Into{" "}
            <span className="gradient-text">A Distribution Engine.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">
            Keep doing what you already do.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => (
            <FadeIn key={channel.title} delay={i * 0.04}>
              <article className="h-full rounded-[1.2rem] glass-soft p-5">
                <h3 className="display text-[1.1rem]">{channel.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {channel.body}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-8">
          <p className="max-w-3xl text-[1.02rem] leading-relaxed text-muted">
            Instead of sending your audience to another temporary signal or
            affiliate link, give them something that can keep growing with your
            audience.
          </p>
        </FadeIn>

        <FadeIn className="mt-8">
          <div className="overflow-hidden rounded-[1.5rem] glass p-5 sm:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Distribution engine
            </p>
            <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {pipeline.map((item, i) => (
                <li key={item} className="relative">
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-void/45 p-4">
                    <span className="text-[0.65rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 text-sm font-semibold leading-snug text-ink">
                      {item}
                    </span>
                    <div className="mt-3 h-1 rounded-full bg-gradient-to-r from-purple to-electric" />
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-center text-sm font-semibold text-ink sm:text-left">
              Your content → Your portfolio → Investor capital → AUM → Trading
              activity → Creator earnings
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mt-8 space-y-2 text-[1.02rem] leading-relaxed text-muted">
          <p>Keep educating.</p>
          <p>Keep promoting.</p>
          <p>Keep building.</p>
          <p className="pt-3 display text-[clamp(1.1rem,2.2vw,1.4rem)] text-ink">
            Your portfolio becomes part of your content and your content becomes
            distribution for your portfolio.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
