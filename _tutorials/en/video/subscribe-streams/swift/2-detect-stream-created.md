---
title: Detect when streams are created in a session
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting streams in a session

The `OTSessionDelegate session(_ session:streamCreated:)` message is sent when a new stream is created in a session. (A stream is created when a client [publishes](/video/tutorials/publish-streams/video/publish-streams/swift/2-initialize-publisher-object/swift) a stream to the session.) The [OTStream object](/sdk/stitch/video-ios-reference/Classes/OTStream.html) has properties that define the stream. Compare the `connection` property of the OTStream object with the `connection` property of the OTSession object to determine whether the stream is one that your client published:

```swift
func session(_ session: OTSession, streamCreated stream: OTStream) {
    print("Session streamCreated: \(stream.streamId)")

    // See the declaration of subscribeToSelf above.
    if stream.connection.connectionId == session.connection.connectionId {
        // This is my own stream
    } else {
        // This is a stream from another client.
    }
}
```

You can subscribe to a stream to display it in your app. See the next section.
