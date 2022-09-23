--- 
title: Detecting when clients have connected and disconnected 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Detecting when other clients have connected and disconnected

When you are connected to a session, the `Session.ConnectionCreated` event is sent when a new client (other than your own) connects to the session. The `ConnectionEventArgs` object passed into the event listener defines the connection hat has left the session:

```c#
session.ConnectionCreated += Session_ConnectionCreated;

private void Session_ConnectionCreated(object sender, EventArgs e)
{
    // Another client connected to the session.
}
```

The `Session.ConnectionDropped` event is sent when a client (other than your own) leaves the session. The `ConnectionEventArgs` object passed into the event listener defines the connection that has left the session.

```c#
session.ConnectionCreated += Session_ConnectionDropped;

private void Session_ConnectionDropped(object sender, EventArgs e)
{
    // Another client disconnected from the session.
}
```
