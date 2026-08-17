import { FadeIn } from "@/components/ui/FadeIn";
import {
  tkH2,
  tkH3,
  tkSection,
  tkSurface,
} from "@/components/tokenomics/tokenomicsRhythm";

type FlywheelColumnData = {
  title: string;
  items: readonly { text: string; separator?: "+" | "↓" | null }[];
};

const flywheels: FlywheelColumnData[] = [
  {
    title: "Creators",
    items: [
      { text: "Create strategies", separator: null },
      { text: "Publish portfolios", separator: "↓" },
      { text: "Burn $DEXLA", separator: "↓" },
      { text: "Grow distribution", separator: "↓" },
      { text: "Monetize strategies", separator: "↓" },
    ],
  },
  {
    title: "Investors",
    items: [
      { text: "Hold $DEXLA", separator: null },
      { text: "Reduce execution fees", separator: "↓" },
      { text: "Discover portfolios", separator: "↓" },
      { text: "Follow creators", separator: "↓" },
      { text: "Tip creators", separator: "↓" },
    ],
  },
  {
    title: "Platform",
    items: [
      { text: "More portfolios", separator: null },
      { text: "More execution", separator: "+" },
      { text: "More Treasury activity", separator: "+" },
      { text: "More buybacks", separator: "↓" },
      { text: "Permanent burns", separator: "↓" },
    ],
  },
];

function FlywheelColumn({ title, items }: FlywheelColumnData) {
  return (
    <article className={`${tkSurface} flex h-full flex-col px-5 py-6 sm:px-6 sm:py-7`}>
      <h3 className={`${tkH3} uppercase text-electric`}>{title}</h3>
      <ol className="mt-5 flex flex-1 flex-col items-center justify-start text-center">
        {items.map((item) => (
          <li key={item.text} className="flex w-full flex-col items-center">
            {item.separator ? (
              <span
                className="my-1.5 text-[0.85rem] font-semibold text-muted-dim"
                aria-hidden
              >
                {item.separator}
              </span>
            ) : null}
            <p className="text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1rem]">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function TokenFlywheelSection() {
  return (
    <section className={`${tkSection} bg-void`}>
      <div className="section-pad container-max mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${tkH2} uppercase`}>
            The $DEXLA{" "}
            <span className="gradient-text">Flywheel</span>
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="grid gap-4 lg:grid-cols-3">
            {flywheels.map((column) => (
              <FlywheelColumn
                key={column.title}
                title={column.title}
                items={column.items}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
