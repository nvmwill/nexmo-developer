---
title: Working with SIP Interconnect
description: Working with SIP Interconnect
---

### Working with SIP Interconnect

You can add an audio-only stream from an external third-party SIP gateway using the SIP Interconnect feature. This requires a **SIP URI**, the **session ID** you wish to add the audio-only stream to, and a **token** to connect to that session ID.

```js
var options = {
  from: "15551115555",
  secure: true,
};
opentok.dial(sessionId, token, sipUri, options, function (error, sipCall) {
  if (error) return console.log("error: ", error);

  console.log(
    "SIP audio stream Id: " +
      sipCall.streamId +
      " added to session ID: " +
      sipCall.sessionId
  );
});
```

<!-- opentok-todo: For more information, see the OpenTok SIP Interconnect developer guide. https://tokbox.com/developer/guides/sip/ -->
