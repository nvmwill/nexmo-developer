---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/javascript) and [subscribed](/video/tutorials/subscribe-streams/introduction/javascript) streams.

## Publishing audio or video only

When you [create a Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript), you can specify whether to initially publish only audio or only video. For example, the following code creates an audio-only Publisher:

```javascript
var pubOptions = {publishAudio:true, publishVideo:false};

// Replace replacementElementId with the ID of the DOM element to replace:
publisher = OT.initPublisher(replacementElementId, pubOptions);
```

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

Once you have [created a Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript), you can toggle audio and video on or off, by calling the `publishAudio()` and `publishVideo()` methods (passing in a Boolean value). For example, the following code turns audio off:

```javascript
publisher.publishAudio(false);
```

When you toggle audio or video on or off, the Session object in each connected client dispatches a `streamPropertyChanged` event. For more information, see [StreamPropertyChangedEvent](/sdk/stitch/video-js-reference/StreamPropertyChangedEvent.html).

## Publishing in a voice-only session

To set up a voice-only session, set the `videoSource` property to `null` or `false` when you [create each Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript) in the session. For example, the following code creates a Publisher for a voice-only session:

```javascript
var pubOptions = {videoSource: null};

// Replace replacementElementId with the ID of the DOM element to replace:
publisher = OT.initPublisher(replacementElementId, pubOptions);
```

When you set the `videoSource` property to `null`, the publishing client does not request access to the camera, and no video is published.

## Optimizations in voice-only sessions

There are a number of user interface optimizations that you can make in a voice-only session. See the [Voice](/video/guides/voice-only) guide.
