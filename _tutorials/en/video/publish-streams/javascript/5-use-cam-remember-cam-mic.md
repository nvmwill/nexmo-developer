---
title: Remember camera and microphone selection
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Using the front- or back-facing camera

When you initialize a publisher, you can set the `facingMode` property of the options object you pass into the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher). For example, you can set the property to `"user"` (front-facing camera) or `"environment"` (rear-facing camera), when this option is available on the client's system. (Generally, these options are available on mobile devices only.)

If you set the `facingMode` option, do _not_ set the `videoSource` property.

## Remembering the camera and microphone selection

For security in pages loaded over HTTP, all browsers always prompt the user to select the camera and microphone used to publish a stream.

In pages loaded over HTTPS in Chrome, the user's camera and microphone selection is remembered and reused on subsequent visits to a page loaded from the same HTTPS domain.

In pages loaded over HTTPS in Firefox, the user has an option to remember the camera and microphone (in subsequent visits to a page loaded from the same HTTPS domain) when selecting the devices.

In pages loaded over HTTPS in IE, you can use the user's previous camera and microphone selection from previous usage to the same HTTPS domain (if there was any), by setting the `usePreviousDeviceSelection` property to `true` in the options you pass into the `OT.initPublisher()` method:

```js
var pubOptions = {usePreviousDeviceSelection: true};
var publisher = OT.initPublisher(null, pubOptions, function(error) {
  console.log("OT.initPublisher error: ", error);
});
```

To prompt the user to select the camera and microphone to use in IE (and ignore previous device selections), do _not_ set the `usePreviousDevices` property in the options you pass into the `OT.initPublisher()` method (or set it to `false`, the default).
