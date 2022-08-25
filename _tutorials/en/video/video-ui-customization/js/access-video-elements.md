---
title: Directly accessing the video element for a Publisher or Subscriber
description: Directly accessing the video element for a Publisher or Subscriber
product: video
---

# Directly accessing the video element for a Publisher or Subscriber

You can disable the default user interface elements for a Publisher or Subscriber and access the HTML `video` element directly. When publishing or subscribing to a stream, set the `insertDefaultUI` property to `false` when calling the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) or [Session.subscribe()](/sdk/stitch/video-js-reference/session.html#subscribe) method. If you set this option to false, the [JS SDK](/video/client-sdks/web) does not insert a default UI element in the HTML DOM, and the `element` property of the Publisher or Subscriber object is undefined.

Instead, the Publisher element dispatches a `videoElementCreated` event when the `video` element (or in Internet Explorer the `object` element containing the video) is created. The `element` property of the event `object` is a reference to the video (or object) element. Add it to the HTML DOM to display the video.

The following code initializes a publisher and inserts its `video` element into the HTML DOM:

```javascript
var publisher = OT.initPublisher({insertDefaultUI: false});
publisher.on('videoElementCreated', function(event) {
  document.getElementById('publisher-video-parent-id').appendChild(event.element);
});
```

The following code subscribes to a stream and inserts its `video` element into the HTML DOM:

```javascript
var subscriber = session.subscribe(stream, {insertDefaultUI: false});
subscriber.on('videoElementCreated', function(event) {
  document.getElementById('subscriber-video-parent-id').appendChild(event.element);
});
```

If you set the `insertDefaultUI` property to `false`, do not set the `targetElement` parameter when calling [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) or [`Session.subscribe()`](/sdk/stitch/video-js-reference/session.html#subscribe). (This results in an error.)

The default user interface element contains user interface controls, a video loading indicator, and automatic video cropping or letter-boxing, in addition to the video. If you leave `insertDefaultUI` set to `true` (the default), you can control individual user interface settings using the `fitMode`, `showControls`, and `style` options. See the other topics in this page.

