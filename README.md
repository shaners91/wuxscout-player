# WuxScout Player

This repository hosts WuxScout's small, public Twitch embed page. It contains no Twitch Client ID, OAuth token, user settings, analytics, or backend service.

The published page accepts one validated Twitch item in its URL fragment:

- `#type=clip&id=CLIP_SLUG`
- `#type=video&id=VIDEO_ID`
- `#type=live&id=CHANNEL_LOGIN`

The page uses its own HTTPS hostname as Twitch's required `parent` value and embeds Twitch's official player with autoplay disabled.
