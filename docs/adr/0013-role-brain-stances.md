# The Role Brain works in Stances, not single actions

Each Role Brain has two layers. A **Stance** layer re-checks about once a second and commits to a Stance (Farm, Farm and punish, Farm and respect, Farm towards a spike, Shove and reset, All-in, Disengage, Lurk) for at least 3 s. Only urgent triggers can end it sooner: about to die, past the All-in bail-out point, the enemy is stunned and killable, their escape just went down, the tower or several minions are hitting me. An **Action** layer picks concrete actions 10 times a second, weighted by the current Stance, with no decision noise of its own.

Decision noise (from the Decision-making rating) is rolled once per Stance choice, not per action. The first prototype rolled noise every 0.1 s across nine closely scored actions, and bots flip-flopped between plans in a way no player does. A person makes up their mind and then plays inside that intention.

Each Hero's Matchup Profile (range, escape, engage reach, poke range) is derived from its Ability Types and Effects (ADR-0010), so default Stances and spacing follow the matchup without hand-written rules per pair.

Amends ADR-0011's description of the Role Brain.
