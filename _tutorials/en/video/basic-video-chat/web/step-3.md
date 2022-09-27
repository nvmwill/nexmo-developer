---
title: Connecting to the Session and Creating a Publisher
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Connecting to the Session and Creating a Publisher

You may have noticed the `initializeSession()` method being called in the last step after getting the session ID and token. This method initializes a session object and then connects to the session, but we haven't defined it in our code yet.

1. Copy the following code and paste it below the existing code in your app.js file:

```js
// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
```

### Creating a Publisher

The application initializes a `publisher` object with `OT.initPublisher()`. This method takes three optional parameters:

* The DOM element that the publisher video replaces — in this case the `publisher` div
* The properties of the publisher — in this case the `insertMode`, `height`, and `width` attributes
* The third parameter (not present in our code) specifies the completion handler

Read more about these options in the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) reference documentation.

### Initializing and connecting to the session

The `OT.initSession()` method takes two parameters — the Vonage Video API key and the session ID. It initializes and returns a Vonage Video `session` object.

The `connect()` method of the `session` object connects the client application to the Vonage Video session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `connect()` method takes two parameters — a `token` and a completion handler function `function(error)`.

Once the session is connected, we publish to the session with `session.publish(publisher)`.

If the client fails to connect to the session, an error object is passed into the completion handler of the connect event — in this case it prints an error message to the console using `console.error()`.
