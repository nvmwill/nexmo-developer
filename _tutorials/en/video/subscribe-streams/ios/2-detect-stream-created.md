---
title: Detect when streams are created in a session
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting streams in a session

The `[OTSessionDelegate session:streamCreated:]` message is sent when a new stream is created in a session. (A stream is created when a client [publishes](/video/tutorials/publish-streams/video/publish-streams/ios/2-initialize-publisher-object/objective_c) a stream to the session.) The [OTStream object](/sdk/stitch/video-ios-reference/Classes/OTStream.html) has properties that define the stream. Compare the `connection` property of the OTStream object with the `connection` property of the OTSession object to determine whether the stream is one that your client published:

``` objective-c
- (void)session:(OTSession*)session streamCreated:(OTStream*)stream
{
    NSLog(@"session streamCreated (%@)", stream.streamId);

    // See the declaration of subscribeToSelf above.
    if ([stream.connection.connectionId isEqualToString: session.connection.connectionId]) {
        // This is my own stream
    } else {
        // This is a stream from another client.
    }
}
```

You can subscribe to a stream to display it in your app. See the next section.
