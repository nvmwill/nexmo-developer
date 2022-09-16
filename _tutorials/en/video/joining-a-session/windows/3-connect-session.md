--- 
title: Connecting to a session 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Connecting to a session

Call the `Session.connect(token)` method, passing in a valid OpenTok token:

```c#
session.Connect(TOKEN);
```

The `Session.Connected` event is sent when the client connects to the OpenTok session.

```c#
session.ConnectionCreated += Session_ConnectionCreated;

private void Session_Connected(object sender, EventArgs e)
{
    Console.WriteLine("Session connected connection id:" + session.Connection.Id);
}
```

The `Session.Error` event is sent when there is an error in connecting:

```c#
session.Error += Session_Error;

private void Session_Error(object sender, Session.ErrorEventArgs e)
{
    Console.WriteLine("Session error:" + e.ErrorCode);
}
```

See the documentation for the `OpenTok.ErrorCode` enum for descriptions of values of the `code` property of the error object.
