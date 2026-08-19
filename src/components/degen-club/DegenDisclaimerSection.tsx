import { FadeIn } from "@/components/ui/FadeIn";
import { dcDisclaimer, dcH3, dcSection } from "@/components/degen-club/degenRhythm";

export function DegenDisclaimerSection({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  if (!paragraphs.length) return null;

  return (
    <section className={`${dcSection} border-t border-line bg-deep pb-20`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-void/50 px-5 py-6 sm:px-8 sm:py-8">
            <h2 className={`${dcH3} text-ink`}>Important Risk Disclaimer</h2>
            <div className="mt-4 space-y-3.5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={dcDisclaimer}>
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
