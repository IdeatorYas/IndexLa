export type FaqItem = {
  q: string;
  a: string[];
};

export type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

/** Exact FAQ content from content/faq.md */
export const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "What is INDEXLA?",
        a: [
          "INDEXLA is a **non-custodial portfolio management and automation layer** where users can build and manage portfolios across supported crypto, tokenized stocks, commodities, RWAs, and hybrid assets.",
        ],
      },
      {
        q: "How do I get started?",
        a: [
          "Connect your wallet, choose your assets, set your allocations, select your strategy, and create your portfolio. You can manage it manually or enable automation.",
        ],
      },
      {
        q: "What makes INDEXLA different from a traditional trading bot?",
        a: [
          "INDEXLA does not take custody of your assets. Your assets remain in your wallet while smart contracts, strategy rules, AI monitoring, and cross-chain execution coordinate the actions you authorize.",
        ],
      },
      {
        q: "What can I invest in?",
        a: [
          "Depending on availability and jurisdiction, INDEXLA supports crypto, tokenized stocks, commodities, RWAs, and hybrid portfolios combining supported asset classes.",
        ],
      },
      {
        q: "Do I need to actively trade?",
        a: [
          "No. You can manage a portfolio manually or define rules that automate actions such as DCA, rebalancing, take profit, stop loss, Fear & Greed, RSI, and momentum strategies.",
        ],
      },
      {
        q: "Is INDEXLA available across multiple chains?",
        a: [
          "INDEXLA supports **cross-chain execution** across supported networks and assets.",
        ],
      },
    ],
  },
  {
    id: "safety-risk",
    title: "Safety & Risk",
    items: [
      {
        q: "Who controls my assets?",
        a: [
          "You do. INDEXLA is non-custodial and your assets remain under your wallet control.",
        ],
      },
      {
        q: "Can INDEXLA withdraw my funds?",
        a: [
          "No. INDEXLA cannot independently withdraw or take custody of your assets. Transactions are executed according to the permissions and rules you authorize.",
        ],
      },
      {
        q: "What happens if INDEXLA goes offline?",
        a: [
          "Your assets do not disappear. They remain in your wallet. Automated monitoring and execution may stop while the relevant infrastructure is unavailable, but your underlying assets remain under your control.",
        ],
      },
      {
        q: "Can I stop an automated strategy?",
        a: [
          "Yes. You can disable or revoke automation according to the permissions configured for your portfolio.",
        ],
      },
      {
        q: "Can I lose money?",
        a: [
          "Yes. All investments carry risk, including the possibility of partial or total loss of capital.",
        ],
      },
      {
        q: "What can affect execution?",
        a: [
          "Execution can be affected by market volatility, liquidity, slippage, network conditions, gas costs, asset availability, and other execution factors.",
        ],
      },
      {
        q: "Are returns guaranteed?",
        a: [
          "No. INDEXLA does not guarantee profitable performance. Automation provides consistency, not guaranteed returns.",
        ],
      },
      {
        q: "Does INDEXLA provide financial advice?",
        a: [
          "No. Users choose their assets, allocations, strategies, and execution parameters. INDEXLA provides the infrastructure to implement those choices.",
        ],
      },
      {
        q: "Does AI decide what I should invest in?",
        a: [
          "No. AI monitors relevant market conditions and coordinates the execution workflow. It does not take custody of your assets or independently decide what you should invest in.",
        ],
      },
      {
        q: "What happens if INDEXLA shuts down?",
        a: [
          "Your assets remain in your wallet because INDEXLA is non-custodial. If INDEXLA infrastructure stops operating, automated monitoring and execution may stop, but the underlying assets are not held by INDEXLA.",
        ],
      },
    ],
  },
  {
    id: "strategies-automation",
    title: "Strategies & Automation",
    items: [
      {
        q: "What strategies can I use?",
        a: [
          "Supported strategies include:",
          "**Fear & Greed · RSI · Momentum · Take Profit · Stop Loss · Rebalancing · DCA**",
        ],
      },
      {
        q: "Can I combine strategies?",
        a: [
          "Yes. Supported strategies can be combined within a portfolio according to the available configuration and rules.",
          "For example, a portfolio could use Fear & Greed for accumulation, a stop loss for downside protection, and rebalancing to maintain target allocations.",
        ],
      },
      {
        q: "How does Buy Fear / Sell Greed work?",
        a: [
          "The strategy accumulates when market sentiment reaches your defined Fear conditions and reduces exposure when your defined Greed conditions are reached.",
        ],
      },
      {
        q: "How does RSI automation work?",
        a: [
          "You define RSI conditions such as oversold or overbought thresholds. INDEXLA monitors the signal and executes according to your rules when conditions are met.",
        ],
      },
      {
        q: "What does AI actually do?",
        a: [
          "AI monitors the market conditions relevant to your strategy, evaluates signals, and coordinates the execution workflow.",
          "The rules you define determine what action can be taken.",
        ],
      },
      {
        q: "Can I customize my strategy?",
        a: [
          "Yes. Supported strategies allow you to define relevant conditions, thresholds, allocations, and execution parameters.",
        ],
      },
      {
        q: "Can I turn automation off?",
        a: [
          "Yes. You can disable or revoke automation according to your configured permissions.",
        ],
      },
    ],
  },
  {
    id: "fees-dexla",
    title: "Fees & $DEXLA",
    items: [
      {
        q: "What does INDEXLA charge?",
        a: [
          "INDEXLA charges a **1% execution fee** on eligible portfolio activity.",
        ],
      },
      {
        q: "How do Creators earn?",
        a: [
          "Creators receive **50% of the applicable execution fees** generated by their portfolios.",
        ],
      },
      {
        q: "How does $DEXLA work?",
        a: [
          "$DEXLA is the native utility token of the INDEXLA ecosystem.",
          "Its primary utilities include public portfolio publishing and execution-fee discounts.",
        ],
      },
      {
        q: "How much $DEXLA is required to publish?",
        a: [
          "Once $DEXLA utility is live, publishing a public portfolio or index requires a permanent burn of **1,000 $DEXLA**.",
          "Private portfolios do not require the burn.",
        ],
      },
      {
        q: "Is $DEXLA required when INDEXLA launches?",
        a: [
          "No. INDEXLA can launch and onboard creators before the token is introduced.",
          "The publishing burn becomes active once $DEXLA launches.",
        ],
      },
      {
        q: "How do the fee discounts work?",
        a: [
          "**2,500 $DEXLA → 15% discount**",
          "**5,000 $DEXLA → 25% discount**",
          "**10,000 $DEXLA → 35% discount**",
        ],
      },
      {
        q: "How does the $DEXLA burn mechanism work?",
        a: [
          "$DEXLA can be permanently removed through:",
          "**Creator publishing burns**",
          "**10% of execution fee revenue used for protocol buyback and burn**",
          "**25% of realized Treasury profits used for buyback and burn**",
        ],
      },
      {
        q: "What is the total $DEXLA supply?",
        a: ["**100,000,000 $DEXLA**"],
      },
      {
        q: "What is the initial circulating supply?",
        a: [
          "The planned TGE circulating supply is:",
          "**14.75% — 14.75M $DEXLA**",
        ],
      },
    ],
  },
  {
    id: "creators",
    title: "Creators",
    items: [
      {
        q: "Who can become an INDEXLA Creator?",
        a: [
          "INDEXLA is designed for creators with an existing audience, market thesis, or track record they want to turn into an investable portfolio.",
        ],
      },
      {
        q: "How do Creators make money?",
        a: [
          "Creators receive **50% of the execution fees generated by activity in their portfolios**.",
          "The more capital and trading activity a portfolio attracts, the greater its potential fee earnings.",
        ],
      },
      {
        q: "How do I create my first portfolio?",
        a: [
          "Connect your wallet, choose your assets, set allocations, define your strategy, and publish or keep the portfolio private.",
        ],
      },
      {
        q: "How much does it cost to publish?",
        a: [
          "At launch, early-access Creators can publish their first portfolio for free.",
          "Once $DEXLA utility is live, public publishing requires the **1,000 $DEXLA burn**.",
        ],
      },
      {
        q: "Is there a Creator deposit?",
        a: [
          "Yes. Creators start with a minimum **$100 Creator Deposit**.",
          "This is capital in the portfolio, not a platform fee.",
        ],
      },
      {
        q: "What types of portfolios can I create?",
        a: [
          "You can build portfolios around supported:",
          "**Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid Assets**",
        ],
      },
      {
        q: "Can I keep my portfolio private?",
        a: [
          "Yes. Private portfolios can be created without the $DEXLA publishing burn.",
        ],
      },
      {
        q: "How do I attract investors?",
        a: [
          "Share your portfolio through X, YouTube, Telegram, Discord, and other communities.",
          "Your portfolio gives your audience a direct way to allocate capital behind your thesis.",
        ],
      },
      {
        q: "Can my portfolio earn while I keep creating content?",
        a: [
          "Yes. Your portfolio can remain active while you continue publishing content and driving your audience toward it.",
        ],
      },
      {
        q: "Is there a Creator leaderboard?",
        a: [
          "Yes. Creators compete for additional monthly rewards based on:",
          "**50% Portfolio Performance**",
          "**30% AUM**",
          "**20% Trading Volume**",
          "The **Top 25 Creators** share the monthly rewards pool.",
          "Leaderboard rewards are separate from creator execution-fee earnings.",
        ],
      },
      {
        q: "What can investors see?",
        a: [
          "Public portfolios can display:",
          "**Allocations · Strategy · PnL · Performance · AUM · Activity**",
        ],
      },
      {
        q: "Do Creators provide investment advice?",
        a: [
          "Creators are responsible for their own content and communications. Investors decide whether to allocate capital and do so at their own risk.",
        ],
      },
    ],
  },
  {
    id: "indexla-model",
    title: "The INDEXLA Model",
    items: [
      {
        q: "What is the simplest way to understand INDEXLA?",
        a: [
          "**You choose the assets.**",
          "**You define the rules.**",
          "**Your wallet holds the assets.**",
          "**INDEXLA provides the infrastructure to execute them.**",
        ],
      },
      {
        q: "Are historical examples guaranteed returns?",
        a: [
          "No. Historical market examples are illustrative market history and are not claimed INDEXLA strategy returns. Past performance does not guarantee future results.",
        ],
      },
      {
        q: "Where can I verify the protocol mechanics?",
        a: [
          "Relevant contracts, permissions, token mechanics, and other on-chain components can be independently verified where applicable.",
        ],
      },
    ],
  },
];
