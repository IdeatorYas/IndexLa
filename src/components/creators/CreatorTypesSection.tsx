import { FadeIn } from "@/components/ui/FadeIn";
import { crH2, crSection } from "@/components/creators/creatorRhythm";

const types = [
  {
    label: "Crypto KOLs",
    tone: "border-electric/35 bg-electric/[0.08] shadow-[inset_0_1px_0_rgba(56,189,248,0.14)]",
  },
  {
    label: "Finance Influencers",
    tone: "border-purple/35 bg-purple/[0.08] shadow-[inset_0_1px_0_rgba(168,85,247,0.14)]",
  },
  {
    label: "YouTubers",
    tone: "border-danger/30 bg-danger/[0.07] shadow-[inset_0_1px_0_rgba(248,113,113,0.12)]",
  },
  {
    label: "Researchers",
    tone: "border-success/35 bg-success/[0.08] shadow-[inset_0_1px_0_rgba(52,211,153,0.14)]",
  },
] as const;

export function CreatorTypesSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Built For People With An{" "}
            <span className="gradient-text">Edge</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-3xl auto-rows-fr gap-3 sm:grid-cols-2">
          {types.map((type, i) => (
            <FadeIn
              key={type.label}
              className={`flex min-h-[5.25rem] items-center justify-center rounded-2xl border px-5 py-5 text-center ${type.tone}`}
              delay={0.03 * i}
            >
              <p className="display text-[1.12rem] font-semibold tracking-[-0.02em] text-ink uppercase">
                {type.label}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center">
          <p className="display text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold tracking-[-0.03em] text-ink text-balance">
            Your expertise.{" "}
            <span className="gradient-text">Our infrastructure.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
