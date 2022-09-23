---
title: Detecting when streams leave a session and reconnection
description: Learn how to subscribe to a Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams leave a session

When a stream, other than your own, leaves a session the Session object dispatches a `streamDestroyed` event:

```js
session.on("streamDestroyed", function (event) {
  console.log("Stream stopped. Reason: " + event.reason);
});
```

When a stream you publish leaves a session the Publisher object dispatches a `streamDestroyed` event:

```js
var publisher = OT.initPublisher();
publisher.on("streamDestroyed", function (event) {
  console.log("Stream stopped. Reason: " + event.reason);
});
```

The `streamDestroyed` event is defined by the StreamEvent class. The event includes a `reason` property, which details why the stream ended. These reasons include `"clientDisconnected"`, `"forceDisconnected"`, `"forceUnpublished"`, or `"networkDisconnected"`. For details, see [StreamEvent](/sdk/stitch/video-js-reference/StreamEvent.html).

By default, when a `streamDestroyed` event is dispatched for a stream you are subscribed to, the corresponding Subscriber objects (there could be more than one) are destroyed and removed from the HTML DOM. You can prevent this default behavior by calling the `preventDefault()` method of the StreamEvent object:

```js
session.on("streamDestroyed", function (event) {
  event.preventDefault();
  var subscribers = session.getSubscribersForStream(event.stream);
  // Now you can adjust the DOM elements around each
  // subscriber to the stream, and then delete it yourself.
});
```

Note that the `getSubscribersForStream()` method of a Session object returns all of the Subscriber objects for a Stream.

You may want to prevent the default behavior, and retain the Subscriber, if you want to adjust related DOM elements before deleting the Subscriber yourself. You can then delete the Subscriber object (and its DOM element) by calling the `destroy()` method of the Subscriber object.

A Subscriber object dispatches a `destroyed` event when the object has been removed from the HTML DOM. In response to this event, you may choose to adjust (or remove) DOM elements related to the subscriber that was removed.

## Automatic reconnection

If a client drops a connection to a subscribed stream (for example, due to a drop in network connectivity in either client), it will attempt to automatically reconnect to the stream. When the stream is dropped and the client tries to reconnect, the Subscriber object dispatches a `disconnected` event. When the stream is restored, the Subscriber object dispatches a `connected` event. If the client cannot restore the stream, the Subscriber object dispatched a `destroyed` event.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and destroyed states:

```js
subscriber.on(
  disconnected: function() {
    // Display a user interface notification.
  },
  connected: function() {
    // Adjust user interface.
  },
  destroyed: function() {
    // Adjust user interface.
  }
);
```
