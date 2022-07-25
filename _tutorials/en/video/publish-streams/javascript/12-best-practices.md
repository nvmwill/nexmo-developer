---
title: Best Practices
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Best practices when publishing

This section includes tips for successfully publishing streams.

### Allowing Device Access

It is best practice to let your users know that they are going to be asked to allow access to their camera and microphone. We find that by far the largest number of failures to publish are a result of users clicking the "deny" button or not clicking the allow button at all. We provide you with all of the events you need to be able to guide your users through this process:

```js
publisher.on({
  accessDialogOpened: function (event) {
    // Show allow camera message
    pleaseAllowCamera.style.display = 'block';
  },
  accessDialogClosed: function (event) {
    // Hide allow camera message
    pleaseAllowCamera.style.display = 'none';
  }
});
```

It is also a good idea to serve your website over SSL. This is because Chrome only requires users to click to allow access to devices once per domain if that domain is served over SSL. This means that your users (if on Chrome) don't have to deal with that inconvenient allow/deny dialog box every time they load the page.

### Split OT.initPublisher() and Session.publish()

Another thing we recommend is splitting the `OT.initPublisher()` and `Session.publish()` steps. This speeds up the initial connect time because you're connecting to the session while you're waiting for the user to click the allow button. So instead of:

```js
session.connect(token, function (err) {
{... your error handling code ...}
if (!err) {
    var publisher = OT.initPublisher();
    session.publish(publisher);
  }
});
```

Move the `OT.initPublisher()` step to before you connect, as in the following:

```js
var publisher = OT.initPublisher();
session.connect(token, function (err) {
{... your error handling code ...}
  if (!err) {
    session.publish(publisher);
  }
});
```

### Resolution and frame rate

You can set the resolution and frame rate of the Publisher when you initialize it:

```js
OT.initPublisher(divId, {
  resolution: '320x240',
  frameRate: 15
});
```

By default the resolution of a Publisher is 640x480, but you can set it to 1920x1080, 1280x720 or 320x240 as well. It is best to try to match the resolution to the size that the video will be displayed. If you are only displaying the video at 320x240 pixels then there is no point in streaming at 1280x720 or 1920x1080. Reducing the resolution can save bandwidth and reduce congestion and connection drops. _Note:_ support for `"1920x1080"` is a _private beta_ feature — please contact Vonage if you would like to enable it for your Video API project.

By default the frame rate of the video is 30 frames per second, but you can set it to 15, 7, or 1 as well. Reducing the frame rate can reduce the bandwidth required. Smaller resolution videos can have a lower frame rate without as much of a perceived difference to the user. So if you are using a low resolution, you might also want to think about using a low frame rate.

For more information, see the documentation for [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher).
