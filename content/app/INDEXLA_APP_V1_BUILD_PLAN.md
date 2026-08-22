# INDEXLA App V1 — Final Marketplace-First Cursor Build Plan

**Target:** `app.indexla.tech`  
**Status:** Final V1 product, UX, flow and implementation freeze  
**Purpose:** Single source of truth for Cursor  
**Primary V1 principle:** INDEXLA opens with investment discovery, not an empty personal dashboard.  
**Design direction:** Premium institutional dual-theme interface: crisp white/light mode and deep dark-navy mode. Both must preserve strong section separation, excellent contrast, INDEXLA blue/violet branding, and distinct accent colors for major product areas.

---

## Cursor Mission

Build the first production-quality INDEXLA application from this document. Preserve the separate `IndexlaApp` repository, current framework, typed models, test setup, zero-downtime deployment and working route foundation.

Do not:

- Change product logic without approval
- Invent token mechanics, ranking weights or strategy behavior
- Create dead controls or fake transaction success
- Require wallet connection for public discovery
- Modify, restart or endanger `indexla.tech`
- Combine USD and $DEXLA into one misleading total
- Treat illustrative data as live data

If code, public copy or technical documentation conflicts with this plan, stop and surface the conflict.

---

# 1. V1 Experience Strategy

## Why Marketplace-First

Most V1 visitors will not yet own an INDEXLA portfolio. The first screen must immediately demonstrate the product through real-looking indexes and portfolios. A disconnected or new user must never land on an empty financial dashboard.

## Universal Entry Flow

1. Open `app.indexla.tech/app`
2. Browse Featured, Trending, Indexes and Portfolios without connecting a wallet
3. Search or filter investment products
4. Open a complete portfolio/index detail
5. Follow creator, like product or enable creator-publication notifications where applicable
6. Choose `Invest` or `Customize & Invest`
7. Connect wallet only when a wallet-dependent action begins
8. Review assets, allocations, strategy, route, fees, risks and permissions
9. Confirm the investment
10. Manage the resulting holdings, automation and rewards in My Portfolio

## Returning User Flow

Returning users see the same marketplace-first Dashboard. Their compact personal snapshot, active portfolios, automation and recent activity appear below the discovery content. The page structure never changes between new and existing users.

## Creator Flow

1. Browse Creators
2. Publish a public portfolio
3. Connect social media
4. Submit verification
5. Access Creator Dashboard
6. Publish portfolios, feature products, monetize strategies and monitor earnings

---

# 2. V1 Scope

V1 contains:

- One shared application shell
- Eight primary navigation destinations
- Twelve complete screens
- Marketplace-first Dashboard
- Public browsing without wallet connection
- Wallet-gated financial actions
- Complete portfolio/index creation flow
- Personal portfolio and automation management
- Strategy Marketplace and creator-to-creator strategy access
- Portfolio Leaderboard and separate Creator Leaderboard
- Degen Club
- Creator discovery, activation, public profile and dashboard
- Light and dark-navy themes
- Desktop, tablet and mobile layouts
- Loading, empty, disconnected, locked, error, risk and transaction states
- Feature flags for token-dependent and technical integrations
- Typed illustrative fixtures until live services exist

---

# 3. Product Rules — Apply Everywhere

## Ownership and Control

- INDEXLA is non-custodial.
- Users hold the real underlying assets in their wallets.
- No index token, wrapper or vault token represents a portfolio.
- INDEXLA cannot withdraw user funds or expand its own permissions.
- Users can pause or revoke automation permissions.
- AI monitors user-selected conditions and coordinates approved execution.
- AI cannot choose assets, create strategies, change rules or take custody.

## Fees

- 0% management fee
- 0% performance fee
- 0% exit fee
- 1% execution fee only when trades execute
- Gas, bridge and routing costs are user-paid and separate from the INDEXLA execution fee.
- Creator Portfolio split: Creator 50% · Platform 20% · Treasury 10% · Rewards 10% · Buyback & Burn 10%.
- INDEXLA Portfolio split: Platform 50% · Treasury 20% · Rewards 20% · Buyback & Burn 10%.
- Never display a creator share for an INDEXLA-native portfolio.

## Supported Asset Categories

Use these labels exactly:

- Crypto
- Tokenized Stocks
- Tokenized Commodities
- Tokenized Real Estate
- Other RWAs
- Stablecoins

## Supported Network Presentation

- Ethereum
- Base
- Arbitrum
- BNB Chain
- Solana
- Sui
- Robinhood

A network may be presented as planned/supported while its execution flag is disabled. Never imply execution availability when its integration is inactive.

## Discovery Taxonomy

Use exactly:

- All
- Indexes
- Portfolios

Never use `Creator Portfolios` as a tab label.

## Social Actions

- Users can follow creators.
- Users can like individual portfolios/indexes.
- Users can invest in portfolios/indexes.
- Followers can opt into notifications when a creator publishes a new public portfolio/index.
- Users can tip creators.
- Likes and follows are engagement metrics only; they do not affect Portfolio Leaderboard ranking.
- Only $DEXLA tips count toward ranking and investor reward eligibility.
- Social loop: Discover → Follow → Invest → Tip → Rank.

## Portfolio Leaderboard and Rewards

- The Portfolio Leaderboard ranks individual public portfolios/indexes, not creator accounts.
- Every published portfolio competes separately, including multiple portfolios from one creator.
- Monthly is always the default view.
- All-Time is historical context only and never creates reward eligibility.
- Ranking: Performance 50% · AUM 25% · Volume 15% · $DEXLA Tips 10%.
- Top 10 portfolios qualify each month.
- Rewards purchase each winning portfolio's underlying assets at its current allocation.
- Split: 50% Creator · 50% Eligible Investors.
- Investor eligibility: invested in winning portfolio + tipped creator in $DEXLA + held at least 7 days.
- Investor weighting: 80% amount invested · 20% amount tipped.
- Creators may invest in their own portfolios and that capital may count toward ranking.
- Creators cannot receive the investor share of their own portfolio's rewards.
- Wash trading, artificial activity and self-tipping do not qualify.

## Creator Revenue

Four revenue streams:

1. 50% of applicable execution fees generated by creator portfolios
2. Private strategy access and 10% applicable execution-fee share
3. $DEXLA tips
4. Monthly Creator Rewards

## Strategies

- INDEXLA core strategies are free for investors and creators.
- Investors use creator strategies through creator portfolios for free.
- Paid Creator Strategy Marketplace access is creator-to-creator.
- Another creator pays the strategy creator's chosen access price in $DEXLA.
- Access payment split: 50% strategy creator · 50% burned.
- The original strategy creator earns 10% of applicable execution fees generated when another creator uses that strategy.
- Purchasing access allows the strategy to be copied/applied within approved parameters; it does not transfer ownership.

## $DEXLA Utilities

Five utilities:

1. Publish — 1,000 $DEXLA to publish a public portfolio; 100% burned, subject to configured launch exemptions
2. Feature — 2,500 $DEXLA for seven days Featured placement; 100% burned
3. Monetize — 500 $DEXLA to list a private strategy; 100% burned; creator sets access price
4. Save — Hold 2,500 for 10%, 5,000 for 20%, or 10,000 for 30% execution-fee discount
5. Tip — Support creators; $DEXLA tips count toward ranking and investor eligibility

Token-dependent actions remain feature-flagged until enabled. Disabled actions show truthful locked/coming-soon states and never fake success.

## Execution

- Eligible same-chain intent swaps use CoW Protocol where enabled.
- Cross-chain routing uses LI.FI and Across where enabled.
- Provider failure never triggers blind fallback; alternative routes repeat full validation.
- Pipeline: Intent → Policy → Risk → Permission → Route Validation → Execution.
- Block execution for stale data, invalid permissions, exceeded limits, insufficient liquidity, unsafe slippage, unavailable route or active circuit breaker.

---

# 4. Global App Shell

## Navigation

1. Dashboard → `/app`
2. Discover → `/app/discover`
3. Degen Club → `/app/degen-club`
4. Create Portfolio → `/app/create`
5. My Portfolio → `/app/portfolio`
6. Strategies → `/app/strategies`
7. Leaderboard → `/app/leaderboard`
8. Creators → `/app/creators`

## Header

- Global search opens marketplace search
- Connected wallet or `Connect Wallet`
- Network status
- $DEXLA balance
- Current Save tier/discount
- `Unlock Next Tier`
- Notification shortcut
- Theme switcher
- Avatar/account menu

## Wallet Rule

Wallet connection is not required for:

- Dashboard marketplace browsing
- Discover browsing
- Product details
- Degen Club browsing
- Strategy browsing
- Leaderboards
- Creator browsing and public profiles

Wallet is requested only for actions such as Invest, Customize & Invest, Create, Follow, Like, Tip, Claim, Publish, Feature, purchase strategy access or change permissions.

## Global Safety Copy

`Your keys. Your assets. Your permissions.`

## Shared States

- Loading skeleton
- Empty state with clear action
- Disconnected wallet
- Wrong network
- Data unavailable or stale
- Quote expired
- Transaction pending, confirmed or failed
- Route unavailable
- Bridge delayed, failed or refunded
- Insufficient source/destination gas
- MEV-aware route or disclosed fallback
- Circuit breaker active
- Automation active, paused, degraded or revoked
- Feature locked/coming soon
- Illustrative-data indicator

---

# SCREEN 01 — Marketplace-First Dashboard

**Route:** `/app`  
**Purpose:** Product discovery home for every user, with personal data secondary.

## A. Marketplace Hero

- `Discover. Build. Automate. Own.`
- `Explore indexes and portfolios across crypto and tokenized assets while keeping the underlying assets in your wallet.`
- Search: `Search indexes, portfolios or assets`
- Tabs: All / Indexes / Portfolios
- Actions:
  - `Explore Marketplace` → Discover
  - `Create Portfolio / Index` → Create
- Marketplace remains visible without wallet connection.

## B. Featured Products

- Strong visual centerpiece immediately below/inside hero
- Show three to five featured portfolios/indexes
- Each card:
  - Featured badge
  - Index/Portfolio type
  - Name
  - Creator and verification, or INDEXLA attribution
  - Thesis
  - Allocation/asset preview
  - Strategy
  - 30D performance
  - AUM
  - Investors
  - Risk
  - `View Index` / `View Portfolio`
- Featured is promotional, not endorsement.
- Non-live numbers are labeled Illustrative.
- `View All Featured` → Discover with Featured filter.

## C. Explore Marketplace Preview

- Tabs: All / Indexes / Portfolios
- Category chips: Crypto, AI, DeFi, RWAs, Tokenized Stocks, Commodities, Hybrid, Degen
- Rows/sections:
  - Trending Now
  - Most Invested
  - New This Week
- Reuse the same PortfolioCard model as Discover.
- `View All` preserves selected tab/category and opens Discover.

## D. Product Pathways

Five clear gateway cards:

1. Create Portfolio / Index → Create
2. Degen Club → Degen Club
3. Strategies → Strategies Marketplace
4. Portfolio Leaderboard → Leaderboard
5. Browse Creators → Creators

Each has a distinct controlled accent color and a concise value proposition.

## E. How INDEXLA Works

Compact three-step explanation for new users:

1. Discover or Build
2. Define Strategy and Permissions
3. Own Assets and Automate

Copy: `AI monitors. Your rules decide. Smart contracts enforce.`

## F. Personal Snapshot — Secondary

### Disconnected/New User

- Do not show an empty chart or zero balances.
- Show: `Connect your wallet to view your portfolio, automation and rewards.`
- Actions: `Connect Wallet` / `Continue Exploring`

### Connected User

- Compact, not dominant
- Total Portfolio Value
- Total return
- Active portfolios
- Active automations
- Claimable rewards when applicable
- Up to three active portfolios
- Recent activity preview
- Actions:
  - `Open My Portfolio`
  - `Manage Automations`
  - `Claim Rewards` when eligible

## G. Trust Strip

- Non-Custodial
- Real Underlying Assets
- Revocable Permissions
- Cross-Chain
- MEV-Aware Execution where supported
- `0% Management · 0% Performance · 0% Exit`

## Dashboard Acceptance

- Marketplace content appears before personal portfolio content at every breakpoint.
- Public content works without wallet connection.
- No empty financial dashboard for new users.
- Tabs and View All preserve selection into Discover.
- Featured, Trending and product gateway controls work.
- Personal snapshot never duplicates the full My Portfolio page.

---

# SCREEN 02 — Discover

**Route:** `/app/discover`  
**Purpose:** Complete marketplace catalog and product-detail experience.

## Header and Controls

- `Discover`
- `Explore indexes and portfolios across assets, strategies and chains.`
- Tabs: All / Indexes / Portfolios
- Search: `Search portfolios, indexes or assets`
- Filters: asset category, network, strategy, risk, performance period, Featured
- Sort: Trending, Most Invested, Best Performance, Newest
- `Create Portfolio / Index`

## Sections

- Featured
- Trending
- Full product grid
- Pagination/infinite loading with accessible behavior

## Product Card

- Product type
- Name
- Creator/INDEXLA attribution
- Verification
- Allocation visual
- Primary assets
- Networks
- Strategy
- Performance period
- AUM
- Investors
- Likes
- Leaderboard rank where applicable
- Featured state/time where applicable
- `View Details`

## Product Detail

- Name, type, creator and thesis
- Follow creator
- Notify me about new creator publications
- Like/Unlike product
- Tip creator
- Assets and target allocations
- Networks
- Strategy and automation rules
- Performance, AUM, volume, investors and ranking
- Activity
- Risk/disclosures
- Fees and Save discount preview
- Gas/bridge/routing estimates separated from INDEXLA fee
- CoW or LI.FI/Across route disclosure where applicable
- `You hold the real underlying assets in your wallet.`
- Actions:
  - Invest
  - Customize & Invest
  - Follow
  - Like
  - Tip
  - Share

## Dashboard/Discover Boundary

- Dashboard is curated and concise.
- Discover is complete and filter-rich.
- Both reuse identical product cards/models.
- Dashboard links preserve selected discovery context.

---

# SCREEN 03 — Degen Club

**Route:** `/app/degen-club`

## Content

- `DEGEN CLUB`
- `10 Shots > 1 Shot`
- One Shot vs Ten Shots lightweight visual
- Discover by chain: All, Solana, Ethereum, Base, BNB Chain, Multi-Chain
- Memecoin index grid
- Build Your Own CTA → Create with Degen template

## Persistent Warning

`EXTREME RISK — Memecoins are highly speculative and may lose most or all of their value. Diversification does not remove risk.`

- Non-dismissible on every Degen view
- Repeat inside Degen builder
- Repeat before invest/create/publish confirmation
- Require final active acknowledgement
- Label all non-live performance, AUM and volume as Illustrative

---

# SCREEN 04 — Create Portfolio / Index

**Route:** `/app/create`

1. Choose type: Personal Portfolio / Public Portfolio / Rules-Based Index
2. Choose assets using exact supported category labels and chain filters
3. Set allocations; total must equal 100%
4. Choose strategy: none, DCA, Rebalance, Buy Fear, Sell Greed, RSI, Momentum, Take Profit, Stop Loss, eligible creator strategy
5. Define condition, action, amount, frequency, slippage, trade/daily limits, expiry and circuit breaker
6. Name, thesis, category and visibility
7. Review and simulate:
  - Assets and allocations
  - Networks/routes
  - CoW or LI.FI/Across
  - MEV-aware status
  - Base fee, Save tier, discount and final fee
  - Gas/bridge/routing separated
  - Permission scope
  - Quote expiry and failure states
8. Connect/authorize/create:
  - Wallet confirmation
  - Permission grant
  - Manual first purchase
  - Publishing requirement when applicable
  - View and Share success actions

Builder autosaves drafts and never requests arbitrary access. Degen template keeps the persistent Extreme Risk warning through final acknowledgement.

---

# SCREEN 05 — My Portfolio

**Route:** `/app/portfolio`

## Tabs

- Overview
- Assets
- Automation
- Activity / History
- Notifications

## Overview

- Value and performance
- Portfolio selector
- Allocation wheel
- Asset and chain allocation
- Invested/available balances
- Strategies and upcoming automation
- Risk summary
- $DEXLA Save tier and estimated savings
- Investor reward eligibility and Claim Rewards

## Assets

- Asset, network, balance, value, allocation/target, performance and drift
- Buy / Sell / Swap

## Automation

- Strategy status
- Rules and next/last execution
- Limits, slippage, expiry and permission scope
- Pause, Resume, Edit Limits, Revoke Permission

## Activity

- Buys, sells, swaps, rebalances, bridges, DCA, tips and strategy access
- Provider, MEV status, separate costs and cross-chain state
- Filters, transaction link and export

## Notifications

- Execution, drift, permission, gas, reward and security alerts
- Creator publication alerts for followed creators with opt-in enabled
- Claim Rewards action when ready

## Empty State

- `You have not created or invested in a portfolio yet.`
- Discover / Create Portfolio actions
- Never replace the marketplace-first Dashboard with this empty state.

---

# SCREEN 06 — Strategies

**Route:** `/app/strategies`

## Tabs

- Marketplace
- My Strategies
- Publish Strategy

## Marketplace

- Search/filter/Featured strategies
- INDEXLA strategies free for investors and creators
- Creator strategies free to investors through portfolios
- Paid reuse is creator-to-creator only
- Creator without access: Purchase Creator Access
- Creator with access: Copy to My Portfolio / Use in Portfolio
- Show 50% creator / 50% burn and 10% applicable execution-fee share

## My Strategies

- Owned/purchased strategies
- Status, rules, portfolios, performance, executions and access
- Published-strategy analytics: price, active creator users, sales, revenue, burned amount, AUM, volume, health and Claim Revenue

## Publish Strategy

- Logic, allowed parameters, compatible assets/networks, risk and price
- 500 $DEXLA listing fee, 100% burned
- Revenue disclosure
- Save Draft / Publish Strategy

Paid actions remain feature-flagged until $DEXLA utility activation.

---

# SCREEN 07 — Portfolio Leaderboard

**Route:** `/app/leaderboard`

- Portfolio/index-first Top 3 podium
- Top 10 Win Monthly Rewards banner
- Monthly default / All-Time historical
- Category, chain and search controls
- Top 25 list
- Winner Zone ranks 1–10
- Competing Portfolios ranks 11–25
- Columns: Rank, Portfolio/Index, Creator, Points, Performance, AUM, Volume, Investors, $DEXLA Tips, Growth
- Ranking: 50/25/15/10
- Investor eligibility and 80/20 weighting
- Likes/follows never enter ranking

---

# SCREEN 08 — Browse Creators

**Route:** `/app/creators`

- Search creators by name/handle
- Filters and Featured creators
- Creator cards: identity, verification, category, followers, public portfolios, best performance, AUM, Follow and notification toggle
- Status-dependent Creator Hub card:
  - Become a Creator
  - Continue Setup
  - Open Creator Dashboard
- Gateways to Creator Leaderboard, activation and dashboard

---

# SCREEN 09 — Creator Leaderboard

**Route:** `/app/creators/leaderboard`

- Creator discovery ranking, separate from portfolio rewards
- Creator podium, search, category filters and table
- Creator, followers, verification, portfolios, AUM, investors and growth
- Click creator → public profile
- Link to Portfolio Leaderboard
- Never reuse portfolio reward rules.

---

# SCREEN 10 — Public Creator Profile

**Route:** `/app/creators/{handle}`

- Avatar, identity, verification, bio and socials
- Follow/Following
- Notify Me About New Portfolios
- Tip and Share
- Followers, creator since, AUM, investors, volume, best rank and live products
- Public portfolio/index cards with Like action
- Accessible strategies
- Performance/history/disclosures
- `Creators never control investor funds.`

---

# SCREEN 11 — Creator Activation

**Route:** `/app/creators/activate`

1. Publish a Public Portfolio
2. Connect Social Media
3. Submit Verification
4. Creator Access Approved

States: Locked, In Progress, Awaiting Verification, Approved, Needs Changes.

Required copy: `Creator access requires a published public portfolio, connected social profile and verification.`

Do not add follower-count, first-100 or founding-creator gates.

---

# SCREEN 12 — Creator Dashboard

**Route:** `/app/creator-dashboard`

## Sections

- Creator identity and connected socials
- AUM, volume, followers, investors/copiers, live portfolios, tips and likes
- Earnings Overview with four revenue streams and Claim Rewards
- Live portfolio cards with analytics, sharing, leaderboard rank and Feature Portfolio
- Feature confirmation: 2,500 $DEXLA · 7 days · 100% burned
- Audience analytics: followers, likes and notification subscribers
- Portfolio Leaderboard position
- My Strategies summary and publishing gateway
- Recent creator activity

Creator Dashboard is available only after creator-status approval. Creator Hub must route to `/app/creators`, not directly here.

---

# 5. Shared Domain Models

Use normalized shared models:

- UserAccount
- WalletConnection
- DexlaBalanceAndTier
- Asset
- Network
- Portfolio
- PortfolioHolding
- PortfolioPerformance
- PortfolioRanking
- Strategy
- AutomationRule
- PermissionSession
- ExecutionQuote
- ExecutionRoute
- ExecutionRecord
- CreatorProfile
- CreatorRevenue
- RewardEligibility
- RewardClaim
- FeaturePlacement
- Notification
- CreatorFollow
- PortfolioLike
- CreatorNotificationPreference
- DiscoveryContext

One PortfolioCard model powers Dashboard, Discover, My Portfolio, Leaderboard and Creator Profile. One Strategy model powers Marketplace, My Strategies, Create and Creator Dashboard. Dashboard and Discover share query/filter state types.

---

# 6. Fee Engine

One centralized calculator accepts:

- Portfolio type
- Trade amount
- Base fee
- $DEXLA balance/tier
- Gas
- Bridge/routing cost
- Expected slippage

It outputs:

- Base fee
- Discount percentage/amount
- Final INDEXLA fee
- Gas
- Bridge/routing cost
- Total estimated cost
- Correct allocation split

Tests cover no tier, all three tiers, exact boundaries, both portfolio splits, currency separation and gas/bridge exclusion from INDEXLA revenue.

---

# 7. Feature Flags

- DEXLA_UTILITY_ENABLED
- FEATURED_PLACEMENTS_ENABLED
- PRIVATE_STRATEGY_PAYMENTS_ENABLED
- CREATOR_PUBLISH_BURN_ENABLED
- EARLY_CREATOR_PUBLISH_EXEMPTION_ENABLED
- CROSS_CHAIN_ENABLED
- COW_EXECUTION_ENABLED
- INVESTOR_REWARD_CLAIMS_ENABLED
- ILLUSTRATIVE_DEMO_DATA
- Per-network flags

Development/staging may enable clearly labeled test/demo states. Production remains disabled until real utility/integration activation. Preview deployments keep `ILLUSTRATIVE_DEMO_DATA` enabled until the controlled testnet cutover.

---

# 8. Technical Delivery Rules

## Repository

- Separate private `IndexlaApp` repository
- Separate deploy path, PM2 process, port and nginx block
- Never push app code to website repository

## Route Contract

Maintain all current route stubs:

- `/app`
- `/app/discover`
- `/app/degen-club`
- `/app/create`
- `/app/portfolio`
- `/app/strategies`
- `/app/leaderboard`
- `/app/creators`
- `/app/creators/leaderboard`
- `/app/creators/activate`
- `/app/creators/{handle}`
- `/app/creator-dashboard`

## Data

- One typed fixture layer
- Every non-live performance/AUM/volume value marked Illustrative
- No mock/live mixing without environment indicator
- Shared formatters for currencies, percentages, dates and tokens
- Mathematical reconciliation for fees, balances and rewards
- App-wide shared data-access layer; UI and shell never import fixtures directly
- Fixture and future live/testnet providers share the same interfaces
- Live wallet, contract and execution adapters remain disabled until Phase 5 / testnet cutover

## Illustrative Demo Data Requirement

During the preview phase, fully populate every page and component with realistic illustrative content, including:

- Example INDEXLA indexes
- Creator portfolios
- Creators and social engagement
- Published strategies
- Allocation data and asset icons
- AUM, volume, investors and performance
- Charts and historical activity
- Ranking and monthly rewards data
- Automation rules and execution history
- Fees, claims, tips and $DEXLA utilities
- Notifications and transaction states

All demo products, creators, balances, performance figures and transactions must be clearly marked `Illustrative` or sourced through the centralized fixtures system.

Do not leave primary sections empty merely because live blockchain data is unavailable. The purpose is to demonstrate and visually test the complete application.

### Data architecture

- Store demo data in centralized, reusable fixtures.
- Never hardcode fake content directly inside UI components.
- Add an explicit preview/demo-data flag: `ILLUSTRATIVE_DEMO_DATA`.
- Keep adapters for live testnet data disabled for now.
- Make the UI consume a shared data-access layer so fixtures can later be replaced without redesigning components.
- Support loading, empty, disconnected, error and populated states.
- Never represent illustrative transactions as successful real blockchain activity.
- While `ILLUSTRATIVE_DEMO_DATA` is enabled, show the preview banner and clear `Illustrative` labels.

### Testnet transition

When INDEXLA testnet is ready:

1. Create genuine test portfolios and indexes through the application.
2. Connect the testnet adapters.
3. Verify creation, investing, automation and execution flows.
4. Replace marketplace fixtures with testnet-created products.
5. Remove illustrative marketplace products and fake activity.
6. Preserve only explicitly approved demo fixtures for automated testing or development environments.
7. Ensure production marketplace data comes from the real application data layer.

Do not delete or scatter fixtures prematurely. Their removal must be controlled through the `ILLUSTRATIVE_DEMO_DATA` flag, not manual component rewrites.

## Wallet and Permissions

- No private keys or seed phrases
- Human-readable permission scope
- Allowed assets, networks, actions, limits and expiry
- Pause and revoke
- No arbitrary calldata or hidden unlimited permissions
- Review and confirmation for all financial/permission actions

## Execution UX

- Quote expiry
- Provider and route type
- CoW/MEV disclosure
- LI.FI/Across disclosure
- Source/destination and duration
- Separate fees/costs
- Delayed, failed and refunded states
- Stale data, unsafe slippage, invalid limits, insufficient liquidity and circuit-breaker blocking
- Auditable activity record

## Quality

- WCAG-conscious contrast, focus and keyboard behavior
- Accessible charts/tooltips
- Responsive tables/cards
- Lazy-load heavy charts
- Optimized brand assets
- No interaction-blocking animation
- No secrets in client/logs
- Sanitize creator content
- Rate-limit writes where supported

---

# 9. Revised Build and Migration Plan

## Completed

- Phase 0 audit
- Phase 1 foundation
- Separate app repository
- Global shell and 12 route stubs
- Shared models, fixtures, flags, fee skeleton and tests
- Preview deployment at `app.indexla.tech`
- Current provisional portfolio-first Dashboard

## Immediate Correction — Before New Pages

The current Dashboard is provisional and must be replaced now.

1. Extract the visual system from approved mockups
2. Redesign shell only where needed for consistency
3. Replace Screen 01 with the marketplace-first Dashboard
4. Add shared Marketplace components intended for both Dashboard and Discover
5. Preserve existing routes, models, flags, adapters and tests
6. Update Dashboard fixtures and E2E tests to the new flow
7. Deploy through the app-only zero-downtime process
8. Stop for visual approval

## Phase 2B — Full Discover

Extend the approved shared Marketplace components into full search, filters, catalog and product detail.

## Phase 2C — Create Portfolio / Index

Build the complete eight-step builder and review/permission flow.

## Phase 2D — My Portfolio

Build personal holdings, automation, activity, notifications and rewards.

## Phase 3

- Strategies
- Portfolio Leaderboard
- Degen Club

## Phase 4

- Browse Creators
- Creator Leaderboard
- Public Creator Profile
- Creator Activation
- Creator Dashboard

## Phase 5

- Wallet integration
- Contracts and permissions
- Market data
- CoW
- LI.FI
- Across
- Automation/monitoring
- Notifications
- $DEXLA utilities when enabled

## Phase 6

- Unit, integration and E2E testing
- Accessibility
- Responsive visual QA
- Performance
- Security
- Copy and financial reconciliation

## Phase 7

- App-only zero-downtime production release
- Never interrupt `indexla.tech`
- Verify SSL, routes, APIs, mobile, monitoring and rollback

---

# 10. Critical User Journeys

1. Open Dashboard without wallet → browse Featured/All/Indexes/Portfolios
2. Dashboard product → detail → connect only when investing
3. Invest → review route/fees/risks → confirm → My Portfolio
4. Customize & Invest → builder with product prefilled
5. Create from scratch → allocate 100% → strategy → simulate → authorize
6. Manage automation → pause/resume/edit/revoke
7. Claim investor rewards
8. Follow creator → enable publication notifications → receive new-product alert
9. Like/unlike product without affecting ranking
10. Browse and purchase creator strategy as another creator → copy/apply → original creator accrues revenue
11. Publish and Feature portfolio
12. View monthly Portfolio Leaderboard and Top 10 rewards
13. Enter Degen Club with persistent risk disclosure
14. Complete creator activation and open Creator Dashboard

---

# 11. Final Acceptance Criteria

V1 is complete only when:

- Dashboard is marketplace-first for all users.
- Marketplace works without wallet connection.
- New users never see an empty financial dashboard as the primary experience.
- Dashboard content order is Featured → Marketplace Preview → Product Pathways → Personal Snapshot.
- Dashboard and Discover share models/components without duplicated logic.
- All/Indexes/Portfolios selection is preserved between Dashboard and Discover.
- All 12 routes and every CTA work.
- Both themes and all responsive breakpoints are polished.
- Degen risk warning is persistent and repeated at confirmation.
- Portfolio and Creator Leaderboards remain separate.
- Monthly ranking and Top 10 logic are correct.
- Likes/follows do not affect ranking.
- Follow, like, invest, tip and creator notification flows work.
- Creator-to-creator strategy access works correctly.
- Publish, Feature, Monetize, Save and Tip states exist.
- Both portfolio fee splits reconcile to 100%.
- Investor and creator Claim Rewards paths exist.
- USD and $DEXLA remain separate.
- CoW/MEV and LI.FI/Across disclosures are accurate.
- Loading, empty, disconnected, locked, stale, circuit-breaker, transaction and bridge states work.
- No custody, guaranteed-return or financial-advice implication exists.
- All tests/builds pass.
- Preview and production deploys never affect `indexla.tech`.

---

# 12. Official Product Sources

- `https://indexla.tech/whitepaper/1-executive-summary`
- `https://indexla.tech/whitepaper/11-investor-experience`
- `https://indexla.tech/whitepaper/12-strategies`
- `https://indexla.tech/whitepaper/13-creator-economy`
- `https://indexla.tech/whitepaper/14-dexla-utility-tokenomics`
- `https://indexla.tech/whitepaper/technical/29-cow-cross-chain-routing`

**Implementation authority:** This document overrides earlier app-plan versions. Do not continue the old portfolio-first Dashboard. If any conflict remains, stop and surface it before coding.