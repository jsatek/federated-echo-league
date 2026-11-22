# All stats are derived from Replay events

Every statistic (per-Match and career) is computed by `league` from a Replay's Event list after the Match, then stored as league data for the viewer and site to display. The sim keeps no separate stat counters. One source of truth means stats can never disagree with what the Replay shows, and new stats can be backfilled across all history by re-reading old Replays.
