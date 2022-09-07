---
title: "Web"
description: "Adjusting audio and video — Web"
navigation_weight: 7
---
## Adjusting audio and video — Web

### Publishing audio or video only

When you [create a Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript), you can specify whether to initially publish only audio or only video. For example, the following code creates an audio-only Publisher:

```javascript
var pubOptions = {publishAudio:true, publishVideo:false};

// Replace replacementElementId with the ID of the DOM element to replace:
publisher = OT.initPublisher(replacementElementId, pubOptions);
```

By default, a Subscriber object is initialized to subscribe to audio and video, if they are available.

Once you have [create a Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript), you can toggle audio and video on or off, by calling the `publishAudio()` and `publishVideo()` methods (passing in a Boolean value). For example, the following code turns audio off:

```javascript
publisher.publishAudio(false);
```

When you toggle audio or video on or off, the Session object in each connected client dispatches a `streamPropertyChanged` event. For more information, see [StreamPropertyChangedEvent](/sdk/stitch/video-js-reference/StreamPropertyChangedEvent.html).

### Setting the resolution and frame rate for a video

You can set the frame rate and resolution for a publisher's stream by setting a `resolution` property of the options you pass into the `OT.initPublisher()` method. See [Setting the video resolution of a stream](/video/tutorials/publish-streams/video/publish-streams/javascript/8-stream-settings/javascript#setting-the-video-resolution-of-a-stream) and [Setting the frame rate of a stream](/video/tutorials/publish-streams/video/publish-streams/javascript/8-stream-settings/javascript#setting-the-frame-rate-of-a-stream).


### Switching the camera used by a Publisher

You can switch the video input device (camera) used as the video source for a Publisher by calling the [Publisher.cycleVideo()](/sdk/stitch/video-js-reference/Publisher.html#cycleVideo) or [Publisher.setVideoSource()](/sdk/stitch/video-js-reference/Publisher.html#setVideoSource) method:

#### Publisher.cycleVideo()

The Publisher.cycleVideo() method lets you cycle through the available video sources (cameras). For example, on a mobile device you can switch between the front and back camera. The method returns a promise that resolves when the operation completes successfully. The promise resolves with an object that has a deviceId property set to the device ID of the camera used:

```javascript
publisher.cycleVideo().then(console.log);
// Output: {deviceId: "967a86e52..."}
```

If there is an error, the promise is rejected. This can occur in the following conditions:

- The user denied access to the video input device.
- The publisher is not using a camera video source. This method does not work for a screen-sharing publisher, a publisher that uses a MediaStreamTrack source, or a publisher that does not include a video track (an audio-only publisher).
- There are no video input devices (cameras) available.
- There was an error acquiring video from the video input device.

Note that this method only works for a publisher that is using a camera video source.

#### Publisher.setVideoSource()

The `Publisher.setVideoSource()` method lets you pass in the device ID of the new video source (camera). The method returns a promise that resolves when the operation completes:

```javascript
publisher.setVideoSource(deviceId)
  .then(() => console.log('video source set'))
  .catch((error) => console.error(error.name));
```

The following will result in errors:

If the `videoSourceId` parameter is not a string or the device ID for a valid video input device, the promise will reject with an error with the `name` property set to `'OT_INVALID_VIDEO_SOURCE'`.
If the publisher does not currently use a camera input, the promise will reject with an error with the `name` property set to `'OT_SET_VIDEO_SOURCE_FAILURE'`.
You can use the [OT.getDevices()](/sdk/stitch/video-js-reference/OT.html#getDevices) method to enumerate the available video input devices (and get their device IDs).

You can use the [Publisher.getVideoSource()](/sdk/stitch/video-js-reference/publisher.html#getVideoSource) method to get the current video source and its device ID (if it is a video input device).


### Mirroring the local display of a Publisher's video
You can set the `mirror` property of the options passed into the `OT.initPublisher()` method to have the publisher's locally rendered video mirrored (`true`) or not (`false`). By default, video is mirrored for a publisher that has a camera video source, and not mirrored for a screen-sharing video.

This setting only affects the rendered video in the publisher's client application. It has no effect on the video in subscribing clients.


### Switching the audio source used by a Publisher

You can switch the microphone or MediaStreamTrack object used as the audio source for a Publisher by calling the [setAudioSource()](/sdk/stitch/video-js-reference/Publisher.html#setAudioSource) method of the Publisher object.

Pass a device ID for a microphone or an audio MediaStreamTrack object into the `Publisher.setAudioSource()` method. The method returns a Promise that is rejected on error (see the reference documentation for [setAudioSource()](/sdk/stitch/video-js-reference/Publisher.html#setAudioSource)).

For example, the following code shows you how to implement a `cycleMicrophone()` function that cycles through the microphones available:

```javascript
// Setting an audio source to a new MediaStreamTrack
const stream = await OT.getUserMedia({
  videoSource: null
});

const [audioSource] = stream.getAudioTracks();
publisher.setAudioSource(audioSource).then(() => console.log('Audio source updated'));

// Cycling through microphone inputs
let audioInputs;
let currentIndex = 0;
OT.getDevices((err, devices) => {
  audioInputs = devices.filter((device) => device.kind === 'audioInput');
  // Find the right starting index for cycleMicrophone
  audioInputs.forEach((device, idx) => {
    if (device.label === publisher.getAudioSource().label) {
      currentIndex = idx;
    }
  });
});

const cycleMicrophone = () => {
  currentIndex += 1;
  let deviceId = audioInputs[currentIndex % audioInputs.length].deviceId;
  publisher.setAudioSource(deviceId);
};
```

The `Publisher.setAudioSource()` method only works for a publisher that has an audio source. If you set `audioSource` to `null` (or `false`) when calling `OT.initPublisher()`, you cannot later add an audio source to the publisher.

The [Publisher.getAudioSource()](/sdk/stitch/video-js-reference/OT.html#getDevices) method returns the MediaStreamTrack object used as the current audio input source for the publisher.

The [OT.getDevices()](/sdk/stitch/video-js-reference/OT.html#getDevices) method enumerates the audio and video input devices available to the browser.

### Switching the audio output used

You can switch the audio output device (a speaker or headphones) used to play audio from all publishers and subscribers (in all sessions in the browser).

The [OT.getAudioOutputDevices()](/sdk/stitch/video-js-reference/OT.html#getAudioOutputDevices) method enumerates the audio and video input devices available to the browser.

The [OT.getActiveAudioOutputDevice()](/sdk/stitch/video-js-reference/OT.html#getActiveAudioOutputDevice) method identifies the currently active audio output device.

Use the [OT.setAudioOutputDevice()](/sdk/stitch/video-js-reference/OT.html#setAudioOutputDevice) method to set the audio output device.

For example, the following code shows you how to implement a `cycleAudioOutput()` function that cycles through the available audio output devices:

```javascript
// Cycling through audio output devices
let currentIndex = 0;
const audioOutputs = await OT.getAudioOutputDevices();
const currentOutputDevice = await OT.getActiveAudioOutputDevice();
audioOutputs.forEach((device, index) => {
  if (device.label === currentOutputDevice.label) {
    currentIndex = index;
  }
});

const cycleAudioOutput = async () => {
  currentIndex += 1;
  let deviceId = audioOutputs[currentIndex % audioOutputs.length].deviceId;
  await OT.setAudioOutputDevice(deviceId);
};
```

### Publishing in a voice-only session

To set up a voice-only session, set the `videoSource` property to `null` or `false` when you [create each Publisher object](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript) in the session. For example, the following code creates a Publisher for a voice-only session:

```javascript
var pubOptions = {videoSource: null};

// Replace replacementElementId with the ID of the DOM element to replace:
publisher = OT.initPublisher(replacementElementId, pubOptions);
```

When you set the `videoSource` property to `null`, the publishing client does not request access to the camera, and no video is published.

### Subscribing to audio or video only

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/javascript), you can specify whether to initially subscribe to audio or video (if they are available). For example, the following code subscribes to the audio stream only:

```javascript
var options = {subscribeToAudio:true, subscribeToVideo:false};

// Replace stream and replacementElementId with your own values:
subscriber = session.subscribe(stream,
                             replacementElementId,
                             options);
```

After you create a Subscriber object, you toggle audio on or off by calling the `subscribeToAudio()` method of the Subscriber object:

```javascript
subscriber.subscribeToAudio(false); // audio off
subscriber.subscribeToAudio(true); // audio on
```

You toggle video on or off by calling the subscribeToVideo() method of the Subscriber object:

```javascript
subscriber.subscribeToVideo(false); // video off
subscriber.subscribeToVideo(true); // video on
```

Note however that you can only subscribe to audio or video if the client publishing the stream includes audio or video. For example, calling `subscribeToVideo(false)` will have no effect if the client publishing the stream is publishing audio only.

### Changing the audio level of a subscriber

When you [subscribe to a stream](/video/tutorials/subscribe-streams/introduction/javascript), you can set the initial volume of the subscriber when you call the `subscribe()` method of the Session object:

```javascript
// Set a value between 0 (silent) and 100 (full volume):
var subOptions = {audioVolume = 10};

// Replace stream and replacementElementId with your own values:
subscriber = session.subscribe(stream,
                             replacementElementId,
                             subOptions);
```

After you create a Subscriber object, you can set its volume by calling its `setAudioVolume()` method, passing in a value from 0 (silent) to 100 (full volume):

```javascript
subscriber.setAudioVolume(0); (silent)
```

Note that the user can also mute the subscriber via user interface controls in the subscriber.

### Detecting whether a stream has audio or video

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

### Detecting when a stream adds or removes audio or video

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

Note that a subscriber's video can be disabled or enabled for reasons other than the publisher disabling or enabling it. A Subscriber object dispatches `videoDisabled` and `videoEnabled` events in all conditions that cause the subscriber's stream to be disabled or enabled. For details, see the documentation for the Subscriber [videoDisabled](/sdk/stitch/video-js-reference/Subscriber.html#event:videoDisabled) and Subscriber [videoEnabled](/sdk/stitch/video-js-reference/Subscriber.html#event:videoEnabled) events.

<!--TODO: Add voice guide ### Optimizations in voice-only sessions
There are a number of user interface optimizations that you can make in a voice-only session. See the [Voice]() tutorial. -->

### Tuning audio quality
The [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initpublisher) method includes options for tuning audio quality. This lets you publish streams that use high-quality (or lower quality) audio:

**audioBitrate** (Number) — The desired bitrate for the published audio, in bits per second. The supported range of values is 6,000 - 510,000. (Invalid values are ignored.) Set this value to enable high-quality audio (or to reduce bandwidth usage with lower-quality audio).

The following are recommended settings:

- 8,000 - 12,000 for narrowband (NB) speech
- 16,000 - 20,000 for wideband (WB) speech
- 28,000 - 40,000 for full-band (FB) speech
- 48,000 - 64,000 for full-band (FB) music

If you do not set this option, OpenTok.js automatically sets the audio bitrate for the stream.

Currently, this setting is not supported in streams published in Firefox.

**autoGainControl** (Boolean) — Whether to enable automatic gain control for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

**disableAudioProcessing** (Boolean) — Whether to disable echo cancellation, automatic gain control, and noise suppression for the published audio. You may want to set this to `true` when publishing high-quality audio (by setting the `audioBitrate` property of the OT.initPublisher() options). The default value is `false`.

**echoCancellation** (Boolean) — Whether to enable echo cancellation for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

Note: Some browsers (such as Chrome 73+) do not support echo cancellation for stereo audio (see [this Chrome issue report](https://bugs.chromium.org/p/webrtc/issues/detail?id=10465)).

**enableStereo** (Boolean) — Whether to publish stereo audio. The default value is `false`.

**noiseSuppression** (Boolean) — Whether to enable noise suppression for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

### Reducing audio bandwidth with Opus DTX

[Opus DTX (Discontinuous Transmission)](https://datatracker.ietf.org/doc/html/rfc7587#section-3.1.3) is an audio codec that can reduce the bandwidth usage when a participant is not speaking. This can be useful in large sessions with many audio participants. You enable Opus DTX by setting the `enableDtx` property of the `options` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initpublisher) method (when [initializing a Publisher](/video/tutorials/publish-streams/video/publish-streams/javascript/2-initialize-publisher-view/javascript)). For more information, see this [Vonage Video API knowledge base](https://video-api.support.vonage.com/hc/en-us/articles/4411846588564-What-is-Opus-DTX-) article.


### Applying filters and effects to published audio and video

You can use an [audio MediaStream](/video/tutorials/publish-streams/video/publish-streams/javascript/10-publish-vidaud-alternate-sources/javascript#publishing-audio-from-audio-source-other-than-an-microphone) track or a [video MediaStream](/video/tutorials/publish-streams/video/publish-streams/javascript/10-publish-vidaud-alternate-sources/javascript#publishing-video-from-a-video-source-other-than-a-camera-or-screen) track as the source audio or video for a published stream. Using this feature, you can apply filters and effects to the published audio or video.

You can use the [OT.getUserMedia()](/sdk/stitch/video-js-reference/OT.html#getUserMedia) method to get a reference to a MediaStream that uses the camera selected by the user. You can then use the video MediaStreamTrack obtained from that MediaStream object as the source for a Video element. You can then add that Video element to an HTML Canvas element, apply filters or effects to the canvas, and use the filtered video MediaStreamTrack object obtained from the canvas as the video source for a published stream. For an example, see the Stream-Filter sample [opentok-web-samples](https://github.com/opentok/opentok-web-samples) repo on GitHub.

You can use the [OT.getUserMedia()](/sdk/stitch/video-js-reference/OT.html#getUserMedia) method to get a reference to a MediaStream that uses the microphone selected by the user. You can then use the audio MediaStreamTrack obtained from that MediaStream object as the as the audioSource when calling [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initpublisher). You can then create an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) object and call its `createMediaStreamSource()` object, passing in the MediaStream object to to create a [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode) object. You can then apply audio filters to the MediaStreamAudioSourceNode object, which will result in the filters being applied to the published stream.

### Other user interface customization options
For other available options for customizing the user interface, see the [Customizing the UI](/video/tutorials/video-ui-customization/introduction/javascript) guide.