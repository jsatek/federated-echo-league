# AI perception: reaction delay from the first tick, primed start, visible attack targets

Three rules refine what the sim hands the AI (ADR-0005, ADR-0011):

- **Reaction delay applies from the first decision.** A bot perceives nothing newer than its delay, even on tick 0. The prototype briefly let bots act on live state at the start, and one Blinked away before a Charge it couldn't yet have seen.
- **A match or scenario starts primed.** Each bot begins already knowing what its Team can see at tick 0, as if it had been watching. Otherwise every scenario opens with both bots blind and wandering.
- **The observation includes what visible enemies are attacking and what is attacking you.** A person reads both off the screen (attack animations, minions hitting you). Without them bots can't punish an enemy stepping up for a Last Hit, or know when to drop minion aggro.
