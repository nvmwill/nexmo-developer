---
title: Connecting to the session and creating a publisher
description: Connecting to the session and creating a publisher
---

### Connecting to the session and creating a publisher

You may have noticed the `initializeSession()` method being called after the credential section in your `app.js` file. This method initializes a session object and then connects to the session, but we haven't defined it in our code yet.

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

**Creating a publisher**

The application initializes a publisher object with `OT.initPublisher()`. This method takes three optional parameters:

- The DOM element that the publisher video replaces.In this case the publisher div.
- The properties of the publisher.In this case the `insertMode`, `height`, and `width` attributes.
- The third parameter (not present in our code) specifies the completion handler.

**Initializing and connecting to the session**

The `OT.initSession()` method takes two parameters namely the **API key** and the **session ID**. Once initialized it returns a session object.

The `connect()` method of the session object connects the client application to the session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `connect()` method takes two parameters thus a `token` and a completion handler function `function(error)`.

Once the session is connected, we publish to the session with `session.publish(publisher)`.

If the client fails to connect to the session, an error object is passed into the completion handler of the connect event.In this case it prints an error message to the console using `console.error()`.

Next step is [initializing the subscriber](/video/tutorials/create-video-conferencing-app/video/create-video-conferencing-app/javascript/initialize-subscriber/javascript)