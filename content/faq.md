# INDEXLA FAQ

## Getting Started

### What is INDEXLA?

INDEXLA is a non-custodial portfolio management and automation layer that lets users build, manage, and automate portfolios across supported crypto, tokenized stocks, commodities, RWAs, and hybrid assets.

Your assets remain under your wallet control while INDEXLA provides the infrastructure for portfolio management, strategy automation, valuation, permissions, and execution.

### How do I get started?

Connect your wallet, select supported assets, define your allocations, choose your strategy, and create your portfolio.

You can manage the portfolio manually or enable automation using the permissions and rules you define.

### What makes INDEXLA different from a traditional trading bot?

Traditional trading bots may require users to deposit assets into a platform or exchange.

INDEXLA is non-custodial. Your assets remain under your wallet control while smart contracts, strategy rules, AI monitoring, and execution infrastructure coordinate actions you authorize.

### What can I invest in?

Depending on availability and jurisdiction, INDEXLA supports crypto, stablecoins, tokenized stocks, commodities, RWAs, and hybrid portfolios combining supported asset classes.

### Do I need to actively trade?

No.

You can manage portfolios manually or automate supported strategies such as DCA, rebalancing, Take Profit, Stop Loss, Fear & Greed, RSI, and Momentum.

### Which blockchains does INDEXLA support?

INDEXLA is designed for cross-chain portfolio management across supported EVM and non-EVM networks.

The initial supported networks include Ethereum, Base, Arbitrum, BNB Chain, Robinhood, Solana, Sui, Tao, and Sei, with additional networks introduced as integrations mature.

### Do my assets ever leave my wallet?

INDEXLA is designed to remain non-custodial. Your assets are not deposited into an INDEXLA-controlled custody account.

Authorized transactions interact with on-chain protocols according to the permissions and rules configured for your portfolio.

---

# Safety & Risk

### Who controls my assets?

You do.

INDEXLA does not take custody of your assets. Your wallet remains the source of ownership and control.

### How do permissions work?

Automation operates through explicit, scoped permissions.

Permissions can be restricted by portfolio, approved assets, strategies, execution parameters, and other policy conditions.

The AI monitoring layer does not receive unrestricted authority over your wallet.

### Can INDEXLA change my strategy or allocation without my approval?

No.

Automation is constrained by the permissions and rules you authorize. AI monitoring cannot independently expand those permissions or execute actions outside the authorized policy.

### Can INDEXLA withdraw my funds?

No.

INDEXLA is not designed to have independent withdrawal or custody authority over user assets.

### Can I revoke execution permissions?

Yes.

You can disable or revoke automation permissions associated with your portfolio.

Revocation affects future authorized execution. Transactions already submitted on-chain cannot be retroactively cancelled.

### Can I still manage my assets manually while automation is active?

Yes.

Automation does not transfer ownership of your assets to INDEXLA.

### What happens if INDEXLA goes offline?

Your assets remain on-chain under your wallet control.

Automated monitoring and execution may stop while the relevant infrastructure is unavailable.

### What happens if INDEXLA permanently stops operating?

Your assets remain under your wallet control because INDEXLA is non-custodial.

The INDEXLA infrastructure may stop providing automated monitoring and execution, but the underlying assets are not held by INDEXLA.

### Can I lose money?

Yes.

All supported investments carry risk, including the possibility of partial or total loss of capital.

### What can affect execution?

Execution can be affected by market volatility, liquidity, slippage, gas costs, network congestion, bridge conditions, asset availability, market-data issues, and other on-chain conditions.

### Are returns guaranteed?

No.

INDEXLA provides portfolio management and automation infrastructure. It does not guarantee profits or protect users from investment losses.

### Does INDEXLA provide financial advice?

No.

Users choose their assets, allocations, strategies, and execution parameters. INDEXLA provides infrastructure for implementing those decisions.

---

# Security & Audits

### Has INDEXLA been audited? By whom?

INDEXLA's smart contracts will undergo security audits and independent security reviews before production deployment.

The protocol intends to work with leading blockchain security firms. Audit providers and completed reports will be publicly disclosed once engagements are finalized and the relevant audits are complete.

### Does INDEXLA have a bug bounty program?

INDEXLA intends to establish a responsible disclosure and bug bounty program as the protocol approaches production deployment.

Scope, eligibility, and rewards will be published when the program is formally launched.

### What happens if a smart contract vulnerability is discovered?

Affected contracts or execution paths may be paused or restricted using available emergency security controls.

Depending on severity, the response may include disabling affected routes, upgrading vulnerable components where permitted, and coordinating remediation before normal operation resumes.

### Can the INDEXLA team upgrade contracts to steal user funds?

INDEXLA's upgradeable contracts are designed around controlled upgrade permissions and explicit protocol roles.

Upgrade authority is separate from ordinary user execution permissions and is subject to the protocol's security architecture.

The architecture is designed so an upgrade does not provide ordinary operators or AI agents with unrestricted access to user assets.

### Can INDEXLA pause contracts?

Where supported by the contract architecture, authorized emergency controls can pause affected execution paths to limit damage during a critical security event.

A pause is a risk-control mechanism, not a mechanism for taking custody of user funds.

### Is there insurance for smart contract or bridge losses?

INDEXLA does not currently represent user assets as insured against smart contract, bridge, market, or other protocol risks.

Any future insurance or risk-transfer program will be disclosed separately if introduced.

---

# Cross-Chain Execution

### How does cross-chain execution work?

INDEXLA coordinates portfolio execution across supported networks through its execution and routing infrastructure.

[LI.FI](http://LI.FI) provides cross-chain routing and execution infrastructure where applicable.

### What happens if [LI.FI](http://LI.FI) or a connected bridge is hacked?

Cross-chain execution introduces additional risks from bridges, routers, liquidity providers, and underlying networks.

INDEXLA does not eliminate these risks.

Affected routes can be restricted or disabled when security conditions, liquidity, or route integrity do not meet protocol requirements.

### What happens if a cross-chain transaction fails?

INDEXLA monitors execution status and can identify failed, delayed, or incomplete execution.

Risk controls, reconciliation, and recovery mechanisms are designed to prevent incomplete transactions from being incorrectly treated as successfully executed.

### What happens if a bridge is compromised during a transaction?

INDEXLA's execution and risk-control architecture is designed to monitor transaction states and restrict affected routes when abnormal conditions are detected.

However, losses caused by a compromised third-party bridge or underlying protocol cannot be guaranteed against.

### What happens if a cross-chain transaction is delayed?

The transaction remains subject to the underlying networks and bridge infrastructure.

INDEXLA can monitor the transaction and reconcile portfolio state once its execution status becomes known.

### What happens if a supported blockchain goes offline?

Transactions involving that network may be delayed or temporarily unavailable.

Independent chains and execution routes can continue operating where available.

### Who pays cross-chain and network fees?

Underlying network gas, bridge, routing, and execution costs may apply depending on the transaction.

These costs are separate from the INDEXLA execution fee.

### What happens if my wallet runs out of gas?

The transaction may fail or remain pending until sufficient gas is available.

INDEXLA includes a Gas Manager architecture designed to help handle execution-gas requirements, including supported emergency gas mechanisms where applicable.

---

# Strategies & Automation

### What strategies can I use?

Supported strategies include:

Fear & Greed · RSI · Momentum · Take Profit · Stop Loss · Rebalancing · DCA

### Can I run multiple strategies on the same portfolio?

Yes.

Supported strategies can be combined within a portfolio, subject to compatible rules and execution constraints.

### How does Buy Fear / Sell Greed work?

The strategy accumulates when market sentiment reaches your defined Fear conditions and reduces exposure when your defined Greed conditions are reached.

### How does RSI automation work?

You define RSI conditions such as oversold or overbought thresholds.

INDEXLA monitors the relevant signal and executes according to the rules and permissions you configured.

### What does AI actually do?

The AI monitoring layer evaluates relevant market conditions and strategy signals and coordinates the execution workflow.

AI operates within the permissions and rules defined for the portfolio. It does not receive unrestricted custody or authority over user assets.

### Can AI execute trades without my explicit approval?

Once you enable an automated strategy, you have authorized execution within the defined permissions and rules.

AI cannot independently expand those permissions or execute actions outside the authorized policy.

### What data does the AI monitoring layer use?

The monitoring layer can use supported market prices, sentiment indicators, technical indicators, portfolio state, and other validated data required by the configured strategy.

### How often does INDEXLA check strategy conditions?

Monitoring frequency depends on the strategy, data source, network conditions, and system configuration.

Execution occurs when the relevant conditions are detected and the transaction passes applicable validation and risk controls.

### What happens if a strategy triggers but liquidity is too low?

Execution can be rejected, limited, or delayed when required execution conditions are not satisfied.

Liquidity, slippage, asset availability, and other execution constraints are evaluated before authorized transactions are submitted.

### Can I set maximum slippage or trade limits?

Execution policies can apply constraints such as permitted assets, allocation limits, slippage limits, and transaction parameters where supported.

### Can I set maximum loss limits?

Supported risk controls can restrict execution based on defined portfolio or strategy conditions.

Available controls depend on the strategy and portfolio configuration.

### What is the circuit breaker?

A circuit breaker is a risk-control mechanism that can disable or restrict automated execution when predefined safety conditions are triggered.

It is designed to stop further automated actions while a risk condition is investigated or resolved.

### Can a circuit breaker lock my funds?

No.

A circuit breaker restricts automated execution. It does not transfer ownership of your assets to INDEXLA.

### What is the Recovery Engine?

The Recovery Engine is part of INDEXLA's execution-risk architecture.

It is designed to detect and handle abnormal execution states, failed transactions, incomplete cross-chain operations, and reconciliation issues so portfolio state can be brought back into a consistent state.

### What happens if market data becomes unavailable?

Execution dependent on unavailable or invalid data can be paused or rejected rather than relying on an unsafe or incomplete signal.

### Can I turn automation off?

Yes.

You can disable or revoke automation according to the permissions configured for your portfolio.

---

# Execution & Portfolio Management

### How does INDEXLA calculate my portfolio value?

INDEXLA's valuation infrastructure aggregates supported wallet balances across chains and combines them with market prices to calculate portfolio value, allocations, and available buying power.

### Can I rebalance across multiple chains?

Yes.

INDEXLA is designed to coordinate portfolio rebalancing across supported chains and assets through its cross-chain execution infrastructure.

### What is the maximum slippage INDEXLA will accept?

Slippage limits can be included in execution policies to prevent trades from executing outside defined conditions.

If an execution cannot satisfy the required parameters, it may be rejected rather than executed at an unacceptable price.

### What happens if execution conditions cannot be satisfied?

The transaction may be rejected, delayed, or restricted depending on the failure condition and applicable risk controls.

### Can I simulate a strategy before activating it?

Historical examples and portfolio analytics can be used to evaluate strategies.

Simulated or historical results are not guarantees of future performance.

---

# Fees & Execution

### What does INDEXLA charge?

INDEXLA charges a 1% execution fee on eligible portfolio activity.

### Is the 1% fee charged on profit?

No.

The fee is an execution fee associated with eligible portfolio activity, not a performance fee.

### Does INDEXLA charge management fees?

No.

INDEXLA does not charge management fees, performance fees, or exit fees.

### Are there other costs?

Underlying network gas, bridge, routing, liquidity, and other third-party execution costs may apply depending on the transaction.

These costs are separate from the INDEXLA execution fee.

### Do Creators earn on every trade?

Creators receive 50% of applicable execution fees generated by activity in their portfolios, subject to the platform's creator-revenue rules.

### Are there minimum investment amounts?

Minimums may depend on the portfolio, supported assets, execution requirements, and network conditions.

Any applicable minimum is displayed as part of the portfolio configuration.

---

# $DEXLA

### What is $DEXLA?

$DEXLA is the native utility token of the INDEXLA ecosystem.

Its primary utilities include public portfolio publishing and execution-fee discounts.

### Is $DEXLA required when INDEXLA launches?

No.

INDEXLA can launch and onboard creators before the token is introduced.

The publishing burn becomes active once $DEXLA utility launches.

### How much $DEXLA is required to publish?

Once $DEXLA utility is live, publishing a public portfolio or index requires a permanent burn of 1,000 $DEXLA.

Private portfolios do not require the publishing burn.

### How do the fee discounts work?

2,500 $DEXLA → 15% discount

5,000 $DEXLA → 25% discount

10,000 $DEXLA → 35% discount

### What happens if my $DEXLA balance drops below a discount threshold?

The applicable discount is determined by the $DEXLA balance requirement for each tier.

If the required balance is no longer maintained, the corresponding discount tier no longer applies.

### How is the 1,000 $DEXLA burn enforced?

The publishing requirement is enforced through the protocol's token and publishing mechanics.

The required 1,000 $DEXLA is permanently burned when a qualifying public portfolio is published after the utility is activated.

### How does the broader $DEXLA burn mechanism work?

$DEXLA can be permanently removed from supply through:

Creator publishing burns

10% of execution fee revenue used for protocol buyback and burn

25% of realized Treasury profits used for buyback and burn

### What is the total $DEXLA supply?

100,000,000 $DEXLA.

### What is the initial circulating supply?

The planned TGE circulating supply is:

14.75% · 14.75M $DEXLA

---

# Creators

### Who can become an INDEXLA Creator?

INDEXLA is designed for creators, traders, analysts, and portfolio managers with an audience, investment thesis, or track record they want to turn into an investable portfolio.

### How do Creators make money?

Creators receive 50% of applicable execution fees generated by activity in their portfolios.

### How do I create my first portfolio?

Connect your wallet, select supported assets, define allocations, configure your strategy, and publish the portfolio or keep it private.

### How much does it cost to publish?

At launch, early-access Creators can publish their first portfolio for free.

Once $DEXLA utility is live, public publishing requires the permanent burn of 1,000 $DEXLA.

### Is there a Creator Deposit?

Yes.

Creators start with a minimum $100 Creator Deposit.

This is capital allocated to the portfolio, not a platform fee.

### What types of portfolios can I create?

You can build portfolios around supported:

Crypto · Tokenized Stocks · Commodities · RWAs · Hybrid Assets

### Can I keep my portfolio private?

Yes.

Private portfolios can be created without the $DEXLA publishing burn.

### Can I unpublish a portfolio?

Creators can manage the publishing status of their portfolios according to the platform's portfolio lifecycle rules.

Existing investor positions and on-chain activity are not erased simply by changing a portfolio's publishing status.

### Can a Creator withdraw investor funds?

No.

Creators do not receive custody or unrestricted withdrawal authority over investor assets simply by creating a portfolio.

### Can a Creator create a malicious portfolio?

Creators cannot directly take custody of investor assets.

Portfolio execution is constrained by INDEXLA's permission and execution architecture, while investors retain control of their wallets.

Creator reputation, portfolio transparency, and performance history help users evaluate portfolios, but INDEXLA does not guarantee the quality or performance of any Creator.

### Can a Creator change a portfolio's strategy after investors allocate?

Portfolio changes are subject to the portfolio's configured permissions, strategy rules, and lifecycle controls.

Material changes cannot simply override the execution permissions established by investors.

### How do I attract investors?

Creators can share portfolios through X, YouTube, Telegram, Discord, and other communities.

The portfolio gives an audience a direct way to allocate capital according to the Creator's thesis.

### Can my portfolio remain active while I create content?

Yes.

A portfolio can remain active while the Creator continues publishing content and building their audience.

### Is there a Creator leaderboard?

Yes.

Creators compete for additional monthly rewards based on:

50% Portfolio Performance

30% AUM

20% Trading Volume

The Top 25 Creators share the monthly rewards pool.

Leaderboard rewards are separate from Creator execution-fee earnings.

### What can investors see?

Public portfolios can display:

Allocations · Strategy · PnL · Performance · AUM · Activity

### Do Creators provide investment advice?

Creators are responsible for their own content and communications.

Investors decide whether to allocate capital and do so at their own risk.

---

# Treasury & Protocol

### What is the INDEXLA Treasury?

The Treasury is a protocol-managed capital pool designed to support ecosystem operations, liquidity, strategic initiatives, and protocol growth.

Treasury profits can also contribute to the $DEXLA buyback and burn mechanism.

### How is the Treasury used?

Treasury capital can support protocol operations, liquidity, ecosystem development, and other activities defined by the protocol's treasury framework.

### How does Treasury profit contribute to $DEXLA?

25% of realized Treasury profits are allocated toward $DEXLA buyback and burn according to the protocol's defined mechanism.

### How is the protocol Treasury governed?

Treasury management follows the protocol's defined governance and authorization framework.

Treasury activity and relevant on-chain transactions can be independently verified where applicable.

---

# Privacy & Data

### What data does INDEXLA collect and store?

INDEXLA is designed to minimize the personal information required to use the protocol.

Blockchain addresses, portfolio configurations, transaction activity, execution data, and relevant market or strategy data may be processed to provide portfolio management, monitoring, analytics, and execution services.

### Does INDEXLA control or store my private keys?

No.

INDEXLA is designed around non-custodial wallet control. User private keys are not transferred to INDEXLA for portfolio management or automated execution.

### Can INDEXLA see my private keys?

No.

Private keys remain controlled by the user's wallet infrastructure.

### Is my portfolio activity visible on-chain?

Blockchain transactions and wallet activity on public networks are inherently observable.

INDEXLA may provide additional portfolio analytics around this public information, but cannot make public blockchain activity inherently private.

---

# The INDEXLA Model

### What is the simplest way to understand INDEXLA?

You choose the assets.

You define the allocations.

You define the rules.

Your wallet remains under your control.

INDEXLA provides the infrastructure to monitor, manage, validate, and execute those rules.

### Is INDEXLA an investment fund?

No.

INDEXLA is a non-custodial portfolio management and automation infrastructure layer.

Users maintain control of their assets and decide which portfolios, assets, and strategies they use.

### Are historical examples guaranteed returns?

No.

Historical market examples are illustrative market history and are not presented as guaranteed INDEXLA strategy returns.

Past performance does not guarantee future results.

### Where can I verify the protocol mechanics?

Relevant smart contracts, permissions, token mechanics, and other on-chain components can be independently verified where applicable.

INDEXLA is designed so important ownership, permission, execution, and accounting mechanisms can be enforced and represented on-chain.

