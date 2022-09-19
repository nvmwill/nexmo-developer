---
title: Video Settings
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Applying filters and effects to published audio and video

You can apply filters and effects on audio or video obtained from a microphone or camera used as the source audio or video for a published stream.

see [this topic](/video/tutorials/audio-video/video/audio-video/web/6-apply-filters-effects/javascript#applying-filters-and-effects-to-published-audio-and-video).

## Setting video content hints to improve video performance in certain situations

You can set a video content hint to improve the quality and performance of a published video. This can be useful in certain situations:

* When publishing screen-sharing video that will primarily contain either text or video content.
* When using a camera video source, if you would prefer to degrade frame rate and maintain resolution, you can set a the content hint to "text" or "detail". In a routed session, if the publisher supports using scalable video, it will send a full-resolution, low frame-rate stream and — if network conditions permit — a full-resolution, regular frame-rate stream. The OpenTok Media Router will forward one of those streams to the subscribers.

This tells the browser to use encoding or processing methods more appropriate to the type of content you specify.

Set the initial video content hint for a stream by setting the `videoContentHint` property of the options you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method:

```js
var publisherOptions = {
  videoContentHint: "text",
  // other options, such as videoSource: "screen"
};
var publisher = OT.initPublisher(targetElement, publisherOptions, callbackFunction);
```    

You can change the video content hint dynamically by calling the [setVideoContentHint()](/sdk/stitch/video-js-reference/Publisher.html#setVideoContentHint) method of a Publisher object:

```js
publisher.setVideoContentHint("motion");
```

You can set the video content hint to one of the following values:

* `""` — No hint is provided (the default). The publishing client will make a best guess at how video content should be treated.
* `"motion"` — The track should be treated as if it contains video where motion is important. For example, you may use this setting for a screen-sharing video stream that contains video.
* `"detail"` — The track should be treated as if video details are extra important. For example, you may use this setting for a screen-sharing video stream that contains text content, painting, or line art.
* `"text"` — The track should be treated as if text details are extra important. For example, you may use this setting for a screen-sharing video stream that contains text content.

With the "text" and "detailed" content hints, the browser attempts to maintain high resolution, even if it must reduce the video frame rate. For the "motion" content hint, the browser reduces resolution to prevent the frame rate from stalling.

You can read more about these options in the [W3C Working Draft](https://www.w3.org/TR/mst-content-hint/#video-content-hints).

Chrome 60+, Safari 12.1+, Edge 79+, and Opera 47+ support video content hints. The setting is ignored in other browsers.

If you can accept a slow frame rate, you may also consider [restricting the frame rate of subscribed streams](/video/tutorials/subscribe-streams) to improve quality.

## Other audio and video options

See the developer guide for [Adjusting audio and video](/video/tutorials/audio-video/video/audio-video/web/3-audio-settings/javascript#tuning-audio-quality).

## Getting audio and video statistics for a publisher

See [Getting statistics about a publisher's stream](/video/tutorials/publish-streams/video/publish-streams/javascript/9-managing-publishers/javascript#getting-statistics-about-a-publisher-s-stream).
