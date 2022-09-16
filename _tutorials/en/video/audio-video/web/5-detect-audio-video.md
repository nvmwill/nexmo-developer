---
title: Detecting audio or video
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Detecting whether a stream has audio or video

By default, a Subscriber object plays back both audio and video (if they are available). You can check if a stream has audio or video (if the publisher of the stream is streaming audio or video) by checking the `hasAudio` and `hasVideo` properties of the Stream object:

```javascript
if (!stream.hasAudio) {
    // You may want to adjust the user interface
}
if (!stream.hasVideo) {
    // You may want to adjust the user interface
}
```

For example, when you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/javascript), you may want to adjust the user interface based on whether the stream has audio or video. For example, you may want to indicate to the user whether a stream has audio or not; or you may not want to hide a subscriber if a stream does not have video.

## Detecting when a stream adds or removes audio or video

The Session object dispatches a `streamPropertyChanged` event when a stream toggles audio or video on or off. The `streamPropertyChanged` event is defined by the [StreamPropertyChangedEvent](/sdk/stitch/video-js-reference/StreamPropertyChangedEvent.html) class. The event object has a `changedProperty` property (identifying the Stream property that changed) and a `newValue` property (the new value of the Stream property). For example, the following code listens for changes in a audio and video in a Stream:

```javascript
session.on("streamPropertyChanged", function (event) {
    var subscribers = session.getSubscribersForStream(event.stream);
    for (var i = 0; i < subscribers.length; i++) {
        // You may want to display some UI text for each
        // subscriber, or make some other UI change,
        // based on event.changedProperty and
        // event.newValue
    }
}
```

Note that a subscriber's video can be disabled or enabled for reasons other than the publisher disabling or enabling it. A Subscriber object dispatches `videoDisabled` and `videoEnabled` events in all conditions that cause the subscriber's stream to be disabled or enabled. For details, see the documentation for the [Subscriber videoDisabled](/sdk/stitch/video-js-reference/Subscriber.html#event:videoDisabled) and [Subscriber videoEnabled](/sdk/stitch/video-js-reference/Subscriber.html#event:videoEnabled) events.
