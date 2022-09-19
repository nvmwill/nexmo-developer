--- 
title: Initialize session object 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Android application.
product: video 
---

## Initializing a Session object

Before you can connect to a session, instantiate a Session.Builder object by calling the `Session.Builder()` constructor, passing in the appropriate Android application context, your Vonage Video API key, and a session ID. Then call the `build()` method of the Session.Builder object to create a Session object:

```java
mSession = new Session.Builder(context, API_KEY, SESSION_ID)
    .build();
```

Note that calling the `Session.Builder.build()` method does not _create_ a Vonage Video session; it creates the Java Session object, which represents an existing Vonage Video session. You create a Vonage Video session using the Vonage Video server-side libraries. See [Creating a Vonage Video session](/video/tutorials/create-session).

Add a listener object for basic session-related events by calling the `setSessionListener(Session.SessionListener listener)` method of the Session object:

```java
mSession.setSessionListener(this);
```

Implement the methods of the Session.SessionListener interface in the object you specify as the event listener object. These methods are called when session-related events occur.
