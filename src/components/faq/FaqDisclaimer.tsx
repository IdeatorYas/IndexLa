import { FadeIn } from "@/components/ui/FadeIn";
import { FaqAnswer } from "@/components/faq/FaqAnswer";
import type { FaqBlock } from "@/lib/faq";

export function FaqDisclaimer({ blocks }: { blocks: FaqBlock[] }) {
  if (!blocks.length) return null;

  return (
    <FadeIn>
      <section id="important-disclaimer" className="scroll-mt-28">
        <div className="rounded-2xl border border-line bg-void/40 px-5 py-6 sm:px-7 sm:py-7">
          <h2 className="display text-[clamp(1.35rem,2.8vw,1.75rem)] tracking-[-0.02em] text-ink">
            Important Disclaimer
          </h2>
          <div className="mt-4">
            <FaqAnswer blocks={blocks} />
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
