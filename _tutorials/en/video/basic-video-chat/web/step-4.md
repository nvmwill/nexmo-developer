---
title: Initializing the Subscriber
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Initializing the Subscriber

Finally, we want clients to be able to **subscribe** to (or view) each other's streams in the session.

1. In your current **app.js** file, you should have a comment that says `// Subscribe to a newly created stream`. Copy the following code and add it directly under that comment:

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

* The Stream object to which the client is subscribing — `event.stream`
* The DOM element or DOM element ID (optional) that the subscriber video replaces — in this case the `subscriber` div
* A set of properties (optional) that customize the appearance of the subscriber view — in this case the `insertMode`, `height`, and `width` attributes
* The completion handler function (optional) that is called when the `subscribe()` method completes successfully or fails

Read more about these options in the [Session.subscribe()](/sdk/stitch/video-js-reference/Session.html#subscribe) reference documentation.
