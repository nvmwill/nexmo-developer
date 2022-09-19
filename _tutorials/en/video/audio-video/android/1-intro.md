---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your Android application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/android) and [subscribed](/video/tutorials/subscribe-streams/introduction/android) streams.

## Publishing audio or video only

You can toggle audio and video on or off, by calling the `setPublishAudio()` and `setPublishVideo()` methods of the Publisher object (passing in a Boolean value). For example, the following code turns audio off:

```java
mPublisher.setPublishAudio(false);
```

## Publishing in a voice-only session

To set up a [voice-only](/video/guides/voice-only) session, call the `videoTrack()` method of the Publisher.Builder object, passing in `false`, when you [instantiate each Publisher object](/video/tutorials/publish-streams/introduction/android) in the session. For example, the following code creates a publisher for a voice-only session:

```java
mPublisher = new Publisher.Builder(context)
    .name("Bob's video")
    .videoTrack(false)
    .build();
```
