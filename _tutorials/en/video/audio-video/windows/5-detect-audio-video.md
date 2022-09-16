---
title: Detecting audio or video
description: Learn more about manipulating audio and video of Vonage Video API streams for your Windows application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Detecting whether a stream has audio or video

You can check the `HasAudio` and `HasVideo` properties of a Stream object to see if it has audio or video

```c#
if (!stream.HasAudio) {
    // You may want to adjust the user interface
}
if (!stream.HasVideo) {
    // You may want to adjust the user interface
}
```

For example, when you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/windows), you may want to adjust the user interface based on whether the stream has audio or video. For example, you may want to indicate to the user whether a stream has audio or not; or you may not want to display a subscriber's view if a stream does not have video.
