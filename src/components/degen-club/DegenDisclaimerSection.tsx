import { FadeIn } from "@/components/ui/FadeIn";
import { dcH2, dcSection } from "@/components/degen-club/degenRhythm";

export function DegenDisclaimerSection({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  if (!paragraphs.length) return null;

  return (
    <section className={`${dcSection} border-t border-line bg-deep pb-24`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-void/50 px-5 py-6 sm:px-8 sm:py-8">
            <h2 className={`${dcH2} text-[clamp(1.25rem,2.5vw,1.65rem)] text-ink`}>
              Important Risk Disclaimer
            </h2>
            <div className="mt-5 space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-[0.96rem] leading-relaxed text-muted sm:text-[1rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
