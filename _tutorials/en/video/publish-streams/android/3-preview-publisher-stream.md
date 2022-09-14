---
title: Preview the publisher's video
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Previewing the publisher's video before streaming

Note that, by default, the view of the Publisher contains the video of the publisher when the publisher starts streaming to the session. To see a preview of the video before the Publisher starts streaming, call the `startPreview()` method of the Publisher object:

```java
mPublisher.startPreview();
```

If you call the `startPreview()` method, you must call the `destroy()` method of the Publisher to remove the Publisher's view (and the video), when the publisher stops streaming (when the `onStreamDestroyed(PublisherKit publisher, Stream stream)` method of the PublisherListener is called).
