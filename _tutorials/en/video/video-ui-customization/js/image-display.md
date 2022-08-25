---
title: Setting an image to display in audio-only mode
description: Setting an image to display in audio-only mode
product: video
---

# Setting an image to display in audio-only mode

You can use the `backgroundImageURI` style of a Subscriber to set the image to be displayed when there is no video. The value you set can be the URL of an image on the web. It can also be a `data:` URL, such as one that you obtain using the `getImgData()` method of the Subscriber object (see the [previous section](/video/tutorials/video-ui-customization/video/video-ui-customization/js/cropping-video/javascript)).

The following code sets the background image of the Subscriber. When the call to `Session.subscribe()` completes successfully, the background image is set. If there is a video stream, the background is set to a static image captured from the subscriber video; otherwise it is set to an image loaded from a web URL:

```javascript
var subscriber = session.subscribe(event.stream, 'subscriberElement', function(error) {
  if (error) {
    console.log(error.message)'
    return;
  }
  if (subscriber.stream.hasVideo) {
    var imgData = subscriber.getImgData();
    subscriber.setStyle('backgroundImageURI', imgData);
  } else {
    subscriber.setStyle('backgroundImageURI',
      'https://tokbox.com/img/styleguide/tb-colors-cream.png'
    );
  }
});
```