import { FadeIn } from "@/components/ui/FadeIn";
import { FaqAccordionItem } from "@/components/faq/FaqAccordionItem";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import { homeH2, homeSection } from "@/components/home/homeRhythm";
import { loadFaq } from "@/lib/faq.server";
import type { FaqItem } from "@/lib/faq";

const HOME_FAQ_QUESTIONS = [
  "11. Is INDEXLA non-custodial?",
  "60. Can INDEXLA or an AI agent withdraw my funds?",
  "35. Does INDEXLA charge management, performance, subscription or exit fees?",
  "10. Can I directly own the underlying assets?",
  "17. Can I disable or revoke automation?",
  "26. How much do Creators earn from portfolio activity?",
];

function getHomeFaqPreview(): FaqItem[] {
  const { sections } = loadFaq();
  const byQuestion = new Map(
    sections.flatMap((section) => section.items).map((item) => [item.q, item])
  );

  return HOME_FAQ_QUESTIONS.map((question) => byQuestion.get(question)).filter(
    (item): item is FaqItem => item != null
  );
}

export function HomeFaqSection() {
  const faqs = getHomeFaqPreview();

  return (
    <section className={`${homeSection} bg-deep`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={homeH2}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-2xl border border-line bg-void/40 px-5 sm:px-7">
            {faqs.map((item) => (
              <FaqAccordionItem key={item.q} item={item} />
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mt-8 text-center">
          <HomeReadMore href="/faq" label="View All FAQs →" />
        </FadeIn>
      </div>
    </section>
  );
}
