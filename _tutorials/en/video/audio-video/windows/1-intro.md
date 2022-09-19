---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your Windows application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/windows) and [subscribed](/video/tutorials/subscribe-streams/introduction/windows) streams.

## Publishing audio or video only

You can toggle audio and video on or off, by set the `PublishAudio` and `PublishVideo` properties of the Publisher object. For example, the following code turns audio off:

```c#
publisher.PublishAudio = false;
```

## Publishing in a voice-only session

To set up a [voice-only](/video/guides/voice-only) session, set the `hasVideoTrack` parameter of the `Publisher()` constructor to `false` and set the the `capturer` parameter to `null` when you [instantiate each Publisher object](/video/tutorials/publish-streams/introduction/windows) in the session. For example, the following code creates a publisher for a voice-only session:

```c#
mPublisher = new Publisher(Context.Instance, renderer: publisherVideoRenderer, capturer: null, hasVideo: false);
```
