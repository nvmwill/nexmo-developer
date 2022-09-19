---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Setting the resolution and frame rate for a video

You can set the frame rate and resolution for a publisher's stream by setting a `resolution` property of the options you pass into the `OT.initPublisher()` method. See [Setting the video resolution of a stream](/video/tutorials/publish-streams/introduction/javascript) and [Setting the frame rate of a stream](/video/tutorials/publish-streams/introduction/javascript).

## Switching the camera used by a Publisher

You can switch the video input device (camera) used as the video source for a Publisher by calling the [`Publisher.cycleVideo()`](/sdk/stitch/video-js-reference/Publisher.html#cycleVideo) or [`Publisher.setVideoSource()`](/sdk/stitch/video-js-reference/Publisher.html#setVideoSource()) method:

### Publisher.cycleVideo()

The `Publisher.cycleVideo()` method lets you cycle through the available video sources (cameras). For example, on a mobile device you can switch between the front and back camera. The method returns a promise that resolves when the operation completes successfully. The promise resolves with an object that has a `deviceId` property set to the device ID of the camera used:

```javascript
publisher.cycleVideo().then(console.log);
// Output: {deviceId: "967a86e52..."}
```

If there is an error, the promise is rejected. This can occur in the following conditions:

* The user denied access to the video input device.
* The publisher is not using a camera video source. This method does not work for a screen-sharing publisher, a publisher that uses a MediaStreamTrack source, or a publisher that does not include a video track (an audio-only publisher).
* There are no video input devices (cameras) available.
* There was an error acquiring video from the video input device.

Note that this method only works for a publisher that is using a camera video source.

### Publisher.setVideoSource()

The `Publisher.setVideoSource()` method lets you pass in the device ID of the new video source (camera). The method returns a promise that resolves when the operation completes:

```javascript
publisher.setVideoSource(deviceId)
    .then(() => console.log('video source set'))
    .catch((error) => console.error(error.name));
```

The following will result in errors:

* If the `videoSourceId` parameter is not a string or the device ID for a valid video input device, the promise will reject with an error with the `name` property set to `'OT_INVALID_VIDEO_SOURCE'`.
* If the publisher does not currently use a camera input, the promise will reject with an error with the `name` property set to `'OT_SET_VIDEO_SOURCE_FAILURE'`.

You can use the [`OT.getDevices()`](/sdk/stitch/video-js-reference/OT.html#getDevices) method to enumerate the available video input devices (and get their device IDs).

You can use the [`Publisher.getVideoSource()`](/sdk/stitch/video-js-reference/Publisher.html#getVideoSource) method to get the current video source and its device ID (if it is a video input device).

## Mirroring the local display of a Publisher's video

You can set the `mirror` property of the options passed into the `OT.initPublisher()` method to have the publisher's locally rendered video mirrored (`true`) or not (`false`). By default, video is mirrored for a publisher that has a camera video source, and not mirrored for a screen-sharing video.

This setting only affects the rendered video in the publisher's client application. It has no effect on the video in subscribing clients.
