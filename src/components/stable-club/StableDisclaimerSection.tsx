import { FadeIn } from "@/components/ui/FadeIn";
import { scDisclaimer, scH3, scSectionAlt } from "@/components/stable-club/stableRhythm";
import type { ParsedStableClub } from "@/lib/stable-club";

export function StableDisclaimerSection({
  disclaimer,
}: {
  disclaimer: ParsedStableClub["disclaimer"];
}) {
  if (!disclaimer.paragraphs.length) return null;

  return (
    <section className={`${scSectionAlt} pb-16`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-void/50 px-5 py-6 sm:px-8 sm:py-8">
            <h2 className={`${scH3} text-ink`}>{disclaimer.title}</h2>
            <div className="mt-4 space-y-3.5">
              {disclaimer.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={scDisclaimer}>
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
