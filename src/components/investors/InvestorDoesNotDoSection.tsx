import { FadeIn } from "@/components/ui/FadeIn";
import {
  invBody,
  invH2,
  invPremiumSurface,
  invSection,
} from "@/components/investors/investorRhythm";

const ITEMS = [
  {
    title: "No Custody",
    body: "INDEXLA does not take control of your wallet or capital.",
  },
  {
    title: "No Black-Box Decisions",
    body: "AI does not create, change or override your investment strategy.",
  },
  {
    title: "No Unauthorized Execution",
    body: "Actions remain restricted by your approved rules, limits, permissions and expiry.",
  },
  {
    title: "No Guaranteed Returns",
    body: "INDEXLA provides execution infrastructure—not financial advice or return guarantees.",
  },
] as const;

export function InvestorDoesNotDoSection() {
  return (
    <section className={`${invSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            What INDEXLA{" "}
            <span className="gradient-text">Does Not Do.</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.04}>
          <div className="mx-auto grid max-w-5xl auto-rows-fr gap-3 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <article
                key={item.title}
                className={`${invPremiumSurface} flex h-full min-h-[11rem] flex-col px-5 py-7 text-center sm:px-6 sm:py-8`}
              >
                <h3 className="display text-[1.2rem] font-semibold tracking-[-0.02em] text-electric sm:text-[1.3rem]">
                  {item.title}
                </h3>
                <p className={`mt-4 flex-1 ${invBody}`}>{item.body}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
