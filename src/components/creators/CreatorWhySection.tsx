import { FadeIn } from "@/components/ui/FadeIn";
import { crBody, crSection, crSurface } from "@/components/creators/creatorRhythm";

export function CreatorWhySection() {
  return (
    <section className={`${crSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className={`${crSurface} px-6 py-8 text-center sm:px-10 sm:py-9`}>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-electric">
              Why INDEXLA
            </p>
            <p className={`mx-auto mt-4 max-w-2xl text-[1.08rem] font-medium leading-relaxed tracking-[-0.01em] text-ink text-balance sm:text-[1.15rem]`}>
              More than copy trading. More than signals.
            </p>
            <p className={`mx-auto mt-3 max-w-2xl ${crBody} text-balance`}>
              Turn your investment thesis into a portfolio your community can
              actually participate in.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
