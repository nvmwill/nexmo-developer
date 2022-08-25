---
title: Adjusting video cropping and letterboxing
description: Adjusting video cropping and letterboxing
product: video
---

# Adjusting video cropping and letterboxing

You can specify cropping or letterboxing of a Publisher or Subscriber's video by setting the `fitMode` property of the options you pass into [`OT.initPublisher()`](/sdk/stitch/video-js-reference/ot.html#initPublisher) or `Session.subscribe()`. Pass in one of the following two strings:

- `"cover"` — The video is cropped if its dimensions do not match those of the DOM element. This is the default setting for videos publishing a camera feed.
- `"contain"` — The video is letterboxed if its dimensions do not match those of the DOM element. This is the default setting for screen-sharing videos.

For example, the following code initializes a publisher with the video element letterboxed:

```javascript
var publisher = OT.initPublisher("publisher-element-id",
  {fitMode: "contain"});
```

The following code subscribes to a stream with the video element cropped:

```javascript
var subscriber = session.subscribe(stream,
  "subscriber-element-id",
  {fitMode: "cover"});
```
