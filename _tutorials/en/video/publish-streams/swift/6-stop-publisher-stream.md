---
title: Stopping a publisher's stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Stopping a publisher from streaming

You can stop publisher from streaming to the session by calling the `OTSession unpublish(_:error:)` method of the OTSession object:

```swift
var error: OTError?
session.unpublish(publisher, error: &error)

if let error = error {
    print("unpublishing failed with error: \(error)");
}
```    

The `OTPublisherDelegate publisher(_:streamDestroyed:)` message is sent when the publisher stops streaming to the session. When this message is sent, remove the publisher's view from its superview:

```swift
publisher.view?.removeFromSuperview();
```
