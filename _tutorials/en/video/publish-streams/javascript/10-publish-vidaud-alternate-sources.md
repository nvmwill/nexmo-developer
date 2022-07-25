---
title: Publishing video and audio from alternate sources
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Publishing video from a video source other than a camera or screen

You can set the video source for a Publisher to a video [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object. This lets you do the following:

* **Publish video using an HTML Canvas element as the video.** You can call the `captureStream()` method of the [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) object and call the `getVideoTracks()` method of the resulting [CanvasCaptureMediaStream](https://developer.mozilla.org/en-US/docs/Web/API/CanvasCaptureMediaStream) object to get a video MediaStreamTrack object.
    
* **Publish video from a Video element.** Call the `captureStream()` method of an [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) object to obtain a MediaStream object. The `getVideoTracks()` method of the MediaStream object returns an array of audio MediaStreamTrack objects (usually one). You can then use the MediaStreamTrack object as the `audioSource` property of the `options` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method.

You can use a video MediaStreamTrack object as the `videoSource` property of the `options` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method. This causes the video represented by the MediaStreamTrack object to be the video source for the published stream.

Setting the video source to a MediaStreamTrack object is not supported in the OpenTok Plugin for Internet Explorer.

## Publishing audio from audio source other than an microphone

You can set the audio source for a Publisher to an audio [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object. This lets you do the following:

* **Publish audio from a Audio or Video element.** Call the `captureStream()` method of an [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) object or an [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) object to obtain a MediaStream object. The `getAudioTracks()` method of the MediaStream object is an array of audio MediaStreamTrack objects (usually one). You can then use the MediaStreamTrack object as the `audioSource` property of the `options` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method.
* **Publish audio from an audio MediaStreamTrack object.** For example, you can use the [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) object and the [Web audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to dynamically generate audio. You can then call `createMediaStreamDestination().stream.getAudioTracks()[0]` on the AudioContext object to get the audio MediaStreamTrack object to use as the `audioSource` property of the `options` object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method.