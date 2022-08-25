---
title: Displaying or hiding the name in a video
description: Displaying or hiding the name in a video
product: video
---

# Displaying or hiding the name in a video

When you publish a stream, you can specify a name to be displayed in the video (see the [previous section](/video/tutorials/video-ui-customization/video/video-ui-customization/js/naming-streams/javascript)).

When you create a Publisher, you can specify whether the name is displayed in the Publisher video, by setting the **style.nameDisplayMode** property of the options you pass into the [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) method:

```javascript
// Replace the first parameter with the target element ID:
var publisher = OT.initPublisher("myPublisher",
  {
    name: "John",
    style: { nameDisplayMode: "off" }
  });
session.publish(publisher);
```

The `style.nameDisplayMode` property can be set to one of three values:

- `"auto"` — The name is displayed when the stream is first displayed and when the user mouses over the video (the default).
- `"off"` — The name is not displayed.
- `"on"` — The name is displayed.

Once you have created the Publisher, you can change the name display mode, by calling the `setStyle()` method of the Publisher object. (See the [documentation](/sdk/stitch/video-js-reference/Publisher.html#setStyle) for the `Publisher.setStyle()` method.)

When you subscribe to a stream, you can specify whether the name is displayed in the Subscriber video, by setting the `style.nameDisplayMode` property of the options you pass into the `Session.subscribe()` method:

```javascript
// Replace the first two parameters with the stream and target element ID:
var subscriber = session.subscribe(stream,
  "mySubscriber",
  {
    style: { nameDisplayMode: "off" }
});
```

Once you have created the Subscriber, you can change the name display mode, by calling the `setStyle()` method of the Subscriber object. (See the [documentation](/sdk/stitch/video-js-reference/Subscriber.html#setStyle) for the `Subscriber.setStyle()` method.)