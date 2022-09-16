---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/swift) and [subscribed](/video/tutorials/subscribe-streams/introduction/swift) streams:

## Publishing audio or video only

You can toggle audio and video on or off, by setting the `publishAudio` and `publishVideo` properties. For example, the following code turns audio off:

```swift
publisher.publishAudio = false;
```

## Publishing in a voice-only session

To set up a [voice-only](/video/guides/voice-only) session, set the `videoTrack` property of the OTPublisherSettings object to `false` when you [initialize each OTPublisher object](/video/tutorials/publish-streams/introduction/swift) in the session. For example, the following code creates a publisher for a voice-only session:

```swift
let publisherSettings = OTPublisherSettings()
publisherSettings.videoTrack = false
let publisher = OTPublisher(delegate: self, settings: publisherSettings)
```
