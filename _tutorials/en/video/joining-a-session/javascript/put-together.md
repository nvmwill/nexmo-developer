--- 
title: Putting it all together 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Putting it all together

The following code includes a `connect()` method, which connects to a session. Once connected, the code tracks when clients join and leave the session. It also has a method for disconnecting from the session:

```js
var session;
var connectionCount = 0;

function connect() {
  // Replace apiKey and sessionId with your own values:
  session = OT.initSession(appID, sessionId);
  session.on({
    connectionCreated: function (event) {
      connectionCount++;
      console.log(connectionCount + ' connections.');
    },
    connectionDestroyed: function (event) {
      connectionCount--;
      console.log(connectionCount + ' connections.');
    },
    sessionDisconnected: function sessionDisconnectHandler(event) {
      // The event is defined by the SessionDisconnectEvent class
      console.log('Disconnected from the session.');
      document.getElementById('disconnectBtn').style.display = 'none';
      if (event.reason == 'networkDisconnected') {
        alert('Your network connection terminated.')
      }
    }
  });
  // Replace token with your own value:
  session.connect(token, function(error) {
    if (error) {
      console.log('Unable to connect: ', error.message);
    } else {
      document.getElementById('disconnectBtn').style.display = 'block';
      console.log('Connected to the session.');
      connectionCount = 1;
    }
  });
}

function disconnect() {
  session.disconnect();
}

connect();
```
