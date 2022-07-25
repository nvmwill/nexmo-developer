--- 
title: Connecting to a session 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Connecting to a session

Once you have initialized a Session object, call its `connect()` method, passing in a token and a completion handler function:

```js
var session = OT.initSession(apiKey, sessionId);
session.connect(token, function(error) {
  if (error) {
    console.log("Error connecting: ", error.name, error.message);
  } else {
    console.log("Connected to the session.");
  }
});
```

An error object is passed into the completion handler of the `connect` event when the client fails to connect to the OpenTok session. Otherwise, no error object is passed in, indicating that the client connected successfully to the session.

The Session object also dispatches a `sessionConnected` event when the client connects to the OpenTok session. And the OT object dispatches an `exception` event when there is an error in connecting. However, it is simpler to check for success in connecting by passing a completion handler into the `connect()` method, as the last parameter.
