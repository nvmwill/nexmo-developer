---
title: Unsubscribe from a stream
description: Learn how to subscribe to a Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, pass the Subscriber object into the `unsubscribe()` method of the Session object:

```js
session.unsubscribe(subscriber);
```

The Subscriber object is destroyed, and the stream display is removed from the HTML DOM.
