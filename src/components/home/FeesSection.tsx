import { FadeIn } from "@/components/ui/FadeIn";
import {
  homeBody,
  homeH2,
  homeLede,
  homeSection,
} from "@/components/home/homeRhythm";

const zeros = [
  { value: "0%", label: "management fees" },
  { value: "0%", label: "performance fees" },
  { value: "0%", label: "exit fees" },
] as const;

export function FeesSection() {
  return (
    <section className={`${homeSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="max-w-3xl">
          <h2 className={homeH2}>Simple Economics</h2>
          <p className={homeLede}>Pay for execution, not management.</p>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="rounded-3xl glass px-6 py-8 text-center sm:px-10">
            <p className="display text-[clamp(2.6rem,7vw,4rem)] leading-none gradient-text">
              1%
            </p>
            <p className="mt-3 text-sm font-semibold text-ink">execution fee</p>
            <p className="mt-3 text-sm text-muted">No subscription required.</p>
          </div>
        </FadeIn>

        <FadeIn className="mt-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {zeros.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-line bg-deep/50 px-6 py-8 text-center"
              >
                <p className="display text-[2.35rem] leading-none text-ink sm:text-[2.6rem]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold tracking-[0.04em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 max-w-3xl">
          <p className={homeBody}>
            Creator portfolios share 50% of applicable execution fees with the
            creator.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
