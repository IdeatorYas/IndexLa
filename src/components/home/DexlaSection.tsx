import { FadeIn } from "@/components/ui/FadeIn";
import { HomeReadMore } from "@/components/home/HomeReadMore";
import {
  homeBody,
  homeEyebrow,
  homeH2,
  homeH3,
  homeSection,
} from "@/components/home/homeRhythm";

type Tone = "utility" | "burn";

type DexlaItem = {
  n: string;
  title: string;
  body: string;
  note?: string;
  metric: string[];
};

const utilities: DexlaItem[] = [
  {
    n: "01",
    title: "Publish",
    body: "Creators use $DEXLA to publish public portfolios and indexes on the INDEXLA Marketplace.",
    note: "Private portfolios remain free for building and testing before going public.",
    metric: ["1,000 $DEXLA → Public Portfolio"],
  },
  {
    n: "02",
    title: "Feature",
    body: "Creators use $DEXLA to feature a published portfolio at the top of the INDEXLA Marketplace for 7 days.",
    note: "This is a Marketing Option.",
    metric: ["2,500 $DEXLA → 7 Days Featured"],
  },
  {
    n: "03",
    title: "Save",
    body: "Investors holding $DEXLA receive lower execution fees while maintaining the required balance.",
    metric: [
      "2,500 → 10% discount",
      "5,000 → 25% discount",
      "10,000 → 40% discount",
      "Hold $DEXLA → Save on execution",
    ],
  },
  {
    n: "04",
    title: "Tip Creators",
    body: "Investors and followers can tip creators directly in $DEXLA for research, portfolio construction, market views, and community contribution.",
    metric: ["Discover → Follow → Invest → Tip"],
  },
];

const burns: DexlaItem[] = [
  {
    n: "01",
    title: "Publishing Burn",
    body: "Every public portfolio or index permanently burns 1,000 $DEXLA from the token supply.",
    metric: ["More portfolios → More $DEXLA burned"],
  },
  {
    n: "02",
    title: "Featured Burn",
    body: "Every Featured promotion permanently burns 2,500 $DEXLA from the token supply.",
    note: "Creators can promote again as their audience, AUM, and volume grow.",
    metric: ["More promotion → More $DEXLA burned"],
  },
  {
    n: "03",
    title: "Execution Fee Buyback & Burn",
    body: "10% of INDEXLA’s execution fee revenue is used to buy and permanently burn $DEXLA.",
    metric: ["More execution volume → More $DEXLA burned"],
  },
  {
    n: "04",
    title: "Treasury Buyback & Burn",
    body: "25% of realized Treasury profits are used to buy and permanently burn $DEXLA.",
    note: "Treasury gains are generated from protocol-owned capital, not investor funds.",
    metric: ["More Treasury gains → More $DEXLA burned"],
  },
];

function LayerCard({
  item,
  tone,
}: {
  item: DexlaItem;
  tone: Tone;
}) {
  const num = tone === "utility" ? "text-success" : "text-danger";
  const rule =
    tone === "utility" ? "border-success/20" : "border-danger/20";
  const metric =
    tone === "utility"
      ? "border-success/30 bg-success/[0.08] text-success"
      : "border-danger/30 bg-danger/[0.08] text-danger";

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-void/35 px-5 py-5 sm:px-6 sm:py-6 ${rule}`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`display text-[0.95rem] tabular-nums tracking-[0.08em] ${num}`}
        >
          {item.n}
        </span>
        <h4 className="display text-[clamp(1.05rem,2vw,1.25rem)] tracking-[-0.02em] text-ink uppercase text-balance">
          {item.title}
        </h4>
      </div>
      <p className={`mt-3 ${homeBody}`}>{item.body}</p>
      {item.note ? <p className={`mt-2 ${homeBody}`}>{item.note}</p> : null}
      <div className="mt-auto pt-4">
        <div className={`rounded-xl border px-3.5 py-3 ${metric}`}>
          {item.metric.map((line) => (
            <p
              key={line}
              className="text-[0.92rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[0.98rem]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function LayerGroup({
  tone,
  eyebrow,
  title,
  accentWord,
  items,
}: {
  tone: Tone;
  eyebrow: string;
  title: string;
  accentWord: string;
  items: DexlaItem[];
}) {
  const shell =
    tone === "utility"
      ? "border-success/35 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.14),0_0_48px_-16px_rgba(52,211,153,0.35)]"
      : "border-danger/35 shadow-[inset_0_1px_0_0_rgba(248,113,113,0.14),0_0_48px_-16px_rgba(248,113,113,0.35)]";
  const glow =
    tone === "utility"
      ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(52,211,153,0.14), transparent 70%)"
      : "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(248,113,113,0.14), transparent 70%)";
  const accent = tone === "utility" ? "text-success" : "text-danger";

  return (
    <div className={`relative overflow-hidden rounded-3xl border bg-panel/40 ${shell}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: glow }}
        aria-hidden
      />
      <div className="relative p-5 sm:p-7">
        <p
          className={`text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${accent}`}
        >
          {eyebrow}
        </p>
        <h3 className={`mt-2 ${homeH3} uppercase`}>
          {title} <span className={accent}>{accentWord}</span>
        </h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((item) => (
            <LayerCard key={item.n} item={item} tone={tone} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DexlaSection() {
  return (
    <section className={`${homeSection} relative overflow-hidden bg-deep`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 20% 0%, rgba(52,211,153,0.08), transparent 60%), radial-gradient(ellipse 55% 40% at 80% 0%, rgba(248,113,113,0.08), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="section-pad container-max relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className={homeEyebrow}>$DEXLA</p>
          <h2 className={`mt-4 ${homeH2}`}>
            The Economic Engine{" "}
            <span className="gradient-text">Of INDEXLA</span>
          </h2>
          <div className={`mx-auto mt-6 max-w-xl space-y-3 ${homeBody}`}>
            <p>Most tokens are built around speculation.</p>
            <p className="font-semibold text-ink">
              $DEXLA is built around INDEXLA usage.
            </p>
            <p>
              The token connects creators, investors, and platform activity
              through four practical utilities and four permanent
              supply-reduction mechanisms.
            </p>
          </div>
        </FadeIn>

        <FadeIn className="mx-auto mt-8 max-w-lg" delay={0.04}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.14] bg-panel/60 px-4 py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_40px_-12px_rgba(56,189,248,0.25)] sm:px-6 sm:py-5">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(52,211,153,0.09) 0%, transparent 40%, transparent 60%, rgba(248,113,113,0.09) 100%)",
              }}
              aria-hidden
            />
            <div className="relative flex items-stretch justify-center">
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-1 text-center sm:px-3">
                <p className="display text-[clamp(1.75rem,5vw,2.25rem)] leading-none tracking-[-0.04em] text-success">
                  4
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-success sm:text-[0.7rem]">
                  Core Utilities
                </p>
              </div>
              <div
                className="flex w-8 shrink-0 flex-col items-center justify-center sm:w-10"
                aria-hidden
              >
                <span className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />
                <span className="mt-1 display text-[0.85rem] text-muted-dim">
                  ·
                </span>
                <span className="mt-1 h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-10" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-2 py-1 text-center sm:px-3">
                <p className="display text-[clamp(1.75rem,5vw,2.25rem)] leading-none tracking-[-0.04em] text-danger">
                  4
                </p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-danger sm:text-[0.7rem]">
                  Burn Mechanisms
                </p>
              </div>
            </div>
            <p className={`relative mt-3 border-t border-white/[0.07] pt-3 text-center ${homeBody}`}>
              More creators. More portfolios. More activity. More reasons to use
              $DEXLA.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 xl:grid-cols-2 xl:gap-6">
          <FadeIn delay={0.06}>
            <LayerGroup
              tone="utility"
              eyebrow="Value layer"
              title="Four Core"
              accentWord="Utilities"
              items={utilities}
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <LayerGroup
              tone="burn"
              eyebrow="Supply reduction layer"
              title="Four Burn"
              accentWord="Mechanisms"
              items={burns}
            />
          </FadeIn>
        </div>

        <FadeIn className="mt-8 text-center" delay={0.12}>
          <HomeReadMore href="/tokenomics" className="mt-0" />
        </FadeIn>
      </div>
    </section>
  );
}
