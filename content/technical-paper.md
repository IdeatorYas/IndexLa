  


# INDEXLA Technical Paper

## Decentralized ,Non-Custodial, Multi-Asset, Cross-Chain Portfolio Infrastructure

### 1. Architecture Overview

INDEXLA is a non-custodial portfolio infrastructure layer for creating, owning, automating, and managing on-chain investment portfolios and indexes.

The architecture separates five responsibilities:

User & Wallet Layer  
Wallet connection, ownership, authorization, and permission management.

Portfolio Layer  
Portfolio and Index registries, asset eligibility, allocations, valuation, and accounting.

Strategy & Intelligence Layer  
User-defined strategies, market-data processing, rule evaluation, monitoring, and AI orchestration.

Execution Layer  
Risk validation, route selection, liquidity checks, simulation, transaction construction, cross-chain routing, and confirmation.

Protocol Layer  
Smart contracts, fees, creator economics, treasury accounting, and protocol security.

The architecture is progressively deployable. MVP functionality is intentionally smaller than the full protocol architecture. The MVP validates portfolio creation, ownership, marketplace activity, and basic execution before advanced automation and cross-chain infrastructure are introduced.



---



# 2. Non-Custodial Architecture

Users connect their own wallets.

INDEXLA never receives, stores, or controls user private keys.

Portfolio assets remain in user-controlled wallets rather than being deposited into an INDEXLA custody contract.

The core authorization model is:

User Wallet → Portfolio → Permission Grant → Strategy Rule → Execution Request → Validation → Blockchain Transaction

The critical security boundary is:

AI can propose an execution.  
INDEXLA determines whether it is authorized and safe.  
The blockchain determines whether it occurred.



---



# 3. Smart Contract Architecture

INDEXLA uses chain-specific deployments rather than one global contract.

### EVM

Solidity  
OpenZeppelin  
EIP-712 typed signatures  
ERC-20  
ERC-4337-compatible account abstraction architecture  
UUPS upgradeability where appropriate

### Solana

Anchor  
Native Solana programs

### Sui

Move  
Native Move modules

Each deployment exposes consistent logical behavior while respecting the native execution model of each network.

### Core Contract Components

PortfolioFactory

Creates portfolio records and links ownership to the user's wallet.

Portfolio Registry

Stores portfolio metadata, allocations, supported assets, and automation configuration.

Index Registry

Stores creator-defined investment templates and target allocations.

Permission Manager

The security gateway for automated execution.

Automation Registry

Stores user-approved strategy rules.

Fee Manager

Handles execution fees and protocol accounting.

Treasury Manager

Separates protocol-owned treasury assets and treasury operations from user portfolios.

User balances are never stored as protocol custody balances.



---



# 4. Permission Model

INDEXLA uses least-privilege authorization.

Every automation session is scoped to:


|            |                                               |
| ---------- | --------------------------------------------- |
| Permission | Scope                                         |
| Portfolio  | Specific portfolio or index                   |
| Assets     | Approved assets only                          |
| Chains     | Approved networks only                        |
| Rules      | Explicitly authorized strategies              |
| Protocols  | Approved execution providers                  |
| Spending   | Configured allocation/spending limits         |
| Frequency  | Defined execution interval                    |
| Expiration | Session expiry                                |
| Mode       | Fixed Capital, Auto Compound, or Profit Vault |


INDEXLA cannot silently expand an existing authorization.

Changing a material parameter requires renewed authorization.

Examples include:

New asset → New authorization  
New chain → New authorization  
New strategy → New authorization  
Changed allocation → New authorization  
Changed execution frequency → New authorization

Users can revoke an individual rule, portfolio automation, index automation, or the entire authorization.

Revocation stops future execution immediately. Already-confirmed blockchain transactions cannot be reversed by revocation.



---



# 5. Automation Authorization Flow

Connect Wallet

↓

Create Portfolio / Index

↓

Configure Strategy

↓

Review Permissions

↓

Sign Authorization

↓

Automation Session Created

↓

Market Monitoring Begins

No automated execution can begin without explicit authorization.



---



# 6. Strategy Engine

Strategies are deterministic rules defined by the investor.

Supported strategy types include:

Fear & Greed  
Accumulate during defined fear conditions and reduce exposure during defined greed conditions.

RSI  
Accumulate below the configured oversold threshold and reduce exposure above the configured overbought threshold.

Momentum  
Increase or reduce exposure according to defined trend conditions and timeframe.

Take Profit  
Reduce exposure when a predefined price or profit target is reached.

Stop Loss  
Reduce or exit exposure when the configured downside threshold is reached.

Rebalancing  
Restore portfolio allocations when configured drift thresholds are exceeded.

DCA  
Execute predefined purchases or sales according to schedule and conditions.

Strategies can also be combined.

For example:

Fear + RSI + Rebalancing

can require multiple conditions to be satisfied before an execution request is generated.

Conflicting rules do not automatically override one another. The Execution Risk Controller evaluates rule priority, portfolio constraints, available capital, existing pending executions, and configured limits before execution.



---



# 7. Market Data & Oracle Architecture

INDEXLA separates market-data acquisition from strategy execution.

### Price Data

The valuation architecture uses multiple sources:

Primary source → Secondary source → Fallback source

Where supported, decentralized price infrastructure such as Chainlink and Pyth provides reference pricing.

For assets without suitable decentralized feeds, INDEXLA uses approved external market-data providers through a controlled adapter layer.

### Strategy Signals

RSI and momentum are calculated from validated price series.

Fear & Greed uses an external sentiment-data adapter with source validation and freshness checks.

Every signal is evaluated for:

Freshness  
Source agreement  
Deviation  
Liquidity  
Volatility  
Historical anomalies

If confidence falls below protocol requirements, affected automation is paused rather than executed against uncertain data.



---



# 8. Monitoring & Execution Latency

The automation monitoring service targets a 60-second strategy evaluation interval during normal operation.

When a qualifying condition is detected:

Signal Detection → Rule Evaluation → Risk Validation → Execution Planning

Execution proceeds immediately when all required conditions pass.

Blockchain confirmation time remains dependent on the underlying network, gas conditions, liquidity, bridge settlement, and execution provider.

INDEXLA therefore separates:

Signal latency  
from  
Transaction confirmation latency

A delayed blockchain confirmation does not cause the system to treat the same execution as new. Every execution receives a unique Execution ID.



---



# 9. AI & OpenServ Architecture

OpenServ operates as the orchestration and reasoning layer.

It can:

- Monitor market conditions
- Evaluate user-defined rules
- Generate execution requests
- Coordinate execution workflows
- Trigger notifications

OpenServ cannot:

- Create permissions
- Modify permissions
- Change allocations
- Change strategy rules
- Withdraw assets
- Transfer assets arbitrarily
- Override execution policies
- Execute unrestricted blockchain transactions

The AI produces an execution request.

The deterministic INDEXLA validation layer decides whether that request is authorized and safe.

### AI Failure

OpenServ is not a custody or authorization dependency.

If OpenServ becomes unavailable:

Monitoring stops → No new execution requests are generated → Existing permissions remain unchanged → User assets remain untouched.

The protocol does not execute an unvalidated fallback action simply because the AI layer is unavailable.

The orchestration provider is also isolated behind an abstraction layer so the protocol can support additional orchestration infrastructure as it matures.



---



# 10. Cross-Chain Execution

INDEXLA uses an execution abstraction layer between its Execution Engine and external routing infrastructure.

[LI.FI](http://LI.FI) is the initial execution provider for:

- Cross-chain routing
- Bridge selection
- DEX routing
- Swap execution

[LI.FI](http://LI.FI) is not treated as a permanent architectural dependency. The abstraction layer supports alternative bridge providers, aggregators, direct DEX integrations, chain-native liquidity, and future internal routing.

### Cross-Chain Flow

Strategy Trigger

↓

Permission Validation

↓

Portfolio State Validation

↓

Route Planning

↓

Liquidity & Gas Validation

↓

Simulation

↓

Source-Chain Execution

↓

Bridge / Cross-Chain Settlement

↓

Destination Execution

↓

Confirmation

↓

Portfolio Reconciliation



---



# 11. Cross-Chain Atomicity & Partial Execution

Cross-chain transactions are not assumed to be atomic.

If a multi-step rebalance partially succeeds, INDEXLA records the exact state of every step.

Example:

Sell → Bridge → Buy

If the bridge fails after the sale:

The system does not pretend the portfolio is complete.

The execution enters a partial state and the Recovery Engine evaluates:

Retry  
Alternative Route  
Rebalance From Current State  
Pause & Notify User

There is no artificial "rollback" claim for irreversible blockchain transactions.

Instead, INDEXLA uses state reconciliation and compensating execution to return the portfolio toward its configured target.



---



# 12. Execution State Machine

Every execution follows a deterministic lifecycle:

Queued

↓

Validated

↓

Simulated

↓

Submitted

↓

Pending Confirmation

↓

Confirmed

or

Failed

↓

Failure Classification

↓

Retry / Alternative Route / User Notification

↓

Re-validation

↓

Execution

Temporary failures such as RPC outages, bridge downtime, congestion, or provider failures can be retried.

Permanent failures such as revoked permissions, expired sessions, insufficient liquidity, or exceeded slippage limits are not blindly retried.



---



# 13. Execution Risk Controller

Before every execution, INDEXLA validates:

Authorization

Is the session valid and unexpired?

Portfolio State

Does the portfolio still exist and match the expected state?

Asset Eligibility

Are all assets approved?

Liquidity

Can the transaction execute within defined limits?

Gas

Is sufficient gas available?

Route

Is the selected provider and route healthy?

Slippage

Is expected execution within user and protocol limits?

Simulation

Does the transaction produce an acceptable result?

Duplicate Protection

Has this trigger already been executed?

If any critical check fails, execution is rejected or paused.



---



# 14. Slippage & MEV Protection

Every execution is subject to:

- User-defined slippage limits
- Protocol maximum slippage limits
- Transaction deadlines
- Liquidity validation
- Route validation
- Simulation

Where supported by the selected execution route, INDEXLA can use private transaction / protected order-flow infrastructure to reduce public-mempool exposure.

When private execution is unavailable, tight slippage and deadline controls limit the amount of adverse execution the protocol is willing to accept.

INDEXLA does not claim that MEV can be eliminated completely.

The system's policy is simple:

Bad execution is rejected rather than forced.



---



# 15. Liquidity & Execution Quality

The routing engine prioritizes:

Deep liquidity  
Low price impact  
Acceptable execution cost  
Healthy providers  
Secure routes

For tokenized equities, commodities, and RWAs, asset eligibility includes liquidity, market depth, trading availability, price-feed reliability, security assessment, and issuer/asset allowlisting where applicable.

If liquidity is insufficient:

Do not execute.

The system can evaluate alternative routes when available.



---



# 16. Gas & Relayer Architecture

Gas management is separated from user asset custody.

### MVP

Users provide the required network gas through their connected wallet.

### Post-MVP

The User Gas Manager maintains sufficient native gas using assets authorized by the user.

The INDEXLA Gas Manager acts as an emergency mechanism when the User Gas Manager cannot complete the required replenishment.

Treasury liquidity can be used by the INDEXLA Gas Manager for gas exchange under explicit protocol controls.

Where EIP-4337 account abstraction is deployed, UserOperations can be submitted through compatible bundler infrastructure and gas abstraction mechanisms.

Gas management never grants the gas subsystem unrestricted access to user assets.



---



# 17. Security Architecture

INDEXLA uses defense in depth.

### Permission Security

- Least privilege
- Portfolio-scoped permissions
- Asset allowlists
- Chain allowlists
- Protocol allowlists
- Spending limits
- Expiration
- Revocation

### Execution Security

- Simulation
- Slippage controls
- Transaction deadlines
- Liquidity validation
- Route validation
- Idempotency
- Transaction verification

### Infrastructure Security

- Provider health monitoring
- RPC redundancy
- Oracle monitoring
- Chain-health monitoring
- Circuit breakers
- Continuous reconciliation

### Treasury Security

Protocol treasury assets remain separate from user assets and are controlled through dedicated treasury authorization.

Smart contracts undergo independent security review before handling meaningful capital.



---



# 18. Key Management

INDEXLA never requires user private keys.

Operational infrastructure keys are separated from user authorization and are never capable of bypassing the Permission Manager.

Production operational secrets are isolated using managed key-storage infrastructure with access controls, rotation, and audit logging.

No OpenServ agent receives a user's private key or unrestricted signing capability.

The execution service can only submit actions that satisfy the authorization and validation boundaries.



---



# 19. Upgradeability & Administrative Controls

Upgradeable contracts use UUPS architecture only where upgradeability is required.

Contracts that do not require upgrades remain immutable.

Administrative upgrades are separated from normal execution and require protocol-controlled authorization.

Upgrade authority is restricted through multisignature administration and timelocked changes where applicable.

An upgrade cannot expand an individual user's permissions.

User authorization remains separate from protocol administration.



---



# 20. Circuit Breakers

INDEXLA can independently pause:

A rule  
A portfolio  
An asset  
A blockchain  
An execution provider  
Cross-chain execution  
The complete execution system

Triggers include:

- Oracle failure
- Abnormal pricing
- Liquidity deterioration
- Repeated execution failures
- Bridge/provider outage
- Network congestion
- Security incidents

A failure on one chain does not automatically disable healthy chains.



---



# 21. Idempotency & Duplicate Protection

Every execution receives a unique Execution ID.

INDEXLA uses:

- Distributed execution locks
- Database uniqueness constraints
- Transaction verification
- Duplicate event detection
- On-chain reconciliation

The same trigger cannot unintentionally execute twice.



---



# 22. State Consistency & Reconciliation

The blockchain remains the ultimate source of truth.

The backend maintains an indexed projection for performance.

Critical execution records contain:

- Execution ID
- Portfolio ID
- Rule ID
- Validation state
- Transaction hash
- Execution status
- Failure reason
- Recovery action

Continuous reconciliation protects against:

RPC inconsistency  
Indexer lag  
Missed events  
Chain reorganizations  
Partial backend failures



---



# 23. Asset Eligibility

INDEXLA does not treat every token as automatically eligible.

Supported asset categories can include:

Crypto  
Stablecoins  
Tokenized equities  
Tokenized commodities  
Tokenized RWAs

Assets must pass defined eligibility requirements including:

- Liquidity
- Market depth
- Trading availability
- Price-feed reliability
- Security assessment
- Issuer/asset allowlisting where applicable

The Asset Registry prevents unsupported assets from entering automated execution.



---



# 24. Data Model

The core protocol objects are:

### Portfolio

Portfolio {

  portfolioId

  owner

  assets

  targetAllocations

  automationConfig

  metadata

  performanceState

}

  


### Permission Grant

Permission {

  portfolioId

  owner

  assets

  chains

  rules

  spendingLimits

  executionFrequency

  protocols

  automationMode

  expiration

  revocationStatus

}

  


### Strategy

Strategy {

  strategyId

  ruleType

  parameters

  timeframe

  executionFrequency

  allocationLimits

  enabled

}

  


### Execution Request

ExecutionRequest {

  executionId

  portfolioId

  strategyId

  trigger

  requestedActions

  expectedRoute

  slippageLimit

  deadline

  validationState

}

  


The backend indexes these objects, while confirmed blockchain state remains authoritative.



---



# 25. Observability

Every execution is traceable through its Execution ID.

Production monitoring covers:

- Execution success rate
- Failed executions
- Queue latency
- RPC health
- Bridge status
- Provider health
- Oracle health
- Gas health
- Portfolio synchronization
- API latency
- Treasury health

The architecture supports redundant RPC providers, persistent queues, database replication, horizontal scaling, and multi-region deployment as demand increases.



---



# 26. What Happens If INDEXLA Goes Offline?

The architecture is non-custodial.

If INDEXLA infrastructure becomes unavailable:

User assets remain in user-controlled wallets.

Already-confirmed blockchain transactions remain valid.

Pending executions remain subject to blockchain state.

Automated strategies stop generating new execution requests until monitoring infrastructure resumes.

The protocol cannot withdraw user assets simply because its backend is offline.

This is a fundamental consequence of keeping user assets outside INDEXLA custody.



---



# 27. Technical Differentiation

INDEXLA is not simply a trading bot.

The architecture combines:

Direct asset ownership

No basket token or custodial vault is required.

Rule-bounded automation

Users define the strategy and its limits.

AI-assisted orchestration

AI coordinates monitoring and execution without owning authorization.

Multi-asset infrastructure

Crypto, tokenized equities, commodities, and RWAs can share the same portfolio model.

Cross-chain execution

The execution layer abstracts routing and settlement across supported networks.

Creator-native distribution

Investment strategies become programmable portfolios with verifiable performance histories.

The technical differentiation is therefore not one individual smart contract.

It is the integration of:

Portfolio Ownership + Permissioned Automation + Cross-Chain Execution + AI Orchestration + Creator Distribution



---



# 28. Progressive Deployment

### Phase 1 — MVP

- One EVM network
- Solana
- Wallet connection
- Portfolio creation
- Index creation
- Marketplace
- Non-custodial ownership
- Deposits
- Manual buy/sell
- Valuation
- Basic performance
- Creator attribution
- Basic Take Profit

### Phase 2 — Execution Expansion

- Additional EVM networks
- Cross-chain execution
- Multi-provider routing
- Liquidity optimization
- Rebalancing
- DCA
- Advanced Take Profit
- Expanded permissions
- Gas management

### Phase 3 — AI-Assisted Automation

- OpenServ orchestration
- Advanced strategy engine
- Automated monitoring
- Cross-chain automated execution
- Advanced recovery
- Multi-provider execution optimization

### Phase 4 — Full Protocol

- Institutional infrastructure
- Broader chain coverage
- Broader asset coverage
- Advanced execution optimization
- Additional account-abstraction capabilities

This progression keeps the MVP focused while preserving the architecture required for the complete protocol.



---



# 29. Architecture Principles

1. Non-custodial by design
2. Explicit user authorization
3. Least-privilege permissions
4. AI cannot override deterministic controls
5. Validate before execution
6. Simulate before submission
7. Confirm before accounting
8. Never force unsafe execution
9. Graceful failure instead of silent failure
10. Idempotent execution
11. Independent chain health
12. Replaceable infrastructure providers
13. Minimal smart-contract surface
14. Protocol treasury separated from user assets
15. Progressive decentralization
16. Complexity increases only when product demand justifies it

These principles are consistent with the existing architecture specification.



---



# 30. Final Architecture

User

↓

Wallet

↓

Portfolio / Index

↓

User Authorization

↓

Market Data

↓

Strategy / OpenServ

↓

INDEXLA Permission & Risk Layer

↓

Execution Planning

↓

Liquidity / Gas / Route Validation

↓

Simulation

↓

[LI.FI](http://LI.FI) / Execution Provider

↓

Blockchain

↓

Confirmation

↓

Reconciliation

↓

Portfolio State

↓

Marketplace / Analytics

The fundamental boundary remains:

The user owns the assets.  
The user defines the rules.  
AI coordinates the workflow.  
INDEXLA enforces the authorization and risk boundaries.  
External execution infrastructure routes the transaction.  
The blockchain settles the result.



  
  
