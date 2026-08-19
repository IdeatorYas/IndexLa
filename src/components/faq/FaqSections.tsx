import { FadeIn } from "@/components/ui/FadeIn";
import { FaqAccordionItem } from "@/components/faq/FaqAccordionItem";
import { FaqDisclaimer } from "@/components/faq/FaqDisclaimer";
import type { FaqBlock, FaqSection } from "@/lib/faq";

export function FaqSections({
  sections,
  disclaimer,
}: {
  sections: FaqSection[];
  disclaimer: FaqBlock[];
}) {
  return (
    <div className="border-t border-line bg-deep pb-20 md:pb-28">
      <div className="section-pad container-max">
        <div className="mx-auto max-w-3xl space-y-12 md:space-y-16">
          {sections.map((section) => {
            const isSafety = section.id.includes("security");
            return (
              <FadeIn key={section.id}>
                <section id={section.id} className="scroll-mt-28">
                  <div
                    className={
                      isSafety
                        ? "flex items-end justify-between gap-4 border-b border-line border-l-2 border-l-electric/50 pb-4 pl-4 sm:pl-5"
                        : "flex items-end justify-between gap-4 border-b border-line pb-4"
                    }
                  >
                    <h2 className="display text-[clamp(1.55rem,3.2vw,2.15rem)] tracking-[-0.02em] text-ink">
                      {section.title}
                    </h2>
                    <p className="shrink-0 pb-1 text-[0.75rem] font-semibold tabular-nums text-muted-dim">
                      {String(section.items.length).padStart(2, "0")}
                    </p>
                  </div>

                  <div>
                    {section.items.map((item) => (
                      <FaqAccordionItem key={item.q} item={item} />
                    ))}
                  </div>
                </section>
              </FadeIn>
            );
          })}

          <FaqDisclaimer blocks={disclaimer} />
        </div>
      </div>
    </div>
  );
}
