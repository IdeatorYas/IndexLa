# **INDEXLA FAQ**

## **1. INDEXLA**

### **1. What is INDEXLA?**

INDEXLA is a decentralized, non-custodial portfolio management and automation platform. Users build portfolios, define strategies and authorize automated execution while retaining control of their assets.

### **2. What problem does INDEXLA solve?**

INDEXLA solves fragmented investing across wallets, chains, assets, liquidity venues and execution interfaces by providing one portfolio layer.

### **3. What is INDEXLA’s core value proposition?**

**Build the portfolio. Define the strategy. Keep control.** INDEXLA combines direct asset ownership, automation, cross-chain execution and creator-driven portfolios.

### **4. How is INDEXLA different from existing solutions?**

INDEXLA combines direct underlying ownership, multi-asset portfolios, scoped automation, cross-chain execution, creator portfolios, strategy monetization and MEV-aware execution.

### **5. Is INDEXLA a real product?**

INDEXLA is in its Foundation phase. MVP development is targeted for Q4 2026, with broader platform launch targeted for Q1 2027. Roadmap dates are targets, not guarantees.



---



# **2. PRODUCT**

### **6. How does INDEXLA work?**

**Build → Configure → Authorize → Monitor → Execute → Manage.** Users select assets, define rules and authorize specific actions. INDEXLA coordinates execution when conditions are met.

### **7. What assets and chains does INDEXLA support?**

INDEXLA is designed for crypto, tokenized securities, stocks, commodities, real estate, RWAs and other eligible assets across supported networks. Coverage will expand progressively.

### **8. Can I create my own portfolio?**

Yes. Users can select supported assets, set allocations and apply available strategies and rules.

### **9. Can I invest in Creator portfolios?**

Yes. Creators can publish portfolios to the Marketplace for users to discover and invest in.

### **10. Can I directly own the underlying assets?**

Yes. INDEXLA is designed around ownership of the individual underlying assets rather than a single token representing the portfolio.

### **11. Is INDEXLA non-custodial?**

Yes. INDEXLA does not take custody of user assets. Automation operates only within permissions authorized by the user.



---



# **3. AUTOMATION & AI**

### **12. What strategies does INDEXLA support?**

DCA, Buy Fear, Sell Greed, Take Profit, Stop Loss, RSI, Momentum and Rebalancing. Strategies can be combined.

### **13. How does rules-based automation work?**

Users define triggers, limits and execution parameters. When predefined conditions are met, authorized transactions can be executed automatically.

### **14. What does AI actually do?**

AI assists with strategy monitoring, market-condition analysis and execution coordination. It does not control user assets or permissions.

### **15. How does INDEXLA prevent bad AI execution or hallucinated strategy parameters?**

AI operates within deterministic rules and scoped permissions. Invalid conditions, stale data, failed checks and unauthorized actions can block execution.

### **16. Can AI execute outside my authorized permissions?**

No. AI cannot expand permissions or override user-defined rules.

### **17. Can I disable or revoke automation?**

Yes. Users can pause automation, change strategy rules or revoke permissions.



---



# **4. CREATORS & MARKETPLACES**

### **18. Who can become an INDEXLA Creator?**

Creators, researchers, KOLs , Influencers , anyone can build portfolios and participate in the Creator ecosystem, subject to platform requirements.

### **19. How can creators make money on INDEXLA?**

Creators have **4 ways to earn**:

1. **Portfolio Execution Fees:** 50% of applicable execution fees from their portfolios.
2. **Strategy Revenue:** Strategy access payments plus 10% of applicable execution fees when their strategy is used by other Creators.
3. **$DEXLA Tips:** Creators can receive direct community tips in $DEXLA.
4. **Monthly Creator Rewards:** Top 10 portfolios qualify for the monthly rewards pool based on Creator Leaderboard ranking.

### **20. How does the Portfolio Marketplace work?**

Creators publish portfolios for users to discover, follow and invest in. Published portfolios require a **1,000 $DEXLA burn**.

### **21. How does the Strategy Marketplace work?**

Creators can list proprietary strategies for **500 $DEXLA**, which is fully burned. Other Creators can pay the creator-set access price in $DEXLA: **50% goes to the strategy creator and 50% is burned**. The strategy creator also earns **10% of applicable execution fees** generated when their strategy is used by other Creators.

### **22. Can Creators keep their strategies private?**

Yes. Creators can keep strategies private and use them exclusively in their own portfolios. They only need to publish a strategy if they want to monetize it or let other Creators use it.

### **23. How do Creator Rewards work?**

The **Top 10 portfolios** qualify monthly based on Creator Leaderboard ranking. **50% of the reward goes to the Creator and 50% to eligible investors.** Investors must invest in the portfolio, tip its Creator in $DEXLA and hold for at least 7 days.

  




---



# **5. SECURITY, PRIVACY & MEV**

### **24. Who controls my assets?**

The user does. INDEXLA does not take custody of user assets.

### **25. Can INDEXLA or an AI agent withdraw my funds?**

No. Automation is restricted by scoped permissions and cannot expand those permissions.

### **26. How are permissions controlled?**

Permissions can specify assets, chains, spending limits, slippage, expiry and execution restrictions. Unauthorized actions are rejected.

### **27. What happens if INDEXLA goes offline?**

Automation may stop or be delayed, but INDEXLA does not take custody of user assets. Users retain control of their assets and permissions.

### **28. Has INDEXLA been audited?**

Not yet. Independent security reviews, smart-contract audits and a public bug bounty are planned before broad production deployment.

### **29. How does INDEXLA protect against MEV and front-running?**

INDEXLA uses MEV-aware execution, including **CoW-based execution where supported**, to reduce front-running and sandwich exposure. Route validation, simulation and slippage controls can further constrain execution. No system eliminates all MEV risk.

### **30. How does INDEXLA protect privacy and reduce information leakage?**

INDEXLA is designed for wallet-first access and minimizes unnecessary identity exposure. Blockchain addresses, transactions and holdings can still be publicly observable.

### **31. What data does INDEXLA collect?**

The core non-custodial experience is designed without requiring a traditional identity. Data requirements may differ for regulated assets, third-party services and compliance requirements.

### **32. What happens if an underlying token or RWA is paused, blacklisted, or exploited?**

Execution may be restricted or suspended. Users remain exposed to the risks of the underlying asset, issuer, liquidity and legal structure.



---



# **6. CROSS-CHAIN EXECUTION**

### **33. How does cross-chain execution work?**

INDEXLA coordinates authorized portfolio transactions across supported networks and connected liquidity infrastructure.

### **34. How does [LI.FI](http://LI.FI) and Across fit into INDEXLA?**

INDEXLA uses a dedicated **Cross-Chain Execution Layer** powered by **[LI.FI](http://LI.FI) and Across**. They provide cross-chain routing, bridging and execution infrastructure where supported, while INDEXLA handles portfolio logic, strategy rules, permissions and execution coordination.

  


### **35. What happens if a bridge, execution layer or blockchain fails?**

INDEXLA is designed with multiple execution paths to improve resilience. If a route or network fails, the transaction can be rejected, delayed or retried through another available path where supported. Third-party and blockchain failures can still affect execution.

  


### **36. Who pays gas, bridge and routing costs?**

The **user pays the applicable gas, bridge and routing costs** associated with their transactions. These costs are separate from INDEXLA’s **1% execution fee** and vary by network, route and transaction.

  




---



# **7. FEES & BUSINESS MODEL**

### **37. What does INDEXLA charge?**

INDEXLA charges a **1% execution fee** on applicable portfolio execution activity.

### **38. Does INDEXLA charge management, performance or exit fees?**

No. INDEXLA charges **0% management, 0% performance, 0% subscription and 0% exit fees**.

### **39. How do Creators earn from portfolio and strategy activity?**

Creators earn **50% of applicable execution fees** generated by their portfolios, plus **10% of applicable execution fees** when their strategies are used by other Creators. They can also earn through strategy access payments, $DEXLA tips and monthly Creator Rewards.

  


### **40. How does INDEXLA generate revenue?**

INDEXLA's primary revenue comes from execution fees. Treasury activity provides a complementary economic engine.

### **41. How does DEGEN CLUB contribute to the execution-volume engine?**

Meme coins consistently represent a major share of on-chain trading activity and volume. **DEGEN CLUB turns that existing activity into a new investment format through diversified, automated meme-coin indexes**, rather than requiring users to trade individual tokens. It also creates an additional **storefront and distribution channel** for INDEXLA, supporting user acquisition, execution volume and long-term business growth.

  




---



# **8. $DEXLA & TOKENOMICS**

### **42. What is $DEXLA?**

$DEXLA is the **Solana-native utility token** of the INDEXLA ecosystem.

### **43. What are the token’s utilities?**

Five core utilities: **Publish, Feature, Monetize, Save and Tip.**

### **44. Is $DEXLA required to use INDEXLA?**

No. Core portfolio functionality can operate without $DEXLA. Token-dependent creator utilities activate when $DEXLA utility is enabled.

### **45. How does the 1,000 $DEXLA publishing burn work?**

Creators burn **1,000 $DEXLA** to publish a public portfolio. **100% is permanently burned.**

### **46. How does the Featured utility work?**

Creators burn **2,500 $DEXLA** to feature a portfolio for **7 days**. **100% is permanently burned.**

### **47. How do execution-fee discounts work?**

Holding $DEXLA provides:


|                 |                            |
| --------------- | -------------------------- |
| **$DEXLA Held** | **Execution Fee Discount** |
| 2,500           | 10%                        |
| 5,000           | 20%                        |
| 10,000          | 30%                        |


### **48. How do strategy access payments and tips work?**

Creators pay **500 $DEXLA** to list a strategy. Strategy access payments are split **50% to the creator and 50% burned**. The strategy creator also receives **10% of applicable execution fees** generated when the strategy is used. Investors can tip creators in $DEXLA.

### **49. How does $DEXLA capture value from protocol activity?**

Platform activity creates $DEXLA utility and permanent supply reduction through creator burns, strategy access burns and buybacks funded by protocol and Treasury activity.

### **50. What are the buyback and burn mechanisms?**

INDEXLA directs **10% of execution-fee revenue** to $DEXLA buybacks and **25% of realized Treasury profits** to $DEXLA buybacks. Creator utility payments create additional burns.

### **51. What is the total supply and planned circulating supply?**

Total supply is **100,000,000 $DEXLA**. Planned initial circulation is **14.75M $DEXLA, or 14.75%** of total supply.

### **52. What are the token allocations and vesting schedules?**


|                     |            |                                          |
| ------------------- | ---------- | ---------------------------------------- |
| **Allocation**      | **Supply** | **TGE / Release**                        |
| Pre-Seed            | 1.5%       | 10% TGE; 3-month cliff + 18-month linear |
| Seed                | 6%         | 10% TGE; 3-month cliff + 18-month linear |
| Private             | 10%        | 10% TGE; 3-month cliff + 18-month linear |
| Public              | 20%        | 15% TGE; remainder over 6 months         |
| DEX Liquidity       | 10%        | 100% at TGE                              |
| Treasury            | 20%        | 24-month lock                            |
| Team                | 15%        | 12-month cliff + 24-month linear         |
| Community           | 10%        | Progressive release                      |
| Advisors            | 2.5%       | 6-month cliff + 12-month linear          |
| CEX / Market Making | 5%         | Progressive release                      |


### **53. Is there inflation or additional emissions?**

No additional token supply is planned. Maximum supply is **100M $DEXLA**. Burns permanently reduce supply.



---



# **9. TGE & FUNDRAISING**

### **54. When is TGE, what will the initial circulating supply be, what supply will remain locked, and what are the planned valuation and public-sale terms?**

$DEXLA utility activation is targeted for **Q2 2027**. Planned initial circulation is **14.75M $DEXLA (14.75%)**. The remaining supply follows the published vesting and lock schedules. Final TGE date, valuation, public-sale price and sale terms have not yet been officially fixed.

### **55. What fundraising rounds has INDEXLA completed and at what valuations?**

The current whitepaper does **not state any completed fundraising round or finalized valuation**. This answer will be updated when a round officially closes.



---



# **10. MARKET & COMPETITION**

### **56. How large is INDEXLA’s target market?**

INDEXLA targets the intersection of global investable assets, tokenization, crypto and programmable portfolio management. Global investable assets span hundreds of trillions of dollars.

### **57. Who are INDEXLA’s main competitors?**

Relevant competitors include Velvet Capital, SoSoValue, Reserve and Autopilot, alongside other portfolio, basket and automated-investing platforms.

### **58. What is INDEXLA’s competitive advantage?**

INDEXLA combines **true underlying asset ownership, scoped automation, cross-chain and cross-asset portfolios, creator-powered distribution and MEV-aware execution** in a single non-custodial architecture.

### **59. What is INDEXLA’s moat?**

The moat is the **full-stack combination of asset ownership, permissions, execution, creator distribution and token economics**. As more creators, portfolios, investors and capital join the platform, the creator and portfolio network can strengthen the ecosystem.

### **60. Why can INDEXLA win in this market?**

**Assets are moving on-chain. Investment discovery is moving toward creators. Portfolio management is becoming programmable.** INDEXLA connects these trends into one portfolio layer, while DEGEN CLUB adds a high-volume meme-coin distribution channel and new index-based investment format.



---



# **11. TRACTION & ROADMAP**

### **61. What stage is INDEXLA currently at?**

INDEXLA is in the **Foundation phase**, targeted for Q3 2026, progressing toward MVP development and testing.

### **62. What has been built so far?**

INDEXLA's portfolio architecture, automation framework, creator economy, token utility design and technical architecture have been developed. MVP implementation and testing are ongoing.

### **63. What are the next major milestones?**

**Q4 2026:** MVP and initial testing.  
**Q1 2027:** Testing, audits and broad-launch preparation.  
**Q2 2027:** Partnerships, expanded assets/networks and $DEXLA utility activation.  
**Q3 2027:** Mobile and global expansion.

### **64. What are the target creators, users, AUM and execution volume?**

The initial creator target is **50–100 credible creators/KOLs**. User, AUM and execution-volume objectives are planning targets, not guarantees.



---



# **12. RISKS**

### **65. What are the biggest risks to INDEXLA?**

Smart-contract, market, liquidity, oracle, cross-chain, asset/issuer, regulatory and third-party infrastructure risks.

### **66. What are the smart-contract, liquidity and cross-chain risks?**

Smart contracts can contain vulnerabilities. Low liquidity can cause poor execution. Bridges, networks and routing infrastructure can fail or become congested.

### **67. What are the regulatory risks?**

Regulations for digital assets and tokenized assets continue to evolve. Certain features may require KYC/AML, licensing, issuer approval or geographic restrictions.

### **68. Can users lose their entire investment?**

Yes. Market movements, smart-contract failures, liquidity events, asset failures and other risks can result in partial or total loss.

### **69. What risks can INDEXLA reduce and what risks remain?**

INDEXLA can reduce certain permission, execution, monitoring and MEV risks. It cannot eliminate market, liquidity, blockchain, issuer, regulatory or third-party risks.



---



# **13. REGULATION & VERIFICATION**

### **70. Is INDEXLA an investment fund?**

No. INDEXLA is designed as decentralized, non-custodial portfolio infrastructure and does not initially operate as a traditional investment fund.

### **71. Does INDEXLA provide financial advice?**

No. INDEXLA does not provide financial, investment, legal, tax, accounting or regulatory advice.

### **72. How does INDEXLA approach regulatory requirements?**

INDEXLA assesses applicable requirements before enabling regulated asset features. Access may depend on jurisdiction, issuer requirements, KYC/AML, licensing and applicable law.

### **73. Are there geographic restrictions?**

Potentially. Certain assets and features may be restricted based on jurisdiction, eligibility, issuer requirements and applicable regulations.

### **74. Does INDEXLA guarantee returns?**

No. INDEXLA guarantees no returns, profitability, liquidity or execution quality. Users can lose capital.

### **75. Where can INDEXLA’s protocol mechanics be independently verified?**

INDEXLA's architecture and tokenomics are documented publicly. Smart-contract audits and a public bug bounty are planned before broad production deployment. Once deployed, on-chain protocol mechanics can be independently verified.



---



## **Important Disclaimer**

INDEXLA is decentralized, non-custodial software and portfolio infrastructure. It does not take custody of user assets and does not provide financial, investment, legal, tax or regulatory advice.

All investment activity carries risk, including possible loss of capital. INDEXLA does not guarantee returns, profitability, liquidity, availability or execution quality.

Supported assets, networks, integrations, strategies, fees, utilities and timelines may change or be restricted. Users remain responsible for their assets, transactions, investment decisions and compliance with applicable laws.

  
