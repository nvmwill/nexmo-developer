---
title: Stream settings
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Setting the video resolution of a stream

To set a recommended video resolution for a published stream, set the `resolution` property of the `properties` parameter you pass into the `OT.initPublisher()` method:

```js
var publisherProperties = {resolution: '1280x720'};
var publisher = OT.initPublisher(targetElement,
                                    publisherProperties);
publisher.on('streamCreated', function(event) {
    console.log('Stream resolution: ' +
        event.stream.videoDimensions.width +
        'x' + event.stream.videoDimensions.height);
});
```

This `resolution` property is a string, defining the desired resolution of the video. The format of the string is `"_width_x_height_"`, where the width and height are represented in pixels. Valid values are `"1920x1080"`, `"1280x720"`, `"640x480"`, and `"320x240"`. 

>_Note:_ support for `"1920x1080"` is a _private beta_ feature — please contact Vonage if you would like to enable it for your Video API project.

The requested resolution of a video stream is set as the `videoDimensions.width` and `videoDimensions.height` properties of the Stream object.

The default resolution for a stream (if you do not specify a resolution) is 640x480 pixels. If the client system cannot support the resolution you requested, the stream will use the next largest setting supported.

The `videoHeight()` and `videoWidth()` methods return the configured resolution of the Publisher object. The actual resolution of a Subscriber video stream is returned by the `videoWidth()` and `videoHeight()` methods of the Subscriber object. These may differ from the values of the `resolution` property passed in as the `properties` property of the `OT.initPublisher()` method, if publishing the browser does not support the requested resolution.

## Setting the frame rate of a stream

To set a recommended frame rate for a published stream, set the `frameRate` property of the `properties` parameter you pass into the `OT.initPublisher()` method:

```js
var publisherProperties = {frameRate: 7};
var publisher = OT.initPublisher(targetElement,
                                    publisherProperties);
publisher.on('streamCreated', function(event) {
    console.log('Frame rate: ' + event.stream.frameRate);
});
```

Set the value to the desired frame rate, in frames per second, of the video. Valid values are 30, 15, 7, and 1.

If the publisher specifies a frame rate, the actual frame rate of the video stream is set as the `frameRate` property of the Stream object, though the actual frame rate will vary based on changing network and system conditions. If you do not specify a frame rate when you call `OT.initPublisher`, this property is undefined.

For sessions that use the Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed), lowering the frame rate proportionally reduces the maximum bandwidth the stream can use.

However, in session with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to relayed, lowering the frame rate does not reduce the stream's bandwidth.

You can also restrict the frame rate of a Subscriber's video stream. For more information, see [subscribing streams](/video/tutorials/subscribe-streams).
