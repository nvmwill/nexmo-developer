---
title: Sending a signal to all clients in a session
description: Sending a signal to all clients in a session
product: video
---

# Sending a signal to all clients in a session

To send a signal to all clients in a session, call the `signal()` method of the Session object, but _do not_ set a `to` property for the `signal` parameter:

```javascript
session.signal(
    {
    data:"hello"
    },
    function(error) {
    if (error) {
        console.log("signal error ("
                    + error.name
                    + "): " + error.message);
    } else {
        console.log("signal sent.");
    }
    }
);
```    
For details on the other options you pass into the `signal()` method, see [the previous section](/video/tutorials/video-signaling/video/video-signaling/js/specific-client-signal/javascript).

Calling this method without limiting the set of recipient clients will result in multiple signals sent (one to each client in the session).