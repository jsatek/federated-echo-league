# Prototypes

Throwaway prototypes live on their own branches, not here. This file records what each one asked and what it settled.

## Lane duel (branch `prototype/lane-duel`)

**Question:** Can a rating-blind sim, with bots that see only their Team's Vision and send only Intents, produce a lane that looks like two people playing?

**Verdict (three versions):** The interface holds. No bot got information it shouldn't have, the sim refused illegal orders from bots and people alike, and ratings changed behaviour. Decisions became readable and consistent only once the Role Brain worked in Stances (ADR-0013). Lane stakes depend on geography (ADR-0014) and on a few perception rules (ADR-0015).

**Still open:** realism vs excitement (kills are rare once bots reset sensibly), ambushes are rare in ranged-vs-melee lanes, jungle gank threat needs junglers and the Team Brain.

**Reusable code:** the logic module at the top of `prototypes/lane-duel.prototype.html` on that branch. Its contract, sim and ai sections map onto the `contract`, `sim` and `ai` packages (ADR-0006). The page around it is throwaway.

To open it: `git fetch origin prototype/lane-duel && git show origin/prototype/lane-duel:prototypes/lane-duel.prototype.html > /tmp/lane-duel.html`, then open that file in a browser.
