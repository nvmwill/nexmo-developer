---
title: Force a Client to Disconnect
description: Force a Client to Disconnect
---

### Force a Client to Disconnect

You can disconnect participants from a session using the `OpenTok.forceDisconnect(sessionId, connectionId, callback)` method.

```js
opentok.forceDisconnect(sessionId, connectionId, function (error) {
  if (error) return console.log("error:", error);
});
```

This is the server-side equivalent to the `forceDisconnect()` method in [client-side SDK](/video/resources#client-sdks).

<!-- opentok-todo: https://www.tokbox.com/developer/guides/moderation/js/#force_disconnect. -->

In the next section you will learn how to [mute a client before they join a session](/video/tutorials/server-side-setup/video/server-side/node/mute-audio/node).