---
title: Initializing the subscriber
description: Initializing the subscriber
---

### Initializing the subscriber

We want clients to be able to subscribe to (or view) each other's streams in the session.

1. In your current `app.js` file, you should have a comment that reads `// Subscribe to a newly created stream`. Copy the following code and add it directly under that comment:

    ```js
    session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);
    });
    ```

When a new stream is created in the session, the Session object dispatches a `streamCreated` event. When the client detects a stream, we want it to subscribe to that stream, and we do this in the code above with the `session.subscribe()` method. This method takes four parameters:

- The Stream object to which the client is subscribing thus `event.stream`.
- The DOM element or DOM element ID (optional) that the subscriber video replaces. In this case the `subscriber` div.
- A set of properties (optional) that customize the appearance of the subscriber view — in this case the `insertMode`, `height`, and `width` attributes.
- The completion handler function (optional) that is called when the `subscribe()` method completes successfully or fails.

The next step is to [test the app](/video/tutorials/create-video-conferencing-app/video/create-video-conferencing-app/javascript/testing/javascript).