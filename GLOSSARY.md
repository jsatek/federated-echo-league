# Federated Echo League

A fictional MOBA esports league that plays itself. This glossary fixes the words we use for the league, its matches and the people (bots) who play them.

## League

**League**:
The whole fictional competition: its Teams, Players, seasons, results and history.

**Team**:
A fictional esports organisation that fields Players in Matches.
_Avoid_: Side, squad

**Player**:
A fictional esports pro, played by a bot whose behaviour is shaped by their Player Ratings.
_Avoid_: Bot (for the person), agent, champion

**Player Rating**:
A dial describing one aspect of a Player's skill or habits, which makes otherwise-competent bot play look human.
_Avoid_: Stat, attribute

**Skill Rating**:
A Player Rating where higher is better (Mechanics, Reaction, Positioning, Decision-making, Laning, Consistency).

**Personality Rating**:
A Player Rating with no better or worse end, only a style (Aggression, Teamwork).

**Role**:
The job a Player does for their Team in a Match: Top, Jungle, Mid, Carry or Support. Each Role has its own decision rules.
_Avoid_: Position, class, lane (a Lane is a place, not a job)

## Match

**Match**:
One simulated game between two Teams, from start to a winner.
_Avoid_: Game (ambiguous with the project itself)

**Replay**:
The recorded file of one Match, which the viewer plays back. It is the only record of what happened in the Match.
_Avoid_: Recording, demo, VOD (VOD is the act of watching a Replay)

**Hero**:
A playable character a Player controls in a Match, built from Ability Types.
_Avoid_: Champion, character, unit

**Ability Type**:
The delivery shape of an ability (e.g. projectile, cone, dash, zone), one of a small fixed set; each Hero ability is one Ability Type plus Effects.
_Avoid_: Skill, spell

**Passive**:
A Hero's always-on ability; every Hero has exactly one.

**Ultimate**:
A Hero's strongest ability, with a long cooldown; every Hero has exactly one, alongside three basic abilities.
_Avoid_: Ult (in docs), R

**Recall**:
A Hero returning to base, where their gold is spent automatically on stat upgrades.
_Avoid_: Back, base, teleport

**Effect**:
What an ability does to whatever it reaches (e.g. damage, heal, stun, slow), with its own numbers.
_Avoid_: Payload, modifier

**Tick**:
One step of Match time (1/20 of a second); the unit all durations are measured in.
_Avoid_: Frame, turn

**Match Event**:
A timestamped thing that happened in a Match (a cast, a death, a Tower falling), recorded in the Replay and the basis of every stat.
_Avoid_: Log entry, action

## AI

**Intent**:
What a Player's bot wants its Hero to do next (move, attack, cast, hold, recall); the sim decides what actually happens.
_Avoid_: Command, action, input

**Team Brain**:
The part of a Team's AI that chooses the Team's plan and hands each Player an Assignment.
_Avoid_: Coach, commander

**Team Plan**:
One of the macro options a Team Brain chooses between (e.g. Farm Lanes, Take Objective, Split-Push).
_Avoid_: Strategy, macro call

**Stance**:
A Player's current intention in lane (e.g. Farm and punish, Shove and reset, All-in), held for a few seconds and shaping which actions they take.
_Avoid_: Mode, state, plan (a Team Plan is the Team Brain's)

**Matchup Profile**:
What a Hero brings to a lane fight (range, escape, engage reach, poke), worked out from its Ability Types and Effects.
_Avoid_: Matchup chart, counter list

**Role Brain**:
The part of a Player's AI that carries out their Assignment using the rules for their Role.
_Avoid_: Hero AI, micro AI

**Assignment**:
The job the Team Brain has currently given one Player (e.g. "hold bot Lane", "group mid for the Objective").
_Avoid_: Order, task

**Seed**:
The single number that, with the code version, fully determines how a Match plays out.

**Highlight**:
A moment in a Match the sim marks as worth watching, used by the viewer to skip between key moments.
_Avoid_: Clip, key event

## Map

**Lane**:
One of the three paths between the two bases along which minion waves march and towers stand.

**Tower**:
A static defensive structure in a Lane that must be destroyed to push towards the enemy base.
_Avoid_: Turret

**Minion Wave**:
A group of weak computer-controlled units that spawns on a timer and walks down a Lane.
_Avoid_: Creeps

**Last Hit**:
The killing blow on an enemy minion; only the Hero who lands it earns its gold.
_Avoid_: CS (fine in casual talk, but write Last Hit), farm

**Lane Priority**:
Which Team's Minion Wave is pushing in a Lane, which frees that Team's Players to leave the Lane or pressure its Tower.
_Avoid_: Prio, lane control

**Brush**:
Tall grass that hides anyone inside it from enemies who aren't in the same patch.
_Avoid_: Bush, grass

**Objective**:
A neutral monster on the map that either Team can kill for a Team-wide reward.
_Avoid_: Boss, epic monster

**Vision**:
What a Team can currently see; the AI may only act on its own Team's Vision.
_Avoid_: Fog of war (that is the absence of Vision), sight
