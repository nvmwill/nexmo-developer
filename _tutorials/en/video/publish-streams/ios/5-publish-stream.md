---
title: Publishing a stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Publishing a stream

Once you create a Publisher object, you can pass it into the `[OTSession publish:error]` method of an OTSession object to publish the stream to the session:

```objective-c
OTError* error = nil;
[session publish:publisher error:&error];
if (error) {
  NSLog(@"publishing failed with error: (%@)", error);
}
```

This code assumes that `session` is a Session object, and that the client has connected to the session. For more information, see [Creating a Session](/video/guides/create-session).

The `[OTPublisherDelegate publisher:streamCreated:]` message is sent when the publisher starts streaming to the session.
