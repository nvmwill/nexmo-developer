---
title: Subscribe to a stream
description: Learn how to subscribe to an Vonage Video API stream in your web application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

To subscribe to a stream, pass the Stream object into the `subscribe` method of the Session object:

```js
    session.subscribe(stream, replacementElementId);
```

The `subscribe()` method takes the following parameters:

* `stream`—The Stream object.
* `targetElement`— (Optional) Defines the DOM element that the Subscriber video replaces.
* `properties`— (Optional) A set of properties that customize the appearance of the Subscriber view in the HTML page and select whether to subscribe to audio and video 

<!-- OPT-TODO: (see [Customizing the UI](/developer/guides/customize-ui/js/)) -->

<!-- OPT-TODO: (see [Adjusting audio and video](/developer/guides/audio-video/js/)). -->

* `completionHandler`— (Optional) A function that is called asymmetrically when the call to the `subscribe()` method completes successfully or fails. If the call to the `subscribe()` method fails, the completion handler is passed an error object. This object has a `code` and `message` property that describe the error.

The following code subscribes to all streams, other than those published by your client:

```js
session.on("streamCreated", function(event) {
    session.subscribe(event.stream);
});

// Replace with your API key and token:
session.connect(token, function (error) {
    if(error) {
        // failed to connect
    }
});
```

The `insertMode` property of the `properties` parameter of the `Session.subscribe()` method specifies how the Publisher object will be inserted in the HTML DOM, in relation to the `targetElement` parameter. You can set this parameter to one of the following values:

* `"replace"` — The Subscriber object replaces contents of the targetElement. This is the default.
* `"after"` — The Subscriber object is a new element inserted after the targetElement in the HTML DOM. (Both the Subscriber and targetElement have the same parent element.)
* `"before"` — The Subscriber object is a new element inserted before the targetElement in the HTML DOM. (Both the Subscriber and targetElement have the same parent element.)
* `"append"` — The Subscriber object is a new element added as a child of the targetElement. If there are other child elements, the Publisher is appended as the last child element of the targetElement.

For example, the following code adds a new Subscriber object as a child of a `subscriberContainer` DOM element:

```js
session.on('streamCreated', function(event) {
  var subscriberProperties = {insertMode: 'append'};
  var subscriber = session.subscribe(event.stream,
    'subscriberContainer',
    subscriberProperties,
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Subscriber added.');
      }
  });
});
```

The Subscriber object has an `element` property, which is set to the HTML DOM element containing it.
