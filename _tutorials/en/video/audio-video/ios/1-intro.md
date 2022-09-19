---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your iOS application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/objective_c) and [subscribed](/video/tutorials/subscribe-streams/introduction/objective_c) streams.

## Publishing audio or video only

You can toggle audio and video on or off, by setting the `publishAudio` and `publishVideo` properties. For example, the following code turns audio off:

```objective_c
publisher.publishAudio = NO;
```

## Publishing in a voice-only session

To set up a [voice-only](/video/guides/voice-only) session, set the `videoTrack` property of the OTPublisherSettings object to `NO` when you [initialize each OTPublisher object](/video/tutorials/publish-streams/introduction/objective_c) in the session. For example, the following code creates a publisher for a voice-only session:

```objective_c
OTPublisherSettings *_publisherSettings = [[OTPublisherSettings alloc] init];
_publisherSettings.videoTrack = NO;
_publisher = [[OTPublisher alloc]
                initWithDelegate:self
                settings:_publisherSettings];
```
