# Sim and AI are separated behind one interface

The sim (rules, physics, combat) and the AI (decisions for each Player) talk only through a single interface: the sim hands the AI what it may know and receives intents back. We did this so AI can be rewritten, tuned and tested without touching game rules, and so the AI cannot cheat by reading sim internals. Teamfight Manager 2's weak point is its decision-making, which is the part we want to iterate on hardest.
