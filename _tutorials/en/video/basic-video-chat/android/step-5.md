---
title: Connecting to the session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Connecting to the session

Next, we will connect to the Vonage Video session. You must do this before you can publish your audio-video stream to the session or view other participants streams.

1. Add a `session` property to the MainActivity class (right after the last lines you added in **Step 3**):

```java
private Session session;
```

The Session class is defined in the Vonage Video Android SDK. It represents a Vonage Video session and includes methods for interacting with the session.

2. To facilitate logging, add a `TAG` property at the top of the `MainActivity` class:

```java
private static final String TAG = MainActivity.class.getSimpleName();
```

3. In the `requestPermissions()` method you created in the last step, add the following lines of code under the `// initialize and connect to the session` comment to instantiate the Session object and call its `connect(token)` method:

```java
initializeSession(OpenTokConfig.APP_ID, OpenTokConfig.SESSION_ID, OpenTokConfig.TOKEN);
```

4. below the `requestPermissions()` method, add the following lines of code:

```java
private void initializeSession(String apiKey, String sessionId, String token) {
    Log.i(TAG, "appID: " + apiKey);
    Log.i(TAG, "sessionId: " + sessionId);
    Log.i(TAG, "token: " + token);

    session = new Session.Builder(this, apiKey, sessionId).build();
    session.setSessionListener(sessionListener);
    session.connect(token);
}
```

This code uses the `Session.Builder()` to instantiate a Session object. The constructor takes three parameters:

* The Android application context associated with this process
* The Vonage Video API key
* The session ID

The `Session.Builder.build()` method returns a new Session instance.

The `Session.setSessionListener()` method sets the object that will implement the SessionListener interface. This interface includes callback methods are called in response to session-related events. (We will implement them in the next steps).

The `Session.connect()` method of the `session` object connects the client application to the Vonage Video session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `connect()` method takes one parameter: the authentication token for this client to connect to the session.

5. Next we will create the `sessionListener` property. Add the following code at the top of the `MainActivity` class:

```java
private Session.SessionListener sessionListener = new Session.SessionListener() {
@Override
public void onConnected(Session session) {
    Log.d(TAG, "onConnected: Connected to session: " + session.getSessionId());
}

@Override
public void onDisconnected(Session session) {
    Log.d(TAG, "onDisconnected: Disconnected from session: " + session.getSessionId());
}

@Override
public void onStreamReceived(Session session, Stream stream) {
    Log.d(TAG, "onStreamReceived: New Stream Received " + stream.getStreamId() + " in session: " + session.getSessionId());
}

@Override
public void onStreamDropped(Session session, Stream stream) {
    Log.d(TAG, "onStreamDropped: Stream Dropped: " + stream.getStreamId() + " in session: " + session.getSessionId());
}

@Override
public void onError(Session session, OpentokError opentokError) {
    Log.e(TAG, "Session error: " + opentokError.getMessage());
}
}; 
```

* When the client connects to the session, the implementation of the `SessionListener.onConnected(session)` method is called.
* When the client disconnects from the session, the implementation of the `SessionListener.onDisconnected(session)` method is called.
* If the client fails to connect to the session, the implementation of the `SessionListener.onError(session, error)` method is called.
* When another client publishes a stream to the session, the implementation of the `SessionListener.onStreamReceived(session, stream)` method is called.
* When another client stops publishing a stream to the session, the implementation of the `SessionListener.onStreamDropped(session, stream)` method is called.

For now, the app prints to the debugger console when any of these events occur.

Debug your application. If the app successfully connects to the Vonage Video session, the `SessionListener.onConnected(session)` method logs to the debug console.

7. Add the methods below to the `MainActivity` class to notify the session about Activity lifecycle events:

```java
@Override
protected void onPause() {
    super.onPause();

    if (session != null) {
        session.onPause();
    }
}

@Override
protected void onResume() {
    super.onResume();

    if (session != null) {
        session.onResume();
    }
}
```
