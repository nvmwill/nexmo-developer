---
title: Detect granted access to camera and microphone
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Detecting when a client has granted access to the camera and microphone

Before a Publisher object can access the client's camera and microphone, the user must grant access to them. The Publisher object dispatches events when the user grants or denies access to the camera and microphone:

```js
publisher.on({
  accessAllowed: function (event) {
    // The user has granted access to the camera and mic.
  },
  accessDenied: function accessDeniedHandler(event) {
    // The user has denied access to the camera and mic.
  }
});
```

Also, a Publisher object dispatches events when the user is presented with the option to allow or deny access to the camera and microphone:

```js
publisher.on({
  accessDialogOpened: function (event) {
    // The Allow/Deny dialog box is opened.
  },
  accessDialogClosed, function (event) {
    // The Allow/Deny dialog box is closed.
  }
});
```

The Publisher has an `accessAllowed` property, which indicates whether a client has (`true`) or has not (`false`) granted access to the camera and microphone.
