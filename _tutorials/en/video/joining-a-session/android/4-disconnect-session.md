--- 
title: Disconnecting from a Session 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Android application.
product: video 
---

## Disconnecting from a session

To disconnect from a session, call the `Session.disconnect()` method.

```java
mSession.disconnect();
```

## Detecting when you have disconnected

The `Session.SessionListener.onDisconnected(Session session)` method is called when the client disconnects from the session.

```java
@Override
public void onDisconnected(session) {
  // This client has disconnected to the session.
}
```
    
If the connection to the session drops due to an error that occurs after a successful connection, the `Session.SessionListener.onError(Session session, OpentokError error)` method is called prior to the `Session.SessionListener.onDisconnected(Session session)` method. The OpentokError object passed into the `Session.SessionListener.onError(Session session, OpentokError error)` method describes the reason for the disconnection.
