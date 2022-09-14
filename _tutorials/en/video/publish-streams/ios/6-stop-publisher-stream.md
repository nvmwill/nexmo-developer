---
title: Stopping a publisher's stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Stopping a publisher's from stream

You can stop publisher from streaming to the session by calling the `[OTSession unpublish:error:]` method of the OTSession object:

```objective-c
OTError* error = nil;
[session unpublish:publisher error:&error];
if (error) {
  NSLog(@"publishing failed with error: (%@)", error);
}
```

The `[OTPublisherDelegate publisher:streamDestroyed:]` message is sent when the publisher stops streaming to the session. When this message is sent, remove the publisher's view from its superview:

```objective-c
[publisher.view removeFromSuperview:];
```
