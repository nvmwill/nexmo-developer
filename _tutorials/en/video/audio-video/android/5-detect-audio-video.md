---
title: Detecting audio or video
description: Learn more about manipulating audio and video of Vonage Video API streams for your Android application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Detecting whether a stream has audio or video

You can check the `hasAudio()` and `hasVideo()` methods of a Stream object to see if it has audio or video

```java
if (!mStream.hasAudio()) {
    // You may want to adjust the user interface
}
if (!mStream.hasVideo()) {
    // You may want to adjust the user interface
}
```

For example, when you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/android), you may want to adjust the user interface based on whether the stream has audio or video. For example, you may want to indicate to the user whether a stream has audio or not; or you may not want to display a subscriber's view if a stream does not have video.
