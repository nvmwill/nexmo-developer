---
title: Check for client publishing capabilities
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Checking whether a client has publish capabilities

Once you have connected to a session, you can check if the client can publish. Check the value of the `OTSession capablilites.canPublish` property. If it is set to \`true\`, the client can publish:

```swift
if let capabilities = session.capabilities, capabilities.canPublish {
    // The client can publish.
} else {
    // The client cannot publish.
    // You may want to notify the user.
}
```

To publish, the client must connect to the session with a token that is assigned a role that supports publishing. See the [Token Creation Overview](/video/tutorials/create-token).
