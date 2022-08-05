---
title: Sending a signal to a specific client in a session
description: Sending a signal to a specific client in a session
product: video
---

# Sending a signal to a specific client in a session

To send a signal to a specific client in a session, call the `signal()` method of the Session object and set the to property of the `signal` parameter:

```javascript

session.signal(
  {
    to: connection1,
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

The `to` property is a [Connection](/sdk/stitch/video-js-reference/Connection.html) object corresponding to clients connected to the session that you want to signal. You obtain references to Connection objects when the Session object dispatches [`sessionConnected`](/sdk/stitch/video-js-reference/SessionConnectEvent.html) and [`connectionCreated`](/sdk/stitch/video-js-reference/ConnectionEvent.html) events. You can also obtain the Connection object corresponding to a stream by getting the `connection` property of the Stream object.

The `data` property of the `signal` parameter is the data string you send with the message. This property is optional. If you omit it, the message will be sent without a data payload. The limit to the size of data is 8KB.

The `completerHandler` parameter of the `signal()` method is called when the call the method succeeds or fails. The `error` parameter passed into the completion handler is set to `null` if the call succeeds. When the call the method fails, the error object has the following properties: `code` (a numeric error code), `message` (a string describing the error), and `signal` (an object corresponding to the `signal` parameter passed into the `signal()` method).

Additionally, you can pass in a `type` property of the `signal` parameter. This is a string value that clients can filter on when [listening for signals](/video/tutorials/video-signaling/video/video-signaling/js/receiving-signals/javascript):

```js
session.signal(
    {
    data:"hello",
    type:"textMessage"
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

The maximum length of the `type` string is 128 bytes, and it must contain only letters (A-Z and a-z), numbers (0-9), '-', '_', and '~'.

For more details, see the documentation for the [Session.signal()](/sdk/stitch/video-js-reference/Session.html#signal) method.
