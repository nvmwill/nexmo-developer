---
title: Subscribing to audio or video only
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Subscribing to audio or video only

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/swift), you can specify whether to initially subscribe to audio or video (if they are available). For example, the following code subscribes to the audio stream only:

```swift
subscriber = OTSubscriber(stream: stream, delegate: self)
subscriber.subscribeToAudio = false
```

After you create a Subscriber object, you toggle audio on or off by setting the `subscribeToAudio` property of the Subscriber object:

```swift
    subscriber.subscribeToAudio = false // audio off
    subscriber.subscribeToAudio = true // audio on
```

You toggle video on or off by setting the `subscribeToVideo` property of the Subscriber object:

```swift
    subscriber.subscribeToVideo = false // video off
    subscriber.subscribeToVideo = true // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, setting `subscribeToVideo` to false will have no effect if the client publishing the stream is publishing audio only.
