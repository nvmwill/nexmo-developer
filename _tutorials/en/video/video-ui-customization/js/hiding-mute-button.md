---
title: Displaying or hiding the mute audio button
description: Displaying or hiding the mute audio button
product: video
---

# Displaying or hiding the mute audio button

You can specify cropping or letterboxing of a Publisher or Subscriber's video by setting the `fitMode` property of the options you pass into [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) or `Session.subscribe()`. Pass in one of the following two strings:

```javascript
var subscriber = session.subscribe(stream,
  'subscriber-element-id', // Replace with the replacement element ID
  {
     style: {buttonDisplayMode: 'on'}
  }
);
```

Once you have created the Publisher or Subscriber, you can change the mute button display mode, by calling the setStyle() method of the Publisher object or Subscriber object. (See the documentation for [`Publisher.setStyle()`](/sdk/stitch/video-js-reference/Publisher.html#setStyle) and [`Subscriber.setStyle()`](/sdk/stitch/video-js-reference/Subscriber.html#setStyle).)