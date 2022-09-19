---
title: Detecting audio or video
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Detecting whether a stream has audio or video

By default, a Subscriber object plays back both audio and video (if they are available). You can check if a stream has audio or video (if the publisher of the stream is streaming audio or video) by checking the `hasAudio` and `hasVideo` properties of the Stream object:

```swift
if !stream.hasAudio {
    // You may want to adjust the user interface
}
if !stream.hasVideo {
    // You may want to adjust the user interface
}
```

For example, when you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/swift), you may want to adjust the user interface based on whether the stream has audio or video. For example, you may want to indicate to the user whether a stream has audio or not; or you may not want to display a subscriber's view if a stream does not have video.
