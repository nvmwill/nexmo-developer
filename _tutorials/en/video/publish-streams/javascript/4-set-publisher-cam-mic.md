---
title: Setting the camera and microphone
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Setting the camera and microphone used by the publisher

You can (optionally) specify an audio and video input device for the publisher to use. When you call the `OT.initPublisher()` method, you can (optionally) set the `audioSource` and `videoSource` properties of the `properties` object passed into the `OT.initPublisher()` method.

First, use the `OT.getDevices()` method to enumerate available devices. The array of devices is passed in as the `devices` parameter of the `callback` function passed into the `OT.getDevices()` method. For example, the following code gets a list of audio and video input devices:

```js
var audioInputDevices;
var videoInputDevices;
OT.getDevices(function(error, devices) {
  audioInputDevices = devices.filter(function(element) {
    return element.kind == "audioInput";
  });
  videoInputDevices = devices.filter(function(element) {
    return element.kind == "videoInput";
  });
  for (var i = 0; i < audioInputDevices.length; i++) {
    console.log("audio input device: ", audioInputDevices[i].deviceId);
  }
  for (i = 0; i < videoInputDevices.length; i++) {
    console.log("video input device: ", videoInputDevices[i].deviceId);
  }
});
```

Each device listed by `OT.getDevices()` has a unique device ID, set as the `deviceId` property. You can use these device ID values as the `audioSource` and `videoSource` properties of the `properties` object passed into `OT.initPublisher()`:

```js
var pubOptions =
  {
    audioSource: audioInputDevices[0].deviceId,
    videoSource: videoInputDevices[0].deviceId
  };
var publisher = OT.initPublisher(null, pubOptions, function(error) {
  console.log("OT.initPublisher error: ", error);
});
```

<!-- OPT-TODO: Set the `videoSource` property to `null` or `false` in a voice-only session (see [Publishing in a voice session](/developer/guides/audio-video/js/#voice)). -->

Set the `videoSource` property to `null` or `false` in a voice-only session.

The [Vonage Video hardware set-up component](/video/guides/hardware-setup) provides a user interface for clients to select the camera and microphone to use. It is built using the `OT.getDevices()` method.

<!-- OPT-TODO Note that you can also publish a screen-sharing stream — one in which the source is the client's screen, not a camera. For details, see [Screen sharing](/developer/guides/screen-sharing/js/). -->

<!-- OPT-TODO You can also [change the camera used by the publisher](/developer/guides/audio-video/js/#cycleVideo), or set it to use the [front- or back-facing camera](facingMode) (when this option is available).

You can also [change the audio source used by the publisher](/developer/guides/audio-video/js/#setAudioSource). -->
