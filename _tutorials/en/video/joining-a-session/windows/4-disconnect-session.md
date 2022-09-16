--- 
title: Disconnecting from a Session 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Windows application.
product: video 
---

## Disconnecting from a session

To disconnect from a session, call the `Session.Disconnect()` method:

```c#
session.Disconnect();
```

## Detecting when you have disconnected

The `Session.Disconnected` message is sent when the client disconnects from the Vonage Video session.

```c#
private void Session_Disconnected(object sender, EventArgs e)
{
    Console.WriteLine("Session disconnected");
}
```

If the connection to the session drops due to an error that occurs after a successful connection, the `Session.Error` event is sent prior to the `Session.Disconnected` event. The `ErrorEventArgs` object passed into the `Session.Error` event handler define the reason the connection dropped.
