---
title: Initializing a publisher view
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Initializing a publisher view

The `OT.initPublisher()` method initializes and returns a Publisher object. The Publisher object represents the view of a video you publish:

```js
var publisher;
var targetElement = 'publisherContainer';

publisher = OT.initPublisher(targetElement, null, function(error) {
  if (error) {
    // The client cannot publish.
    // You may want to notify the user.
  } else {
    console.log('Publisher initialized.');
  }
});
```  

The `OT.initPublisher()` method takes two parameters:

* `targetElement`— (Optional) Defines the DOM element that the Publisher video replaces.
* `properties`— (Optional) A set of properties that customize the Publisher. The `properties` parameter also includes options to specify an audio and video input device used by the publisher (see [Setting the camera and microphone used by the publisher](#set_camera_mic)). The `properties` parameter also includes options for customizing the appearance of view in the HTML page (see [Customizing the UI](/developer/guides/customize-ui/js/)) and select whether to publish audio and video (see [Publishing audio or video only](/developer/guides/audio-video/js/index.html#publish_audio_video_only)).
    
* `completionHandler`— (Optional) A completion handler that specifies whether the publisher instantiated successfully or with an error.

You can pass this Publisher object into the `Session.publish()` method to publish a stream to a session. See [Publishing a stream](#publish_stream).

Before calling `Session.publish()`, you can use this Publisher object to test the microphone and camera attached to the Publisher.

The `insertMode` property of the `properties` parameter of the `OT.initPublisher()` method specifies how the Publisher object will be inserted in the HTML DOM, in relation to the `targetElement` parameter. You can set this parameter to one of the following values:

* `"replace"` — The Publisher object replaces contents of the targetElement. This is the default.
* `"after"` — The Publisher object is a new element inserted after the targetElement in the HTML DOM. (Both the Publisher and targetElement have the same parent element.)
* `"before"` — The Publisher object is a new element inserted before the targetElement in the HTML DOM. (Both the Publisher and targetElement have the same parent element.)
* `"append"` — The Publisher object is a new element added as a child of the targetElement. If there are other child elements, the Publisher is appended as the last child element of the targetElement.

For example, the following code adds a new Publisher object as a child of a `publisherContainer` DOM element:

```js
    // Try setting insertMode to other values: "replace", "after", or "before":
    var publisherProperties = {insertMode: "append"};
    var publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Publisher initialized.");
      }
    });
```
