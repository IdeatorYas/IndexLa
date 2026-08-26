import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import { homeSection } from "@/components/home/homeRhythm";

export function HomeDisclaimerSection() {
  return (
    <section className={`${homeSection} bg-void pb-16`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-deep/55 px-5 py-6 text-center sm:px-8 sm:py-8">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted-dim">
              Disclaimer
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted text-pretty text-balance sm:text-[1.02rem]">
              Digital assets, tokenized assets, liquidity strategies and
              automated execution involve significant risk, including possible
              loss of capital. Nothing on this website constitutes investment,
              financial, legal or tax advice. Returns are not guaranteed.
              Availability may vary by jurisdiction.
            </p>
            <div className="mt-6">
              <HomeReadMore
                href="/whitepaper/disclaimer"
                label="Full Disclaimer →"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
