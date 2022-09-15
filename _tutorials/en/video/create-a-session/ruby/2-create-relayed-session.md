---
title: Create a relayed session
description: Use the Vonage Video API Ruby SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

## Creating a relayed session

Here is Ruby sample code that creates a new session with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to relayed:

``` ruby
api_key = "your_API_key"        # Replace with your OpenTok API key.
api_secret = "your_API_secret"  # Replace with your OpenTok API secret.

opentok = OpenTok::OpenTok.new api_key, api_secret
session = opentok.create_session
session_id = session.session_id
```

In a relayed session, clients will attempt to send streams directly between each other. However, if clients cannot connect due to firewall restrictions, the session uses the Vonage Video TURN server to relay audio-video streams.

**Important:** Some features, such as archiving, are only available in routed (not relayed) sessions. See the previous section for instructions on creating a routed session.
