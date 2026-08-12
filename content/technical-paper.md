# INDEXLA

## Technical Paper & Engineering Bible

Version: 1.0  
Status: Architecture Freeze  
Date: August 2026  
Purpose: Master technical specification for MVP and production development



---



# 1. Executive Summary

INDEXLA is a decentralized, non-custodial portfolio management and investment automation protocol.

It allows users to create, discover and automate portfolios across multiple blockchain networks and asset classes.

INDEXLA combines:

- Multi-chain portfolio management
- Cross-chain execution
- Crypto and tokenized asset support
- AI-assisted strategy execution
- User-defined automation
- Smart-account permissions
- Risk controls
- Creator-managed portfolios

The fundamental architecture is:

Users retain ownership. Users authorize automation. AI proposes or orchestrates actions. INDEXLA validates them. Smart contracts enforce permissions. Blockchains execute them.

INDEXLA never requires users to surrender private keys or deposit assets into an INDEXLA-controlled custody wallet.



---



# 2. Core Architectural Principle

The protocol must always maintain the following separation:

AI Reasoning

     ↓

Execution Intent

     ↓

Policy Validation

     ↓

Risk Validation

     ↓

Smart Contract Permission Enforcement

     ↓

Blockchain Execution

  


Never:

AI

 ↓

Unrestricted Wallet

 ↓

Blockchain

  


The AI layer is not the security boundary.

The blockchain permission layer is.



---



# 3. Product Definition

INDEXLA is:

A non-custodial portfolio management and automation protocol that enables users to manage and automate multi-chain, multi-asset investment strategies while retaining control of their assets.

INDEXLA is not:

- a custodian
- a centralized asset manager
- a bridge
- a DEX
- an unrestricted AI wallet
- a hedge fund



---



# 4. Design Principles

## 4.1 Non-Custody

User assets remain under user-controlled wallets or smart accounts.

## 4.2 Least Privilege

Automation receives only the minimum authority necessary.

## 4.3 Explicit Authorization

Automation cannot begin without user authorization.

## 4.4 Fail Closed

Unknown, invalid or unsafe actions are rejected.

## 4.5 Deterministic Execution

AI output must become a structured execution intent before any transaction can occur.

## 4.6 Modular Infrastructure

External providers must be replaceable.

## 4.7 Cross-Chain by Design

Multi-chain execution is part of the initial architecture, not a later feature.



---



# 5. MVP Definition

The MVP exists to prove one fundamental proposition:

A user can create a portfolio, authorize bounded automation, have an AI system monitor the strategy, and execute an authorized cross-chain transaction without INDEXLA taking custody.

The MVP should initially operate on testnets.



---



# 6. MVP User Flow

Connect Wallet

      ↓

Create Portfolio

      ↓

Configure Strategy

      ↓

Review Permissions

      ↓

Authorize Automation

      ↓

AI Monitors Conditions

      ↓

Execution Intent Created

      ↓

Policy Validation

      ↓

Risk Validation

      ↓

[LI.FI](http://LI.FI) Route

      ↓

Authorized Execution

      ↓

Transaction Monitoring

      ↓

Portfolio Updated

  




---



# 7. MVP Features

Required MVP features:

- Wallet connection
- Portfolio creation
- Asset selection
- Allocation configuration
- Strategy configuration
- Automation sessions
- Permission management
- AI reasoning/orchestration
- [LI.FI](http://LI.FI) integration
- Policy engine
- Basic risk engine
- Execution engine
- Transaction monitoring
- Automation revocation
- Portfolio valuation
- Audit history



---



# 8. MVP Strategies

Initial supported strategies:

### DCA

Execute a defined amount at a defined interval.

### Buy in Fear

Execute when a defined market fear threshold is reached.

### Sell in Greed

Execute when a defined market greed threshold is reached.

### Rebalance

Move portfolio allocations toward target weights.

All strategies generate bounded execution intents.



---



# 9. MVP Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- TypeScript
- PostgreSQL
- Redis where required

### Smart Contracts

- Solidity
- Foundry
- OpenZeppelin where appropriate

### AI

- OpenServ/SERV

### Cross-Chain Execution

- [LI.FI](http://LI.FI)

### Wallets

- MetaMask
- Phantom
- WalletConnect-compatible wallets



---



# 10. Production Architecture

Production expands the MVP into a modular protocol:

                        USER

                           |

                  Wallet / Smart Account

                           |

                           ↓

                    INDEXLA Frontend

                           |

                           ↓

                     API Gateway

                           |

              +------------+------------+

              |                         |

       Portfolio Layer            Automation Layer

              |                         |

              ↓                         ↓

       Allocation Engine            AI Agents

              |                         |

              +------------+------------+

                           |

                    Execution Intent

                           |

                           ↓

                     Policy Engine

                           |

                           ↓

                      Risk Engine

                           |

                           ↓

                   Execution Router

                           |

                  +--------+--------+

                  |                 |

                [LI.FI](http://LI.FI)          Future Providers

                  |

            Cross-Chain / Swap

                  |

                  ↓

             Smart Account

                  |

                  ↓

              Blockchain

  




---



# 11. System Components

Production consists of:

1. Frontend
2. API Gateway
3. Portfolio Engine
4. Strategy Engine
5. AI Orchestration Layer
6. Policy Engine
7. Risk Engine
8. Execution Engine
9. Valuation Engine
10. Asset Registry
11. Permission Manager
12. Portfolio Registry
13. Smart Account Modules
14. Gas Manager
15. Treasury
16. Market Data Layer
17. Transaction Monitor
18. Notification System
19. Audit System



---



# 12. Portfolio Registry

The Portfolio Registry defines portfolio identities.

Responsibilities:

- create portfolio
- register owner
- associate metadata
- associate assets
- associate strategies
- update portfolio status

The registry must not become a general-purpose custody contract.



---



# 13. Frozen Solidity Interface: IPortfolioRegistry

The following interface is the architectural baseline.

interface IPortfolioRegistry {

    struct Portfolio {

        address owner;

        bytes32 metadataHash;

        uint64 createdAt;

        bool active;

    }

  


    function createPortfolio(

        bytes32 portfolioId,

        bytes32 metadataHash

    ) external;

  


    function updateMetadata(

        bytes32 portfolioId,

        bytes32 metadataHash

    ) external;

  


    function deactivatePortfolio(

        bytes32 portfolioId

    ) external;

  


    function ownerOf(

        bytes32 portfolioId

    ) external view returns (address);

  


    function getPortfolio(

        bytes32 portfolioId

    ) external view returns (Portfolio memory);

  


    function isActive(

        bytes32 portfolioId

    ) external view returns (bool);

}

  


This interface is frozen for MVP architecture.

Implementations may evolve internally without changing the external contract unless a versioned interface is introduced.



---



# 14. Permission Architecture

Permissions are the core security boundary.

An automation session contains:

Owner

Portfolio

Executor

Allowed Assets

Allowed Chains

Allowed Actions

Maximum Transaction Amount

Maximum Daily Amount

Maximum Slippage

Expiration

Nonce

Status

  




---



# 15. Frozen Solidity Interface: IPermissionManager

interface IPermissionManager {

    struct Permission {

        address owner;

        bytes32 portfolioId;

        address executor;

        bytes32 allowedAssetsHash;

        uint256 allowedChainsBitmap;

        uint256 allowedActionsBitmap;

        uint256 maxPerTransaction;

        uint256 maxDaily;

        uint256 maxSlippageBps;

        uint64 expiry;

        uint256 nonce;

        bool active;

    }

  


    function createPermission(

        bytes32 permissionId,

        Permission calldata permission

    ) external;

  


    function revokePermission(

        bytes32 permissionId

    ) external;

  


    function pausePermission(

        bytes32 permissionId

    ) external;

  


    function validatePermission(

        bytes32 permissionId,

        address executor,

        bytes32 portfolioId,

        uint256 amount

    ) external view returns (bool);

  


    function getPermission(

        bytes32 permissionId

    ) external view returns (Permission memory);

  


    function isActive(

        bytes32 permissionId

    ) external view returns (bool);

}

  




---



# 16. Permission Invariants

The protocol must guarantee:

1. Revoked permissions cannot execute.
2. Expired permissions cannot execute.
3. Wrong executor cannot execute.
4. Wrong portfolio cannot execute.
5. Amount above transaction limit cannot execute.
6. Daily limit cannot be exceeded.
7. Unauthorized assets cannot execute.
8. Unauthorized chains cannot execute.
9. Replay of a previous authorization cannot execute.
10. AI cannot modify its own permissions.



---



# 17. Permission Lifecycle

CREATED

   ↓

ACTIVE

   ↓

PAUSED

   ↓

ACTIVE

   ↓

REVOKED

  


Or:

ACTIVE

   ↓

EXPIRED

  


Revocation is terminal for that permission ID.



---



# 18. Permission Revocation

Users must have a direct mechanism to disable automation.

When revoked:

permission.active = false

  


Every future execution must fail permission validation.

Revocation must not depend on the INDEXLA backend being operational.



---



# 19. Session Security

Each automation session includes:

- unique session ID
- nonce
- expiry
- executor identity
- portfolio scope
- asset scope
- spending limits
- execution restrictions

This prevents unlimited or indefinite AI authority.



---



# 20. Execution Router

The Execution Router transforms an approved intent into an execution request.

Responsibilities:

- validate execution intent
- validate permission
- request route
- validate route
- enforce limits
- submit execution
- return execution state



---



# 21. Frozen Solidity Interface: IExecutionRouter

interface IExecutionRouter {

    struct ExecutionRequest {

        bytes32 intentId;

        bytes32 portfolioId;

        bytes32 permissionId;

        address executor;

        uint256 sourceChainId;

        uint256 destinationChainId;

        address sourceAsset;

        address destinationAsset;

        uint256 amount;

        uint256 minAmountOut;

        uint256 deadline;

        bytes routeData;

    }

  


    function execute(

        ExecutionRequest calldata request

    ) external returns (bytes32 executionId);

  


    function validateExecution(

        ExecutionRequest calldata request

    ) external view returns (bool);

  


    function cancel(

        bytes32 executionId

    ) external;

  


    function executionStatus(

        bytes32 executionId

    ) external view returns (uint8);

}

  


This is the baseline execution interface.



---



# 22. Execution Intent

Execution Intent is the canonical bridge between AI reasoning and blockchain execution.

It is not merely an example object.

It is a versioned protocol object.



---



# 23. Frozen Execution Intent Schema

{

  "version": 1,

  "intentId": "bytes32",

  "portfolioId": "bytes32",

  "strategyId": "bytes32",

  "permissionId": "bytes32",

  "executor": "address",

  "action": "SWAP",

  "source": {

    "chainId": 8453,

    "asset": "address",

    "amount": "uint256"

  },

  "destination": {

    "chainId": 42161,

    "asset": "address"

  },

  "constraints": {

    "maxSlippageBps": 100,

    "maxPriceImpactBps": 300,

    "minAmountOut": "uint256",

    "deadline": "uint64"

  },

  "nonce": "uint256",

  "createdAt": "uint64"

}

  




---



# 24. Execution Intent Requirements

Required:

- version
- intent ID
- portfolio ID
- strategy ID
- permission ID
- executor
- action
- source
- destination
- amount
- constraints
- nonce
- timestamp

Unknown fields must be ignored or rejected according to schema version policy.

Missing required fields cause rejection.



---



# 25. Execution Intent Validation

The intent must pass:

Schema Validation

       ↓

Authentication

       ↓

Permission Validation

       ↓

Asset Validation

       ↓

Chain Validation

       ↓

Amount Validation

       ↓

Route Validation

       ↓

Risk Validation

       ↓

Execution

  




---



# 26. Execution State Machine

CREATED

   ↓

VALIDATING

   ↓

POLICY_APPROVED

   ↓

ROUTE_REQUESTED

   ↓

ROUTE_SELECTED

   ↓

RISK_APPROVED

   ↓

EXECUTING

   ↓

PENDING

   ↓

CONFIRMED

   ↓

SETTLED

  


Failure states:

REJECTED

EXPIRED

CANCELLED

FAILED

REVERTED

  




---



# 27. Execution Idempotency

Every execution has a unique idempotency key.

Recommended:

executionId =

hash(

    portfolioId,

    strategyId,

    permissionId,

    nonce,

    intentId

)

  


Repeated requests must not produce duplicate transactions.



---



# 28. OpenAPI API Architecture

The production API is organized into:

/auth

/wallets

/portfolios

/assets

/strategies

/permissions

/automation

/valuation

/routes

/executions

/transactions

/risk

/notifications

  




---



# 29. Core OpenAPI Endpoints

### Create Portfolio

POST /v1/portfolios

  


Request:

{

  "name": "AI Hybrid Mix",

  "metadataHash": "0x..."

}

  


Response:

{

  "portfolioId": "0x...",

  "owner": "0x...",

  "status": "ACTIVE"

}

  


### Get Portfolio

GET /v1/portfolios/{portfolioId}

  


### Create Strategy

POST /v1/portfolios/{portfolioId}/strategies

  


### Create Automation Session

POST /v1/portfolios/{portfolioId}/automation

  


### Revoke Automation

POST /v1/automation/{sessionId}/revoke

  


### Create Execution Intent

POST /v1/executions/intents

  


### Validate Execution

POST /v1/executions/validate

  


### Execute

POST /v1/executions

  


### Get Execution

GET /v1/executions/{executionId}

  


### Get Portfolio Valuation

GET /v1/portfolios/{portfolioId}/valuation

  




---



# 30. API Security

All authenticated requests must use signed or authenticated credentials.

Execution endpoints additionally require:

- permission ID
- authenticated executor
- valid intent
- idempotency key

The frontend cannot directly bypass backend policy controls.



---



# 31. API Error Model

Standard response:

{

  "error": {

    "code": "PERMISSION_EXPIRED",

    "message": "Automation permission has expired.",

    "requestId": "req_123"

  }

}

  


Core error codes:

INVALID_INTENT

PERMISSION_NOT_FOUND

PERMISSION_REVOKED

PERMISSION_EXPIRED

UNAUTHORIZED_EXECUTOR

ASSET_NOT_ALLOWED

CHAIN_NOT_ALLOWED

AMOUNT_LIMIT_EXCEEDED

DAILY_LIMIT_EXCEEDED

SLIPPAGE_EXCEEDED

RISK_REJECTED

ROUTE_UNAVAILABLE

EXECUTION_FAILED

EMERGENCY_PAUSED

DUPLICATE_EXECUTION

  




---



# 32. Sequence Diagram

User

 |

 | Create strategy

 v

INDEXLA Frontend

 |

 | Authorize

 v

Smart Account / Permission Manager

 |

 | Permission active

 v

INDEXLA Monitor

 |

 | Market condition triggered

 v

AI / OpenServ

 |

 | Structured Execution Intent

 v

Policy Engine

 |

 | Valid

 v

Risk Engine

 |

 | Approved

 v

[LI.FI](http://LI.FI)

 |

 | Route

 v

Execution Router

 |

 | Authorized transaction

 v

Smart Account

 |

 | Transaction

 v

Blockchain

 |

 | Confirmation

 v

INDEXLA Monitor

 |

 | Update

 v

Portfolio / Valuation Engine

 |

 v

User

  




---



# 33. AI Architecture

AI responsibilities:

- strategy reasoning
- market interpretation
- opportunity detection
- portfolio analysis
- execution planning
- monitoring
- user explanations

AI cannot:

- modify permissions
- increase spending limits
- change ownership
- authorize itself
- bypass risk controls
- directly access private keys
- execute arbitrary transactions



---



# 34. OpenServ Integration

OpenServ/SERV is the initial AI reasoning and orchestration layer.

Responsibilities:

- reasoning
- tool orchestration
- agent workflows
- monitoring
- structured execution planning

INDEXLA-specific authorization remains outside OpenServ.

OpenServ therefore acts as:

Reasoning and orchestration infrastructure, not custody infrastructure.



---



# 35. AI Output Boundary

AI output must always be converted into a structured intent.

AI

 ↓

JSON Schema Validation

 ↓

Policy Engine

 ↓

Risk Engine

 ↓

Execution

  


AI-generated natural language cannot directly trigger blockchain execution.



---



# 36. AI Threat Model

External data is untrusted.

Potential attacks:

- prompt injection
- malicious token metadata
- malicious web content
- compromised tool output
- manipulated market information

Mitigation:

- structured inputs
- tool isolation
- schema validation
- policy validation outside AI
- allowlists
- deterministic execution constraints



---



# 37. [LI.FI](http://LI.FI) Integration

[LI.FI](http://LI.FI) is the initial execution and routing provider.

It provides routing infrastructure for:

- swaps
- bridges
- cross-chain execution
- multi-step routes

INDEXLA requests routes from [LI.FI](http://LI.FI) but does not automatically trust them.

Every route passes INDEXLA validation.



---



# 38. [LI.FI](http://LI.FI) Execution Flow

Execution Intent

      ↓

[LI.FI](http://LI.FI) Quote / Route

      ↓

Route Validation

      ↓

Slippage Validation

      ↓

Price Impact Validation

      ↓

Bridge / DEX Validation

      ↓

Transaction Generation

      ↓

Authorized Execution

  


Provider abstraction must allow future execution providers.



---



# 39. Execution Provider Interface

Conceptual interface:

interface ExecutionProvider {

  getQuote(request): Promise<Quote>;

  getRoute(request): Promise<Route>;

  buildTransaction(route): Promise<Transaction>;

  simulate(transaction): Promise<SimulationResult>;

  submit(transaction): Promise<SubmissionResult>;

  getStatus(executionId): Promise<ExecutionStatus>;

}

  


Initial implementation:

[LI.FI](http://LI.FI) Provider

  


Future providers can implement the same abstraction.



---



# 40. Policy Engine

The Policy Engine validates every execution.

Checks:

### Authorization

- session active
- executor authorized
- portfolio correct
- nonce valid

### Assets

- asset supported
- asset permitted
- asset not blocked

### Chains

- chain supported
- chain permitted

### Amount

- transaction limit
- daily limit
- portfolio limit

### Route

- bridge
- DEX
- slippage
- price impact
- destination



---



# 41. Risk Engine

The Risk Engine is independent from AI.

Initial controls:

- maximum transaction amount
- maximum daily amount
- maximum slippage
- maximum price impact
- asset allowlist
- chain allowlist
- route allowlist
- cooldowns
- frequency limits
- emergency shutdown



---



# 42. Execution Risk Controller

Production introduces a dedicated Execution Risk Controller.

It evaluates:

- bridge reliability
- liquidity
- token risk
- route quality
- market volatility
- price impact
- abnormal execution patterns
- historical failures

It can disable one route without disabling the entire protocol.



---



# 43. Circuit Breakers

Circuit breakers exist at:

Asset

Route

Strategy

Portfolio

Global

  


Example:

Bridge failure rate increases

        ↓

Disable bridge

        ↓

Use alternative route

  




---



# 44. Transaction Simulation

Where supported, transactions should be simulated before execution.

Validate:

- expected balance changes
- recipient
- token approvals
- minimum output
- gas
- revert conditions
- contract interactions

Simulation failure means:

Do not execute.



---



# 45. Smart Account Architecture

Production EVM architecture should support modular smart accounts.

Primary candidate:

- Safe

Potential architecture:

Smart Account

 |

 +-- Owner Control

 |

 +-- INDEXLA Automation Module

 |

 +-- Risk Guard

 |

 +-- Recovery Module

 |

 +-- Account Abstraction

  


Safe modules are security-critical because modules can execute transactions.



---



# 46. ERC-4337

ERC-4337 may provide:

- account abstraction
- UserOperations
- gas sponsorship
- batching
- improved automation UX

ERC-4337 does not replace INDEXLA's permission model.



---



# 47. ERC-7579

INDEXLA should target ERC-7579-compatible modular architecture where practical.

This reduces dependence on one smart-account implementation and supports reusable modules.



---



# 48. ERC-8004

Production architecture may use ERC-8004 for agent identity.

Conceptually:

INDEXLA Agent

      ↓

ERC-8004 Identity

      ↓

Identity / Reputation / Validation

  


Agent identity is not equivalent to user fund authority.



---



# 49. Agent Authority Model

The following distinction must remain permanent:

IDENTITY

   ≠

AUTHORITY

   ≠

OWNERSHIP

  


An agent can have an on-chain identity without owning assets.

An agent can have temporary authority without ownership.



---



# 50. Valuation Engine

The Valuation Engine aggregates:

- balances
- token prices
- chain balances
- FX conversion
- portfolio NAV
- PnL
- allocation

Example:

Ethereum     $10,000

Base          $5,000

Solana        $3,000

RWA           $2,000

---------------------

Total        $20,000

  




---



# 51. Market Data

Market data architecture must be provider-agnostic.

Providers

   ↓

Aggregator

   ↓

Normalization

   ↓

Market Data Store

   ↓

Valuation / AI / Risk

  


Critical decisions should support multiple data sources where economically practical.



---



# 52. Oracle Safety

Reject or pause execution when:

- price is stale
- price unavailable
- providers diverge materially
- abnormal price movement detected
- liquidity is insufficient

Critical market uncertainty should fail closed.



---



# 53. Asset Registry

Every supported asset has:

assetId

chainId

address

symbol

decimals

assetType

status

riskLevel

priceProvider

liquidityStatus

  


Statuses:

ACTIVE

PAUSED

DEPRECATED

BLOCKED

  




---



# 54. Supported Assets

Target architecture supports:

- native cryptocurrencies
- ERC-20
- SPL tokens
- stablecoins
- tokenized stocks
- tokenized commodities
- tokenized RWAs

Asset eligibility is explicit.

Being technically routable does not automatically make an asset INDEXLA-eligible.



---



# 55. Supported Networks

Target architecture:

### EVM

- Ethereum
- Base
- Arbitrum
- BNB Chain
- Robinhood Chain

### Non-EVM

- Solana
- Sui
- Tao
- Sei

Each chain requires an independent adapter.



---



# 56. Chain Adapter

Standard interface:

interface ChainAdapter {

  getBalance();

  getTokenMetadata();

  buildTransaction();

  simulate();

  submit();

  getStatus();

}

  


The application layer must not contain chain-specific execution logic.



---



# 57. Portfolio Architecture

A portfolio contains:

Portfolio

 |

 +-- Assets

 +-- Target Allocations

 +-- Strategies

 +-- Risk Profile

 +-- Automation Sessions

 +-- Performance

 +-- Execution History

  




---



# 58. Allocation Engine

The Allocation Engine calculates:

Current Allocation

        ↓

Target Allocation

        ↓

Deviation

        ↓

Required Trade

  


It does not execute transactions.



---



# 59. Rebalancing

Rebalancing considers:

- target allocation
- gas
- fees
- slippage
- minimum trade size
- liquidity
- cross-chain cost

The result becomes an Execution Intent.



---



# 60. Gas Manager

The Gas Manager provides emergency cross-chain gas support.

Flow:

Execution requires gas

       ↓

Check user gas

       ↓

Sufficient → execute

       ↓

Insufficient

       ↓

Check Gas Manager policy

       ↓

Authorized gas conversion

       ↓

Execute

  


Controls:

- supported chains
- maximum gas budget
- rate limits
- treasury exposure
- emergency disable



---



# 61. Treasury

Treasury assets are separate from user assets.

User Assets

≠

INDEXLA Treasury

  


Treasury functions may include:

- operations
- liquidity
- gas support
- protocol reserves
- token buybacks
- strategic investments

Treasury authority must never overlap ambiguously with user permissions.



---



# 62. $DEXLA Utility

$DEXLA is the INDEXLA ecosystem token.

Current utility includes:

### Portfolio Publishing

Creators burn:

1,000 $DEXLA

to publish a portfolio/index.

### Fee Discounts

2,500 $DEXLA → 10% fee discount

5,000 $DEXLA → 20%

10,000 $DEXLA → 35%

  


### Ecosystem Utility

Potential future utility includes:

- governance
- ecosystem incentives
- creator incentives

Token utility must remain separate from user-fund security.



---



# 63. $DEXLA Token Allocation

Current allocation:


|               |            |
| ------------- | ---------- |
| Allocation    | Percentage |
| Seed          | 2.5%       |
| Private       | 10%        |
| Public        | 25%        |
| DEX Liquidity | 15%        |
| Treasury      | 15%        |
| Team          | 15%        |
| Community     | 10%        |
| CEX Listings  | 5%         |
| Advisors      | 2.5%       |
| Total         | 100%       |


Any future modification must be versioned in the tokenomics specification and reflected consistently across public documentation.



---



# 64. Token Vesting

Current vesting framework:

### Pre-Seed

10% at TGE  
6-month cliff  
18-month linear vesting

### Seed

10% at TGE  
3-month cliff  
18-month linear vesting

### Public

15% at TGE  
Remaining allocation vested over 6 months

### Team

12-month cliff  
24-month linear vesting

Any allocation category without a separately specified vesting schedule must be explicitly finalized before token launch rather than inferred.



---



# 65. Buyback / Burn

Current treasury model allocates:

25% of applicable protocol fees toward treasury buyback activity.

The exact execution mechanism, cadence, liquidity venue and disclosure policy must be finalized before implementation.

Buyback logic must never interfere with:

- user funds
- operational reserves
- security budgets
- emergency liquidity



---



# 66. Creator Economy

Creators can publish investment portfolios.

A creator portfolio includes:

Name

Description

Assets

Allocations

Strategy

Risk Profile

Performance

  


Creators may receive a defined share of applicable platform fees.

Current creator revenue share target:

50%



---



# 67. RWA Architecture

RWA support requires a separate eligibility framework.

Required considerations:

- issuer
- jurisdiction
- investor eligibility
- transfer restrictions
- whitelist requirements
- custody model
- legal wrapper
- liquidity
- compliance status

INDEXLA must not treat an RWA token as unrestricted crypto simply because it exists on-chain.



---



# 68. RWA Compliance Ownership & Timeline

RWA compliance is a production launch dependency, not an MVP dependency.

### Phase 1–2

No unrestricted regulated-RWA production exposure.

Architecture supports asset metadata and eligibility states.

### Phase 3 — Public Launch

INDEXLA establishes formal RWA eligibility and compliance processes with appropriate legal/compliance advisors.

Responsible owner:

INDEXLA legal/compliance function, supported by engineering for technical enforcement.

Required outputs:

- jurisdiction matrix
- asset eligibility framework
- transfer restriction model
- whitelist architecture where required
- issuer requirements
- user eligibility requirements

### Phase 4 — Global Expansion

Expand supported RWA jurisdictions and issuers only after legal/compliance approval.

No jurisdiction or regulated asset category should be enabled solely through engineering configuration.



---



# 69. Strategy Sandbox

AI-generated strategies must first pass:

Strategy

 ↓

Backtest

 ↓

Simulation

 ↓

Risk Review

 ↓

User Approval

 ↓

Production Automation

  


AI cannot silently deploy unrestricted new strategies.



---



# 70. Backtesting

Future engine supports:

- historical prices
- fees
- gas
- slippage
- rebalancing
- drawdown
- volatility
- benchmark comparison

Backtested results must always be clearly identified as simulated.



---



# 71. Security Architecture

Security is layered:

User Authorization

       ↓

Smart Contract Permission

       ↓

Policy Engine

       ↓

Risk Engine

       ↓

Route Validation

       ↓

Simulation

       ↓

Execution Monitoring

       ↓

Emergency Controls

  




---



# 72. Threat Model

INDEXLA must defend against:

### Compromised Backend

Backend cannot obtain user private keys.

### Compromised AI

AI remains bounded by permissions.

### Compromised Agent

Agent authority is scoped and expiring.

### Malicious Route

Route passes risk and policy validation.

### Replay

Nonce and idempotency protection.

### Unauthorized Asset

Asset registry and permission validation.

### Bridge Failure

Route monitoring and circuit breakers.

### Prompt Injection

External data isolation.



---



# 73. Approval Security

Avoid unlimited token approvals where practical.

Preferred:

Exact Token

Exact Spender

Exact Amount

Limited Lifetime

  


Approvals should be minimized.



---



# 74. Destination Security

Execution must validate:

- destination address
- contract address
- function
- parameters

Unexpected recipients must be rejected.



---



# 75. Fail-Closed Rules

Examples:

Expired permission → REJECT

Unknown asset → REJECT

Unknown chain → REJECT

Risk failure → REJECT

Invalid route → REJECT

Price unavailable → REJECT

Emergency mode → REJECT

Nonce mismatch → REJECT

Limit exceeded → REJECT

  




---



# 76. Observability

Every important action generates an audit event:

Strategy evaluated

Intent generated

Permission checked

Policy approved

Route requested

Route selected

Risk approved

Transaction submitted

Transaction confirmed

Portfolio updated

  




---



# 77. Audit Trail

Execution records should include:

timestamp

portfolioId

strategyId

sessionId

agentId

intentId

policyVersion

riskVersion

routeId

transactionHash

result

failureReason

  


This creates a reconstructable execution history.



---



# 78. Policy Versioning

Policy logic must be versioned.

Example:

Policy v1

Policy v2

Policy v3

  


Each execution records the policy version used.

This answers:

Why was this transaction permitted?



---



# 79. Backend Security

Requirements:

- secrets manager
- encrypted connections
- RBAC
- API authentication
- rate limiting
- audit logging
- backups
- disaster recovery
- service isolation

Private keys must not exist in ordinary backend infrastructure.



---



# 80. Deployment

Initial:

GitHub

 ↓

CI/CD

 ↓

Frontend

Backend

Workers

Database

  


Production:

GitHub

 ↓

CI/CD

 ↓

Containerized Services

 ↓

API / Workers / Monitoring

 ↓

PostgreSQL / Redis

  




---



# 81. Testing

Four testing layers:

### Unit

Individual functions.

### Integration

Component interaction.

### End-to-End

Complete user flows.

### Adversarial

Security attack scenarios.



---



# 82. Smart Contract Testing

Critical contracts require:

- unit tests
- fuzz testing
- invariant testing
- fork testing
- integration testing
- gas analysis

Permission invariants must be continuously tested.



---



# 83. MVP Security Checklist

Before testnet release:

[ ] Permission tests

[ ] Revocation tests

[ ] Expiration tests

[ ] Replay tests

[ ] Spending limits

[ ] Asset allowlist

[ ] Chain allowlist

[ ] Slippage limits

[ ] Route failures

[ ] Duplicate execution

[ ] Emergency stop

[ ] Contract unit tests

[ ] Integration tests

[ ] End-to-end testnet

  




---



# 84. Production Security Checklist

Before meaningful mainnet funds:

[ ] Independent smart-contract audit

[ ] Security review

[ ] Permission invariant verification

[ ] Economic attack analysis

[ ] Bridge risk review

[ ] Oracle review

[ ] AI threat model

[ ] Prompt-injection testing

[ ] Infrastructure penetration test

[ ] Disaster recovery test

[ ] Key management review

[ ] Monitoring

[ ] Incident response

[ ] Bug bounty

  




---



# 85. Incident Response

Production incident flow:

Detect

 ↓

Classify

 ↓

Contain

 ↓

Disable affected execution

 ↓

Investigate

 ↓

Recover

 ↓

Postmortem

  


Affected routes, assets, strategies or portfolios should be independently disableable.



---



# 86. Centralization Risk

MVP depends on infrastructure such as:

- INDEXLA backend
- OpenServ
- [LI.FI](http://LI.FI)
- RPC providers
- market data providers

This does not constitute custody if these services cannot access user private keys or unrestricted user assets.

Production should progressively introduce:

- provider redundancy
- execution abstraction
- data redundancy
- RPC redundancy
- decentralized monitoring



---



# 87. Provider Abstraction

AI:

ReasoningProvider

 ├── OpenServ

 └── Future Provider

  


Execution:

ExecutionProvider

 ├── [LI.FI](http://LI.FI)

 └── Future Provider

  


Market Data:

PriceProvider

 ├── Provider A

 └── Provider B

  


INDEXLA must not permanently depend on one external provider.



---



# 88. User Permission UX

The user must always understand:

WHAT can execute

WHERE it can execute

HOW MUCH can execute

HOW LONG authorization lasts

HOW TO STOP IT

  


Do not hide this behind generic "Enable AI" language.



---



# 89. Emergency Stop

Main automation interface must expose:

Disable Automation

Session states:

ACTIVE

PAUSED

REVOKED

EXPIRED

  


Revocation must invalidate future automated execution.



---



# 90. Notifications

Users receive notifications for:

- automation enabled
- automation revoked
- execution started
- execution completed
- execution failed
- risk rejection
- permission expiration
- abnormal event
- emergency stop



---



# 91. MVP vs Production


|                     |                           |                                     |
| ------------------- | ------------------------- | ----------------------------------- |
| Component           | MVP                       | Production                          |
| Wallets             | Core wallets              | Multi-wallet                        |
| Chains              | Testnet subset            | Full adapter architecture           |
| Portfolio           | Core                      | Full                                |
| Strategies          | DCA/Fear/Greed/Rebalance  | Extensible strategy engine          |
| AI                  | OpenServ                  | Provider abstraction                |
| Execution           | [LI.FI](http://LI.FI)     | [LI.FI](http://LI.FI) + abstraction |
| Permissions         | Core sessions             | Full policy framework               |
| Smart Accounts      | Initial                   | Modular                             |
| Risk                | Basic                     | Dedicated engine                    |
| Valuation           | Basic                     | Multi-provider                      |
| Gas                 | Limited                   | Production                          |
| Agent Identity      | Optional                  | ERC-8004                            |
| Account Abstraction | Limited                   | ERC-4337/7579                       |
| RWA                 | Architecture only         | Controlled production rollout       |
| Security            | Testnet review            | Audit + bug bounty                  |
| Creator Marketplace | Limited                   | Full                                |
| Token               | Not required for core MVP | Production integration              |




---



# 92. Development Roadmap

## Phase 0 — Foundation

Build:

- repository
- CI/CD
- frontend
- backend
- database
- wallet connection
- contract framework
- test framework
- architecture documentation



---



## Phase 1 — MVP Testnet

Build:

- portfolio creation
- strategy engine
- permission manager
- automation sessions
- OpenServ integration
- execution intent
- policy engine
- risk engine
- [LI.FI](http://LI.FI) integration
- execution router
- transaction monitoring
- revocation
- valuation

### Phase 1 Success Condition

A user can:

1. Create portfolio.
2. Configure strategy.
3. Authorize automation.
4. Trigger strategy.
5. Generate execution intent.
6. Pass policy/risk checks.
7. Execute cross-chain testnet transaction.
8. Verify result.
9. Revoke automation.



---



# 93. Phase 2 — Private Beta

Build:

- expanded chain support
- improved valuation
- portfolio analytics
- notifications
- stronger risk controls
- execution recovery
- monitoring
- security review
- creator portfolios

Business targets are targets, not guarantees or forecasts:

- 100+ portfolio managers
- $5M target AUM
- 3,000+ active investors

These metrics are validation objectives, not technical requirements.



---



# 94. Phase 3 — Public Launch

Build:

- audited contracts
- production smart accounts
- production risk engine
- circuit breakers
- provider redundancy
- Gas Manager
- creator marketplace
- portfolio publishing
- $DEXLA integration
- security monitoring
- bug bounty

RWA support remains gated behind legal/compliance approval.



---



# 95. Phase 4 — Global Expansion

Build:

- additional chains
- ERC-4337
- ERC-7579
- ERC-8004
- advanced AI strategies
- multi-agent architecture
- RWA expansion
- institutional APIs
- mobile applications
- execution provider redundancy



---



# 96. Phase 5 — Protocol Network

Long-term architecture evolves from an application into a programmable investment automation protocol.

Participants:

Users

Creators

Portfolio Managers

AI Agents

Execution Providers

Liquidity Providers

Asset Issuers

Institutional Integrators

  




---



# 97. Protocol Invariants

These are permanent engineering rules.

### Invariant 1

INDEXLA cannot execute outside user-authorized scope.

### Invariant 2

AI cannot expand its own authority.

### Invariant 3

Revoked authorization cannot execute.

### Invariant 4

Expired authorization cannot execute.

### Invariant 5

Spending limits cannot be bypassed.

### Invariant 6

Backend compromise alone cannot create unrestricted user-fund authority.

### Invariant 7

Every execution is traceable.

### Invariant 8

Unknown assets and routes fail closed.

### Invariant 9

Ownership and automation authority remain separate.

### Invariant 10

Users can disable automation.



---



# 98. Definition of Done

INDEXLA is production-ready only when:

[ ] MVP completed

[ ] Testnet execution proven

[ ] Permission system verified

[ ] Revocation verified

[ ] Expiration verified

[ ] Replay protection verified

[ ] Spending limits verified

[ ] Risk engine verified

[ ] [LI.FI](http://LI.FI) execution verified

[ ] Cross-chain execution verified

[ ] Smart-account architecture reviewed

[ ] AI threat model completed

[ ] Backend compromise tested

[ ] Emergency controls tested

[ ] Smart contracts audited

[ ] Infrastructure secured

[ ] Monitoring operational

[ ] Incident response operational

[ ] Bug bounty operational

[ ] RWA compliance framework completed before RWA production rollout

  




---



# 99. Engineering Doctrine

Every engineer and AI coding agent working on INDEXLA follows these rules:

1. Users control their assets.

2. AI is never the security boundary.

3. Every automated action is authorized, bounded and auditable.

4. Unsafe or uncertain execution fails closed.

5. External providers are replaceable.

6. Security assumptions must be explicit and tested.

7. Architecture changes require documentation and review.



---



# 100. Final Architecture Statement

INDEXLA's final architecture can be reduced to:

USER

 ↓

WALLET / SMART ACCOUNT

 ↓

PORTFOLIO

 ↓

STRATEGY

 ↓

USER AUTHORIZATION

 ↓

AI REASONING

 ↓

EXECUTION INTENT

 ↓

POLICY ENGINE

 ↓

RISK ENGINE

 ↓

[LI.FI](http://LI.FI) / EXECUTION PROVIDER

 ↓

SMART ACCOUNT MODULE

 ↓

BLOCKCHAIN

 ↓

MONITORING

 ↓

PORTFOLIO STATE

  


The most important relationship remains:

IDENTITY ≠ AUTHORITY ≠ OWNERSHIP

  


AI may reason.

INDEXLA may coordinate.

Smart contracts enforce.

Blockchains execute.

The user remains the owner and root of authority.



---

# 101. Final Engineering Principle

The entire INDEXLA protocol is built around one invariant:

Sophisticated investment automation must not require users to surrender custody or unlimited control of their assets.

The MVP proves this model on testnet.

The production architecture scales it across chains, assets, strategies, smart accounts, AI agents and execution providers.

The architecture is intentionally modular so the protocol can evolve without changing its fundamental security model.

User authority remains the root of trust.

  
