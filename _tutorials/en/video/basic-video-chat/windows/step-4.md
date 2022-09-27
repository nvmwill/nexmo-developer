---
title: Connecting to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Connecting to the Session

Next, we will connect to the Vonage Video session. You must do this before you can publish your audio-video stream to the session or view other participants streams.

1. Add a `Session` member variable to the MainWindow class (right after the last line you added in **Step 3**):

```csharp
  Session Session;
```

The Session class is defined in the Vonage Video Windows SDK. It represents a session and includes methods for interacting with the session.

2. In the `MainWindow()` constructor function, add the following lines, after the `InitializeComponent()` method:

```csharp
  Session = new Session(Context.Instance, API_KEY, SESSION_ID);
  
    Session.Connected += Session_Connected;
    Session.Disconnected += Session_Disconnected;
    Session.Error += Session_Error;
    Session.StreamReceived += Session_StreamReceived;
  
    Session.Connect(TOKEN);
```

This code uses the `Session()` constructor to instantiate a Session object. The constructor takes three parameters:

* The Windows context associated with this application
* The Vonage Video session ID
* The token

The next lines add event handlers for session-related events. (We will implement these in the next steps).

The `Session.Connect()` method of the `session` object connects the client application to the session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `Connect()` method takes one parameter: the authentication token for this client to connect to the session.

3. Next we will implement methods of the SessionListener interface. Add the following code to the end of the MainWindow class (before the closing bracket of the class):

```csharp
  private void Session_Connected(object sender, EventArgs e)
  {
    Console.WriteLine("Connected to session.");
  }
  
  private void Session_Disconnected(object sender, EventArgs e)
  {
      Console.WriteLine("Disconnected from session.");
  }
  
  private void Session_Error(object sender, Session.ErrorEventArgs e)
  {
    Console.WriteLine("Session error:" + e.ErrorCode);
  }
  
  private void Session_StreamReceived(object sender, Session.StreamEventArgs e)
  {
    Console.WriteLine("Stream received in session.");
  }
```

* When the client connects to the Vonage Video session, the `Session.Connected` event is raised (and the `Session_Connected()` event handler is called).
* When the client disconnects from the Vonage Video session, the `Session.Disconnected` event is sent (and the `Session_Disconnected()` method is called).
* If the client fails to connect to the Vonage Video session, the `Session.Error` event is sent (and the `Session_Error()` method is called).
* When another client publishes a stream to the Vonage Video session, the `Session.StreamReceived` event is raised (and the `Session_StreamReceived()` event handler is called).

For now, the app writes to the debugger console when any of these events occur.

Debug your application. If the app successfully connects to the Vonage Video session, the `Session_Connected()` method logs to the debug console.
