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

**Role**:
The job a Player does for their Team in a Match; each Role has its own decision rules.
_Avoid_: Position, class

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
One of a small fixed set (~15) of reusable ability templates; each Hero ability is an Ability Type with its own numbers.
_Avoid_: Skill, spell

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

**Objective**:
A neutral monster on the map that either Team can kill for a Team-wide reward.
_Avoid_: Boss, epic monster

**Vision**:
What a Team can currently see; the AI may only act on its own Team's Vision.
_Avoid_: Fog of war (that is the absence of Vision), sight
