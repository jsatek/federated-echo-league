# The AI only sees what its Team can see

The sim gives each Team's AI only what that Team can currently see (Vision around Heroes and towers, broken by brush). The sim keeps full information, and so does the Replay, so viewers see everything. We enforced this at the interface from day one because bots acting on information they couldn't have is the fastest way to look robotic. Adding fog of war later would mean rewriting every AI decision rule. v1 has no wards.
