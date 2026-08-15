import { FadeIn } from "@/components/ui/FadeIn";
import {
  DiscordLogo,
  TelegramLogo,
  XLogo,
  YouTubeLogo,
} from "@/components/creators/SocialBrandLogos";
import {
  crBody,
  crBodyStrong,
  crH2,
  crSection,
} from "@/components/creators/creatorRhythm";

const channels = [
  { name: "X", icon: XLogo },
  { name: "YouTube", icon: YouTubeLogo },
  { name: "Telegram", icon: TelegramLogo },
  { name: "Discord", icon: DiscordLogo },
] as const;

export function CreatorDistributionSection() {
  return (
    <section className={`${crSection} bg-void`}>
      <div className="section-pad container-max">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className={`${crH2} uppercase`}>
            Your Audience Is Already{" "}
            <span className="gradient-text">There</span>
          </h2>
          <p className={`mt-4 ${crBodyStrong} text-balance`}>
            Make INDEXLA Part Of Your Creator Business.
          </p>

          <p className={`mt-6 ${crBody} text-balance`}>
            Your audience already follows you across X, YouTube, Telegram,
            Discord, newsletters, and your link in bio.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {channels.map(({ name, icon: Icon }) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-void/45 py-2 pl-2.5 pr-3.5 text-ink"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[0.85rem] font-semibold">{name}</span>
              </span>
            ))}
          </div>

          <p className={`mt-8 ${crBody} text-balance`}>
            Put your INDEXLA portfolio or strategy in your profile, video
            descriptions, posts, and community channels.
          </p>

          <p className={`mt-4 ${crBody} text-balance`}>
            Your content creates attention. Your portfolio turns that attention
            into something people can use. Your strategy turns your knowledge
            into a product.
          </p>

          <p className={`mt-6 ${crBodyStrong} text-balance`}>
            One portfolio. One strategy. A permanent destination for the
            audience you already built.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
