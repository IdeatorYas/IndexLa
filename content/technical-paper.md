# INDEXLA Technical Paper

## Engineering Bible v3.0

### Final Compressed Architecture

Status: Architecture Freeze Candidate  
Scope: Testnet-first, production-gated  
Objective: Complete, implementation-ready architecture without unnecessary repetition.



---



## 1. Executive Summary

INDEXLA is a non-custodial portfolio and strategy automation protocol.

Users create portfolios, define strategies and authorize bounded automation.

The system separates:

Monitoring → AI → Intent → Policy → Risk → Permission → Privacy → Execution → Settlement

AI never becomes the security boundary and never receives unrestricted custody or authority.

Creators can publish strategies for investors to use without ever taking custody of investor assets.



---



## 2. Core Architecture

User

 ↓

Smart Account

 ↓

Portfolio / Strategy

 ↓

Automation Session

 ↓

Monitoring Engine

 ↓

AI / Rule Engine

 ↓

Execution Intent

 ↓

Policy

 ↓

Risk

 ↓

Permission

 ↓

Simulation

 ↓

Privacy / Execution Provider

 ↓

CoW / LI.FI

 ↓

Chain Adapter

 ↓

Blockchain

  




---



## 3. Core Principles

INDEXLA follows:

- Non-custody
- Least privilege
- Explicit authorization
- Fail-closed execution
- Deterministic validation
- Modular providers
- Auditable execution
- User-controlled permissions
- Chain-specific security
- Production security gates



---



## 4. System Components

Core components:

1. Portfolio Registry
2. Strategy Engine
3. Permission Manager
4. Automation Session Manager
5. Smart Account Module
6. Monitoring Engine
7. AI / OpenServ
8. Execution Intent Validator
9. Policy Engine
10. Risk Engine
11. Transaction Simulator
12. Execution Router
13. Market Data Layer
14. Valuation Engine
15. Allocation Engine
16. Privacy Module
17. Chain Adapter Layer
18. Audit / Observability
19. Emergency Controls
20. Notification System



---



## 5. Portfolio Architecture

The Portfolio Registry maintains:

- Portfolio ID
- Owner
- Assets
- Allocations
- Strategy references

The Registry does not grant execution authority.



---



## 6. Strategy Architecture

Strategies define:

- Assets
- Target allocations
- Conditions
- Trigger parameters
- Execution limits
- Automation configuration

Every strategy operates within user-authorized permissions.



---



## 7. Smart Account Architecture

Production EVM architecture supports modular smart accounts.

Primary candidate: Safe

Smart Account

 ├── Owner Control

 ├── INDEXLA Automation Module

 ├── Risk Guard

 ├── Recovery Module

 └── Account Abstraction

  


Smart-account modules are security-critical because modules can execute transactions.



---



## 8. Permission Manager

The Permission Manager is the primary security boundary.

Permissions can restrict:

- Portfolio
- Strategy
- Assets
- Chains
- Destinations
- Executors
- Amounts
- Spending limits
- Slippage
- Expiry

External services cannot expand these permissions.



---



## 9. Permission Security Invariants

The system must guarantee:

1. Revoked permissions cannot execute.
2. Expired permissions cannot execute.
3. Unauthorized executors cannot execute.
4. Asset restrictions cannot be bypassed.
5. Chain restrictions cannot be bypassed.
6. Destination restrictions cannot be bypassed.
7. Spending limits cannot be bypassed.
8. Strategy scope cannot be bypassed.
9. Replay cannot execute.
10. Invalid states fail closed.



---



## 10. Automation Sessions

Each session contains:

- Unique session ID
- Nonce
- Expiry
- Executor identity
- Portfolio scope
- Asset scope
- Spending limits
- Execution restrictions
- Status

Session states:

ACTIVE / PAUSED / REVOKED / EXPIRED / DEGRADED

This prevents unlimited or indefinite automation authority.



---



## 11. Frozen Contract Interfaces

The following interfaces remain frozen implementation contracts:

- IPortfolioRegistry
- IPermissionManager
- IExecutionRouter
- IAutomationSession

Their Solidity definitions, events, validation rules and invariants remain part of the Smart Contract Interface Specification.



---



## 12. Smart Account Module

The INDEXLA automation module must define:

- Installation
- Removal
- Intent validation
- Permission validation
- Nonce validation
- Execution authorization
- Revocation handling
- Emergency pause

The module cannot create authority beyond the Permission Manager.



---



## 13. Execution Intent

Every execution is represented by a structured, versioned intent containing:

- Intent ID
- Version
- Portfolio
- Strategy
- Session
- Trigger
- Chain
- Asset
- Amount
- Destination
- Slippage
- Deadline
- Nonce
- Policy reference
- Risk reference

Invalid intents are rejected.



---



## 14. AI Architecture

OpenServ provides AI orchestration.

AI may:

- Analyze approved data
- Interpret strategy conditions
- Generate execution proposals
- Produce structured intents
- Monitor execution results

AI cannot:

- Change permissions
- Increase limits
- Bypass risk
- Change user authorization
- Directly execute unrestricted transactions



---



## 15. AI Output Boundary

Natural-language AI output can never directly trigger execution.

Only a valid structured Execution Intent enters the deterministic execution pipeline.

AI Reasoning

 ↓

Structured Intent

 ↓

Policy

 ↓

Risk

 ↓

Permission

 ↓

Execution

  




---



## 16. Monitoring Engine

The Monitoring Engine continuously evaluates active strategies.

Market Data

 ↓

Monitoring Engine

 ↓

Trigger Event

 ↓

AI / Rule Engine

 ↓

Execution Intent

  


Responsibilities:

- Scheduling
- Polling
- Webhooks
- Condition evaluation
- Heartbeats
- Retry
- Backfill
- Deduplication
- Trigger generation
- Liveness monitoring



---



## 17. Trigger Integrity

Every trigger records:

- Trigger ID
- Evaluation ID
- Strategy ID
- Session ID
- Timestamp
- Data snapshot
- Source

Duplicate triggers must never create duplicate execution.

Every trigger must be reconstructable from the audit trail.



---



## 18. Monitoring Failure & Backfill

If monitoring remains unavailable beyond the configured threshold:

Session → DEGRADED

The user is notified.

Recovery behavior:

DCA: Execute only the next eligible scheduled occurrence. Missed intervals are not replayed.

Fear / Greed / RSI: Evaluate the current market condition. Historical triggers are not executed retroactively.

Rebalance: Evaluate current portfolio deviation and execute only if the condition remains valid.

All missed evaluations are logged.

No historical trigger is automatically executed unless the strategy explicitly defines and authorizes catch-up behavior.



---



## 19. Market Data

### Fear & Greed

Primary:

Alternative.me

A second independent provider is required before production.

Evaluation frequency:

15–60 minutes

### RSI

Aggregated OHLCV.

Default:

RSI(14)

Timeframes:

4H / Daily



---



## 20. Strategy Parameters

Default RSI thresholds:

Oversold ≤30

Overbought ≥70

Thresholds remain configurable within user-authorized limits.

Rebalance uses user-defined allocation deviation.

DCA uses scheduled execution intervals.

Fear/Greed strategies use explicitly configured thresholds.



---



## 21. Market Data Integrity

Reject triggers when:

- Data is stale
- Required data is unavailable
- Provider conflict exceeds tolerance
- Candle data is invalid
- Timestamp integrity fails

Every trigger records its source and evaluation data.



---



## 22. Policy Engine

Policy validates:

- Strategy scope
- Portfolio
- Assets
- Chains
- Destinations
- Amounts
- Slippage
- Session state
- Expiry
- User authorization

Policy failure means:

REJECT



---



## 23. Risk Engine

Risk evaluates:

- Amount
- Slippage
- Price impact
- Liquidity
- Concentration
- Asset exposure
- Chain
- Strategy limits
- Circuit breakers

Risk failure means:

DO NOT EXECUTE



---



## 24. Transaction Simulation

Where supported, transactions are simulated before execution.

Simulation failure:

REJECT

Simulation provides an additional safety layer and never replaces permission validation.



---



## 25. Execution Pipeline

Execution Intent

 ↓

Policy

 ↓

Risk

 ↓

Permission

 ↓

Simulation

 ↓

Privacy / Provider

 ↓

Chain Adapter

 ↓

Blockchain

 ↓

Confirmation

  


Every layer can reject execution.



---



## 26. Execution Router

The Execution Router selects an approved provider according to:

- Chain
- Asset
- Route
- Execution type
- Liquidity
- Risk
- Slippage
- Provider availability

Provider selection never expands user authorization.



---



## 27. CoW Protocol

CoW is the preferred provider for eligible intent-based swaps.

Best suited for:

- Same-chain swaps
- MEV-sensitive execution
- Intent-based execution

CoW remains a modular provider, not a hard protocol dependency.



---



## 28. LI.FI

LI.FI provides:

- Cross-chain routing
- Bridging
- Multi-protocol routing
- Cross-chain execution

LI.FI remains the primary cross-chain execution infrastructure.



---



## 29. CoW + LI.FI Routing

They are not treated as interchangeable.

CoW: eligible same-chain intent-based swaps.

LI.FI: cross-chain routes and bridging.

Provider failure does not trigger blind fallback.

A replacement route must pass:

Intent → Policy → Risk → Permission → Route Validation

again.



---



## 30. Execution Privacy & MEV

Execution privacy is separate from portfolio privacy.

INDEXLA uses a modular execution-privacy architecture.

CoW provides the preferred MEV-protection path for eligible intent-based swaps.

Additional providers may be integrated where they materially improve execution privacy or security.

No provider becomes a permanent architectural lock-in.



---



## 31. Portfolio Privacy

INDEXLA privacy uses three complementary primitives:

### Stealth Addresses

ERC-5564 / ERC-6538

For supported private receiving/allocation flows.

### Scoped Viewing Access

Users can grant limited access to specific portfolio information.

Access is:

Explicit → Scoped → Revocable

### ZK Selective Disclosure

Future proofs can demonstrate properties such as:

- Performance threshold
- AUM range
- Strategy compliance

without exposing unnecessary underlying data.



---



## 32. Privacy Roadmap

### Testnet Alpha

No ZK dependency.

### Testnet Beta

Experiment with viewing permissions and supported stealth-address flows.

### Future Production

Develop and audit production-grade ZK circuits.

ZK is not a dependency for core automation.



---



## 33. Privacy Principle

INDEXLA does not promise absolute blockchain anonymity.

The objective is:

Private when necessary. Verifiable when required. User-controlled by default.

Privacy cannot bypass permission, risk, policy or required compliance controls.



---



## 34. Chain Adapter Architecture

Every supported chain requires a chain-specific adapter.

Adapters handle:

- Account model
- Transaction construction
- Simulation
- Gas
- Confirmation
- Execution
- Chain-specific permission validation



---



## 35. EVM Architecture

Initial security implementation is EVM-based.

Safe / compatible smart-account architecture and Permission Modules enforce the security boundary.

Chains are enabled individually rather than assumed secure by default.



---



## 36. Non-EVM Security Gate

Solana, Sui and other non-EVM chains require native permission implementations.

Before production enablement, each chain must demonstrate:

1. Least privilege
2. Revocation
3. Spending limits
4. Expiry
5. Session security
6. Execution validation
7. Equivalent security invariants
8. Chain-specific testing

Until these requirements pass, the chain remains research/testnet only.



---



## 37. Chain-Specific Nonces

Execution identity includes chain context:

hash(

 portfolioId,

 strategyId,

 permissionId,

 chainId,

 nonce,

 intentId

)

  


This prevents cross-chain execution collisions.

CoW off-chain order identifiers and on-chain transaction nonces are tracked separately.



---



## 38. Asset Registry

Each supported asset records:

- Chain
- Contract/address
- Decimals
- Liquidity
- Price source
- Risk classification
- Execution availability

Unknown assets fail closed.



---



## 39. Valuation & Allocation

The Valuation Engine calculates portfolio value using approved market data.

The Allocation Engine calculates:

- Current allocation
- Target allocation
- Deviation
- Rebalance requirements

Neither can bypass user permissions or risk limits.



---



## 40. Gas Management

For Testnet Alpha, users provide native testnet gas.

Future modules may support:

- Paymasters
- Gas abstraction
- Automated gas support

Gas infrastructure cannot bypass user authorization.



---



## 41. RWA Architecture

RWA support is technically modular but production-gated.

Production enablement depends on:

- Issuer restrictions
- Transfer restrictions
- Liquidity
- Custody model
- Jurisdiction
- Compliance requirements

Technical support does not automatically mean production availability.



---



## 42. Treasury

Treasury operations are separate from user portfolio custody.

Treasury cannot access user assets.

Treasury actions require:

- Governance
- Permissions
- Limits
- Auditability
- Emergency controls



---



## 43. Emergency Controls

The automation interface exposes:

Disable Automation

Session states include:

ACTIVE / PAUSED / REVOKED / EXPIRED / DEGRADED

Revocation invalidates all future automated execution.

### Global Emergency Pause

Production global emergency pause is controlled by a Safe 3-of-5 multisig.

The emergency pause has no timelock, allowing immediate containment of critical incidents.

Unpausing requires the same authorized multisig and documented incident review.

The multisig cannot access, move or custody user funds. Its authority is limited to protocol emergency controls.

All emergency actions are fail-closed and recorded.



---



## 44. Agent Authority Model

The following distinction is permanent:

IDENTITY ≠ AUTHORITY ≠ OWNERSHIP

An agent can have an on-chain identity without owning assets.

An agent can have temporary authority without ownership.

Agent authority is bounded by the Permission Manager and Automation Session.

An agent can never:

- Grant itself authority
- Increase its permissions
- Extend its authorization
- Bypass policy
- Bypass risk
- Acquire ownership of user assets
- Execute outside its authorized scope



---



## 45. Audit & Observability

The complete decision chain must be reconstructable:

Market Data

 ↓

Evaluation

 ↓

Trigger

 ↓

Intent

 ↓

Policy

 ↓

Risk

 ↓

Permission

 ↓

Simulation

 ↓

Provider

 ↓

Transaction

 ↓

Settlement

  


Operational monitoring covers:

- Monitoring Engine
- Market data
- AI
- Permissions
- Risk
- Simulation
- CoW
- LI.FI
- RPC
- Chain adapters
- Degraded sessions
- Cross-chain state



---



## 46. Failure Handling

### Provider Failure

Record failure and re-evaluate the route.

### Bridge Failure

Record state, notify where required and require route revalidation before retry.

### Stale Data

Reject the trigger.

### Simulation Failure

Reject execution.

### Permission Failure

Reject execution.

### Monitoring Failure

Mark affected sessions DEGRADED.

No failure path may silently expand authority.



---



## 47. Testing & Security

Required testing includes:

- Unit
- Integration
- End-to-end
- Smart-contract
- Fuzz
- Permission invariants
- Session lifecycle
- Trigger deduplication
- Monitoring recovery
- Provider failures
- Cross-chain execution
- Privacy
- Simulation
- Slippage
- Emergency controls



---



## 48. AI Threat Model

Test against:

- Prompt injection
- Malicious strategy input
- Manipulated market data
- AI hallucination
- Invalid intents
- Replay
- Privilege escalation
- Backend compromise
- Provider compromise

The deterministic security layers must remain effective even if the AI layer is compromised.



---



## 49. Security Invariants

INDEXLA must guarantee:

1. User custody is never transferred to INDEXLA.
2. AI cannot directly execute.
3. Unauthorized execution cannot occur.
4. Revoked permissions cannot execute.
5. Expired permissions cannot execute.
6. Spending limits cannot be bypassed.
7. Destination restrictions cannot be bypassed.
8. Strategy scope cannot be bypassed.
9. Replay cannot execute.
10. Invalid data cannot trigger execution.
11. Duplicate triggers cannot duplicate execution.
12. DEGRADED sessions cannot silently execute.
13. Privacy cannot bypass security.
14. Unsupported chains cannot claim production security.
15. Provider failure cannot expand authorization.



---



## 50. Testnet Alpha

Purpose:

Prove the security core.

Scope:

- Base
- ERC-20
- DCA
- Rule-based monitoring
- Smart Account
- Permission Manager
- Automation Sessions
- Policy
- Risk
- LI.FI
- Simulation
- Execution
- Revocation
- Audit trail

Success:

Create Portfolio

→ Configure DCA

→ Authorize

→ Monitor

→ Trigger

→ Validate

→ Execute

→ Confirm

→ Revoke

→ Verify execution is impossible

  




---



## 51. Testnet Beta

Adds:

- Arbitrum
- Buy Fear
- Sell Greed
- Rebalance
- OpenServ
- CoW
- Cross-chain LI.FI
- Advanced monitoring
- Privacy primitives

Each capability is enabled only after passing its relevant tests.



---



## 52. Security Audit & Remediation

Before production:

Audit → Remediation → Re-test → Re-audit where required → Approval

Security testing includes smart contracts, permissions, infrastructure, AI boundaries, providers and chain integrations.

No production user funds before the security gate passes.



---



## 53. Production Gates

Production requires:

- Smart-contract audit
- Security review
- Remediation
- Chain-specific verification
- Provider verification
- Monitoring reliability
- Incident response
- Disaster recovery
- Operational key controls
- Privacy review
- Final approval



---



## 54. Development Sequence

Foundation

 ↓

Smart Contracts

 ↓

Permission System

 ↓

Smart Account

 ↓

Backend

 ↓

Monitoring

 ↓

Policy + Risk

 ↓

Execution

 ↓

Testnet Alpha

 ↓

Cross-chain + AI + CoW

 ↓

Testnet Beta

 ↓

Security

 ↓

Production

  


Architecture changes after freeze require explicit architecture review.



---



## 55. Definition of Done

INDEXLA is production-ready only when:

- MVP completed
- Testnet execution proven
- Permissions verified
- Revocation verified
- Expiration verified
- Replay protection verified
- Spending limits verified
- Risk engine verified
- LI.FI verified
- Cross-chain execution verified
- Smart-account architecture reviewed
- AI threat model completed
- Backend compromise tested
- Emergency controls tested
- Smart contracts audited
- Infrastructure secured
- Monitoring operational
- Incident response operational
- Bug bounty operational
- RWA compliance completed before RWA production rollout



---



## 56. Architecture Freeze

The Engineering Bible is frozen after:

Grok + Claude + Kimi review → ≥9.5/10 → final gap resolution → Architecture Freeze

After freeze:

Engineering Bible

 ↓

Build Plan

 ↓

Repository Structure

 ↓

Development Tickets

 ↓

Implementation

 ↓

Testnet Alpha

 ↓

Testnet Beta

 ↓

Security

 ↓

Production

  


The Engineering Bible defines what must be built and the security boundaries.

The Build Plan defines how and in what order it is built.



---



# Final Architecture

                        INDEXLA

                            │

                         USER

                            │

                    ┌───────▼───────┐

                    │ Smart Account │

                    └───────┬───────┘

                            │

                   Portfolio / Strategy

                            │

                    Automation Session

                            │

                    ┌───────▼───────┐

                    │   Monitoring  │

                    └───────┬───────┘

                            │

                    AI / Rule Engine

                            │

                    Execution Intent

                            │

                 ┌──────────▼──────────┐

                 │    Policy + Risk    │

                 └──────────┬──────────┘

                            │

                     Permissions

                            │

                     Simulation

                            │

                  Privacy / Execution

                            │

                    ┌───────┴───────┐

                    │               │

                   CoW             LI.FI

                    │               │

                    └───────┬───────┘

                            │

                     Chain Adapter

                            │

                       Blockchain

  


### The fundamental security boundary

AI does not control funds.

Monitoring does not control funds.

CoW does not control funds.

LI.FI does not control funds.

INDEXLA does not take custody.

The user grants bounded authority.

Every execution must pass:

Intent → Policy → Risk → Permission → Simulation → Approved Execution → Blockchain

Anything outside the authorized boundary:

REJECT.



---



  
  
