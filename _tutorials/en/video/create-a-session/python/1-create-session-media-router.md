---
title: Create a Session that uses Vonage Video Media Router
description: Use the Vonage Video API Python SDK to learn how to create a session. Sessions allow participants to use audio, video, and messaging functionality in your application.
product: video
---

You can use the Vonage Video Python library to generate Vonage Video sessions. Each session has a unique session ID, which you can use in an Vonage Video client library to connect to an Vonage Video session. (See [Joining a Session](/video/tutorials/joining-a-session))

## Creating a session that uses the Vonage Video Media Router

The following code session that uses the Vonage Video Media Router:

``` python
import OpenTok

app_id = "your_APP_ID"        # Replace with your Vonage Video APP ID.
api_secret = "your_API_secret"  # Replace with your Vonage Video API secret.

opentok_sdk = OpenTok.OpenTok(app_id, api_secret)
session = opentok_sdk.create_session(media_mode=MediaModes.routed)
print session.session_id
```

Use the session ID in an Vonage Video client library to connect to an Vonage Video session.

You will also need to generate a token for each user connecting to the Vonage Video session. See [Connection Token Creation](/video/tutorials/create-token) for information on the `generate_token()` method.

The [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) provides the following benefits:

* The Vonage Video Media Router can decrease bandwidth usage in multiparty sessions. (In a relayed session, each client must send a separate audio-video stream to each client subscribing to it.)
* The Vonage Video Media Router can improve the quality of the user experience through [audio fallback and video recovery](https://www.vonage.com/communications-apis/video/features). With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.
* The Vonage Video Media Router supports the [archiving feature](https://www.vonage.com/communications-apis/video/features/), which lets you record, save, and retrieve Vonage Video sessions.
