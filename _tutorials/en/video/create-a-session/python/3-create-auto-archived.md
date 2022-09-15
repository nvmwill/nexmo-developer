---
title: Create an automatically archived session
description: Use the Vonage Video API Python SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating an automatically archived session

You can create a session that is automatically archived. Here is Python sample code that creates an automatically archived session:

``` python
import OpenTok

api_key = "your_API_key"        # Replace with your Vonage Video API key.
api_secret = "your_API_secret"  # Replace with your Vonage Video API secret.

opentok_sdk = OpenTok.OpenTok(api_key, api_secret)

session = opentok.create_session(media_mode=MediaModes.routed, archive_mode=ArchiveModes.always)
print session.session_id
```

Note that archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving/overview) developer guide.
