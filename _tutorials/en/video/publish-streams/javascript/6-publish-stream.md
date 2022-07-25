---
title: Publish a stream
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Publishing a stream

Once you create a Publisher object, you can pass it into the `publish()` method of a Session object to publish a stream to the session:

```js
publisher = OT.initPublisher('replacementElementId');
session.publish(publisher, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Publishing a stream.');
  }
});
```

The second element is a completion handler function that is passed an error object if publishing fails. Otherwise the completion handler function is called with no error passed in.

This code assumes that `session` is a Session object, and that the client has connected to the session. For more information, see [Joining a Session](/video/tutorials/joining-a-session).

The Publish object dispatches a `streamCreated` event when it starts streaming to the session:

```js
var publisher = OT.initPublisher();
session.publish(publisher, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Publishing a stream.');
  }
});
publisher.on('streamCreated', function (event) {
    console.log('The publisher started streaming.');
});
```

The Publisher object has an `element` property, which is set to the HTML DOM element containing it.
