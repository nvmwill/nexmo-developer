---
title: Troubleshooting
description: Learn how to subscribe to a Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Troubleshooting

Follow the tips in this section to avoid connectivity issues when subscribing. For general information on troubleshooting, see [Debugging](/video/tutorials/video-debugging).

### Handling Errors

Handling errors when subscribing is a bit easier than when publishing. There is only one way to subscribe—with the `Session.subscribe()` method—and pretty much any error that happens when subscribing comes down to a network issue. 

This can happen if, for example, the user is on a really restrictive network connection that does not allow for WebRTC connections (but the WebSocket connection worked). If the Subscriber fails to connect it will display its own error message inside the Subscriber. 

It doesn't look particularly nice and isn't very informative to the end user. We recommend that you handle this case yourself and surface a message to the user indicating that they failed to subscribe and that they should check their network connection. Handling these errors looks like this:

```js
session.subscribe(event.stream, 'subscriber', {insertMode: 'append'}, function (err) {
  if (err) {
    showMessage('Streaming connection failed. This could be due to a restrictive firewall.');
  }
});
```

### Losing Connectivity

Your Subscriber can also lose its connection after it has already succeeded in connecting. More often than not, this will also result in the Session losing its connection, but that's not always the case. Also, it may be that the Publisher on the other side has lost its connection rather than the connection being lost locally.

You can handle the Subscriber disconnecting by listening for the `streamDestroyed` event on the Session with a `reason` property set to "networkDisconnected", like this:

```js
session.on({
  streamDestroyed: function (event) {
    if (event.reason === 'networkDisconnected') {
      event.preventDefault();
      var subscribers = session.getSubscribersForStream(event.stream);
      if (subscribers.length > 0) {
        var subscriber = document.getElementById(subscribers[0].id);
        // Display error message inside the Subscriber
        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
          + 'or because the other party lost their connection.';
        event.preventDefault();   // Prevent the Subscriber from being removed
      }
    }
  }
});
```
