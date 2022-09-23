--- 
title: Detecting when clients have connected and disconnected 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Android application.
product: video 
---

## Detecting when other clients have connected and disconnected

When you are connected to a session, the `Session.ConnectionListener.onConnectionCreated(Session session, Connection connection)` method is called when a new client (other than your own) connects to the session.

The `Session.ConnectionListener.onConnectionDestroyed(Session session, Connection connection)` method is called when a client (other than your own) leaves the session. The Connection object passed into the method defines the connection hat has left the session.

Add a listener object for these connection events by calling the `setConnectionListener(Session.ConnectionListener listener)` method of the Session object:

```java
mSession.setSessionListener(this);


@Override
public void onConnectionCreated(Session session, Connection connection)
{
  // New client connected to the session
}

@Override
public void onConnectionDestroyed(Session session, Connection connection)
{
  // A client disconnected from the session
}
```
