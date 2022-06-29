---
title: Sending Signals
description: Sending Signals
---

### Sending Signals

You can send a signal to all participants in a Session by calling the `OpenTok.signal(sessionId, connectionId, payload, callback)` method and setting the connectionId parameter to `null`:

```js
var sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";
opentok.signal(sessionId, null, { type: "chat", data: "Hello!" }, function (
  error
) {
  if (error) return console.log("error:", error);
});
```

You can send signals to a specific participant in the session by calling the `OpenTok.signal(sessionId, connectionId, payload, callback)` method and setting all paramters, including **connectionId**:

```js
var sessionId =
  "2_MX2xMDB-flR1ZSBOb3YgMTkgMTE6MDk6NTggUFNUIDIwMTN-MC2zNzQxNzIxNX2";
var connectionId = "02e80876-02ab-47cd-8084-6ddc8887afbc";
opentok.signal(
  sessionId,
  connectionId,
  { type: "chat", data: "Hello!" },
  function (error) {
    if (error) return console.log("error:", error);
  }
);
```

This is the server-side equivalent to the `signal()` method in the [client SDKs](/video/resources#client-sdks).

<!-- opentok-todo: See OpenTok signaling developer guide . https://tokbox.com/developer/guides/signaling/ -->


In the next section you will learn how to [work with SIP Interconnect](/video/tutorials/server-side-setup/video/server-side/node/sip/node).