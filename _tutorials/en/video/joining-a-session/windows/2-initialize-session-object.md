--- 
title: Initialize session object 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Windows application.
product: video 
---

## Initializing a Session object

Before you can connect to a session, instantiate a Session object by calling the `Session()` constructor, passing in the appropriate Windows application context, your Vonage Video API key, and a Vonage Video session ID:

```c#
session = new Session(Context.Instance, API_KEY, SESSION_ID);
```

Note that calling the `Session()` constructor does not _create_ a Vonage Video session; it creates a C# Session object, which represents an existing Vonage Video session. You create a Vonage Video session using the Vonage Video server-side libraries. See [Creating an Vonage Video session](/video/tutorials/create-session).

You will want to add handlers for basic session-related events:

```c#
session.Connected += Session_Connected;
session.Disconnected += Session_Disconnected;
session.Error += Session_Error;
session.ConnectionCreated += Session_ConnectionCreated;
session.StreamReceived += Session_StreamReceived;
session.StreamDropped += Session_StreamDropped;
```

You will want to implement each of the callback methods. For example, this method handles `ConnectionCreated` event (which occurs when the client connects to the Vonage Video session):

```c#
private void Session_Connected(object sender, EventArgs e)
{
    Console.WriteLine("Session connected connection id:" + session.Connection.Id);
}
```

**Note:** The Session class implements the System.IDisposable interface. Be sure to call the `Dispose()` method of the Session object to release their resources when you no longer need the object (for example, when the app or window is closing).
