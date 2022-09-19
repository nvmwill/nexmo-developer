---
title: Stop a publisher stream and detecting when a published stream session ends
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Stopping a publisher from streaming to a session

You can stop publisher from streaming to the session by calling the `unpublish()` method of the Session object:

```js
session.unpublish(publisher);
```

Note that you can individually stop sending video or audio (while still publishing).


For more information, see [Adjusting audio and video](/video/tutorials/audio-video/introduction/javascript).


## Detecting when a published stream leaves a session

The Publisher object dispatches a `streamDestroyed` event when it stops streaming to the session:

```js
var publisher = OT.initPublisher();
session.publish(publisher);
publisher.on("streamDestroyed", function (event) {
    console.log("The publisher stopped streaming. Reason: "
    + event.reason);
});
```

The `streamDestroyed` event is defined by the StreamEvent class. The event includes a `reason` property, which details why the stream ended. These reasons include `"clientDisconnected"`, `"forceDisconnected"`, `"forceUnpublished"`, or `"networkDisconnected"`. For details, see [StreamEvent](/sdk/stitch/video-js-reference/StreamEvent.html).

By default, when a Publisher dispatches the `streamDestroyed` event, the Publisher is destroyed and removed from the HTML DOM. You can prevent this default behavior by calling the `preventDefault()` method of the StreamEvent object:

```js
publisher.on("streamDestroyed", function (event) {
    event.preventDefault();
    console.log("The publisher stopped streaming.");
});
```

You may want to prevent the default behavior, and retain the Publisher, if you want to reuse the Publisher object to publish again to the session.

The Publisher also dispatches a `destroyed` event when the object has been removed from the HTML DOM. In response to this event, you may choose to adjust (or remove) DOM elements related to the publisher that was removed.
