--- 
title: Connecting to a session 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Android application.
product: video 
---

## Connecting to a session

Call the `Session.connect(token)` method, passing in a valid token:

```java
mSession.connect(TOKEN);
```

The `Session.SessionListener.onConnected(Session session)` method is called when the client connects to the Vonage Video session.

```java
@Override
protected void onConnected(Session session)
  // This client has connected to the session.
}
```

The `Session.SessionListener.onError(Session session, OpentokError error)` method is called when there is an error in connecting. See the documentation for the OpentokException.ErrorCode enum for descriptions of values of the `code` property of the error object.

```java
@Override
public void onError(Session session, OpentokError error) {
  Log.i(LOGTAG, "Exception: " + error.getMessage());
}
```
