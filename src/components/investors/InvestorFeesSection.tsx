import { FadeIn } from "@/components/ui/FadeIn";
import {
  invGreenBox,
  invGreenText,
  invH2,
  invPremiumAccent,
  invSection,
} from "@/components/investors/investorRhythm";

export function InvestorFeesSection() {
  return (
    <section className={`${invSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${invH2} uppercase`}>
            Simple, Transparent{" "}
            <span className="gradient-text">Fees.</span>
          </h2>
          <p className="mt-5 text-[1.05rem] font-semibold tracking-[-0.015em] text-electric sm:text-[1.15rem]">
            0% Management · 0% Performance · 0% Exit
          </p>
          <div className="mt-8 grid auto-rows-fr gap-3 sm:grid-cols-3">
            {[
              { value: "0%", label: "Management" },
              { value: "0%", label: "Performance" },
              { value: "0%", label: "Exit" },
            ].map((item) => (
              <div
                key={item.label}
                className={`${invPremiumAccent} flex h-full min-h-[8.5rem] flex-col items-center justify-center px-5 py-7 text-center`}
              >
                <p className="display text-[2.2rem] leading-none text-electric sm:text-[2.5rem]">
                  {item.value}
                </p>
                <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-muted">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 inline-flex justify-center">
            <div className={invGreenBox}>
              <p className={invGreenText}>
                Only 1% Execution Fee When Trades Occur.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[1.02rem] font-semibold text-ink sm:text-[1.08rem]">
            No Trade. No Execution Fee.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
