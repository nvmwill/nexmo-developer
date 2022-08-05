---
title: Receiving signals in a session
description: Receiving signals in a session
product: video
---

# Receiving signals in a session

To start receiving all signals sent in a session, add an event listener for the `signal` event, dispatched by the Session object:

```javascript
session.on("signal", function(event) {
    console.log("Signal sent from connection " + event.from.id);
    // Process the event.data property, if there is any data.
});
```
    
You can also listen for only signals set to a specific type. (You can set the type of a signal, optionally, when you [send a signal](/video/tutorials/video-signaling/video/video-signaling/js/specific-client-signal/javascript).) Register an event listener for the `signal:type` event, replacing "type" with the type string. For example, the following listens for signals of type "foo":

```javascript
session.on("signal:foo", function(event) {
    console.log("Signal sent from connection " + event.from.id);
    // Process the event.data property, if there is any data.
});
```

You can compare the `from` property of the event object with the `connection` property of the Session object to see if the signal was sent by your client or another:

```javascript
session.on("signal:foo", function(event) {
    if (connection && event.from.connectionId != session.connection.id) {
    // Signal received from another client
    }
}
```
    
Note that you can use a [REST API call](/api/video) to send a signal from your server, instead of from a client connected to the session. In this case, the `from` property of the event object is set to `null`.
