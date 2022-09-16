---
title: Adjusting audio settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Switching the audio source used by a Publisher

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

The [Publisher.getAudioSource()](/sdk/stitch/video-js-reference/Publisher.html#getAudioSource) method returns the MediaStreamTrack object used as the current audio input source for the publisher.

The [OT.getDevices()](/sdk/stitch/video-js-reference/OT.html#getDevices) method enumerates the audio and video input devices available to the browser.

## Switching the audio output used

You can switch the audio output device (a speaker or headphones) used to play audio from all publishers and subscribers (in all Vonage Video sessions in the browser).

The [`OT.getAudioOutputDevices()`](/sdk/stitch/video-js-reference/OT.html#getAudioOutputDevices) method enumerates the audio and video input devices available to the browser.

The [`OT.getActiveAudioOutputDevice()`](/sdk/stitch/video-js-reference/OT.html#getActiveAudioOutputDevice) method identifies the currently active audio output device.

Use the [`OT.setAudioOutputDevice()`](/sdk/stitch/video-js-reference/OT.html#setAudioOutputDevice) method to set the audio output device.

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

## Tuning audio quality

The [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method includes options for tuning audio quality. This lets you publish streams that use high-quality (or lower quality) audio:

**audioBitrate** (Number) — The desired bitrate for the published audio, in bits per second. The supported range of values is 6,000 - 510,000. (Invalid values are ignored.) Set this value to enable high-quality audio (or to reduce bandwidth usage with lower-quality audio).

The following are recommended settings:

* 8,000 - 12,000 for narrowband (NB) speech
* 16,000 - 20,000 for wideband (WB) speech
* 28,000 - 40,000 for full-band (FB) speech
* 48,000 - 64,000 for full-band (FB) music

If you do not set this option, OpenTok.js automatically sets the audio bitrate for the stream.

Currently, this setting is not supported in streams published in Firefox.

**autoGainControl** (Boolean) — Whether to enable automatic gain control for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

**disableAudioProcessing** (Boolean) — Whether to disable echo cancellation, automatic gain control, and noise suppression for the published audio. You may want to set this to `true` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `false`.

**echoCancellation** (Boolean) — Whether to enable echo cancellation for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

_Note:_ Some browsers (such as Chrome 73+) do not support echo cancellation for stereo audio (see [this Chrome issue report](https://bugs.chromium.org/p/webrtc/issues/detail?id=10465)).

**enableStereo** (Boolean) — Whether to publish stereo audio. The default value is `false`.

**noiseSuppression** (Boolean) — Whether to enable noise suppression for the published audio. You may want to set this to `false` when publishing high-quality audio (by setting the `audioBitrate` property of the `OT.initPublisher()` options). The default value is `true`. This setting is ignored if you set `disableAudioProcessing` to `false` (which disables echo cancellation, automatic gain control, and noise suppression for the published stream).

## Reducing audio bandwidth with Opus DTX

[Opus DTX (Discontinuous Transmission)](https://datatracker.ietf.org/doc/html/rfc7587#section-3.1.3) is an audio codec that can reduce the bandwidth usage when a participant is not speaking. This can be useful in large sessions with many audio participants.

You enable Opus DTX by setting the `enableDtx` property of the `options` object you pass into the [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) method (when [initializing a Publisher](/video/tutorials/publish-streams/introduction/javascript)).

For more information, see this [Vonage Video API knowledge base article](https://video-api.support.vonage.com/hc/en-us/articles/4411846588564-What-is-Opus-DTX-).
