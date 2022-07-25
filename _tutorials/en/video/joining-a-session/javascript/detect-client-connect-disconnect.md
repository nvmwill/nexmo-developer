--- 
title: Detecting when clients have connected and disconnected 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Detecting when clients have connected and disconnected

The Session object dispatches a `connectionCreated` event when a new client (including your own) connects to the session. The Session object dispatches a `connectionDestroyed` event when other clients leave the session. These events are defined by the ConnectionEvent class, which has a `connection` object, which is a Connection object for the connection (created or destroyed) related to the event:

```js
    var connectionCount;
    session.on({
      connectionCreated: function (event) {
        connectionCount++;
        if (event.connection.connectionId != session.connection.connectionId) {
          console.log('Another client connected. ' + connectionCount + ' total.');
        }
      },
      connectionDestroyed: function connectionDestroyedHandler(event) {
        connectionCount--;
        console.log('A client disconnected. ' + connectionCount + ' total.');
      }
    });
    session.connect(token, function (error) {
      if (error) {
        console.log("Failed to connect.");
      } else {
        console.log('You have connected to the session.');
      }
    });
```
