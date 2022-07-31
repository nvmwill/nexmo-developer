---
title: Managing subsciber streams
description: Learn how to subscribe to an Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Restricting the frame rate of a subscribed stream

You can also restrict the frame rate of a Subscriber's video stream. To restrict the frame rate of a subscriber, call the `restrictFrameRate()` method of the Subscriber object, passing in `true`:

```js
subscriber.restrictFrameRate(true);
```

Pass in `false` and the frame rate of the video stream is not restricted:

```js
subscriber.restrictFrameRate(false);
```

When the frame rate is restricted, the Subscriber video frame will update once or less per second.

This feature is only available in sessions that use the Media Router (sessions with the [media mode](video/guides/create-session#the-media-router-and-media-modes) set to routed), not in sessions with the media mode set to relayed. In relayed sessions, calling this method has no effect.

Restricting the subscriber frame rate has the following benefits:

* It reduces CPU usage.
* It reduces the network bandwidth consumed by the app.
* It lets you subscribe to more streams simultaneously.

Reducing a subscriber's frame rate has no effect on the frame rate of the video in other clients.

## Detecting when a subscriber's audio is blocked or unblocked

Some browsers automatically block audio playback, requiring a `click` event before audio playback starts for subscribers. These browsers include Safari, Firefox 66+, and Chrome 71+.

The Subscriber object displays an audio playback button if audio playback is blocked. You can disable the Subscriber's default audio playback button and display your own UI element that the user will click to start audio playback.


<!-- OPT-TODO: See [Displaying a custom UI element when Subscriber audio is blocked](/developer/guides/customize-ui/js/#audio-blocking-ui). -->

When the subscriber's audio is blocked, the Subscriber object dispatches a `audioBlocked` event, and it dispatches an `audioUnblocked` event when the audio is unblocked:

```js
subscriber.on({
  audioBlocked: function(event) {
    console.log("Subscriber audio is blocked.")
  },
  audioUnblocked: function(event) {
    console.log("Subscriber audio is unblocked.")
  }
});
```

Also, the Subscriber includes an `isAudioBlocked()` which returns `true` if the audio is blocked or `false` if it is not.

Subscriber audio is unblocked when any of the following occurs:

* The user clicks the default Subscriber audio playback icon
* The [OT.unblockAudio()](/sdk/stitch/video-js-reference/OT.html#unblockAudio) method is called in response to an HTML element dispatching a `click` event (if you have disabled the default audio playback icon)
* The local client gains access to the camera or microphone (for instance, in response to a successful call to `OT.initPublisher()`).

For more information, see [this Mozilla article about autoplay in Firefox](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/) and [this Google article about autoplay in Chrome](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes).

## Detecting when a subscriber's video is disabled

When the subscriber's video is disabled, the Subscriber object dispatches a `videoDisabled` event:

```js
subscriber.on("videoDisabled", function(event) {
  // You may want to hide the subscriber video element:
  domElement = document.getElementById(subscriber.id);
  domElement.style["visibility"] = "hidden";

  // You may want to add or adjust other UI.
});
```

When the Media Router disables the video of a subscriber, you may want to adjust the user interface related to the subscriber.

The `reason` property of the `videoDisabled` event object defines the reason the video was disabled. This can be set to one of the following values:

* `"publishVideo"` — The publisher stopped publishing video by calling `publishVideo(false)`.
* `"quality"` — The Media Router stopped sending video to the subscriber based on stream quality changes. This feature of the Media Router has a subscriber drop the video stream when connectivity degrades. (The subscriber continues to receive the audio stream, if there is one.)
    
    Before sending this event, when the Subscriber's stream quality deteriorates to a level that is low enough that the video stream is at risk of being disabled, the Subscriber dispatches a `videoDisableWarning` event.
    
    If connectivity improves to support video again, the Subscriber object dispatches a `videoEnabled` event, and the Subscriber resumes receiving video.
    
    By default, the Subscriber displays a video disabled indicator when a `videoDisabled` event with this reason is dispatched and removes the indicator when the `videoDisabled` event with this reason is dispatched. You can control the display of this icon by calling the `setStyle()` method of the Subscriber, setting the `videoDisabledDisplayMode` property; or you can set the style when calling the `Session.subscribe()` method, setting the `style` property of the `properties` parameter.
    
    This feature is only available in sessions that use the Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), not in sessions with the media mode set to relayed.
    
    When you publish a stream, you can prevent it from having its video disabled due to stream quality. Set `audioFallbackEnabled` to `false` in the `properties` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method.
    
* `"subscribeToVideo"` — The subscriber started or stopped subscribing to video, by calling `subscribeToVideo(false)`.
* `"codecNotSupported"` — The subscriber stopped subscribing to video due to an incompatible codec (see the [Video codecs](/video/guides/codecs) developer guide).

The Subscriber dispatches a `videoEnabled` event when video resumes:

```js
subscriber.on("videoEnabled", function(event) {
  // You may want to display the subscriber video element,
  // if it was hidden:
  domElement = document.getElementById(subscriber.id);
  domElement.style["visibility"] = "visible";

  // You may want to add or adjust other UI.
});
```

To prevent video from resuming, in the `videoEnabled` event listener, call `subscribeToVideo(false)` on the Subscriber object:

```js
subscriber.on("videoEnabled", function(event) {
  subscriber.subscribeToVideo(false);
});
```

The `reason` property of the `videoEnabled` event object defines the reason the video was enabled. This can be set to one of the following values:

* `"publishVideo"` — The publisher started publishing video by calling `publishVideo(true)`.
* `"quality"` — The Media Router resumed sending video to the subscriber based on stream quality changes. This feature of the Media Router has a subscriber drop the video stream when connectivity degrades and then resume the video stream if the stream quality improves.
    
    This feature is only available in sessions that use the Media Router (sessions with the [media mode](video/guides/create-session#the-media-router-and-media-modes) set to routed), not in sessions with the media mode set to relayed.
    
* `"subscribeToVideo"` — The subscriber started or stopped subscribing to video, by calling `subscribeToVideo(false)`.
* `"codecChanged"` — The subscriber video was enabled after a codec change from an incompatible codec (see the [Video codecs](/video/guides/codecs) developer guide).

## Detecting when a subscriber's stream's video dimensions change

The stream of a subscriber's video dimensions can change if a stream published from a mobile device resizes, based on a change in the device orientation. It can also occur if the video source is a screen-sharing window and the user publishing the stream resizes the window that is the source for the stream. When the video dimensions change, the Subscriber object dispatches a `videoDimensionsChanged` event.

The following code resizes a subscriber when the stream's video dimensions change:

```js
subscriber.on('videoDimensionsChanged', function(event) {
  subscriber.element.style.width = event.newValue.width + 'px';
  subscriber.element.style.height = event.newValue.height + 'px';
  // You may want to adjust other UI.
});
```

## Getting information about a stream

The Stream object has the following properties that define the stream:

* `connection`—The Connection object corresponding to the connection that is publishing the stream. You can compare this to the `connection` property of the Session object to see if the stream is being published by the local web page.
* `creationTime`—The timestamp (a number) for the creation of the stream. This value is calculated in milliseconds. You can convert this value to a Date object by calling `new Date(stream.creationTime)`.
* `hasAudio`—(Boolean) Whether the stream has audio. This property can change if the publisher turns on or off audio (by calling [Publisher.publishAudio()](/sdk/stitch/video-js-reference/Publisher.html#publishAudio)). When this occurs, the [Session](/sdk/stitch/video-js-reference/Session.html) object dispatches a `streamPropertyChanged` event.
* `hasVideo`—(Boolean) Whether the stream has video.
* `name`—(String) The name of the stream. This is, by default, displayed when the user mouses over the Subscriber in the HTML DOM. You can, however, customize the UI to hide the name or display it without mousing over.
* `videoDimensions`—This object has two properties: `width` and `height`. Both are numbers. The `width` property is the width of the encoded stream; the `height` property is the height of the encoded stream. (These are independent of the actual width of Publisher and Subscriber objects corresponding to the stream.) This property can change if a stream published from an iOS device resizes, based on a change in the device orientation.
* `videoType`—The type of video: either "camera", "screen", "custom", or undefined. A "screen" video uses screen sharing on the publisher as the video source; a "custom" video uses a VideoTrack element as the video source on the publisher. The `videoType` is `undefined` when a stream is voice-only . This property can change if a stream published from a mobile device changes from a camera to a screen-sharing video type.


<!-- OPT-TODO: (see the [Voice-only guide](/developer/guides/audio-video/js/#voice)) -->

<!-- OPT-TODO: For more information, see [Screen sharing — Web](/developer/guides/screen-sharing/js/). -->

The `hasAudio`, `hasVideo`, `videoDimensions`, and `videoType` properties can change (for example, when the publisher turns on or off video). When this occurs, the [Session](/sdk/stitch/video-js-reference/Session.html) object dispatches a `streamPropertyChanged` event (see [StreamPropertyChangedEvent](/sdk/stitch/video-js-reference/StreamPropertyChangedEvent.html).)

The `getStats()` method of a Subscriber object provides you with information about the subscriber's stream, including the following:

* The total number of audio and video packets lost
* The total number of audio and video packets received
* The total number of audio and video bytes received
* The current average video frame rate

The following code logs the audio packet loss ratio, the audio bit rate, and the video packet loss ratio, and the video bit rate for a subscriber every second:

```js
var prevStats;
window.setInterval(function() {
  subscriber.getStats(function(error, stats) {
    if (error) {
      console.error('Error getting subscriber stats. ', error.message);
      return;
    }
    if (prevStats) {
      var videoPacketLossRatio = stats.video.packetsLost /
        (stats.video.packetsLost + stats.video.packetsReceived);
      console.log('video packet loss ratio: ', videoPacketLossRatio);
      var videoBitRate = 8 * (stats.video.bytesReceived - prevStats.video.bytesReceived);
      console.log('video bit rate: ', videoBitRate, 'bps');
      var audioPacketLossRatio = stats.audio.packetsLost /
        (stats.audio.packetsLost + stats.audio.packetsReceived);
      console.log('audio packet loss ratio: ', audioPacketLossRatio);
      var audioBitRate = 8 * (stats.audio.bytesReceived - prevStats.audio.bytesReceived);
      console.log('audio bit rate: ', audioBitRate, 'bps');
    }
    prevStats = stats;
  });
}, 1000);
```

To get statistics for a stream published by the local client, you must use a session that uses the Media Router (sessions with the [media mode](video/guides/create-session#the-media-router-and-media-modes) set to routed), and you must set the `testNetwork` property to `true` in the `options` object you pass into the `Session.subscribe()` method:

```js
var publisher = OT.initPublisher();
publisher.on('streamCreated', function(event) {
  var subscriberOptions = {testNetwork: true};
  var subscriber = session.subscribe(event.stream, 'publisher-element', subscriberOptions);
}
```

To get more detailed stream statics, use the `Subscriber.getRtcStatsReport()` method. It returns a promise that, on success, resolves with an [RtcStatsReport](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport) object for the subscribed stream:

```js
subscriber.getRtcStatsReport()
  .then((stats) => stats.forEach(console.log))
  .catch(console.log);
```

## Setting the preferred frame rate and resolution

<!-- OPT-TODO: [scalable video feature](/developer/guides/scalable-video) -->

When subscribing to a stream that uses the scalable video feature, you can set the preferred frame rate and resolution for the stream the subscribing client receives from the OpenTok Media Router. For details, see [Subscriber.setPreferredFrameRate()](/sdk/stitch/video-js-reference/Subscriber.html#setPreferredFrameRate) and [Subscriber.setPreferredResolution()](/sdk/stitch/video-js-reference/Subscriber.html#setPreferredResolution).
