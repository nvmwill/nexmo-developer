---
title: Hiding all built-in user interface controls for videos

description: Hiding all built-in user interface controls for videos

product: video
---

# Hiding all built-in user interface controls for videos

The Publisher and Subscriber objects include the following built-in user interface controls:

- The stream name display
- The audio level indicator
- The mute audio button
- The video disabled indicator and video disabled warning icon (Subscriber only)

You can disable all of these by setting the `showControls` property to `false` in the `properties` parameter you pass into the [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) method or the `Session.subscribe()` method.

For example, the following code creates a Publisher object that includes no built-in user interface controls:

```javascript
var publisherOptions = {
     showControls: false
  };
var publisher = OT.initPublisher(
  'publisher-element-id', // Replace with the replacement element ID
  publisherOptions
);
```

The following code creates a Subscriber object that includes no built-in user interface controls:

```javascript
var subscriberOptions = {
     showControls: false
  };
var subscriber = session.subscribe(stream,
  'subscriber-element-id', // Replace with the replacement element ID
  subscriberOptions
);
```

You can control the display of individual user interface controls by leaving the showControls property set to true (the default); then see these topics:

- [Displaying or hiding the name in a video](/video/tutorials/video-ui-customization/video/video-ui-customization/js/hiding-video-name/javascript)
- [Displaying or hiding the mute audio button](/video/tutorials/video-ui-customization/video/video-ui-customization/js/hiding-mute-button/javascript)
- [Detecting when a subscriber's video is disabled](/video/tutorials/subscribe-streams/video/subscribe-streams/javascript/5-manage-subscriber-streams/javascript#detecting-when-a-subscriber-s-video-is-disabled)