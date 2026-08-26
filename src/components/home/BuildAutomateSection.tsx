import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeH2,
  homeSection,
} from "@/components/home/homeRhythm";

const RULES = [
  "DCA",
  "Rebalancing",
  "Buy Fear",
  "Sell Greed",
  "RSI",
  "Momentum",
  "Take Profit",
  "Stop Loss",
] as const;

const STEPS = [
  "Connect",
  "Build or Discover",
  "Set Rules",
  "Activate",
] as const;

const PERMISSIONS = [
  { can: true, text: "INDEXLA can execute approved actions." },
  { can: false, text: "INDEXLA cannot withdraw your funds." },
  { can: false, text: "INDEXLA cannot expand its permissions." },
  { can: true, text: "You can revoke access at any time." },
] as const;

export function BuildAutomateSection() {
  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="text-center">
          <h2 className={homeH2}>
            Set the Rules Once.{" "}
            <span className="gradient-text">Let INDEXLA Execute.</span>
          </h2>
          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {RULES.map((rule) => (
              <span
                key={rule}
                className="rounded-full border border-line bg-void/45 px-3.5 py-1.5 text-[0.95rem] font-semibold text-ink"
              >
                {rule}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-void/45 p-5 sm:p-7">
            <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted-dim">
              How it works
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {STEPS.map((step, i) => (
                <div key={step} className="relative text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-electric/30 bg-electric/10">
                    <span className="display text-[1rem] font-semibold text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.95rem] font-semibold leading-snug text-ink sm:text-[1.02rem]">
                    {step}
                  </p>
                  {i < STEPS.length - 1 ? (
                    <span
                      className="pointer-events-none absolute right-0 top-5 hidden translate-x-1/2 text-muted-dim sm:inline"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {PERMISSIONS.map((item) => (
              <div
                key={item.text}
                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 sm:px-5 ${
                  item.can
                    ? "border-success/30 bg-success/[0.08]"
                    : "border-danger/25 bg-danger/[0.08]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-bold ${
                    item.can
                      ? "bg-success/15 text-success"
                      : "bg-danger/15 text-danger"
                  }`}
                  aria-hidden
                >
                  {item.can ? "✓" : "✕"}
                </span>
                <p className={`${homeBody} text-left text-ink`}>{item.text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <HomeReadMore href="/strategies" label="Explore Strategies →" />
          <HomeReadMore
            href="/whitepaper/technical"
            label="Technical Architecture →"
          />
          <HomeReadMore
            href="/whitepaper/15-security-privacy-mev-protection"
            label="Security & Permissions →"
          />
        </FadeIn>
      </div>
    </section>
  );
}
